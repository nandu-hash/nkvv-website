import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await requireAuth();

    const requests = await prisma.nKVVServiceRequest.findMany({
      where: { organizationId: session.organizationId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ requests });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('NKVV requests fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch service requests' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await req.json();

    const { requestedService, priority, description, contactName, contactEmail, contactPhone } = body;

    if (!requestedService || !description) {
      return NextResponse.json(
        { error: 'Service and description are required' },
        { status: 400 }
      );
    }

    const business = await prisma.business.findFirst({
      where: { organizationId: session.organizationId },
    });

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    // Generate request reference number
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const requestNumber = `NKVV-REQ-${new Date().getFullYear()}-${randomSuffix}`;

    // Get current critical/high findings summary
    const findings = await prisma.complianceFinding.findMany({
      where: {
        organizationId: session.organizationId,
        riskLevel: { in: ['CRITICAL', 'HIGH'] },
        status: { not: 'COMPLIANT' },
      },
      select: { findingCode: true, title: true, riskLevel: true },
    });

    const findingsSummary = findings.map((f) => `[${f.riskLevel}] ${f.findingCode}: ${f.title}`).join('; ');

    const serviceRequest = await prisma.nKVVServiceRequest.create({
      data: {
        organizationId: session.organizationId,
        businessId: business.id,
        requestNumber,
        requestedService,
        priority: priority || 'HIGH',
        description,
        linkedFindingsSummary: findingsSummary || 'General implementation request',
        status: 'SUBMITTED',
        contactName: contactName || session.name,
        contactEmail: contactEmail || session.email,
        contactPhone: contactPhone || null,
      },
    });

    // Record audit event
    await prisma.auditEvent.create({
      data: {
        organizationId: session.organizationId,
        businessId: business.id,
        eventType: 'SERVICE_REQUEST_CREATED',
        entityType: 'NKVV_SERVICE_REQUEST',
        entityId: serviceRequest.id,
        actorId: session.userId,
        actorEmail: session.email,
        details: JSON.stringify({
          requestNumber,
          requestedService,
          priority,
        }),
      },
    });

    return NextResponse.json({
      success: true,
      serviceRequest,
    });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('NKVV request creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit service request' },
      { status: 500 }
    );
  }
}
