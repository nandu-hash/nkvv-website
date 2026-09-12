'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Stethoscope,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  Save,
  Check,
  Info,
} from 'lucide-react';

interface Question {
  id: string;
  questionCode: string;
  category: string;
  questionText: string;
  helpText: string;
  applicableRulesSummary: string;
  sortOrder: number;
}

interface DiagnosticData {
  id: string;
  title: string;
  status: string;
  responses: Array<{
    id: string;
    questionId: string;
    answer: string;
    notes?: string;
  }>;
}

export default function DiagnosticsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [diagnostic, setDiagnostic] = useState<DiagnosticData | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<Record<string, { answer: string; notes?: string }>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadDiagnostic() {
      try {
        const res = await fetch('/api/diagnostic');
        const data = await res.json();
        if (data.diagnostic) {
          setDiagnostic(data.diagnostic);
          const initialMap: Record<string, { answer: string; notes?: string }> = {};
          data.diagnostic.responses.forEach((r: any) => {
            initialMap[r.questionId] = { answer: r.answer, notes: r.notes || '' };
          });
          setResponses(initialMap);
        }
        if (data.questions) {
          setQuestions(data.questions);
        }
      } catch (err) {
        console.error('Failed to load diagnostic', err);
      } finally {
        setLoading(false);
      }
    }
    loadDiagnostic();
  }, []);

  const handleSelectAnswer = (questionId: string, answer: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        answer,
      },
    }));
  };

  const handleNotesChange = (questionId: string, notes: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        answer: prev[questionId]?.answer || 'UNKNOWN',
        notes,
      },
    }));
  };

  const handleSubmitAssessment = async () => {
    if (!diagnostic) return;
    setSubmitting(true);
    setStatusMessage('Evaluating statutory applicability and computing VELORA compliance score...');

    try {
      const res = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          diagnosticId: diagnostic.id,
          responses,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit assessment');
      }

      setStatusMessage(`Assessment complete! Score: ${data.score}/100 with ${data.findingsCount} findings.`);
      setTimeout(() => {
        router.push('/velora/dashboard');
        router.refresh();
      }, 1500);
    } catch (err: any) {
      alert(err.message);
      setStatusMessage(null);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400 font-mono text-xs">
        Loading statutory diagnostic questionnaires...
      </div>
    );
  }

  const categories = ['ALL', ...Array.from(new Set(questions.map((q) => q.category)))];
  const filteredQuestions =
    selectedCategory === 'ALL'
      ? questions
      : questions.filter((q) => q.category === selectedCategory);

  const answeredCount = Object.keys(responses).length;
  const progressPercent = Math.round((answeredCount / (questions.length || 1)) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
              Adaptive Statutory Diagnostic
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-gold/15 text-gold border border-gold/30 uppercase font-semibold">
              {diagnostic?.status || 'IN_PROGRESS'}
            </span>
          </div>
          <p className="text-xs text-gray-400 font-light mt-1">
            Questions dynamically grounded in operative Central and State labour enactments.
          </p>
        </div>

        <button
          onClick={handleSubmitAssessment}
          disabled={submitting || answeredCount === 0}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold hover:bg-gold-bright text-navy-deep text-xs font-bold uppercase tracking-wider transition-all shadow-lg disabled:opacity-50"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{submitting ? 'Evaluating Assessment...' : 'Run Compliance Assessment'}</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-xl bg-gold/15 border border-gold/40 text-gold text-xs flex items-center gap-3 animate-pulse">
          <Info className="w-4 h-4 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Diagnostic Progress Bar */}
      <div className="p-4 rounded-xl bg-navy-deep border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-gray-300">
            Audit Coverage: <strong>{answeredCount} of {questions.length} Questions Diagnosed</strong>
          </span>
          <span className="text-gold font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 bg-navy-dark rounded-full overflow-hidden">
          <div
            className="h-full bg-gold transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-gold text-navy-deep font-bold shadow'
                : 'bg-navy-deep text-gray-300 hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Questionnaire Cards */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const currentResp = responses[q.id]?.answer;
          const currentNotes = responses[q.id]?.notes || '';

          return (
            <div
              key={q.id}
              className={`p-6 rounded-2xl bg-navy-deep border transition-all ${
                currentResp
                  ? 'border-white/15'
                  : 'border-white/5 hover:border-gold/30'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-dark text-gold border border-gold/30 font-semibold">
                      {q.category}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">
                      {q.questionCode}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-serif font-bold text-white leading-snug">
                    {q.questionText}
                  </h3>

                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {q.helpText}
                  </p>

                  <div className="text-[10px] font-mono text-gold/80 flex items-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3 h-3 text-gold shrink-0" />
                    <span>Statutory Reference: {q.applicableRulesSummary}</span>
                  </div>
                </div>

                {/* Status Indicator */}
                {currentResp && (
                  <span
                    className={`text-[10px] font-mono px-2.5 py-1 rounded-full uppercase font-bold shrink-0 self-start ${
                      currentResp === 'YES'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : currentResp === 'NO'
                        ? 'bg-red-950 text-red-300 border border-red-500/40'
                        : currentResp === 'PARTIALLY'
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        : 'bg-gray-800 text-gray-300 border border-gray-600'
                    }`}
                  >
                    {currentResp}
                  </span>
                )}
              </div>

              {/* Answer Buttons */}
              <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center gap-2">
                {[
                  { label: 'YES', val: 'YES', color: 'hover:border-emerald-500 hover:text-emerald-300' },
                  { label: 'PARTIALLY', val: 'PARTIALLY', color: 'hover:border-amber-500 hover:text-amber-300' },
                  { label: 'NO', val: 'NO', color: 'hover:border-red-500 hover:text-red-300' },
                  { label: 'UNKNOWN', val: 'UNKNOWN', color: 'hover:border-purple-500 hover:text-purple-300' },
                  { label: 'NOT APPLICABLE', val: 'NOT_APPLICABLE', color: 'hover:border-gray-500 hover:text-gray-300' },
                ].map((btn) => (
                  <button
                    key={btn.val}
                    type="button"
                    onClick={() => handleSelectAnswer(q.id, btn.val)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition-all border ${
                      currentResp === btn.val
                        ? 'bg-gold text-navy-deep border-gold shadow-md font-bold'
                        : `bg-navy-dark text-gray-300 border-white/10 ${btn.color}`
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Context / Notes Field */}
              <div className="mt-3">
                <input
                  type="text"
                  value={currentNotes}
                  onChange={(e) => handleNotesChange(q.id, e.target.value)}
                  placeholder="Optional context, policy link, or observations regarding this requirement..."
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-dark border border-white/5 text-gray-300 text-xs focus:border-gold outline-none"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Submission Bar */}
      <div className="sticky bottom-4 bg-navy-deep/95 backdrop-blur border border-gold/40 p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4">
        <div className="text-xs">
          <span className="text-gray-300">Ready to run assessment? </span>
          <span className="text-gold font-bold">{answeredCount} of {questions.length} answered.</span>
        </div>
        <button
          onClick={handleSubmitAssessment}
          disabled={submitting || answeredCount === 0}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gold hover:bg-gold-bright text-navy-deep text-xs font-bold uppercase tracking-wider transition-all shadow-md disabled:opacity-50"
        >
          <span>{submitting ? 'Evaluating...' : 'Run Compliance Assessment'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
