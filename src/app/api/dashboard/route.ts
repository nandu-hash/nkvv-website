import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await requireAuth();

    const business = await prisma.business.findFirst({
      where: { organizationId: session.organizationId },
      include: {
        profile: true,
        workforce: true,
      },
    });

    if (!business) {
      return NextResponse.json({ error: 'No business found' }, { status: 404 });
    }

    // Get latest assessment
    const latestAssessment = await prisma.complianceAssessment.findFirst({
      where: { businessId: business.id },
      orderBy: { createdAt: 'desc' },
      include: {
        findings: {
          orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
        },
      },
    });

    // Get all findings
    const allFindings = latestAssessment ? latestAssessment.findings : [];

    // Issue counters
    const criticalCount = allFindings.filter((f) => f.riskLevel === 'CRITICAL' && f.status !== 'COMPLIANT').length;
    const highCount = allFindings.filter((f) => f.riskLevel === 'HIGH' && f.status !== 'COMPLIANT').length;
    const mediumCount = allFindings.filter((f) => f.riskLevel === 'MEDIUM' && f.status !== 'COMPLIANT').length;
    const compliantCount = allFindings.filter((f) => f.status === 'COMPLIANT').length;

    // Remediation actions
    const openRemediations = await prisma.remediationAction.count({
      where: {
        organizationId: session.organizationId,
        status: { in: ['OPEN', 'IN_PROGRESS'] },
      },
    });

    // Evidence count
    const evidenceCount = await prisma.evidence.count({
      where: { businessId: business.id },
    });
    const missingEvidenceCount = allFindings.filter((f) => f.status === 'MISSING_EVIDENCE').length;

    // Upcoming calendar items
    const calendarItems = await prisma.complianceCalendarItem.findMany({
      where: { businessId: business.id },
      orderBy: { dueDate: 'asc' },
      take: 5,
    });

    // Active audit
    const activeAudit = await prisma.audit.findFirst({
      where: { businessId: business.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      business,
      assessment: latestAssessment,
      metrics: {
        overallScore: latestAssessment?.overallScore ?? 0,
        dimensionScores: latestAssessment
          ? {
              legalCompliance: latestAssessment.legalComplianceScore,
              documentation: latestAssessment.documentationScore,
              payroll: latestAssessment.payrollScore,
              statutory: latestAssessment.statutoryScore,
              hrProcess: latestAssessment.hrProcessScore,
              evidenceReadiness: latestAssessment.evidenceReadinessScore,
              auditReadiness: latestAssessment.auditReadinessScore,
            }
          : null,
        criticalCount,
        highCount,
        mediumCount,
        compliantCount,
        openRemediations,
        evidenceCount,
        missingEvidenceCount,
      },
      recentFindings: allFindings.slice(0, 6),
      calendarItems,
      activeAudit,
    });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Dashboard data error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
