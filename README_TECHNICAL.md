# Leapfrog - Technical Documentation

## Project Foundation

This is the technical setup documentation for the P0-P1-P2 Demand Plane Visualization MVP.

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **3D Graphics**: Three.js + React Three Fiber (@react-three/fiber)
- **3D Utilities**: @react-three/drei
- **State Management**: Zustand
- **Hosting**: Vercel (planned)

### Project Structure

```
leapfrog/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── canvas/           # 3D visualization components
│   │   └── Scene.tsx     # Main Three.js scene
│   ├── ui/               # UI components
│   │   ├── Controls.tsx  # Play/Pause/Speed/Export controls
│   │   └── Tooltip.tsx   # Hover tooltip component
│   └── visualization/    # Visualization-specific components (TBD)
├── lib/                  # Utilities and data
│   ├── algorithms/       # Migration and animation algorithms (TBD)
│   ├── constants.ts      # Design system constants
│   └── data/
│       └── hardcodedScenario.ts  # MVP scenario data
├── store/                # Zustand stores
│   └── useVisualizationStore.ts  # Main visualization state
├── types/                # TypeScript type definitions
│   ├── index.ts
│   └── models/
│       └── scenario.ts   # Core data models
├── hooks/                # Custom React hooks (TBD)
├── utils/                # Utility functions (TBD)
└── public/               # Static assets
```

### Key Concepts

#### Planes (P0, P1, P2)
- **P0**: Legacy solutions with small persistent demand (garnet red)
- **P1**: Current market alpha/incumbent (orange)
- **P2**: Leapfrog innovation (blue)

#### Adoption Segments
Based on Rogers' Diffusion of Innovations:
1. Innovators (2.5%)
2. Early Adopters (13.5%)
3. Early Majority (34%)
4. Late Majority (34%)
5. Laggards (16%)

#### Milestones
Each milestone represents a product release or major update that changes:
- Segment coverage (how valuable P2 is to each segment)
- Migration rates (percentage of each segment that moves)
- Capacity (max consumers P2 can handle)

### Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### What's Implemented

✅ Project structure and folder organization
✅ Next.js App Router setup
✅ TypeScript configuration
✅ Tailwind CSS with design system colors
✅ Zustand state management store
✅ Type definitions for all data models
✅ Constants for colors, timing, and configuration
✅ Hardcoded SaaS CRM scenario data
✅ Basic UI layout and placeholder components
✅ ESLint and Next.js configuration

### What's Next (MVP Implementation)

The following components need to be implemented for the MVP:

1. **3D Scene Setup**:
   - React Three Fiber Canvas
   - Camera and lighting
   - P0, P1, P2 bubble geometries
   - Demand string visualization

2. **Particle System**:
   - Consumer balls (1000 agents)
   - GPU instancing for performance
   - Color gradient transitions
   - Smooth migration animations

3. **Animation Logic**:
   - Migration selection algorithm (segment-aware)
   - Milestone timing system
   - Play/Pause/Speed controls integration
   - FPS monitoring

4. **Interaction**:
   - Hover tooltips on balls and bands
   - Mouse interaction handlers
   - Touch support (basic)

5. **Export**:
   - Canvas screenshot to PNG
   - Client-side file download
   - 1920×1080 resolution

6. **Performance**:
   - WebGL detection
   - Canvas fallback (2D)
   - Auto-reduce agent count on low FPS

### MVP Timeline

Based on MVPScope.md:
- **Week 1**: Core visualization engine (Scene, bubbles, particles)
- **Week 2**: Animation logic (migration algorithm, milestones)
- **Week 3**: Interactivity & fallback (tooltips, Canvas 2D)
- **Week 4**: Polish & export (PNG export, testing, deploy)

### Color Palette

From design specification:
- Background: `#1a1a1a`
- P0: `#8B0000` (garnet red)
- P1: `#FF8C42` (orange)
- P2: `#4A90E2` (blue)
- String: `rgba(255, 255, 255, 0.3)`
- Text Primary: `#FFFFFF`
- Text Secondary: `#CCCCCC`

### Performance Targets

- **FPS**: 60 FPS on modern laptops
- **Load Time**: <5 seconds on fast connection
- **Agent Count**: 1000 balls (reduce to 500 if needed)
- **Export Time**: <15 seconds for PNG

### Related Documentation

- [README.md](./README.md) - Original concept description
- [PRD.md](./PRD.md) - Full product requirements
- [designspec.md](./designspec.md) - Design specification
- [MVPScope.md](./MVPScope.md) - MVP scope definition
- [backlog.md](./backlog.md) - Product backlog

### Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Notes

- This is the MVP foundation setup
- No Firebase, authentication, or database yet (v2 features)
- No scenario editing (hardcoded for MVP)
- Desktop-first (mobile is low priority)
- Invite-only demo (no analytics yet)

---

**Last Updated**: 2025-10-28
**Status**: Foundation Complete ✅ | Ready for MVP Implementation
