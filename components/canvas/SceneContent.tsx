'use client'

import { Bubbles } from './Bubbles'
import { DemandString } from './DemandString'
import { Particles } from './Particles'
import { useAnimationController } from '@/hooks/useAnimationController'
import { OrbitControls } from '@react-three/drei'

/**
 * Scene content that uses animation controller
 */
export function SceneContent() {
  const { currentP2Radius } = useAnimationController()

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.4} />

      {/* Scene elements */}
      <Bubbles p2Radius={currentP2Radius} />
      <DemandString />
      <Particles />

      {/* Camera controls (disabled for MVP) */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
      />
    </>
  )
}
