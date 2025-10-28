'use client';

import { Opportunity } from '@/types/models/opportunity';
import { useOpportunityStore } from '@/store/useOpportunityStore';
import { useState } from 'react';

interface ConfigurationTabProps {
  opportunity: Opportunity;
}

export default function ConfigurationTab({ opportunity }: ConfigurationTabProps) {
  const { updateOpportunity } = useOpportunityStore();

  const [formData, setFormData] = useState({
    name: opportunity.name,
    description: opportunity.description,
    marketName: opportunity.config.marketName,
    marketSize: opportunity.config.marketSize || '',
    // Market sizing metrics
    tam: opportunity.config.tam || '',
    tamCurrency: opportunity.config.tamCurrency || 'USD',
    sam: opportunity.config.sam || '',
    som: opportunity.config.som || '',
    // Market growth metrics
    historicalMarketSize: opportunity.config.historicalMarketSize || '',
    historicalYear: opportunity.config.historicalYear || '',
    projectedMarketSize: opportunity.config.projectedMarketSize || '',
    projectedYear: opportunity.config.projectedYear || '',
    cagr: opportunity.config.cagr || '',
    // Market characteristics
    marketMaturityStage: opportunity.config.marketMaturityStage || '',
    geographicScope: opportunity.config.geographicScope || '',
    industryVertical: opportunity.config.industryVertical || '',
    // Customer metrics
    targetCustomerCount: opportunity.config.targetCustomerCount || '',
    averageRevenuePerUser: opportunity.config.averageRevenuePerUser || '',
    customerAcquisitionCost: opportunity.config.customerAcquisitionCost || '',
    customerLifetimeValue: opportunity.config.customerLifetimeValue || '',
    churnRate: opportunity.config.churnRate || '',
    // Market dynamics
    marketGrowthDrivers: opportunity.config.marketGrowthDrivers || '',
    marketPenetrationRate: opportunity.config.marketPenetrationRate || '',
    competitiveIntensity: opportunity.config.competitiveIntensity || '',
    entryBarriers: opportunity.config.entryBarriers || '',
    // Additional notes
    marketAnalysisNotes: opportunity.config.marketAnalysisNotes || '',
    dataSources: opportunity.config.dataSources || '',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateOpportunity(opportunity.id, {
      name: formData.name,
      description: formData.description,
      config: {
        ...opportunity.config,
        marketName: formData.marketName,
        marketSize: formData.marketSize ? Number(formData.marketSize) : undefined,
        // Market sizing metrics
        tam: formData.tam ? Number(formData.tam) : undefined,
        tamCurrency: formData.tamCurrency || undefined,
        sam: formData.sam ? Number(formData.sam) : undefined,
        som: formData.som ? Number(formData.som) : undefined,
        // Market growth metrics
        historicalMarketSize: formData.historicalMarketSize ? Number(formData.historicalMarketSize) : undefined,
        historicalYear: formData.historicalYear ? Number(formData.historicalYear) : undefined,
        projectedMarketSize: formData.projectedMarketSize ? Number(formData.projectedMarketSize) : undefined,
        projectedYear: formData.projectedYear ? Number(formData.projectedYear) : undefined,
        cagr: formData.cagr ? Number(formData.cagr) : undefined,
        // Market characteristics
        marketMaturityStage: formData.marketMaturityStage || undefined,
        geographicScope: formData.geographicScope || undefined,
        industryVertical: formData.industryVertical || undefined,
        // Customer metrics
        targetCustomerCount: formData.targetCustomerCount ? Number(formData.targetCustomerCount) : undefined,
        averageRevenuePerUser: formData.averageRevenuePerUser ? Number(formData.averageRevenuePerUser) : undefined,
        customerAcquisitionCost: formData.customerAcquisitionCost ? Number(formData.customerAcquisitionCost) : undefined,
        customerLifetimeValue: formData.customerLifetimeValue ? Number(formData.customerLifetimeValue) : undefined,
        churnRate: formData.churnRate ? Number(formData.churnRate) : undefined,
        // Market dynamics
        marketGrowthDrivers: formData.marketGrowthDrivers || undefined,
        marketPenetrationRate: formData.marketPenetrationRate ? Number(formData.marketPenetrationRate) : undefined,
        competitiveIntensity: formData.competitiveIntensity || undefined,
        entryBarriers: formData.entryBarriers || undefined,
        // Additional notes
        marketAnalysisNotes: formData.marketAnalysisNotes || undefined,
        dataSources: formData.dataSources || undefined,
      },
    });

    alert('Configuration saved successfully!');
  };

  return (
    <div className="px-6 py-8">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-bold text-white mb-2">Market Configuration</h2>
        <p className="text-gray-400 mb-8">
          Configure the market details and parameters for this opportunity.
        </p>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Basic Information Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Opportunity Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Market Details Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Market Details</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Market Name *
                </label>
                <input
                  type="text"
                  value={formData.marketName}
                  onChange={(e) => setFormData({ ...formData, marketName: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Market Size (Units)
                </label>
                <input
                  type="number"
                  value={formData.marketSize}
                  onChange={(e) => setFormData({ ...formData, marketSize: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="e.g., 1000000"
                />
                <p className="text-gray-500 text-xs mt-1">
                  Total potential customers or market size in units
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Industry Vertical
                  </label>
                  <input
                    type="text"
                    value={formData.industryVertical}
                    onChange={(e) => setFormData({ ...formData, industryVertical: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., SaaS, Healthcare, FinTech"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Geographic Scope
                  </label>
                  <select
                    value={formData.geographicScope}
                    onChange={(e) => setFormData({ ...formData, geographicScope: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select scope</option>
                    <option value="Global">Global</option>
                    <option value="Regional">Regional</option>
                    <option value="National">National</option>
                    <option value="Local">Local</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Market Maturity Stage
                </label>
                <select
                  value={formData.marketMaturityStage}
                  onChange={(e) => setFormData({ ...formData, marketMaturityStage: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select stage</option>
                  <option value="Emerging">Emerging</option>
                  <option value="Growth">Growth</option>
                  <option value="Mature">Mature</option>
                  <option value="Declining">Declining</option>
                </select>
              </div>
            </div>
          </div>

          {/* Market Sizing Metrics Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Market Sizing Metrics</h3>
            <p className="text-gray-400 text-sm mb-4">
              Define the Total Addressable Market (TAM), Serviceable Addressable Market (SAM), and Serviceable Obtainable Market (SOM).
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Total Addressable Market (TAM)
                  </label>
                  <input
                    type="number"
                    value={formData.tam}
                    onChange={(e) => setFormData({ ...formData, tam: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 50000000000"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Total revenue opportunity available
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Currency
                  </label>
                  <select
                    value={formData.tamCurrency}
                    onChange={(e) => setFormData({ ...formData, tamCurrency: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                    <option value="CNY">CNY</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Serviceable Addressable Market (SAM)
                  </label>
                  <input
                    type="number"
                    value={formData.sam}
                    onChange={(e) => setFormData({ ...formData, sam: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 10000000000"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Portion of TAM you can serve with your solution
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Serviceable Obtainable Market (SOM)
                  </label>
                  <input
                    type="number"
                    value={formData.som}
                    onChange={(e) => setFormData({ ...formData, som: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 1000000000"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Realistic market share you can capture
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Market Growth Metrics Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Market Growth Metrics</h3>
            <p className="text-gray-400 text-sm mb-4">
              Define historical and projected market data to calculate CAGR (Compound Annual Growth Rate).
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Historical Market Size
                  </label>
                  <input
                    type="number"
                    value={formData.historicalMarketSize}
                    onChange={(e) => setFormData({ ...formData, historicalMarketSize: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 30000000000"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Market size at historical year
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Historical Year
                  </label>
                  <input
                    type="number"
                    value={formData.historicalYear}
                    onChange={(e) => setFormData({ ...formData, historicalYear: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 2020"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Projected Market Size
                  </label>
                  <input
                    type="number"
                    value={formData.projectedMarketSize}
                    onChange={(e) => setFormData({ ...formData, projectedMarketSize: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 50000000000"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Expected market size at projected year
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Projected Year
                  </label>
                  <input
                    type="number"
                    value={formData.projectedYear}
                    onChange={(e) => setFormData({ ...formData, projectedYear: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 2025"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  CAGR (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cagr}
                  onChange={(e) => setFormData({ ...formData, cagr: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="e.g., 12.5"
                />
                <p className="text-gray-500 text-xs mt-1">
                  Compound Annual Growth Rate (percentage)
                </p>
              </div>
            </div>
          </div>

          {/* Customer Metrics Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Customer Metrics</h3>
            <p className="text-gray-400 text-sm mb-4">
              Define key customer-related metrics for financial modeling.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Target Customer Count
                </label>
                <input
                  type="number"
                  value={formData.targetCustomerCount}
                  onChange={(e) => setFormData({ ...formData, targetCustomerCount: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="e.g., 500000"
                />
                <p className="text-gray-500 text-xs mt-1">
                  Total number of potential customers
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Average Revenue Per User (ARPU)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.averageRevenuePerUser}
                    onChange={(e) => setFormData({ ...formData, averageRevenuePerUser: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 100"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Annual revenue per customer
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Customer Acquisition Cost (CAC)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.customerAcquisitionCost}
                    onChange={(e) => setFormData({ ...formData, customerAcquisitionCost: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 500"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Cost to acquire one customer
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Customer Lifetime Value (LTV)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.customerLifetimeValue}
                    onChange={(e) => setFormData({ ...formData, customerLifetimeValue: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 5000"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Total revenue from a customer over their lifetime
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Annual Churn Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.churnRate}
                    onChange={(e) => setFormData({ ...formData, churnRate: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 15"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Percentage of customers lost annually
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Market Dynamics Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Market Dynamics</h3>
            <p className="text-gray-400 text-sm mb-4">
              Analyze competitive landscape and market entry factors.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Market Growth Drivers
                </label>
                <textarea
                  value={formData.marketGrowthDrivers}
                  onChange={(e) => setFormData({ ...formData, marketGrowthDrivers: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  rows={3}
                  placeholder="e.g., Digital transformation, remote work trends, regulatory changes"
                />
                <p className="text-gray-500 text-xs mt-1">
                  Key factors driving market growth
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Market Penetration Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.marketPenetrationRate}
                    onChange={(e) => setFormData({ ...formData, marketPenetrationRate: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Competitive Intensity
                  </label>
                  <select
                    value={formData.competitiveIntensity}
                    onChange={(e) => setFormData({ ...formData, competitiveIntensity: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select level</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Entry Barriers
                  </label>
                  <select
                    value={formData.entryBarriers}
                    onChange={(e) => setFormData({ ...formData, entryBarriers: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select level</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Additional Notes</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Market Analysis Notes
                </label>
                <textarea
                  value={formData.marketAnalysisNotes}
                  onChange={(e) => setFormData({ ...formData, marketAnalysisNotes: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  rows={4}
                  placeholder="Additional insights, assumptions, or context about your market analysis..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Data Sources
                </label>
                <textarea
                  value={formData.dataSources}
                  onChange={(e) => setFormData({ ...formData, dataSources: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  rows={3}
                  placeholder="e.g., Gartner Report 2024, CB Insights, Company Research..."
                />
                <p className="text-gray-500 text-xs mt-1">
                  Sources used for market data and analysis
                </p>
              </div>
            </div>
          </div>

          {/* Adoption Segments Section - Placeholder */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Adoption Segments</h3>
            <div className="text-gray-500 italic">
              <p>Configuration for adoption segments will be added here.</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Segment distribution percentages</li>
                <li>Migration rates between segments</li>
                <li>Segment-specific parameters</li>
              </ul>
            </div>
          </div>

          {/* Product Milestones Section - Placeholder */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Product Milestones</h3>
            <div className="text-gray-500 italic">
              <p>Configuration for product release milestones will be added here.</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Milestone definitions and timing</li>
                <li>Feature coverage per segment</li>
                <li>Migration triggers and rates</li>
              </ul>
            </div>
          </div>

          {/* Competitive Landscape Section - Placeholder */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Competitive Landscape</h3>
            <div className="text-gray-500 italic">
              <p>Configuration for competitive analysis will be added here.</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Incumbent solution (P1) details</li>
                <li>Legacy solution (P0) details</li>
                <li>Market positioning and differentiation</li>
              </ul>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Save Configuration
            </button>
            <button
              type="button"
              onClick={() => setFormData({
                name: opportunity.name,
                description: opportunity.description,
                marketName: opportunity.config.marketName,
                marketSize: opportunity.config.marketSize || '',
                // Market sizing metrics
                tam: opportunity.config.tam || '',
                tamCurrency: opportunity.config.tamCurrency || 'USD',
                sam: opportunity.config.sam || '',
                som: opportunity.config.som || '',
                // Market growth metrics
                historicalMarketSize: opportunity.config.historicalMarketSize || '',
                historicalYear: opportunity.config.historicalYear || '',
                projectedMarketSize: opportunity.config.projectedMarketSize || '',
                projectedYear: opportunity.config.projectedYear || '',
                cagr: opportunity.config.cagr || '',
                // Market characteristics
                marketMaturityStage: opportunity.config.marketMaturityStage || '',
                geographicScope: opportunity.config.geographicScope || '',
                industryVertical: opportunity.config.industryVertical || '',
                // Customer metrics
                targetCustomerCount: opportunity.config.targetCustomerCount || '',
                averageRevenuePerUser: opportunity.config.averageRevenuePerUser || '',
                customerAcquisitionCost: opportunity.config.customerAcquisitionCost || '',
                customerLifetimeValue: opportunity.config.customerLifetimeValue || '',
                churnRate: opportunity.config.churnRate || '',
                // Market dynamics
                marketGrowthDrivers: opportunity.config.marketGrowthDrivers || '',
                marketPenetrationRate: opportunity.config.marketPenetrationRate || '',
                competitiveIntensity: opportunity.config.competitiveIntensity || '',
                entryBarriers: opportunity.config.entryBarriers || '',
                // Additional notes
                marketAnalysisNotes: opportunity.config.marketAnalysisNotes || '',
                dataSources: opportunity.config.dataSources || '',
              })}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Metadata Footer */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="text-sm text-gray-500 space-y-1">
            <p>Created: {new Date(opportunity.createdAt).toLocaleString()}</p>
            <p>Last Updated: {new Date(opportunity.updatedAt).toLocaleString()}</p>
            <p className="text-gray-600 mt-2 italic">
              Note: Market configuration enables comprehensive TAM, SAM, SOM analysis, CAGR calculations,
              and customer metric tracking. Additional adoption segment and product milestone configuration
              will be added as the feature develops.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
