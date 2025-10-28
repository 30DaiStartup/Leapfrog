'use client'

import { useEffect } from 'react'
import { useVisualizationStore } from '@/store/useVisualizationStore'
import { hardcodedScenario } from '@/lib/data/hardcodedScenario'

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
        <div className="w-full h-full max-w-7xl max-h-[70vh] bg-background-dark rounded-lg border border-gray-800 flex items-center justify-center">
          <p className="text-text-secondary">
            Canvas visualization will be rendered here
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="w-full max-w-3xl mx-auto px-6 py-8 flex flex-col items-center gap-4">
        {/* Play/Pause Button - Placeholder */}
        <button className="px-8 py-3 bg-p2 hover:bg-p2-light text-white rounded-lg font-medium transition-colors">
          Play
        </button>

        {/* Speed Control - Placeholder */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-text-secondary">Speed:</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-gray-700 rounded hover:border-gray-500 transition-colors">
              0.5x
            </button>
            <button className="px-3 py-1 text-sm border border-gray-700 rounded hover:border-gray-500 transition-colors bg-gray-800">
              1x
            </button>
            <button className="px-3 py-1 text-sm border border-gray-700 rounded hover:border-gray-500 transition-colors">
              2x
            </button>
          </div>
        </div>

        {/* Export Button - Placeholder */}
        <button className="px-6 py-2 border border-gray-700 text-text-secondary hover:border-gray-500 hover:text-text-primary rounded-lg transition-colors">
          Export PNG
        </button>
      </section>

      {/* Footer */}
      <footer className="w-full py-4 px-6 text-center text-xs text-text-secondary">
        <p>MVP Foundation - Canvas components to be implemented</p>
      </footer>
    </main>
  )
}
