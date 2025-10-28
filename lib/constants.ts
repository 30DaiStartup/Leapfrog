import { AdoptionSegment, PlaneType } from '@/types/models/scenario'

/**
 * Color palette based on design specification
 * Dark theme with P0 (garnet red), P1 (orange), P2 (blue)
 */
export const COLORS = {
  background: {
    primary: '#1a1a1a',
    secondary: '#0f0f0f',
  },
  p0: {
    primary: '#8B0000',
    secondary: '#A5292A',
  },
  p1: {
    primary: '#FF8C42',
    secondary: '#F77F00',
  },
  p2: {
    primary: '#4A90E2',
    secondary: '#0077B6',
  },
  string: 'rgba(255, 255, 255, 0.3)',
  text: {
    primary: '#FFFFFF',
    secondary: '#CCCCCC',
  },
  accent: '#1E90FF',
} as const

/**
 * Segment colors (for P1 bands)
 * Using variations of P1 orange with different opacities
 */
export const SEGMENT_COLORS: Record<AdoptionSegment, string> = {
  [AdoptionSegment.Innovators]: '#FF8C42',
  [AdoptionSegment.EarlyAdopters]: '#FF9D5C',
  [AdoptionSegment.EarlyMajority]: '#FFAD76',
  [AdoptionSegment.LateMajority]: '#FFBE90',
  [AdoptionSegment.Laggards]: '#FFCFA4',
}

/**
 * Segment distribution percentages
 * Based on Rogers' diffusion of innovations curve
 */
export const SEGMENT_DISTRIBUTION: Record<AdoptionSegment, number> = {
  [AdoptionSegment.Innovators]: 0.025, // 2.5%
  [AdoptionSegment.EarlyAdopters]: 0.135, // 13.5%
  [AdoptionSegment.EarlyMajority]: 0.34, // 34%
  [AdoptionSegment.LateMajority]: 0.34, // 34%
  [AdoptionSegment.Laggards]: 0.16, // 16%
}

/**
 * Bubble positions in 3D space
 * P1 on right, P2 on left, P0 bottom-right
 */
export const BUBBLE_POSITIONS = {
  [PlaneType.P0]: [4, -3, 0] as [number, number, number],
  [PlaneType.P1]: [5, 0, 0] as [number, number, number],
  [PlaneType.P2]: [-5, 0, 0] as [number, number, number],
} as const

/**
 * Bubble sizes (radius)
 */
export const BUBBLE_SIZES = {
  [PlaneType.P0]: 0.5,
  [PlaneType.P1]: 3,
  [PlaneType.P2]: 0.2, // Starts small, grows
} as const

/**
 * Animation timing constants (in milliseconds)
 */
export const ANIMATION = {
  milestoneDelayMs: 5000, // 5 seconds between milestones
  migrationSpeedMs: 2000, // 2 seconds for a ball to migrate
  pulseAnimationMs: 500, // Milestone pulse animation duration
  tooltipFadeMs: 200, // Tooltip fade in/out
  targetFPS: 60,
  speedOptions: [0.5, 1, 2] as const,
} as const

/**
 * Default agent count based on MVP scope
 */
export const DEFAULT_AGENT_COUNT = 1000

/**
 * Performance thresholds
 */
export const PERFORMANCE = {
  minFPS: 30,
  reducedAgentCount: 500,
  loadTimeoutMs: 5000,
} as const

/**
 * Export settings
 */
export const EXPORT = {
  defaultWidth: 1920,
  defaultHeight: 1080,
  format: 'png' as const,
} as const

/**
 * Segment labels for display
 */
export const SEGMENT_LABELS: Record<AdoptionSegment, string> = {
  [AdoptionSegment.Innovators]: 'Innovators',
  [AdoptionSegment.EarlyAdopters]: 'Early Adopters',
  [AdoptionSegment.EarlyMajority]: 'Early Majority',
  [AdoptionSegment.LateMajority]: 'Late Majority',
  [AdoptionSegment.Laggards]: 'Laggards',
}

/**
 * Plane labels for display
 */
export const PLANE_LABELS: Record<PlaneType, string> = {
  [PlaneType.P0]: 'Legacy Solutions (P0)',
  [PlaneType.P1]: 'Incumbent Alpha (P1)',
  [PlaneType.P2]: 'Leapfrog Innovation (P2)',
}
