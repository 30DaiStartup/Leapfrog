'use client'

import { useRef } from 'react'
import { Mesh } from 'three'
import { useVisualizationStore } from '@/store/useVisualizationStore'
import { BUBBLE_POSITIONS, BUBBLE_SIZES, COLORS } from '@/lib/constants'
import { PlaneType } from '@/types'

/**
 * Single Bubble component (P0, P1, or P2)
 */
function Bubble({
  type,
  position,
  radius,
  color,
  label,
}: {
  type: PlaneType
  position: [number, number, number]
  radius: number
  color: string
  label: string
}) {
  const meshRef = useRef<Mesh>(null)

  return (
    <group position={position}>
      {/* Bubble sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
          wireframe={false}
        />
      </mesh>

      {/* Bubble wireframe outline */}
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color={color} wireframe opacity={0.5} transparent />
      </mesh>

      {/* Label (we'll add HTML overlay later for proper text) */}
    </group>
  )
}

/**
 * P1 Bubble with 5 segment bands
 */
function P1BubbleWithBands() {
  const scenario = useVisualizationStore((state) => state.scenario)
  const position = BUBBLE_POSITIONS[PlaneType.P1]
  const radius = BUBBLE_SIZES[PlaneType.P1]
  const color = COLORS.p1.primary

  // Band heights (5 bands stacked vertically)
  const bandHeight = (radius * 2) / 5
  const bands = [
    { segment: 'Laggards', yOffset: radius - bandHeight / 2, opacity: 0.2 },
    { segment: 'Late Majority', yOffset: radius - (bandHeight * 3) / 2, opacity: 0.3 },
    { segment: 'Early Majority', yOffset: radius - (bandHeight * 5) / 2, opacity: 0.4 },
    { segment: 'Early Adopters', yOffset: -radius + (bandHeight * 3) / 2, opacity: 0.5 },
    { segment: 'Innovators', yOffset: -radius + bandHeight / 2, opacity: 0.6 },
  ]

  return (
    <group position={position}>
      {/* Main bubble sphere */}
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.2}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe outline */}
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color={color} wireframe opacity={0.4} transparent />
      </mesh>

      {/* Segment bands (horizontal lines) */}
      {bands.map((band, index) => (
        <group key={index} position={[0, band.yOffset, 0]}>
          {/* Band divider line */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, radius * 2, 16]} />
            <meshBasicMaterial color={color} opacity={band.opacity} transparent />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/**
 * All three bubbles (P0, P1, P2)
 */
export function Bubbles({ p2Radius }: { p2Radius?: number }) {
  const scenario = useVisualizationStore((state) => state.scenario)

  if (!scenario) return null

  const currentP2Radius = p2Radius || BUBBLE_SIZES[PlaneType.P2]

  return (
    <group>
      {/* P0 - Legacy solutions (small, bottom-right) */}
      {scenario.bubbles.p0 && (
        <Bubble
          type={PlaneType.P0}
          position={BUBBLE_POSITIONS[PlaneType.P0]}
          radius={BUBBLE_SIZES[PlaneType.P0]}
          color={COLORS.p0.primary}
          label="Legacy Solutions (P0)"
        />
      )}

      {/* P1 - Incumbent with bands */}
      <P1BubbleWithBands />

      {/* P2 - Leapfrog innovation (starts small, grows) */}
      <Bubble
        type={PlaneType.P2}
        position={BUBBLE_POSITIONS[PlaneType.P2]}
        radius={currentP2Radius}
        color={COLORS.p2.primary}
        label="Leapfrog Innovation (P2)"
      />
    </group>
  )
}
