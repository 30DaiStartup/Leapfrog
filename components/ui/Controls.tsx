'use client'

import { useVisualizationStore } from '@/store/useVisualizationStore'
import { ANIMATION } from '@/lib/constants'

/**
 * Control panel for play/pause, speed, and export
 */
export function Controls() {
  const { animation, play, pause, setSpeed } = useVisualizationStore()

  const handlePlayPause = () => {
    if (animation.isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const handleSpeedChange = (speed: number) => {
    setSpeed(speed)
  }

  const handleExport = () => {
    // Export functionality will be implemented later
    console.log('Export PNG clicked')
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Play/Pause Button */}
      <button
        onClick={handlePlayPause}
        className="px-8 py-3 bg-p2 hover:bg-p2-light text-white rounded-lg font-medium transition-colors"
      >
        {animation.isPlaying ? 'Pause' : 'Play'}
      </button>

      {/* Speed Control */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-text-secondary">Speed:</span>
        <div className="flex gap-2">
          {ANIMATION.speedOptions.map((speed) => (
            <button
              key={speed}
              onClick={() => handleSpeedChange(speed)}
              className={`px-3 py-1 text-sm border rounded transition-colors ${
                animation.speed === speed
                  ? 'border-gray-500 bg-gray-800'
                  : 'border-gray-700 hover:border-gray-500'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={handleExport}
        className="px-6 py-2 border border-gray-700 text-text-secondary hover:border-gray-500 hover:text-text-primary rounded-lg transition-colors"
      >
        Export PNG
      </button>
    </div>
  )
}
