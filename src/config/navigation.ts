export interface NavItem {
  label: string;
  href: string;
  isFuture?: boolean;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export const FUTURE_MODULES: NavItem[] = [
  { label: 'Case Studies', href: '#', isFuture: true },
  { label: 'Client Portal', href: '#', isFuture: true },
  { label: 'Careers', href: '#', isFuture: true },
  { label: 'Resources', href: '#', isFuture: true },
  { label: 'Pricing', href: '#', isFuture: true },
  { label: 'Automation Products', href: '#', isFuture: true },
  { label: 'HR Technology Marketplace', href: '#', isFuture: true },
];

export const FOOTER_NAV = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'How We Work', href: '/how-we-work' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'HR Operations Transformation', href: '/services#hr-operations' },
    { label: 'HR Technology & HRIS', href: '/services#hr-technology' },
    { label: 'HR Automation', href: '/services#hr-automation' },
    { label: 'People & Process Consulting', href: '/services#process-consulting' },
  ],
  solutions: [
    { label: 'Recruitment & Onboarding', href: '/solutions#hiring-fast' },
    { label: 'HRIS Optimization', href: '/solutions#hrms-spreadsheets' },
    { label: 'Payroll Transformation', href: '/solutions#payroll-manual' },
    { label: 'HR Analytics & Visibility', href: '/solutions#leadership-visibility' },
  ],
  futureRoadmap: FUTURE_MODULES,
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
  ],
  social: [
    { label: 'LinkedIn', href: 'https://linkedin.com/company/nk-velora-ventures' },
  ],
};
