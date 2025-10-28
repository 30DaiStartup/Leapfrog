'use client'

import { useRef } from 'react'
import { Mesh } from 'three'
import { Html } from '@react-three/drei'
import { useVisualizationStore } from '@/store/useVisualizationStore'
import { BUBBLE_POSITIONS, BUBBLE_SIZES, COLORS, SEGMENT_COLORS } from '@/lib/constants'
import { PlaneType, AdoptionSegment } from '@/types'

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
      {/* Bubble sphere - clean, no wireframe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.2}
          wireframe={false}
        />
      </mesh>
    </group>
  )
}

/**
 * P1 Bubble with 5 segment bands
 * Innovators at top, Laggards at bottom
 */
function P1BubbleWithBands() {
  const scenario = useVisualizationStore((state) => state.scenario)
  const position = BUBBLE_POSITIONS[PlaneType.P1]
  const radius = BUBBLE_SIZES[PlaneType.P1]
  const color = COLORS.p1.primary

  // Band heights (5 bands stacked vertically)
  // FLIPPED: Innovators at top, Laggards at bottom
  const bandHeight = (radius * 2) / 5
  const bands = [
    {
      segment: AdoptionSegment.Innovators,
      label: 'Innovators',
      yOffset: radius - bandHeight / 2,
      color: SEGMENT_COLORS[AdoptionSegment.Innovators]
    },
    {
      segment: AdoptionSegment.EarlyAdopters,
      label: 'Early Adopters',
      yOffset: radius - (bandHeight * 3) / 2,
      color: SEGMENT_COLORS[AdoptionSegment.EarlyAdopters]
    },
    {
      segment: AdoptionSegment.EarlyMajority,
      label: 'Early Majority',
      yOffset: 0,
      color: SEGMENT_COLORS[AdoptionSegment.EarlyMajority]
    },
    {
      segment: AdoptionSegment.LateMajority,
      label: 'Late Majority',
      yOffset: -radius + (bandHeight * 3) / 2,
      color: SEGMENT_COLORS[AdoptionSegment.LateMajority]
    },
    {
      segment: AdoptionSegment.Laggards,
      label: 'Laggards',
      yOffset: -radius + bandHeight / 2,
      color: SEGMENT_COLORS[AdoptionSegment.Laggards]
    },
  ]

  return (
    <group position={position}>
      {/* Main bubble sphere - very subtle base */}
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.08}
          wireframe={false}
        />
      </mesh>

      {/* Colored band segments - each band has a slightly different tint */}
      {bands.map((band, index) => {
        const nextBand = bands[index + 1]
        const yStart = band.yOffset - bandHeight / 2
        const yEnd = nextBand ? nextBand.yOffset + bandHeight / 2 : band.yOffset + bandHeight / 2
        const bandCenterY = (yStart + yEnd) / 2
        const segmentHeight = Math.abs(yEnd - yStart)

        return (
          <mesh key={`segment-${index}`} position={[0, bandCenterY, 0]}>
            <cylinderGeometry args={[radius * 0.95, radius * 0.95, segmentHeight, 32]} />
            <meshStandardMaterial
              color={band.color}
              transparent
              opacity={0.12}
              wireframe={false}
            />
          </mesh>
        )
      })}

      {/* Divider lines extending all the way through */}
      {bands.slice(0, -1).map((band, index) => (
        <group key={index} position={[0, band.yOffset - bandHeight / 2, 0]}>
          {/* Horizontal divider line - extends beyond sphere */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.015, 0.015, radius * 2.4, 16]} />
            <meshBasicMaterial color={color} opacity={0.4} transparent />
          </mesh>
        </group>
      ))}

      {/* Labels on the right side */}
      {bands.map((band, index) => (
        <Html
          key={`label-${index}`}
          position={[radius + 0.5, band.yOffset, 0]}
          center
          style={{
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: '500',
            userSelect: 'none',
            pointerEvents: 'none',
            textAlign: 'left',
            whiteSpace: 'nowrap',
          }}
        >
          {band.label}
        </Html>
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
