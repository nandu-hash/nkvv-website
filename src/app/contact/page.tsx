import React from 'react';
import { ContactForm } from '@/components/contact/ContactForm';
import { SITE_CONFIG } from '@/config/site';
import { MapPin, PhoneCall, Users, ShieldCheck } from 'lucide-react';
import { BorderGlow } from '@/components/ui/BorderGlow';
import { WebThreads } from '@/components/ui/WebThreads';

export const metadata = {
  title: 'Connect With Us | NK Velora Ventures',
  description: "Connect with our team to solve operational bottlenecks, structure processes, and automate workflows.",
};

export default function ContactPage() {
  return (
    <main className="pt-28 pb-20 bg-offwhite min-h-screen">
      {/* Header */}
      <section className="bg-navy-deep text-white py-14 md:py-20 border-b border-navy-surface relative overflow-hidden">
        {/* Interactive WebThreads WebGL Canvas in Header Background */}
        <div className="absolute inset-0 pointer-events-auto opacity-35 z-0 overflow-hidden">
          <WebThreads />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3 text-center max-w-2xl">
          <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider bg-navy-surface px-3.5 py-1.5 rounded-full border border-gold/30">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
            Connect With Our Team
          </h1>
          <div className="w-14 h-0.5 bg-gold mx-auto my-3 rounded-full" />
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
            Tell us where manual friction or operational complexity is slowing down your organization. We&apos;ll map the process and outline practical next steps.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Info Col */}
            <div className="lg:col-span-4 space-y-6">
              <BorderGlow
                backgroundColor="#ffffff"
                borderRadius={20}
                glowRadius={35}
                className="shadow-md"
              >
                <div className="p-7 space-y-6">
                  <h3 className="text-lg font-bold text-navy-deep">
                    Connect With Us
                  </h3>

                  <div className="space-y-4 text-sm text-gray-700">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-navy-deep block text-sm">Work Directly With Our Team</strong>
                        <span className="text-xs text-muted">Collaborate directly with experienced process and automation specialists who understand scaling operations.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <PhoneCall className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-navy-deep block text-sm">Pragmatic Operational Audit</strong>
                        <span className="text-xs text-muted">We evaluate your current workflows, tool utilization, and points of manual friction.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-navy-deep block text-sm">Location</strong>
                        <span className="text-xs text-muted">{SITE_CONFIG.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </BorderGlow>

              <BorderGlow
                backgroundColor="#0A2240"
                borderRadius={20}
                glowRadius={30}
                className="shadow-lg"
              >
                <div className="p-6 text-white space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-gold">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    <span>Confidential Advisory</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    All business workflows and operational information shared remain strictly confidential under standard non-disclosure practices.
                  </p>
                </div>
              </BorderGlow>
            </div>

            {/* Right Form Col */}
            <div className="lg:col-span-8">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
