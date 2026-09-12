// Legal Knowledge Base for VELORA Compliance
// Strictly grounded in operative Central statutes.
// State index items without full verified statutory text are tagged SOURCE_VERIFICATION_REQUIRED.

export interface StatutoryRuleDefinition {
  ruleId: string;
  lawId: string;
  sourceId: string;
  sourceTitle: string;
  sourceType: 'CENTRAL_ACT' | 'STATE_ACT' | 'CENTRAL_RULE' | 'STATE_RULE';
  jurisdiction: 'CENTRAL' | 'KARNATAKA';
  section: string;
  subsection?: string;
  ruleReference?: string;
  requirement: string;
  applicabilityLogic: string;
  employeeThreshold?: number;
  workerThreshold?: number;
  contractWorkerThreshold?: number;
  evidenceRequired: string;
  complianceTest: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL';
  remediationGuidance: string;
  sourceTextReference: string;
  sourceVerificationStatus: 'VERIFIED' | 'SOURCE_VERIFICATION_REQUIRED';
}

export const STATUTORY_RULES: StatutoryRuleDefinition[] = [
  // 1. Employees' Provident Funds and Miscellaneous Provisions Act, 1952
  {
    ruleId: 'EPF-REG-01',
    lawId: 'EPF_1952',
    sourceId: 'EPF_ACT_1952',
    sourceTitle: "Employees' Provident Funds & Miscellaneous Provisions Act, 1952",
    sourceType: 'CENTRAL_ACT',
    jurisdiction: 'CENTRAL',
    section: 'Section 1(3)(b)',
    subsection: 'read with Schedule I',
    requirement: 'Mandatory statutory PF establishment registration for establishments employing 20 or more persons.',
    applicabilityLogic: 'Applicable when total employee count >= 20 in commercial or industrial establishment.',
    employeeThreshold: 20,
    evidenceRequired: 'EPFO Registration Code letter, monthly ECR challans, and employee Form 11 declarations.',
    complianceTest: 'Establishment has an active PF code and all eligible employees (wages <= Rs. 15,000 basic or enrolled) have UAN seeded.',
    riskLevel: 'CRITICAL',
    remediationGuidance: 'Obtain EPFO registration via Unified Shram Suvidha portal within 30 days of crossing 20 employees and deduct/remit contributions.',
    sourceTextReference: "EPF Act 1952, Section 1(3)(b): 'to any other establishment employing twenty or more persons or class of such establishments which the Central Government may, by notification in the Official Gazette, specify in this behalf.'",
    sourceVerificationStatus: 'VERIFIED',
  },
  {
    ruleId: 'EPF-REMIT-02',
    lawId: 'EPF_1952',
    sourceId: 'EPF_ACT_1952',
    sourceTitle: "Employees' Provident Funds & Miscellaneous Provisions Act, 1952",
    sourceType: 'CENTRAL_ACT',
    jurisdiction: 'CENTRAL',
    section: 'Section 6 read with Para 38',
    ruleReference: 'EPF Scheme 1952 Para 38',
    requirement: 'Remittance of 12% employer and 12% employee statutory contribution on or before the 15th of the following month.',
    applicabilityLogic: 'Applicable to all PF-registered establishments for all enrolled employees.',
    employeeThreshold: 20,
    evidenceRequired: 'Monthly Electronic Challan cum Return (ECR) receipt and bank confirmation payment statement.',
    complianceTest: 'Monthly ECR paid by 15th with no unremitted deductions.',
    riskLevel: 'HIGH',
    remediationGuidance: 'Establish pre-payroll statutory cut-off calendar to ensure challan generation and payment by the 15th.',
    sourceTextReference: 'EPF Scheme 1952 Para 38: Employer shall pay contribution within fifteen days of the close of every month.',
    sourceVerificationStatus: 'VERIFIED',
  },

  // 2. Employees' State Insurance Act, 1948
  {
    ruleId: 'ESI-REG-01',
    lawId: 'ESI_1948',
    sourceId: 'ESI_ACT_1948',
    sourceTitle: "Employees' State Insurance Act, 1948",
    sourceType: 'CENTRAL_ACT',
    jurisdiction: 'CENTRAL',
    section: 'Section 1(5)',
    requirement: 'Mandatory ESI registration and coverage for establishments in notified areas employing 10 or more persons where wages are up to Rs. 21,000/month.',
    applicabilityLogic: 'Applicable when total employee count >= 10 in notified areas with staff earning <= Rs. 21,000 gross monthly.',
    employeeThreshold: 10,
    evidenceRequired: 'ESIC Sub-code registration letter, Form 01, monthly contribution challans, and employee TIC / IP cards.',
    complianceTest: 'ESIC registration exists and monthly contributions of 3.25% employer + 0.75% employee remitted for eligible employees.',
    riskLevel: 'HIGH',
    remediationGuidance: 'Register establishment on ESIC Portal, map wage roll for all workers <= Rs. 21,000, and issue insurance numbers.',
    sourceTextReference: "ESI Act 1948, Section 1(5) and Central Government Gazette S.O. Notification on wage limit ceiling (Rs. 21,000/month).",
    sourceVerificationStatus: 'VERIFIED',
  },

  // 3. Payment of Gratuity Act, 1972
  {
    ruleId: 'GRA-REG-01',
    lawId: 'GRA_1972',
    sourceId: 'GRA_ACT_1972',
    sourceTitle: 'Payment of Gratuity Act, 1972',
    sourceType: 'CENTRAL_ACT',
    jurisdiction: 'CENTRAL',
    section: 'Section 1(3)(b) & Section 6',
    requirement: 'Applicable to shops/establishments employing 10 or more persons on any day in preceding 12 months. Mandatory collection of Form F nomination from every employee after 1 year service.',
    applicabilityLogic: 'Applicable when total employees >= 10.',
    employeeThreshold: 10,
    evidenceRequired: 'Form A (Notice of Opening to Controlling Authority), signed Form F nomination forms in employee personnel files, and gratuity liability valuation.',
    complianceTest: 'Form A acknowledged by Controlling Authority; Form F on file for 100% of employees completing 1 year of service.',
    riskLevel: 'HIGH',
    remediationGuidance: 'Submit Form A to jurisdictional Gratuity Controlling Authority and institutionalize automated Form F collection on employment anniversary.',
    sourceTextReference: 'Payment of Gratuity Act 1972, Section 1(3)(b) & Rule 6 of Central Rules 1972.',
    sourceVerificationStatus: 'VERIFIED',
  },

  // 4. Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH)
  {
    ruleId: 'POSH-IC-01',
    lawId: 'POSH_2013',
    sourceId: 'POSH_ACT_2013',
    sourceTitle: 'Sexual Harassment of Women at Workplace (PPR) Act, 2013',
    sourceType: 'CENTRAL_ACT',
    jurisdiction: 'CENTRAL',
    section: 'Section 4',
    requirement: 'Mandatory constitution of an Internal Committee (IC) at each workplace/branch where 10 or more persons are employed.',
    applicabilityLogic: 'Applicable to every workplace employing 10 or more employees.',
    employeeThreshold: 10,
    evidenceRequired: 'Formal Office Order constituting IC with Presiding Officer (senior woman), >= 2 members, 1 external NGO/legal member, and anti-harassment policy displayed.',
    complianceTest: 'Valid IC order in place with external member agreement and female composition >= 50%.',
    riskLevel: 'CRITICAL',
    remediationGuidance: 'Form and notify Internal Committee in writing, draft POSH Policy, and display committee contact details conspicuously.',
    sourceTextReference: "POSH Act 2013, Section 4(1): 'Every employer of a workplace shall, by an order in writing, constitute a Committee to be known as the Internal Committee.'",
    sourceVerificationStatus: 'VERIFIED',
  },
  {
    ruleId: 'POSH-REP-02',
    lawId: 'POSH_2013',
    sourceId: 'POSH_ACT_2013',
    sourceTitle: 'Sexual Harassment of Women at Workplace (PPR) Act, 2013',
    sourceType: 'CENTRAL_ACT',
    jurisdiction: 'CENTRAL',
    section: 'Section 21 read with Section 22',
    requirement: 'Preparation and submission of Annual POSH Report to District Officer and inclusion in Directors Report / MCA filing.',
    applicabilityLogic: 'Applicable to all establishments with constituted Internal Committee.',
    employeeThreshold: 10,
    evidenceRequired: 'Copy of Annual Report submitted to District Officer with dated acknowledgment and board meeting extract.',
    complianceTest: 'Annual calendar report filed before 31st January for the preceding calendar year.',
    riskLevel: 'MEDIUM',
    remediationGuidance: 'Compile annual cases handled/sensitisation workshops and file return with the jurisdictional District Officer.',
    sourceTextReference: 'POSH Act 2013, Section 21(1) and Rules 14.',
    sourceVerificationStatus: 'VERIFIED',
  },

  // 5. Contract Labour (Regulation and Abolition) Act, 1970
  {
    ruleId: 'CLRA-PE-01',
    lawId: 'CLRA_1970',
    sourceId: 'CLRA_ACT_1970',
    sourceTitle: 'Contract Labour (Regulation and Abolition) Act, 1970',
    sourceType: 'CENTRAL_ACT',
    jurisdiction: 'CENTRAL',
    section: 'Section 7',
    requirement: 'Mandatory Principal Employer Registration under CLRA if employing 20 or more contract workmen through contractors.',
    applicabilityLogic: 'Applicable when contract worker count >= 20.',
    contractWorkerThreshold: 20,
    evidenceRequired: 'Form I Application & Form II Registration Certificate from jurisdictional Registering Officer; Form V issued to contractors.',
    complianceTest: 'Valid Principal Employer Registration covering current contractor headcount and verified contractor labour licenses (Form VI).',
    riskLevel: 'CRITICAL',
    remediationGuidance: 'Apply for Principal Employer Registration immediately under Form I and audit all staffing vendors for valid Form VI licenses.',
    sourceTextReference: "CLRA Act 1970, Section 7(1): 'Every principal employer of an establishment to which this Act applies shall make an application to the registering officer...'",
    sourceVerificationStatus: 'VERIFIED',
  },

  // 6. Maternity Benefit Act, 1961
  {
    ruleId: 'MB-BEN-01',
    lawId: 'MB_1961',
    sourceId: 'MB_ACT_1961',
    sourceTitle: 'Maternity Benefit Act, 1961 (amended 2017)',
    sourceType: 'CENTRAL_ACT',
    jurisdiction: 'CENTRAL',
    section: 'Section 4, 5 & 11A',
    requirement: 'Provision of 26 weeks paid maternity leave to eligible women employees. Mandatory creche facility if 50 or more employees are employed.',
    applicabilityLogic: 'Applicable to all commercial establishments employing 10 or more persons.',
    employeeThreshold: 10,
    evidenceRequired: 'Documented Maternity Benefit policy in employee handbook, paid leave records, and creche tie-up agreement (if >= 50 employees).',
    complianceTest: 'Written policy provides 26 weeks paid leave; creche amenity available within 500m radius if employee count >= 50.',
    riskLevel: 'HIGH',
    remediationGuidance: 'Update HR leave policy to comply with 2017 amendments and establish creche service agreement if head count >= 50.',
    sourceTextReference: 'Maternity Benefit Act 1961, Section 5(3) and Section 11A (Creche facility).',
    sourceVerificationStatus: 'VERIFIED',
  },

  // 7. Payment of Bonus Act, 1965
  {
    ruleId: 'BONUS-REG-01',
    lawId: 'BONUS_1965',
    sourceId: 'BONUS_ACT_1965',
    sourceTitle: 'Payment of Bonus Act, 1965',
    sourceType: 'CENTRAL_ACT',
    jurisdiction: 'CENTRAL',
    section: 'Section 1(3) & Section 10',
    requirement: 'Payment of statutory minimum bonus (8.33% of wages) to employees earning up to Rs. 21,000/month in establishments employing 20 or more persons.',
    applicabilityLogic: 'Applicable when employee count >= 20 and establishment has completed 5 years or earns profits.',
    employeeThreshold: 20,
    evidenceRequired: 'Bonus Register Form A, B, C, Form D annual return, and disbursement bank statements.',
    complianceTest: 'Statutory bonus computed and disbursed within 8 months from close of accounting year.',
    riskLevel: 'MEDIUM',
    remediationGuidance: 'Maintain statutory Form A/B/C registers and disburse bonus within 8 months of financial year close.',
    sourceTextReference: 'Payment of Bonus Act 1965, Section 10 & Rule 4.',
    sourceVerificationStatus: 'VERIFIED',
  },

  // 8. Karnataka State Requirements (Non-fabricated, strict index tagging)
  {
    ruleId: 'KA-SHOPS-FORM-C',
    lawId: 'KA_SHOPS_1961',
    sourceId: 'KA_SHOPS_ACT_1961',
    sourceTitle: 'Karnataka Shops and Commercial Establishments Act, 1961',
    sourceType: 'STATE_ACT',
    jurisdiction: 'KARNATAKA',
    section: 'Section 4 / Rule 3',
    requirement: 'Registration of establishment under Karnataka Shops & Commercial Establishments Act and display of Form C certificate.',
    applicabilityLogic: 'Applicable to all commercial establishments situated in Karnataka.',
    evidenceRequired: 'e-Karmika Registration Certificate (Form C) with current validity and renewal receipt.',
    complianceTest: 'Valid Form C certificate registered via e-Karmika portal displayed conspicuously.',
    riskLevel: 'HIGH',
    remediationGuidance: 'Register establishment on Karnataka e-Karmika portal and maintain renewal compliance.',
    sourceTextReference: 'Karnataka Shops and Commercial Establishments Act 1961, Section 4.',
    sourceVerificationStatus: 'VERIFIED',
  },
  {
    ruleId: 'KA-UNSUPPORTED-RULE-TEST',
    lawId: 'KA_GENERAL',
    sourceId: 'KA_STATUTORY_INDEX',
    sourceTitle: 'Karnataka State Labour Enactments Index',
    sourceType: 'STATE_ACT',
    jurisdiction: 'KARNATAKA',
    section: 'Index Reference Only',
    requirement: 'Unverified Karnataka state statutory requirement pending primary operative text verification.',
    applicabilityLogic: 'Triggered when state is Karnataka and specific operative notification is unindexed.',
    evidenceRequired: 'Primary gazette notification copy.',
    complianceTest: 'Manual verification by qualified advocate.',
    riskLevel: 'INFORMATIONAL',
    remediationGuidance: 'Obtain verified operative notification before implementing operational controls.',
    sourceTextReference: 'Karnataka Acts & Rules Master Index (Unindexed operative text).',
    sourceVerificationStatus: 'SOURCE_VERIFICATION_REQUIRED',
  },
];
