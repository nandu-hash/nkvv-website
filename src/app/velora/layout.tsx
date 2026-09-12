import React from 'react';
import { VeloraShell } from '@/components/velora/VeloraShell';

export const metadata = {
  title: 'VELORA Compliance | NKVV Ventures',
  description: 'Enterprise HR & Labour Compliance Diagnostic and Process Management Platform',
};

export default function VeloraLayout({ children }: { children: React.ReactNode }) {
  return <VeloraShell>{children}</VeloraShell>;
}
