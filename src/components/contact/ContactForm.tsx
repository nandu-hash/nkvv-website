'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, MapPin, Building, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

const HELP_OPTIONS = [
  'HR Operations',
  'HR Automation',
  'HRIS / HR Technology',
  'Payroll Operations',
  'Process Transformation',
  'HR Consulting',
  'Other',
];

const COMPANY_SIZES = [
  '1–29 employees',
  '30–75 employees',
  '76–150 employees',
  '151–300 employees',
  '300+ employees',
];

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    companySize: '30–75 employees',
    phone: '',
    needHelpWith: 'HR Operations',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-2xl border border-border-subtle shadow-xl">
      {submitted ? (
        <div className="text-center py-12 space-y-6 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <h3 className="text-2xl font-bold text-navy-deep">
            Thank you for reaching out!
          </h3>
          
          <p className="text-muted text-sm max-w-md mx-auto leading-relaxed">
            Your discovery request has been received by our principal consulting team in {SITE_CONFIG.location}. We will review your operational requirements and get back to you within 24 hours.
          </p>

          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                email: '',
                company: '',
                companySize: '30–75 employees',
                phone: '',
                needHelpWith: 'HR Operations',
                message: '',
              });
            }}
            className="px-6 py-2.5 rounded-lg bg-navy-primary text-white text-xs font-mono font-bold hover:bg-navy-deep transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-navy-deep uppercase tracking-wider mb-2">
                Your Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-sm text-dark placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Work Email */}
            <div>
              <label className="block text-xs font-bold text-navy-deep uppercase tracking-wider mb-2">
                Work Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-sm text-dark placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Company */}
            <div>
              <label className="block text-xs font-bold text-navy-deep uppercase tracking-wider mb-2">
                Company Name *
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Acme Tech"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-sm text-dark placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Company Size */}
            <div>
              <label className="block text-xs font-bold text-navy-deep uppercase tracking-wider mb-2">
                Company Size *
              </label>
              <select
                value={formData.companySize}
                onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-sm text-dark bg-white"
              >
                {COMPANY_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-navy-deep uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-sm text-dark placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* What do you need help with? */}
          <div>
            <label className="block text-xs font-bold text-navy-deep uppercase tracking-wider mb-2">
              What do you need help with? *
            </label>
            <select
              value={formData.needHelpWith}
              onChange={(e) => setFormData({ ...formData, needHelpWith: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-sm text-dark bg-white"
            >
              {HELP_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold text-navy-deep uppercase tracking-wider mb-2">
              Brief Description of Your Challenge
            </label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <textarea
                rows={4}
                placeholder="Tell us about your current HR operations, tech stack, or automation goals..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-sm text-dark placeholder:text-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl text-base font-bold text-navy-deep bg-gold hover:bg-gold-light transition-all shadow-lg shadow-gold/10 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Sending Request...</span>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>{SITE_CONFIG.contact.primaryCta}</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Location Notice */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-muted">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gold" />
          <span>{SITE_CONFIG.location}</span>
        </div>
        <span>Initial response guaranteed within 24h</span>
      </div>
    </div>
  );
};
