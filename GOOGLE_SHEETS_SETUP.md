# NKVV Website — Google Sheets & Email Notification Integration Guide

This guide details the architecture, code, deployment, and testing steps for connecting the NKVV Website contact/discovery form to your Google Sheet and automated email notifications via Google Apps Script.

---

## 🏛️ Architecture

```
NKVV Website (https://nkvelora.com)
            ↓
   Next.js API Route (/api/contact)
            ↓ (POST Request)
Google Apps Script Web App Endpoint
            ↓
Google Sheet (ID: 1GhSVSUxR44iIWxCpKKHmbUT-G-zSxICoev_zKa43Bpc)
            ↓
Email Notification to hr.nandukumar@gmail.com
```

---

## 1. How to Open Google Apps Script

1. Open your Google Sheet in your web browser:  
   [https://docs.google.com/spreadsheets/d/1GhSVSUxR44iIWxCpKKHmbUT-G-zSxICoev_zKa43Bpc](https://docs.google.com/spreadsheets/d/1GhSVSUxR44iIWxCpKKHmbUT-G-zSxICoev_zKa43Bpc)
2. In the top navigation menu, click **Extensions** → **Apps Script**.
3. A new tab will open with the Google Apps Script code editor.

---

## 2. The Google Apps Script Code

Delete any default code in the editor (`Code.gs`) and paste the following script:

```javascript
/**
 * NK Velora Ventures (NKVV) — Form to Google Sheet & Email Notification
 * Spreadsheet ID: 1GhSVSUxR44iIWxCpKKHmbUT-G-zSxICoev_zKa43Bpc (gid=0)
 * Recipient: hr.nandukumar@gmail.com
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Lock script for 10 seconds to prevent concurrent row collision
  lock.tryLock(10000);

  try {
    var rawContents = e.postData ? e.postData.contents : '';
    var data = {};

    if (rawContents) {
      try {
        data = JSON.parse(rawContents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }

    // 1. SPAM PROTECTION: Honeypot check
    if (data.hp_website || data.honeypot) {
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

    // 3. Open Spreadsheet ID and select Sheet (gid=0 / Sheet1)
    var ss = SpreadsheetApp.openById('1GhSVSUxR44iIWxCpKKHmbUT-G-zSxICoev_zKa43Bpc');
    var sheet = ss.getSheets()[0];

    // 4. Format Indian Standard Time (IST) timestamp
    var timestamp = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd MMM yyyy, hh:mm:ss a') + ' IST';

    // 5. Header inspection and Row Mapping (Preserves existing data and columns)
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

    // 7. Send Email Notification to hr.nandukumar@gmail.com
    var recipientEmail = 'hr.nandukumar@gmail.com';
    var emailSubject = '[NKVV] New Website Enquiry — ' + name;

    var emailTextBody = 
      'New NKVV Website Enquiry\n\n' +
      'Name:\n' + name + '\n\n' +
      'Work Email:\n' + email + '\n\n' +
      'Company:\n' + company + '\n\n' +
      'Company Size:\n' + companySize + '\n\n' +
      'Phone:\n' + phone + '\n\n' +
      'Requirement:\n' + requirement + '\n\n' +
      'Message:\n' + (message || 'None provided') + '\n\n' +
      'Submitted:\n' + timestamp + '\n\n' +
      'Source:\n' + source + '\n\n' +
      'Please review this enquiry and follow up with the prospect.';

    var emailHtmlBody = 
      '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">' +
        '<div style="background-color: #071A33; color: #FFFFFF; padding: 20px; text-align: center;">' +
          '<h2 style="margin: 0; color: #C9972B;">NK VELORA VENTURES</h2>' +
          '<p style="margin: 5px 0 0 0; font-size: 12px; color: #E0B44C;">New Website Discovery Enquiry</p>' +
        '</div>' +
        '<div style="padding: 24px; background-color: #FFFFFF; color: #101828;">' +
          '<h3 style="color: #0B2A4A; margin-top: 0;">New NKVV Website Enquiry</h3>' +
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
          '<div style="margin-top: 20px; padding: 12px; background-color: #F7F8FA; border-left: 4px solid #C9972B; font-size: 13px; font-weight: bold; color: #071A33;">' +
            'Please review this enquiry and follow up with the prospect.' +
          '</div>' +
        '</div>' +
      '</div>';

    try {
      MailApp.sendEmail({
        to: recipientEmail,
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
```

---

## 3. How to Deploy as a Web App

1. In the Apps Script editor, click the blue **Deploy** button at top right → select **New deployment**.
2. Click the gear icon ⚙️ next to *Select type* → choose **Web app**.
3. Fill in:
   - **Description**: `NKVV Contact Form Web App`
   - **Execute as**: **Me (hr.nandukumar@gmail.com)**
   - **Who has access**: **Anyone**
4. Click **Deploy**.

---

## 4. How to Authorize the Script

1. When prompted with *Authorization Required*, click **Authorize access**.
2. Select your Google account (`hr.nandukumar@gmail.com`).
3. If Google shows *Google hasn't verified this app*, click **Advanced** → click **Go to Untitled project (unsafe)**.
4. Review permissions (Spreadsheets and Mail) and click **Allow**.

---

## 5. Where to Put the Web App URL

After deployment succeeds, copy the **Web app URL** (looks like `https://script.google.com/macros/s/AKfycb.../exec`).

### Local Development (`.env.local`)
Create or edit `.env.local` in the project root:
```env
NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYED_WEB_APP_URL/exec
```

### Production (Vercel Dashboard)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → Select `nkvv-website`.
2. Go to **Settings** → **Environment Variables**.
3. Add Variable Name: `NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL`
4. Add Value: `https://script.google.com/macros/s/YOUR_DEPLOYED_WEB_APP_URL/exec`
5. Select environments: **Production**, **Preview**, **Development**.
6. Click **Save** and trigger a **Redeploy**.

---

## 6. How to Test the Form

1. Start your local server: `npm run dev` (or visit `https://nkvelora.com/contact`).
2. Navigate to `http://localhost:3000/contact`.
3. Enter test details:
   - **Name**: `Test Lead`
   - **Email**: `test@company.com`
   - **Company**: `Acme Systems`
   - **Company Size**: `30–75 employees`
   - **Phone**: `+91 98765 43210`
   - **Requirement**: `HR Operations`
   - **Message**: `Testing end-to-end integration.`
4. Click **Start a Conversation**.

---

## 7. How to Verify Google Sheet Update

1. Open [Google Sheet ID 1GhSVSUxR44iIWxCpKKHmbUT-G-zSxICoev_zKa43Bpc](https://docs.google.com/spreadsheets/d/1GhSVSUxR44iIWxCpKKHmbUT-G-zSxICoev_zKa43Bpc).
2. Confirm a new row appears at the bottom with:
   - Timestamp in IST (`dd MMM yyyy, hh:mm:ss a IST`)
   - All submitted fields
   - `Source`: `NKVV Website`
   - `Status`: `New`

---

## 8. How to Verify Email Notification

1. Open [Gmail](https://mail.google.com) logged into `hr.nandukumar@gmail.com`.
2. Check your inbox for an email with Subject:  
   `[NKVV] New Website Enquiry — Test Lead`
3. Verify that all fields and the action line *"Please review this enquiry and follow up with the prospect."* are present.

---

## 9. Troubleshooting Failed Submissions

- **Form shows failure message**: Ensure `NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL` is set and that *Who has access* is set to **Anyone** in Google Apps Script.
- **Sheet updates but no email arrives**: Check Gmail Spam folder. Ensure Google Apps Script deployment was authorized with MailApp permissions.
- **CORS or Redirect Error**: Ensure the website submits to `/api/contact` which proxies server-side to the Google Apps Script Web App URL.
