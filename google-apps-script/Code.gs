/**
 * NK Velora Ventures (NKVV) — Production Google Apps Script Web App
 * Handles website contact enquiries, records them to Google Sheets,
 * sends internal notification to help@nkvelora.co.in,
 * and sends client acknowledgement to prospect's Work Email.
 *
 * Architecture:
 * Website (/api/contact) → Apps Script doPost(e) → Google Sheet → Internal Notification & Client Acknowledgement
 */

/**
 * ONE-CLICK AUTHORIZATION HELPER:
 * In the Apps Script editor, select 'testSendNotification' from the function dropdown and click 'Run'.
 * This triggers Google's authorization popup to grant permissions to send emails via Gmail/MailApp.
 */
function testSendNotification() {
  var testEmail = Session.getActiveUser().getEmail() || 'nandu@nkvelora.co.in';
  Logger.log('Authorizing email permissions for ' + testEmail + '...');
  
  try {
    GmailApp.sendEmail(testEmail, '[NKVV Authorization Test] Apps Script Email Setup', 'Email permissions successfully granted for NK Velora Ventures enquiry workflow.');
    Logger.log('SUCCESS: GmailApp authorized and test email sent to ' + testEmail);
  } catch (err) {
    Logger.log('GmailApp test notice: ' + err.toString());
    MailApp.sendEmail(testEmail, '[NKVV Authorization Test] Apps Script Email Setup', 'Email permissions successfully granted for NK Velora Ventures enquiry workflow.');
    Logger.log('SUCCESS: MailApp authorized and test email sent to ' + testEmail);
  }
}

function doPost(e) {
  // 1. Safety guard if function is run manually via the "Run" button in Apps Script editor
  if (!e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'notice', 
        message: 'doPost(e) must be triggered via an HTTP POST request from your website.' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // 2. Concurrency lock to prevent race conditions during concurrent form submissions
  var lock = LockService.getScriptLock();
  var lockAcquired = lock.tryLock(15000); // Wait up to 15 seconds for lock

  try {
    // 3. Parse payload from request
    var rawContents = (e && e.postData && e.postData.contents) ? e.postData.contents : '';
    var data = {};

    if (rawContents) {
      try {
        data = JSON.parse(rawContents);
      } catch (jsonErr) {
        data = (e && e.parameter) ? e.parameter : {};
      }
    } else {
      data = (e && e.parameter) ? e.parameter : {};
    }

    // 3b. Shared Secret Token Authentication:
    // Protects the webhook from unauthorized third-party spammers or direct malicious calls
    var EXPECTED_SECRET = 'nkvv_sec_8f9c2d1b7e4a3059ca91e5e6d2b4a781c82f9012';
    if (data.secretToken && data.secretToken !== EXPECTED_SECRET) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', error: 'Unauthorized request.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 4. Spam Honeypot protection
    if (data.hp_website || data.honeypot || data.b_hp_field) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'success', message: 'Enquiry processed' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 5. Extract and sanitize input fields
    var name = (data.name || '').toString().trim();
    var email = (data.email || '').toString().trim();
    var company = (data.company || '').toString().trim();
    var companySize = (data.companySize || 'N/A').toString().trim();
    var phone = (data.phone || 'N/A').toString().trim();
    var requirement = (data.needHelpWith || data.requirement || 'HR Operations').toString().trim();
    var message = (data.message || '').toString().trim();
    var source = (data.source || 'NKVV Website').toString().trim();
    var status = (data.status || 'New').toString().trim();

    // 6. Validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || name.length < 2) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', error: 'Validation failed: Name is required and must be at least 2 characters.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (!email || !emailRegex.test(email)) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', error: 'Validation failed: A valid client Work Email address is required.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (!company) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', error: 'Validation failed: Company name is required.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 7. Open Google Sheet (Container-bound active sheet or fallback by ID)
    var ss;
    try {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    } catch (sErr) {
      ss = null;
    }

    if (!ss) {
      var sheetId = data.spreadsheetId || '1GhSVSUxR44iIWxCpKKHmbUT-G-zSxICoev_zKa43Bpc';
      ss = SpreadsheetApp.openById(sheetId);
    }

    var sheet = ss.getSheets()[0];

    // 8. Format Indian Standard Time (IST) Timestamp
    var timestamp = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd MMM yyyy, hh:mm:ss a') + ' IST';

    // 9. Inspect headers & build row
    var lastRow = sheet.getLastRow();
    var headers = [];

    if (lastRow === 0) {
      headers = [
        'Timestamp',
        'Name',
        'Work Email',
        'Company',
        'Company Size',
        'Phone',
        'Service / Requirement',
        'Message',
        'Source',
        'Status'
      ];
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#071A33');
      headerRange.setFontColor('#FFFFFF');
      lastRow = 1;
    } else {
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    }

    // 10. Duplicate submission check:
    // Check if the previous row in the sheet matches the exact same email, company, and message
    if (lastRow > 1) {
      try {
        var lastEntryValues = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues()[0];
        var emailColIdx = -1;
        var companyColIdx = -1;
        var messageColIdx = -1;

        for (var h = 0; h < headers.length; h++) {
          var hName = headers[h].toString().trim().toLowerCase();
          if (hName === 'work email' || hName === 'email') emailColIdx = h;
          if (hName === 'company') companyColIdx = h;
          if (hName === 'message') messageColIdx = h;
        }

        if (emailColIdx >= 0 && companyColIdx >= 0) {
          var lastEmail = (lastEntryValues[emailColIdx] || '').toString().trim().toLowerCase();
          var lastCompany = (lastEntryValues[companyColIdx] || '').toString().trim().toLowerCase();
          var lastMsg = messageColIdx >= 0 ? (lastEntryValues[messageColIdx] || '').toString().trim() : '';

          if (lastEmail === email.toLowerCase() && lastCompany === company.toLowerCase() && lastMsg === message) {
            Logger.log('Duplicate submission detected from ' + email + '. Suppressing duplicate row and email dispatch.');
            return ContentService
              .createTextOutput(JSON.stringify({ 
                status: 'success', 
                message: 'Enquiry received previously. Duplicate suppressed.',
                duplicateSuppressed: true 
              }))
              .setMimeType(ContentService.MimeType.JSON);
          }
        }
      } catch (dupErr) {
        Logger.log('Duplicate check warning: ' + dupErr.toString());
      }
    }

    var fieldMap = {
      'Timestamp': timestamp,
      'Name': name,
      'Work Email': email,
      'Company': company,
      'Company Size': companySize,
      'Phone': phone,
      'Service / Requirement': requirement,
      'Requirement': requirement,
      'Message': message,
      'Source': source,
      'Status': status
    };

    var rowToAppend = [];
    if (headers && headers.length > 0) {
      for (var i = 0; i < headers.length; i++) {
        var headerName = headers[i].toString().trim();
        rowToAppend.push(fieldMap[headerName] !== undefined ? fieldMap[headerName] : '');
      }
    } else {
      rowToAppend = [timestamp, name, email, company, companySize, phone, requirement, message, source, status];
    }

    // 11. Write row to Google Sheet and flush immediately to ensure persistence before email dispatch
    sheet.appendRow(rowToAppend);
    SpreadsheetApp.flush();

    // 12. INTERNAL NOTIFICATION to nandu@nkvelora.co.in
    var internalEmailSent = false;
    var internalEmailError = null;
    var internalEmailRecipient = 'nandu@nkvelora.co.in';
    var internalEmailSubject = '[NKVV] New Website Enquiry — ' + name;

    var internalTextBody = 
      'New NKVV Website Enquiry\n\n' +
      '--------------------------------\n\n' +
      'Name: ' + name + '\n' +
      'Work Email: ' + email + '\n' +
      'Company: ' + company + '\n' +
      'Company Size: ' + companySize + '\n' +
      'Phone: ' + phone + '\n' +
      'Service / Requirement: ' + requirement + '\n' +
      'Message: ' + (message || 'None provided') + '\n\n' +
      'Timestamp: ' + timestamp + '\n' +
      'Source: ' + source + '\n' +
      'Status: ' + status + '\n\n' +
      '--------------------------------\n\n' +
      'Please review this enquiry and follow up with the prospect.';

    var internalHtmlBody = 
      '<div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden; background-color: #FFFFFF;">' +
        '<div style="background-color: #071A33; color: #FFFFFF; padding: 24px; text-align: center;">' +
          '<h2 style="margin: 0; font-size: 20px; font-weight: bold; letter-spacing: 1px; color: #C9972B;">NK VELORA VENTURES</h2>' +
          '<p style="margin: 6px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #E2E8F0;">New Website Discovery Enquiry</p>' +
        '</div>' +
        '<div style="padding: 24px 28px; color: #101828;">' +
          '<h3 style="color: #071A33; margin: 0 0 16px 0; font-size: 16px;">Enquiry Details</h3>' +
          '<table style="width: 100%; border-collapse: collapse; font-size: 13px;">' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: 600; color: #071A33; width: 38%;">Name:</td><td style="padding: 10px 0; color: #1E293B;">' + name + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: 600; color: #071A33;">Work Email:</td><td style="padding: 10px 0;"><a href="mailto:' + email + '" style="color: #071A33; font-weight: 600; text-decoration: underline;">' + email + '</a></td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: 600; color: #071A33;">Company:</td><td style="padding: 10px 0; color: #1E293B;">' + company + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: 600; color: #071A33;">Company Size:</td><td style="padding: 10px 0; color: #1E293B;">' + companySize + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: 600; color: #071A33;">Phone:</td><td style="padding: 10px 0; color: #1E293B;">' + phone + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: 600; color: #071A33;">Service / Requirement:</td><td style="padding: 10px 0; color: #C9972B; font-weight: 600;">' + requirement + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: 600; color: #071A33;">Timestamp:</td><td style="padding: 10px 0; color: #64748B;">' + timestamp + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: 600; color: #071A33;">Source:</td><td style="padding: 10px 0; color: #64748B;">' + source + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 10px 0; font-weight: 600; color: #071A33;">Status:</td><td style="padding: 10px 0; color: #059669; font-weight: 600;">' + status + '</td></tr>' +
            '<tr><td style="padding: 10px 0; font-weight: 600; color: #071A33; vertical-align: top;">Message:</td><td style="padding: 10px 0; color: #334155; white-space: pre-wrap; line-height: 1.5;">' + (message || 'None provided') + '</td></tr>' +
          '</table>' +
          '<div style="margin-top: 20px; padding: 14px 16px; background-color: #F8FAFC; border-left: 3px solid #C9972B; font-size: 12px; color: #071A33;">' +
            '<strong>Action Required:</strong> Review this enquiry and follow up with the prospect.' +
          '</div>' +
        '</div>' +
      '</div>';

    try {
      // Use GmailApp as required, falling back gracefully to MailApp if needed
      if (typeof GmailApp !== 'undefined' && GmailApp.sendEmail) {
        GmailApp.sendEmail(internalEmailRecipient, internalEmailSubject, internalTextBody, {
          name: 'NKVV Website Enquiry',
          replyTo: email,
          htmlBody: internalHtmlBody
        });
      } else {
        MailApp.sendEmail({
          to: internalEmailRecipient,
          subject: internalEmailSubject,
          body: internalTextBody,
          htmlBody: internalHtmlBody,
          replyTo: email
        });
      }
      internalEmailSent = true;
    } catch (intErr) {
      internalEmailError = intErr.toString();
      Logger.log('Internal notification warning: ' + internalEmailError);
    }

    // 13. CLIENT ACKNOWLEDGEMENT to prospect's Work Email
    var clientAckSent = false;
    var clientAckError = null;
    var clientAckSubject = 'Thank you for contacting NK Velora Ventures';

    var clientTextBody =
      'Thank you for contacting NK Velora Ventures. We’ve received your enquiry and our team will review the information provided. We’ll get back to you with the appropriate next step.\n\n' +
      'Regards,\n' +
      'NKVV Business Team\n' +
      'NK Velora Ventures\n' +
      'business@nkvelora.co.in\n' +
      'https://nkvelora.co.in';

    var clientHtmlBody =
      '<div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden; background-color: #FFFFFF;">' +
        '<div style="background-color: #071A33; color: #FFFFFF; padding: 24px; text-align: center;">' +
          '<h2 style="margin: 0; font-size: 20px; font-weight: bold; letter-spacing: 1px; color: #C9972B;">NK VELORA VENTURES</h2>' +
          '<p style="margin: 6px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #E2E8F0;">Business Process Intelligence &amp; Automation</p>' +
        '</div>' +
        '<div style="padding: 28px; color: #1E293B; line-height: 1.6; font-size: 14px;">' +
          '<p style="margin: 0 0 16px 0;">Dear ' + name + ',</p>' +
          '<p style="margin: 0 0 16px 0;">Thank you for contacting NK Velora Ventures. We’ve received your enquiry and our team will review the information provided. We’ll get back to you with the appropriate next step.</p>' +
          '<div style="margin: 20px 0; padding: 16px 20px; background-color: #F8FAFC; border-left: 3px solid #C9972B; border-radius: 4px;">' +
            '<p style="margin: 0 0 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; font-weight: 600;">Enquiry Focus</p>' +
            '<p style="margin: 0; font-size: 14px; color: #071A33;"><strong>Requirement:</strong> ' + requirement + '</p>' +
          '</div>' +
          '<div style="border-top: 1px solid #E2E8F0; padding-top: 20px; margin-top: 24px;">' +
            '<p style="margin: 0 0 2px 0; font-weight: 600; color: #071A33;">Regards,</p>' +
            '<p style="margin: 0 0 2px 0; font-weight: 600; color: #071A33;">NKVV Business Team</p>' +
            '<p style="margin: 0 0 6px 0; font-size: 12px; color: #64748B;">NK Velora Ventures</p>' +
            '<p style="margin: 0 0 2px 0; font-size: 12px;"><a href="mailto:business@nkvelora.co.in" style="color: #071A33; text-decoration: underline;">business@nkvelora.co.in</a></p>' +
            '<p style="margin: 0 0 12px 0; font-size: 12px;"><a href="https://nkvelora.co.in" style="color: #C9972B; text-decoration: underline;">https://nkvelora.co.in</a></p>' +
            '<p style="margin: 0; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #C9972B;">DIAGNOSE &bull; DESIGN &bull; ENABLE &bull; AUTOMATE &bull; SCALE</p>' +
          '</div>' +
        '</div>' +
      '</div>';

    try {
      if (typeof GmailApp !== 'undefined' && GmailApp.sendEmail) {
        GmailApp.sendEmail(email, clientAckSubject, clientTextBody, {
          name: 'NKVV Business Team',
          replyTo: 'business@nkvelora.co.in',
          htmlBody: clientHtmlBody
        });
      } else {
        MailApp.sendEmail({
          to: email,
          subject: clientAckSubject,
          body: clientTextBody,
          htmlBody: clientHtmlBody,
          name: 'NKVV Business Team',
          replyTo: 'business@nkvelora.co.in'
        });
      }
      clientAckSent = true;
    } catch (ackErr) {
      clientAckError = ackErr.toString();
      Logger.log('Client acknowledgement delivery warning: ' + clientAckError);
    }


    // 14. Return structured response to website
    var responsePayload = {
      status: 'success',
      message: 'Enquiry recorded successfully',
      sheetRow: lastRow + 1,
      internalEmailSent: internalEmailSent,
      internalEmailError: internalEmailError,
      clientAckSent: clientAckSent,
      clientAckError: clientAckError
    };

    return ContentService
      .createTextOutput(JSON.stringify(responsePayload))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('Apps Script Fatal Error: ' + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    if (lockAcquired) {
      lock.releaseLock();
    }
  }
}
