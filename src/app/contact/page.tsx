import React from 'react';
import { ContactForm } from '@/components/contact/ContactForm';
import { SITE_CONFIG } from '@/config/site';
import { MapPin, PhoneCall, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | NK Velora Ventures',
  description: "Let's solve the operational problem behind the HR problem. Book a Discovery Call with NKVV.",
};

export default function ContactPage() {
  return (
    <main className="pt-28 pb-20 bg-offwhite min-h-screen">
      {/* Header */}
      <section className="bg-navy-deep text-white py-16 md:py-20 border-b border-navy-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center max-w-3xl">
          <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider bg-navy-surface px-3.5 py-1.5 rounded-full border border-gold/30">
            Start a Discovery
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white leading-[1.15]">
            Start a Discovery
            <span className="block italic font-serif font-normal text-gold text-2xl sm:text-4xl mt-2">
              Where Operations Need Structure
            </span>
          </h1>
          <div className="w-14 h-0.5 bg-gold mx-auto my-4 rounded-full" />
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light max-w-2xl mx-auto">
            Tell us where your HR operations are slowing the business down. We&apos;ll identify the friction, map the underlying process and determine what should be redesigned, enabled or automated.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Info Col */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-8 rounded-2xl border border-border-subtle shadow-md space-y-6">
                <h3 className="text-xl font-bold text-navy-deep">
                  Why Schedule a Call?
                </h3>

                <div className="space-y-4 text-sm text-gray-700">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-navy-deep block">Direct Founder & Principal Engagement</strong>
                      <span className="text-xs text-muted">You speak directly with strategic transformation leads, not junior account executives.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <PhoneCall className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-navy-deep block">Pragmatic Operational Audit</strong>
                      <span className="text-xs text-muted">We evaluate real workflows, software utilization, and manual friction points.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-navy-deep block">Location</strong>
                      <span className="text-xs text-muted">{SITE_CONFIG.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-navy-deep p-6 rounded-2xl text-white border border-navy-surface space-y-3">
                <h4 className="text-xs font-mono uppercase font-bold text-gold">
                  Privacy & Professional Standards
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  All submitted business data and process descriptions remain strictly confidential under standard non-disclosure guidelines.
                </p>
              </div>
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
