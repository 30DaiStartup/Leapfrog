'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useVisualizationStore } from '@/store/useVisualizationStore'
import {
  BUBBLE_POSITIONS,
  BUBBLE_SIZES,
  COLORS,
  SEGMENT_DISTRIBUTION,
  DEFAULT_AGENT_COUNT,
} from '@/lib/constants'
import { AdoptionSegment, PlaneType, Consumer, ConsumerState } from '@/types'
import { useAnimationController } from '@/hooks/useAnimationController'
import { getPositionOnCurve } from '@/lib/algorithms/migration'

/**
 * Initialize consumers with positions inside P1 bubble
 */
function initializeConsumers(count: number): Consumer[] {
  const consumers: Consumer[] = []
  const p1Position = BUBBLE_POSITIONS[PlaneType.P1]
  const p1Radius = BUBBLE_SIZES[PlaneType.P1]

  // Calculate segment counts
  const segmentCounts = {
    [AdoptionSegment.Innovators]: Math.floor(
      count * SEGMENT_DISTRIBUTION[AdoptionSegment.Innovators]
    ),
    [AdoptionSegment.EarlyAdopters]: Math.floor(
      count * SEGMENT_DISTRIBUTION[AdoptionSegment.EarlyAdopters]
    ),
    [AdoptionSegment.EarlyMajority]: Math.floor(
      count * SEGMENT_DISTRIBUTION[AdoptionSegment.EarlyMajority]
    ),
    [AdoptionSegment.LateMajority]: Math.floor(
      count * SEGMENT_DISTRIBUTION[AdoptionSegment.LateMajority]
    ),
    [AdoptionSegment.Laggards]: Math.floor(
      count * SEGMENT_DISTRIBUTION[AdoptionSegment.Laggards]
    ),
  }

  let consumerId = 0

  // Create consumers for each segment
  Object.entries(segmentCounts).forEach(([segment, segmentCount]) => {
    for (let i = 0; i < segmentCount; i++) {
      // Random position inside P1 sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = Math.cbrt(Math.random()) * p1Radius * 0.9 // 90% of radius

      const x = p1Position[0] + r * Math.sin(phi) * Math.cos(theta)
      const y = p1Position[1] + r * Math.sin(phi) * Math.sin(theta)
      const z = p1Position[2] + r * Math.cos(phi)

      consumers.push({
        id: `consumer-${consumerId++}`,
        segment: segment as AdoptionSegment,
        state: ConsumerState.InP1,
        position: [x, y, z],
        migrationProgress: 0,
      })
    }
  })

  return consumers
}

/**
 * Particle system using instanced mesh for performance
 */
export function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const scenario = useVisualizationStore((state) => state.scenario)
  const animation = useVisualizationStore((state) => state.animation)
  const agentCount = useVisualizationStore((state) => state.settings.agentCount)

  // Initialize consumers on first render
  const initialConsumers = useMemo(
    () => initializeConsumers(agentCount),
    [agentCount]
  )

  const { consumers, setConsumers } = useAnimationController()

  // Set initial consumers
  useEffect(() => {
    if (consumers.length === 0) {
      setConsumers(initialConsumers)
    }
  }, [initialConsumers, consumers.length, setConsumers])

  // Setup instanced mesh initially
  useEffect(() => {
    if (!meshRef.current || consumers.length === 0) return

    const dummy = new THREE.Object3D()
    const color = new THREE.Color()

    consumers.forEach((consumer, i) => {
      // Set position
      dummy.position.set(...consumer.position)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)

      // Set initial color (P1 orange)
      color.set(COLORS.p1.primary)
      meshRef.current!.setColorAt(i, color)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  }, [consumers])

  // Animation loop - update positions and colors
  useFrame(() => {
    if (!meshRef.current || consumers.length === 0) return

    const dummy = new THREE.Object3D()
    const color = new THREE.Color()

    consumers.forEach((consumer, i) => {
      let position = consumer.position

      // If migrating, calculate position along curve
      if (consumer.state === ConsumerState.Migrating && consumer.targetPosition) {
        position = getPositionOnCurve(
          consumer.position,
          consumer.targetPosition,
          consumer.migrationProgress
        )

        // Interpolate color from P1 orange to P2 blue
        const progress = consumer.migrationProgress
        color.lerpColors(
          new THREE.Color(COLORS.p1.primary),
          new THREE.Color(COLORS.p2.primary),
          progress
        )
      } else if (consumer.state === ConsumerState.InP2) {
        // Use P2 color
        color.set(COLORS.p2.primary)
      } else {
        // Use P1 color
        color.set(COLORS.p1.primary)
      }

      // Update position
      dummy.position.set(...position)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)

      // Update color
      meshRef.current!.setColorAt(i, color)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  })

  if (!scenario) return null

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, agentCount]}
      frustumCulled={false}
    >
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial />
    </instancedMesh>
  )
}
