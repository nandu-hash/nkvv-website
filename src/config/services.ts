export interface ServiceItem {
  title: string;
  problem: string;
  intervention: string;
  outcome: string;
  features: string[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  items: ServiceItem[];
}

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: 'hr-operations',
    title: 'HR Operations Transformation',
    subtitle: 'Structuring disorganized people operations into reliable, compliant systems.',
    description: 'Transform informal, reactive HR operations into structured operating models designed to scale alongside your organization.',
    items: [
      {
        title: 'HR Process Audit & Workflow Redesign',
        problem: 'Workflows rely on tacit memory, leading to inconsistent execution across teams.',
        intervention: 'Comprehensive mapping and redesign of end-to-end employee lifecycle workflows, policies, and standard operating procedures (SOPs).',
        outcome: 'Standardized operations, reduced compliance risk, and clear accountability at every stage.',
        features: [
          'HR process audit',
          'Employee lifecycle optimization',
          'HR operations design',
          'Policy and SOP development',
          'Employee experience workflows',
          'HR operating model design',
        ],
      },
      {
        title: 'Payroll Process Optimization',
        problem: 'Monthly payroll calculations depend on manual data collection and complex spreadsheets prone to delay.',
        intervention: 'Standardization of attendance, leave, benefit, and tax inputs into a streamlined pre-payroll verification engine.',
        outcome: 'Zero-error payroll cycles completed in hours rather than days, with full audit trail compliance.',
        features: [
          'Payroll workflow mapping',
          'Attendance & leave integration',
          'Pre-payroll validation controls',
          'Compliance & audit readiness',
        ],
      },
    ],
  },
  {
    id: 'hr-technology',
    title: 'HR Technology & HRIS',
    subtitle: 'Selecting, configuring, and connecting the right HR tech stack.',
    description: 'Stop paying for unused software. We evaluate, implement, and optimize HRMS platforms so technology serves your actual business process.',
    items: [
      {
        title: 'HRMS Selection & End-to-End Implementation',
        problem: 'Companies select HRMS software based on generic feature lists rather than actual operational requirements.',
        intervention: 'Vendor-agnostic evaluation based on business needs, followed by structured data migration and workflow setup.',
        outcome: 'Rapid software adoption, clean data architecture, and high employee engagement from day one.',
        features: [
          'HR technology selection',
          'HRMS implementation',
          'Data architecture & migration',
          'HRIS workflow design',
          'Role-based permissions & security',
        ],
      },
      {
        title: 'HRMS Optimization & System Integration',
        problem: 'Existing HRMS is underutilized, leaving teams relying on parallel offline spreadsheets.',
        intervention: 'Re-architecting existing module configurations, automating custom triggers, and integrating APIs across tools.',
        outcome: 'Unified single-source-of-truth HR platform with 100% data syncing across recruitment, payroll, and Slack/Teams.',
        features: [
          'HRMS optimization',
          'API system integrations',
          'Employee data architecture',
          'HR dashboards and reporting',
        ],
      },
    ],
  },
  {
    id: 'hr-automation',
    title: 'HR Automation',
    subtitle: 'Eliminating repetitive administrative tasks with smart automated workflows.',
    description: 'Free up HR professionals to focus on high-value talent strategies by automating multi-step communications, data entry, and follow-ups.',
    items: [
      {
        title: 'Recruitment & Pre-boarding Automation',
        problem: 'Recruiters spend 70% of their day sending candidate status emails, collecting documents, and tracking offer letters.',
        intervention: 'Automated candidate communication triggers via WhatsApp/email, smart document upload links, and automated pre-boarding check-ins.',
        outcome: '80% drop in candidate drop-off prior to day one, with zero manual document chasing.',
        features: [
          'Recruitment automation',
          'Pre-boarding automation',
          'Onboarding automation',
          'WhatsApp/email workflow triggers',
        ],
      },
      {
        title: 'Lifecycle & Repetitive Task Automation',
        problem: 'Attendance exceptions, leave approvals, probation reminders, and exit clearances stall in email threads.',
        intervention: 'Custom multi-channel automation workflows connecting HRMS, communication tools (Slack/Teams/WhatsApp), and databases.',
        outcome: 'Instant task resolution, automated reminder escalation, and seamless administrative cadence.',
        features: [
          'Attendance workflows',
          'Payroll workflows',
          'Employee communication automation',
          'Repetitive HR task automation',
        ],
      },
    ],
  },
  {
    id: 'process-consulting',
    title: 'People & Process Consulting',
    subtitle: 'Data-backed operating frameworks and executive visibility.',
    description: 'Provide executive leadership with clear operational metrics, structured governance, and scalable management frameworks.',
    items: [
      {
        title: 'Workforce Operations & KPI Frameworks',
        problem: 'Leadership lacks real-time insight into headcount costs, attrition drivers, and HR team productivity.',
        intervention: 'Creation of standard HR KPI metrics, custom executive reporting dashboards, and weekly operational rhythms.',
        outcome: 'Real-time strategic decision-making powered by clean, reliable workforce analytics.',
        features: [
          'Process audits',
          'Workforce operations',
          'HR metrics & KPI frameworks',
          'Documentation & SOPs',
          'Management reporting & dashboards',
          'Continuous process improvement',
        ],
      },
    ],
  },
];
