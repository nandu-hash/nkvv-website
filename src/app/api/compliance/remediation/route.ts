import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await req.json();

    const { id, findingId, actionTitle, actionDescription, owner, priority, dueDate, status, notes } = body;

    if (!findingId || !actionTitle) {
      return NextResponse.json({ error: 'Finding ID and action title are required' }, { status: 400 });
    }

    let action;
    if (id) {
      action = await prisma.remediationAction.update({
        where: { id },
        data: {
          actionTitle,
          actionDescription,
          owner,
          priority,
          dueDate: dueDate ? new Date(dueDate) : null,
          status,
          notes,
          resolvedAt: status === 'RESOLVED' ? new Date() : null,
        },
      });
    } else {
      action = await prisma.remediationAction.create({
        data: {
          organizationId: session.organizationId,
          findingId,
          actionTitle,
          actionDescription: actionDescription || '',
          owner: owner || session.name,
          priority: priority || 'HIGH',
          dueDate: dueDate ? new Date(dueDate) : null,
          status: status || 'OPEN',
          notes: notes || '',
        },
      });
    }

    // Record audit event
    await prisma.auditEvent.create({
      data: {
        organizationId: session.organizationId,
        eventType: 'REMEDIATION_UPDATED',
        entityType: 'REMEDIATION_ACTION',
        entityId: action.id,
        actorId: session.userId,
        actorEmail: session.email,
        details: JSON.stringify({
          actionTitle,
          status,
          findingId,
        }),
      },
    });

    return NextResponse.json({ success: true, action });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Remediation action error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update remediation action' },
      { status: 500 }
    );
  }
}
