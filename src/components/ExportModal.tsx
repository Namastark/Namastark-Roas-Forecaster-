import React, { useState } from 'react';
import { ForecasterInputs, ForecasterResults } from '../types';
import { CURRENCIES, NAMASTARK_CONSTANT } from '../data/constants';
import { formatCurrency, formatNumber } from '../utils/mathEngine';
import { MathEquation } from './MathEquation';
import { NamastarkLogo } from './NamastarkLogo';
import { 
  X, 
  Copy, 
  Check, 
  Printer, 
  FileText, 
  Download, 
  ShieldCheck, 
  AlertTriangle,
  TrendingDown
} from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputs: ForecasterInputs;
  results: ForecasterResults;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  inputs,
  results,
}) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const currencySymbol = CURRENCIES[inputs.currency].symbol;

  const handlePrint = () => {
    window.print();
  };

  const getMarkdownReport = () => {
    return `# THE NAMASTARK ROAS FORECAST EXECUTIVE MEMO
**Author Framework:** Saul Miron Stark (Johannesburg, South Africa)
**Date:** ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
**Currency:** ${inputs.currency} (${currencySymbol})

---

## 1. CAMPAIGN INPUT ASSUMPTIONS
- **Budget / Spend (S):** ${formatCurrency(inputs.adSpend, currencySymbol)}
- **Cost Per Click (CPC):** ${formatCurrency(inputs.cpc, currencySymbol, 2)}
- **Form / Lead Conversion Rate (L%):** ${inputs.leadConversionRate}%
- **Lead-to-Client Close Rate (K%):** ${inputs.closeRate}%
- **Revenue Per Closed Client (R_client):** ${formatCurrency(inputs.revenuePerClient, currencySymbol)}

---

## 2. COMPARATIVE FORECAST AUDIT

### [A] Traditional Naive Forecast (Unadjusted)
- **Estimated Clicks:** ${results.clicks}
- **Estimated Form Leads:** ~${formatNumber(results.formFills, 2)}
- **Estimated Clients:** ~${formatNumber(results.expectedClients, 2)}
- **Projected Revenue:** ${formatCurrency(results.projectedRevenue, currencySymbol)}
- **Naive ROAS:** ${formatNumber(results.naiveROASPercent, 1)}% (${formatNumber(results.naiveROASRatio, 2)}x)
- **Naive Net Profit:** ${formatCurrency(results.netProfitNaive, currencySymbol)}
*Assumption Flaw: Presumes perfectly static CPM/CPC rates and 0% creative fatigue.*

### [B] The Namastark Reality-Grounded Model
- **Multiplier Applied:** ${inputs.mode === 'constant' ? `Namastark Benchmark Constant (𝒩₀ = ${NAMASTARK_CONSTANT})` : `Custom Coefficient (𝒩 = ${inputs.customCoefficient})`}
- **Adjusted Grounded Revenue:** ${formatCurrency(results.adjustedRevenue, currencySymbol)}
- **Namastark Adjusted ROAS:** ${formatNumber(results.adjustedROASPercent, 1)}% (${formatNumber(results.adjustedROASRatio, 2)}x)
- **Grounded Clients:** ~${formatNumber(results.adjustedClients, 2)}
- **Grounded Net Profit:** ${formatCurrency(results.netProfitAdjusted, currencySymbol)}

---

## 3. REALITY GAP & HAIRCUT ANALYSIS
- **Optimism Deficit / Haircut:** ${formatNumber(results.realityGapPercent, 1)}%
- **Fantasy Revenue Gap (Unrealized):** -${formatCurrency(results.revenueHaircut, currencySymbol)}
- **ROAS Spread:** -${formatNumber(results.roasDelta, 1)} percentage points

*Note: Calibrated across 10 years of cross-platform auction data from Meta, Google, LinkedIn, and TikTok.*
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getMarkdownReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 my-8 text-slate-900 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-3.5">
            <NamastarkLogo size="sm" />
            <div className="h-6 w-px bg-slate-200"></div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">Executive Forecast Memo</h3>
              <p className="text-[11px] text-slate-500 font-mono">The Namastark Model Audit Report</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable / Viewable Report Body */}
        <div className="space-y-6 text-xs font-mono">
          
          {/* Metadata bar */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap justify-between gap-2 text-[11px] text-slate-600">
            <span>Framework: <strong>The Namastark Model</strong></span>
            <span>Author: <strong>Saul Miron Stark</strong></span>
            <span>Date: <strong>{new Date().toLocaleDateString()}</strong></span>
            <span>Multiplier: <strong className="text-sky-700">𝒩 = {results.N}</strong></span>
          </div>

          {/* Core Table */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 space-y-2">
              <span className="text-[10px] uppercase font-bold text-rose-600">Traditional Naive (Unadjusted)</span>
              <div className="text-xl font-bold text-slate-900">
                {formatNumber(results.naiveROASPercent, 1)}% <span className="text-xs text-slate-500">({formatNumber(results.naiveROASRatio, 2)}x)</span>
              </div>
              <div className="text-[11px] text-slate-600">Projected Rev: <strong className="text-slate-900">{formatCurrency(results.projectedRevenue, currencySymbol)}</strong></div>
              <div className="text-[11px] text-slate-600">Expected Clients: ~{formatNumber(results.expectedClients, 2)}</div>
              <div className="text-[11px] text-slate-600">Naive Profit: {formatCurrency(results.netProfitNaive, currencySymbol)}</div>
            </div>

            <div className="p-4 rounded-xl bg-sky-50/50 border-2 border-sky-300 space-y-2">
              <span className="text-[10px] uppercase font-bold text-sky-700">The Namastark Model (Grounded)</span>
              <div className="text-xl font-bold text-sky-700">
                {formatNumber(results.adjustedROASPercent, 1)}% <span className="text-xs text-slate-500">({formatNumber(results.adjustedROASRatio, 2)}x)</span>
              </div>
              <div className="text-[11px] text-slate-600">Real Grounded Rev: <strong className="text-sky-700">{formatCurrency(results.adjustedRevenue, currencySymbol)}</strong></div>
              <div className="text-[11px] text-slate-600">Grounded Clients: ~{formatNumber(results.adjustedClients, 2)}</div>
              <div className="text-[11px] text-slate-600">Grounded Profit: {formatCurrency(results.netProfitAdjusted, currencySymbol)}</div>
            </div>
          </div>

          {/* Haircut summary */}
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-rose-700">Executive Reality Gap / Haircut:</span>
              <p className="text-[11px] text-slate-600">The unadjusted model overstates projected gross revenue by:</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-rose-600">
                -{formatCurrency(results.revenueHaircut, currencySymbol)}
              </div>
              <div className="text-[10px] text-slate-500">({formatNumber(results.realityGapPercent, 1)}% model compression)</div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-sky-300 text-xs font-semibold text-slate-700 hover:text-sky-700 transition-all flex items-center gap-1.5 shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Markdown Copied!' : 'Copy Markdown'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs hover:bg-sky-500"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Executive Memo</span>
          </button>
        </div>

      </div>
    </div>
  );
};
