import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, setSessionCookie, ROLES, SessionPayload } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, organizationName } = body;

    if (!name || !email || !password || !organizationName) {
      return NextResponse.json(
        { error: 'All fields (name, email, password, organizationName) are required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email address already exists' },
        { status: 409 }
      );
    }

    const orgSlug = organizationName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') + '-' + Math.random().toString(36).substring(2, 6);

    const result = await prisma.$transaction(async (tx) => {
      const org = await tx.organization.create({
        data: {
          name: organizationName.trim(),
          slug: orgSlug,
          isDemo: false,
        },
      });

      const user = await tx.user.create({
        data: {
          name: name.trim(),
          email: cleanEmail,
          passwordHash: hashPassword(password),
        },
      });

      const membership = await tx.membership.create({
        data: {
          organizationId: org.id,
          userId: user.id,
          role: ROLES.OWNER,
        },
      });

      return { user, org, membership };
    });

    const sessionPayload: SessionPayload = {
      userId: result.user.id,
      organizationId: result.org.id,
      role: ROLES.OWNER,
      email: result.user.email,
      name: result.user.name,
      orgName: result.org.name,
      isDemo: false,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
    };

    await setSessionCookie(sessionPayload);

    return NextResponse.json({
      success: true,
      user: { id: result.user.id, name: result.user.name, email: result.user.email },
      organization: { id: result.org.id, name: result.org.name },
      role: ROLES.OWNER,
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create account' },
      { status: 500 }
    );
  }
}
