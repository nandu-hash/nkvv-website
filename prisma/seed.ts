import { PrismaClient } from '@prisma/client';
import { STATUTORY_RULES } from '../src/services/legal-knowledge/rules';
import { DIAGNOSTIC_QUESTIONS } from '../src/services/diagnostic/questions';
import { evaluateApplicability } from '../src/services/applicability';
import { runComplianceAssessment } from '../src/services/compliance/engine';

const prisma = new PrismaClient();

export async function seedDemoData() {
  console.log('Seeding VELORA Compliance Knowledge Base & Demo Organization...');

  // 1. Seed Legal Sources & Rules
  for (const r of STATUTORY_RULES) {
    const source = await prisma.legalSource.upsert({
      where: { sourceId: r.sourceId },
      update: {
        title: r.sourceTitle,
        sourceType: r.sourceType,
        jurisdiction: r.jurisdiction,
        status: r.sourceVerificationStatus === 'VERIFIED' ? 'PUBLISHED' : 'REVIEW',
      },
      create: {
        sourceId: r.sourceId,
        title: r.sourceTitle,
        sourceType: r.sourceType,
        jurisdiction: r.jurisdiction,
        authorityLevel: 'STATUTE',
        effectiveDate: '1952-03-04',
        status: r.sourceVerificationStatus === 'VERIFIED' ? 'PUBLISHED' : 'REVIEW',
      },
    });

    await prisma.legalRule.upsert({
      where: { ruleId: r.ruleId },
      update: {
        requirement: r.requirement,
        applicabilityLogic: r.applicabilityLogic,
        section: r.section,
        riskLevel: r.riskLevel,
        employeeThreshold: r.employeeThreshold ?? null,
        contractWorkerThreshold: r.contractWorkerThreshold ?? null,
        sourceTextReference: r.sourceTextReference,
        status: r.sourceVerificationStatus === 'VERIFIED' ? 'PUBLISHED' : 'REVIEW',
      },
      create: {
        ruleId: r.ruleId,
        lawId: r.lawId,
        sourceId: r.sourceId,
        legalSourceId: source.id,
        section: r.section,
        subsection: r.subsection ?? null,
        ruleReference: r.ruleReference ?? null,
        requirement: r.requirement,
        applicabilityLogic: r.applicabilityLogic,
        jurisdiction: r.jurisdiction,
        state: r.jurisdiction === 'KARNATAKA' ? 'Karnataka' : null,
        employeeThreshold: r.employeeThreshold ?? null,
        contractWorkerThreshold: r.contractWorkerThreshold ?? null,
        effectiveFrom: '1952-01-01',
        evidenceRequired: r.evidenceRequired,
        complianceTest: r.complianceTest,
        riskLevel: r.riskLevel,
        remediationGuidance: r.remediationGuidance,
        sourceTextReference: r.sourceTextReference,
        status: r.sourceVerificationStatus === 'VERIFIED' ? 'PUBLISHED' : 'REVIEW',
      },
    });
  }
  console.log(`✓ Seeded ${STATUTORY_RULES.length} statutory legal rules`);

  // 2. Seed Diagnostic Questions
  for (const q of DIAGNOSTIC_QUESTIONS) {
    await prisma.diagnosticQuestion.upsert({
      where: { questionCode: q.questionCode },
      update: {
        category: q.category,
        questionText: q.questionText,
        helpText: q.helpText,
        applicableRulesSummary: q.applicableRulesSummary,
        sortOrder: q.sortOrder,
      },
      create: {
        questionCode: q.questionCode,
        category: q.category,
        questionText: q.questionText,
        helpText: q.helpText,
        applicableRulesSummary: q.applicableRulesSummary,
        sortOrder: q.sortOrder,
      },
    });
  }
  console.log(`✓ Seeded ${DIAGNOSTIC_QUESTIONS.length} diagnostic questions`);

  // 3. Seed Demo Organization & Assessor User
  const demoOrg = await prisma.organization.upsert({
    where: { slug: 'velora-demo-technologies' },
    update: {
      name: 'VELORA Demo Technologies Pvt. Ltd.',
      plan: 'INVESTOR_DEMO',
      isDemo: true,
    },
    create: {
      name: 'VELORA Demo Technologies Pvt. Ltd.',
      slug: 'velora-demo-technologies',
      plan: 'INVESTOR_DEMO',
      isDemo: true,
    },
  });

  const demoUser = await prisma.user.upsert({
    where: { email: 'assessor@nkvelora.co.in' },
    update: {
      name: 'Principal Compliance Assessor (NKVV)',
    },
    create: {
      name: 'Principal Compliance Assessor (NKVV)',
      email: 'assessor@nkvelora.co.in',
    },
  });

  await prisma.membership.upsert({
    where: {
      organizationId_userId: {
        organizationId: demoOrg.id,
        userId: demoUser.id,
      },
    },
    update: { role: 'OWNER' },
    create: {
      organizationId: demoOrg.id,
      userId: demoUser.id,
      role: 'OWNER',
    },
  });

  // 4. Seed Demo Business, Profile & Workforce
  let demoBusiness = await prisma.business.findFirst({
    where: { organizationId: demoOrg.id, code: 'VDT-BLR' },
  });

  if (!demoBusiness) {
    demoBusiness = await prisma.business.create({
      data: {
        organizationId: demoOrg.id,
        name: 'VELORA Demo Technologies Pvt. Ltd.',
        code: 'VDT-BLR',
        isDemo: true,
        status: 'ACTIVE',
      },
    });
  }

  await prisma.businessProfile.upsert({
    where: { businessId: demoBusiness.id },
    update: {
      legalEntityType: 'Private Limited Company',
      industry: 'IT / ITES',
      state: 'Karnataka',
      city: 'Bengaluru',
      establishmentType: 'Commercial Establishment',
      payrollSystem: 'RazorpayX',
      attendanceSystem: 'Biometric + Geo-fenced Mobile App',
      hrisSystem: 'Keka HR',
      currentHrProcess: 'Semi-Automated',
      complianceResponsibility: 'In-House HR Lead',
      existingConsultant: 'Local Chartered Accountant (Ad-hoc)',
    },
    create: {
      businessId: demoBusiness.id,
      legalEntityType: 'Private Limited Company',
      industry: 'IT / ITES',
      state: 'Karnataka',
      city: 'Bengaluru',
      establishmentType: 'Commercial Establishment',
      payrollSystem: 'RazorpayX',
      attendanceSystem: 'Biometric + Geo-fenced Mobile App',
      hrisSystem: 'Keka HR',
      currentHrProcess: 'Semi-Automated',
      complianceResponsibility: 'In-House HR Lead',
      existingConsultant: 'Local Chartered Accountant (Ad-hoc)',
    },
  });

  await prisma.workforceProfile.upsert({
    where: { businessId: demoBusiness.id },
    update: {
      employeeCount: 120,
      workerCount: 95,
      contractWorkerCount: 25,
      migrantWorkerStatus: false,
      factoryStatus: false,
      constructionActivity: false,
      hazardousActivity: false,
      shiftWork: true,
      workingHours: 8.5,
      womenEmployees: 42,
      contractLabourUsage: true,
    },
    create: {
      businessId: demoBusiness.id,
      employeeCount: 120,
      workerCount: 95,
      contractWorkerCount: 25,
      migrantWorkerStatus: false,
      factoryStatus: false,
      constructionActivity: false,
      hazardousActivity: false,
      shiftWork: true,
      workingHours: 8.5,
      womenEmployees: 42,
      contractLabourUsage: true,
    },
  });

  // 5. Seed Diagnostic & Responses
  let diagnostic = await prisma.diagnostic.findFirst({
    where: { businessId: demoBusiness.id },
  });

  if (!diagnostic) {
    diagnostic = await prisma.diagnostic.create({
      data: {
        organizationId: demoOrg.id,
        businessId: demoBusiness.id,
        title: 'Initial Statutory Health Diagnostic (FY 2026)',
        status: 'COMPLETED',
        conductedBy: 'Principal Compliance Assessor (NKVV)',
        completedAt: new Date(),
      },
    });
  }

  const sampleResponses: Record<string, { answer: string; notes: string }> = {
    'DIAG-POSH-01': {
      answer: 'PARTIALLY',
      notes: 'Internal Committee exists with 3 employees, but lacks an independent external legal/NGO member or formal office order.',
    },
    'DIAG-POSH-02': {
      answer: 'NO',
      notes: 'Annual POSH report has never been submitted to the Bengaluru District Officer.',
    },
    'DIAG-PF-01': {
      answer: 'YES',
      notes: 'EPFO code active; all full-time employees mapped with UAN.',
    },
    'DIAG-PF-02': {
      answer: 'PARTIALLY',
      notes: 'Monthly remittances occur but delayed beyond the 15th twice in the last 6 months due to late payroll cutoff.',
    },
    'DIAG-ESI-01': {
      answer: 'PARTIALLY',
      notes: '14 support staff earn under ₹21,000; ESIC sub-code exists but monthly deductions not remitted consistently.',
    },
    'DIAG-CLRA-01': {
      answer: 'NO',
      notes: 'Company engages 25 contract housekeeping and security staff without Principal Employer Registration (Form I).',
    },
    'DIAG-CLRA-02': {
      answer: 'NO',
      notes: 'No monthly verification of vendor wage registers or vendor PF/ESI challans before vendor invoice clearance.',
    },
    'DIAG-GRA-01': {
      answer: 'NO',
      notes: 'Notice of Opening (Form A) not on file; Form F nomination forms not collected upon 1-year employment completion.',
    },
    'DIAG-MAT-01': {
      answer: 'PARTIALLY',
      notes: '26 weeks paid leave is provided in employee handbook, but no creche amenity or tie-up is active for 120 headcount.',
    },
    'DIAG-STAT-01': {
      answer: 'YES',
      notes: 'Karnataka Shops & Establishments Form C certificate registered via e-Karmika.',
    },
    'DIAG-PAY-01': {
      answer: 'YES',
      notes: 'RazorpayX generates itemized electronic payslips on the 1st of every month.',
    },
    'DIAG-AUD-01': {
      answer: 'NO',
      notes: 'Compliance records scattered across local drives, Google Drive, and paper files; no compliance calendar.',
    },
  };

  for (const [code, resp] of Object.entries(sampleResponses)) {
    const question = await prisma.diagnosticQuestion.findUnique({
      where: { questionCode: code },
    });
    if (question) {
      await prisma.diagnosticResponse.upsert({
        where: {
          diagnosticId_questionId: {
            diagnosticId: diagnostic.id,
            questionId: question.id,
          },
        },
        update: {
          answer: resp.answer,
          notes: resp.notes,
        },
        create: {
          organizationId: demoOrg.id,
          diagnosticId: diagnostic.id,
          questionId: question.id,
          answer: resp.answer,
          notes: resp.notes,
          confidence: 'HIGH',
        },
      });
    }
  }

  // 6. Seed Evidence Documents
  const evidenceItems = [
    {
      title: 'EPFO Registration Letter & Portal Profile',
      category: 'Statutory Registration',
      status: 'VERIFIED',
      fileName: 'EPFO_Registration_Certificate_VDT.pdf',
    },
    {
      title: 'ESIC Sub-Code Allotment Order',
      category: 'Statutory Registration',
      status: 'VERIFIED',
      fileName: 'ESIC_SubCode_Bengaluru.pdf',
    },
    {
      title: 'Internal POSH Policy Draft',
      category: 'Policy',
      status: 'UNVERIFIED',
      fileName: 'VELORA_POSH_Policy_2025.docx',
    },
    {
      title: 'e-Karmika Form C Karnataka Registration',
      category: 'Statutory Registration',
      status: 'EXPIRED',
      fileName: 'Form_C_Karnataka_eKarmika.pdf',
    },
  ];

  for (const ev of evidenceItems) {
    const evidence = await prisma.evidence.create({
      data: {
        organizationId: demoOrg.id,
        businessId: demoBusiness.id,
        title: ev.title,
        category: ev.category,
        status: ev.status,
        notes: 'Document indexed during initial VELORA onboarding audit.',
      },
    });

    await prisma.evidenceDocument.create({
      data: {
        organizationId: demoOrg.id,
        evidenceId: evidence.id,
        fileName: ev.fileName,
        fileType: ev.fileName.endsWith('.pdf') ? 'PDF' : 'DOCX',
        fileSize: 450000,
        fileUrl: `/uploads/${ev.fileName}`,
        storageKey: `demo/${ev.fileName}`,
        extractedMetadata: JSON.stringify({
          authority: 'Ministry of Labour & Employment',
          documentType: ev.category,
          verificationScore: 0.92,
        }),
      },
    });
  }

  // 7. Run Compliance Assessment Engine
  const bProfile = {
    legalEntityType: 'Private Limited Company',
    industry: 'IT / ITES',
    state: 'Karnataka',
    city: 'Bengaluru',
    establishmentType: 'Commercial Establishment',
  };
  const wProfile = {
    employeeCount: 120,
    workerCount: 95,
    contractWorkerCount: 25,
    migrantWorkerStatus: false,
    factoryStatus: false,
    constructionActivity: false,
    hazardousActivity: false,
    shiftWork: true,
    workingHours: 8.5,
    womenEmployees: 42,
    contractLabourUsage: true,
  };

  const applicability = evaluateApplicability(bProfile, wProfile, STATUTORY_RULES);
  const assessmentResult = runComplianceAssessment(applicability, sampleResponses, evidenceItems.length);

  // Clear previous assessments for demo to ensure fresh run
  await prisma.complianceFinding.deleteMany({
    where: { organizationId: demoOrg.id },
  });
  await prisma.complianceAssessment.deleteMany({
    where: { organizationId: demoOrg.id },
  });

  const assessment = await prisma.complianceAssessment.create({
    data: {
      organizationId: demoOrg.id,
      businessId: demoBusiness.id,
      status: 'COMPLETED',
      overallScore: assessmentResult.overallScore,
      legalComplianceScore: assessmentResult.dimensionScores.legalCompliance,
      documentationScore: assessmentResult.dimensionScores.documentation,
      payrollScore: assessmentResult.dimensionScores.payroll,
      statutoryScore: assessmentResult.dimensionScores.statutory,
      hrProcessScore: assessmentResult.dimensionScores.hrProcess,
      evidenceReadinessScore: assessmentResult.dimensionScores.evidenceReadiness,
      auditReadinessScore: assessmentResult.dimensionScores.auditReadiness,
      assessedBy: 'Principal Compliance Assessor (NKVV)',
      summary: assessmentResult.summary,
    },
  });

  // Seed Findings and Remediation Actions
  for (const f of assessmentResult.findings) {
    const finding = await prisma.complianceFinding.create({
      data: {
        organizationId: demoOrg.id,
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

    // Create realistic remediation actions for non-compliant items
    if (f.status !== 'COMPLIANT') {
      await prisma.remediationAction.create({
        data: {
          organizationId: demoOrg.id,
          findingId: finding.id,
          actionTitle: `Remediate: ${f.title}`,
          actionDescription: f.recommendation,
          owner: 'NKVV Compliance Specialist',
          priority: f.priority,
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          status: f.riskLevel === 'CRITICAL' ? 'IN_PROGRESS' : 'OPEN',
          notes: 'Remediation task queued for NKVV operational workflow support.',
        },
      });
    }
  }

  // 8. Seed Compliance Calendar
  const calendarDates = [
    { title: 'EPF Monthly Contribution Remittance (ECR)', law: 'EPF Act 1952', due: new Date('2026-09-15') },
    { title: 'ESIC Monthly Return & Contribution', law: 'ESI Act 1948', due: new Date('2026-09-15') },
    { title: 'Karnataka Professional Tax (PT) Monthly Return', law: 'KPT Act 1976', due: new Date('2026-09-20') },
    { title: 'POSH Annual Return Filing with District Officer', law: 'POSH Act 2013', due: new Date('2027-01-31') },
  ];

  for (const c of calendarDates) {
    await prisma.complianceCalendarItem.create({
      data: {
        organizationId: demoOrg.id,
        businessId: demoBusiness.id,
        title: c.title,
        law: c.law,
        frequency: 'MONTHLY',
        dueDate: c.due,
        statutoryAuthority: 'Govt. of Karnataka / Central Labour Dept.',
        status: 'UPCOMING',
      },
    });
  }

  // 9. Seed Audit Entry
  await prisma.audit.create({
    data: {
      organizationId: demoOrg.id,
      businessId: demoBusiness.id,
      auditName: 'Q3 Statutory Labour Readiness Audit',
      scope: 'Statutory Registrations, Wages, CLRA, POSH & Contracts',
      auditor: 'NK Velora Ventures Audit Practice',
      status: 'IN_PROGRESS',
      findingsCount: assessmentResult.findings.length,
      score: assessmentResult.overallScore,
      startDate: new Date(),
    },
  });

  console.log(`✓ Demo business seeded successfully with score: ${assessmentResult.overallScore}/100!`);
}

async function main() {
  await seedDemoData();
}

if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
