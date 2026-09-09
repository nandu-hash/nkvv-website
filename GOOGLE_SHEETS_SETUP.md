# NKVV Website — Google Sheets & Email Setup Guide

This document explains step-by-step how to deploy the Google Apps Script backend to connect the NKVV website contact form with your Google Sheet, send internal email notifications to **`help@nkvelora.co.in`**, and dispatch client acknowledgement emails to the prospect's Work Email.

---

## 🏛️ System Architecture

```
NKVV Website (https://nkvelora.co.in)
            ↓
  Next.js API Route (/api/contact)
            ↓ (POST Request)
Google Apps Script Web App Endpoint (doPost)
            ↓
Google Sheet (ID: 1_zM2Y-tY6pVDcJDg7mJu-dMMBM9PPbA2m2OmD1epTMM, gid=0)
            ├───────────────────────────────┐
            ↓                               ↓
Internal Notification (help@nkvelora.co.in)  Client Acknowledgement (Work Email)
```

---

## 1. How to Open Google Apps Script

1. Open your Google Sheet in your web browser:  
   [https://docs.google.com/spreadsheets/d/1_zM2Y-tY6pVDcJDg7mJu-dMMBM9PPbA2m2OmD1epTMM](https://docs.google.com/spreadsheets/d/1_zM2Y-tY6pVDcJDg7mJu-dMMBM9PPbA2m2OmD1epTMM)
2. In the top navigation bar, click **Extensions** → **Apps Script**.

---

## 2. How to Create the Apps Script Project

1. The Apps Script editor will open in a new browser tab.
2. Click on **Untitled project** at top left and rename it to:  
   `NKVV Website Form Integration`

---

## 3. Where to Paste `google-apps-script/Code.gs`

1. Select all default text in the editor (`Code.gs`) and delete it.
2. Open the file `google-apps-script/Code.gs` from this project repository.
3. Copy the entire code content and paste it into the Apps Script editor.
4. Click the **Save** 💾 icon (or press `Ctrl + S` / `Cmd + S`).

---

## 4. How to Authorize the Script

1. In the Apps Script editor toolbar, select the function `doPost` from the dropdown list next to *Debug*.
2. Click **Save** 💾.
3. When deploying for the first time, Google will display an **Authorization Required** prompt.
4. Click **Authorize access** and choose your Google Workspace account (`nandu@nkvelora.co.in` or `hello@nkvelora.co.in`).
5. If Google shows *Google hasn't verified this app*, click **Advanced** → click **Go to NKVV Website Form Integration (unsafe)**.
6. Review permissions (Spreadsheets and Mail) and click **Allow**.

---

## 5. How to Deploy it as a Web App

1. In the top right corner of the Apps Script editor, click the blue **Deploy** button → select **New deployment**.
2. Click the gear icon ⚙️ next to *Select type* → choose **Web app**.

---

## 6. What Deployment Settings to Select

Configure the deployment settings as follows:
- **Description**: `NKVV Website Form Integration v1.0`
- **Execute as**: **Me (nandu@nkvelora.co.in)**  
  *(Ensures the script executes with permissions to edit your sheet and send email)*
- **Who has access**: **Anyone**  
  *(Allows the website form to submit enquiries securely without forcing client sign-in)*

Click **Deploy**.

---

## 7. How to Obtain the Web App URL

1. After deployment completes, Google will display a confirmation dialog.
2. Under **Web app**, copy the URL provided.  
   *(Example format: `https://script.google.com/macros/s/AKfycb.../exec`)*

---

## 8. Where to Put the Web App URL in NKVV Environment Variables

### For Local Development (`.env.local`):
In the project root directory (`C:\Users\Admin\.gemini\antigravity\scratch\nkvv-website`), create or update `.env.local`:
```env
NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_APPS_SCRIPT_WEB_APP_URL/exec
```

### For Vercel Production (`https://nkvelora.co.in`):
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) → Select `nkvv-website`.
2. Go to **Settings** → **Environment Variables**.
3. Click **Add New**:
   - **Key**: `NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL`
   - **Value**: `https://script.google.com/macros/s/YOUR_APPS_SCRIPT_WEB_APP_URL/exec`
   - **Environments**: Select **Production**, **Preview**, **Development**.
4. Click **Save** and trigger a **Redeploy**.

---

## 9. How to Test the Integration

### Standard Test Case:
1. Start your local website: `npm run dev` (or visit `https://nkvelora.co.in/contact`).
2. Navigate to `http://localhost:3000/contact`.
3. Submit the following details:
   - **Name**: `NKVV Test Lead`
   - **Work Email**: `test@example.com`
   - **Company**: `Test Company`
   - **Company Size**: `50`
   - **Phone**: `9999999999`
   - **Requirement**: `HR Automation`
   - **Message**: `This is a test enquiry from the NKVV website.`
4. Click **Start a Conversation**.

---

## 10. How to Verify the Google Sheet

1. Open [Google Sheet ID 1_zM2Y-tY6pVDcJDg7mJu-dMMBM9PPbA2m2OmD1epTMM](https://docs.google.com/spreadsheets/d/1_zM2Y-tY6pVDcJDg7mJu-dMMBM9PPbA2m2OmD1epTMM).
2. Verify that **exactly ONE new row** was added with:
   - `Timestamp`: Recorded in IST (`dd MMM yyyy, hh:mm:ss a IST`)
   - `Name`: `NKVV Test Lead`
   - `Work Email`: `test@example.com`
   - `Company`: `Test Company`
   - `Company Size`: `50`
   - `Phone`: `9999999999`
   - `Service / Requirement`: `HR Automation`
   - `Message`: `This is a test enquiry from the NKVV website.`
   - `Source`: `NKVV Website`
   - `Status`: `New`

---

## 11. How to Verify Email Notification

1. Log into Google Workspace for `hello@nkvelora.co.in` (or check your `nandu@nkvelora.co.in` inbox if alias forwarding is enabled).
2. Look for the email with Subject:  
   `[NKVV] New Website Enquiry — NKVV Test Lead`
3. Confirm the body is formatted cleanly:
   ```text
   New NKVV Website Enquiry

   --------------------------------

   Name:
   NKVV Test Lead

   Work Email:
   test@example.com

   Company:
   Test Company

   Company Size:
   50

   Phone:
   9999999999

   Requirement:
   HR Automation

   Message:
   This is a test enquiry from the NKVV website.

   Submitted:
   01 Sep 2026, 12:30:00 PM IST

   Source:
   NKVV Website

   --------------------------------

   Please review this enquiry and follow up with the prospect.
   ```

---

## 12. How to Troubleshoot Errors

- **Form displays failure message**: Verify that `NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL` is set in Vercel environment variables and that Apps Script access is set to **Anyone**.
- **Row added but no email received**: Check Gmail Spam / All Mail folders for `hello@nkvelora.co.in`. The Google Sheet row remains intact even if email delivery encounters a temporary workspace throttle.
- **Double click behavior**: Submitting the form disables the submit button immediately (`Submitting...`), preventing duplicate rows.
- **Spam submission blocked**: Submissions with honeypot fields filled are safely dropped without writing to Google Sheets or triggering emails.
