import React from 'react';
import { MathEquation } from './MathEquation';
import { 
  FileText, 
  TrendingDown, 
  Cpu, 
  Clock, 
  Globe2, 
  Sparkles,
  ArrowRight,
  Target,
  Briefcase,
  BarChart2,
  CheckCircle
} from 'lucide-react';

export const ExecutiveSummary: React.FC = () => {
  return (
    <section id="executive-summary" className="py-16 bg-white border-t border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-mono mb-3 border border-indigo-200 font-medium">
            <FileText className="w-3.5 h-3.5" />
            <span>EXECUTIVE BRIEF & DEFINITION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Executive Summary & The Problem with Naive ROAS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            In dynamic auction-based media ecosystems, Return on Ad Spend (ROAS) cannot be treated as a static linear equation.
            The Namastark Model replaces optimistic guesswork with data-calibrated realism.
          </p>
        </div>

        {/* TL;DR Highlight Card */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-white via-sky-50/40 to-slate-50 border-2 border-sky-300 shadow-sm relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100/50 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
            <div className="space-y-3 max-w-3xl">
              <span className="text-xs font-mono text-sky-700 uppercase font-bold tracking-wider">
                CORE THESIS STATEMENT
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                Digital advertising is an auction-driven, algorithm-governed chaos. 
                Static forecasting models that flatten this complexity create massive budget deficits.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Traditional ROAS calculations (<MathEquation math="\text{ROAS} = \frac{\text{Revenue}}{\text{Spend}}" />) implicitly assume that every incremental dollar buys impressions and conversions at the exact same efficiency. In reality, inventory auctions suffer from non-linear cost curves, diminishing creative returns, and algorithmic re-calibration. The Namastark Model bridges theory and practice by incorporating a scientifically grounded corrective coefficient.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs shrink-0 w-full md:w-72 font-mono text-xs space-y-2.5">
              <div className="text-[11px] text-slate-500 uppercase border-b border-slate-100 pb-1.5 font-bold">
                Methodological Shift
              </div>
              <div className="flex items-center justify-between text-rose-600 font-medium">
                <span>Gut Guessing</span>
                <span>→ Evidence Planning</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Rigid Modeling</span>
                <span>→ Adaptive Forecasting</span>
              </div>
              <div className="flex items-center justify-between text-sky-700 font-bold">
                <span>Optimism Bias</span>
                <span>→ Strategic Realism</span>
              </div>
            </div>
          </div>
        </div>

        {/* The 5 Overlooked Realities of Modern Paid Media */}
        <div className="mb-14">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-600" />
            The 5 Critical Overlooked Realities in Traditional Paid Media Forecasting
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Reality 1 */}
            <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-sky-300 hover:bg-white transition-all shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
                <TrendingDown className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">1. Ad Costs Aren't Stable</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                CPCs and CPMs spike dramatically during Q4 holidays, competitive bidding wars, and inventory crunches — outpacing historical averages by 30% to 100%.
              </p>
            </div>

            {/* Reality 2 */}
            <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-indigo-300 hover:bg-white transition-all shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
                <Target className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">2. Audience Intent is Dynamic</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                User intent fluctuates with macro sentiment and seasonal fatigue. The same targeting parameters deliver radically disparate conversion intent across different months.
              </p>
            </div>

            {/* Reality 3 */}
            <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-emerald-300 hover:bg-white transition-all shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">3. Creative Performance Decays</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ad fatigue is inevitable. Even high-performing creatives experience exponential CTR decay past week 3, depressing conversion velocity without aggressive rotation.
              </p>
            </div>

            {/* Reality 4 */}
            <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-amber-300 hover:bg-white transition-all shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">4. Machine Learning Algorithmic Flux</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Meta Advantage+, Google Smart Bidding, and TikTok AI engines silently adjust bidding thresholds and delivery corridors without notifying media buyers.
              </p>
            </div>

            {/* Reality 5 */}
            <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-rose-300 hover:bg-white transition-all shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center mb-3">
                <Globe2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">5. Macroeconomic Externalities</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inflation, exchange rate swings, tariffs, and competitor capital infusions perturb conversion economics overnight, rendering static models obsolete.
              </p>
            </div>

            {/* Value Deliverable */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-white to-sky-50 border border-sky-300 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[10px] font-mono uppercase text-sky-700 font-bold">The Solution</span>
                <h4 className="text-sm font-bold text-slate-900 mt-1 mb-1.5">Quantifying Uncertainty</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The Namastark Model embeds volatility as an explicit mathematical variable rather than an unforeseen planning defect.
                </p>
              </div>
              <div className="mt-3 text-[11px] font-mono text-sky-700 font-bold flex items-center gap-1">
                <span>𝒩₀ = 0.6624 Multiplier</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>

          </div>
        </div>

        {/* Stakeholder Target Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-4">
            Who Was The Namastark Model Built For?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-xs">
              <div className="font-bold text-sky-700 mb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" /> Media Buyers
              </div>
              <p className="text-slate-600">
                Simulate realistic campaign outcomes using data-informed levers rather than gut feel, factoring in cost curve shifts.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-xs">
              <div className="font-bold text-indigo-700 mb-1 flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5" /> CMOs & Directors
              </div>
              <p className="text-slate-600">
                Present defensible, board-ready forecasts that are resilient to executive scrutiny and deliver on promised targets.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-xs">
              <div className="font-bold text-emerald-700 mb-1 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" /> Performance Strategists
              </div>
              <p className="text-slate-600">
                Connect probabilistic creative fatigue models with media spend planning to optimize cash flow and pacing.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-xs">
              <div className="font-bold text-amber-700 mb-1 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> Data Analysts
              </div>
              <p className="text-slate-600">
                Incorporate scientifically valid rate-of-change multipliers without flattening auction complexity into flat averages.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
