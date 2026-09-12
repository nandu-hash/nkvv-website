import { cookies } from 'next/headers';
import crypto from 'crypto';
import { prisma } from './prisma';

export const ROLES = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  ASSESSOR: 'ASSESSOR',
  VIEWER: 'VIEWER',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

const ROLE_WEIGHTS: Record<Role, number> = {
  VIEWER: 1,
  ASSESSOR: 2,
  ADMIN: 3,
  OWNER: 4,
};

const SESSION_COOKIE_NAME = 'velora_session';
const SECRET = process.env.NKVV_WEBHOOK_SECRET || 'velora-enterprise-default-secret-key-32-chars-min';

export interface SessionPayload {
  userId: string;
  organizationId: string;
  role: Role;
  email: string;
  name: string;
  orgName: string;
  isDemo: boolean;
  exp: number;
}

// Password Hashing
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, key] = storedHash.split(':');
  if (!salt || !key) return false;
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(key, 'hex'), Buffer.from(derivedKey, 'hex'));
}

// Token signing
export function signSessionToken(payload: SessionPayload): string {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
  return `${data}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const [data, signature] = token.split('.');
    if (!data || !signature) return null;

    const expectedSig = crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf-8')) as SessionPayload;
    if (Date.now() > payload.exp) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

// Session Retrieval
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

// Server-side Authorization Guards
export async function requireAuth(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    throw new Error('UNAUTHORIZED');
  }
  return session;
}

export async function requireRole(minimumRole: Role): Promise<SessionPayload> {
  const session = await requireAuth();
  const userWeight = ROLE_WEIGHTS[session.role] ?? 0;
  const requiredWeight = ROLE_WEIGHTS[minimumRole] ?? 0;

  if (userWeight < requiredWeight) {
    throw new Error('FORBIDDEN: Insufficient permissions');
  }
  return session;
}

// Set & Clear Session Cookies
export async function setSessionCookie(payload: SessionPayload) {
  const token = signSessionToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
