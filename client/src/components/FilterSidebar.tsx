import { useState } from "react";
import { FilterCriteria } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterSidebarProps {
  onFilterChange: (criteria: FilterCriteria) => void;
  onRiskPreset: (level: 'low' | 'medium' | 'high') => void;
}

export default function FilterSidebar({ onFilterChange, onRiskPreset }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterCriteria>({});
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['basic', 'performance']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const updateFilter = (key: keyof FilterCriteria, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div className="w-80 bg-card rounded-xl p-6 border border-border" style={{ height: 'fit-content' }} data-testid="filter-sidebar">
      {/* Risk Presets */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Risk Presets</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRiskPreset('low')}
            className="bg-success/10 text-success hover:bg-success/20"
            data-testid="button-preset-low"
          >
            Low Risk
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRiskPreset('medium')}
            data-testid="button-preset-medium"
          >
            Medium Risk
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRiskPreset('high')}
            data-testid="button-preset-high"
          >
            High Risk
          </Button>
        </div>
      </div>

      {/* Basic Filters */}
      <FilterSection
        title="Basic"
        isExpanded={expandedSections.has('basic')}
        onToggle={() => toggleSection('basic')}
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Market Cap (PKR Millions)</label>
            <div className="flex items-center space-x-3">
              <Input
                type="number"
                placeholder="Min"
                value={filters.marketCapMin || ''}
                onChange={(e) => updateFilter('marketCapMin', parseFloat(e.target.value) || undefined)}
                data-testid="input-marketcap-min"
              />
              <span className="text-muted-foreground">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.marketCapMax || ''}
                onChange={(e) => updateFilter('marketCapMax', parseFloat(e.target.value) || undefined)}
                data-testid="input-marketcap-max"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Dividend Yield: {filters.dividendYieldMin?.toFixed(1) || 0}%
            </label>
            <Slider
              min={0}
              max={15}
              step={0.5}
              value={[filters.dividendYieldMin || 0]}
              onValueChange={([value]) => updateFilter('dividendYieldMin', value)}
              data-testid="slider-dividend-yield"
            />
          </div>
        </div>
      </FilterSection>

      {/* Performance Filters */}
      <FilterSection
        title="Performance"
        isExpanded={expandedSections.has('performance')}
        onToggle={() => toggleSection('performance')}
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              ROE: {filters.roeMin?.toFixed(1) || 0}%
            </label>
            <Slider
              min={0}
              max={40}
              step={1}
              value={[filters.roeMin || 0]}
              onValueChange={([value]) => updateFilter('roeMin', value)}
              data-testid="slider-roe"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              ROA: {filters.roaMin?.toFixed(1) || 0}%
            </label>
            <Slider
              min={0}
              max={25}
              step={1}
              value={[filters.roaMin || 0]}
              onValueChange={([value]) => updateFilter('roaMin', value)}
              data-testid="slider-roa"
            />
          </div>
        </div>
      </FilterSection>

      {/* Valuation Filters */}
      <FilterSection
        title="Valuation"
        isExpanded={expandedSections.has('valuation')}
        onToggle={() => toggleSection('valuation')}
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              P/E Ratio: {filters.peRatioMax?.toFixed(1) || 30}
            </label>
            <Slider
              min={0}
              max={30}
              step={0.5}
              value={[filters.peRatioMax || 30]}
              onValueChange={([value]) => updateFilter('peRatioMax', value)}
              data-testid="slider-pe-ratio"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              P/B Ratio: {filters.pbRatioMax?.toFixed(1) || 5}
            </label>
            <Slider
              min={0}
              max={5}
              step={0.1}
              value={[filters.pbRatioMax || 5]}
              onValueChange={([value]) => updateFilter('pbRatioMax', value)}
              data-testid="slider-pb-ratio"
            />
          </div>
        </div>
      </FilterSection>

      {/* Risk Indicators */}
      <FilterSection
        title="Risk Indicators"
        isExpanded={expandedSections.has('risk')}
        onToggle={() => toggleSection('risk')}
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Beta: {filters.betaMax?.toFixed(1) || 2}
            </label>
            <Slider
              min={0}
              max={2}
              step={0.1}
              value={[filters.betaMax || 2]}
              onValueChange={([value]) => updateFilter('betaMax', value)}
              data-testid="slider-beta"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Debt/Equity: {filters.debtEquityMax?.toFixed(1) || 2}
            </label>
            <Slider
              min={0}
              max={2}
              step={0.1}
              value={[filters.debtEquityMax || 2]}
              onValueChange={([value]) => updateFilter('debtEquityMax', value)}
              data-testid="slider-debt-equity"
            />
          </div>
        </div>
      </FilterSection>

      <Button
        onClick={applyFilters}
        className="w-full gradient-primary text-white mt-6"
        data-testid="button-apply-filters"
      >
        Apply Filters
      </Button>
    </div>
  );
}

function FilterSection({
  title,
  isExpanded,
  onToggle,
  children,
}: {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full mb-3"
        data-testid={`button-toggle-${title.toLowerCase()}`}
      >
        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">{title}</h4>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="text-muted-foreground" size={16} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
