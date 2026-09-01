/**
 * NK Velora Ventures (NKVV) — Production Google Apps Script Web App
 * Spreadsheet ID: 1_zM2Y-tY6pVDcJDg7mJu-dMMBM9PPbA2m2OmD1epTMM (gid=0)
 * Official Public Enquiry Email: hello@nkvelora.co.in
 */

function doPost(e) {
  // Safety guard if function is run manually via the "Run" button in Apps Script editor
  if (!e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'notice', 
        message: 'doPost(e) must be triggered via an HTTP POST request from your website, not manually via the Run button.' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
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

    // 1. SPAM PROTECTION: Honeypot check
    if (data.hp_website || data.honeypot || data.b_hp_field) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'success', message: 'Enquiry processed' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Validate required fields
    var name = (data.name || '').toString().trim();
    var email = (data.email || '').toString().trim();
    var company = (data.company || '').toString().trim();
    var companySize = (data.companySize || 'N/A').toString().trim();
    var phone = (data.phone || 'N/A').toString().trim();
    var requirement = (data.needHelpWith || data.requirement || 'HR Operations').toString().trim();
    var message = (data.message || '').toString().trim();
    var source = (data.source || 'NKVV Website').toString().trim();
    var status = (data.status || 'New').toString().trim();

    if (!name || !email || !company) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', error: 'Missing required fields: Name, Email, and Company are required.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Open Spreadsheet ID and Target Sheet (gid=0 / Sheet1)
    var ss = SpreadsheetApp.openById('1_zM2Y-tY6pVDcJDg7mJu-dMMBM9PPbA2m2OmD1epTMM');
    var sheet = ss.getSheets()[0];

    // 4. Format Indian Standard Time (IST) Timestamp
    var timestamp = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd MMM yyyy, hh:mm:ss a') + ' IST';

    // 5. Header Inspection & Data Preservation
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
    } else {
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
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

    // 6. Append Row to Google Sheet
    sheet.appendRow(rowToAppend);

    // 7. Send Email Notification to hello@nkvelora.co.in
    var notificationEmail = 'hello@nkvelora.co.in';
    var emailSubject = '[NKVV] New Website Enquiry — ' + name;

    var emailTextBody = 
      'New NKVV Website Enquiry\n\n' +
      '--------------------------------\n\n' +
      'Name:\n' + name + '\n\n' +
      'Work Email:\n' + email + '\n\n' +
      'Company:\n' + company + '\n\n' +
      'Company Size:\n' + companySize + '\n\n' +
      'Phone:\n' + phone + '\n\n' +
      'Requirement:\n' + requirement + '\n\n' +
      'Message:\n' + (message || 'None provided') + '\n\n' +
      'Submitted:\n' + timestamp + '\n\n' +
      'Source:\n' + source + '\n\n' +
      '--------------------------------\n\n' +
      'Please review this enquiry and follow up with the prospect.';

    var emailHtmlBody = 
      '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">' +
        '<div style="background-color: #071A33; color: #FFFFFF; padding: 20px; text-align: center;">' +
          '<h2 style="margin: 0; color: #C9972B;">NK VELORA VENTURES</h2>' +
          '<p style="margin: 5px 0 0 0; font-size: 12px; color: #E0B44C;">New Website Discovery Enquiry</p>' +
        '</div>' +
        '<div style="padding: 24px; background-color: #FFFFFF; color: #101828;">' +
          '<h3 style="color: #0B2A4A; margin-top: 0;">New NKVV Website Enquiry</h3>' +
          '<hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 15px 0;" />' +
          '<table style="width: 100%; border-collapse: collapse; font-size: 14px;">' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold; color: #0B2A4A; width: 35%;">Name:</td><td style="padding: 8px 0;">' + name + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold; color: #0B2A4A;">Work Email:</td><td style="padding: 8px 0;"><a href="mailto:' + email + '" style="color: #0B2A4A; font-weight: bold;">' + email + '</a></td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold; color: #0B2A4A;">Company:</td><td style="padding: 8px 0;">' + company + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold; color: #0B2A4A;">Company Size:</td><td style="padding: 8px 0;">' + companySize + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold; color: #0B2A4A;">Phone:</td><td style="padding: 8px 0;">' + phone + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold; color: #0B2A4A;">Requirement:</td><td style="padding: 8px 0; color: #C9972B; font-weight: bold;">' + requirement + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold; color: #0B2A4A;">Submitted:</td><td style="padding: 8px 0;">' + timestamp + '</td></tr>' +
            '<tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold; color: #0B2A4A;">Source:</td><td style="padding: 8px 0;">' + source + '</td></tr>' +
            '<tr><td style="padding: 8px 0; font-weight: bold; color: #0B2A4A; vertical-align: top;">Message:</td><td style="padding: 8px 0; white-space: pre-wrap;">' + (message || 'None provided') + '</td></tr>' +
          '</table>' +
          '<hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 15px 0;" />' +
          '<div style="padding: 12px; background-color: #F7F8FA; border-left: 4px solid #C9972B; font-size: 13px; font-weight: bold; color: #071A33;">' +
            'Please review this enquiry and follow up with the prospect.' +
          '</div>' +
        '</div>' +
      '</div>';

    try {
      MailApp.sendEmail({
        to: notificationEmail,
        subject: emailSubject,
        body: emailTextBody,
        htmlBody: emailHtmlBody
      });
    } catch (emailErr) {
      Logger.log('Email delivery warning: ' + emailErr.toString());
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Enquiry recorded successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('Apps Script Error: ' + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
