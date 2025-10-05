import { Stock } from '@shared/schema';

export function parseMarketCap(marketCapStr: string): number {
  if (!marketCapStr) return 0;
  const cleanStr = marketCapStr.replace(/[^0-9.]/g, '');
  const num = parseFloat(cleanStr);
  if (marketCapStr.includes('T')) return num * 1000000;
  if (marketCapStr.includes('B')) return num * 1000;
  return num;
}

export function formatMarketCap(value: number): string {
  if (value >= 1000000) return `PKR ${(value / 1000000).toFixed(2)}T`;
  if (value >= 1000) return `PKR ${(value / 1000).toFixed(2)}B`;
  return `PKR ${value.toFixed(2)}M`;
}

export function formatCurrency(value: number): string {
  return `PKR ${value.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function getRatioValue(stock: Stock, ratioKey: string, period: string = 'Current'): number | null {
  try {
    const ratio = stock.ratios[ratioKey];
    if (!ratio || !ratio[period]) return null;
    const value = ratio[period];
    if (typeof value === 'string') {
      const cleanValue = value.replace(/[^0-9.-]/g, '');
      return parseFloat(cleanValue) || null;
    }
    return value;
  } catch {
    return null;
  }
}

export function calculateRiskLevel(stock: Stock): 'low' | 'medium' | 'high' {
  const debtEquity = getRatioValue(stock, 'Debt / Equity Ratio', 'Current');
  const currentRatio = getRatioValue(stock, 'Current Ratio', 'Current');
  
  // Low risk: Strong liquidity, low debt
  if (debtEquity !== null && debtEquity < 0.5 && currentRatio !== null && currentRatio > 2) {
    return 'low';
  }
  
  // High risk: High debt or poor liquidity
  if ((debtEquity !== null && debtEquity > 1.5) || (currentRatio !== null && currentRatio < 1)) {
    return 'high';
  }
  
  return 'medium';
}

export function getStockMetrics(stock: Stock) {
  return {
    marketCap: parseMarketCap(stock.marketCap),
    peRatio: stock.peRatio,
    pbRatio: getRatioValue(stock, 'PB Ratio', 'Current'),
    eps: getRatioValue(stock, 'EPS', 'Current'),
    roe: getRatioValue(stock, 'Return on Equity (ROE)', 'Current'),
    roa: getRatioValue(stock, 'Return on Assets (ROA)', 'Current'),
    dividendYield: getRatioValue(stock, 'Dividend Yield', 'Current'),
    beta: 1, // Default beta since not available in scraped data
    debtEquity: getRatioValue(stock, 'Debt / Equity Ratio', 'Current'),
    currentRatio: getRatioValue(stock, 'Current Ratio', 'Current'),
    quickRatio: getRatioValue(stock, 'Quick Ratio', 'Current'),
    evEbitda: getRatioValue(stock, 'EV/EBITDA Ratio', 'Current'),
    assetTurnover: getRatioValue(stock, 'Asset Turnover', 'Current'),
    inventoryTurnover: getRatioValue(stock, 'Inventory Turnover', 'Current'),
    fcfYield: getRatioValue(stock, 'FCF Yield', 'Current'),
  };
}
