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
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center">
        <h1 className="text-sm font-medium text-text-secondary">
          P0-P1-P2 Visualization
        </h1>
        <a
          href="#"
          className="text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          Give Feedback
        </a>
      </header>

      {/* Context Description */}
      <section className="w-full max-w-5xl mx-auto px-6 py-4">
        <p className="text-center text-base text-text-primary">
          {hardcodedScenario.description}
        </p>
      </section>

      {/* Canvas Container - This is where the 3D visualization will go */}
      <section className="flex-1 w-full flex items-center justify-center px-6">
        <div className="w-full h-full max-w-7xl max-h-[70vh] bg-background-dark rounded-lg border border-gray-800">
          <Scene />
        </div>
      </section>

      {/* Controls */}
      <section className="w-full max-w-3xl mx-auto px-6 py-8">
        <Controls />
      </section>

      {/* Footer */}
      <footer className="w-full py-4 px-6 text-center text-xs text-text-secondary">
        <p>MVP Foundation - Canvas components to be implemented</p>
      </footer>
    </main>
  )
}
