'use client';

import { useEffect } from 'react';
import { useVisualizationStore } from '@/store/useVisualizationStore';
import { Opportunity } from '@/types/models/opportunity';
import { Scene } from '@/components/canvas/Scene';
import { Controls } from '@/components/ui/Controls';

interface VisualizationTabProps {
  opportunity: Opportunity;
}

export default function VisualizationTab({ opportunity }: VisualizationTabProps) {
  const setScenario = useVisualizationStore((state) => state.setScenario);

  // Load the opportunity's scenario when the tab is rendered
  useEffect(() => {
    if (opportunity.scenario) {
      setScenario(opportunity.scenario);
    }
  }, [opportunity.scenario, setScenario]);

  if (!opportunity.scenario) {
    return (
      <div className="px-6 py-8">
        <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">No Scenario Data</h3>
          <p className="text-gray-400">
            This opportunity does not have a scenario configured yet. Please configure the market
            details in the Configuration tab first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col">
      {/* Visualization Header */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Market Transition Visualization</h2>
        <p className="text-sm text-gray-400 mt-1">
          {opportunity.scenario.name || 'Interactive 3D visualization of market dynamics'}
        </p>
      </div>

      {/* Canvas Container - Takes up most of the available space */}
      <section className="flex-1 w-full relative" style={{ minHeight: 0 }}>
        <div className="absolute inset-0 w-full h-full">
          <Scene />
        </div>
      </section>

      {/* Controls - Compact */}
      <section className="w-full px-6 py-3 border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <Controls />
      </section>
    </div>
  );
}
