'use client';

import { useParams, useRouter } from 'next/navigation';
import { useOpportunityStore } from '@/store/useOpportunityStore';
import { useState, useEffect } from 'react';
import ConfigurationTab from '@/components/opportunity/ConfigurationTab';
import VisualizationTab from '@/components/opportunity/VisualizationTab';

type Tab = 'configuration' | 'visualization';

export default function OpportunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const opportunityId = params.id as string;

  const { getOpportunity, selectOpportunity } = useOpportunityStore();
  const opportunity = getOpportunity(opportunityId);

  const [activeTab, setActiveTab] = useState<Tab>('visualization');

  useEffect(() => {
    // Set this opportunity as selected when the page loads
    selectOpportunity(opportunityId);
  }, [opportunityId, selectOpportunity]);

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Opportunity Not Found</h2>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">{opportunity.name}</h1>
              {opportunity.description && (
                <p className="text-gray-400 text-sm mt-1">{opportunity.description}</p>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('configuration')}
              className={`px-6 py-3 font-medium rounded-t-lg transition-colors ${
                activeTab === 'configuration'
                  ? 'bg-gray-800 text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Configuration
            </button>
            <button
              onClick={() => setActiveTab('visualization')}
              className={`px-6 py-3 font-medium rounded-t-lg transition-colors ${
                activeTab === 'visualization'
                  ? 'bg-gray-800 text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Visualization
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'configuration' && <ConfigurationTab opportunity={opportunity} />}
        {activeTab === 'visualization' && <VisualizationTab opportunity={opportunity} />}
      </div>
    </div>
  );
}
