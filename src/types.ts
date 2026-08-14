export type CurrencyCode = 'ZAR' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  defaultSpend: number;
  defaultCpc: number;
  defaultRevenuePerClient: number;
}

export type AdjustmentMode = 'constant' | 'custom';

export interface ForecasterInputs {
  adSpend: number;
  cpc: number;
  leadConversionRate: number; // percentage, e.g. 10 for 10%
  closeRate: number; // percentage, e.g. 15 for 15%
  revenuePerClient: number;
  mode: AdjustmentMode;
  customCoefficient: number;
  currency: CurrencyCode;
}

export interface ForecasterResults {
  // Step 1: Intermediate
  clicks: number;
  formFills: number;
  expectedClients: number;
  projectedRevenue: number;

  // Step 2: Traditional Naive
  naiveROASRatio: number;
  naiveROASPercent: number;
  naiveCPA: number;
  naiveCAC: number;

  // Step 3: Coefficient Applied
  N: number;
  isConstant: boolean;

  // Step 4: Namastark Adjusted
  adjustedClients: number;
  adjustedRevenue: number;
  adjustedROASRatio: number;
  adjustedROASPercent: number;
  adjustedCPA: number;
  adjustedCAC: number;

  // Step 5: Delta Analysis / Reality Gap
  realityGapPercent: number; // e.g. 33.8%
  revenueHaircut: number;
  roasDelta: number; // naive - adjusted in % points
  netProfitNaive: number;
  netProfitAdjusted: number;
}

export interface PresetScenario {
  id: string;
  name: string;
  description: string;
  tag: string;
  inputs: {
    adSpend: number;
    cpc: number;
    leadConversionRate: number;
    closeRate: number;
    revenuePerClient: number;
    mode: AdjustmentMode;
    customCoefficient: number;
    currency: CurrencyCode;
  };
}

export interface ReferenceItem {
  id: number;
  title: string;
  source: string;
  year: string;
  description: string;
  category: 'Platform Benchmarks' | 'Auction Dynamics' | 'Macro & Trends' | 'AI & Optimization';
}

export type TargetMarketRole = 
  | 'Media Buyer / Performance Specialist'
  | 'CMO / VP / Marketing Director'
  | 'Performance Marketing Agency Principal'
  | 'Growth / E-commerce Lead'
  | 'Data Analyst / Econometrician'
  | 'Founder / Managing Director'
  | 'Academic / Researcher'
  | 'Other';

export type MonthlySpendTier = 
  | '< $25,000 / mo'
  | '$25,000 - $100,000 / mo'
  | '$100,000 - $500,000 / mo'
  | '$500,000 - $2,000,000 / mo'
  | '$2,000,000+ / mo'
  | 'Academic / Non-Commercial';

export type InquiryObjective = 
  | 'Historical N Calibration / Brand Data Audit'
  | 'Executive / Board Deck ROAS Defense Advisory'
  | 'Agency Planning Framework Integration'
  | 'Media Buying Team Training & Keynote'
  | 'Academic / Research Citation & Methodology'
  | 'General Paid Media Advisory';

export interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  role: TargetMarketRole;
  monthlySpendTier: MonthlySpendTier;
  primaryChannels: string[];
  inquiryObjective: InquiryObjective;
  includeSimulationContext: boolean;
  message: string;
}
