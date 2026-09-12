import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { STATUTORY_RULES } from '@/services/legal-knowledge/rules';
import { evaluateApplicability } from '@/services/applicability';

export async function GET() {
  try {
    const session = await requireAuth();

    let business = await prisma.business.findFirst({
      where: { organizationId: session.organizationId },
      include: {
        profile: true,
        workforce: true,
      },
    });

    if (!business) {
      // Create empty default business for newly registered organization
      business = await prisma.business.create({
        data: {
          organizationId: session.organizationId,
          name: session.orgName,
          code: session.orgName.substring(0, 3).toUpperCase() + '-01',
          profile: {
            create: {
              legalEntityType: 'Private Limited Company',
              industry: 'IT / ITES',
              state: 'Karnataka',
              city: 'Bengaluru',
              establishmentType: 'Commercial Establishment',
            },
          },
          workforce: {
            create: {
              employeeCount: 25,
              workerCount: 20,
              contractWorkerCount: 5,
              womenEmployees: 8,
              contractLabourUsage: true,
            },
          },
        },
        include: {
          profile: true,
          workforce: true,
        },
      });
    }

    // Evaluate applicability
    const applicability = evaluateApplicability(
      business.profile,
      business.workforce,
      STATUTORY_RULES
    );

    return NextResponse.json({
      business,
      applicability,
    });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Business fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch business' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await req.json();

    const {
      name,
      legalEntityType,
      industry,
      state,
      city,
      establishmentType,
      payrollSystem,
      attendanceSystem,
      hrisSystem,
      currentHrProcess,
      complianceResponsibility,
      existingConsultant,
      employeeCount,
      workerCount,
      contractWorkerCount,
      migrantWorkerStatus,
      factoryStatus,
      constructionActivity,
      hazardousActivity,
      shiftWork,
      workingHours,
      womenEmployees,
      contractLabourUsage,
    } = body;

    let business = await prisma.business.findFirst({
      where: { organizationId: session.organizationId },
    });

    if (!business) {
      business = await prisma.business.create({
        data: {
          organizationId: session.organizationId,
          name: name || session.orgName,
          code: (name || session.orgName).substring(0, 3).toUpperCase() + '-01',
        },
      });
    } else if (name && name !== business.name) {
      business = await prisma.business.update({
        where: { id: business.id },
        data: { name },
      });
    }

    const updatedProfile = await prisma.businessProfile.upsert({
      where: { businessId: business.id },
      update: {
        legalEntityType,
        industry,
        state,
        city,
        establishmentType,
        payrollSystem,
        attendanceSystem,
        hrisSystem,
        currentHrProcess,
        complianceResponsibility,
        existingConsultant,
      },
      create: {
        businessId: business.id,
        legalEntityType,
        industry,
        state,
        city,
        establishmentType,
        payrollSystem,
        attendanceSystem,
        hrisSystem,
        currentHrProcess,
        complianceResponsibility,
        existingConsultant,
      },
    });

    const updatedWorkforce = await prisma.workforceProfile.upsert({
      where: { businessId: business.id },
      update: {
        employeeCount: Number(employeeCount) || 0,
        workerCount: Number(workerCount) || 0,
        contractWorkerCount: Number(contractWorkerCount) || 0,
        migrantWorkerStatus: Boolean(migrantWorkerStatus),
        factoryStatus: Boolean(factoryStatus),
        constructionActivity: Boolean(constructionActivity),
        hazardousActivity: Boolean(hazardousActivity),
        shiftWork: Boolean(shiftWork),
        workingHours: Number(workingHours) || 8.0,
        womenEmployees: Number(womenEmployees) || 0,
        contractLabourUsage: Boolean(contractLabourUsage),
      },
      create: {
        businessId: business.id,
        employeeCount: Number(employeeCount) || 0,
        workerCount: Number(workerCount) || 0,
        contractWorkerCount: Number(contractWorkerCount) || 0,
        migrantWorkerStatus: Boolean(migrantWorkerStatus),
        factoryStatus: Boolean(factoryStatus),
        constructionActivity: Boolean(constructionActivity),
        hazardousActivity: Boolean(hazardousActivity),
        shiftWork: Boolean(shiftWork),
        workingHours: Number(workingHours) || 8.0,
        womenEmployees: Number(womenEmployees) || 0,
        contractLabourUsage: Boolean(contractLabourUsage),
      },
    });

    // Record audit event
    await prisma.auditEvent.create({
      data: {
        organizationId: session.organizationId,
        businessId: business.id,
        eventType: 'PROFILE_CHANGED',
        entityType: 'BUSINESS_PROFILE',
        entityId: business.id,
        actorId: session.userId,
        actorEmail: session.email,
        details: JSON.stringify({
          employeeCount,
          contractWorkerCount,
          state,
          industry,
        }),
      },
    });

    const applicability = evaluateApplicability(
      updatedProfile,
      updatedWorkforce,
      STATUTORY_RULES
    );

    return NextResponse.json({
      success: true,
      business: {
        ...business,
        profile: updatedProfile,
        workforce: updatedWorkforce,
      },
      applicability,
    });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Business update error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update business profile' },
      { status: 500 }
    );
  }
}
