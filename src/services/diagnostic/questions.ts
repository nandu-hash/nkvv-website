export interface DiagnosticQuestionDefinition {
  questionCode: string;
  category: string;
  questionText: string;
  helpText: string;
  applicableRulesSummary: string;
  sortOrder: number;
}

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestionDefinition[] = [
  // POSH
  {
    questionCode: 'DIAG-POSH-01',
    category: 'POSH',
    questionText: 'Has your company constituted an Internal Committee (IC) with a presiding female officer and an external independent NGO/legal member as per Section 4 of the POSH Act?',
    helpText: 'Mandatory for every workplace with 10 or more employees. Committee must have at least 50% women representation.',
    applicableRulesSummary: 'POSH Act 2013, Section 4',
    sortOrder: 1,
  },
  {
    questionCode: 'DIAG-POSH-02',
    category: 'POSH',
    questionText: 'Has the company submitted the mandatory POSH Annual Report to the District Officer for the preceding calendar year?',
    helpText: 'Under Section 21 of the POSH Act, an annual report detailing cases received, disposed of, and employee awareness workshops must be submitted to the District Officer.',
    applicableRulesSummary: 'POSH Act 2013, Section 21 & Rules 14',
    sortOrder: 2,
  },

  // PF
  {
    questionCode: 'DIAG-PF-01',
    category: 'PF',
    questionText: 'Does the company maintain active EPFO establishment registration and ensure all eligible employees have active UANs generated?',
    helpText: 'Mandatory once head count crosses 20 employees under Section 1(3) of EPF & MP Act 1952.',
    applicableRulesSummary: 'EPF & MP Act 1952, Section 1(3)',
    sortOrder: 3,
  },
  {
    questionCode: 'DIAG-PF-02',
    category: 'PF',
    questionText: 'Are monthly EPF contributions (12% employee + 12% employer) remitted via ECR challan on or before the 15th of every month without delays?',
    helpText: 'Delayed remittances attract interest under 7Q and statutory damages under 14B up to 25% p.a.',
    applicableRulesSummary: 'EPF Scheme 1952, Para 38 & Sec 7Q/14B',
    sortOrder: 4,
  },

  // ESI
  {
    questionCode: 'DIAG-ESI-01',
    category: 'ESI',
    questionText: 'Are all employees earning gross wages up to ₹21,000/month enrolled under ESIC and provided with Insurance Numbers / e-Pehchan cards?',
    helpText: 'ESI coverage is mandatory in notified areas for workers earning <= ₹21,000 gross monthly.',
    applicableRulesSummary: 'ESI Act 1948, Section 1(5) & Central Wage Ceiling Notification',
    sortOrder: 5,
  },

  // Contract Labour
  {
    questionCode: 'DIAG-CLRA-01',
    category: 'Contract Labour',
    questionText: 'Does the company hold a valid Principal Employer Registration Certificate under CLRA for engaging 20 or more contract workers?',
    helpText: 'Section 7 of the Contract Labour (R&A) Act 1970 requires Principal Employers engaging 20+ contract labourers to register with the Labour Department.',
    applicableRulesSummary: 'CLRA Act 1970, Section 7',
    sortOrder: 6,
  },
  {
    questionCode: 'DIAG-CLRA-02',
    category: 'Contract Labour',
    questionText: 'Do you systematically collect and verify staffing vendor labour licenses (Form VI), monthly PF/ESI challans, and wage payment proofs before clearing invoices?',
    helpText: 'Under Section 21(4), the Principal Employer is secondary liable if the contractor defaults on wages or statutory benefits.',
    applicableRulesSummary: 'CLRA Act 1970, Section 21',
    sortOrder: 7,
  },

  // Gratuity
  {
    questionCode: 'DIAG-GRA-01',
    category: 'Gratuity',
    questionText: 'Has Form A (Notice of Opening) been submitted to the Gratuity Controlling Authority, and are signed Form F nomination forms collected upon joining / 1-year completion?',
    helpText: 'Payment of Gratuity Act 1972 applies once an establishment employs 10 persons. Form F nominations must be maintained in records.',
    applicableRulesSummary: 'Payment of Gratuity Act 1972, Section 1(3) & Rule 6',
    sortOrder: 8,
  },

  // Maternity
  {
    questionCode: 'DIAG-MAT-01',
    category: 'Maternity',
    questionText: 'Does the company have a formal Maternity Benefit policy providing 26 weeks paid leave and (if employing 50+ employees) access to a creche facility?',
    helpText: 'Mandatory under Maternity Benefit Amendment Act 2017. Section 11A mandates crèche access within 500 meters.',
    applicableRulesSummary: 'Maternity Benefit Act 1961, Section 5 & 11A',
    sortOrder: 9,
  },

  // Statutory Records & State Act
  {
    questionCode: 'DIAG-STAT-01',
    category: 'Statutory Records',
    questionText: 'Does the establishment possess a valid Registration Certificate (e.g. Form C under Karnataka Shops and Commercial Establishments Act) displayed at the workplace?',
    helpText: 'Commercial establishments must obtain and renew their local state shop & establishment certificate.',
    applicableRulesSummary: 'Karnataka Shops & Commercial Establishments Act 1961, Section 4',
    sortOrder: 10,
  },
  {
    questionCode: 'DIAG-PAY-01',
    category: 'Payroll & Wages',
    questionText: 'Are statutory itemized payslips issued to all employees prior to or on the date of wage payment, showing basic, allowances, and statutory deductions?',
    helpText: 'Mandatory requirement under state labour enactments and Payment of Wages Act.',
    applicableRulesSummary: 'Payment of Wages Act 1936 & State Shops Rules',
    sortOrder: 11,
  },
  {
    questionCode: 'DIAG-AUD-01',
    category: 'Audit Readiness',
    questionText: 'Does the company maintain a consolidated statutory compliance calendar and centralized digital evidence repository for labour inspections?',
    helpText: 'Lack of organized registers and evidence leads to inspection notices and operational disruption during due diligence.',
    applicableRulesSummary: 'General Labour Governance & Audit Readiness',
    sortOrder: 12,
  },
];
