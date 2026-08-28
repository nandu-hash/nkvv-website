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
    tagline: 'Uncover bottlenecks across people, process, and tech.',
    description: 'We audit your current employee lifecycle, software tools, communication channels, and informal practices to pinpoint operational friction.',
    keyOutputs: [
      'HR Operations Health Audit',
      'Process Bottleneck Map',
      'Tech Stack Utilization Score',
    ],
  },
  {
    number: '02',
    title: 'Design',
    tagline: 'Architect scalable workflows, SOPs, and operating models.',
    description: 'We redesign your HR processes from the ground up, establishing documented SOPs, clear SLA ownership, and structured policy frameworks.',
    keyOutputs: [
      'Future-State Process Blueprint',
      'Standard Operating Procedures (SOPs)',
      'Policy & Governance Matrix',
    ],
  },
  {
    number: '03',
    title: 'Automate',
    tagline: 'Deploy HR technology, integrations, and automated triggers.',
    description: 'We configure HRIS systems, build no-code/low-code integrations, and automate high-volume communication and compliance tasks.',
    keyOutputs: [
      'HRMS Implementation/Optimization',
      'Automated Workflow Triggers',
      'Inter-system API Connections',
    ],
  },
  {
    number: '04',
    title: 'Scale',
    tagline: 'Enable leadership visibility and long-term operational resilience.',
    description: 'We establish executive dashboards, train team leads on operating rhythms, and ensure your HR infrastructure easily scales from 30 to 300+ employees.',
    keyOutputs: [
      'Executive HR Dashboards',
      'Team Operating Cadence',
      'Continuous Improvement Playbook',
    ],
  },
];
