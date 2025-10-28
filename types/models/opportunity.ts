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
  // Market details (placeholders for now)
  marketName: string;
  marketSize?: number;
  targetSegments?: string[];

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
