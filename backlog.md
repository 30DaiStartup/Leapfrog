# Product Backlog: P0-P1-P2 Demand Plane Visualization

**Last Updated**: 2025-10-28
**Document Owner**: Product Team
**Target Audience**: AI coding agents, developers, product managers

---

## Naming and Numbering Convention

Each backlog item follows this structure: `[PHASE]-[CATEGORY]-[NUMBER]`

### Phase Indicators
- **MVP**: Minimum Viable Product (currently in development)
- **NT**: Near-Term (1-2 releases after MVP)
- **MT**: Mid-Term (3-6 months out)
- **LT**: Long-Term / Exploratory (6+ months or uncertain)
- **TD**: Technical Debt / Infrastructure
- **PL**: Parking Lot (good ideas, wrong time)
- **UF**: User Feedback Themes (to be prioritized based on feedback)

### Category Codes
- **VIS**: Visualization features and animation improvements
- **SCN**: Scenario management (creation, editing, saving)
- **EXP**: Export and sharing features
- **AUTH**: Authentication and user account management
- **UI**: User interface and controls
- **ACC**: Accessibility features
- **PERF**: Performance optimizations
- **INT**: Integrations with external services
- **COL**: Collaboration features
- **MON**: Monitoring, analytics, and telemetry
- **DOC**: Documentation and onboarding

### Example
`NT-SCN-001: Scenario Editor with Milestone Configuration` means:
- Near-Term feature
- Scenario management category
- First item in that category/phase

---

## MVP Items (In Progress)

These are the current scope items from MVPScope.md. They are being actively developed and should be completed in the initial 3-4 week sprint.

### Core Features
- **MVP-VIS-001**: Basic Playback Visualization (Play/Pause/Speed controls, 1000 balls, 5 milestones)
- **MVP-VIS-002**: Three-bubble layout (P0 garnet red, P1 orange with 5 bands, P2 blue)
- **MVP-VIS-003**: Segment-aware migration logic (Innovators first, Laggards last)
- **MVP-VIS-004**: Ball particle system with color gradient transition (orange→blue)
- **MVP-VIS-005**: Visible demand string connecting P1 to P2
- **MVP-VIS-006**: P1 band depletion visualization (5 segments per adoption curve)
- **MVP-VIS-007**: P2 growth animation as balls arrive
- **MVP-VIS-008**: Five milestone pulses with visual beats

### Interaction
- **MVP-UI-001**: Hover tooltips for balls (segment type, migration state)
- **MVP-UI-002**: Hover tooltips for P1 bands (band name, percentage remaining)
- **MVP-UI-003**: Speed control slider (0.5x, 1x, 2x)
- **MVP-UI-004**: Dark theme with clean color palette

### Data & Configuration
- **MVP-SCN-001**: Single pre-configured hardcoded scenario (SaaS CRM example)
- **MVP-SCN-002**: Hardcoded milestone configuration with segment coverage
- **MVP-SCN-003**: Static P0 cluster positioning (bottom-right)

### Export & Sharing
- **MVP-EXP-001**: PNG screenshot export (1920×1080, slide-deck ready)

### Technical Foundation
- **MVP-PERF-001**: WebGL rendering with Three.js/React-Three-Fiber
- **MVP-PERF-002**: Canvas fallback for non-WebGL browsers
- **MVP-PERF-003**: 60 FPS animation target on modern laptops
- **MVP-PERF-004**: Load time <5 seconds on fast connection
- **MVP-PERF-005**: Auto-detection of GPU capabilities

### Deployment
- **MVP-INT-001**: Next.js app with Vercel deployment
- **MVP-INT-002**: Basic Vercel analytics (page views, load time)
- **MVP-DOC-001**: Two-sentence scenario context text
- **MVP-DOC-002**: Google Form for user feedback collection

---

## Near-Term (Next 1-2 releases after MVP)

Features that are natural next steps once MVP proves out. These unlock the core user workflow of creating and customizing scenarios.

### Scenario Management
- **NT-SCN-001: Scenario Editor with Milestone Configuration**
  - Description: Build form interface to create/edit 5 milestones with value coverage, capacity, SAM/SOM gating
  - Why it matters: Users want to customize inputs for their specific market scenarios (this is the #1 expected request)
  - Estimated impact: **High** - Core feature request, blocks real usage
  - Estimated effort: **High** - Complex forms, validation, preview mode
  - Dependencies: MVP validation that core visualization is comprehensible
  - When to tackle: When ≥60% of users ask "can I change the inputs?" in feedback
  - Open questions: What defaults/templates help users start? How much guidance for milestone configuration?

- **NT-SCN-002: Multiple Scenario Support (Save/Load)**
  - Description: Allow users to create, name, save multiple scenarios; browse saved scenarios
  - Why it matters: Users will want to compare different strategies (optimistic vs pessimistic, different milestone timing)
  - Estimated impact: **High** - Enables repeat usage, experimentation
  - Estimated effort: **Medium** - Firestore integration, list view, basic CRUD
  - Dependencies: NT-SCN-001 (editor must exist first)
  - When to tackle: Immediately after scenario editor ships
  - Open questions: Version history? Duplicate scenario feature? Folders/tags for organization?

- **NT-SCN-003: Segment Mix Configuration**
  - Description: Let users adjust population size and innovator/early-adopter/majority/laggard percentages
  - Why it matters: Different industries have different adoption curves (B2B vs consumer, regulated vs unregulated)
  - Estimated impact: **Medium** - Adds realism for specific industries
  - Estimated effort: **Low** - Simple sliders or number inputs
  - Dependencies: NT-SCN-001
  - When to tackle: After save/load is stable
  - Open questions: Industry presets (SaaS defaults vs hardware defaults)?

- **NT-SCN-004: Scenario Templates by Industry**
  - Description: Pre-built scenario templates (SaaS, EV, Healthcare, Fintech) with realistic defaults
  - Why it matters: Reduces onboarding friction, helps users see "this works for my domain"
  - Estimated impact: **Medium** - Accelerates adoption in new verticals
  - Estimated effort: **Low** - Content work (research realistic values), minimal code
  - Dependencies: NT-SCN-001, NT-SCN-002
  - When to tackle: After 3-5 different industries represented in user base
  - Open questions: How many templates? User-submitted templates (community)?

### Export & Sharing
- **NT-EXP-001: GIF Export (10-second loop)**
  - Description: Capture short looping animation as GIF for embedding in docs/emails
  - Why it matters: More shareable than static PNG, works everywhere (unlike MP4 in some contexts)
  - Estimated impact: **High** - Users want animated exports (likely top request)
  - Estimated effort: **Medium** - Client-side GIF encoding, file size optimization
  - Dependencies: MVP validation that users export/share frequently
  - When to tackle: When ≥40% of users export PNG (indicates export is valued)
  - Open questions: Max duration? Resolution trade-offs? Server rendering needed?

- **NT-EXP-002: Shareable Read-Only URLs**
  - Description: Generate public URL with scenario params embedded (read-only view, no editing)
  - Why it matters: Users want to share live interactive version with stakeholders (better than image)
  - Estimated impact: **High** - Viral sharing, shows product value to non-users
  - Estimated effort: **Low** - URL param encoding/decoding
  - Dependencies: NT-SCN-002 (scenarios must be saveable)
  - When to tackle: Same release as scenario saving
  - Open questions: Privacy controls (public vs password-protected)? Expiration?

- **NT-EXP-003: Custom Export Resolution Options**
  - Description: Let users choose export size (1080×1080 social, 3840×2160 4K, custom)
  - Why it matters: Different contexts need different aspect ratios (Twitter square, print high-res)
  - Estimated impact: **Low** - Nice-to-have for power users
  - Estimated effort: **Low** - Dropdown in export dialog
  - Dependencies: NT-EXP-001
  - When to tackle: After GIF export proves valuable
  - Open questions: Presets vs freeform dimensions?

### UI Improvements
- **NT-UI-001: Scrub Timeline / Seek Control**
  - Description: Allow user to drag timeline slider to jump to specific moment (not just Play/Pause)
  - Why it matters: Users want to quickly jump to Milestone 3 without replaying from start
  - Estimated impact: **Medium** - Quality of life for exploration
  - Estimated effort: **Medium** - Requires stateful simulation (can jump to any point)
  - Dependencies: MVP validation that users frequently pause/resume
  - When to tackle: When users report frustration with "can't go back"
  - Open questions: Frame-accurate seeking? Animation state caching?

- **NT-UI-002: Keyboard Shortcuts**
  - Description: Spacebar = Play/Pause, Arrow keys = scrub, E = Export, etc.
  - Why it matters: Power users want efficiency (common for video/animation tools)
  - Estimated impact: **Low** - Small UX polish for engaged users
  - Estimated effort: **Low** - Event listeners, keyboard mapping
  - Dependencies: NT-UI-001 (scrubbing must exist for arrow keys)
  - When to tackle: Low-priority polish after core features
  - Open questions: Customizable shortcuts?

- **NT-UI-003: Fullscreen Mode**
  - Description: Expand canvas to fill entire screen (hide browser chrome)
  - Why it matters: Presentation mode, immersive exploration
  - Estimated impact: **Low** - Nice for demos but not critical
  - Estimated effort: **Low** - Fullscreen API is standard
  - Dependencies: None
  - When to tackle: Quick win, can do anytime
  - Open questions: Auto-hide controls in fullscreen?

### Documentation & Onboarding
- **NT-DOC-001: Interactive Tutorial (First-Run)**
  - Description: 30-second guided tour on first visit (highlight Play button, show tooltip example)
  - Why it matters: Reduces confusion for new users (some may not intuitively hover)
  - Estimated impact: **Medium** - Improves first-run comprehension
  - Estimated effort: **Medium** - Overlay UI, state management for "don't show again"
  - Dependencies: MVP validation of common confusion points
  - When to tackle: After analyzing first 20 users' behavior
  - Open questions: Skippable? Replay option?

- **NT-DOC-002: Embedded Help / Concept Explainer**
  - Description: "What is P0/P1/P2?" link that opens modal with theory overview
  - Why it matters: Users unfamiliar with framework need context
  - Estimated impact: **Low** - Most users come with context already
  - Estimated effort: **Low** - Modal component, markdown content
  - Dependencies: None
  - When to tackle: After launch when new users arrive without context
  - Open questions: Video explainer vs text?

---

## Mid-Term (3-6 months out)

Features that scale or expand the product beyond single-user static scenarios.

### Advanced Simulation
- **MT-VIS-001: Control Factor Sliders (Dominion/Contingency/Influence)**
  - Description: Add sliders for each milestone to adjust control factors; see migration rates change
  - Why it matters: Unlocks "what-if" analysis (core theory feature from PRD)
  - Estimated impact: **High** - Differentiates from simple animation, adds strategic value
  - Estimated effort: **High** - Requires defining mathematical model for control factors, real-time simulation adjustments
  - Dependencies: NT-SCN-001 (scenario editor), user validation that baseline scenarios are useful
  - When to tackle: When users ask "can I simulate delays/accelerations?"
  - Open questions: How do control factors map to migration rate formulas? Presets for common scenarios (regulatory delay, lighthouse customer)?

- **MT-VIS-002: Multiple P2s (Competing Innovations)**
  - Description: Visualize 2-3 competing P2s pulling from same P1 (split flows, parallel strings)
  - Why it matters: Real markets often have competing new solutions (e.g., EV brands competing for ICE market share)
  - Estimated impact: **Medium** - Valuable for competitive intelligence use case
  - Estimated effort: **High** - Complex algorithm (how to split ball flows), visual clarity challenges
  - Dependencies: MT-VIS-001 (must understand single P2 dynamics first)
  - When to tackle: When competitive scenarios emerge as top request (likely in CI/corp strategy verticals)
  - Open questions: How to handle 3+ P2s without visual clutter? User defines split logic or algorithm decides?

- **MT-VIS-003: Dynamic Agent Count (Performance Scaling)**
  - Description: Auto-adjust ball count based on device capability (500-10k agents), expose manual control
  - Why it matters: Better performance on weak machines, more realism on powerful desktops
  - Estimated impact: **Medium** - Expands device compatibility, improves experience
  - Estimated effort: **Medium** - FPS monitoring, adaptive rendering
  - Dependencies: TD-PERF-001 (performance profiling)
  - When to tackle: After identifying performance bottlenecks in real usage
  - Open questions: User override? Show "detail level" slider?

- **MT-VIS-004: P1 Perforation Physics (Holes in Bubble)**
  - Description: Show empty "seats" in P1 as balls leave (not just band fading)
  - Why it matters: More intuitive visualization of P1 losing share (per original concept)
  - Estimated impact: **Low** - Visual polish, not critical to comprehension
  - Estimated effort: **High** - Physics collision detection, rendering complexity
  - Dependencies: MVP validation that current band fading is insufficient
  - When to tackle: Only if users report "I don't see P1 shrinking"
  - Open questions: Performance impact? Alternative simpler approach (grid layout instead of physics)?

### User Accounts & Authentication
- **MT-AUTH-001: Firebase Authentication (Google OAuth)**
  - Description: Allow users to sign in with Google, persist identity
  - Why it matters: Required for saving scenarios, accessing saved work across devices
  - Estimated impact: **High** - Prerequisite for multi-session usage
  - Estimated effort: **Medium** - Standard Firebase Auth setup
  - Dependencies: NT-SCN-002 (scenario saving must exist to justify auth)
  - When to tackle: Same release as scenario saving goes live
  - Open questions: Email/password option? SSO for enterprise?

- **MT-AUTH-002: User Profile & Preferences**
  - Description: Basic profile page (name, email, saved scenarios count, default speed preference)
  - Why it matters: Users expect account management basics
  - Estimated impact: **Low** - Table stakes for auth product
  - Estimated effort: **Low** - Simple CRUD, Firestore user collection
  - Dependencies: MT-AUTH-001
  - When to tackle: Immediately after auth ships
  - Open questions: Avatar support? Theme preferences?

- **MT-AUTH-003: Firestore Security Rules & Data Scoping**
  - Description: Ensure users can only read/write their own scenarios, admin access for support
  - Why it matters: Security, privacy, data integrity
  - Estimated impact: **High** - Critical for production auth
  - Estimated effort: **Medium** - Rule writing, testing, emulator validation
  - Dependencies: MT-AUTH-001
  - When to tackle: Same release as auth (security prerequisite)
  - Open questions: Role-based access (owner/editor/viewer for future sharing)?

### AI & Explainability
- **MT-INT-001: AI-Generated Milestone Narratives**
  - Description: Use Claude/Gemini to auto-generate text explaining "why Milestone 3 unlocked Early Majority"
  - Why it matters: Helps users understand causality, makes exports more presentable
  - Estimated impact: **Medium** - Reduces cognitive load, aids storytelling
  - Estimated effort: **Medium** - API integration, prompt engineering, caching
  - Dependencies: MT-VIS-001 (control factors must exist to generate meaningful narratives)
  - When to tackle: After control factors ship and users ask "why did this happen?"
  - Open questions: Real-time vs pre-generated? Cost/quota management? User edits to AI text?

- **MT-INT-002: Explainability Overlay (Pop-ups on Milestones)**
  - Description: Show brief pop-up callouts during animation explaining key transitions
  - Why it matters: Guided storytelling, reduces need for external explanation
  - Estimated impact: **Medium** - Helps onboarding and shareability
  - Estimated effort: **Low** - Timed overlays, dismissible
  - Dependencies: MT-INT-001 (needs content to display)
  - When to tackle: Same release as AI narratives
  - Open questions: Skippable? Replay option? User-authored annotations?

### Mobile & Accessibility
- **MT-UI-001: Tablet Optimization (iPad/Android)**
  - Description: Responsive layout for tablets, touch controls, reduced agent count
  - Why it matters: Enables demo in meetings, on-the-go viewing
  - Estimated impact: **Medium** - Expands use cases (presentations, travel)
  - Estimated effort: **Medium** - Touch event handling, layout adjustments
  - Dependencies: None (can do anytime)
  - When to tackle: When analytics show >10% tablet traffic
  - Open questions: Edit scenarios on tablet or view-only?

- **MT-UI-002: Mobile View (Phone Portrait)**
  - Description: Cramped but functional layout for phones, simplified controls
  - Why it matters: Basic access for users who click links on mobile
  - Estimated impact: **Low** - Rare use case per MVP assumptions
  - Estimated effort: **Medium** - Vertical layout design, performance challenges
  - Dependencies: MT-UI-001 (tablet first, then scale down)
  - When to tackle: Only if mobile traffic exceeds 20%
  - Open questions: Separate mobile-optimized visualization style?

- **MT-ACC-001: WCAG AA Color Contrast Compliance**
  - Description: Audit all text/UI for 4.5:1 contrast, use patterns not just color for P0/P1/P2
  - Why it matters: Legal compliance, broader accessibility
  - Estimated impact: **Medium** - Required for public/paid launch
  - Estimated effort: **Low** - Audit, CSS adjustments
  - Dependencies: None
  - When to tackle: Before any marketing push or paid tier
  - Open questions: WCAG AAA aspirational?

- **MT-ACC-002: Full Keyboard Navigation & Screen Reader Support**
  - Description: Complete keyboard access (Tab order, focus states, ARIA labels), test with NVDA/VoiceOver
  - Why it matters: Accessibility requirement, legal risk mitigation
  - Estimated impact: **Medium** - Opens product to wider audience
  - Estimated effort: **High** - Semantic HTML refactor, comprehensive ARIA, testing
  - Dependencies: MT-ACC-001
  - When to tackle: Before public launch
  - Open questions: Describe animation to screen reader users (audio narration)?

- **MT-ACC-003: Reduced Motion Mode**
  - Description: Respect `prefers-reduced-motion`, slow animation, reduce ball count, offer static mode
  - Why it matters: Motion sensitivity, vestibular disorders, user comfort
  - Estimated impact: **Low** - Small but important audience
  - Estimated effort: **Low** - Media query, conditional rendering
  - Dependencies: None
  - When to tackle: Can do anytime as accessibility win
  - Open questions: Static step-by-step mode (no animation)?

### Analytics & Monitoring
- **MT-MON-001: PostHog or Firebase Analytics Integration**
  - Description: Track scenario creations, play events, export events, hover interactions, completion rates
  - Why it matters: Understand usage patterns, prioritize features, measure success metrics
  - Estimated impact: **High** - Data-driven product decisions
  - Estimated effort: **Low** - SDK integration, event instrumentation
  - Dependencies: MT-AUTH-001 (user identity for cohort analysis)
  - When to tackle: When scaling beyond 50 users (manual feedback insufficient)
  - Open questions: Privacy policy updates needed? GDPR opt-out?

- **MT-MON-002: Sentry Error & Performance Monitoring**
  - Description: Capture runtime errors, FPS drops, export failures with context
  - Why it matters: Proactive bug detection, performance regression alerts
  - Estimated impact: **Medium** - Improves reliability
  - Estimated effort: **Low** - SDK integration, sourcemap upload
  - Dependencies: None
  - When to tackle: Before scaling user base
  - Open questions: Error budget alerts? Performance SLOs?

- **MT-MON-003: FPS Telemetry & Auto-Tuning**
  - Description: Track real-world FPS per device, use data to improve auto-scaling algorithm
  - Why it matters: Optimize performance across device spectrum
  - Estimated impact: **Medium** - Better experience on low-end devices
  - Estimated effort: **Medium** - Custom telemetry, data analysis
  - Dependencies: MT-MON-001, MT-VIS-003
  - When to tackle: After 100+ users provide device diversity data
  - Open questions: Opt-in telemetry? Publish device compatibility list?

---

## Long-Term / Exploratory (6+ months or uncertain)

Big bets, experiments, or "wouldn't it be cool if..." features that require significant validation or scope.

### Collaboration & Social
- **LT-COL-001: Real-Time Collaboration (Multi-User Editing)**
  - Description: Multiple users editing same scenario simultaneously (like Figma), see cursors/changes live
  - Why it matters: Team-based strategy sessions, workshopping scenarios together
  - Estimated impact: **Medium** - Niche use case (most strategy work is async)
  - Estimated effort: **Very High** - WebSocket/CRDT infrastructure, conflict resolution
  - Dependencies: MT-AUTH-001, NT-SCN-001
  - When to tackle: Only if team-based demand emerges (unlikely per MVP philosophy)
  - Open questions: Voice/video integration? Comments vs live editing? Is this a different product?

- **LT-COL-002: Commenting & Annotation System**
  - Description: Users leave comments on specific milestones or moments in animation
  - Why it matters: Async feedback on scenarios, stakeholder input
  - Estimated impact: **Low** - Most feedback happens outside tool (Slack, meetings)
  - Estimated effort: **Medium** - Comment threading, notifications
  - Dependencies: MT-AUTH-001
  - When to tackle: When users explicitly request async collaboration
  - Open questions: Comments on exported PNGs (external tool)? Resolve/archive?

- **LT-COL-003: Public Scenario Gallery (Community Sharing)**
  - Description: Users publish scenarios to public gallery, browse others' work, clone/remix
  - Why it matters: Learning from others, crowdsourced templates, viral growth
  - Estimated impact: **Medium** - Could drive adoption, but moderation risk
  - Estimated effort: **High** - Moderation, search/filter, permissions
  - Dependencies: MT-AUTH-001, NT-SCN-002
  - When to tackle: After product-market fit is clear
  - Open questions: Moderation strategy? DMCA process for confidential scenarios accidentally shared?

### Advanced Features
- **LT-VIS-001: 3D Camera Controls (Pan/Zoom/Rotate)**
  - Description: Let users orbit around bubbles, zoom into bands, cinematic camera moves
  - Why it matters: Immersive exploration, could aid understanding for complex scenarios
  - Estimated impact: **Low** - MVP tests if fixed camera is sufficient
  - Estimated effort: **Medium** - Camera controller, UI for controls
  - Dependencies: MVP validation that fixed view is limiting
  - When to tackle: Only if users report "I want to see this from another angle"
  - Open questions: Guided camera paths? Saved camera presets?

- **LT-VIS-002: Custom Ball Styling (Shapes, Icons, Sizes)**
  - Description: Users upload icons for balls (represent companies not consumers), size balls by value not count
  - Why it matters: B2B scenarios where each "ball" is an enterprise customer with different value
  - Estimated impact: **Medium** - Valuable for specific use cases (B2B, ABM)
  - Estimated effort: **High** - Rendering complexity, file upload, sizing algorithm
  - Dependencies: NT-SCN-001
  - When to tackle: When B2B use case emerges strongly
  - Open questions: Performance with varied sizes? Pre-set icon library?

- **LT-VIS-003: Time-Series Overlays (Charts on Canvas)**
  - Description: Show traditional charts (line graph of market share over time) alongside animation
  - Why it matters: Combines familiar data viz with novel animation (best of both)
  - Estimated impact: **Medium** - Bridges gap for skeptical users
  - Estimated effort: **Medium** - Chart library integration, layout
  - Dependencies: None
  - When to tackle: If users say "I still need a chart too"
  - Open questions: Sync chart with animation timeline?

- **LT-EXP-001: MP4 Video Export (Full Animation)**
  - Description: Export entire animation as high-quality MP4 video
  - Why it matters: More polished than GIF, embeds in video platforms
  - Estimated impact: **Medium** - Professional use case (investor decks, conferences)
  - Estimated effort: **High** - Browser codec issues, server rendering may be needed
  - Dependencies: NT-EXP-001 (GIF export first to validate demand)
  - When to tackle: When ≥30% of users request video export
  - Open questions: Server-side rendering service? Max resolution/duration?

- **LT-INT-001: Stripe Payment Integration (Paid Tiers)**
  - Description: Freemium model (3 scenarios free, unlimited paid), metered exports
  - Why it matters: Revenue generation, sustainable business model
  - Estimated impact: **High** - Required for commercial viability
  - Estimated effort: **Medium** - Stripe SDK, webhook handling, pricing page
  - Dependencies: MT-AUTH-001, product-market fit validation
  - When to tackle: After proving free users get value (>100 active users)
  - Open questions: Pricing model (per-seat, per-scenario, per-export)? Enterprise tiers?

- **LT-INT-002: Slack/Teams Notification Integration**
  - Description: Send scenario exports or milestones directly to Slack/Teams channels
  - Why it matters: Fits into team workflow, reduces friction
  - Estimated impact: **Low** - Convenience feature for team users
  - Estimated effort: **Medium** - OAuth, bot setup, message formatting
  - Dependencies: LT-COL-001 or team-based use case validation
  - When to tackle: When team usage patterns emerge
  - Open questions: Zapier instead of direct integration?

### Research & Experimentation
- **LT-VIS-004: VR/AR Prototype (Immersive 3D)**
  - Description: Explore scenario in VR headset, walk between bubbles, grab balls
  - Why it matters: Extremely immersive, could be compelling demo
  - Estimated impact: **Low** - Novelty, tiny addressable audience (few have VR)
  - Estimated effort: **Very High** - WebXR, interaction design, motion sickness mitigation
  - Dependencies: Strong product-market fit, budget for experimentation
  - When to tackle: Exploratory R&D, not near-term roadmap
  - Open questions: Is this a different product? Trade show demo only?

- **LT-VIS-005: AI-Generated Scenarios from Text Prompt**
  - Description: User types "EV market 2025-2030" and AI generates realistic milestone/segment config
  - Why it matters: Zero-friction scenario creation, leverages AI knowledge
  - Estimated impact: **High** - Could dramatically reduce onboarding friction
  - Estimated effort: **Very High** - Prompt engineering, validation of AI output quality, liability for inaccurate data
  - Dependencies: MT-INT-001, large LLM context
  - When to tackle: After manual scenario creation proves too complex for users
  - Open questions: Accuracy disclaimers? Human-in-loop validation? Data sources?

- **LT-INT-003: Real-World Data Ingestion (Market APIs)**
  - Description: Pull actual market share data from external sources (Gartner, IDC, public filings)
  - Why it matters: Grounded in reality, not simulation
  - Estimated impact: **High** - Transforms from "illustrative" to "analytical" tool
  - Estimated effort: **Very High** - Data licensing, ETL, accuracy validation, legal review
  - Dependencies: LT-INT-001 (payment needed for data costs), product pivot to analytics tool
  - When to tackle: Only if pivoting to forecasting/BI product (out of scope per PRD)
  - Open questions: Is this a different product? Licensing costs? Update frequency?

---

## Technical Debt / Infrastructure

Things developers will thank you for later. These improve code quality, performance, maintainability, and developer experience.

### Performance
- **TD-PERF-001: Performance Profiling & Optimization**
  - Description: Comprehensive performance audit (Chrome DevTools, Lighthouse), identify bottlenecks, optimize render loop
  - Why it matters: Ensure 60 FPS on target devices, reduce load times
  - Estimated impact: **High** - Core product quality
  - Estimated effort: **Medium** - Profiling, iterative optimization
  - Dependencies: MVP launch (need real-world performance data)
  - When to tackle: After first 20 users report performance issues
  - Open questions: Performance budget per feature? Regression testing?

- **TD-PERF-002: Reduce Bundle Size (Code Splitting)**
  - Description: Dynamic imports for Three.js/R3F, split vendor bundles, lazy-load non-critical code
  - Why it matters: Faster initial load, especially on slow connections
  - Estimated impact: **Medium** - Improves first load experience
  - Estimated effort: **Medium** - Webpack config, testing
  - Dependencies: None
  - When to tackle: When bundle size exceeds 500KB (monitor via Vercel analytics)
  - Open questions: Target bundle size? Which chunks to split?

- **TD-PERF-003: Optimize Particle System (Instancing, LOD)**
  - Description: Use GPU instancing for balls, level-of-detail for distant objects, frustum culling
  - Why it matters: Scale to 10k+ agents without FPS drop
  - Estimated impact: **Medium** - Enables richer scenarios
  - Estimated effort: **High** - Advanced Three.js techniques
  - Dependencies: MVP launch
  - When to tackle: When users request more balls or complex scenarios
  - Open questions: LOD thresholds? Occlusion culling needed?

- **TD-PERF-004: Implement Animation State Caching**
  - Description: Pre-compute animation states for scrubbing, avoid real-time recalculation
  - Why it matters: Enables smooth timeline scrubbing (NT-UI-001)
  - Estimated impact: **Medium** - Prerequisite for scrub feature
  - Estimated effort: **High** - State serialization, memory management
  - Dependencies: NT-UI-001
  - When to tackle: Before implementing scrub control
  - Open questions: Cache granularity (every frame vs keyframes)? Memory limits?

### Code Quality
- **TD-INT-001: Comprehensive Test Suite (Unit + E2E)**
  - Description: Vitest for unit tests (migration logic, milestone timing), Playwright for E2E flows (play/export)
  - Why it matters: Prevent regressions, safe refactoring, confidence in releases
  - Estimated impact: **High** - Long-term maintainability
  - Estimated effort: **High** - Test infrastructure, coverage goals, CI integration
  - Dependencies: None (should start early)
  - When to tackle: After MVP ships, before adding complex features
  - Open questions: Coverage targets (80%+)? Visual regression testing?

- **TD-INT-002: Visual Regression Testing (Playwright)**
  - Description: Snapshot testing for canvas output, detect unintended visual changes
  - Why it matters: Animation changes are hard to catch in code review
  - Estimated impact: **Medium** - Prevents visual bugs
  - Estimated effort: **Medium** - Snapshot infrastructure, review process
  - Dependencies: TD-INT-001
  - When to tackle: After E2E tests exist
  - Open questions: Tolerance for anti-aliasing differences? Baseline management?

- **TD-INT-003: Refactor Animation Logic into State Machine**
  - Description: Formalize animation states (idle, playing, paused, seeking) with clear transitions
  - Why it matters: Easier to add features (scrubbing, speed changes), reduce bugs
  - Estimated impact: **Medium** - Developer experience, maintainability
  - Estimated effort: **Medium** - Refactoring, no user-facing changes
  - Dependencies: MVP launch (don't prematurely optimize)
  - When to tackle: Before NT-UI-001 (scrub timeline)
  - Open questions: Library (XState) or custom?

- **TD-DOC-001: Developer Documentation (Code Comments, ADRs)**
  - Description: Document key algorithms (migration selection, milestone timing), architectural decisions
  - Why it matters: Onboarding new developers, preserving design rationale
  - Estimated impact: **Medium** - Team scaling, future maintenance
  - Estimated effort: **Low** - Writing, ongoing maintenance
  - Dependencies: None
  - When to tackle: Ongoing, but formalize before team grows
  - Open questions: Auto-generate docs (TypeDoc)? Where to host (repo wiki, Notion)?

### Infrastructure
- **TD-INT-004: CI/CD Pipeline Hardening**
  - Description: Automated tests on PR, preview deploys, prod deploy gates (test pass, bundle size check)
  - Why it matters: Fast, safe deployments, prevent broken builds
  - Estimated impact: **High** - Team velocity, reliability
  - Estimated effort: **Medium** - GitHub Actions config, monitoring
  - Dependencies: TD-INT-001 (tests must exist)
  - When to tackle: After test suite is mature
  - Open questions: Auto-deploy to prod or manual trigger?

- **TD-INT-005: Firestore Schema Versioning & Migration Strategy**
  - Description: Version scenario data schema, migration scripts for breaking changes
  - Why it matters: Safe evolution of data model as features grow
  - Estimated impact: **High** - Prevents data loss, enables iteration
  - Estimated effort: **Medium** - Migration framework, documentation
  - Dependencies: NT-SCN-002 (when Firestore is in use)
  - When to tackle: Before first schema-breaking change
  - Open questions: Backward compatibility duration? User notification?

- **TD-MON-001: Uptime Monitoring & Alerting**
  - Description: Ping service, alert on downtime, track availability SLA
  - Why it matters: Catch outages before users complain
  - Estimated impact: **Medium** - Professional reliability
  - Estimated effort: **Low** - Uptime Robot, PagerDuty, or Vercel monitoring
  - Dependencies: None
  - When to tackle: Before scaling user base
  - Open questions: SLA targets (99.9%)? On-call rotation?

### Developer Experience
- **TD-INT-006: Storybook for UI Components**
  - Description: Isolated component development (buttons, sliders, tooltips) with visual docs
  - Why it matters: Faster UI iteration, visual QA, design system documentation
  - Estimated impact: **Low** - Nice-to-have for small team
  - Estimated effort: **Medium** - Setup, story writing
  - Dependencies: None
  - When to tackle: When UI component count grows (>10 components)
  - Open questions: Worth it for small team? Alternatives (Ladle)?

- **TD-INT-007: TypeScript Strict Mode & Type Coverage**
  - Description: Enable strict TypeScript checks, aim for 100% type coverage
  - Why it matters: Catch bugs at compile time, better IntelliSense
  - Estimated impact: **Medium** - Code quality
  - Estimated effort: **Medium** - Fix existing violations, ongoing enforcement
  - Dependencies: None
  - When to tackle: Early, before tech debt accumulates
  - Open questions: Gradual migration or big-bang refactor?

---

## Parking Lot (Good Ideas, Wrong Time)

Features that came up but don't fit the current strategy. Documented so they're not lost, but not prioritized.

### Embeds & Integrations
- **PL-INT-001: WordPress/Notion Embeddable Widget**
  - What it is: Iframe embed code to display visualization in blog posts or docs
  - Why it's interesting: Content creators could embed scenarios in articles, increases visibility
  - Why it's not prioritized: Tiny use case, most users work in slide decks not CMS; embeds are notoriously buggy; security concerns (CSP, iframe sandbox)
  - What would need to change: If content marketing becomes core GTM, or if media partnerships emerge
  - When to revisit: After 10+ users explicitly request embeds

- **PL-INT-002: Public API for Developers**
  - What it is: REST/GraphQL API to programmatically create scenarios, fetch data, trigger exports
  - Why it's interesting: Enables integrations (custom dashboards, automation, third-party tools)
  - Why it's not prioritized: No identified developer use case yet; API maintenance is high overhead; auth/rate-limiting complexity
  - What would need to change: If developer ecosystem emerges (unlikely for niche strategy tool)
  - When to revisit: After 100+ users, if integration requests pile up

### Alternative Interaction Modes
- **PL-UI-001: Voice Control (Play/Pause via Speech)**
  - What it is: "Alexa, play scenario" style voice commands
  - Why it's interesting: Hands-free presentation mode, futuristic UX
  - Why it's not prioritized: Gimmicky, browser voice API reliability poor, no user demand
  - What would need to change: If presentation use case dominates and users are hands-free
  - When to revisit: Probably never (low ROI)

- **PL-UI-002: Gesture Controls (Leap Motion, Webcam Tracking)**
  - What it is: Wave hand to speed up, pinch to zoom
  - Why it's interesting: Sci-fi UI, impressive demo
  - Why it's not prioritized: Requires hardware, extremely niche, high implementation cost, low reliability
  - What would need to change: If product pivots to immersive installations (museum, trade shows)
  - When to revisit: Only for special projects, not core product

### Data & Analytics
- **PL-INT-003: Excel/CSV Import for Scenario Data**
  - What it is: Upload spreadsheet with milestone configs, auto-populate scenario
  - Why it's interesting: Users already have data in Excel, reduces manual entry
  - Why it's not prioritized: Scenario editor UI (NT-SCN-001) is more user-friendly; Excel parsing is brittle; validation complexity; most users will configure manually
  - What would need to change: If users resist UI forms and demand bulk import
  - When to revisit: After scenario editor ships, if users complain about tedious entry

- **PL-INT-004: Revenue & Pricing Optimization Layer**
  - What it is: Add revenue per customer, show ARR growth, optimize pricing strategy
  - Why it's interesting: Expands from market dynamics to financial modeling
  - Why it's not prioritized: Scope creep (PRD explicitly excludes revenue optimization); becomes financial modeling tool (different product); requires economic assumptions beyond simulation
  - What would need to change: Pivot to financial SaaS tool (major strategy shift)
  - When to revisit: If investor/CFO persona dominates and requests financial projections

### Gamification
- **PL-UI-003: Achievement Badges (Created 5 Scenarios, Exported 10 PNGs)**
  - What it is: Gamify usage with badges, leaderboards, streaks
  - Why it's interesting: Engagement hacking, viral sharing ("I'm a P0-P1-P2 expert!")
  - Why it's not prioritized: This is a professional strategy tool, not a consumer app; gamification feels juvenile for target audience (PMs, founders)
  - What would need to change: If product pivots to education/training tool (teach market dynamics)
  - When to revisit: Only if product becomes learning platform

---

## User Feedback Themes (To Be Prioritized)

This section is a **template** for capturing patterns that emerge after MVP launch. Initially empty; will be populated based on first 50-100 user interviews and feedback forms.

### Template for Each Theme

**Theme Name**: [Pattern observed, e.g., "Users confused about segment labels"]

**Evidence**:
- Number of users reporting: X / total users
- Specific quotes: "[Insert verbatim feedback]"
- Observed behavior: [e.g., "40% of users didn't hover over bands"]

**Hypothesis**:
- Root cause: [Why is this happening?]
- Potential solutions: [3-5 ideas to test]

**Prioritization**:
- Impact if solved: High/Medium/Low
- Effort to solve: High/Medium/Low
- Rank vs other themes: [1-5]

**Next Steps**:
- [ ] Create spike to explore solutions
- [ ] Add to Near-Term / Mid-Term backlog
- [ ] Defer (explain why)

---

### Placeholder Themes (Expected Based on MVP Assumptions)

#### Theme: "I want to customize the scenario"
- Expected volume: High (60%+ of users)
- Leads to: NT-SCN-001 (Scenario Editor)
- Decision: Already planned for Near-Term

#### Theme: "Can I export as video?"
- Expected volume: Medium (30-40% of users)
- Leads to: NT-EXP-001 (GIF) then LT-EXP-001 (MP4)
- Decision: GIF first, MP4 deferred pending GIF validation

#### Theme: "The visualization is confusing/unclear"
- Expected volume: Low (hope <20%)
- Leads to: Redesign (critical if >30%)
- Decision: If this emerges, pause roadmap and fix comprehension issues

#### Theme: "I need this on mobile"
- Expected volume: Low (<10% per assumptions)
- Leads to: MT-UI-002 (Mobile View)
- Decision: Defer unless volume exceeds 20%

#### Theme: "Can I collaborate with my team?"
- Expected volume: Low-Medium (10-20%)
- Leads to: LT-COL-001 (Real-Time Collaboration)
- Decision: Understand if async sharing (NT-EXP-002) is sufficient first

---

### How to Use This Section

1. **After each user test batch** (every 10 users):
   - Review feedback form responses
   - Tag feedback with themes
   - Count frequency

2. **Monthly backlog review**:
   - Identify top 3 themes by frequency × severity
   - Decide: Add to Near-Term, Mid-Term, or Parking Lot
   - Update this section with data

3. **Pivot triggers**:
   - If theme affects >50% of users AND impacts core hypothesis (comprehension) → **immediate fix**
   - If theme is high-frequency but low-severity → **batch with next release**
   - If theme is low-frequency but high-delight → **consider for differentiation**

---

## Backlog Maintenance

### Review Cadence
- **Weekly**: Triage new bugs/requests into appropriate phase
- **Monthly**: Re-prioritize Near-Term based on user feedback themes
- **Quarterly**: Review Mid-Term and Long-Term, move items up or down based on strategic shifts

### Promotion Criteria (Moving Items Up)
- **To Near-Term**: >40% of users request it OR blocks adoption for key persona OR enables monetization
- **To Mid-Term**: Clear user need validated by 10+ users OR strategic differentiator OR technical prerequisite for other features
- **To Long-Term**: Interesting idea with 3-5 user mentions OR exploratory bet worth small investment

### Demotion Criteria (Moving Items Down)
- **To Parking Lot**: <5% of users care OR doesn't align with core value prop OR implementation risk too high
- **Archive/Kill**: Zero user interest after 6 months OR better solution found OR strategic pivot makes it irrelevant

### Success Metrics (Backlog Health)
- **Velocity**: 3-5 Near-Term items completed per month
- **Alignment**: 80%+ of Near-Term items tied to user feedback themes
- **Scope Control**: <10% scope creep (features added mid-sprint)
- **Debt Paydown**: 1 Technical Debt item per 3 feature items

---

## Related Documents
- [MVPScope.md](./MVPScope.md) - Ruthlessly scoped MVP definition
- [PRD.md](./PRD.md) - Full product vision and requirements
- [designspec.md](./designspec.md) - Detailed design specification
- [README.md](./README.md) - Original concept description

---

**End of Backlog**

*Last updated: 2025-10-28*
*Next review: After first 10 user tests (Week 5 post-MVP launch)*
