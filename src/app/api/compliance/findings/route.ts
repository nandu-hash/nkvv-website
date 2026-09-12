import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth();
    const searchParams = req.nextUrl.searchParams;
    const risk = searchParams.get('risk');
    const status = searchParams.get('status');

    const business = await prisma.business.findFirst({
      where: { organizationId: session.organizationId },
    });

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    const whereClause: any = {
      organizationId: session.organizationId,
    };

    if (risk && risk !== 'ALL') {
      whereClause.riskLevel = risk;
    }

    if (status && status !== 'ALL') {
      whereClause.status = status;
    }

    const findings = await prisma.complianceFinding.findMany({
      where: whereClause,
      include: {
        remediationActions: true,
        evidenceMappings: {
          include: {
            evidence: true,
          },
        },
      },
      orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ findings });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Findings fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch findings' },
      { status: 500 }
    );
  }
}
