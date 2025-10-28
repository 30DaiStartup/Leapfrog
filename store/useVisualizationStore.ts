import { create } from 'zustand'
import { AnimationState, Scenario, VisualizationSettings } from '@/types'
import { ANIMATION, DEFAULT_AGENT_COUNT } from '@/lib/constants'

interface VisualizationStore {
  // Current scenario
  scenario: Scenario | null
  setScenario: (scenario: Scenario) => void

  // Animation state
  animation: AnimationState
  play: () => void
  pause: () => void
  setSpeed: (speed: number) => void
  setCurrentTime: (time: number) => void
  setCurrentMilestone: (milestone: number) => void
  updateFPS: (fps: number) => void

  // Visualization settings
  settings: VisualizationSettings
  updateSettings: (settings: Partial<VisualizationSettings>) => void
  toggleWebGL: () => void
  setAgentCount: (count: number) => void

  // Tooltip state
  hoveredConsumerId: string | null
  setHoveredConsumer: (id: string | null) => void

  hoveredSegment: string | null
  setHoveredSegment: (segment: string | null) => void
}

export const useVisualizationStore = create<VisualizationStore>((set) => ({
  // Initial scenario (null until loaded)
  scenario: null,
  setScenario: (scenario) => set({ scenario }),

  // Initial animation state
  animation: {
    isPlaying: false,
    isPaused: false,
    currentTime: 0,
    currentMilestone: 0,
    speed: 1,
    fps: ANIMATION.targetFPS,
  },

  // Animation controls
  play: () =>
    set((state) => ({
      animation: {
        ...state.animation,
        isPlaying: true,
        isPaused: false,
      },
    })),

  pause: () =>
    set((state) => ({
      animation: {
        ...state.animation,
        isPlaying: false,
        isPaused: true,
      },
    })),

  setSpeed: (speed) =>
    set((state) => ({
      animation: {
        ...state.animation,
        speed,
      },
    })),

  setCurrentTime: (currentTime) =>
    set((state) => ({
      animation: {
        ...state.animation,
        currentTime,
      },
    })),

  setCurrentMilestone: (currentMilestone) =>
    set((state) => ({
      animation: {
        ...state.animation,
        currentMilestone,
      },
    })),

  updateFPS: (fps) =>
    set((state) => ({
      animation: {
        ...state.animation,
        fps,
      },
    })),

  // Initial visualization settings
  settings: {
    agentCount: DEFAULT_AGENT_COUNT,
    useWebGL: true,
    showTooltips: true,
    showMilestoneIndicators: true,
  },

  updateSettings: (newSettings) =>
    set((state) => ({
      settings: {
        ...state.settings,
        ...newSettings,
      },
    })),

  toggleWebGL: () =>
    set((state) => ({
      settings: {
        ...state.settings,
        useWebGL: !state.settings.useWebGL,
      },
    })),

  setAgentCount: (agentCount) =>
    set((state) => ({
      settings: {
        ...state.settings,
        agentCount,
      },
    })),

  // Tooltip state
  hoveredConsumerId: null,
  setHoveredConsumer: (hoveredConsumerId) => set({ hoveredConsumerId }),

  hoveredSegment: null,
  setHoveredSegment: (hoveredSegment) => set({ hoveredSegment }),
}))
