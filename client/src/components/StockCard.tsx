import { Stock } from "@shared/schema";
import { formatCurrency, formatPercent, getStockMetrics, calculateRiskLevel } from "@/lib/stockData";
import { calculateCAPM, DEFAULT_RISK_FREE_RATE, DEFAULT_MARKET_RETURN, formatCAPMResult } from "@/lib/capm";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface StockCardProps {
  stock: Stock;
}

export default function StockCard({ stock }: StockCardProps) {
  const metrics = getStockMetrics(stock);
  const riskLevel = calculateRiskLevel(stock);
  const expectedReturn = calculateCAPM({
    riskFreeRate: DEFAULT_RISK_FREE_RATE,
    marketReturn: DEFAULT_MARKET_RETURN,
    beta: metrics.beta,
  });

  const riskChipClass = {
    low: 'risk-low',
    medium: 'risk-medium',
    high: 'risk-high',
  }[riskLevel];

  return (
    <motion.div
      className="stock-card bg-card rounded-xl p-6 border border-border cursor-pointer"
      whileHover={{ y: -4 }}
      data-testid={`card-stock-${stock.symbol}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-xl font-bold text-foreground" data-testid={`text-stock-symbol-${stock.symbol}`}>
            {stock.symbol}
          </h4>
          <p className="text-sm text-muted-foreground line-clamp-1">{stock.name}</p>
        </div>
        <span className={`risk-chip ${riskChipClass}`} data-testid={`chip-risk-${stock.symbol}`}>
          {riskLevel} Risk
        </span>
      </div>

      <div className="flex items-baseline space-x-2 mb-4">
        <span className="text-3xl font-bold text-foreground" data-testid={`text-price-${stock.symbol}`}>
          {formatCurrency(stock.price)}
        </span>
        {stock.changePercent !== null && (
          <span className={`font-semibold ${stock.changePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
            {formatPercent(stock.changePercent)}
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-border">
        <div>
          <div className="text-xs text-muted-foreground">P/E Ratio</div>
          <div className="text-sm font-semibold text-foreground">
            {metrics.peRatio?.toFixed(2) || 'N/A'}
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">ROE</div>
          <div className="text-sm font-semibold text-foreground">
            {metrics.roe ? `${metrics.roe.toFixed(2)}%` : 'N/A'}
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Div Yield</div>
          <div className="text-sm font-semibold text-foreground">
            {metrics.dividendYield ? `${metrics.dividendYield.toFixed(2)}%` : 'N/A'}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground mb-1">CAPM Expected Return</div>
          <div className="text-lg font-bold text-primary" data-testid={`text-capm-${stock.symbol}`}>
            {formatCAPMResult(expectedReturn)}
          </div>
        </div>
        <Link href={`/stock/${stock.symbol}`} className="text-primary hover:text-primary/80 transition-colors flex items-center" data-testid={`button-view-details-${stock.symbol}`}>
          View Details <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </motion.div>
  );
}
