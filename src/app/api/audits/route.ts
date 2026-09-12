import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await requireAuth();

    const business = await prisma.business.findFirst({
      where: { organizationId: session.organizationId },
    });

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    const audits = await prisma.audit.findMany({
      where: { businessId: business.id },
      orderBy: { startDate: 'desc' },
    });

    const events = await prisma.auditEvent.findMany({
      where: { organizationId: session.organizationId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return NextResponse.json({ audits, events });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Audit fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch audit data' },
      { status: 500 }
    );
  }
}
