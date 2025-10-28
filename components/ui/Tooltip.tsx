'use client'

import { useVisualizationStore } from '@/store/useVisualizationStore'

/**
 * Tooltip component for displaying information on hover
 * Shows segment type, migration state, or band statistics
 */
export function Tooltip() {
  const { hoveredConsumerId, hoveredSegment } = useVisualizationStore()

  if (!hoveredConsumerId && !hoveredSegment) {
    return null
  }

  return (
    <div className="fixed pointer-events-none z-50">
      <div className="bg-black bg-opacity-95 text-white text-sm px-3 py-2 rounded shadow-lg">
        {hoveredConsumerId && <p>Consumer: {hoveredConsumerId}</p>}
        {hoveredSegment && <p>Segment: {hoveredSegment}</p>}
      </div>
    </div>
  )
}
