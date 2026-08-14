import React, { useState } from 'react';
import { ForecasterInputs, ForecasterResults, CurrencyCode } from '../types';
import { CURRENCIES, NAMASTARK_CONSTANT, PRESET_SCENARIOS } from '../data/constants';
import { formatCurrency, formatNumber } from '../utils/mathEngine';
import { MathEquation } from './MathEquation';
import { 
  Calculator, 
  Sliders, 
  HelpCircle, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Check, 
  TrendingDown, 
  ArrowRight,
  RefreshCw,
  Zap,
  Info,
  DollarSign,
  Users,
  Target,
  BarChart3
} from 'lucide-react';

interface CalculatorSectionProps {
  inputs: ForecasterInputs;
  results: ForecasterResults;
  onInputChange: (field: keyof ForecasterInputs, value: any) => void;
  onApplyPreset: (presetId: string) => void;
  onResetToDefaults: () => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  inputs,
  results,
  onInputChange,
  onApplyPreset,
  onResetToDefaults,
}) => {
  const [copied, setCopied] = useState(false);
  const [showFormulaAudit, setShowFormulaAudit] = useState(true);
  const currencySymbol = CURRENCIES[inputs.currency].symbol;

  const handleCopySummary = () => {
    const summaryText = `--- THE NAMASTARK ROAS FORECAST AUDIT ---
Currency: ${inputs.currency} (${currencySymbol})
Ad Spend: ${formatCurrency(inputs.adSpend, currencySymbol)}
CPC: ${formatCurrency(inputs.cpc, currencySymbol, 2)}
Form Conversion Rate: ${inputs.leadConversionRate}%
Close Rate: ${inputs.closeRate}%
Revenue Per Client: ${formatCurrency(inputs.revenuePerClient, currencySymbol)}

--- COMPARATIVE PROJECTIONS ---
[TRADITIONAL NAIVE MODEL (Unadjusted)]:
- Projected Revenue: ${formatCurrency(results.projectedRevenue, currencySymbol)}
- Naive ROAS: ${formatNumber(results.naiveROASPercent, 1)}% (${formatNumber(results.naiveROASRatio, 2)}x)
- Expected Clients: ~${formatNumber(results.expectedClients, 2)}

[THE NAMASTARK MODEL (Reality-Grounded)]:
- Multiplier Mode: ${inputs.mode === 'constant' ? `Namastark Constant (𝒩₀ = ${NAMASTARK_CONSTANT})` : `Custom Coefficient (𝒩 = ${inputs.customCoefficient})`}
- Adjusted Revenue: ${formatCurrency(results.adjustedRevenue, currencySymbol)}
- Adjusted ROAS: ${formatNumber(results.adjustedROASPercent, 1)}% (${formatNumber(results.adjustedROASRatio, 2)}x)
- Grounded Clients: ~${formatNumber(results.adjustedClients, 2)}

[REALITY GAP & HAIRCUT]:
- Haircut Gap: ${formatNumber(results.realityGapPercent, 1)}%
- Fantasy Revenue Deficit: -${formatCurrency(results.revenueHaircut, currencySymbol)}
- Author: Saul Miron Stark (Johannesburg, South Africa)
Generated via The Namastark ROAS Forecaster`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="forecaster-tool" className="py-12 md:py-16 scroll-mt-20 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-50 text-sky-700 text-xs font-mono mb-2 border border-sky-200 font-medium">
              <Calculator className="w-3.5 h-3.5" />
              <span>SIMULATION ENGINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Interactive Forecaster & Audit Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Adjust your campaign inputs below to contrast standard linear forecast assumptions against the empirical Namastark adjustment.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              id="reset-inputs-btn"
              onClick={onResetToDefaults}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm"
              title="Reset to Whitepaper canonical parameters"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Whitepaper Specs</span>
            </button>
            <button
              id="copy-audit-btn"
              onClick={handleCopySummary}
              className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm ${
                copied
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white border-slate-200 text-sky-700 hover:border-sky-400 hover:bg-sky-50'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-sky-600" />}
              <span>{copied ? 'Audit Copied!' : 'Copy Summary'}</span>
            </button>
          </div>
        </div>

        {/* Preset Selector Pills */}
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-white border border-slate-200 mb-8 shadow-sm">
          <span className="text-xs font-mono text-slate-600 flex items-center gap-1 mr-2 font-medium">
            <Zap className="w-3.5 h-3.5 text-sky-600" />
            Presets:
          </span>
          {PRESET_SCENARIOS.map((preset) => (
            <button
              key={preset.id}
              id={`preset-btn-${preset.id}`}
              onClick={() => onApplyPreset(preset.id)}
              className="px-3 py-1 rounded-lg bg-slate-50 hover:bg-sky-50 border border-slate-200 text-xs font-medium text-slate-700 hover:border-sky-300 hover:text-sky-800 transition-all flex items-center gap-1.5"
            >
              <span>{preset.name}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-white text-sky-700 font-mono border border-slate-200">
                {preset.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Main Grid: Inputs (Left) vs Real-Time Results (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Input Form Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-sky-600" />
                  Campaign Parameters
                </h3>
                <span className="text-xs font-mono text-sky-700 px-2 py-0.5 rounded bg-sky-50 border border-sky-200 font-semibold">
                  Step 1: Base Logic
                </span>
              </div>

              <div className="space-y-5">
                {/* 1. Ad Spend */}
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
                    <label htmlFor="input-adSpend" className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-sky-600" />
                      Ad Spend / Budget (<MathEquation math="S" />)
                    </label>
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {formatCurrency(inputs.adSpend, currencySymbol)}
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 font-mono text-xs text-slate-400">{currencySymbol}</span>
                    <input
                      id="input-adSpend"
                      type="number"
                      min="100"
                      step="100"
                      value={inputs.adSpend}
                      onChange={(e) => onInputChange('adSpend', Math.max(0, Number(e.target.value)))}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 focus:border-sky-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-600 rounded-xl text-sm font-mono text-slate-900 transition-all"
                    />
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={inputs.adSpend}
                    onChange={(e) => onInputChange('adSpend', Number(e.target.value))}
                    className="w-full mt-2 accent-sky-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                    <span>{formatCurrency(500, currencySymbol)}</span>
                    <span>{formatCurrency(50000, currencySymbol)}</span>
                    <span>{formatCurrency(100000, currencySymbol)}</span>
                  </div>
                </div>

                {/* 2. Cost Per Click (CPC) */}
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
                    <label htmlFor="input-cpc" className="flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-sky-600" />
                      Cost Per Click (<MathEquation math="\text{CPC}" />)
                    </label>
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {formatCurrency(inputs.cpc, currencySymbol, 2)}
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 font-mono text-xs text-slate-400">{currencySymbol}</span>
                    <input
                      id="input-cpc"
                      type="number"
                      min="0.05"
                      step="0.5"
                      value={inputs.cpc}
                      onChange={(e) => onInputChange('cpc', Math.max(0.01, Number(e.target.value)))}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 focus:border-sky-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-600 rounded-xl text-sm font-mono text-slate-900 transition-all"
                    />
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="200"
                    step="0.5"
                    value={inputs.cpc}
                    onChange={(e) => onInputChange('cpc', Number(e.target.value))}
                    className="w-full mt-2 accent-sky-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>Generated Clicks: <strong className="text-slate-900">{results.clicks}</strong></span>
                    <span>Formula: <MathEquation math="\lfloor S / \text{CPC} \rfloor" /></span>
                  </div>
                </div>

                {/* 3. Form Fill / Lead Conversion Rate (%) */}
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
                    <label htmlFor="input-cvr" className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-sky-600" />
                      Form / Lead CVR (<MathEquation math="L_{\%}" />)
                    </label>
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {inputs.leadConversionRate}%
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      id="input-cvr"
                      type="number"
                      min="0.1"
                      max="100"
                      step="0.5"
                      value={inputs.leadConversionRate}
                      onChange={(e) => onInputChange('leadConversionRate', Math.max(0, Math.min(100, Number(e.target.value))))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:border-sky-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-600 rounded-xl text-sm font-mono text-slate-900 transition-all"
                    />
                    <span className="absolute right-3 font-mono text-xs text-slate-400">%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="40"
                    step="0.5"
                    value={inputs.leadConversionRate}
                    onChange={(e) => onInputChange('leadConversionRate', Number(e.target.value))}
                    className="w-full mt-2 accent-sky-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>Generated Form Fills: <strong className="text-slate-900">~{formatNumber(results.formFills, 2)}</strong></span>
                  </div>
                </div>

                {/* 4. Lead-to-Client Close Rate (%) */}
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
                    <label htmlFor="input-closeRate" className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                      Lead-to-Client Close Rate (<MathEquation math="K_{\%}" />)
                    </label>
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {inputs.closeRate}%
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      id="input-closeRate"
                      type="number"
                      min="0.1"
                      max="100"
                      step="0.5"
                      value={inputs.closeRate}
                      onChange={(e) => onInputChange('closeRate', Math.max(0, Math.min(100, Number(e.target.value))))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:border-sky-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-600 rounded-xl text-sm font-mono text-slate-900 transition-all"
                    />
                    <span className="absolute right-3 font-mono text-xs text-slate-400">%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="60"
                    step="0.5"
                    value={inputs.closeRate}
                    onChange={(e) => onInputChange('closeRate', Number(e.target.value))}
                    className="w-full mt-2 accent-sky-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>Expected Clients (Naive): <strong className="text-slate-900">~{formatNumber(results.expectedClients, 2)}</strong></span>
                  </div>
                </div>

                {/* 5. Revenue Per Closed Client */}
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
                    <label htmlFor="input-revPerClient" className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-sky-600" />
                      Revenue Per Closed Client (<MathEquation math="R_{\text{client}}" />)
                    </label>
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {formatCurrency(inputs.revenuePerClient, currencySymbol)}
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 font-mono text-xs text-slate-400">{currencySymbol}</span>
                    <input
                      id="input-revPerClient"
                      type="number"
                      min="10"
                      step="500"
                      value={inputs.revenuePerClient}
                      onChange={(e) => onInputChange('revenuePerClient', Math.max(0, Number(e.target.value)))}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 focus:border-sky-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-600 rounded-xl text-sm font-mono text-slate-900 transition-all"
                    />
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="200000"
                    step="1000"
                    value={inputs.revenuePerClient}
                    onChange={(e) => onInputChange('revenuePerClient', Number(e.target.value))}
                    className="w-full mt-2 accent-sky-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* ADJUSTMENT MODE SELECTOR */}
            <div className="p-6 rounded-2xl bg-white border-2 border-sky-400 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  Namastark Multiplier Selection
                </h3>
                <span className="text-[10px] font-mono uppercase bg-sky-50 text-sky-700 px-2 py-0.5 rounded border border-sky-200 font-semibold">
                  Step 2: Calibration
                </span>
              </div>

              {/* Mode Toggle Buttons */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200 mb-4">
                <button
                  id="mode-constant-btn"
                  onClick={() => onInputChange('mode', 'constant')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center text-center ${
                    inputs.mode === 'constant'
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    Namastark Constant
                  </span>
                  <span className="font-mono text-[11px] font-extrabold mt-0.5">
                    𝒩₀ = {NAMASTARK_CONSTANT}
                  </span>
                </button>

                <button
                  id="mode-custom-btn"
                  onClick={() => onInputChange('mode', 'custom')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center text-center ${
                    inputs.mode === 'custom'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    Custom Coefficient
                  </span>
                  <span className="font-mono text-[11px] font-extrabold mt-0.5">
                    𝒩 = {inputs.customCoefficient}
                  </span>
                </button>
              </div>

              {/* Mode Explanations & Custom Slider */}
              {inputs.mode === 'constant' ? (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <p className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">The Namastark Benchmark Constant (𝒩₀ = 0.6624)</strong> is empirically calibrated across 10 years of multi-channel auction performance (Meta, Google, TikTok, LinkedIn) to standardize unadjusted forecast projections.
                    </span>
                  </p>
                </div>
              ) : (
                <div className="space-y-3 p-3.5 rounded-xl bg-slate-50 border border-indigo-200">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-900">
                    <span>Adjust Custom Multiplier (𝒩):</span>
                    <span className="font-mono font-bold text-sky-700 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs">
                      {inputs.customCoefficient.toFixed(2)} ({( (1 - inputs.customCoefficient) * 100).toFixed(0)}% decay)
                    </span>
                  </div>

                  <input
                    id="input-customCoefficient"
                    type="range"
                    min="0.10"
                    max="1.50"
                    step="0.01"
                    value={inputs.customCoefficient}
                    onChange={(e) => onInputChange('customCoefficient', Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />

                  {/* Preset Scenarios for Custom Coefficient */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px] font-mono">
                    <button
                      onClick={() => onInputChange('customCoefficient', 0.70)}
                      className="p-1 rounded bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-800 shadow-xs"
                    >
                      𝒩 = 0.70 (Q4 Dec Drop)
                    </button>
                    <button
                      onClick={() => onInputChange('customCoefficient', 0.80)}
                      className="p-1 rounded bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-800 shadow-xs"
                    >
                      𝒩 = 0.80 (Nov Peak)
                    </button>
                    <button
                      onClick={() => onInputChange('customCoefficient', 0.55)}
                      className="p-1 rounded bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-800 shadow-xs"
                    >
                      𝒩 = 0.55 (High Fatigue)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Real-Time Comparative Output Cards & Visual Delta (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Comparative Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Card 1: Traditional Naive ROAS */}
              <div className="p-6 rounded-2xl bg-white border-2 border-rose-200 relative overflow-hidden flex flex-col justify-between shadow-sm">
                <div className="absolute top-0 right-0 px-3 py-1 bg-rose-50 text-rose-700 text-[10px] font-mono uppercase font-bold rounded-bl-xl border-b border-l border-rose-200 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Naive Fantasy Model
                </div>

                <div>
                  <div className="text-xs font-mono uppercase text-slate-500 tracking-wider mb-1">
                    Traditional Unadjusted ROAS
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight flex items-baseline gap-2">
                    {formatNumber(results.naiveROASPercent, 1)}%
                    <span className="text-sm font-semibold text-slate-500">
                      ({formatNumber(results.naiveROASRatio, 2)}x)
                    </span>
                  </div>
                  <div className="text-xs text-rose-600 font-medium mt-1 flex items-center gap-1">
                    <span>⚠️ Unadjusted for auction volatility or fatigue</span>
                  </div>

                  <div className="mt-6 space-y-2.5 pt-4 border-t border-slate-100 text-xs font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span>Projected Revenue:</span>
                      <span className="text-slate-900 font-bold">{formatCurrency(results.projectedRevenue, currencySymbol)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Expected Clients:</span>
                      <span className="text-slate-900 font-bold">~{formatNumber(results.expectedClients, 2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Projected Net Profit:</span>
                      <span className={`font-bold ${results.netProfitNaive >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {formatCurrency(results.netProfitNaive, currencySymbol)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Calculated CPA:</span>
                      <span className="text-slate-900">{formatCurrency(results.naiveCPA, currencySymbol, 2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                  Formula: <MathEquation math="\text{ROAS}_{\text{naive}} = \frac{\text{Projected Rev}}{\text{Spend}}" />
                </div>
              </div>

              {/* Card 2: The Namastark Model */}
              <div className="p-6 rounded-2xl bg-white border-2 border-sky-500 relative overflow-hidden flex flex-col justify-between shadow-md shadow-sky-100">
                <div className="absolute top-0 right-0 px-3 py-1 bg-sky-600 text-white text-[10px] font-mono uppercase font-extrabold rounded-bl-xl shadow-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Namastark Calibrated
                </div>

                <div>
                  <div className="text-xs font-mono uppercase text-sky-700 tracking-wider mb-1 flex items-center gap-1.5 font-bold">
                    <span>Adjusted Real-World ROAS</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-sky-600 font-mono tracking-tight flex items-baseline gap-2">
                    {formatNumber(results.adjustedROASPercent, 1)}%
                    <span className="text-sm font-semibold text-slate-500">
                      ({formatNumber(results.adjustedROASRatio, 2)}x)
                    </span>
                  </div>
                  <div className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
                    <span>🛡️ Applied Multiplier: 𝒩 = {results.N}</span>
                  </div>

                  <div className="mt-6 space-y-2.5 pt-4 border-t border-slate-100 text-xs font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span>Real Grounded Revenue:</span>
                      <span className="text-sky-700 font-extrabold">{formatCurrency(results.adjustedRevenue, currencySymbol)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Grounded Clients:</span>
                      <span className="text-slate-900 font-bold">~{formatNumber(results.adjustedClients, 2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Real Net Profit:</span>
                      <span className={`font-bold ${results.netProfitAdjusted >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {formatCurrency(results.netProfitAdjusted, currencySymbol)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Grounded Real CPA:</span>
                      <span className="text-slate-900">{formatCurrency(results.adjustedCPA, currencySymbol, 2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-2.5 rounded-lg bg-sky-50 border border-sky-200 text-[11px] text-sky-800">
                  Formula: <MathEquation math="\text{ROAS}_{\text{adj}} = \text{ROAS}_{\text{naive}} \times \mathcal{N}" />
                </div>
              </div>
            </div>

            {/* Reality Gap / Haircut Delta Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-rose-50/30 border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      The Reality Gap & Haircut Analysis
                    </h4>
                    <p className="text-xs text-slate-600">
                      Quantifying the variance between boardroom fantasy and empirical paid media reality.
                    </p>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs text-slate-500">Model Haircut:</span>
                  <div className="text-xl font-extrabold text-rose-600">
                    -{formatNumber(results.realityGapPercent, 1)}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[11px] text-slate-500 font-mono">Unrealized Revenue Gap</span>
                  <div className="text-lg font-bold text-rose-600 font-mono mt-0.5">
                    -{formatCurrency(results.revenueHaircut, currencySymbol)}
                  </div>
                  <span className="text-[10px] text-slate-500">Overestimated volume</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[11px] text-slate-500 font-mono">ROAS Percentage Delta</span>
                  <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">
                    -{formatNumber(results.roasDelta, 1)}% pts
                  </div>
                  <span className="text-[10px] text-slate-500">Variance in return</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[11px] text-slate-500 font-mono">Defensible Profit Target</span>
                  <div className={`text-lg font-bold font-mono mt-0.5 ${results.netProfitAdjusted >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {formatCurrency(results.netProfitAdjusted, currencySymbol)}
                  </div>
                  <span className="text-[10px] text-slate-500">Risk-adjusted return</span>
                </div>
              </div>

              {/* Visual Comparison Progress Bar */}
              <div className="mt-5 pt-4 border-t border-slate-200">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-sky-500"></span> Grounded Reality Revenue: {formatCurrency(results.adjustedRevenue, currencySymbol)}
                  </span>
                  <span className="text-rose-600 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span> Naive Fantasy Cap: {formatCurrency(results.projectedRevenue, currencySymbol)}
                  </span>
                </div>
                <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden flex border border-slate-300">
                  <div
                    style={{ width: `${Math.min(100, Math.max(5, results.N * 100))}%` }}
                    className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-300 relative group"
                    title={`Grounded Share: ${(results.N * 100).toFixed(1)}%`}
                  ></div>
                  <div
                    style={{ width: `${Math.max(0, (1 - results.N) * 100)}%` }}
                    className="h-full bg-rose-400 transition-all duration-300"
                    title={`Optimism Gap: ${((1 - results.N) * 100).toFixed(1)}%`}
                  ></div>
                </div>
              </div>
            </div>

            {/* Collapsible Step-by-Step Formula Audit Pipeline */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-sky-600" />
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Full Mathematical Pipeline Audit
                  </h4>
                </div>
                <button
                  onClick={() => setShowFormulaAudit(!showFormulaAudit)}
                  className="text-xs font-mono text-sky-600 hover:text-sky-800 font-semibold hover:underline"
                >
                  {showFormulaAudit ? 'Collapse Audit Table' : 'Expand Audit Table'}
                </button>
              </div>

              {showFormulaAudit && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                        <th className="py-2.5 px-3">Step</th>
                        <th className="py-2.5 px-3">Metric Name</th>
                        <th className="py-2.5 px-3">Mathematical Formula</th>
                        <th className="py-2.5 px-3 text-right">Computed Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 text-slate-400">01</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">Paid Clicks Generated</td>
                        <td className="py-2.5 px-3 text-slate-500">
                          <MathEquation math="\lfloor \text{Spend} / \text{CPC} \rfloor" />
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-sky-700">
                          {results.clicks} clicks
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 text-slate-400">02</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">Form Fills / Inquiries</td>
                        <td className="py-2.5 px-3 text-slate-500">
                          <MathEquation math="\text{Clicks} \times (\text{CVR}_{\%} / 100)" />
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                          ~{formatNumber(results.formFills, 2)} forms
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 text-slate-400">03</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">Closed Clients (Naive)</td>
                        <td className="py-2.5 px-3 text-slate-500">
                          <MathEquation math="\text{Forms} \times (\text{Close}_{\%} / 100)" />
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                          ~{formatNumber(results.expectedClients, 2)} clients
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 text-slate-400">04</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">Naive Projected Revenue</td>
                        <td className="py-2.5 px-3 text-slate-500">
                          <MathEquation math="\text{Clients} \times \text{Rev}_{\text{client}}" />
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-rose-600">
                          {formatCurrency(results.projectedRevenue, currencySymbol)}
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 text-slate-400">05</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">Traditional Naive ROAS</td>
                        <td className="py-2.5 px-3 text-slate-500">
                          <MathEquation math="(\text{Revenue} / \text{Spend}) \times 100" />
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-rose-600">
                          {formatNumber(results.naiveROASPercent, 1)}% ({formatNumber(results.naiveROASRatio, 2)}x)
                        </td>
                      </tr>
                      <tr className="hover:bg-sky-50/80 bg-sky-50/40">
                        <td className="py-2.5 px-3 text-sky-700 font-bold">06</td>
                        <td className="py-2.5 px-3 font-semibold text-sky-800">Namastark Multiplier (𝒩)</td>
                        <td className="py-2.5 px-3 text-slate-600">
                          {inputs.mode === 'constant' ? 'Empirical Benchmark Constant' : 'Custom Calibration'}
                        </td>
                        <td className="py-2.5 px-3 text-right font-extrabold text-sky-700">
                          𝒩 = {results.N}
                        </td>
                      </tr>
                      <tr className="hover:bg-sky-50/80 bg-sky-50/50">
                        <td className="py-2.5 px-3 text-sky-700 font-bold">07</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">Adjusted Grounded Revenue</td>
                        <td className="py-2.5 px-3 text-slate-600">
                          <MathEquation math="\text{Naive Rev} \times \mathcal{N}" />
                        </td>
                        <td className="py-2.5 px-3 text-right font-extrabold text-sky-700">
                          {formatCurrency(results.adjustedRevenue, currencySymbol)}
                        </td>
                      </tr>
                      <tr className="hover:bg-sky-50/80 bg-sky-50/50">
                        <td className="py-2.5 px-3 text-sky-700 font-bold">08</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">Namastark Adjusted ROAS</td>
                        <td className="py-2.5 px-3 text-slate-600">
                          <MathEquation math="\text{ROAS}_{\text{naive}} \times \mathcal{N}" />
                        </td>
                        <td className="py-2.5 px-3 text-right font-extrabold text-sky-700">
                          {formatNumber(results.adjustedROASPercent, 1)}% ({formatNumber(results.adjustedROASRatio, 2)}x)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
