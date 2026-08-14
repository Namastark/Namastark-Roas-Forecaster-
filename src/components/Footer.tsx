import React from 'react';
import { ArrowUp } from 'lucide-react';
import { NamastarkLogo } from './NamastarkLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-xs font-mono text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <NamastarkLogo size="sm" className="shrink-0" />
            <div className="sm:border-l sm:border-slate-200 sm:pl-4">
              <span className="font-bold text-slate-900 text-xs tracking-wider block">
                THE NAMASTARK ROAS FORECASTER
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                A New Standard for Smarter Paid Media Forecasting & Uncertainty Quantification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#forecaster-tool"
              className="hover:text-sky-600 transition-colors"
            >
              Calculator
            </a>
            <a
              href="#executive-summary"
              className="hover:text-sky-600 transition-colors"
            >
              Executive TL;DR
            </a>
            <a
              href="#mathematical-methodology"
              className="hover:text-sky-600 transition-colors"
            >
              Methodology
            </a>
            <a
              href="#author-credits"
              className="hover:text-sky-600 transition-colors"
            >
              Citations
            </a>
            <a
              href="#contact-advisory"
              className="text-sky-700 hover:text-sky-900 font-semibold transition-colors"
            >
              Contact / Advisory
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-slate-900 transition-all ml-2 shadow-xs"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>
            © {new Date().getFullYear()} Saul Miron Stark. All Rights Reserved. (Johannesburg, South Africa).
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Benchmark Constant: 𝒩₀ = 0.6624 (10-Yr Cross-Platform Empirical Index)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
