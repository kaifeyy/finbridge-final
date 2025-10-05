import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Stock, FilterCriteria } from "@shared/schema";
import FilterSidebar from "@/components/FilterSidebar";
import StockCard from "@/components/StockCard";
import { apiRequest } from "@/lib/queryClient";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function Screener() {
  const [sortBy, setSortBy] = useState("relevance");
  const queryClient = useQueryClient();

  const { data: allStocks, isLoading } = useQuery<Stock[]>({
    queryKey: ['/api/stocks'],
  });

  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);

  const filterMutation = useMutation({
    mutationFn: async (criteria: FilterCriteria) => {
      const res = await apiRequest('POST', '/api/stocks/filter', criteria);
      return await res.json();
    },
    onSuccess: (data) => {
      setFilteredStocks(data);
    },
  });

  const handleFilterChange = (criteria: FilterCriteria) => {
    filterMutation.mutate(criteria);
  };

  const handleRiskPreset = async (level: 'low' | 'medium' | 'high') => {
    const res = await fetch(`/api/presets/${level}`);
    const preset = await res.json();
    filterMutation.mutate(preset);
  };

  const displayStocks = filteredStocks.length > 0 ? filteredStocks : (allStocks || []);

  return (
    <section className="bg-muted min-h-screen py-20" data-testid="page-screener">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Advanced Stock Screener</h2>
          <p className="text-muted-foreground">Filter 300+ PSX stocks using 20+ financial indicators</p>
        </div>

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar onFilterChange={handleFilterChange} onRiskPreset={handleRiskPreset} />
          </div>

          {/* Results Area */}
          <div className="flex-1">
            <div className="bg-card rounded-xl p-6 border border-border mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground" data-testid="text-results-count">Search Results</h3>
                  <p className="text-sm text-muted-foreground">
                    {isLoading ? 'Loading...' : `${displayStocks.length} stocks match your criteria`}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[200px]" data-testid="select-sort">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Sort by: Relevance</SelectItem>
                      <SelectItem value="marketcap-desc">Market Cap (High to Low)</SelectItem>
                      <SelectItem value="pe-asc">P/E Ratio (Low to High)</SelectItem>
                      <SelectItem value="dividend-desc">Dividend Yield (High to Low)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" data-testid="button-save-screen">
                    <Save size={16} className="mr-2" />
                    Save Screen
                  </Button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayStocks.slice(0, 20).map((stock) => (
                    <StockCard key={stock.symbol} stock={stock} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex items-center justify-center space-x-2">
                  <Button variant="outline" size="sm" data-testid="button-page-prev">
                    Previous
                  </Button>
                  <Button variant="default" size="sm">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <span className="text-muted-foreground">...</span>
                  <Button variant="outline" size="sm">15</Button>
                  <Button variant="outline" size="sm" data-testid="button-page-next">
                    Next
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
