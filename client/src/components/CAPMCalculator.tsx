import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateCAPM, DEFAULT_RISK_FREE_RATE, DEFAULT_MARKET_RETURN, formatCAPMResult } from "@/lib/capm";

interface CAPMCalculatorProps {
  beta: number;
}

export default function CAPMCalculator({ beta }: CAPMCalculatorProps) {
  const [riskFreeRate, setRiskFreeRate] = useState(DEFAULT_RISK_FREE_RATE);
  const [marketReturn, setMarketReturn] = useState(DEFAULT_MARKET_RETURN);
  const [customBeta, setCustomBeta] = useState(beta);

  const expectedReturn = calculateCAPM({
    riskFreeRate,
    marketReturn,
    beta: customBeta,
  });

  return (
    <div className="bg-card rounded-xl p-6 border border-border" data-testid="capm-calculator">
      <h3 className="text-lg font-semibold text-foreground mb-4">CAPM Expected Return</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="risk-free-rate" className="text-xs text-muted-foreground mb-2 block">
            Risk-Free Rate (Rf)
          </Label>
          <div className="flex items-center space-x-2">
            <Input
              id="risk-free-rate"
              type="number"
              value={riskFreeRate}
              onChange={(e) => setRiskFreeRate(parseFloat(e.target.value) || 0)}
              step="0.1"
              data-testid="input-risk-free-rate"
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Pakistan 6M T-Bill Rate</p>
        </div>

        <div>
          <Label htmlFor="market-return" className="text-xs text-muted-foreground mb-2 block">
            Market Return (Rm)
          </Label>
          <div className="flex items-center space-x-2">
            <Input
              id="market-return"
              type="number"
              value={marketReturn}
              onChange={(e) => setMarketReturn(parseFloat(e.target.value) || 0)}
              step="0.1"
              data-testid="input-market-return"
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">KSE-100 Expected Return</p>
        </div>

        <div>
          <Label htmlFor="beta" className="text-xs text-muted-foreground mb-2 block">
            Beta (β)
          </Label>
          <Input
            id="beta"
            type="number"
            value={customBeta}
            onChange={(e) => setCustomBeta(parseFloat(e.target.value) || 0)}
            step="0.01"
            data-testid="input-beta"
          />
        </div>

        <div className="pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground mb-2">
            Formula: E(Ri) = Rf + β × (Rm - Rf)
          </div>
          <div className="bg-primary/10 rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Expected Return</div>
            <div className="text-3xl font-bold text-primary" data-testid="text-expected-return">
              {formatCAPMResult(expectedReturn)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
