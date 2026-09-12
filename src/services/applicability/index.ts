import { StatutoryRuleDefinition } from '../legal-knowledge/rules';

export type ApplicabilityStatus =
  | 'APPLICABLE'
  | 'NOT_APPLICABLE'
  | 'REQUIRES_REVIEW'
  | 'INSUFFICIENT_INFORMATION';

export interface BusinessProfileInput {
  legalEntityType: string;
  industry: string;
  state: string;
  city: string;
  establishmentType: string;
  payrollSystem?: string | null;
  attendanceSystem?: string | null;
  hrisSystem?: string | null;
  currentHrProcess?: string | null;
  complianceResponsibility?: string | null;
  existingConsultant?: string | null;
}

export interface WorkforceProfileInput {
  employeeCount: number;
  workerCount: number;
  contractWorkerCount: number;
  migrantWorkerStatus: boolean;
  factoryStatus: boolean;
  constructionActivity: boolean;
  hazardousActivity: boolean;
  shiftWork: boolean;
  workingHours: number;
  womenEmployees: number;
  contractLabourUsage: boolean;
}

export interface ApplicabilityEvaluation {
  ruleId: string;
  lawId: string;
  ruleTitle: string;
  section: string;
  status: ApplicabilityStatus;
  explanation: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL';
  thresholdComparison?: {
    parameter: string;
    statutoryThreshold: number;
    businessValue: number;
  };
}

export function evaluateApplicability(
  business: BusinessProfileInput | null | undefined,
  workforce: WorkforceProfileInput | null | undefined,
  rules: StatutoryRuleDefinition[]
): ApplicabilityEvaluation[] {
  if (!business || !workforce) {
    return rules.map((rule) => ({
      ruleId: rule.ruleId,
      lawId: rule.lawId,
      ruleTitle: rule.sourceTitle,
      section: rule.section,
      status: 'INSUFFICIENT_INFORMATION' as ApplicabilityStatus,
      explanation: 'Insufficient information: Business or workforce profile is not yet completed.',
      riskLevel: rule.riskLevel,
    }));
  }

  return rules.map((rule) => {
    // 1. Check for unverified state index references
    if (rule.sourceVerificationStatus === 'SOURCE_VERIFICATION_REQUIRED') {
      return {
        ruleId: rule.ruleId,
        lawId: rule.lawId,
        ruleTitle: rule.sourceTitle,
        section: rule.section,
        status: 'REQUIRES_REVIEW' as ApplicabilityStatus,
        explanation:
          'SOURCE_VERIFICATION_REQUIRED: This requirement originates from a state statutory index without verified operative gazette text. Requires primary document legal review before operational enforcement.',
        riskLevel: rule.riskLevel,
      };
    }

    // 2. State & Territorial Jurisdiction Check
    if (rule.jurisdiction === 'KARNATAKA') {
      const isKarnataka = business.state.trim().toLowerCase() === 'karnataka';
      if (!isKarnataka) {
        return {
          ruleId: rule.ruleId,
          lawId: rule.lawId,
          ruleTitle: rule.sourceTitle,
          section: rule.section,
          status: 'NOT_APPLICABLE' as ApplicabilityStatus,
          explanation: `Not applicable because the establishment is located in ${business.state}, while this statutory rule applies exclusively to Karnataka jurisdiction.`,
          riskLevel: rule.riskLevel,
        };
      }
    }

    // 3. Contract Worker Threshold Check (e.g. CLRA Principal Employer)
    if (rule.contractWorkerThreshold !== undefined) {
      const actualContractors = workforce.contractWorkerCount || 0;
      const usesContractors = workforce.contractLabourUsage;

      if (!usesContractors || actualContractors === 0) {
        return {
          ruleId: rule.ruleId,
          lawId: rule.lawId,
          ruleTitle: rule.sourceTitle,
          section: rule.section,
          status: 'NOT_APPLICABLE' as ApplicabilityStatus,
          explanation: `Not applicable because the business profile indicates no contract labour usage (Contract Worker Count = 0, statutory threshold = ${rule.contractWorkerThreshold}).`,
          riskLevel: rule.riskLevel,
          thresholdComparison: {
            parameter: 'Contract Worker Count',
            statutoryThreshold: rule.contractWorkerThreshold,
            businessValue: actualContractors,
          },
        };
      }

      if (actualContractors >= rule.contractWorkerThreshold) {
        return {
          ruleId: rule.ruleId,
          lawId: rule.lawId,
          ruleTitle: rule.sourceTitle,
          section: rule.section,
          status: 'APPLICABLE' as ApplicabilityStatus,
          explanation: `Applicable because Contract Worker Count = ${actualContractors}, which meets or exceeds the statutory threshold of ${rule.contractWorkerThreshold} under ${rule.sourceTitle} ${rule.section}.`,
          riskLevel: rule.riskLevel,
          thresholdComparison: {
            parameter: 'Contract Worker Count',
            statutoryThreshold: rule.contractWorkerThreshold,
            businessValue: actualContractors,
          },
        };
      } else {
        return {
          ruleId: rule.ruleId,
          lawId: rule.lawId,
          ruleTitle: rule.sourceTitle,
          section: rule.section,
          status: 'NOT_APPLICABLE' as ApplicabilityStatus,
          explanation: `Not applicable because Contract Worker Count = ${actualContractors}, which is below the statutory threshold of ${rule.contractWorkerThreshold} for mandatory Principal Employer registration.`,
          riskLevel: rule.riskLevel,
          thresholdComparison: {
            parameter: 'Contract Worker Count',
            statutoryThreshold: rule.contractWorkerThreshold,
            businessValue: actualContractors,
          },
        };
      }
    }

    // 4. Employee Headcount Threshold Check (e.g. EPF, ESI, POSH, Gratuity, Maternity, Bonus)
    if (rule.employeeThreshold !== undefined) {
      const actualCount = workforce.employeeCount || 0;

      if (actualCount >= rule.employeeThreshold) {
        return {
          ruleId: rule.ruleId,
          lawId: rule.lawId,
          ruleTitle: rule.sourceTitle,
          section: rule.section,
          status: 'APPLICABLE' as ApplicabilityStatus,
          explanation: `Applicable because Employee Count = ${actualCount}, meeting or exceeding the statutory threshold of ${rule.employeeThreshold} under ${rule.sourceTitle} ${rule.section} (Jurisdiction: ${rule.jurisdiction}).`,
          riskLevel: rule.riskLevel,
          thresholdComparison: {
            parameter: 'Total Employee Count',
            statutoryThreshold: rule.employeeThreshold,
            businessValue: actualCount,
          },
        };
      } else {
        return {
          ruleId: rule.ruleId,
          lawId: rule.lawId,
          ruleTitle: rule.sourceTitle,
          section: rule.section,
          status: 'NOT_APPLICABLE' as ApplicabilityStatus,
          explanation: `Not applicable because Employee Count = ${actualCount}, which is below the statutory threshold of ${rule.employeeThreshold} employees.`,
          riskLevel: rule.riskLevel,
          thresholdComparison: {
            parameter: 'Total Employee Count',
            statutoryThreshold: rule.employeeThreshold,
            businessValue: actualCount,
          },
        };
      }
    }

    // 5. Default General Rule (e.g. Karnataka Shops registration applies to all establishments in state)
    return {
      ruleId: rule.ruleId,
      lawId: rule.lawId,
      ruleTitle: rule.sourceTitle,
      section: rule.section,
      status: 'APPLICABLE' as ApplicabilityStatus,
      explanation: `Applicable based on establishment classification (${business.establishmentType}) in ${business.state}.`,
      riskLevel: rule.riskLevel,
    };
  });
}
