import {
  Scenario,
  AdoptionSegment,
  PlaneType,
  ConsumerState,
} from '@/types'
import {
  COLORS,
  SEGMENT_DISTRIBUTION,
  BUBBLE_POSITIONS,
  BUBBLE_SIZES,
  ANIMATION,
  DEFAULT_AGENT_COUNT,
  PLANE_LABELS,
} from '@/lib/constants'

/**
 * Hardcoded MVP scenario: SaaS CRM Transition
 * Shows how an AI-native CRM platform (P2) captures market share
 * from Salesforce (P1) over 5 major product releases
 */
export const hardcodedScenario: Scenario = {
  id: 'saas-crm-ai-transition',
  name: 'AI-Native CRM Market Transition',
  description:
    'This visualization shows how an AI-native CRM platform (P2) captures market share from Salesforce (P1) over 5 major product releases. Each ball represents a customer segment migrating based on adoption patterns. Legacy solutions (P0) persist in specialized niches.',

  totalConsumers: DEFAULT_AGENT_COUNT,

  segmentDistribution: SEGMENT_DISTRIBUTION,

  milestones: [
    {
      id: 1,
      name: 'Milestone 1: MVP Launch',
      description:
        'Basic AI features, targets tech-savvy innovators willing to try new solutions',
      segmentCoverage: {
        [AdoptionSegment.Innovators]: 0.9, // 90% fit for innovators
        [AdoptionSegment.EarlyAdopters]: 0.3,
        [AdoptionSegment.EarlyMajority]: 0.1,
        [AdoptionSegment.LateMajority]: 0.05,
        [AdoptionSegment.Laggards]: 0.02,
      },
      migrationRates: {
        [AdoptionSegment.Innovators]: 0.4, // 40% of innovators move
        [AdoptionSegment.EarlyAdopters]: 0.05,
        [AdoptionSegment.EarlyMajority]: 0.01,
        [AdoptionSegment.LateMajority]: 0.005,
        [AdoptionSegment.Laggards]: 0.001,
      },
      capacity: 250,
    },
    {
      id: 2,
      name: 'Milestone 2: Integration Platform',
      description:
        'Adds integrations with popular tools, appeals to early adopters',
      segmentCoverage: {
        [AdoptionSegment.Innovators]: 0.95,
        [AdoptionSegment.EarlyAdopters]: 0.75, // Strong fit now
        [AdoptionSegment.EarlyMajority]: 0.3,
        [AdoptionSegment.LateMajority]: 0.1,
        [AdoptionSegment.Laggards]: 0.05,
      },
      migrationRates: {
        [AdoptionSegment.Innovators]: 0.35, // More innovators move
        [AdoptionSegment.EarlyAdopters]: 0.25, // Early adopters start moving
        [AdoptionSegment.EarlyMajority]: 0.05,
        [AdoptionSegment.LateMajority]: 0.01,
        [AdoptionSegment.Laggards]: 0.002,
      },
      capacity: 400,
    },
    {
      id: 3,
      name: 'Milestone 3: Enterprise Features',
      description:
        'Security, compliance, and scalability unlock early majority adoption',
      segmentCoverage: {
        [AdoptionSegment.Innovators]: 1.0,
        [AdoptionSegment.EarlyAdopters]: 0.9,
        [AdoptionSegment.EarlyMajority]: 0.7, // Now appeals to majority
        [AdoptionSegment.LateMajority]: 0.3,
        [AdoptionSegment.Laggards]: 0.1,
      },
      migrationRates: {
        [AdoptionSegment.Innovators]: 0.15, // Fewer left to move
        [AdoptionSegment.EarlyAdopters]: 0.4, // Accelerating
        [AdoptionSegment.EarlyMajority]: 0.3, // Majority starts moving
        [AdoptionSegment.LateMajority]: 0.05,
        [AdoptionSegment.Laggards]: 0.005,
      },
      capacity: 600,
    },
    {
      id: 4,
      name: 'Milestone 4: Industry Solutions',
      description:
        'Vertical-specific features and proven ROI attract late majority',
      segmentCoverage: {
        [AdoptionSegment.Innovators]: 1.0,
        [AdoptionSegment.EarlyAdopters]: 1.0,
        [AdoptionSegment.EarlyMajority]: 0.9,
        [AdoptionSegment.LateMajority]: 0.7, // Strong fit for late majority
        [AdoptionSegment.Laggards]: 0.2,
      },
      migrationRates: {
        [AdoptionSegment.Innovators]: 0.08, // Almost all gone
        [AdoptionSegment.EarlyAdopters]: 0.25,
        [AdoptionSegment.EarlyMajority]: 0.4, // Peak migration
        [AdoptionSegment.LateMajority]: 0.3, // Late majority moving
        [AdoptionSegment.Laggards]: 0.02,
      },
      capacity: 850,
    },
    {
      id: 5,
      name: 'Milestone 5: Market Leadership',
      description:
        'Full feature parity + innovation, even laggards start to migrate',
      segmentCoverage: {
        [AdoptionSegment.Innovators]: 1.0,
        [AdoptionSegment.EarlyAdopters]: 1.0,
        [AdoptionSegment.EarlyMajority]: 1.0,
        [AdoptionSegment.LateMajority]: 0.9,
        [AdoptionSegment.Laggards]: 0.5, // Finally appeals to laggards
      },
      migrationRates: {
        [AdoptionSegment.Innovators]: 0.02, // Remnants
        [AdoptionSegment.EarlyAdopters]: 0.05,
        [AdoptionSegment.EarlyMajority]: 0.2,
        [AdoptionSegment.LateMajority]: 0.35, // Catching up
        [AdoptionSegment.Laggards]: 0.15, // Laggards finally move
      },
      capacity: 1000,
    },
  ],

  bubbles: {
    // P0: Legacy CRM solutions (persistent small demand)
    p0: {
      type: PlaneType.P0,
      position: BUBBLE_POSITIONS[PlaneType.P0],
      radius: BUBBLE_SIZES[PlaneType.P0],
      color: COLORS.p0.primary,
      label: PLANE_LABELS[PlaneType.P0],
      consumers: [], // Static, no consumers migrate here in MVP
    },

    // P1: Salesforce (incumbent)
    p1: {
      type: PlaneType.P1,
      position: BUBBLE_POSITIONS[PlaneType.P1],
      radius: BUBBLE_SIZES[PlaneType.P1],
      color: COLORS.p1.primary,
      label: PLANE_LABELS[PlaneType.P1],
      consumers: [], // Will be populated with all consumers initially
    },

    // P2: AI-native CRM (leapfrog innovation)
    p2: {
      type: PlaneType.P2,
      position: BUBBLE_POSITIONS[PlaneType.P2],
      radius: BUBBLE_SIZES[PlaneType.P2], // Starts small
      color: COLORS.p2.primary,
      label: PLANE_LABELS[PlaneType.P2],
      consumers: [], // Empty initially, grows as consumers migrate
    },
  },

  milestoneDelayMs: ANIMATION.milestoneDelayMs,
  migrationSpeedMs: ANIMATION.migrationSpeedMs,
}
