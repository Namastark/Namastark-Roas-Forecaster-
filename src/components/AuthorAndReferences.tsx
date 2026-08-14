import React, { useState } from 'react';
import { WHITEPAPER_REFERENCES } from '../data/constants';
import { 
  UserCheck, 
  BookOpen, 
  ExternalLink, 
  Copy, 
  Check, 
  MapPin, 
  Calendar, 
  FileCode2, 
  Filter,
  Award,
  ShieldCheck
} from 'lucide-react';

export const AuthorAndReferences: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [citationFormat, setCitationFormat] = useState<'APA' | 'BibTeX' | 'Harvard' | 'MLA'>('APA');
  const [copiedCitation, setCopiedCitation] = useState(false);

  const categories = ['All', 'Platform Benchmarks', 'Auction Dynamics', 'Macro & Trends', 'AI & Optimization'];

  const filteredReferences = activeCategory === 'All'
    ? WHITEPAPER_REFERENCES
    : WHITEPAPER_REFERENCES.filter((ref) => ref.category === activeCategory);

  const getCitationText = () => {
    switch (citationFormat) {
      case 'APA':
        return `Stark, S. M. (2025). The Namastark Model: A New Standard for Smarter ROAS Forecasting. Marketing Science & Predictive Analytics. Johannesburg, South Africa. ID: 9103115051081.`;
      case 'BibTeX':
        return `@article{stark2025namastark,
  author    = {Saul Miron Stark},
  title     = {The Namastark Model: A New Standard for Smarter ROAS Forecasting},
  journal   = {Paid Media Analytics \& Marketing Science},
  address   = {Johannesburg, South Africa},
  year      = {2025},
  month     = {April},
  note      = {Author ID: 9103115051081}
}`;
      case 'Harvard':
        return `Stark, S.M., 2025. The Namastark Model: A New Standard for Smarter ROAS Forecasting. Johannesburg: Marketing Science. [ID: 9103115051081].`;
      case 'MLA':
        return `Stark, Saul Miron. "The Namastark Model: A New Standard for Smarter ROAS Forecasting." Marketing Science (2025), Johannesburg, South Africa.`;
    }
  };

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(getCitationText());
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <section id="author-credits" className="py-16 bg-slate-50 border-t border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 text-sky-800 text-xs font-mono mb-3 border border-sky-200 font-semibold">
            <UserCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>ACADEMIC ATTRIBUTION & LITERATURE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Author, Intellectual Property & Research Citations
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            The Namastark Model was authored and mathematically formalized by Saul Miron Stark, synthesising 10 years of cross-platform auction performance data.
          </p>
        </div>

        {/* Author Bio & IP Attribution Card */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200 mb-12 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-extrabold text-white text-2xl font-mono shrink-0 shadow-md">
                SMS
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-extrabold text-slate-900">Saul Miron Stark</h3>
                  <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-mono border border-sky-200 font-bold">
                    AUTHOR & CREATOR
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-mono text-slate-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-sky-600" />
                    Johannesburg, South Africa
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-sky-600" />
                    Published: April 12, 2025
                  </span>
                  <span className="flex items-center gap-1 text-slate-800">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    ID Reference: <strong className="font-mono text-slate-900">9103115051081</strong>
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-2 max-w-2xl">
                  Performance marketing scientist, strategist, and creator of the Namastark Model. Focused on quantifying advertising auction uncertainty, eradicating theoretical optimism bias, and introducing mathematically grounded forecasting standards for performance teams and enterprise media buyers globally.
                </p>
              </div>
            </div>

            {/* Academic Citation Box */}
            <div className="w-full md:w-80 p-4 rounded-xl bg-slate-50 border border-slate-200 shrink-0 font-mono text-xs shadow-xs">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                <span className="text-[10px] uppercase text-slate-500 font-bold">Citation Excerpt</span>
                <div className="flex gap-1 text-[10px]">
                  {(['APA', 'BibTeX', 'Harvard', 'MLA'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setCitationFormat(fmt)}
                      className={`px-1.5 py-0.5 rounded transition-colors ${citationFormat === fmt ? 'bg-sky-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-700 line-clamp-3 leading-relaxed mb-3">
                {getCitationText()}
              </p>
              <button
                onClick={handleCopyCitation}
                className="w-full py-1.5 rounded-lg bg-white border border-slate-200 hover:border-sky-400 hover:text-sky-700 text-slate-700 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                <span>{copiedCitation ? 'Citation Copied!' : `Copy ${citationFormat} Citation`}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 15 References & Resources from Whitepaper */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-600" />
              <h3 className="text-base font-bold text-slate-900">
                Literature & References ({WHITEPAPER_REFERENCES.length} Sources)
              </h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 text-xs font-mono">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg border transition-all ${
                    activeCategory === cat
                      ? 'bg-sky-600 border-sky-600 text-white font-bold shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Reference Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReferences.map((ref) => (
              <div
                key={ref.id}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-sm transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      REF #{ref.id.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-semibold">
                      {ref.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 mb-1.5">
                    {ref.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed mb-3">
                    {ref.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>{ref.source} ({ref.year})</span>
                  <span className="text-sky-600 font-medium flex items-center gap-0.5 group-hover:underline">
                    <span>Cited</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
