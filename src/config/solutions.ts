export interface SolutionItem {
  id: string;
  problemStatement: string;
  solutionTitle: string;
  description: string;
  keyInterventions: string[];
  expectedImpact: string[];
}

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 'hiring-fast',
    problemStatement: "We're hiring fast.",
    solutionTitle: 'Recruitment & Onboarding Transformation',
    description: 'When scaling rapidly, candidate drop-offs, slow offer releases, and chaotic day-one experiences damage employer brand and waste leadership bandwidth.',
    keyInterventions: [
      'Automated candidate communication triggers (Email/WhatsApp)',
      'Digital document collection & verification portal workflows',
      'Structured 30-60-90 day onboarding templates & buddy assignment systems',
    ],
    expectedImpact: [
      'Faster, more structured hiring workflows',
      'Reduced candidate drop-off before joining',
      'Consistent, high-touch employee onboarding experience',
    ],
  },
  {
    id: 'hr-unmanageable',
    problemStatement: 'Our HR processes are becoming difficult to manage.',
    solutionTitle: 'HR Operations Transformation',
    description: 'Ad-hoc policies and informal verbal agreements break down as company headcount passes 30 employees, creating operational friction and compliance risks.',
    keyInterventions: [
      'Comprehensive HR process audit and operational gap analysis',
      'Standard Operating Procedure (SOP) development for all employee lifecycle touchpoints',
      'Defined HR SLA matrices and escalation paths',
    ],
    expectedImpact: [
      'Clear operational ownership across departments',
      'Reduced administrative overhead for founders',
      'Full statutory compliance and documented policy framework',
    ],
  },
  {
    id: 'hrms-spreadsheets',
    problemStatement: 'We have an HRMS but still use spreadsheets.',
    solutionTitle: 'HRIS Optimization',
    description: 'Software alone does not fix broken workflows. Poorly configured HRIS platforms force HR teams back into manual Excel tracking.',
    keyInterventions: [
      'Audit of existing HRIS configuration and custom field mapping',
      'Re-architecting approval workflows, leave policies, and organizational charts',
      'API integrations connecting HRIS with Slack, email, and payroll tools',
    ],
    expectedImpact: [
      'Higher data integrity and audit readiness',
      'Elimination of parallel shadow spreadsheets',
      'Improved utilization of software investments',
    ],
  },
  {
    id: 'payroll-manual',
    problemStatement: 'Payroll is too dependent on manual work.',
    solutionTitle: 'Payroll Process Transformation',
    description: 'Consolidating leave, attendance, overtime, variable pay, and tax declarations manually every month leads to errors and stressful deadline rushes.',
    keyInterventions: [
      'Standardized pre-payroll data validation controls',
      'Automated leave and attendance cutoff reconciliation',
      'Direct integration templates between HRIS, attendance registers, and payroll software',
    ],
    expectedImpact: [
      'Substantially reduced payroll cycle time',
      'Elimination of manual calculation errors',
      'Seamless audit trails for statutory and tax requirements',
    ],
  },
  {
    id: 'repetitive-tasks',
    problemStatement: 'Our HR team spends too much time on repetitive tasks.',
    solutionTitle: 'HR Automation',
    description: 'HR professionals trapped in manual document generation, status tracking, and query resolution have little time left for strategic talent initiatives.',
    keyInterventions: [
      'Automated offer letter and employment agreement generator',
      'Workflow triggers for common employee FAQ and query routing',
      'Automated probation, performance, and anniversary reminder workflows',
    ],
    expectedImpact: [
      'Reduced repetitive administrative work',
      'Faster response times for routine employee requests',
      'Higher internal operational productivity',
    ],
  },
  {
    id: 'leadership-visibility',
    problemStatement: "Leadership doesn't have visibility into people operations.",
    solutionTitle: 'HR Analytics & Visibility',
    description: 'Founders and executive leaders lack accurate visibility into attrition trends, hiring pipelines, headcount costs, and HR operational performance.',
    keyInterventions: [
      'Definition of core HR KPI metrics aligned with business objectives',
      'Automated weekly and monthly executive dashboard builds',
      'Standardized headcount forecasting and cost modeling templates',
    ],
    expectedImpact: [
      'Improved operational visibility for leadership',
      'Proactive identification of attrition and capacity bottlenecks',
      'Data-backed management and board reporting',
    ],
  },
];
