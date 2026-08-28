export interface InsightArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  datePlaceholder: string;
}

export const INSIGHT_CATEGORIES = [
  'All Categories',
  'HR Operations',
  'HR Technology',
  'HR Automation',
  'Startup HR',
  'Process Transformation',
  'HRIS',
  'Payroll Operations',
  'People Analytics',
];

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: 'scaling-hr-30-to-300',
    title: 'Why HR Operations Break Down When Startups Scale from 30 to 300 Employees',
    category: 'Startup HR',
    readTime: '6 min read',
    summary: 'An architectural analysis of the inflection points where spreadsheet-driven HR creates operational bottlenecks and compliance risks.',
    datePlaceholder: 'Coming Soon • Q3 2026',
  },
  {
    id: 'hrms-implementation-traps',
    title: 'The Top 5 Mistakes Growing Companies Make When Implementing an HRMS',
    category: 'HR Technology',
    readTime: '8 min read',
    summary: 'Why buying software before optimizing underlying processes leads to shadow spreadsheets, low adoption, and wasted software licenses.',
    datePlaceholder: 'Coming Soon • Q3 2026',
  },
  {
    id: 'automating-onboarding-whatsapp-email',
    title: 'Building Zero-Drop-Off Pre-boarding Workflows via WhatsApp & Automation',
    category: 'HR Automation',
    readTime: '5 min read',
    summary: 'How multi-channel automated communication triggers keep candidates engaged between offer acceptance and day one.',
    datePlaceholder: 'Coming Soon • Q3 2026',
  },
  {
    id: 'zero-error-payroll-framework',
    title: 'Designing a Pre-Payroll Data Engine for Zero-Error Monthly Closures',
    category: 'Payroll Operations',
    readTime: '7 min read',
    summary: 'A blueprint for converting multi-source attendance, leave, and benefit data into clean input files in hours instead of days.',
    datePlaceholder: 'Coming Soon • Q4 2026',
  },
  {
    id: 'process-first-digital-transformation',
    title: 'Process First, Tech Second: The Core Philosophy of HR Digital Transformation',
    category: 'Process Transformation',
    readTime: '6 min read',
    summary: 'Why automating a flawed process only generates bad outputs faster — and how to redesign workflows for actual business impact.',
    datePlaceholder: 'Coming Soon • Q4 2026',
  },
  {
    id: 'people-analytics-that-matter',
    title: 'Essential HR Metrics Every Startup Founder Should Track (And How to Automate Them)',
    category: 'People Analytics',
    readTime: '7 min read',
    summary: 'Moving beyond simple headcount reports to track operational velocity, cost-per-hire, onboarding throughput, and attrition risks.',
    datePlaceholder: 'Coming Soon • Q4 2026',
  },
];
