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
                  Total Addressable Market (TAM) Size
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
              Note: This is a shell configuration page. Additional configuration options will be
              added as the feature develops.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
