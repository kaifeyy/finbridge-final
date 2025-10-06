import React from "react";
import { BarChart3, Percent, Coins, Building, Activity, Scale, Calculator, Droplet, DollarSign, BookOpen, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "wouter";

import { MotionContainer, MotionItem } from "@/components/Motion";

const courses = [
  {
    slug: 'stock-trading',
    title: 'Stock Trading with Technical Analysis',
    description: 'Practical course covering technical indicators, chart patterns, and short-term trading techniques.',
    url: 'https://cdn.builder.io/o/assets%2Fca35db826797471cb8e33731c10b3ab1%2F58d9f01979a24a22b84a5e4ecbf44956?alt=media&token=024c66b2-7b02-4425-bcdb-a0459e4729e1&apiKey=ca35db826797471cb8e33731c10b3ab1',
  },
  {
    slug: 'stock-investing',
    title: 'Stock Investing with Fundamental Analysis',
    description: 'Long-term investing course focused on fundamentals, valuation and building a resilient portfolio.',
    url: 'https://cdn.builder.io/o/assets%2Fca35db826797471cb8e33731c10b3ab1%2F98130912e8b74cc7b49368622974c070?alt=media&token=515822c1-7295-4173-a312-6c47f4fd8fca&apiKey=ca35db826797471cb8e33731c10b3ab1',
  },
  {
    slug: 'income-investing',
    title: 'Income Investing',
    description: 'Course that teaches dividend strategies, income generation and conservative portfolio construction.',
    url: 'https://cdn.builder.io/o/assets%2Fca35db826797471cb8e33731c10b3ab1%2Faa0d9ed465ae42ceaedc8ae65c4eca19?alt=media&token=e0aa017c-0c33-4a20-8da6-b61186729aca&apiKey=ca35db826797471cb8e33731c10b3ab1',
  },
];

const indicators = [
  {
    icon: BarChart3,
    title: 'P/E Ratio',
    description: 'Price-to-Earnings Ratio tells you how much investors pay for each rupee of earnings. If share price is PKR 100 and EPS is PKR 10, P/E = 10.',
    formula: 'P/E = Share Price ÷ EPS',
  },
  {
    icon: Percent,
    title: 'Return on Equity (ROE)',
    description: "Shows how efficiently a company uses shareholders' money to generate profit. Higher ROE (>20%) indicates better performance.",
    formula: 'ROE = (Net Income ÷ Equity) × 100',
  },
  {
    icon: Coins,
    title: 'Dividend Yield',
    description: 'Annual dividend payment as percentage of share price. A 6% dividend yield means PKR 6 per year for every PKR 100 invested.',
    formula: 'DY = (Annual Dividend ÷ Price) × 100',
  },
  {
    icon: Building,
    title: 'Market Capitalization',
    description: "Total value of company's shares. If 10M shares at PKR 100 each = PKR 1B market cap. Shows company size and stability.",
    formula: 'MCap = Shares × Price',
  },
  {
    icon: Activity,
    title: 'Beta (β)',
    description: 'Measures stock volatility vs market. Beta = 1 moves with market, >1 more volatile, <1 less volatile. Lower beta = lower risk.',
    formula: 'Low: 0-0.75 | Medium: 0.75-1.25 | High: >1.25',
  },
  {
    icon: Scale,
    title: 'Debt/Equity Ratio',
    description: "Shows company's leverage. PKR 400M debt with PKR 200M equity = 2.0 ratio. Lower is safer; <0.5 is considered low risk.",
    formula: 'D/E = Total Debt ÷ Total Equity',
  },
  {
    icon: Calculator,
    title: 'EV/EBITDA Ratio',
    description: 'Compares enterprise value to cash earnings. Lower ratio (<7) suggests undervaluation. Popular for cross-industry comparison.',
    formula: 'EV/EBITDA = Enterprise Value ÷ EBITDA',
  },
  {
    icon: Droplet,
    title: 'Current Ratio',
    description: "Checks if company can pay short-term bills. PKR 600K assets vs PKR 300K liabilities = 2.0. Ratio >2 shows strong liquidity.",
    formula: 'CR = Current Assets ÷ Current Liabilities',
  },
  {
    icon: DollarSign,
    title: 'Free Cash Flow',
    description: 'Cash left after operational expenses and investments. Positive FCF shows company generates excess cash for growth or dividends.',
    formula: 'FCF = Operating CF - Capital Expenditure',
  },
];

const freeCourses = [
  {
    title: 'Income Investing',
    href: '/courses/income-investing',
    blurb: 'Build stable cash flow with dividends and interest.',
    Icon: DollarSign,
    accent: 'from-yellow-400 to-orange-400',
  },
  {
    title: 'Stock Investing',
    href: '/courses/stock-investing',
    blurb: 'Master fundamentals to pick long-term winners.',
    Icon: BookOpen,
    accent: 'from-sky-400 to-indigo-500',
  },
  {
    title: 'Stock Trading',
    href: '/courses/stock-trading',
    blurb: 'Learn technicals and strategies for active trading.',
    Icon: TrendingUp,
    accent: 'from-emerald-400 to-teal-600',
  },
];

export default function Learn() {
  return (
    <MotionContainer className="bg-background min-h-screen py-20" data-testid="page-learn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Learn Before You Invest</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master financial concepts and indicators to make informed investment decisions
          </p>
        </div>

        <div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-foreground">Free Courses</h3>
            <div className="h-px flex-1 ml-6 bg-border" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {freeCourses.map((course, i) => (
              <MotionItem key={i} className="bg-card rounded-xl p-6 border border-border hover-lift">
                <div className="flex flex-col h-full">
                  <div className="flex items-start">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${course.accent} text-white shadow-md mr-4`}>
                      <course.Icon size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-1">{course.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{course.blurb}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex-1">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">What you'll learn</div>
                      <ul className="list-disc pl-5 text-sm text-foreground">
                        <li>Key concepts and frameworks</li>
                        <li>Practical examples & charts</li>
                        <li>Actionable takeaways</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center"><BookOpen size={14} className="mr-2" /> <span>Format</span> <span className="font-mono text-foreground ml-2">DOCX</span></span>
                    <Link href={course.href} className="inline-flex items-center px-3 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-95">
                      Open <ArrowRight size={14} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </MotionItem>
            ))}
          </div>
        </div>

        <div className="mt-12 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-foreground">Tips & Formulas</h3>
            <div className="h-px flex-1 ml-6 bg-border" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <MotionItem key={index} className="bg-card rounded-xl p-6 border border-border hover-lift" data-testid={`card-indicator-${index}`}>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{indicator.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{indicator.description}</p>
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Formula</div>
                  <div className="font-mono text-sm text-foreground">{indicator.formula}</div>
                </div>
              </MotionItem>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link href="/learn/library" className="inline-block px-8 py-4 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all hover-lift text-lg" data-testid="button-explore-library">
            Explore Full Learning Library
          </Link>
        </div>
        </div>
      </div>
    </MotionContainer>
  );
}
