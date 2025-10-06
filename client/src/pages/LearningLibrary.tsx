import React from "react";
import { MotionContainer, MotionItem } from "@/components/Motion";
import {
  TrendingUp,
  Building2,
  Clock4,
  Ratio,
  LineChart,
  Calculator,
  Scale,
  Banknote,
  PiggyBank,
  ChartBar,
  BarChart3,
  Sigma,
  Factory,
  PieChart,
  BarChartHorizontal,
  BarChart2,
  Layers,
  Activity,
  BarChart4,
  Gauge,
  BadgeDollarSign,
  Landmark,
  MoveUpRight,
  Wallet,
  Percent,
  Presentation,
  CandlestickChart,
  CircleDollarSign,
  ArrowDownUp,
  ArrowUpRight,
  FileBarChart
} from "lucide-react";
import { ResponsiveContainer, LineChart as RLineChart, Line } from "recharts";
import { Link } from "wouter";

type Topic = {
  title: string;
  icon: React.ComponentType<any>;
  definition: string;
  example: string;
  formula?: string;
};

function seededSeries(seedKey: string, points = 16) {
  // Deterministic small sparkline data based on title
  let seed = 0;
  for (let i = 0; i < seedKey.length; i++) seed = (seed * 31 + seedKey.charCodeAt(i)) >>> 0;
  const data: { x: number; y: number }[] = [];
  let val = (seed % 50) + 25; // starting 25-74
  for (let i = 0; i < points; i++) {
    seed = (1103515245 * seed + 12345) >>> 0;
    const drift = ((seed >>> 24) % 7) - 3; // -3..+3
    val = Math.max(10, Math.min(100, val + drift));
    data.push({ x: i, y: val });
  }
  return data;
}

const topics: Topic[] = [
  {
    title: "Market Cap Growth",
    icon: TrendingUp,
    definition:
      "Market capitalization is the total value of a company’s shares in the stock market. Market cap growth means how much this value has increased (or decreased) over time.",
    example:
      "If a company has 10 million shares, and each share costs Rs. 100, the market cap = 10m × 100 = Rs. 1 billion. If the share price rises to Rs. 120, the market cap becomes Rs. 1.2 billion → growth of 20%.",
  },
  {
    title: "Enterprise Value (EV)",
    icon: Building2,
    definition:
      "EV shows the true value of a company, not just its market cap. It includes market cap plus debt (money borrowed) minus cash (money in the bank).",
    example:
      "A company’s market cap is Rs. 1 billion. It has Rs. 200 million in debt and Rs. 100 million in cash. EV = 1b + 0.2b – 0.1b = Rs. 1.1 billion. This is what it would roughly cost to ‘buy the whole company.’",
  },
  {
    title: "Last Close Price",
    icon: Clock4,
    definition:
      "The price of one share when the stock market last closed (yesterday’s final price).",
    example:
      "If you check Nestlé Pakistan’s stock and yesterday it closed at Rs. 7,000 per share, then Rs. 7,000 is the last close price.",
  },
  {
    title: "P/E Ratio (Price-to-Earnings Ratio)",
    icon: Ratio,
    definition:
      "Tells you how much investors are paying for each rupee of the company’s earnings (profit).",
    formula: "P/E = Share Price ÷ Earnings per Share (EPS)",
    example:
      "If a company’s share price is Rs. 100 and its EPS is Rs. 10, then P/E = 100 ÷ 10 = 10 → Means investors are paying Rs. 10 for every Rs. 1 profit.",
  },
  {
    title: "Forward P/E",
    icon: LineChart,
    definition:
      "Same as P/E ratio, but instead of using past earnings, it uses future (expected) earnings predicted by analysts.",
    example:
      "Current share price is Rs. 100. Analysts expect next year’s EPS to be Rs. 20. Forward P/E = 100 ÷ 20 = 5 → If future profits rise, the stock may look cheaper compared to current P/E.",
  },
  {
    title: "P/S Ratio (Price-to-Sales)",
    icon: Calculator,
    definition:
      "Shows how much investors are paying for each Rs. 1 of sales (revenue). Useful for companies that are not yet profitable.",
    example:
      "A company’s total sales = Rs. 5b. Shares outstanding = 50m → Sales per share = 5b ÷ 50m = Rs. 100. Current share price = Rs. 500. P/S = 500 ÷ 100 = 5 → Investors are paying Rs. 5 for every Rs. 1 of sales.",
  },
  {
    title: "P/B Ratio (Price-to-Book)",
    icon: BarChart3,
    definition:
      "Compares the market price of a company to its book value (assets – liabilities). Shows whether the market values the company above or below its net assets.",
    example:
      "Total assets = Rs. 10b, Liabilities = Rs. 6b → Book value = Rs. 4b. Shares outstanding = 40m → Book value per share = 4b ÷ 40m = Rs. 100. Current share price = Rs. 200. P/B = 200 ÷ 100 = 2 → Market is valuing the company at 2× its book value.",
  },
  {
    title: "P/TBV Ratio (Price-to-Tangible Book Value)",
    icon: Layers,
    definition:
      "Similar to P/B ratio but excludes intangible assets like goodwill, patents, and trademarks. Focuses only on tangible assets (land, buildings, inventory, etc.).",
    example:
      "Book value per share = Rs. 100, of which Rs. 20 is goodwill. Tangible book value per share = 100 – 20 = Rs. 80. Share price = Rs. 200. P/TBV = 200 ÷ 80 = 2.5 → Investors pay 2.5× the tangible asset value.",
  },
  {
    title: "P/FCF Ratio (Price-to-Free Cash Flow)",
    icon: PiggyBank,
    definition:
      "Measures how much investors pay for each Rs. 1 of free cash flow (cash left after paying for operations and investments). Considered more reliable than earnings.",
    example:
      "Free cash flow = Rs. 2b. Shares outstanding = 100m → Free cash flow per share = 2b ÷ 100m = Rs. 20. Share price = Rs. 200. P/FCF = 200 ÷ 20 = 10 → Investors pay Rs. 10 for every Rs. 1 of free cash flow.",
  },
  {
    title: "P/OCF Ratio (Price-to-Operating Cash Flow)",
    icon: Wallet,
    definition:
      "Compares market price to operating cash flow (cash generated from daily business operations, before investments). Indicates efficiency in generating cash from core business.",
    example:
      "Operating cash flow = Rs. 3b. Shares outstanding = 100m → OCF per share = 3b ÷ 100m = Rs. 30. Share price = Rs. 150. P/OCF = 150 ÷ 30 = 5 → Investors pay Rs. 5 for every Rs. 1 of operating cash flow.",
  },
  {
    title: "PEG Ratio (Price/Earnings to Growth)",
    icon: Sigma,
    definition:
      "PEG compares the P/E ratio to the company’s expected earnings growth. It adjusts the P/E ratio by considering growth, making it more realistic.",
    formula: "PEG = P/E ÷ Earnings Growth Rate",
    example:
      "P/E ratio = 20. Expected earnings growth = 10% (growth rate = 10). PEG = 20 ÷ 10 = 2. A PEG of 1 is considered fair, below 1 undervalued, above 1 overvalued relative to growth.",
  },
  {
    title: "EV/Sales Ratio (Enterprise Value to Sales)",
    icon: ChartBar,
    definition:
      "Compares a company’s total value (EV) to its sales. Useful for comparing companies with different debt levels.",
    formula: "EV/Sales = Enterprise Value ÷ Sales",
    example:
      "Enterprise Value = Rs. 12b. Sales = Rs. 6b. EV/Sales = 12 ÷ 6 = 2. Investors pay Rs. 2 in company value for every Rs. 1 of sales.",
  },
  {
    title: "EV/EBITDA Ratio (Enterprise Value to EBITDA)",
    icon: Factory,
    definition:
      "Compares EV to a company’s EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization). Shows how many times cash earnings the company is valued at.",
    formula: "EV/EBITDA = Enterprise Value ÷ EBITDA",
    example:
      "EV = Rs. 15b. EBITDA = Rs. 3b. EV/EBITDA = 15 ÷ 3 = 5. The company is valued at 5× its EBITDA.",
  },
  {
    title: "EV/EBIT Ratio (Enterprise Value to EBIT)",
    icon: BarChartHorizontal,
    definition:
      "Similar to EV/EBITDA but uses EBIT (Earnings Before Interest and Taxes). It includes depreciation/amortization, so it reflects profitability after accounting for asset usage.",
    formula: "EV/EBIT = Enterprise Value ÷ EBIT",
    example:
      "EV = Rs. 15b. EBIT = Rs. 2.5b. EV/EBIT = 15 ÷ 2.5 = 6. The company is valued at 6× its EBIT.",
  },
  {
    title: "EV/FCF Ratio (Enterprise Value to Free Cash Flow)",
    icon: BarChart2,
    definition:
      "Compares EV to Free Cash Flow. It shows how many times free cash flow the entire company is worth. A lower ratio suggests the company generates strong cash flow compared to its value.",
    formula: "EV/FCF = Enterprise Value ÷ Free Cash Flow",
    example:
      "EV = Rs. 20b. Free Cash Flow = Rs. 2b. EV/FCF = 20 ÷ 2 = 10. Investors are valuing the company at 10× its free cash flow.",
  },
  {
    title: "Debt / Equity Ratio",
    icon: Scale,
    definition:
      "Shows how much money a company has borrowed compared to what shareholders invested.",
    example:
      "Imagine a construction company. Shareholders invested $200m as equity, but the company also borrowed $400m from banks to fund projects. This means the company has twice as much debt as equity. It relies heavily on borrowed money. Investors may worry that if sales slow down, the company might struggle to repay.",
  },
  {
    title: "Debt / EBITDA Ratio",
    icon: Gauge,
    definition:
      "Tells how many years of operating profit (before interest and taxes) it would take to pay off debt.",
    example:
      "Suppose a telecom company earns $200m in annual operating profit (EBITDA) and has $600m in debt. It would take about 3 years of profit to clear all debt (if every rupee went to repayment). A ratio like this helps lenders judge if the debt is manageable.",
  },
  {
    title: "Debt / FCF Ratio",
    icon: BadgeDollarSign,
    definition:
      "Compares debt to free cash flow (the money left after expenses and investments).",
    example:
      "A manufacturing firm generates $100m free cash flow each year, but carries $500m debt. It would need 5 years of cash flow to repay all debt. If cash flows fall, repayment could become risky, so this ratio tells how safe or stretched the company is.",
  },
  {
    title: "Asset Turnover",
    icon: Presentation,
    definition:
      "Shows how much sales a company makes with the assets it owns.",
    example:
      "A retail chain owns stores, warehouses, and equipment worth $1b. Over the year, it generates $2b in sales. This means every $1 of assets creates $2 of revenue. A higher number shows the company is squeezing more sales out of its assets.",
  },
  {
    title: "Inventory Turnover",
    icon: Layers,
    definition:
      "Shows how many times a company sells and restocks its inventory in a year.",
    example:
      "A clothing brand keeps an average of $100m in stock and sells goods worth $500m over the year. This means it sells and replaces its stock 5 times per year. High turnover means products are selling quickly; low turnover may signal slow sales or overstocking.",
  },
  {
    title: "Quick Ratio (Acid-Test Ratio)",
    icon: Activity,
    definition:
      "Checks if a company can pay its short-term bills using only its most liquid assets (cash, receivables). It ignores inventory because inventory might take time to sell.",
    example:
      "Imagine a retail store has $300,000 in cash and receivables but owes suppliers $250,000 due soon. Its quick ratio is 1.2. This means for every $1 it owes immediately, it has $1.20 ready in cash or near-cash. The company can pay its bills without depending on selling stock quickly.",
  },
  {
    title: "Current Ratio",
    icon: Wallet,
    definition:
      "Looks at whether total current assets (cash, receivables, inventory) can cover current liabilities.",
    example:
      "A manufacturing company has $600,000 in current assets and $300,000 in liabilities due this year. Current ratio = 2.0, meaning the firm has $2 of current assets for every $1 it owes. Investors see this as a comfortable liquidity position.",
  },
  {
    title: "Return on Equity (ROE)",
    icon: Percent,
    definition:
      "Shows how much profit the company makes compared to the money shareholders invested.",
    example:
      "Shareholders invested $300,000 into a company. After a year, the company earns $90,000 profit. ROE = 30% → For every $100 shareholders put in, the company made $30 profit. A strong signal that management is using shareholder funds efficiently.",
  },
  {
    title: "Return on Assets (ROA)",
    icon: PieChart,
    definition:
      "Shows how much profit the company earns from all its assets (factories, equipment, inventory, etc.).",
    example:
      "A logistics company owns $800,000 in trucks, warehouses, and cash. It earns $100,000 profit in a year. ROA = 12.5% → For every $100 in assets, the company makes $12.50. This shows how well it uses its resources to generate profits.",
  },
  {
    title: "Return on Invested Capital (ROIC)",
    icon: MoveUpRight,
    definition:
      "Measures how much return the company makes on the money raised from both shareholders and lenders. It’s broader than ROE since it includes debt.",
    example:
      "A telecom firm has $600,000 invested (equity + debt) and makes $120,000 after tax from its core business. ROIC = 20% → For every $100 invested in the business (by both banks and shareholders), it produces $20 in profit. This is a sign of strong efficiency and value creation.",
  },
  {
    title: "Return on Capital Employed (ROCE)",
    icon: Landmark,
    definition:
      "Measures how efficiently a company uses all its capital (equity + debt) to generate profits.",
    example:
      "A steel company has $1b in capital employed. It earns $200m in profit before interest and tax in a year. This means it generates a 20% return on its capital. Investors like this because it shows the company makes strong profits compared to the money tied up in the business.",
  },
  {
    title: "Earnings Yield",
    icon: CircleDollarSign,
    definition:
      "The opposite of P/E ratio. It shows how much profit a company makes for every $100 invested in its stock.",
    example:
      "A tech company’s stock trades at $100 per share, and it makes $10 profit per share. Earnings yield = 10%. This means if you put $100 into the stock, the company earns $10 for you each year. Higher yield = more attractive for investors.",
  },
  {
    title: "Free Cash Flow (FCF) Yield",
    icon: PiggyBank,
    definition:
      "Shows how much free cash flow a company produces compared to its market value.",
    example:
      "A consumer goods company is valued at $2b in the stock market. It produces $200m in free cash flow each year. FCF yield = 10%. For every $100 invested, the company generates $10 in real, spendable cash.",
  },
  {
    title: "Dividend Yield",
    icon: Banknote,
    definition:
      "Shows how much dividend you earn compared to the stock price — like an ‘interest rate’ for stocks.",
    example:
      "A bank’s share costs $100 and pays an annual dividend of $5 per share. Dividend yield = 5%. An investor buying the stock today would earn $5 every year (if dividends stay the same). High yields attract income-focused investors.",
  },
  {
    title: "Payout Ratio",
    icon: ArrowDownUp,
    definition:
      "Tells what portion of profit is paid out as dividends versus kept for growth.",
    example:
      "A telecom company makes $100m profit but pays $40m as dividends. Payout ratio = 40%. This means 40% of earnings are returned to shareholders, while 60% is reinvested in the business.",
  },
  {
    title: "Buyback Yield / Dilution",
    icon: ArrowUpRight,
    definition:
      "Shows how much a company is returning to or taking from shareholders by either buying back shares (reducing supply, boosting value) or issuing new shares (dilution).",
    example:
      "A company has 100m shares. During the year, it buys back 5m shares. That’s a 5% buyback yield — shareholders now own a bigger piece of the company. If instead it issued 10m new shares, that would be 10% dilution, meaning each shareholder’s ownership shrinks.",
  },
  {
    title: "Total Shareholder Return (TSR)",
    icon: FileBarChart,
    definition:
      "The total return an investor gets from a stock, including both price changes and dividends.",
    example:
      "You buy a stock at $100. After a year, the stock price rises to $110 and you receive $5 dividend. Your total shareholder return = 15% ($10 from price growth + $5 dividend).",
  },
  {
    title: "Gross Margin",
    icon: BarChart4,
    definition:
      "Shows how much money is left after covering the direct costs of making products.",
    example:
      "A furniture company sells a table for $100, but it costs $60 in wood and labor to produce it. Gross margin = 40% ($40 profit per table before other expenses).",
  },
  {
    title: "Operating Margin",
    icon: BarChart3,
    definition:
      "Measures how much profit is left after covering both direct costs (materials) and operating expenses (salaries, rent, marketing).",
    example:
      "From that same $100 table, after paying $60 for materials and $20 for salaries/overheads, the company is left with $20 operating profit. Operating margin = 20%.",
  },
  {
    title: "Profit Margin (Net Margin)",
    icon: BarChart2,
    definition:
      "Shows how much of the sales revenue becomes actual net profit after all costs (taxes, interest, etc.).",
    example:
      "The company sold the table for $100. After materials, salaries, rent, marketing, and taxes/interest, only $10 is left as net profit. Profit margin = 10%.",
  },
  {
    title: "Free Cash Flow (FCF) Margin",
    icon: Wallet,
    definition:
      "Free Cash Flow Margin is the percentage of revenue that turns into free cash flow after covering operating expenses, taxes, and necessary capital expenditures. It shows how much actual cash the company keeps from its sales to pay dividends, reduce debt, or reinvest.",
    example:
      "If Company A earns $1,000,000 in revenue and ends up with $150,000 in free cash flow, its FCF Margin is 15%. This means the company generates 15 cents of usable cash for every $1 of sales. A higher FCF margin indicates strong financial flexibility.",
  },
  {
    title: "EBITDA Margin",
    icon: CandlestickChart,
    definition:
      "EBITDA Margin is the percentage of revenue that remains as earnings before interest, taxes, depreciation, and amortization. It measures how profitable a company’s core operations are, without considering financing costs or accounting adjustments.",
    example:
      "If Company B makes $2,000,000 in revenue and has $600,000 EBITDA, then its EBITDA Margin is 30%. This means the company retains 30 cents from each $1 of sales through its operating performance.",
  },
];

// Add remaining topics to reach all items from the provided list
const remaining: Topic[] = [
  // We already covered 1..15,16..22,23..37 across the arrays above.
  // This const exists to keep structure explicit and ready for future extension if needed.
];

const allTopics = topics.concat(remaining);

function TopicCard({ topic }: { topic: Topic }) {
  const Icon = topic.icon;
  const data = seededSeries(topic.title);
  return (
    <MotionItem className="bg-card rounded-xl p-6 border border-border hover-lift relative overflow-hidden">
      <div className="absolute right-3 top-3 w-24 h-10 opacity-60">
        <ResponsiveContainer width="100%" height="100%">
          <RLineChart data={data} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
            <Line type="monotone" dataKey="y" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
          </RLineChart>
        </ResponsiveContainer>
      </div>

      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
        <Icon className="text-primary" size={22} />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{topic.title}</h3>
      <p className="text-sm text-muted-foreground mb-3">{topic.definition}</p>
      {topic.formula && (
        <div className="bg-muted rounded-lg p-3 mb-3">
          <div className="text-xs text-muted-foreground mb-1">Formula</div>
          <div className="font-mono text-sm text-foreground">{topic.formula}</div>
        </div>
      )}
      <div className="bg-secondary rounded-lg p-3">
        <div className="text-xs text-muted-foreground mb-1">Example</div>
        <div className="text-sm text-foreground">{topic.example}</div>
      </div>
    </MotionItem>
  );
}

export default function LearningLibrary() {
  return (
    <MotionContainer className="bg-background min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold mb-3">Learning Library</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Deep-dive cards covering core market concepts, valuation ratios, cash flow metrics, returns, and efficiency indicators.
          </p>
          <div className="mt-6">
            <Link href="/learn" className="inline-flex items-center px-4 py-2 rounded-md bg-secondary text-foreground hover:opacity-90">
              Back to Learn
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTopics.map((t, i) => (
            <TopicCard topic={t} key={i} />
          ))}
        </div>
      </div>
    </MotionContainer>
  );
}
