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
    tagline: 'Understand the current process.',
    description: 'We audit your operating reality, communication channels, shadow spreadsheets, and informal practices to map the real operational flow.',
    keyOutputs: [
      'Comprehensive Process Reality Map',
      'Operational Friction Audit',
      'Stakeholder & Tool Utilization Review',
    ],
  },
  {
    number: '02',
    title: 'Identify',
    tagline: 'Find operational, compliance and workflow gaps.',
    description: 'We isolate compliance exposures, labour law risks, communication delays, and single points of operational failure across your teams.',
    keyOutputs: [
      'Statutory & Labour Compliance Gap Analysis',
      'Workflow Friction & Latency Report',
      'Risk & Bottleneck Matrix',
    ],
  },
  {
    number: '03',
    title: 'Structure',
    tagline: 'Design the correct process, controls, SOPs and responsibilities.',
    description: 'We architect documented Standard Operating Procedures (SOPs), clear governance boundaries, and structured responsibility matrices before introducing automation.',
    keyOutputs: [
      'Target Operating Model Blueprint',
      'Documented Standard Operating Procedures (SOPs)',
      'Governance & Operational Control Framework',
    ],
  },
  {
    number: '04',
    title: 'Automate',
    tagline: 'Automate repetitive and rules-based workflow wherever appropriate.',
    description: 'We eliminate repetitive administrative tasks through configured systems, automated reminders, and inter-tool API synchronizations.',
    keyOutputs: [
      'Rules-Based Workflow Automation',
      'Multi-Channel Alert & Task Routing',
      'System-to-System Data Synchronization',
    ],
  },
  {
    number: '05',
    title: 'Improve',
    tagline: 'Measure, monitor and continuously improve the process.',
    description: 'We establish executive dashboards and structured review rhythms so your business processes evolve with operational resilience as you scale.',
    keyOutputs: [
      'Executive Leadership Dashboards',
      'Operational SLA & Metric Tracking',
      'Continuous Process Refinement Rhythm',
    ],
  },
];
