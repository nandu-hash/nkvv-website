'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MessageSquare, ExternalLink, ShieldCheck, Clock } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { BorderGlow } from '@/components/ui/BorderGlow';

export const ContactTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'form'>('calendar');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#enquiry') {
      setActiveTab('form');
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex p-1.5 bg-navy-deep rounded-2xl border border-gold/30 max-w-md mx-auto lg:mx-0 shadow-lg">
        <button
          type="button"
          onClick={() => setActiveTab('calendar')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
            activeTab === 'calendar'
              ? 'bg-gold text-navy-deep font-bold shadow-md shadow-gold/20 scale-[1.02]'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Book an Appointment</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('form')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
            activeTab === 'form'
              ? 'bg-gold text-navy-deep font-bold shadow-md shadow-gold/20 scale-[1.02]'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Send Enquiry</span>
        </button>
      </div>

      {/* Calendar View */}
      {activeTab === 'calendar' && (
        <BorderGlow
          backgroundColor="#ffffff"
          borderRadius={24}
          glowRadius={36}
          className="shadow-xl"
        >
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gold bg-navy-deep px-3 py-1 rounded-full">
                    Direct Calendar Booking
                  </span>
                  <span className="text-xs text-muted flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    30–45 Mins Discovery
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-navy-deep">
                  Schedule with Founder Nandu Kumar
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Select a date and time to block an appointment directly with our Founder &amp; Principal.
                </p>
              </div>

              <a
                href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2zm4OHhOPRYA5HaCeWnrg2L17VMx_nc8jIEDa3MJYOJT9ITgKRj22uXQUaA4mAVLlfV_wnvKJc?gv=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-offwhite hover:bg-gray-100 text-navy-deep text-xs font-semibold border border-gray-200 transition-colors shrink-0 self-start sm:self-auto"
              >
                <span>Full Calendar View</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold" />
              </a>
            </div>

            {/* Embedded Google Calendar Appointment Scheduling */}
            <div className="w-full rounded-xl overflow-hidden bg-white border border-gray-200 shadow-inner">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2zm4OHhOPRYA5HaCeWnrg2L17VMx_nc8jIEDa3MJYOJT9ITgKRj22uXQUaA4mAVLlfV_wnvKJc?gv=true"
                style={{ border: 0 }}
                width="100%"
                height="650"
                frameBorder="0"
                title="Google Calendar Appointment Scheduling"
                className="w-full block"
              />
            </div>

            {/* Bottom note */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Confirmed directly on Google Calendar with nandu@nkvelora.co.in</span>
              </span>
              <button
                type="button"
                onClick={() => setActiveTab('form')}
                className="text-navy-deep font-semibold underline hover:text-gold transition-colors"
              >
                Prefer to write us a detailed message first?
              </button>
            </div>
          </div>
        </BorderGlow>
      )}

      {/* Form View */}
      {activeTab === 'form' && (
        <ContactForm onScheduleClick={() => setActiveTab('calendar')} />
      )}
    </div>
  );
};
