import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface StockChartProps {
  symbol: string;
}

export default function StockChart({ symbol }: StockChartProps) {
  // Generate sample price data for demonstration
  const generatePriceData = () => {
    const data = [];
    let price = 200;
    for (let i = 0; i < 30; i++) {
      price = price + (Math.random() - 0.48) * 10;
      data.push({
        date: `Day ${i + 1}`,
        price: parseFloat(price.toFixed(2)),
        sma20: parseFloat((price + 5).toFixed(2)),
        sma50: parseFloat((price + 10).toFixed(2)),
      });
    }
    return data;
  };

  const data = generatePriceData();

  return (
    <div className="bg-card rounded-xl p-6 border border-border" data-testid={`chart-${symbol}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Price Chart</h3>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 gradient-primary text-white rounded-lg text-sm">1M</button>
          <button className="px-3 py-1 bg-muted text-muted-foreground rounded-lg text-sm hover:bg-accent">3M</button>
          <button className="px-3 py-1 bg-muted text-muted-foreground rounded-lg text-sm hover:bg-accent">1Y</button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            name="Price"
          />
          <Line
            type="monotone"
            dataKey="sma20"
            stroke="#fbbf24"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            dot={false}
            name="SMA 20"
          />
          <Line
            type="monotone"
            dataKey="sma50"
            stroke="hsl(var(--destructive))"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            dot={false}
            name="SMA 50"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
