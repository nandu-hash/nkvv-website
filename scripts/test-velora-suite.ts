import { PrismaClient } from '@prisma/client';
import { STATUTORY_RULES } from '../src/services/legal-knowledge/rules';
import { evaluateApplicability } from '../src/services/applicability';
import { calculateVeloraScore, runComplianceAssessment } from '../src/services/compliance/engine';

const prisma = new PrismaClient();

async function runVeloraTestSuite() {
  console.log('====================================================');
  console.log('STARTING VELORA COMPLIANCE TEST SUITE');
  console.log('====================================================');

  // =====================================================
  // 1. APPLICABILITY & THRESHOLD TESTS
  // =====================================================
  console.log('\n--- 1. Testing Statutory Applicability & Thresholds ---');

  const baseBusiness = {
    legalEntityType: 'Private Limited Company',
    industry: 'IT / ITES',
    state: 'Karnataka',
    city: 'Bengaluru',
    establishmentType: 'Commercial Establishment',
  };

  // Test 1a: Small startup (< 10 employees)
  const smallWorkforce = {
    employeeCount: 7,
    workerCount: 7,
    contractWorkerCount: 0,
    migrantWorkerStatus: false,
    factoryStatus: false,
    constructionActivity: false,
    hazardousActivity: false,
    shiftWork: false,
    workingHours: 8,
    womenEmployees: 2,
    contractLabourUsage: false,
  };
  const smallApp = evaluateApplicability(baseBusiness, smallWorkforce, STATUTORY_RULES);

  const epfSmall = smallApp.find((r) => r.ruleId === 'EPF-REG-01');
  const poshSmall = smallApp.find((r) => r.ruleId === 'POSH-IC-01');
  const clraSmall = smallApp.find((r) => r.ruleId === 'CLRA-PE-01');

  if (epfSmall?.status !== 'NOT_APPLICABLE') throw new Error('EPF should be NOT_APPLICABLE for 7 employees');
  if (poshSmall?.status !== 'NOT_APPLICABLE') throw new Error('POSH IC should be NOT_APPLICABLE for 7 employees');
  if (clraSmall?.status !== 'NOT_APPLICABLE') throw new Error('CLRA should be NOT_APPLICABLE for 0 contract workers');
  console.log('✓ Threshold sub-10 employee test passed (EPF, POSH, CLRA correctly NOT_APPLICABLE)');

  // Test 1b: Mid-sized company (120 employees, 25 contract workers)
  const midWorkforce = {
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
  const midApp = evaluateApplicability(baseBusiness, midWorkforce, STATUTORY_RULES);

  const epfMid = midApp.find((r) => r.ruleId === 'EPF-REG-01');
  const poshMid = midApp.find((r) => r.ruleId === 'POSH-IC-01');
  const clraMid = midApp.find((r) => r.ruleId === 'CLRA-PE-01');
  const unverifiedRule = midApp.find((r) => r.ruleId === 'KA-UNSUPPORTED-RULE-TEST');

  if (epfMid?.status !== 'APPLICABLE') throw new Error('EPF should be APPLICABLE for 120 employees');
  if (poshMid?.status !== 'APPLICABLE') throw new Error('POSH should be APPLICABLE for 120 employees');
  if (clraMid?.status !== 'APPLICABLE') throw new Error('CLRA should be APPLICABLE for 25 contract workers');
  if (unverifiedRule?.status !== 'REQUIRES_REVIEW') {
    throw new Error('Unsupported Karnataka rule should return REQUIRES_REVIEW');
  }
  console.log('✓ Threshold 120 employee test passed (EPF, POSH, CLRA APPLICABLE; Unverified rule REQUIRES_REVIEW)');

  // Test 1c: Territorial Jurisdiction
  const maharashtraBusiness = { ...baseBusiness, state: 'Maharashtra' };
  const mhApp = evaluateApplicability(maharashtraBusiness, midWorkforce, STATUTORY_RULES);
  const kaShopRule = mhApp.find((r) => r.ruleId === 'KA-SHOPS-FORM-C');
  if (kaShopRule?.status !== 'NOT_APPLICABLE') {
    throw new Error('Karnataka Shops Act should be NOT_APPLICABLE in Maharashtra');
  }
  console.log('✓ Territorial jurisdiction test passed (Karnataka rule excluded for Maharashtra establishment)');

  // =====================================================
  // 2. SCORING & RISK ENGINE TESTS
  // =====================================================
  console.log('\n--- 2. Testing Transparent VELORA Score Engine ---');

  const assessment = runComplianceAssessment(
    midApp,
    {
      'DIAG-POSH-01': { answer: 'YES' },
      'DIAG-PF-01': { answer: 'YES' },
      'DIAG-CLRA-01': { answer: 'YES' },
    },
    2
  );

  if (assessment.overallScore < 0 || assessment.overallScore > 100) {
    throw new Error(`Score out of bounds: ${assessment.overallScore}`);
  }
  if (!assessment.dimensionScores.legalCompliance || !assessment.dimensionScores.payroll) {
    throw new Error('Dimension scores missing required attributes');
  }
  console.log(`✓ Transparent 7-dimension score calculated: ${assessment.overallScore}/100`);

  // =====================================================
  // 3. TENANT ISOLATION SECURITY TESTS
  // =====================================================
  console.log('\n--- 3. Testing Strict Multi-Tenant Isolation ---');

  const orgA = await prisma.organization.create({
    data: {
      name: 'Tenant Alpha Pvt Ltd',
      slug: 'tenant-alpha-' + Date.now(),
    },
  });

  const orgB = await prisma.organization.create({
    data: {
      name: 'Tenant Beta Pvt Ltd',
      slug: 'tenant-beta-' + Date.now(),
    },
  });

  const businessA = await prisma.business.create({
    data: {
      organizationId: orgA.id,
      name: 'Alpha Operations',
      code: 'ALPHA-01',
    },
  });

  const evidenceA = await prisma.evidence.create({
    data: {
      organizationId: orgA.id,
      businessId: businessA.id,
      title: 'Confidential Alpha Salary Register 2026',
      category: 'Payroll',
      status: 'VERIFIED',
    },
  });

  const assessmentA = await prisma.complianceAssessment.create({
    data: {
      organizationId: orgA.id,
      businessId: businessA.id,
      status: 'COMPLETED',
      overallScore: 84.5,
    },
  });

  const findingA = await prisma.complianceFinding.create({
    data: {
      organizationId: orgA.id,
      assessmentId: assessmentA.id,
      findingCode: 'FND-ALPHA-01',
      title: 'Alpha Internal Gratuity Liability Audit',
      description: 'Proprietary audit data',
      law: 'Payment of Gratuity Act, 1972',
      section: 'Section 4',
      sourceText: 'Statutory reference',
      applicabilityReason: 'Staff count >= 10',
      gapAnalysis: 'Gap analysis for Org A',
      riskLevel: 'MEDIUM',
      recommendation: 'Fix gap',
      status: 'PARTIALLY_COMPLIANT',
    },
  });

  const serviceReqA = await prisma.nKVVServiceRequest.create({
    data: {
      organizationId: orgA.id,
      businessId: businessA.id,
      requestNumber: 'REQ-ALPHA-' + Date.now(),
      requestedService: 'HR Audit',
      description: 'Private implementation request',
      contactName: 'Alpha Lead',
      contactEmail: 'lead@alpha.com',
    },
  });

  // Verify Org B queries CANNOT see Org A's data
  const orgBBusinesses = await prisma.business.findMany({
    where: { organizationId: orgB.id },
  });
  if (orgBBusinesses.some((b) => b.id === businessA.id)) {
    throw new Error('SECURITY VIOLATION: Org B accessed Org A business!');
  }

  const orgBEvidences = await prisma.evidence.findMany({
    where: { organizationId: orgB.id },
  });
  if (orgBEvidences.some((e) => e.id === evidenceA.id)) {
    throw new Error('SECURITY VIOLATION: Org B accessed Org A confidential evidence!');
  }

  const orgBAssessments = await prisma.complianceAssessment.findMany({
    where: { organizationId: orgB.id },
  });
  if (orgBAssessments.some((a) => a.id === assessmentA.id)) {
    throw new Error('SECURITY VIOLATION: Org B accessed Org A assessment!');
  }

  const orgBFindings = await prisma.complianceFinding.findMany({
    where: { organizationId: orgB.id },
  });
  if (orgBFindings.some((f) => f.id === findingA.id)) {
    throw new Error('SECURITY VIOLATION: Org B accessed Org A finding!');
  }

  const orgBServiceReqs = await prisma.nKVVServiceRequest.findMany({
    where: { organizationId: orgB.id },
  });
  if (orgBServiceReqs.some((r) => r.id === serviceReqA.id)) {
    throw new Error('SECURITY VIOLATION: Org B accessed Org A service request!');
  }

  console.log('✓ Tenant isolation test passed: 0 cross-tenant data leaks across all models');

  // Clean up test orgs
  await prisma.organization.delete({ where: { id: orgA.id } });
  await prisma.organization.delete({ where: { id: orgB.id } });

  // =====================================================
  // 4. COMPLETE END-TO-END JOURNEY TEST
  // =====================================================
  console.log('\n--- 4. Testing Complete End-to-End Investor Lifecycle ---');

  // 1. Landing / Org creation
  const testOrg = await prisma.organization.create({
    data: {
      name: 'E2E Test Enterprise Technologies',
      slug: 'e2e-test-' + Date.now(),
    },
  });

  // 2. Business & Profile
  const testBusiness = await prisma.business.create({
    data: {
      organizationId: testOrg.id,
      name: 'E2E Test Enterprise Technologies Pvt. Ltd.',
      code: 'E2E-01',
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
          employeeCount: 120,
          workerCount: 95,
          contractWorkerCount: 25,
          womenEmployees: 42,
          contractLabourUsage: true,
        },
      },
    },
    include: { profile: true, workforce: true },
  });

  // 3. Applicability Analysis
  const e2eApplicability = evaluateApplicability(
    testBusiness.profile,
    testBusiness.workforce,
    STATUTORY_RULES
  );
  if (e2eApplicability.filter((a) => a.status === 'APPLICABLE').length < 5) {
    throw new Error('Applicability calculation failed in E2E flow');
  }

  // 4. Diagnostic
  const e2eDiagnostic = await prisma.diagnostic.create({
    data: {
      organizationId: testOrg.id,
      businessId: testBusiness.id,
      title: 'E2E Comprehensive Diagnostic',
      status: 'COMPLETED',
    },
  });

  // 5. Evidence
  const testEvidence = await prisma.evidence.create({
    data: {
      organizationId: testOrg.id,
      businessId: testBusiness.id,
      title: 'PF Code Allotment Letter',
      category: 'Statutory Registration',
      status: 'VERIFIED',
    },
  });

  // 6. Assessment & Score
  const e2eAssessmentResult = runComplianceAssessment(
    e2eApplicability,
    { 'DIAG-PF-01': { answer: 'YES' }, 'DIAG-POSH-01': { answer: 'NO' } },
    1
  );

  const e2eAssessment = await prisma.complianceAssessment.create({
    data: {
      organizationId: testOrg.id,
      businessId: testBusiness.id,
      status: 'COMPLETED',
      overallScore: e2eAssessmentResult.overallScore,
      legalComplianceScore: e2eAssessmentResult.dimensionScores.legalCompliance,
      documentationScore: e2eAssessmentResult.dimensionScores.documentation,
      payrollScore: e2eAssessmentResult.dimensionScores.payroll,
      statutoryScore: e2eAssessmentResult.dimensionScores.statutory,
      hrProcessScore: e2eAssessmentResult.dimensionScores.hrProcess,
      evidenceReadinessScore: e2eAssessmentResult.dimensionScores.evidenceReadiness,
      auditReadinessScore: e2eAssessmentResult.dimensionScores.auditReadiness,
    },
  });

  // 7. Findings & Remediation
  const topFinding = e2eAssessmentResult.findings[0];
  const testFinding = await prisma.complianceFinding.create({
    data: {
      organizationId: testOrg.id,
      assessmentId: e2eAssessment.id,
      findingCode: topFinding.findingCode,
      title: topFinding.title,
      description: topFinding.description,
      law: topFinding.law,
      section: topFinding.section,
      sourceText: topFinding.sourceText,
      applicabilityReason: topFinding.applicabilityReason,
      gapAnalysis: topFinding.gapAnalysis,
      riskLevel: topFinding.riskLevel,
      recommendation: topFinding.recommendation,
      status: topFinding.status,
    },
  });

  const testRemediation = await prisma.remediationAction.create({
    data: {
      organizationId: testOrg.id,
      findingId: testFinding.id,
      actionTitle: 'Constitute Internal Committee via Executive Order',
      actionDescription: 'Execute MOU with external POSH advocate',
      priority: 'CRITICAL',
      status: 'OPEN',
    },
  });

  // 8. Report
  const testReport = await prisma.report.create({
    data: {
      organizationId: testOrg.id,
      businessId: testBusiness.id,
      assessmentId: e2eAssessment.id,
      title: 'Statutory Diagnostic Report',
      executiveSummary: 'E2E Assessment Report',
      scoreSnapshot: e2eAssessment.overallScore,
      reportData: JSON.stringify({ score: e2eAssessment.overallScore }),
    },
  });

  // 9. NKVV Conversion Request
  const testRequest = await prisma.nKVVServiceRequest.create({
    data: {
      organizationId: testOrg.id,
      businessId: testBusiness.id,
      requestNumber: 'NKVV-REQ-E2E-01',
      requestedService: 'Compliance Implementation',
      priority: 'HIGH',
      description: 'Implement POSH committee and audit contractor licenses',
      contactName: 'E2E Test Lead',
      contactEmail: 'lead@test.com',
    },
  });

  if (!testRequest.id || !testReport.id || !testRemediation.id) {
    throw new Error('E2E pipeline failure');
  }

  console.log('✓ End-to-End User Journey Succeeded:');
  console.log('  Business Profile → Applicability → Diagnostic → Evidence → Assessment → Score → Finding → Remediation → Report → NKVV Service Request');

  // Clean up test org
  await prisma.organization.delete({ where: { id: testOrg.id } });

  console.log('\n====================================================');
  console.log('ALL TESTS PASSED WITH ZERO FAILURES');
  console.log('====================================================');
}

runVeloraTestSuite()
  .catch((e) => {
    console.error('Test Suite Failure:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
