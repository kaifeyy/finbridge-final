import { useQuery } from "@tanstack/react-query";
import { Stock } from "@shared/schema";
import { formatCurrency, formatPercent } from "@/lib/stockData";
import { TrendingUp, Trophy, Activity } from "lucide-react";

export default function MarketWidgets() {
  const { data: topGainers } = useQuery<Stock[]>({
    queryKey: ['/api/stocks/top/gainers'],
  });

  const { data: mostActive } = useQuery<Stock[]>({
    queryKey: ['/api/stocks/top/active'],
  });

  const topGainer = topGainers?.[0];
  const activeStocks = mostActive?.slice(0, 2);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Market Overview */}
        <div className="bg-card rounded-xl p-6 border border-border hover-lift" data-testid="card-market-overview">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              KSE-100 Index
            </h3>
            <span className="risk-chip risk-low">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              Live
            </span>
          </div>
          <div className="mb-4">
            <div className="text-3xl font-bold text-foreground" data-testid="text-kse-index">118,456.23</div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-success font-semibold">+1,234.56</span>
              <span className="text-success">+1.05%</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Volume: 342.5M</span>
            <span className="text-muted-foreground">Value: PKR 15.2B</span>
          </div>
        </div>

        {/* Top Gainer */}
        <div className="bg-card rounded-xl p-6 border border-border hover-lift" data-testid="card-top-gainer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Top Gainer
            </h3>
            <Trophy className="text-primary" size={20} />
          </div>
          {topGainer ? (
            <>
              <div className="mb-4">
                <div className="text-xl font-bold text-foreground" data-testid="text-top-gainer-symbol">
                  {topGainer.symbol}
                </div>
                <div className="text-sm text-muted-foreground line-clamp-1">{topGainer.name}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-foreground">
                  {formatCurrency(topGainer.price)}
                </div>
                <div className="text-right">
                  <div className="text-success font-semibold">
                    {topGainer.changePercent ? formatPercent(topGainer.changePercent) : 'N/A'}
                  </div>
                  {topGainer.change && (
                    <div className="text-xs text-muted-foreground">
                      {topGainer.change >= 0 ? '+' : ''}{topGainer.change.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-muted-foreground">Loading...</div>
          )}
        </div>

        {/* Most Active */}
        <div className="bg-card rounded-xl p-6 border border-border hover-lift" data-testid="card-most-active">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Most Active
            </h3>
            <Activity className="text-destructive" size={20} />
          </div>
          <div className="space-y-3">
            {activeStocks?.map((stock, index) => (
              <div key={stock.symbol} className="flex items-center justify-between" data-testid={`card-active-stock-${stock.symbol}`}>
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 ${index === 0 ? 'bg-primary/10' : 'bg-muted'} rounded-full flex items-center justify-center`}>
                    <span className={`text-xs font-bold ${index === 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{stock.symbol}</div>
                    <div className="text-xs text-muted-foreground">
                      Vol: {stock.volume ? `${(stock.volume / 1000).toFixed(1)}K` : 'N/A'}
                    </div>
                  </div>
                </div>
                <div className={`text-sm font-semibold ${stock.changePercent && stock.changePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {stock.changePercent ? formatPercent(stock.changePercent) : 'N/A'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
