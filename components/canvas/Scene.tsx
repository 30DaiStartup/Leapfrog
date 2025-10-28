'use client'

import { Canvas } from '@react-three/fiber'
import { SceneContent } from './SceneContent'

/**
 * Main 3D Scene Component
 * This contains the Three.js canvas and all 3D elements using React Three Fiber
 */
export function Scene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
