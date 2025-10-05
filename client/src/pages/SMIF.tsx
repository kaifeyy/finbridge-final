import { ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/stockData";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { MotionContainer, MotionItem } from "@/components/Motion";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const performanceData = [
  { month: 'Jan', smif: 100, kse: 100 },
  { month: 'Feb', smif: 105, kse: 102 },
  { month: 'Mar', smif: 110, kse: 104 },
  { month: 'Apr', smif: 115, kse: 107 },
  { month: 'May', smif: 118, kse: 109 },
  { month: 'Jun', smif: 122, kse: 112 },
  { month: 'Jul', smif: 124.8, kse: 116.5 },
];

const holdings = [
  { symbol: 'OGDC', name: 'Oil & Gas Development', shares: 5000, price: 268.52, value: 1342600, weight: 18.5, return: 32.4 },
  { symbol: 'UBL', name: 'United Bank Limited', shares: 3200, price: 366.20, value: 1171840, weight: 16.2, return: 28.1 },
  { symbol: 'MARI', name: 'Mari Energies Limited', shares: 1800, price: 677.39, value: 1219302, weight: 16.8, return: 19.7 },
];

export default function SMIF() {
  const [open, setOpen] = useState(false);
  const governance = [
    {
      name: "Dr. Ahsan Malik",
      title: "Faculty Advisor — Portfolio Management & Statistical Analysis",
      description:
        "Oversees fund portfolio strategy and performance analytics. Provides mentorship in quantitative methods, asset allocation, and statistical modeling to enhance research accuracy and portfolio optimization.",
    },
    {
      name: "Dr. Hina Rauf",
      title: "Faculty Advisor — Financial Ratios & Market Research",
      description:
        "Specializes in financial statement interpretation, ratio-based valuation, and macroeconomic trend analysis. Guides students in applying market research insights to inform evidence-based investment decisions.",
    },
    {
      name: "Ahmed Ali",
      title: "Lead Student Analyst — SMIF",
      description:
        "Leads the student research team, coordinates investment strategy implementation, and ensures analytical consistency across fund activities under faculty supervision.",
    },
    {
      name: "Maria Khan",
      title: "Student Analyst — Equity Research",
      description:
        "Conducts fundamental and sector-level research, builds valuation models, and prepares investment proposals for review by the Governance Panel.",
    },
    {
      name: "Bilal Hussain",
      title: "Student Analyst — Risk & Portfolio Management",
      description:
        "Focuses on portfolio risk assessment, performance evaluation, and diversification strategy to support sustainable fund growth.",
    },
    {
      name: "Sara Ahmed",
      title: "Student Analyst — Market Intelligence & Reporting",
      description:
        "Monitors market movements, macroeconomic indicators, and prepares detailed reporting dashboards for fund evaluation and decision-making.",
    },
  ];

  return (
    <MotionContainer className="bg-background min-h-screen py-20" data-testid="page-smif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionItem>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">MAYS Student Managed Investment Fund</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Pakistan's first Student Managed Investment Fund - Learn by managing a real portfolio
            </p>
          </div>
        </MotionItem>

        <MotionItem>
          <div className="bg-card rounded-xl p-8 border border-border mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-foreground">Portfolio Performance</h3>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Total Returns</div>
                  <div className="text-2xl font-bold text-success">+24.8%</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Outperformance vs KSE-100</div>
                  <div className="text-2xl font-bold text-primary">+8.3%</div>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={performanceData}>
                <XAxis dataKey="month" stroke={getComputedStyle(document.documentElement).getPropertyValue('--muted-foreground') || '#64748b'} />
                <YAxis stroke={getComputedStyle(document.documentElement).getPropertyValue('--muted-foreground') || '#64748b'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--card') || '#ffffff',
                    border: `1px solid ${getComputedStyle(document.documentElement).getPropertyValue('--border') || '#e5e7eb'}`,
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="smif"
                  stroke={getComputedStyle(document.documentElement).getPropertyValue('--success') || '#16a34a'}
                  strokeWidth={3}
                  name="MAYS SMIF Performance"
                />
                <Line
                  type="monotone"
                  dataKey="kse"
                  stroke={getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#1d4ed8'}
                  strokeWidth={3}
                  name="KSE-100 Performance"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </MotionItem>

        <MotionItem>
          <div className="bg-card rounded-xl p-8 border border-border mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Current Holdings</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Symbol</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Company</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Shares</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Price</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Value</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Weight</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Return</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((holding) => (
                    <tr key={holding.symbol} className="border-b border-border hover:bg-muted transition-colors" data-testid={`row-holding-${holding.symbol}`}>
                      <td className="py-3 px-4">
                        <div className="text-sm font-semibold text-foreground">{holding.symbol}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-foreground">{holding.name}</div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="text-sm text-foreground">{holding.shares.toLocaleString()}</div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="text-sm text-foreground">{formatCurrency(holding.price)}</div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="text-sm font-semibold text-foreground">{formatCurrency(holding.value)}</div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="text-sm text-foreground">{holding.weight}%</div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="text-sm font-semibold text-success">+{holding.return}%</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </MotionItem>

        <MotionItem>
          <div className="bg-card rounded-xl p-8 border border-border mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-6">SMIF Governance Panel</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {governance.map((m, idx) => (
                <Card
                  key={m.name}
                  className="gradient-card border border-border/60 hover-lift transition-shadow duration-300 hover:shadow-xl"
                  data-testid={`gov-card-${idx + 1}`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-foreground">{m.name}</CardTitle>
                    <CardDescription className="text-sm">{m.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-foreground/90 leading-relaxed">{m.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </MotionItem>

        <MotionItem>
          <div className="glass-dark rounded-xl p-12 text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">Ready to Join MAYS SMIF?</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Gain hands-on experience managing real investments. Learn portfolio construction, risk management, and market analysis from industry professionals.
            </p>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="px-8 py-4 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all hover-lift text-lg" data-testid="button-apply-smif">
                  Apply Now <ArrowRight className="inline ml-2" size={20} />
                </button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Apply to MAYS SMIF</DialogTitle>
                  <DialogDescription>Please fill out the form below and our team will reach out.</DialogDescription>
                </DialogHeader>

                <form onSubmit={(e) => { e.preventDefault(); setOpen(false); (e.target as HTMLFormElement).reset(); }}>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <Input name="name" placeholder="Full name" required />
                    <Input name="email" type="email" placeholder="Email address" required />
                    <Input name="university" placeholder="University / Affiliation" />
                    <Textarea name="message" placeholder="Tell us why you want to join" />
                  </div>

                  <DialogFooter>
                    <div className="flex w-full justify-end gap-2">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Submit</Button>
                    </div>
                  </DialogFooter>
                </form>

              </DialogContent>
            </Dialog>

          </div>
        </MotionItem>
      </div>
    </MotionContainer>
  );
}
