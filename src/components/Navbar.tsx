import React from 'react';
import { CurrencyCode } from '../types';
import { CURRENCIES, PRESET_SCENARIOS } from '../data/constants';
import { NamastarkLogo } from './NamastarkLogo';
import { 
  Calculator, 
  FileText, 
  BookOpen, 
  UserCheck, 
  Download, 
  Sparkles,
  Share2,
  Mail
} from 'lucide-react';

interface NavbarProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onSelectPreset: (presetId: string) => void;
  onExportReport: () => void;
  activePresetId?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  onSelectPreset,
  onExportReport,
  activePresetId,
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center">
          <a href="#" className="flex items-center group py-1">
            <NamastarkLogo size="sm" className="group-hover:opacity-90 transition-opacity" />
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-medium tracking-wide">
          <a
            href="#forecaster-tool"
            className="text-slate-600 hover:text-sky-600 transition-colors flex items-center gap-1.5"
          >
            <Calculator className="w-3.5 h-3.5 text-sky-600" />
            Calculator
          </a>
          <a
            href="#executive-summary"
            className="text-slate-600 hover:text-sky-600 transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            Executive TL;DR
          </a>
          <a
            href="#mathematical-methodology"
            className="text-slate-600 hover:text-sky-600 transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-600" />
            Methodology & Formulas
          </a>
          <a
            href="#author-credits"
            className="text-slate-600 hover:text-sky-600 transition-colors flex items-center gap-1.5"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            Research
          </a>
          <a
            href="#contact-advisory"
            className="text-slate-600 hover:text-sky-600 transition-colors flex items-center gap-1.5 font-semibold"
          >
            <Mail className="w-3.5 h-3.5 text-sky-600" />
            Contact & Advisory
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Currency Toggle */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5 text-xs font-mono">
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
              <button
                key={code}
                id={`currency-btn-${code}`}
                onClick={() => onCurrencyChange(code)}
                className={`px-2.5 py-1 rounded transition-all ${
                  currentCurrency === code
                    ? 'bg-sky-600 text-white font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
                title={CURRENCIES[code].name}
              >
                {CURRENCIES[code].symbol} <span className="hidden sm:inline text-[10px] opacity-80">{code}</span>
              </button>
            ))}
          </div>

          {/* Quick Presets Dropdown */}
          <div className="relative group hidden sm:block">
            <button
              id="preset-dropdown-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:border-sky-500 hover:text-sky-700 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Presets</span>
            </button>
            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl p-2 hidden group-hover:block transition-all z-50">
              <div className="text-[10px] uppercase font-mono text-slate-400 px-2 py-1 border-b border-slate-100">
                Load Empirical Scenario
              </div>
              {PRESET_SCENARIOS.map((preset) => {
                const isSelected = activePresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => onSelectPreset(preset.id)}
                    className={`w-full text-left p-2 rounded-lg transition-colors flex flex-col ${
                      isSelected
                        ? 'bg-sky-50 border border-sky-200 text-sky-950 font-medium'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-xs font-semibold flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>}
                        {preset.name}
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                        isSelected ? 'bg-sky-200/80 text-sky-800 font-bold' : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {preset.tag}
                      </span>
                    </span>
                    <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {preset.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Export / Print Report */}
          <button
            id="export-report-btn"
            onClick={onExportReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-300 text-sky-700 hover:bg-sky-600 hover:text-white font-semibold text-xs transition-all shadow-sm"
            title="Export full executive audit report"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Audit</span>
          </button>
        </div>
      </div>
    </header>
  );
};
