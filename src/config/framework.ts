export interface FrameworkStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  keyOutputs: string[];
}

export const NKVV_FRAMEWORK: FrameworkStep[] = [
  {
    number: '01',
    title: 'DIAGNOSE',
    tagline: 'Understand the current process.',
    description: 'We audit your operating reality, shadow spreadsheets, and informal communication channels to pinpoint exact friction points.',
    keyOutputs: [
      'Process Reality Mapping',
      'Operational Friction Audit',
      'Bottleneck & Risk Matrix',
    ],
  },
  {
    number: '02',
    title: 'DESIGN',
    tagline: 'Build the process architecture.',
    description: 'We design clear Standard Operating Procedures (SOPs), governance controls, and ownership handoffs before touching technology.',
    keyOutputs: [
      'Operating Model Architecture',
      'Documented SOP Framework',
      'Governance & Policy Controls',
    ],
  },
  {
    number: '03',
    title: 'ENABLE',
    tagline: 'Put people, roles & systems in place.',
    description: 'We configure core software, align stakeholder cadences, and train team leads on structured operational standards.',
    keyOutputs: [
      'Tool Configuration & Mapping',
      'Manager Cadence Guidelines',
      'Role Ownership Matrices',
    ],
  },
  {
    number: '04',
    title: 'AUTOMATE',
    tagline: 'Eliminate repetitive manual work.',
    description: 'We eliminate repetitive administrative tasks through configured triggers, API integrations, and multi-channel notifications.',
    keyOutputs: [
      'Rules-Based Workflow Triggers',
      'API & Tool Integrations',
      'Automated Reminders & Handoffs',
    ],
  },
  {
    number: '05',
    title: 'SCALE',
    tagline: 'Create visibility & operational resilience.',
    description: 'We deploy executive visibility dashboards and continuous review cadences so your operations scale cleanly without chaos.',
    keyOutputs: [
      'Executive Leadership Visibility',
      'SLA & Metric Tracking',
      'Continuous Refinement Playbook',
    ],
  },
];

