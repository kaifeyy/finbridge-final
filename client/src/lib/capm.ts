export interface CAPMParams {
  riskFreeRate: number;
  marketReturn: number;
  beta: number;
}

export function calculateCAPM(params: CAPMParams): number {
  const { riskFreeRate, marketReturn, beta } = params;
  return riskFreeRate + beta * (marketReturn - riskFreeRate);
}

export function formatCAPMResult(expectedReturn: number): string {
  return `${expectedReturn.toFixed(1)}%`;
}

// Default CAPM parameters for Pakistan market
export const DEFAULT_RISK_FREE_RATE = 12.5; // 6M T-Bill Rate
export const DEFAULT_MARKET_RETURN = 15.2; // KSE-100 Expected Return
