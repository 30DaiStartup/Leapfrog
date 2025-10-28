/**
 * Segment types based on the technology adoption curve
 * Ordered from most to least adventurous
 */
export enum AdoptionSegment {
  Innovators = 'innovators',
  EarlyAdopters = 'early_adopters',
  EarlyMajority = 'early_majority',
  LateMajority = 'late_majority',
  Laggards = 'laggards',
}

/**
 * Plane types representing different market positions
 */
export enum PlaneType {
  P0 = 'p0', // Legacy solutions
  P1 = 'p1', // Current alpha/incumbent
  P2 = 'p2', // Leapfrog innovation
}

/**
 * Consumer/ball state during migration
 */
export enum ConsumerState {
  InP1 = 'in_p1',
  Migrating = 'migrating',
  InP2 = 'in_p2',
}

/**
 * Individual consumer (ball) in the visualization
 */
export interface Consumer {
  id: string
  segment: AdoptionSegment
  state: ConsumerState
  position: [number, number, number] // 3D position
  targetPosition?: [number, number, number]
  migrationProgress: number // 0 to 1
  migratedAtMilestone?: number
}

/**
 * Milestone configuration
 * Each milestone represents a product release or significant update
 */
export interface Milestone {
  id: number
  name: string
  description: string
  // Segment coverage: how valuable P2 is to each segment at this milestone (0-1)
  segmentCoverage: Record<AdoptionSegment, number>
  // Migration rates: percentage of each segment that moves per milestone
  migrationRates: Record<AdoptionSegment, number>
  // Capacity: max consumers P2 can handle at this milestone
  capacity: number
}

/**
 * Bubble configuration for P0, P1, or P2
 */
export interface Bubble {
  type: PlaneType
  position: [number, number, number]
  radius: number
  color: string
  label: string
  consumers: Consumer[]
}

/**
 * Band configuration for P1 segments
 */
export interface Band {
  segment: AdoptionSegment
  yStart: number
  yEnd: number
  color: string
  initialCount: number
  currentCount: number
}

/**
 * Complete scenario configuration
 */
export interface Scenario {
  id: string
  name: string
  description: string
  milestones: Milestone[]
  totalConsumers: number
  // Segment distribution: percentage of total consumers in each segment
  segmentDistribution: Record<AdoptionSegment, number>
  // Bubble configurations
  bubbles: {
    p0?: Bubble // Optional P0 cluster
    p1: Bubble
    p2: Bubble
  }
  // Animation timing
  milestoneDelayMs: number // Time between milestones in ms
  migrationSpeedMs: number // Time for a ball to migrate from P1 to P2
}

/**
 * Animation state
 */
export interface AnimationState {
  isPlaying: boolean
  isPaused: boolean
  currentTime: number // Current time in ms
  currentMilestone: number // 0-based index
  speed: number // 0.5x, 1x, 2x
  fps: number
}

/**
 * Visualization settings
 */
export interface VisualizationSettings {
  agentCount: number // How many balls to render (based on performance)
  useWebGL: boolean
  showTooltips: boolean
  showMilestoneIndicators: boolean
}
