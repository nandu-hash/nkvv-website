import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { STATUTORY_RULES } from '@/services/legal-knowledge/rules';
import { evaluateApplicability } from '@/services/applicability';
import { runComplianceAssessment } from '@/services/compliance/engine';

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

    // Evaluate applicability to filter questions
    const applicability = evaluateApplicability(
      business.profile,
      business.workforce,
      STATUTORY_RULES
    );

    // Get all questions
    const allQuestions = await prisma.diagnosticQuestion.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    // Find or create diagnostic
    let diagnostic = await prisma.diagnostic.findFirst({
      where: { businessId: business.id },
      include: {
        responses: {
          include: {
            question: true,
          },
        },
      },
    });

    if (!diagnostic) {
      diagnostic = await prisma.diagnostic.create({
        data: {
          organizationId: session.organizationId,
          businessId: business.id,
          title: `VELORA Compliance Diagnostic - ${business.name}`,
          status: 'IN_PROGRESS',
        },
        include: {
          responses: {
            include: {
              question: true,
            },
          },
        },
      });
    }

    return NextResponse.json({
      diagnostic,
      questions: allQuestions,
      applicability,
    });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Diagnostic fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch diagnostic' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await req.json();
    const { diagnosticId, responses } = body;

    const business = await prisma.business.findFirst({
      where: { organizationId: session.organizationId },
      include: {
        profile: true,
        workforce: true,
        evidences: true,
      },
    });

    if (!business) {
      return NextResponse.json({ error: 'No business found' }, { status: 404 });
    }

    // Save/upsert responses
    for (const [questionId, respData] of Object.entries(responses as Record<string, any>)) {
      await prisma.diagnosticResponse.upsert({
        where: {
          diagnosticId_questionId: {
            diagnosticId,
            questionId,
          },
        },
        update: {
          answer: respData.answer,
          notes: respData.notes ?? null,
          confidence: respData.confidence ?? 'HIGH',
        },
        create: {
          organizationId: session.organizationId,
          diagnosticId,
          questionId,
          answer: respData.answer,
          notes: respData.notes ?? null,
          confidence: respData.confidence ?? 'HIGH',
        },
      });
    }

    // Run Compliance Assessment
    const applicability = evaluateApplicability(
      business.profile,
      business.workforce,
      STATUTORY_RULES
    );

    // Map questions to codes
    const questions = await prisma.diagnosticQuestion.findMany();
    const codeToResponse: Record<string, { answer: string; notes?: string }> = {};
    for (const q of questions) {
      if (responses[q.id]) {
        codeToResponse[q.questionCode] = responses[q.id];
      }
    }

    const assessmentResult = runComplianceAssessment(
      applicability,
      codeToResponse,
      business.evidences.length
    );

    // Persist assessment & findings
    const assessment = await prisma.complianceAssessment.create({
      data: {
        organizationId: session.organizationId,
        businessId: business.id,
        status: 'COMPLETED',
        overallScore: assessmentResult.overallScore,
        legalComplianceScore: assessmentResult.dimensionScores.legalCompliance,
        documentationScore: assessmentResult.dimensionScores.documentation,
        payrollScore: assessmentResult.dimensionScores.payroll,
        statutoryScore: assessmentResult.dimensionScores.statutory,
        hrProcessScore: assessmentResult.dimensionScores.hrProcess,
        evidenceReadinessScore: assessmentResult.dimensionScores.evidenceReadiness,
        auditReadinessScore: assessmentResult.dimensionScores.auditReadiness,
        assessedBy: session.name,
        summary: assessmentResult.summary,
      },
    });

    // Create findings & remediation actions
    for (const f of assessmentResult.findings) {
      const finding = await prisma.complianceFinding.create({
        data: {
          organizationId: session.organizationId,
          assessmentId: assessment.id,
          findingCode: f.findingCode,
          title: f.title,
          description: f.description,
          law: f.law,
          section: f.section,
          sourceText: f.sourceText,
          applicabilityReason: f.applicabilityReason,
          evidenceSummary: f.evidenceSummary,
          gapAnalysis: f.gapAnalysis,
          riskLevel: f.riskLevel,
          recommendation: f.recommendation,
          owner: f.owner,
          priority: f.priority,
          dueDate: f.dueDate ? new Date(f.dueDate) : null,
          status: f.status,
          confidence: f.confidence,
        },
      });

      if (f.status !== 'COMPLIANT') {
        await prisma.remediationAction.create({
          data: {
            organizationId: session.organizationId,
            findingId: finding.id,
            actionTitle: `Remediate: ${f.title}`,
            actionDescription: f.recommendation,
            owner: f.owner,
            priority: f.priority,
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            status: f.riskLevel === 'CRITICAL' ? 'IN_PROGRESS' : 'OPEN',
            notes: 'Generated automatically by VELORA diagnostic assessment.',
          },
        });
      }
    }

    // Update diagnostic status
    await prisma.diagnostic.update({
      where: { id: diagnosticId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        conductedBy: session.name,
      },
    });

    // Record audit event
    await prisma.auditEvent.create({
      data: {
        organizationId: session.organizationId,
        businessId: business.id,
        eventType: 'ASSESSMENT_RUN',
        entityType: 'COMPLIANCE_ASSESSMENT',
        entityId: assessment.id,
        actorId: session.userId,
        actorEmail: session.email,
        details: JSON.stringify({
          score: assessmentResult.overallScore,
          findingsCount: assessmentResult.findings.length,
        }),
      },
    });

    return NextResponse.json({
      success: true,
      assessmentId: assessment.id,
      score: assessmentResult.overallScore,
      dimensionScores: assessmentResult.dimensionScores,
      findingsCount: assessmentResult.findings.length,
    });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Diagnostic save error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save diagnostic assessment' },
      { status: 500 }
    );
  }
}
