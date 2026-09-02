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
    title: 'Enable',
    tagline: 'Implement systems and upskill your core teams.',
    description: 'We configure the base systems and ensure the team is trained on the newly established processes and standards.',
    keyOutputs: [
      'Core Systems Setup',
      'Team Training Sessions',
      'Operating Rhythm Establishment',
    ],
  },
  {
    number: '04',
    title: 'Automate',
    tagline: 'Deploy HR technology, integrations, and automated triggers.',
    description: 'We configure HRIS systems, build no-code/low-code integrations, and automate high-volume communication and compliance tasks.',
    keyOutputs: [
      'HRMS Optimization',
      'Automated Workflow Triggers',
      'Inter-system Connections',
    ],
  },
  {
    number: '05',
    title: 'Scale',
    tagline: 'Establish leadership visibility and long-term resilience.',
    description: 'We build executive dashboards and ensure your HR infrastructure easily scales from 30 to 300+ employees.',
    keyOutputs: [
      'Executive Dashboards',
      'Manager Enablement',
      'Continuous Improvement Playbook',
    ],
  },
];
