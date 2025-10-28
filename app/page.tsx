'use client'

import { useEffect } from 'react'
import { useVisualizationStore } from '@/store/useVisualizationStore'
import { hardcodedScenario } from '@/lib/data/hardcodedScenario'
import { Scene } from '@/components/canvas/Scene'
import { Controls } from '@/components/ui/Controls'

export default function Home() {
  const setScenario = useVisualizationStore((state) => state.setScenario)

  // Load hardcoded scenario on mount
  useEffect(() => {
    setScenario(hardcodedScenario)
  }, [setScenario])

  return (
    <main className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Compact Header */}
      <header className="w-full py-1 px-4 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-xs font-medium text-text-secondary">
          P0-P1-P2 Market Transition Visualization
        </h1>
        <a
          href="#"
          className="text-xs text-text-secondary hover:text-text-primary transition-colors"
        >
          Feedback
        </a>
      </header>

      {/* Canvas Container - Takes up most of the screen */}
      <section className="flex-1 w-full relative" style={{ minHeight: 0 }}>
        <div className="absolute inset-0 w-full h-full">
          <Scene />
        </div>
      </section>

      {/* Controls - Compact */}
      <section className="w-full px-4 py-2 border-t border-gray-800">
        <Controls />
      </section>
    </main>
  )
}
