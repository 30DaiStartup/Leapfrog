import { Consumer, AdoptionSegment, ConsumerState, Milestone } from '@/types'
import { BUBBLE_POSITIONS, BUBBLE_SIZES } from '@/lib/constants'
import { PlaneType } from '@/types'

/**
 * Select consumers to migrate for a given milestone
 * Uses segment-aware selection: Innovators move first, Laggards last
 */
export function selectConsumersForMigration(
  consumers: Consumer[],
  milestone: Milestone,
  segmentDistribution: Record<AdoptionSegment, number>
): Consumer[] {
  const consumersToMigrate: Consumer[] = []

  // Get consumers still in P1 for each segment
  const segmentConsumers: Record<AdoptionSegment, Consumer[]> = {
    [AdoptionSegment.Innovators]: [],
    [AdoptionSegment.EarlyAdopters]: [],
    [AdoptionSegment.EarlyMajority]: [],
    [AdoptionSegment.LateMajority]: [],
    [AdoptionSegment.Laggards]: [],
  }

  // Group consumers by segment
  consumers.forEach((consumer) => {
    if (consumer.state === ConsumerState.InP1) {
      segmentConsumers[consumer.segment].push(consumer)
    }
  })

  // For each segment, select consumers based on migration rate
  Object.entries(milestone.migrationRates).forEach(([segment, rate]) => {
    const availableConsumers = segmentConsumers[segment as AdoptionSegment]
    const countToMigrate = Math.floor(availableConsumers.length * rate)

    // Randomly select consumers from this segment
    const shuffled = [...availableConsumers].sort(() => Math.random() - 0.5)
    consumersToMigrate.push(...shuffled.slice(0, countToMigrate))
  })

  return consumersToMigrate
}

/**
 * Calculate target position for a consumer migrating to P2
 * Positions them randomly inside P2 sphere
 */
export function calculateP2TargetPosition(
  currentP2Radius: number
): [number, number, number] {
  const p2Position = BUBBLE_POSITIONS[PlaneType.P2]

  // Random position inside P2 sphere
  const theta = Math.random() * Math.PI * 2
  const phi = Math.acos(2 * Math.random() - 1)
  const r = Math.cbrt(Math.random()) * currentP2Radius * 0.85 // 85% of radius

  const x = p2Position[0] + r * Math.sin(phi) * Math.cos(theta)
  const y = p2Position[1] + r * Math.sin(phi) * Math.sin(theta)
  const z = p2Position[2] + r * Math.cos(phi)

  return [x, y, z]
}

/**
 * Calculate P2 bubble radius based on number of consumers
 * P2 grows as it gains consumers
 */
export function calculateP2Radius(consumerCount: number, totalConsumers: number): number {
  const p1Radius = BUBBLE_SIZES[PlaneType.P1]
  const minRadius = BUBBLE_SIZES[PlaneType.P2]

  // P2 grows proportionally to consumer percentage
  const percentage = consumerCount / totalConsumers
  const targetRadius = minRadius + (p1Radius * percentage * 0.9)

  return Math.max(minRadius, targetRadius)
}

/**
 * Interpolate position along migration path
 * Uses cubic bezier curve for smooth animation
 */
export function lerpPosition(
  start: [number, number, number],
  end: [number, number, number],
  progress: number
): [number, number, number] {
  // Use ease-in-out cubic for smooth acceleration/deceleration
  const t = progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2

  return [
    start[0] + (end[0] - start[0]) * t,
    start[1] + (end[1] - start[1]) * t,
    start[2] + (end[2] - start[2]) * t,
  ]
}

/**
 * Interpolate color along migration path (P1 orange -> P2 blue)
 */
export function lerpColor(
  startColor: string,
  endColor: string,
  progress: number
): string {
  // For simplicity, return start or end color based on progress threshold
  // In production, would use proper color interpolation
  return progress < 0.5 ? startColor : endColor
}

/**
 * Calculate migration curve control point
 * Creates a smooth arc from P1 to P2
 */
export function getMigrationControlPoint(
  start: [number, number, number],
  end: [number, number, number]
): [number, number, number] {
  // Control point for quadratic bezier curve
  // Positioned below the midpoint for a gentle dip
  const midX = (start[0] + end[0]) / 2
  const midY = (start[1] + end[1]) / 2 - 0.8 // Dip below
  const midZ = (start[2] + end[2]) / 2

  return [midX, midY, midZ]
}

/**
 * Get position on migration curve (quadratic bezier)
 */
export function getPositionOnCurve(
  start: [number, number, number],
  end: [number, number, number],
  progress: number
): [number, number, number] {
  const control = getMigrationControlPoint(start, end)

  // Quadratic bezier formula: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
  const t = progress
  const oneMinusT = 1 - t

  const x = oneMinusT * oneMinusT * start[0] + 2 * oneMinusT * t * control[0] + t * t * end[0]
  const y = oneMinusT * oneMinusT * start[1] + 2 * oneMinusT * t * control[1] + t * t * end[1]
  const z = oneMinusT * oneMinusT * start[2] + 2 * oneMinusT * t * control[2] + t * t * end[2]

  return [x, y, z]
}
