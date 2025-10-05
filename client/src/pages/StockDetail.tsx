import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Stock } from "@shared/schema";
import { ArrowLeft } from "lucide-react";
import { formatCurrency, formatPercent, getStockMetrics, calculateRiskLevel } from "@/lib/stockData";
import StockChart from "@/components/StockChart";
import CAPMCalculator from "@/components/CAPMCalculator";

export default function StockDetail() {
  const { symbol } = useParams();

  const { data: stock, isLoading } = useQuery<Stock>({
    queryKey: ['/api/stocks', symbol],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Stock Not Found</h2>
          <Link href="/screener" className="text-primary hover:underline">Back to Screener</Link>
        </div>
      </div>
    );
  }

  const metrics = getStockMetrics(stock);
  const riskLevel = calculateRiskLevel(stock);
  const riskChipClass = {
    low: 'risk-low',
    medium: 'risk-medium',
    high: 'risk-high',
  }[riskLevel];

  return (
    <section className="bg-background py-20" data-testid={`page-stock-detail-${symbol}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/screener" className="text-primary hover:text-primary/80 mb-4 inline-flex items-center" data-testid="button-back-to-screener">
            <ArrowLeft size={20} className="mr-2" /> Back to Screener
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2" data-testid={`text-symbol-${symbol}`}>{stock.symbol}</h1>
              <p className="text-lg text-muted-foreground">{stock.name}</p>
              <div className="flex items-center space-x-4 mt-3">
                <span className={`risk-chip ${riskChipClass}`}>{riskLevel} Risk</span>
                <span className="text-sm text-muted-foreground">PSX | Energy Sector</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-foreground mb-2" data-testid={`text-price-${symbol}`}>
                {formatCurrency(stock.price)}
              </div>
              {stock.change !== null && stock.changePercent !== null && (
                <div className="flex items-center justify-end space-x-2">
                  <span className={`font-semibold text-xl ${stock.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                  </span>
                  <span className={`text-lg ${stock.changePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {formatPercent(stock.changePercent)}
                  </span>
                </div>
              )}
              <div className="text-sm text-muted-foreground mt-1">Last Updated: 2 mins ago</div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-8">
          <StockChart symbol={stock.symbol} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Fundamentals */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Metrics */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Key Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard label="Market Cap" value={stock.marketCap} />
                <MetricCard label="P/E Ratio" value={metrics.peRatio?.toFixed(2) || 'N/A'} />
                <MetricCard label="P/B Ratio" value={metrics.pbRatio?.toFixed(2) || 'N/A'} />
                <MetricCard label="EPS" value={metrics.eps?.toFixed(2) || 'N/A'} />
                <MetricCard label="ROE" value={metrics.roe ? `${metrics.roe.toFixed(2)}%` : 'N/A'} />
                <MetricCard label="ROA" value={metrics.roa ? `${metrics.roa.toFixed(2)}%` : 'N/A'} />
                <MetricCard label="Dividend Yield" value={metrics.dividendYield ? `${metrics.dividendYield.toFixed(2)}%` : 'N/A'} />
                <MetricCard label="Beta" value={metrics.beta.toFixed(2)} />
              </div>
            </div>

            {/* Financial Ratios */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Financial Ratios</h3>
              <div className="space-y-4">
                <RatioRow label="Current Ratio" value={metrics.currentRatio?.toFixed(2) || 'N/A'} />
                <RatioRow label="Quick Ratio" value={metrics.quickRatio?.toFixed(2) || 'N/A'} />
                <RatioRow label="Debt/Equity Ratio" value={metrics.debtEquity?.toFixed(2) || 'N/A'} />
                <RatioRow label="Asset Turnover" value={metrics.assetTurnover?.toFixed(2) || 'N/A'} />
                <RatioRow label="Inventory Turnover" value={metrics.inventoryTurnover?.toFixed(2) || 'N/A'} />
                <RatioRow label="EV/EBITDA" value={metrics.evEbitda?.toFixed(2) || 'N/A'} />
              </div>
            </div>
          </div>

          {/* Right Column - CAPM */}
          <div className="space-y-6">
            <CAPMCalculator beta={metrics.beta} />

            {/* Trading Info */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Trading Information</h3>
              <div className="space-y-3">
                <InfoRow label="Volume" value={stock.volume ? `${(stock.volume / 1000000).toFixed(2)}M` : 'N/A'} />
                <InfoRow label="Avg Volume (30D)" value="3.12M" />
                <InfoRow label="52W High" value={stock.week52High ? formatCurrency(stock.week52High) : 'N/A'} />
                <InfoRow label="52W Low" value={stock.week52Low ? formatCurrency(stock.week52Low) : 'N/A'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-background rounded-lg p-4 border border-border">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="text-lg font-bold text-foreground">{value}</div>
    </div>
  );
}

function RatioRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between pb-3 border-b border-border last:border-0">
      <span className="text-sm text-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}
