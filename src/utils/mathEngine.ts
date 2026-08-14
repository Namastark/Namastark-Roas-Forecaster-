import { ForecasterInputs, ForecasterResults } from '../types';
import { NAMASTARK_CONSTANT } from '../data/constants';

/**
 * Calculates the full Namastark ROAS pipeline according to Saul Miron Stark's whitepaper formulation.
 */
export function calculateNamastarkROAS(inputs: ForecasterInputs): ForecasterResults {
  const {
    adSpend,
    cpc,
    leadConversionRate,
    closeRate,
    revenuePerClient,
    mode,
    customCoefficient,
  } = inputs;

  const validSpend = Math.max(0, Number(adSpend) || 0);
  const validCpc = Math.max(0.01, Number(cpc) || 0.01);
  const validCVR = Math.max(0, Math.min(100, Number(leadConversionRate) || 0));
  const validCloseRate = Math.max(0, Math.min(100, Number(closeRate) || 0));
  const validRevPerClient = Math.max(0, Number(revenuePerClient) || 0);

  // Step 1: Intermediate Metrics
  // Clicks = floor(Spend / CPC)
  const clicks = Math.floor(validSpend / validCpc);
  // Form Fills = Clicks * (CVR / 100)
  const formFills = clicks * (validCVR / 100);
  // Expected Clients = Form Fills * (CloseRate / 100)
  const expectedClients = formFills * (validCloseRate / 100);
  // Projected Revenue = Expected Clients * Revenue per client
  const projectedRevenue = expectedClients * validRevPerClient;

  // Step 2: Traditional Naive ROAS (Unadjusted)
  const naiveROASRatio = validSpend > 0 ? projectedRevenue / validSpend : 0;
  const naiveROASPercent = naiveROASRatio * 100;
  const naiveCPA = formFills > 0 ? validSpend / formFills : 0;
  const naiveCAC = expectedClients > 0 ? validSpend / expectedClients : 0;

  // Step 3: Namastark Corrective Multiplier Selection
  const isConstant = mode === 'constant';
  const N = isConstant ? NAMASTARK_CONSTANT : Math.max(0.01, Math.min(2.5, Number(customCoefficient) || NAMASTARK_CONSTANT));

  // Step 4: Namastark Adjusted ROAS
  const adjustedROASRatio = naiveROASRatio * N;
  const adjustedROASPercent = adjustedROASRatio * 100;
  const adjustedRevenue = projectedRevenue * N;
  const adjustedClients = expectedClients * N;
  const adjustedCPA = (formFills * N) > 0 ? validSpend / (formFills * N) : 0;
  const adjustedCAC = adjustedClients > 0 ? validSpend / adjustedClients : 0;

  // Step 5: Delta Analysis & Reality Gap
  const realityGapPercent = (1 - N) * 100;
  const revenueHaircut = projectedRevenue - adjustedRevenue;
  const roasDelta = naiveROASPercent - adjustedROASPercent;
  const netProfitNaive = projectedRevenue - validSpend;
  const netProfitAdjusted = adjustedRevenue - validSpend;

  return {
    clicks,
    formFills,
    expectedClients,
    projectedRevenue,
    naiveROASRatio,
    naiveROASPercent,
    naiveCPA,
    naiveCAC,
    N,
    isConstant,
    adjustedClients,
    adjustedRevenue,
    adjustedROASRatio,
    adjustedROASPercent,
    adjustedCPA,
    adjustedCAC,
    realityGapPercent,
    revenueHaircut,
    roasDelta,
    netProfitNaive,
    netProfitAdjusted,
  };
}

export function formatCurrency(value: number, symbol: string = 'R', decimals: number = 0): string {
  const isNegative = value < 0;
  const absVal = Math.abs(value);
  const formatted = absVal.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${isNegative ? '-' : ''}${symbol}${formatted}`;
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
