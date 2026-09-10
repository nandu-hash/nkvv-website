'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INSIGHT_CATEGORIES, INSIGHT_ARTICLES } from '@/config/insights';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { BorderGlow } from '@/components/ui/BorderGlow';

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');

  const filteredArticles =
    selectedCategory === 'All Categories'
      ? INSIGHT_ARTICLES
      : INSIGHT_ARTICLES.filter((art) => art.category === selectedCategory);

  return (
    <main className="pt-28 pb-20 bg-offwhite min-h-screen">
      {/* Page Header */}
      <section className="bg-navy-deep text-white py-16 md:py-20 border-b border-navy-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center max-w-3xl">
          <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider bg-navy-surface px-3.5 py-1.5 rounded-full border border-gold/30">
            NKVV Knowledge & Research
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Insights on HR Operations & Automation
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Thought leadership, process blueprints, and architectural breakdowns for founders and HR leaders scaling growing businesses.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
            {INSIGHT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-navy-deep text-white border-gold shadow-md'
                      : 'bg-white text-muted border-border-subtle hover:border-gold/50 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Article Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <BorderGlow
                key={article.id}
                backgroundColor="#ffffff"
                borderRadius={18}
                glowRadius={30}
                className="h-full shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="p-7 flex flex-col justify-between h-full group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-navy-primary bg-navy-primary/10 px-2.5 py-1 rounded">
                        {article.category}
                      </span>

                      {/* Clear "Coming Soon" Badge */}
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-gold bg-navy-deep px-2.5 py-1 rounded border border-gold/30">
                        <Sparkles className="w-3 h-3" />
                        <span>{article.datePlaceholder}</span>
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-navy-deep group-hover:text-navy-primary transition-colors leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-xs text-muted leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-muted">
                    <div className="flex items-center gap-1.5 font-mono">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      <span>{article.readTime}</span>
                    </div>

                    <span className="text-xs font-bold text-navy-primary group-hover:text-gold flex items-center gap-1 transition-colors">
                      <span>Upcoming Publication</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </BorderGlow>
            ))}
          </div>

          {/* Newsletter / Publication Alert Box wrapped in BorderGlow */}
          <BorderGlow
            backgroundColor="#0A2240"
            borderRadius={20}
            glowRadius={36}
            className="shadow-2xl max-w-3xl mx-auto"
          >
            <div className="p-8 text-white text-center space-y-4">
              <BookOpen className="w-8 h-8 text-gold mx-auto" />
              <h3 className="text-xl font-bold">
                Want our upcoming HR Operations playbooks?
              </h3>
              <p className="text-xs text-gray-300 max-w-md mx-auto">
                Our inaugural insights series launches Q3 2026. Contact us to request early access to our HR process audit templates.
              </p>
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gold hover:bg-gold-light text-navy-deep font-bold text-xs transition-all"
                >
                  <span>Request Early Access</span>
                </Link>
              </div>
            </div>
          </BorderGlow>

        </div>
      </section>
    </main>
  );
}
