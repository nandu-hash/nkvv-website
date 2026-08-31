import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

const TARGET_EMAIL = 'hr.nandukumar@gmail.com';

// Ensure data directory exists for local Excel storage
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const excelFilePath = path.join(dataDir, 'nkvv_contact_submissions.xlsx');
const csvFilePath = path.join(dataDir, 'nkvv_contact_submissions.csv');

async function appendToExcel(lead: {
  timestamp: string;
  name: string;
  email: string;
  company: string;
  companySize: string;
  phone: string;
  needHelpWith: string;
  message: string;
}) {
  const workbook = new ExcelJS.Workbook();

  if (fs.existsSync(excelFilePath)) {
    await workbook.xlsx.readFile(excelFilePath);
  }

  let worksheet = workbook.getWorksheet('Submissions');

  if (!worksheet) {
    worksheet = workbook.addWorksheet('Submissions');
    worksheet.columns = [
      { header: 'Submission Date & Time', key: 'timestamp', width: 25 },
      { header: 'Full Name', key: 'name', width: 22 },
      { header: 'Work Email', key: 'email', width: 28 },
      { header: 'Company Name', key: 'company', width: 22 },
      { header: 'Company Size', key: 'companySize', width: 18 },
      { header: 'Phone Number', key: 'phone', width: 18 },
      { header: 'Scope Needed', key: 'needHelpWith', width: 24 },
      { header: 'Message / Details', key: 'message', width: 45 },
    ];

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '071A33' }, // NKVV Deep Navy
    };
  }

  worksheet.addRow(lead);
  await workbook.xlsx.writeFile(excelFilePath);

  // Also maintain a CSV file for lightweight access
  const csvRow = `"${lead.timestamp}","${lead.name}","${lead.email}","${lead.company}","${lead.companySize}","${lead.phone}","${lead.needHelpWith}","${lead.message.replace(/"/g, '""')}"\n`;
  if (!fs.existsSync(csvFilePath)) {
    const csvHeader = `"Timestamp","Full Name","Work Email","Company","Company Size","Phone","Scope Needed","Message"\n`;
    fs.writeFileSync(csvFilePath, csvHeader + csvRow, 'utf8');
  } else {
    fs.appendFileSync(csvFilePath, csvRow, 'utf8');
  }
}

async function sendNotificationEmail(lead: {
  timestamp: string;
  name: string;
  email: string;
  company: string;
  companySize: string;
  phone: string;
  needHelpWith: string;
  message: string;
}) {
  // Configure SMTP Transporter using Environment variables
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || 'hr.nandukumar@gmail.com';
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  if (smtpPass) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #071A33; color: #FFFFFF; padding: 20px; text-align: center;">
          <h2 style="margin: 0; color: #C9972B;">NK VELORA VENTURES</h2>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #E0B44C;">New Lead Discovery Submission</p>
        </div>
        <div style="padding: 24px; background-color: #FFFFFF; color: #101828;">
          <p style="font-size: 14px; margin-bottom: 20px;">A new discovery call request has been submitted on the NKVV website.</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 10px 0; font-weight: bold; color: #0B2A4A; width: 35%;">Submission Time:</td>
              <td style="padding: 10px 0;">${lead.timestamp}</td>
            </tr>
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 10px 0; font-weight: bold; color: #0B2A4A;">Full Name:</td>
              <td style="padding: 10px 0;">${lead.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 10px 0; font-weight: bold; color: #0B2A4A;">Work Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${lead.email}" style="color: #0B2A4A; font-weight: bold;">${lead.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 10px 0; font-weight: bold; color: #0B2A4A;">Company Name:</td>
              <td style="padding: 10px 0;">${lead.company}</td>
            </tr>
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 10px 0; font-weight: bold; color: #0B2A4A;">Company Size:</td>
              <td style="padding: 10px 0;">${lead.companySize}</td>
            </tr>
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 10px 0; font-weight: bold; color: #0B2A4A;">Phone Number:</td>
              <td style="padding: 10px 0;">${lead.phone || 'N/A'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 10px 0; font-weight: bold; color: #0B2A4A;">Need Help With:</td>
              <td style="padding: 10px 0; color: #C9972B; font-weight: bold;">${lead.needHelpWith}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #0B2A4A; vertical-align: top;">Message / Details:</td>
              <td style="padding: 10px 0; white-space: pre-wrap;">${lead.message || 'No additional message provided.'}</td>
            </tr>
          </table>
        </div>
        <div style="background-color: #F7F8FA; padding: 15px; text-align: center; font-size: 12px; color: #667085; border-top: 1px solid #E2E8F0;">
          Sent to <strong>${TARGET_EMAIL}</strong> • NK Velora Ventures Lead Automation System
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"NKVV Website Leads" <${smtpUser}>`,
      to: TARGET_EMAIL,
      subject: `New Lead: ${lead.name} (${lead.company}) - ${lead.needHelpWith}`,
      html: htmlContent,
    });
  }

  // Optional: Trigger Webhook for Excel Cloud / Google Sheets / Make / Zapier
  const webhookUrl = process.env.EXCEL_WEBHOOK_URL || process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
    } catch (e) {
      console.error('Webhook trigger error:', e);
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, companySize, phone, needHelpWith, message } = body;

    if (!name || !email || !company) {
      return NextResponse.json(
        { error: 'Missing required fields: Name, Email, and Company Name are required.' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium',
    });

    const lead = {
      timestamp,
      name,
      email,
      company,
      companySize: companySize || 'N/A',
      phone: phone || 'N/A',
      needHelpWith: needHelpWith || 'HR Operations',
      message: message || '',
    };

    // 1. Log submission to Excel file (.xlsx & .csv)
    await appendToExcel(lead);

    // 2. Trigger Email Notification to hr.nandukumar@gmail.com & Webhooks
    await sendNotificationEmail(lead);

    return NextResponse.json({
      success: true,
      message: 'Submission logged to Excel spreadsheet and email notification triggered successfully.',
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
