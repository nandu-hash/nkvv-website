import { NextRequest, NextResponse } from 'next/server';
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

    const evidences = await prisma.evidence.findMany({
      where: { businessId: business.id },
      include: {
        documents: true,
        mappings: {
          include: {
            legalRule: true,
            finding: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ evidences });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Evidence fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch evidence records' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await req.json();

    const { title, category, status, notes, fileName, fileType, legalRuleId } = body;

    const business = await prisma.business.findFirst({
      where: { organizationId: session.organizationId },
    });

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    const evidence = await prisma.evidence.create({
      data: {
        organizationId: session.organizationId,
        businessId: business.id,
        title,
        category: category || 'Statutory Registration',
        status: status || 'UNVERIFIED',
        notes: notes || '',
      },
    });

    if (fileName) {
      await prisma.evidenceDocument.create({
        data: {
          organizationId: session.organizationId,
          evidenceId: evidence.id,
          fileName,
          fileType: fileType || 'PDF',
          fileSize: 250000,
          fileUrl: `/uploads/${fileName}`,
          storageKey: `org-${session.organizationId}/${fileName}`,
          uploadedBy: session.name,
          extractedMetadata: JSON.stringify({
            documentType: category,
            uploadedAt: new Date().toISOString(),
            status,
          }),
        },
      });
    }

    if (legalRuleId) {
      await prisma.evidenceMapping.create({
        data: {
          organizationId: session.organizationId,
          evidenceId: evidence.id,
          legalRuleId,
          relevanceScore: 1.0,
          notes: 'Direct statutory requirement mapping',
        },
      });
    }

    // Record audit event
    await prisma.auditEvent.create({
      data: {
        organizationId: session.organizationId,
        businessId: business.id,
        eventType: 'EVIDENCE_UPLOAD',
        entityType: 'EVIDENCE',
        entityId: evidence.id,
        actorId: session.userId,
        actorEmail: session.email,
        details: JSON.stringify({ title, category, fileName }),
      },
    });

    return NextResponse.json({ success: true, evidence });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Evidence create error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create evidence' },
      { status: 500 }
    );
  }
}
