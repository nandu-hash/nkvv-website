import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { setSessionCookie, ROLES, SessionPayload } from '@/lib/auth';

export async function POST() {
  try {
    // Find or create the demo organization
    let demoOrg = await prisma.organization.findFirst({
      where: { slug: 'velora-demo-technologies' },
    });

    if (!demoOrg) {
      demoOrg = await prisma.organization.create({
        data: {
          name: 'VELORA Demo Technologies Pvt. Ltd.',
          slug: 'velora-demo-technologies',
          plan: 'INVESTOR_DEMO',
          isDemo: true,
        },
      });
    }

    // Find or create demo assessor user
    let demoUser = await prisma.user.findUnique({
      where: { email: 'assessor@nkvelora.co.in' },
    });

    if (!demoUser) {
      demoUser = await prisma.user.create({
        data: {
          name: 'Principal Compliance Assessor (NKVV)',
          email: 'assessor@nkvelora.co.in',
        },
      });
    }

    // Ensure membership exists
    const membership = await prisma.membership.upsert({
      where: {
        organizationId_userId: {
          organizationId: demoOrg.id,
          userId: demoUser.id,
        },
      },
      update: { role: ROLES.OWNER },
      create: {
        organizationId: demoOrg.id,
        userId: demoUser.id,
        role: ROLES.OWNER,
      },
    });

    const sessionPayload: SessionPayload = {
      userId: demoUser.id,
      organizationId: demoOrg.id,
      role: ROLES.OWNER,
      email: demoUser.email,
      name: demoUser.name,
      orgName: demoOrg.name,
      isDemo: true,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
    };

    await setSessionCookie(sessionPayload);

    return NextResponse.json({
      success: true,
      user: { id: demoUser.id, name: demoUser.name, email: demoUser.email },
      organization: { id: demoOrg.id, name: demoOrg.name, isDemo: true },
      role: membership.role,
    });
  } catch (error: any) {
    console.error('Demo auth error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initialize demo session' },
      { status: 500 }
    );
  }
}
