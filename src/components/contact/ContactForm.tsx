'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, MapPin, Building, Mail, Phone, User, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';
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
    hp_website: '', // Honeypot field for spam protection
  });

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      errors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Work email is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid work email address.';
    }

    if (!formData.company.trim()) {
      errors.company = 'Company name is required.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent accidental duplicate submissions
    if (isSubmitting) return;

    setErrorMessage('');
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    // Disable button immediately
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let resData: { success?: boolean; error?: string; message?: string } = {};
      try {
        const text = await response.text();
        resData = text ? JSON.parse(text) : {};
      } catch (parseErr) {
        console.warn('Response parsing fallback:', parseErr);
      }

      if (!response.ok || !resData.success) {
        throw new Error(resData.error || "Thank you for reaching out. We received your request, or you can email us directly at help@nkvelora.co.in.");
      }

      // Success
      setSuccessMessage(resData.message || "Thank you. Your enquiry has been received. We'll get back to you shortly.");
      setSubmitted(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        companySize: '30–75 employees',
        phone: '',
        needHelpWith: 'HR Operations',
        message: '',
        hp_website: '',
      });
      setFieldErrors({});
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(err.message || "We couldn't submit your enquiry right now. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-2xl border border-border-subtle shadow-xl">
      {submitted ? (
        <div className="text-center py-12 space-y-6 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <h3 className="text-2xl font-bold text-navy-deep">
            Enquiry Received
          </h3>
          
          <p className="text-muted text-sm max-w-md mx-auto leading-relaxed font-medium">
            {successMessage || "Thank you. Your enquiry has been received. We'll get back to you shortly."}
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                setSubmitted(false);
                setSuccessMessage('');
              }}
              className="px-6 py-2.5 rounded-lg bg-navy-primary text-white text-xs font-mono font-bold hover:bg-navy-deep transition-colors"
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Honeypot Spam Protection Field */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="hp_website">Leave this field blank</label>
            <input
              type="text"
              id="hp_website"
              name="hp_website"
              tabIndex={-1}
              autoComplete="off"
              value={formData.hp_website}
              onChange={(e) => setFormData({ ...formData, hp_website: e.target.value })}
            />
          </div>

          {/* Top Error Alert */}
          {errorMessage && (
            <div className="p-4 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

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
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                    fieldErrors.name
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-gold focus:border-transparent'
                  }`}
                />
              </div>
              {fieldErrors.name && (
                <span className="text-[11px] font-semibold text-red-600 mt-1 block">
                  {fieldErrors.name}
                </span>
              )}
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
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                    fieldErrors.email
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-gold focus:border-transparent'
                  }`}
                />
              </div>
              {fieldErrors.email && (
                <span className="text-[11px] font-semibold text-red-600 mt-1 block">
                  {fieldErrors.email}
                </span>
              )}
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
                  onChange={(e) => {
                    setFormData({ ...formData, company: e.target.value });
                    if (fieldErrors.company) setFieldErrors({ ...fieldErrors, company: '' });
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                    fieldErrors.company
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-gold focus:border-transparent'
                  }`}
                />
              </div>
              {fieldErrors.company && (
                <span className="text-[11px] font-semibold text-red-600 mt-1 block">
                  {fieldErrors.company}
                </span>
              )}
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

            {/* Phone (Optional) */}
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
            className={`w-full py-4 rounded-xl text-base font-bold text-navy-deep bg-gold hover:bg-gold-light transition-all shadow-lg shadow-gold/10 flex items-center justify-center gap-2 ${
              isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>{SITE_CONFIG.contact.primaryCta}</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Location & Trust Notice */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-muted">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gold" />
          <span>{SITE_CONFIG.location}</span>
        </div>
        <span className="font-mono text-[11px]">NK Velora Ventures • Confidential Advisory</span>
      </div>

    </div>
  );
};
