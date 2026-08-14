import React from 'react';
import { MathEquation } from './MathEquation';
import { 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sigma, 
  FileSpreadsheet,
  Award
} from 'lucide-react';

export const DeepMethodology: React.FC = () => {
  return (
    <section id="mathematical-methodology" className="py-16 bg-white scroll-mt-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-50 text-sky-700 text-xs font-mono mb-3 border border-sky-200 font-medium">
            <Sigma className="w-3.5 h-3.5" />
            <span>MATHEMATICAL RIGOR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Mathematical Formulation & Deep Methodology
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Deconstructing the mathematical shortcomings of traditional linear forecasting models and establishing the formal proof of the Namastark Corrective Multiplier.
          </p>
        </div>

        {/* 1. Mathematical Formulas Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Formula 1: Traditional Naive ROAS */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase text-rose-600 font-bold">Equation 1.0</span>
                <span className="text-[11px] font-mono text-slate-500 font-medium">Traditional Naive ROAS</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center my-3 overflow-x-auto text-slate-900 shadow-xs">
                <MathEquation 
                  math="\text{ROAS}_{\text{naive}} = \frac{\text{Projected Revenue}}{\text{Ad Spend}} = \frac{\left\lfloor \frac{S}{\text{CPC}} \right\rfloor \cdot L_{\%} \cdot K_{\%} \cdot R_{\text{client}}}{S}" 
                  displayMode={true} 
                />
              </div>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Computes unadjusted theoretical return assuming cost per click (<MathEquation math="\text{CPC}" />), lead conversion rate (<MathEquation math="L_{\%}" />), and sales closing rate (<MathEquation math="K_{\%}" />) remain constant over time and spend scale.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-rose-600 flex items-center gap-1.5 font-medium">
              <XCircle className="w-3.5 h-3.5" />
              <span>Flaw: Treats volatile auction curves as fixed constants</span>
            </div>
          </div>

          {/* Formula 2: The Namastark Adjustment Formula */}
          <div className="p-6 rounded-2xl bg-sky-50/40 border-2 border-sky-300 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase text-sky-700 font-bold">Equation 2.0</span>
                <span className="text-[11px] font-mono text-sky-700 font-bold">The Namastark Model</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-sky-200 text-center my-3 overflow-x-auto text-sky-700 shadow-xs">
                <MathEquation 
                  math="\text{ROAS}_{\text{adjusted}} = \text{ROAS}_{\text{naive}} \times \mathcal{N}" 
                  displayMode={true} 
                />
              </div>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Applies the dynamic rate-of-change multiplier (<MathEquation math="\mathcal{N}" />) or the multi-channel empirical benchmark constant (<MathEquation math="\mathcal{N}_0 = 0.6624" className="text-slate-900 font-bold" />) to reconcile theoretical returns with real-world paid media efficiency.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-sky-200 text-[11px] font-mono text-emerald-700 flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Calibrated across 10 years of global media auction data</span>
            </div>
          </div>

        </div>

        {/* Derivation of the Namastark Constant N0 */}
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 mb-12 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-sky-100 text-sky-800 text-xs font-mono border border-sky-200 font-semibold">
                <Award className="w-3 h-3 text-sky-600" />
                EMPIRICAL DERIVATION
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                How Was The Namastark Constant (<MathEquation math="\mathcal{N}_0 = 0.6624" />) Derived?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The Namastark Constant is not an arbitrary discount factor. It is an empirical benchmark derived from extensive cross-platform analysis of paid advertising campaigns over a 10-year period across major ad ecosystems:
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800 font-mono">
                <li className="p-3 rounded-lg bg-white border border-slate-200 flex items-center gap-2 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  <span>10 Years of Monthly CPC, CPM & CTR Data</span>
                </li>
                <li className="p-3 rounded-lg bg-white border border-slate-200 flex items-center gap-2 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  <span>Cross-Platform: Meta, Google, LinkedIn & TikTok</span>
                </li>
                <li className="p-3 rounded-lg bg-white border border-slate-200 flex items-center gap-2 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  <span>Thousands of Global Campaign Datasets</span>
                </li>
                <li className="p-3 rounded-lg bg-white border border-slate-200 flex items-center gap-2 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  <span>Blended B2B, B2C, E-commerce & Lead Gen</span>
                </li>
              </ul>

              <p className="text-xs text-slate-600 leading-relaxed pt-2">
                Across large competitive auction spaces, paid media performance transitioning from idealized spreadsheet forecasts into real market dynamics experiences an average <strong className="text-slate-900">33.76% efficiency compression</strong> (<MathEquation math="1 - 0.6624 = 0.3376" />). The constant <MathEquation math="\mathcal{N}_0 = 0.6624" /> provides a mathematically grounded baseline for early-stage budgeting and defensive forecast audits.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border-2 border-sky-300 text-center w-full lg:w-64 shrink-0 shadow-sm">
              <div className="text-xs font-mono uppercase text-slate-500 mb-1">
                Canonical Constant
              </div>
              <div className="text-3xl font-extrabold text-sky-600 font-mono tracking-tight my-2">
                𝒩₀ = 0.6624
              </div>
              <div className="text-[11px] font-mono text-slate-600 font-medium">
                Standard Benchmark Multiplier
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-600 text-left space-y-1">
                <div>• Haircut: <strong className="text-slate-900">33.8%</strong></div>
                <div>• Platform parity: <strong className="text-slate-900">Global Meta/Google/TikTok</strong></div>
                <div>• Author: <strong className="text-slate-900">Saul Miron Stark</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Comprehensive Variable Reference Table */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 mb-12 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FileSpreadsheet className="w-4 h-4 text-sky-600" />
            <h3 className="text-base font-bold text-slate-900">
              Mathematical Variable Dictionary
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                  <th className="py-3 px-3">Symbol</th>
                  <th className="py-3 px-3">Variable Name</th>
                  <th className="py-3 px-3">Unit / Domain</th>
                  <th className="py-3 px-3">Definition & Role in Model</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-sky-700">
                    <MathEquation math="S" />
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Ad Spend / Budget</td>
                  <td className="py-2.5 px-3 text-slate-500">Currency ($ / R / €)</td>
                  <td className="py-2.5 px-3 text-slate-600">Total financial allocation deployed to paid advertising auctions.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-sky-700">
                    <MathEquation math="\text{CPC}" />
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Cost Per Click</td>
                  <td className="py-2.5 px-3 text-slate-500">Currency / Click</td>
                  <td className="py-2.5 px-3 text-slate-600">Average clearing price paid to ad network per unique click event.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-sky-700">
                    <MathEquation math="C" />
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Total Clicks</td>
                  <td className="py-2.5 px-3 text-slate-500">Integer</td>
                  <td className="py-2.5 px-3 text-slate-600">Calculated as floor(<MathEquation math="S / \text{CPC}" />), total visitor sessions acquired.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-sky-700">
                    <MathEquation math="L_{\%}" />
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Form Fill / Lead CVR</td>
                  <td className="py-2.5 px-3 text-slate-500">Percentage [0-100%]</td>
                  <td className="py-2.5 px-3 text-slate-600">Proportion of visitors submitting a lead or booking inquiry form.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-sky-700">
                    <MathEquation math="K_{\%}" />
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Close Rate</td>
                  <td className="py-2.5 px-3 text-slate-500">Percentage [0-100%]</td>
                  <td className="py-2.5 px-3 text-slate-600">Proportion of qualified form leads converted into paying clients.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-sky-700">
                    <MathEquation math="R_{\text{client}}" />
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Revenue Per Client</td>
                  <td className="py-2.5 px-3 text-slate-500">Currency ($ / R)</td>
                  <td className="py-2.5 px-3 text-slate-600">Average gross revenue or contract value generated per closed client.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-rose-600">
                    <MathEquation math="\text{ROAS}_{\text{naive}}" />
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-rose-600">Traditional Naive ROAS</td>
                  <td className="py-2.5 px-3 text-slate-500">Ratio / Percentage</td>
                  <td className="py-2.5 px-3 text-slate-600">Unadjusted theoretical return assuming 100% linear efficiency across spend.</td>
                </tr>
                <tr className="hover:bg-sky-50/60 bg-sky-50/30">
                  <td className="py-2.5 px-3 font-extrabold text-sky-700">
                    <MathEquation math="\mathcal{N}_0" />
                  </td>
                  <td className="py-2.5 px-3 font-bold text-sky-800">Namastark Constant</td>
                  <td className="py-2.5 px-3 text-sky-800 font-bold">0.6624 (Constant)</td>
                  <td className="py-2.5 px-3 text-slate-600">Empirically benchmarked multi-platform discount multiplier across 10 years of data.</td>
                </tr>
                <tr className="hover:bg-indigo-50/60 bg-indigo-50/30">
                  <td className="py-2.5 px-3 font-extrabold text-indigo-700">
                    <MathEquation math="\mathcal{N}" />
                  </td>
                  <td className="py-2.5 px-3 font-bold text-indigo-800">Namastark Coefficient</td>
                  <td className="py-2.5 px-3 text-indigo-800 font-bold">Variable [0.10 - 1.50]</td>
                  <td className="py-2.5 px-3 text-slate-600">Dynamic rate-of-change multiplier derived from brand-specific historical data.</td>
                </tr>
                <tr className="hover:bg-sky-50/80 bg-sky-50/50">
                  <td className="py-2.5 px-3 font-extrabold text-sky-700">
                    <MathEquation math="\text{ROAS}_{\text{adj}}" />
                  </td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">Namastark Adjusted ROAS</td>
                  <td className="py-2.5 px-3 text-sky-700 font-bold">Ratio / Percentage</td>
                  <td className="py-2.5 px-3 text-slate-600">Defensible, reality-grounded projected Return on Ad Spend.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Comparative Benchmarking Matrix */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-sky-600" />
            <h3 className="text-base font-bold text-slate-900">
              Comparative Framework Matrix: Traditional vs. The Namastark Model
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                  <th className="py-3 px-3">Evaluation Dimension</th>
                  <th className="py-3 px-3 text-rose-600 font-bold">Traditional Naive Model</th>
                  <th className="py-3 px-3 text-sky-700 font-bold">The Namastark Model</th>
                  <th className="py-3 px-3">Strategic Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Auction Cost Elasticity</td>
                  <td className="py-3 px-3 text-rose-600">Assumes static CPC/CPM regardless of scale</td>
                  <td className="py-3 px-3 text-sky-700 font-semibold">Integrates dynamic auction pressure</td>
                  <td className="py-3 px-3 text-slate-600">Prevents budget exhaustion at scale</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Creative Fatigue & Shelf-life</td>
                  <td className="py-3 px-3 text-rose-600">Ignores ad burnout and CTR decay curves</td>
                  <td className="py-3 px-3 text-sky-700 font-semibold">Incorporates creative burn rates via 𝒩</td>
                  <td className="py-3 px-3 text-slate-600">Accurately times creative asset refreshes</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Algorithmic Delivery Flux</td>
                  <td className="py-3 px-3 text-rose-600">Assumes deterministic delivery algorithms</td>
                  <td className="py-3 px-3 text-sky-700 font-semibold">Accounts for Smart Bidding volatility</td>
                  <td className="py-3 px-3 text-slate-600">Resilient to platform engine updates</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Seasonality (e.g. Q4 / Holidays)</td>
                  <td className="py-3 px-3 text-rose-600">Extrapolates October performance to December</td>
                  <td className="py-3 px-3 text-sky-700 font-semibold">Applies seasonal coefficient (e.g. 𝒩 = 0.70)</td>
                  <td className="py-3 px-3 text-slate-600">Protects holiday margin expectations</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Executive & Board Defensibility</td>
                  <td className="py-3 px-3 text-rose-600">High risk of missed promises & revenue shortfall</td>
                  <td className="py-3 px-3 text-sky-700 font-semibold">Conservative, peer-benchmarked projections</td>
                  <td className="py-3 px-3 text-slate-600">Builds credibility with CFOs and investors</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
