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

// In-memory rate limiting map: IP -> timestamp array
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // max 5 submissions per IP per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }
  
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

// Strip HTML tags and control characters to prevent XSS and formula injection
function sanitizeInput(str: string): string {
  if (!str) return '';
  return str
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .replace(/^[\s=+@-]/, "'$&") // prevent CSV / Spreadsheet formula injection
    .trim();
}

export async function POST(request: Request) {
  try {
    // 0. Rate Limiting Protection against spam bots / brute force
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a minute before submitting again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, company, companySize, phone, needHelpWith, message, hp_website, b_hp_field } = body;

    // 1. SPAM PROTECTION: Honeypot Check
    if (hp_website || b_hp_field) {
      return NextResponse.json({ success: true, message: 'Enquiry processed' });
    }

    // 2. Field Sanitization & Length Restrictions
    const cleanName = sanitizeInput(name || '').slice(0, 100);
    const cleanEmail = (email || '').trim().toLowerCase().slice(0, 150);
    const cleanCompany = sanitizeInput(company || '').slice(0, 120);
    const cleanCompanySize = sanitizeInput(companySize || 'N/A').slice(0, 50);
    const cleanPhone = sanitizeInput(phone || 'N/A').slice(0, 30);
    const cleanRequirement = sanitizeInput(needHelpWith || 'HR Operations').slice(0, 150);
    const cleanMessage = sanitizeInput(message || '').slice(0, 3000);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
      companySize: cleanCompanySize,
      phone: cleanPhone,
      needHelpWith: cleanRequirement,
      requirement: cleanRequirement,
      message: cleanMessage,
      source: 'NKVV Website',
      status: 'New',
      targetEmail: NOTIFICATION_EMAIL,
      spreadsheetId: GOOGLE_SHEET_ID,
      secretToken: process.env.NKVV_WEBHOOK_SECRET || 'nkvv_sec_8f9c2d1b7e4a3059ca91e5e6d2b4a781c82f9012'
    };

    // Deployed Google Apps Script Web App Endpoint
    const webhookUrl =
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
    // Generic sanitized error message so internal server stack or error details are never leaked to the client
    return NextResponse.json(
      {
        success: false,
        error: "We couldn't submit your enquiry right now. Please try again or contact us directly at help@nkvelora.co.in.",
      },
      { status: 500 }
    );
  }
}

