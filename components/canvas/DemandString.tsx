'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { BUBBLE_POSITIONS, COLORS } from '@/lib/constants'
import { PlaneType } from '@/types'

/**
 * DemandString - The connecting line/rope between P1 and P2
 * Balls will migrate along this path
 */
export function DemandString() {
  const p1Position = BUBBLE_POSITIONS[PlaneType.P1]
  const p2Position = BUBBLE_POSITIONS[PlaneType.P2]

  // Create a curved path from P1 to P2
  const curve = useMemo(() => {
    // Create a gentle curve (catenary-like) between P1 and P2
    const start = new THREE.Vector3(...p1Position)
    const end = new THREE.Vector3(...p2Position)
    const midpoint = new THREE.Vector3(
      (start.x + end.x) / 2,
      (start.y + end.y) / 2 - 0.5, // Slight dip
      (start.z + end.z) / 2
    )

    // Use QuadraticBezierCurve3 for smooth curve
    return new THREE.QuadraticBezierCurve3(start, midpoint, end)
  }, [p1Position, p2Position])

  // Generate points along the curve
  const points = useMemo(() => curve.getPoints(100), [curve])

  // Create tube geometry along the curve
  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 100, 0.03, 8, false)
  }, [curve])

  return (
    <group>
      {/* Main string as a tube */}
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial
          color={COLORS.string}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Optional: Add a glowing effect */}
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial
          color={COLORS.accent}
          transparent
          opacity={0.1}
          emissive={COLORS.accent}
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  )
}
