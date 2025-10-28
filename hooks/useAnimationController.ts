import { useEffect, useRef, useState, useCallback } from 'react'
import { useVisualizationStore } from '@/store/useVisualizationStore'
import { Consumer, ConsumerState } from '@/types'
import {
  selectConsumersForMigration,
  calculateP2TargetPosition,
  calculateP2Radius,
} from '@/lib/algorithms/migration'
import { ANIMATION } from '@/lib/constants'

export function useAnimationController() {
  const scenario = useVisualizationStore((state) => state.scenario)
  const animation = useVisualizationStore((state) => state.animation)
  const setCurrentTime = useVisualizationStore((state) => state.setCurrentTime)
  const setCurrentMilestone = useVisualizationStore(
    (state) => state.setCurrentMilestone
  )

  const [consumers, setConsumers] = useState<Consumer[]>([])
  const [currentP2Radius, setCurrentP2Radius] = useState(0.2)

  const lastFrameTimeRef = useRef<number>(0)
  const milestoneTimesRef = useRef<number[]>([])

  // Initialize milestone times
  useEffect(() => {
    if (!scenario) return

    const times: number[] = []
    let cumulativeTime = 0

    scenario.milestones.forEach((milestone, index) => {
      times.push(cumulativeTime)
      cumulativeTime += scenario.milestoneDelayMs
    })

    milestoneTimesRef.current = times
  }, [scenario])

  // Trigger migration for a milestone
  const triggerMigration = useCallback(
    (milestoneIndex: number) => {
      if (!scenario) return

      const milestone = scenario.milestones[milestoneIndex]
      if (!milestone) return

      // Select consumers to migrate
      const toMigrate = selectConsumersForMigration(
        consumers,
        milestone,
        scenario.segmentDistribution
      )

      // Update consumers with migration targets
      setConsumers((prev) => {
        const updated = [...prev]

        toMigrate.forEach((consumer) => {
          const index = updated.findIndex((c) => c.id === consumer.id)
          if (index !== -1) {
            const targetPosition = calculateP2TargetPosition(currentP2Radius)
            updated[index] = {
              ...updated[index],
              state: ConsumerState.Migrating,
              targetPosition,
              migrationProgress: 0,
              migratedAtMilestone: milestoneIndex,
            }
          }
        })

        return updated
      })

      // Update P2 radius based on new consumer count
      const p2ConsumerCount =
        consumers.filter((c) => c.state === ConsumerState.InP2).length +
        toMigrate.length
      const newRadius = calculateP2Radius(
        p2ConsumerCount,
        scenario.totalConsumers
      )
      setCurrentP2Radius(newRadius)
    },
    [scenario, consumers, currentP2Radius]
  )

  // Animation loop
  useEffect(() => {
    if (!animation.isPlaying || !scenario) return

    let animationFrameId: number

    const animate = (timestamp: number) => {
      if (lastFrameTimeRef.current === 0) {
        lastFrameTimeRef.current = timestamp
      }

      const deltaTime = timestamp - lastFrameTimeRef.current
      lastFrameTimeRef.current = timestamp

      // Update current time (scaled by speed)
      const newTime = animation.currentTime + deltaTime * animation.speed
      setCurrentTime(newTime)

      // Check if we've reached a new milestone
      const currentMilestoneTime = milestoneTimesRef.current[animation.currentMilestone]
      const nextMilestoneTime =
        milestoneTimesRef.current[animation.currentMilestone + 1]

      if (nextMilestoneTime && newTime >= nextMilestoneTime) {
        const nextMilestone = animation.currentMilestone + 1
        setCurrentMilestone(nextMilestone)
        triggerMigration(nextMilestone)
      }

      // Update migrating consumers
      setConsumers((prev) => {
        const updated = [...prev]

        updated.forEach((consumer, index) => {
          if (consumer.state === ConsumerState.Migrating) {
            const progress = Math.min(
              consumer.migrationProgress + deltaTime / ANIMATION.migrationSpeedMs,
              1
            )

            updated[index] = {
              ...consumer,
              migrationProgress: progress,
            }

            // Complete migration if progress reaches 1
            if (progress >= 1) {
              updated[index] = {
                ...updated[index],
                state: ConsumerState.InP2,
                position: consumer.targetPosition || consumer.position,
                migrationProgress: 1,
              }
            }
          }
        })

        return updated
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [
    animation.isPlaying,
    animation.speed,
    animation.currentTime,
    animation.currentMilestone,
    scenario,
    setCurrentTime,
    setCurrentMilestone,
    triggerMigration,
  ])

  return {
    consumers,
    setConsumers,
    currentP2Radius,
    setCurrentP2Radius,
  }
}
