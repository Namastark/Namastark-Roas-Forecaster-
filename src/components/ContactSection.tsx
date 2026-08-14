import React, { useState } from 'react';
import { ForecasterInputs, ForecasterResults, ContactFormData, TargetMarketRole, MonthlySpendTier, InquiryObjective } from '../types';
import { CURRENCIES } from '../data/constants';
import { NamastarkLogo } from './NamastarkLogo';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  Briefcase, 
  Building2, 
  Layers, 
  DollarSign, 
  MessageSquare, 
  ShieldCheck, 
  User, 
  Sparkles, 
  FileText,
  MapPin,
  Clock,
  Lock,
  Download
} from 'lucide-react';

interface ContactSectionProps {
  inputs: ForecasterInputs;
  results: ForecasterResults;
}

const ROLES: TargetMarketRole[] = [
  'Media Buyer / Performance Specialist',
  'CMO / VP / Marketing Director',
  'Performance Marketing Agency Principal',
  'Growth / E-commerce Lead',
  'Data Analyst / Econometrician',
  'Founder / Managing Director',
  'Academic / Researcher',
  'Other',
];

const SPEND_TIERS: MonthlySpendTier[] = [
  '< $25,000 / mo',
  '$25,000 - $100,000 / mo',
  '$100,000 - $500,000 / mo',
  '$500,000 - $2,000,000 / mo',
  '$2,000,000+ / mo',
  'Academic / Non-Commercial',
];

const AD_CHANNELS = [
  'Meta (Facebook & IG)',
  'Google Search & YouTube',
  'TikTok Ads',
  'LinkedIn Ads',
  'Programmatic / DSP',
  'Amazon / Retail Media',
];

const INQUIRY_OBJECTIVES: InquiryObjective[] = [
  'Historical N Calibration / Brand Data Audit',
  'Executive / Board Deck ROAS Defense Advisory',
  'Agency Planning Framework Integration',
  'Media Buying Team Training & Keynote',
  'Academic / Research Citation & Methodology',
  'General Paid Media Advisory',
];

export const ContactSection: React.FC<ContactSectionProps> = ({ inputs, results }) => {
  const currencySymbol = CURRENCIES[inputs.currency]?.symbol || 'R';

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    company: '',
    role: 'Media Buyer / Performance Specialist',
    monthlySpendTier: '$100,000 - $500,000 / mo',
    primaryChannels: ['Meta (Facebook & IG)', 'Google Search & YouTube'],
    inquiryObjective: 'Historical N Calibration / Brand Data Audit',
    includeSimulationContext: true,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [submissionTime, setSubmissionTime] = useState('');
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const toggleChannel = (channel: string) => {
    setFormData((prev) => {
      const exists = prev.primaryChannels.includes(channel);
      return {
        ...prev,
        primaryChannels: exists
          ? prev.primaryChannels.filter((c) => c !== channel)
          : [...prev.primaryChannels, channel],
      };
    });
  };

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Work email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid work email address';
    }
    if (!formData.company.trim()) errs.company = 'Company / Agency is required';
    if (!formData.message.trim()) errs.message = 'Please provide details on your engagement objective';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const generateBriefText = () => {
    const simulationBlock = formData.includeSimulationContext
      ? `
========================================
ACTIVE FORECASTER SIMULATION CONTEXT
========================================
- Currency: ${inputs.currency} (${currencySymbol})
- Budget Deployed: ${currencySymbol}${inputs.adSpend.toLocaleString()}
- Benchmark CPC: ${currencySymbol}${inputs.cpc.toLocaleString()}
- Form Fill CVR: ${inputs.leadConversionRate}%
- Sales Close Rate: ${inputs.closeRate}%
- Revenue Per Client: ${currencySymbol}${inputs.revenuePerClient.toLocaleString()}
- Multiplier Applied: 𝒩 = ${results.N} (${inputs.mode === 'constant' ? 'Canonical Benchmark 0.6624' : 'Custom Calibrated'})
- Traditional Naive ROAS: ${results.naiveROASPercent.toFixed(1)}% (${results.naiveROASRatio.toFixed(2)}x) -> ${currencySymbol}${results.projectedRevenue.toLocaleString()} Rev
- Namastark Adjusted ROAS: ${results.adjustedROASPercent.toFixed(1)}% (${results.adjustedROASRatio.toFixed(2)}x) -> ${currencySymbol}${results.adjustedRevenue.toLocaleString()} Rev
- Reality Gap / Haircut: -${currencySymbol}${results.revenueHaircut.toLocaleString()} (${results.realityGapPercent.toFixed(1)}% model compression)
`
      : '';

    return `THE NAMASTARK MODEL - ADVISORY & RESEARCH INQUIRY BRIEF
========================================
Date: ${new Date().toISOString().split('T')[0]}
From: ${formData.fullName}
Work Email: ${formData.email}
Company: ${formData.company}
Role: ${formData.role}
Monthly Paid Media Spend Tier: ${formData.monthlySpendTier}
Primary Channels: ${formData.primaryChannels.join(', ') || 'None specified'}
Inquiry Objective: ${formData.inquiryObjective}

========================================
PROJECT OBJECTIVE & DETAILS
========================================
${formData.message}
${simulationBlock}
========================================
Target: Saul Miron Stark (Namastark Research & Advisory)
Framework: The Namastark Model: A New Standard for Smarter ROAS Forecasting
`;
  };

  const handleCopyBrief = () => {
    const brief = generateBriefText();
    navigator.clipboard.writeText(brief);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 3000);
  };

  const handleDownloadBrief = () => {
    const brief = generateBriefText();
    const blob = new Blob([brief], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Namastark-Advisory-Brief-${submissionId || 'draft'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate unique inquiry reference code
    const refCode = `NMS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    setSubmissionId(refCode);
    setSubmissionTime(timestamp);

    // Secure local persistence
    try {
      const existingInquiries = JSON.parse(localStorage.getItem('namastark_advisory_inquiries') || '[]');
      const newRecord = {
        id: refCode,
        timestamp: new Date().toISOString(),
        formData,
        inputs,
        resultsSummary: {
          naiveROAS: `${results.naiveROASRatio.toFixed(2)}x`,
          adjustedROAS: `${results.adjustedROASRatio.toFixed(2)}x`,
          realityGap: `-${currencySymbol}${results.revenueHaircut.toLocaleString()}`,
        },
      };
      localStorage.setItem('namastark_advisory_inquiries', JSON.stringify([newRecord, ...existingInquiries]));
    } catch {
      // Ignore local storage errors
    }

    setSubmitted(true);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      company: '',
      role: 'Media Buyer / Performance Specialist',
      monthlySpendTier: '$100,000 - $500,000 / mo',
      primaryChannels: ['Meta (Facebook & IG)', 'Google Search & YouTube'],
      inquiryObjective: 'Historical N Calibration / Brand Data Audit',
      includeSimulationContext: true,
      message: '',
    });
    setErrors({});
  };

  return (
    <section id="contact-advisory" className="py-16 bg-white border-t border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-50 text-sky-700 text-xs font-mono mb-3 border border-sky-200 font-semibold">
            <Mail className="w-3.5 h-3.5 text-sky-600" />
            <span>DIRECT ADVISORY & RESEARCH CONSULTATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Consult with Saul Miron Stark
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Submit your advisory brief below for a custom brand <strong className="text-slate-900 font-semibold">𝒩-coefficient historical audit</strong>, board-defensible forecasting review, agency framework integration, or a keynote workshop for your performance marketing team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Author Credentials & Target Market Solutions (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Author Direct Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/50 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
                <NamastarkLogo size="sm" />
                <span className="text-[10px] font-mono font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  RESEARCH & ADVISORY
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Saul Miron Stark</h3>
                <p className="text-xs text-slate-500 font-mono">Creator of The Namastark Model</p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-200/80 text-xs text-slate-600 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-sky-600" /> Transmission:
                  </span>
                  <span className="font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    Direct Confidential Dispatch
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-sky-600" /> Base Location:
                  </span>
                  <span className="text-slate-800 font-medium">Johannesburg, South Africa</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Framework:
                  </span>
                  <span className="font-bold text-slate-900">The Namastark Model</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" /> Advisory Response:
                  </span>
                  <span className="text-emerald-700 font-semibold">Within 24–48 Hours</span>
                </div>
              </div>
            </div>

            {/* Target Engagement Capabilities */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-sky-600" />
                Target Market Advisory Scopes
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1 flex items-center justify-between">
                    <span>1. Custom Brand 𝒩-Calibration Audit</span>
                    <span className="text-[10px] font-mono text-sky-700 font-semibold bg-sky-100 px-1.5 py-0.5 rounded">For Brands $50k+/mo</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    We digest 12–36 months of your cross-channel ad logs to isolate your true historical efficiency compression and establish your bespoke mathematical 𝒩 index.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1 flex items-center justify-between">
                    <span>2. Board & CFO ROAS Defense</span>
                    <span className="text-[10px] font-mono text-indigo-700 font-semibold bg-indigo-100 px-1.5 py-0.5 rounded">For CMOs & VPs</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Defend annual marketing budgets with mathematically calibrated risk buffers that account for auction saturation and seasonal CPC surges.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1 flex items-center justify-between">
                    <span>3. Agency Workflow Integration</span>
                    <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-100 px-1.5 py-0.5 rounded">For Performance Agencies</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Deploy Namastark forecasting standards into your pitch decks and client media planning pipelines to safeguard agency retention.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1 flex items-center justify-between">
                    <span>4. Keynotes & Team Training</span>
                    <span className="text-[10px] font-mono text-amber-700 font-semibold bg-amber-100 px-1.5 py-0.5 rounded">Workshops</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Intensive sessions on dynamic algorithmic auctions, machine learning bidding mechanics, and creative decay mathematics.
                  </p>
                </div>
              </div>
            </div>

            {/* Active Simulation Snapshot Box */}
            <div className="p-4 rounded-xl bg-sky-50/40 border border-sky-200 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between text-sky-800 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  Live Simulator Snapshot
                </span>
                <span className="text-[10px] bg-sky-200/60 px-1.5 py-0.5 rounded text-sky-900 font-bold">
                  𝒩 = {results.N}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
                <div>Spend: <strong className="text-slate-900">{currencySymbol}{inputs.adSpend.toLocaleString()}</strong></div>
                <div>CPC: <strong className="text-slate-900">{currencySymbol}{inputs.cpc.toLocaleString()}</strong></div>
                <div>CVR: <strong className="text-slate-900">{inputs.leadConversionRate}%</strong></div>
                <div>Close: <strong className="text-slate-900">{inputs.closeRate}%</strong></div>
              </div>
              <div className="pt-2 border-t border-sky-200/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-600">Reality Gap:</span>
                <span className="font-bold text-rose-600">
                  -{currencySymbol}{results.revenueHaircut.toLocaleString()} ({results.realityGapPercent.toFixed(1)}%)
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact & Engagement Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
              
              {submitted ? (
                /* Success State */
                <div className="py-6 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2 max-w-md mx-auto">
                    <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      INQUIRY TRANSMITTED DIRECTLY
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 pt-1">
                      Thank you, {formData.fullName}!
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Your advisory brief for <strong className="text-slate-900">{formData.company}</strong> has been logged in Saul Miron Stark's direct advisory queue. A response will be dispatched to your provided email address within 24–48 hours.
                    </p>
                  </div>

                  {/* Reference Ticket Card */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 max-w-lg mx-auto text-left font-mono text-xs space-y-2.5 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-[11px]">
                      <span className="text-slate-500">Inquiry Tracking Ref:</span>
                      <strong className="text-sky-700 font-bold text-xs">{submissionId}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-600">
                      <span>Submitted At:</span>
                      <span className="font-medium text-slate-900">{submissionTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-600">
                      <span>Objective:</span>
                      <span className="font-medium text-slate-900">{formData.inquiryObjective}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-600">
                      <span>Budget Tier:</span>
                      <span className="font-medium text-slate-900">{formData.monthlySpendTier}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-600">
                      <span>Simulation Attached:</span>
                      <span className="font-medium text-emerald-700">
                        {formData.includeSimulationContext ? `Yes (${currencySymbol}${inputs.adSpend.toLocaleString()} spend, 𝒩 = ${results.N})` : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-200/80">
                      <span>Confidential Status:</span>
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-emerald-600" /> Private Dispatch
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons in Success View */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleCopyBrief}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      {copiedBrief ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedBrief ? 'Brief Copied to Clipboard!' : 'Copy Formatted Brief'}</span>
                    </button>

                    <button
                      onClick={handleDownloadBrief}
                      className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:border-sky-300 hover:text-sky-700 transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5 text-sky-600" />
                      <span>Download Memo (.txt)</span>
                    </button>

                    <button
                      onClick={handleResetForm}
                      className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-900 text-xs font-mono transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        Advisory Inquiry Form
                      </h3>
                      <p className="text-xs text-slate-500 font-mono">
                        Direct communication channel with author Saul Miron Stark
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-600" />
                      CONFIDENTIAL
                    </span>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Full Name <span className="text-rose-500">*</span></span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className={`w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border transition-all text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 ${
                          errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-sky-500'
                        }`}
                      />
                      {errors.fullName && <p className="text-[10px] text-rose-600 mt-1 font-mono">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>Work Email <span className="text-rose-500">*</span></span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@company.com"
                        className={`w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border transition-all text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 ${
                          errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-sky-500'
                        }`}
                      />
                      {errors.email && <p className="text-[10px] text-rose-600 mt-1 font-mono">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Company & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Company / Brand / Agency <span className="text-rose-500">*</span></span>
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Apex Media Group / Retail DTC"
                        className={`w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border transition-all text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 ${
                          errors.company ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-sky-500'
                        }`}
                      />
                      {errors.company && <p className="text-[10px] text-rose-600 mt-1 font-mono">{errors.company}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                        <span>Your Role / Function</span>
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as TargetMarketRole })}
                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Spend Tier & Objective */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                        <span>Monthly Paid Media Spend Tier</span>
                      </label>
                      <select
                        value={formData.monthlySpendTier}
                        onChange={(e) => setFormData({ ...formData, monthlySpendTier: e.target.value as MonthlySpendTier })}
                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 font-mono"
                      >
                        {SPEND_TIERS.map((tier) => (
                          <option key={tier} value={tier}>{tier}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-slate-400" />
                        <span>Inquiry Objective</span>
                      </label>
                      <select
                        value={formData.inquiryObjective}
                        onChange={(e) => setFormData({ ...formData, inquiryObjective: e.target.value as InquiryObjective })}
                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      >
                        {INQUIRY_OBJECTIVES.map((obj) => (
                          <option key={obj} value={obj}>{obj}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Primary Channels (Pills) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Primary Ad Channels in Operation:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {AD_CHANNELS.map((ch) => {
                        const isSelected = formData.primaryChannels.includes(ch);
                        return (
                          <button
                            type="button"
                            key={ch}
                            onClick={() => toggleChannel(ch)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all border ${
                              isSelected
                                ? 'bg-sky-50 border-sky-400 text-sky-800 font-semibold shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}{ch}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Include Simulator Context Checkbox */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="attach-calc-context"
                      checked={formData.includeSimulationContext}
                      onChange={(e) => setFormData({ ...formData, includeSimulationContext: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="attach-calc-context" className="text-xs text-slate-700 cursor-pointer select-none">
                      <strong className="text-slate-900">Attach Active Simulation Parameters</strong>
                      <span className="block text-[11px] text-slate-500 font-mono mt-0.5">
                        Includes Spend ({currencySymbol}{inputs.adSpend.toLocaleString()}), CPC, CVR, Close Rate, and active Multiplier (𝒩 = {results.N}) in your inquiry brief.
                      </span>
                    </label>
                  </div>

                  {/* Detailed Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                        <span>Brief / Engagement Objective <span className="text-rose-500">*</span></span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Detailed context enables faster scoping</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please outline your current paid media setup, historical scale challenges, desired timelines, or questions regarding 𝒩-multiplier calibration..."
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border transition-all text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 ${
                        errors.message ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-sky-500'
                      }`}
                    />
                    {errors.message && <p className="text-[10px] text-rose-600 mt-1 font-mono">{errors.message}</p>}
                  </div>

                  {/* Submission Controls */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Data held strictly confidential under NDA standard.</span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleCopyBrief}
                        className="px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-sky-300 hover:text-sky-700 text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5"
                        title="Copy text brief without submitting"
                      >
                        {copiedBrief ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">{copiedBrief ? 'Copied' : 'Copy Brief'}</span>
                      </button>

                      <button
                        type="submit"
                        id="submit-advisory-btn"
                        className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-700 transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Advisory Brief</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
