import { Scenario } from './scenario';

/**
 * Represents a market opportunity being observed
 */
export interface Opportunity {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  // Configuration (will be expanded later)
  config: OpportunityConfig;

  // Scenario data for visualization
  scenario: Scenario | null;
}

/**
 * Configuration settings for an opportunity
 * This will be expanded as the Configuration page is developed
 */
export interface OpportunityConfig {
  // Market details
  marketName: string;
  marketSize?: number;
  targetSegments?: string[];

  // Market sizing metrics
  tam?: number; // Total Addressable Market
  tamCurrency?: string; // Currency for TAM (USD, EUR, etc.)
  sam?: number; // Serviceable Addressable Market
  som?: number; // Serviceable Obtainable Market

  // Market growth metrics
  historicalMarketSize?: number; // Market size at start year
  historicalYear?: number; // Year of historical market size
  projectedMarketSize?: number; // Projected market size at end year
  projectedYear?: number; // Year of projected market size
  cagr?: number; // Compound Annual Growth Rate (%)

  // Market characteristics
  marketMaturityStage?: string; // Emerging, Growth, Mature, Declining
  geographicScope?: string; // Global, Regional, National, Local
  industryVertical?: string; // Industry classification

  // Customer metrics
  targetCustomerCount?: number; // Total number of potential customers
  averageRevenuePerUser?: number; // ARPU
  customerAcquisitionCost?: number; // CAC
  customerLifetimeValue?: number; // LTV
  churnRate?: number; // Annual churn rate (%)

  // Market dynamics
  marketGrowthDrivers?: string; // Key factors driving market growth
  marketPenetrationRate?: number; // Current market penetration (%)
  competitiveIntensity?: string; // Low, Medium, High
  entryBarriers?: string; // Low, Medium, High

  // Additional notes
  marketAnalysisNotes?: string; // Free-form notes on market analysis
  dataSources?: string; // Sources used for market data

  // Visualization settings
  visualizationSettings?: {
    agentCount?: number;
    useWebGL?: boolean;
  };
}

/**
 * Form data for creating a new opportunity
 */
export interface CreateOpportunityInput {
  name: string;
  description?: string;
  marketName: string;
}
