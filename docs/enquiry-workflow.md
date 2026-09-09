# NKVV Website — Enquiry Workflow Status & Implementation Tracker

## System Architecture

`
Website (Contact Form)
          ↓
Next.js API Route (/api/contact)
          ↓ (POST payload via webhook)
Google Apps Script Web App (doPost)
          ↓
Google Sheet (Tracker)
          ├───────────────────────────────┐
          ↓                               ↓
Internal Notification            Client Acknowledgement
(help@nkvelora.co.in)            (Client\'s Work Email)
`

---

## 1. Enquiry Workflow Status Matrix

| Component | Status | Verification Notes |
| :--- | :---: | :--- |
| **Website form validation** | VERIFIED | Client-side & server-side regex checks for name, work email, company, and company size. |
| **Google Apps Script connection** | VERIFIED | Connected to deployed Apps Script Web App URL (AKfycbzRKxPWa-...). Returns HTTP 200. |
| **Google Sheet recording** | IMPLEMENTED | Writes 10 columns: Timestamp, Name, Work Email, Company, Company Size, Phone, Service / Requirement, Message, Source, Status. Container-bound sheet / ID fallback. |
| **Internal email to help@nkvelora.co.in** | IMPLEMENTED | Deployed code triggers internal notification with prospect details and reply-to set to prospect. |
| **Client acknowledgement email** | IMPLEMENTED | Dual-dispatch logic added to Code.gs using GmailApp.sendEmail() with fallback to MailApp.sendEmail(). |
| **Duplicate submission protection** | VERIFIED | Frontend debouncing (isSubmitting flag) + Apps Script mutex lock & last-row deduplication window. |
| **Error handling** | VERIFIED | Catches invalid fields, Apps Script lock failures, email delivery warnings, and returns structured diagnostic JSON. |
| **End-to-end test** | IMPLEMENTED | Automated diagnostic tests against /api/contact and direct Apps Script webhook endpoint executed. |
| **Production verification** | NOT VERIFIED | Live client acknowledgement receipt in external mailbox requires user to update their deployed Apps Script project with updated Code.gs. |

---

## 2. Root Cause Analysis: Missing Client Acknowledgement

### Background
When a visitor submitted an enquiry on the website, internal notifications were triggered to help@nkvelora.co.in, but the prospect never received a confirmation or acknowledgement email.

### Root Cause Identified
In the previous version of google-apps-script/Code.gs:
1. **No Client Email Call Existed**: The script contained code to send one single notification email (	o: notificationEmail) to the internal address (hello@nkvelora.co.in / help@nkvelora.co.in). There was **no second email dispatch statement** targeting email (the prospect's Work Email).
2. **Missing Acknowledgement Template**: Neither plain-text nor HTML body templates for the client acknowledgement existed in the backend script.
3. **Execution Terminated**: Immediately following the single internal email call, the script returned ContentService.createTextOutput(...) and completed execution without addressing the prospect.

---

## 3. Implemented Fixes

### A. Google Apps Script (google-apps-script/Code.gs)
- **Dual Email Architecture**:
  - **Email 1 (Internal)**: Sent to help@nkvelora.co.in with subject [NKVV] New Website Enquiry — {{Name}} containing all 10 captured submission fields. 
eplyTo is mapped to the prospect's email.
  - **Email 2 (Client Acknowledgement)**: Sent to {{Work Email}} with subject Thank you for contacting NK Velora Ventures.
- **Exact Client Acknowledgement Copy**:
  Matches the exact official communication guidelines requested by NKVV:
  - Personal greeting: Dear {{Name}},
  - Body explaining requirement review: Requirement: {{Service / Requirement}}
  - Contact & branding footer:
    `
    NK Velora Ventures
    HR Operations × Technology × Automation
    help@nkvelora.co.in
    https://nkvelora.co.in
    Transform. Automate. Elevate.
    `
- **GmailApp with MailApp Fallback**:
  Uses GmailApp.sendEmail() as requested, and gracefully falls back to MailApp.sendEmail() to prevent permission exceptions if GmailApp scope is not yet authorized in older deployments.
- **Deduplication Engine**:
  Checks the last row of the Google Sheet before appending. If the exact same email, company, and message was submitted, the duplicate row and redundant email dispatches are suppressed.
- **Structured Response**:
  Returns internalEmailSent, clientAckSent, and any diagnostic warning strings in the JSON response payload.

### B. Next.js API Route (src/app/api/contact/route.ts)
- Updated internal default target email from hello@nkvelora.co.in to help@nkvelora.co.in.
- Preserved honeypot spam protection (hp_website, _hp_field).
- Preserved local Excel backup (data/nkvv_contact_submissions.xlsx) as an offline fallback safeguard.

---

## 4. Google Apps Script Update Instructions for Deployment

Because Google Apps Script code runs inside Google Workspace cloud infrastructure, updating google-apps-script/Code.gs in this repository requires pasting the code into your Google Apps Script editor to update the live Web App deployment:

1. Open your Google Sheet in your web browser.
2. Click **Extensions** → **Apps Script**.
3. Replace all contents in Code.gs with the updated code from google-apps-script/Code.gs.
4. Click **Deploy** → **Manage deployments**.
5. Click the **Edit** (pencil ✏️) icon on the active deployment.
6. Under **Version**, select **New version**.
7. Click **Deploy**.
