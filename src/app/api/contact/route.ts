import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

const GOOGLE_SHEET_ID = '1GhSVSUxR44iIWxCpKKHmbUT-G-zSxICoev_zKa43Bpc';
const NOTIFICATION_EMAIL = 'help@nkvelora.co.in';

// Ensure data directory exists for local Excel backup storage
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const excelFilePath = path.join(dataDir, 'nkvv_contact_submissions.xlsx');

async function appendToLocalExcelBackup(lead: {
  timestamp: string;
  name: string;
  email: string;
  company: string;
  companySize: string;
  phone: string;
  needHelpWith: string;
  message: string;
  source: string;
  status: string;
}) {
  try {
    const workbook = new ExcelJS.Workbook();
    if (fs.existsSync(excelFilePath)) {
      await workbook.xlsx.readFile(excelFilePath);
    }

    let worksheet = workbook.getWorksheet('Submissions');
    if (!worksheet) {
      worksheet = workbook.addWorksheet('Submissions');
      worksheet.columns = [
        { header: 'Timestamp', key: 'timestamp', width: 25 },
        { header: 'Name', key: 'name', width: 22 },
        { header: 'Work Email', key: 'email', width: 28 },
        { header: 'Company', key: 'company', width: 22 },
        { header: 'Company Size', key: 'companySize', width: 18 },
        { header: 'Phone', key: 'phone', width: 18 },
        { header: 'Service / Requirement', key: 'needHelpWith', width: 24 },
        { header: 'Message', key: 'message', width: 45 },
        { header: 'Source', key: 'source', width: 16 },
        { header: 'Status', key: 'status', width: 12 },
      ];

      const headerRow = worksheet.getRow(1);
      headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
      headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '071A33' },
      };
    }

    worksheet.addRow(lead);
    await workbook.xlsx.writeFile(excelFilePath);
  } catch (err) {
    console.error('Local Excel backup warning:', err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, companySize, phone, needHelpWith, message, hp_website, b_hp_field } = body;

    // 1. SPAM PROTECTION: Honeypot Check
    if (hp_website || b_hp_field) {
      return NextResponse.json({ success: true, message: 'Enquiry processed' });
    }

    // 2. Field Validation
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim();
    const cleanCompany = (company || '').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter your full name.' },
        { status: 400 }
      );
    }

    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid work email address.' },
        { status: 400 }
      );
    }

    if (!cleanCompany) {
      return NextResponse.json(
        { success: false, error: 'Please enter your company name.' },
        { status: 400 }
      );
    }

    // IST Timestamp
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }) + ' IST';

    const payload = {
      timestamp,
      name: cleanName,
      email: cleanEmail,
      company: cleanCompany,
      companySize: companySize || 'N/A',
      phone: (phone || 'N/A').trim(),
      needHelpWith: needHelpWith || 'HR Operations',
      requirement: needHelpWith || 'HR Operations',
      message: (message || '').trim(),
      source: 'NKVV Website',
      status: 'New',
      targetEmail: NOTIFICATION_EMAIL,
      spreadsheetId: GOOGLE_SHEET_ID,
    };

    // Deployed Google Apps Script Web App Endpoint
    const webhookUrl =
      process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL ||
      process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
      'https://script.google.com/a/macros/nkvelora.co.in/s/AKfycbzRKxPWa-PYqTaecN6W2RfNVxzpvflom5Bx2tzmqHD2nJB0jhxJY9dXrwjgLaEoA7fG_g/exec';

    if (webhookUrl) {
      const googleRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        redirect: 'follow',
      });

      if (!googleRes.ok) {
        console.error(`Google Apps Script HTTP Error ${googleRes.status}`);
        if (googleRes.status === 401) {
          throw new Error('Google Apps Script Web App returned HTTP 401 (Access Restricted). Please set "Who has access" to "Anyone" in Apps Script deployment settings.');
        }
        throw new Error(`Google Apps Script returned HTTP status ${googleRes.status}`);
      }

      const googleData = await googleRes.json().catch(() => ({ status: 'success' }));
      if (googleData.status === 'error') {
        throw new Error(googleData.error || 'Google Sheet update failed');
      }
    }

    // Log to local Excel backup
    await appendToLocalExcelBackup(payload);

    return NextResponse.json({
      success: true,
      message: "Thank you. Your enquiry has been received. We'll get back to you shortly.",
    });
  } catch (error: any) {
    console.error('Submission API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "We couldn't submit your enquiry right now. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
