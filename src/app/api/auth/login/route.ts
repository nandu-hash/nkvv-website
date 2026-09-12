import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, setSessionCookie, Role, SessionPayload } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
      include: {
        memberships: {
          include: {
            organization: true,
          },
        },
      },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const primaryMembership = user.memberships[0];
    if (!primaryMembership) {
      return NextResponse.json(
        { error: 'User does not belong to any organization' },
        { status: 403 }
      );
    }

    const sessionPayload: SessionPayload = {
      userId: user.id,
      organizationId: primaryMembership.organizationId,
      role: primaryMembership.role as Role,
      email: user.email,
      name: user.name,
      orgName: primaryMembership.organization.name,
      isDemo: primaryMembership.organization.isDemo,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
    };

    await setSessionCookie(sessionPayload);

    return NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
      organization: {
        id: primaryMembership.organizationId,
        name: primaryMembership.organization.name,
      },
      role: primaryMembership.role,
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to authenticate' },
      { status: 500 }
    );
  }
}
