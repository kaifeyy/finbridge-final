import { z } from "zod";

// Stock data schema
export const stockSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  price: z.number(),
  change: z.number().nullable(),
  changePercent: z.number().nullable(),
  volume: z.number().nullable(),
  marketCap: z.string(),
  peRatio: z.number().nullable(),
  pbRatio: z.number().nullable(),
  eps: z.number().nullable(),
  dividendYield: z.number().nullable(),
  week52High: z.number().nullable(),
  week52Low: z.number().nullable(),
  week52Performance: z.number().nullable(),
  ratios: z.record(z.string(), z.record(z.string(), z.any())),
});

export type Stock = z.infer<typeof stockSchema>;

// Filter criteria schema
export const filterCriteriaSchema = z.object({
  marketCapMin: z.number().optional(),
  marketCapMax: z.number().optional(),
  peRatioMin: z.number().optional(),
  peRatioMax: z.number().optional(),
  pbRatioMin: z.number().optional(),
  pbRatioMax: z.number().optional(),
  roeMin: z.number().optional(),
  roeMax: z.number().optional(),
  roaMin: z.number().optional(),
  roaMax: z.number().optional(),
  dividendYieldMin: z.number().optional(),
  dividendYieldMax: z.number().optional(),
  betaMin: z.number().optional(),
  betaMax: z.number().optional(),
  debtEquityMin: z.number().optional(),
  debtEquityMax: z.number().optional(),
  currentRatioMin: z.number().optional(),
  currentRatioMax: z.number().optional(),
  quickRatioMin: z.number().optional(),
  quickRatioMax: z.number().optional(),
  riskLevel: z.enum(['low', 'medium', 'high']).optional(),
});

export type FilterCriteria = z.infer<typeof filterCriteriaSchema>;

// CAPM calculation schema
export const capmInputSchema = z.object({
  riskFreeRate: z.number(),
  marketReturn: z.number(),
  beta: z.number(),
});

export type CAPMInput = z.infer<typeof capmInputSchema>;
