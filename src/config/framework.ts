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
    title: 'Diagnose',
    tagline: 'Find the operational friction.',
    description: 'We audit your current employee lifecycle, communication channels, shadow spreadsheets, and informal practices to uncover exact bottlenecks and compliance exposures.',
    keyOutputs: [
      'HR Operations Audit & Friction Map',
      'Process Bottleneck Matrix',
      'Technology & Tool Utilization Review',
    ],
  },
  {
    number: '02',
    title: 'Design',
    tagline: 'Build the process architecture.',
    description: 'We redesign workflows from the ground up, establishing documented Standard Operating Procedures (SOPs), clear SLA ownership, and structured policy frameworks.',
    keyOutputs: [
      'Target Operating Model Blueprint',
      'Documented Standard Operating Procedures (SOPs)',
      'Policy & Governance Matrix',
    ],
  },
  {
    number: '03',
    title: 'Enable',
    tagline: 'Put people, roles and systems in place.',
    description: 'We configure the base systems and ensure internal teams and managers are thoroughly enabled on the newly established processes and operating standards.',
    keyOutputs: [
      'Core Systems & Permissions Setup',
      'Team & Manager Operating Cadence',
      'Role-Based Responsibility Handovers',
    ],
  },
  {
    number: '04',
    title: 'Automate',
    tagline: 'Remove repetitive manual work.',
    description: 'We eliminate repetitive administrative tasks through configured HRIS automation, API connections, and automated notification triggers.',
    keyOutputs: [
      'HRMS Workflow Configuration',
      'Automated Lifecycle Triggers (Email/WhatsApp)',
      'Inter-system Data Synchronization',
    ],
  },
  {
    number: '05',
    title: 'Scale',
    tagline: 'Create visibility and operational resilience.',
    description: 'We establish executive dashboards and structured operating rhythms so your HR operations scale cleanly from 30 to 300+ employees.',
    keyOutputs: [
      'Executive HR Dashboards',
      'Operational Metric Tracking',
      'Continuous Process Improvement Playbook',
    ],
  },
];
