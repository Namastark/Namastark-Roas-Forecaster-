import React from 'react';
import { MathEquation } from './MathEquation';
import { NamastarkLogo } from './NamastarkLogo';
import { 
  ShieldAlert, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  Activity, 
  ArrowRight,
  Database,
  Award,
  Mail
} from 'lucide-react';

interface HeroSectionProps {
  onScrollToTool: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToTool }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100/50">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-40">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-sky-100 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Banner & Credential Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 mb-8 shadow-sm">
          <div className="flex items-center gap-4">
            <NamastarkLogo size="md" />
            <div className="hidden sm:block h-7 w-px bg-slate-200"></div>
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded bg-sky-50 text-sky-800 font-semibold text-xs font-mono border border-sky-200">
              <Award className="w-3.5 h-3.5 mr-1.5 text-sky-600" />
              PEER-BENCHMARKED FRAMEWORK
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 text-xs font-mono text-slate-600">
            <span>Author: <strong className="text-slate-900 font-semibold">Saul Miron Stark</strong></span>
            <span className="text-slate-300">|</span>
            <span>📍 Johannesburg, South Africa</span>
            <span className="text-slate-300">|</span>
            <span>📅 Published: April 12, 2025</span>
          </div>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-700 mb-4 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Bridging the Paid Media Optimism Gap</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            The Namastark Model: <br />
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              A New Standard for Smarter ROAS Forecasting
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            Forecasting Return on Ad Spend in dynamic auction environments is no longer guesswork.
            Traditional linear formulas assume static CPCs, eternal creative freshness, and constant algorithms —
            consistently producing <span className="text-rose-600 font-semibold">30% to 50% optimism bias</span>.
            The Namastark Model introduces empirically validated corrective multipliers (<MathEquation math="\mathcal{N}" className="text-sky-700 font-semibold" />)
            and a multi-platform benchmark constant (<MathEquation math="\mathcal{N}_0 = 0.6624" className="text-sky-700 font-bold" />) to forecast with strategic realism.
          </p>

          {/* Call to Actions & Highlight Badges */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              id="hero-launch-calc-btn"
              onClick={onScrollToTool}
              className="px-6 py-3.5 rounded-xl bg-sky-600 text-white font-bold text-sm hover:bg-sky-700 transition-all flex items-center gap-2 shadow-md shadow-sky-600/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Launch Interactive Forecaster</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <a
              href="#mathematical-methodology"
              className="px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-semibold text-sm hover:border-sky-500 hover:text-sky-700 transition-all flex items-center gap-2 shadow-sm hover:bg-slate-50"
            >
              <Database className="w-4 h-4 text-sky-600" />
              <span>Mathematical Proof</span>
            </a>
            <a
              href="#contact-advisory"
              className="px-5 py-3.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 font-semibold text-sm hover:bg-sky-100 hover:text-sky-900 transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-sky-600" />
              <span>Consult Author</span>
            </a>
          </div>
        </div>

        {/* 3 Pillar Summary Bento Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-rose-300 transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">The Naive Forecast Trap</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Traditional models compute <MathEquation math="\text{ROAS} = \frac{\text{Revenue}}{\text{Spend}}" /> under 
                the fantasy assumption that CPMs, CPCs, and conversion intent remain permanently flat as budgets scale.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-rose-600">
              <span>Resulting Error:</span>
              <span className="font-bold">+33.8% Unrealized Fantasy</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-white border-2 border-sky-500/80 relative flex flex-col justify-between shadow-md shadow-sky-100">
            <div className="absolute top-3 right-3 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-semibold border border-sky-200">
              CORE BENCHMARK
            </div>
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                The Namastark Constant (<MathEquation math="\mathcal{N}_0" />)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A fixed benchmark multiplier of <strong className="text-slate-900 font-mono">0.6624</strong> derived from 10 years of multi-platform data across Meta, Google, LinkedIn, and TikTok.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-sky-700">
              <span>Universal Multiplier:</span>
              <span className="font-bold">𝒩₀ = 0.6624</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Dynamic Coefficient (<MathEquation math="\mathcal{N}" />)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Allows media buyers to calibrate projections based on historical rate-of-change deltas, Q4 auction surges, creative fatigue, and vertical seasonality.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-indigo-700">
              <span>Adaptive Range:</span>
              <span className="font-bold">0.10 ≤ 𝒩 ≤ 1.50</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
