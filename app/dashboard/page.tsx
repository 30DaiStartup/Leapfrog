'use client';

import { useRouter } from 'next/navigation';
import { useOpportunityStore } from '@/store/useOpportunityStore';
import { useState } from 'react';
import { Opportunity } from '@/types/models/opportunity';

export default function DashboardPage() {
  const router = useRouter();
  const { opportunities, createOpportunity, deleteOpportunity, selectOpportunity } =
    useOpportunityStore();

  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    marketName: '',
  });

  const handleCreateOpportunity = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.marketName.trim()) {
      alert('Please fill in required fields');
      return;
    }

    const newOpportunity = createOpportunity({
      name: formData.name,
      description: formData.description,
      marketName: formData.marketName,
    });

    setFormData({ name: '', description: '', marketName: '' });
    setIsCreating(false);

    // Navigate to the new opportunity
    selectOpportunity(newOpportunity.id);
    router.push(`/dashboard/${newOpportunity.id}`);
  };

  const handleOpenOpportunity = (opportunity: Opportunity) => {
    selectOpportunity(opportunity.id);
    router.push(`/dashboard/${opportunity.id}`);
  };

  const handleDeleteOpportunity = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    if (confirm('Are you sure you want to delete this opportunity?')) {
      deleteOpportunity(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-white">Market Opportunities Dashboard</h1>
          <p className="text-gray-400 mt-2">
            Track and visualize market transition opportunities
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Create Button */}
        <div className="mb-8">
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            {isCreating ? 'Cancel' : '+ Create New Opportunity'}
          </button>
        </div>

        {/* Create Form */}
        {isCreating && (
          <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Create New Opportunity</h2>
            <form onSubmit={handleCreateOpportunity} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Opportunity Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="e.g., AI-Native CRM Market"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Market Name *
                </label>
                <input
                  type="text"
                  value={formData.marketName}
                  onChange={(e) => setFormData({ ...formData, marketName: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Enterprise CRM"
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
                  placeholder="Brief description of the opportunity..."
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Create Opportunity
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Opportunities Grid */}
        {opportunities.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg mb-4">No opportunities yet</div>
            <p className="text-gray-600">
              Create your first opportunity to start tracking market transitions
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                onClick={() => handleOpenOpportunity(opportunity)}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-white">{opportunity.name}</h3>
                  <button
                    onClick={(e) => handleDeleteOpportunity(e, opportunity.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                    title="Delete opportunity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {opportunity.description && (
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {opportunity.description}
                  </p>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-500">
                    <span className="font-medium mr-2">Market:</span>
                    <span className="text-gray-400">{opportunity.config.marketName}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <span className="font-medium mr-2">Created:</span>
                    <span className="text-gray-400">
                      {new Date(opportunity.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <span className="text-blue-400 text-sm font-medium hover:text-blue-300">
                    Open Opportunity →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
