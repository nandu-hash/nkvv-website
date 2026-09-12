import { StatutoryRuleDefinition } from '../legal-knowledge/rules';
import { ApplicabilityEvaluation } from '../applicability';

export type ComplianceFindingStatus =
  | 'COMPLIANT'
  | 'PARTIALLY_COMPLIANT'
  | 'NON_COMPLIANT'
  | 'MISSING_EVIDENCE'
  | 'NOT_APPLICABLE'
  | 'HUMAN_REVIEW_REQUIRED'
  | 'INSUFFICIENT_INFORMATION';

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL';

export interface FindingDraft {
  findingCode: string;
  title: string;
  description: string;
  law: string;
  section: string;
  sourceText: string;
  applicabilityReason: string;
  evidenceSummary: string;
  gapAnalysis: string;
  riskLevel: RiskLevel;
  recommendation: string;
  owner: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  dueDate?: string;
  status: ComplianceFindingStatus;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  legalRuleId?: string;
}

export interface DimensionScores {
  legalCompliance: number;
  documentation: number;
  payroll: number;
  statutory: number;
  hrProcess: number;
  evidenceReadiness: number;
  auditReadiness: number;
  overall: number;
}

export interface AssessmentResult {
  overallScore: number;
  dimensionScores: DimensionScores;
  findings: FindingDraft[];
  summary: string;
}

export function calculateVeloraScore(findings: FindingDraft[]): DimensionScores {
  const applicableFindings = findings.filter((f) => f.status !== 'NOT_APPLICABLE');

  if (applicableFindings.length === 0) {
    return {
      legalCompliance: 100,
      documentation: 100,
      payroll: 100,
      statutory: 100,
      hrProcess: 100,
      evidenceReadiness: 100,
      auditReadiness: 100,
      overall: 100,
    };
  }

  // Weight map for finding status
  const statusPoints: Record<ComplianceFindingStatus, number> = {
    COMPLIANT: 100,
    PARTIALLY_COMPLIANT: 50,
    HUMAN_REVIEW_REQUIRED: 40,
    MISSING_EVIDENCE: 25,
    NON_COMPLIANT: 0,
    INSUFFICIENT_INFORMATION: 20,
    NOT_APPLICABLE: 100,
  };

  // Group by category/domain
  const scoreCategories: Record<string, number[]> = {
    legal: [],
    documentation: [],
    payroll: [],
    statutory: [],
    hrProcess: [],
    evidence: [],
    audit: [],
  };

  for (const f of applicableFindings) {
    const pts = statusPoints[f.status] ?? 0;
    const code = f.findingCode.toUpperCase();

    if (code.includes('POSH') || code.includes('CLRA') || code.includes('MB')) {
      scoreCategories.legal.push(pts);
    }
    if (code.includes('GRA') || code.includes('DOC') || code.includes('STAT')) {
      scoreCategories.documentation.push(pts);
    }
    if (code.includes('PAY') || code.includes('BONUS')) {
      scoreCategories.payroll.push(pts);
    }
    if (code.includes('PF') || code.includes('ESI')) {
      scoreCategories.statutory.push(pts);
    }
    scoreCategories.hrProcess.push(pts);
    scoreCategories.evidence.push(f.status === 'MISSING_EVIDENCE' ? 0 : pts);
    scoreCategories.audit.push(f.riskLevel === 'CRITICAL' ? 10 : f.riskLevel === 'HIGH' ? 40 : pts);
  }

  const avg = (arr: number[], fallback: number) =>
    arr.length > 0 ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : fallback;

  const legalCompliance = avg(scoreCategories.legal, 75);
  const documentation = avg(scoreCategories.documentation, 70);
  const payroll = avg(scoreCategories.payroll, 80);
  const statutory = avg(scoreCategories.statutory, 65);
  const hrProcess = avg(scoreCategories.hrProcess, 70);
  const evidenceReadiness = avg(scoreCategories.evidence, 60);
  const auditReadiness = avg(scoreCategories.audit, 65);

  // Transparent weights: Legal(25%) + Doc(15%) + Payroll(20%) + Statutory(15%) + HR(10%) + Evidence(10%) + Audit(5%) = 100%
  const overall = Math.round(
    legalCompliance * 0.25 +
      documentation * 0.15 +
      payroll * 0.2 +
      statutory * 0.15 +
      hrProcess * 0.1 +
      evidenceReadiness * 0.1 +
      auditReadiness * 0.05
  );

  return {
    legalCompliance,
    documentation,
    payroll,
    statutory,
    hrProcess,
    evidenceReadiness,
    auditReadiness,
    overall,
  };
}

export function runComplianceAssessment(
  applicabilityList: ApplicabilityEvaluation[],
  responses: Record<string, { answer: string; notes?: string }>,
  evidenceCount: number
): AssessmentResult {
  const findings: FindingDraft[] = [];

  for (const app of applicabilityList) {
    if (app.status === 'NOT_APPLICABLE') {
      continue;
    }

    if (app.status === 'REQUIRES_REVIEW') {
      findings.push({
        findingCode: `FND-${app.ruleId}`,
        title: `Primary Source Verification Required: ${app.ruleTitle}`,
        description: `This requirement (${app.ruleTitle} - ${app.section}) requires validation against operative state gazette text before enforcement.`,
        law: app.ruleTitle,
        section: app.section,
        sourceText: app.explanation,
        applicabilityReason: app.explanation,
        evidenceSummary: 'Pending primary gazette notification review',
        gapAnalysis: 'Operative statutory clause needs manual legal verification to prevent false compliance liability.',
        riskLevel: 'INFORMATIONAL',
        recommendation: 'Engage NKVV labour compliance specialist to verify applicable state gazette notification.',
        owner: 'Compliance Lead',
        priority: 'LOW',
        status: 'HUMAN_REVIEW_REQUIRED',
        confidence: 'HIGH',
      });
      continue;
    }

    // Map specific rules to responses
    let status: ComplianceFindingStatus = 'NON_COMPLIANT';
    let gap = 'Operational evidence or process documentation is absent.';
    let recommendation = 'Standardize operational workflow and upload verifying documentation.';
    let riskLevel: RiskLevel = app.riskLevel;

    if (app.ruleId === 'POSH-IC-01') {
      const resp = responses['DIAG-POSH-01'];
      if (resp?.answer === 'YES') {
        status = 'COMPLIANT';
        gap = 'Internal Committee formed with mandated composition.';
        recommendation = 'Ensure external member agreement renewal and quarterly meetings.';
      } else if (resp?.answer === 'PARTIALLY') {
        status = 'PARTIALLY_COMPLIANT';
        gap = 'IC constituted internally but missing independent external NGO/legal member or formal office order.';
        recommendation = 'Formalize IC via executive order and execute MOU with qualified external POSH specialist.';
      } else {
        status = 'NON_COMPLIANT';
        riskLevel = 'CRITICAL';
        gap = 'Internal Complaints Committee is not constituted despite employing >= 10 persons. Non-compliance exposes business to statutory penalties and loss of business licenses under Section 26.';
        recommendation = 'Immediately issue Office Order constituting Internal Committee with female Presiding Officer and external member.';
      }
    } else if (app.ruleId === 'CLRA-PE-01') {
      const resp = responses['DIAG-CLRA-01'];
      if (resp?.answer === 'YES') {
        status = 'COMPLIANT';
        gap = 'Principal Employer registration is active and registered with Labour Dept.';
        recommendation = 'Ensure vendor headcount does not exceed certificate capacity.';
      } else {
        status = 'NON_COMPLIANT';
        riskLevel = 'CRITICAL';
        gap = 'Employing 20 or more contract workers without Form I Principal Employer registration under CLRA Section 7. Contracts are vulnerable to claims of sham contract labour.';
        recommendation = 'Submit Form I application to jurisdictional Registering Officer and audit staffing agency Form VI licenses.';
      }
    } else if (app.ruleId === 'EPF-REG-01') {
      const resp = responses['DIAG-PF-01'];
      if (resp?.answer === 'YES') {
        status = 'COMPLIANT';
        gap = 'EPFO code active and UAN generation process established.';
        recommendation = 'Maintain monthly pre-payroll ECR validation.';
      } else {
        status = 'NON_COMPLIANT';
        riskLevel = 'CRITICAL';
        gap = 'Establishment headcount exceeds 20 employees without registered EPFO establishment code.';
        recommendation = 'Register on Shram Suvidha portal and remit statutory deductions.';
      }
    } else if (app.ruleId === 'EPF-REMIT-02') {
      const resp = responses['DIAG-PF-02'];
      if (resp?.answer === 'YES') {
        status = 'COMPLIANT';
        gap = 'Monthly remittances made by 15th.';
        recommendation = 'Maintain proof of payments in digital compliance vault.';
      } else if (resp?.answer === 'PARTIALLY') {
        status = 'PARTIALLY_COMPLIANT';
        riskLevel = 'HIGH';
        gap = 'Monthly remittances occur but occasionally cross the 15th statutory cut-off due to late payroll finalization.';
        recommendation = 'Move payroll cut-off date to the 25th of the month to guarantee challan generation before the 10th.';
      } else {
        status = 'NON_COMPLIANT';
        riskLevel = 'HIGH';
        gap = 'Delays in monthly PF remittances attracting interest under Section 7Q and damages under Section 14B.';
        recommendation = 'Strictly enforce calendar controls for monthly PF challan remittance.';
      }
    } else if (app.ruleId === 'GRA-REG-01') {
      const resp = responses['DIAG-GRA-01'];
      if (resp?.answer === 'YES') {
        status = 'COMPLIANT';
        gap = 'Form A submitted and Form F nomination on file.';
        recommendation = 'Maintain actuarial valuation for balance sheet accounting.';
      } else {
        status = 'NON_COMPLIANT';
        riskLevel = 'HIGH';
        gap = 'Notice of Opening (Form A) not on file with Controlling Authority and Form F nominations not collected from staff.';
        recommendation = 'Submit Form A to jurisdictional Gratuity Controlling Authority and collect Form F nominations during onboarding.';
      }
    } else if (app.ruleId === 'MB-BEN-01') {
      const resp = responses['DIAG-MAT-01'];
      if (resp?.answer === 'YES') {
        status = 'COMPLIANT';
        gap = 'Written maternity policy and creche access provided.';
        recommendation = 'Review annual creche usage.';
      } else {
        status = 'PARTIALLY_COMPLIANT';
        riskLevel = 'HIGH';
        gap = 'Company provides statutory maternity leave, but lacks a formal contractual creche partnership despite employing > 50 employees.';
        recommendation = 'Execute a service tie-up with a verified creche within 500 meters of the office premises as mandated by Section 11A.';
      }
    } else {
      status = 'PARTIALLY_COMPLIANT';
      gap = 'Statutory records need structured digitization.';
      recommendation = 'Incorporate into monthly compliance calendar.';
    }

    findings.push({
      findingCode: `FND-${app.ruleId}`,
      title: `${app.ruleTitle}: Compliance Gap in ${app.section}`,
      description: `Evaluation of ${app.ruleTitle} requirement: ${app.explanation}`,
      law: app.ruleTitle,
      section: app.section,
      sourceText: app.explanation,
      applicabilityReason: app.explanation,
      evidenceSummary: evidenceCount > 0 ? `${evidenceCount} documentation record(s) on file` : 'No verified evidence attached',
      gapAnalysis: gap,
      riskLevel,
      recommendation,
      owner: 'HR / Compliance Lead',
      priority: riskLevel === 'CRITICAL' ? 'CRITICAL' : riskLevel === 'HIGH' ? 'HIGH' : 'MEDIUM',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status,
      confidence: 'HIGH',
      legalRuleId: app.ruleId,
    });
  }

  const dimensionScores = calculateVeloraScore(findings);
  const criticalCount = findings.filter((f) => f.riskLevel === 'CRITICAL' && f.status !== 'COMPLIANT').length;
  const highCount = findings.filter((f) => f.riskLevel === 'HIGH' && f.status !== 'COMPLIANT').length;

  const summary = `VELORA diagnostic completed across ${applicabilityList.length} statutory requirements. Overall score: ${dimensionScores.overall}/100. Identified ${criticalCount} critical and ${highCount} high statutory exposures requiring remediation before formal audit submission.`;

  return {
    overallScore: dimensionScores.overall,
    dimensionScores,
    findings,
    summary,
  };
}
