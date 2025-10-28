# MVP Scope: P0-P1-P2 Demand Plane Visualization

## MVP Core Hypothesis

**One sentence**: Decision-makers will understand market transition dynamics (why/when segments move from incumbent to innovation) better through animated ball-migration visualization than through static charts.

**Absolute minimum to test this**: A single hardcoded scenario with 5 pre-set milestones where users press Play and watch 1000 balls migrate from P1→P2 in segment-driven waves (Innovators first, Laggards last), then answer "did this make the concept clearer than a spreadsheet would?"

---

## In Scope for MVP

### 1. Basic Playback Visualization
**Why critical**: This IS the product. Without animation, we're just another diagramming tool.

**User value**: User clicks Play and watches the core concept unfold—balls (consumers) migrate from orange P1 bubble (right) to blue P2 bubble (left) along a visible string, with early adopters moving first.

**Complexity**: Complex (WebGL/Three.js particle system with 1000+ agents, lerping colors, coordinated timing)

**Non-negotiables**:
- P1 bubble (orange, right side) with 5 visible bands (Innovators → Laggards)
- P2 bubble (blue, left side) that grows as it gains balls
- Balls migrate along center string, gradient shift orange→blue
- 5 milestone "pulses" (visual beats where migration rate changes)
- Play/Pause button, speed slider (0.5x, 1x, 2x)
- Dark gray background, clean color palette

### 2. Single P0 Cluster
**Why critical**: Demonstrates the three-plane concept. Without P0, users miss the "legacy still persists" insight that differentiates this theory.

**User value**: Small garnet-red bubble in bottom-right shows legacy solutions don't disappear—they just shrink to niche demand.

**Complexity**: Simple (static positioned bubble, no interaction needed for MVP)

### 3. Pre-configured Scenario (No Editing)
**Why critical**: Editing adds 10× complexity. We need to validate if the visualization communicates BEFORE we build scenario builders.

**User value**: User opens app, sees a realistic "SaaS CRM transitioning to AI-native platform" scenario pre-loaded. They immediately press Play to see the story.

**Complexity**: Simple (hardcoded JSON data structure, no forms/validation/storage)

**What's hardcoded**:
- 5 milestones with segment coverage (M1: Innovators 90%, M2: Early Adopters 70%, etc.)
- 1000 total consumers, distributed across 5 bands per adoption curve
- Migration rates per segment per milestone
- Bubble sizes, positions, labels

### 4. Segment-Aware Migration Logic
**Why critical**: This is what makes it NOT just random balls moving. Innovators must move first, Laggards last—this is the insight.

**User value**: User sees P1's bottom band (Innovators) empty out first, then Early Adopters, then Majority. This visual proves "who moves when" in a way no spreadsheet can.

**Complexity**: Medium (algorithm to select balls based on segment + milestone state, queue system)

### 5. Hover Tooltips (Balls & Bands)
**Why critical**: Without this, the visualization is "pretty but unclear." Tooltips ground the user—"this ball is an Innovator moving at Milestone 2."

**User value**: Hover any ball → see segment type. Hover P1 band → see "Innovators: 45% remaining."

**Complexity**: Simple (basic DOM overlay on hover, position follows mouse)

### 6. Static Export (PNG Screenshot)
**Why critical**: Users need to share this to validate in real meetings. No export = no virality, no feedback loop.

**User value**: Pause at key moment (e.g., "Milestone 3: Early Majority starts moving"), click Export → download PNG for slide deck.

**Complexity**: Simple (canvas.toDataURL or html2canvas, client-side only)

### 7. Canvas Fallback (No WebGL Required)
**Why critical**: We can't lose users on older laptops or Firefox issues. Accessibility > polish for MVP.

**User value**: If WebGL fails, they still see the migration on 2D canvas (less pretty, but functional).

**Complexity**: Medium (requires dual render path: R3F + D3/Canvas, with auto-detection)

---

## Explicitly Out of Scope

### Multiple Scenarios / Editing / Saving
**Why not v1**: Building scenario editors (forms for milestones, sliders, SAM/SOM inputs) is 60% of dev time. We don't know if the core visualization works yet.

**When to revisit**: After 50 users confirm "this made the concept click" in feedback. Then build scenario builder in v2.

**Workaround for MVP**: Hardcode 2-3 different scenarios as separate demo URLs (e.g., /scenario/saas-crm, /scenario/ev-cars).

---

### Control Factor Sliders (Dominion/Contingency/Influence)
**Why not v1**: The theory is rich, but testing if users understand "Innovators move first" is the prerequisite. Control factors are a layer on top.

**When to revisit**: Post-launch, once users ask "can I simulate what happens if we delay Milestone 2?"

**Workaround for MVP**: Bake control factor effects INTO the hardcoded scenario (e.g., "Milestone 3 had regulatory delay" is visible in migration slowdown but not adjustable).

---

### GIF/MP4 Export
**Why not v1**: PNG proves shareability. Video export is complex (browser codec issues, file size, server rendering).

**When to revisit**: If 80%+ of users say "I wish I could export this as a video" in feedback.

**Workaround for MVP**: User can screen-record if desperate. Focus on nailing the visualization first.

---

### Authentication / User Accounts
**Why not v1**: No saved scenarios = no need for login. Adds Firebase Auth complexity, onboarding friction, GDPR surface area.

**When to revisit**: When we add scenario editing/saving (v2).

**Workaround for MVP**: Public demo app, no login required. Anyone with the URL can view.

---

### Multiple P2s (Competing Innovations)
**Why not v1**: Conceptually cool, visually cluttered, algorithmically complex (split flows, which balls go where?).

**When to revisit**: After first 100 users, if competitive scenario analysis emerges as top request.

**Workaround for MVP**: Hardcoded scenario can MENTION a competitor ("assume P2-alt exists") but we don't visualize it.

---

### AI-Generated Narrative / Explainability Overlay
**Why not v1**: The PRD imagines pop-ups explaining "why Milestone 3 unlocked Early Majority." That's polish, not validation. Tooltips are enough.

**When to revisit**: After users consistently ask "why did this happen?" during playback (indicates they're engaged but need guidance).

**Workaround for MVP**: Static text block below visualization that explains the scenario setup. No dynamic AI.

---

### Responsive Mobile / Tablet Optimization
**Why not v1**: Target users (PMs, founders, investors) do strategy work on laptops. Mobile is 5% of use case.

**When to revisit**: If analytics show >20% mobile traffic post-launch.

**Workaround for MVP**: "Best viewed on desktop" banner on mobile. Visualization still loads but may be cramped.

---

### Real-Time Collaboration / Commenting
**Why not v1**: PRD explicitly marked this out-of-scope. Agree. We're validating comprehension, not workshopping.

**When to revisit**: Never, unless we pivot to team-based strategy tool (different product).

---

### P1 "Perforation" (Holes in Bubble)
**Why not v1**: Conceptually elegant (P1 shows empty seats as balls leave) but technically fiddly (physics collision detection, visual noise).

**When to revisit**: v2, if users say "I don't see P1 losing share visually."

**Workaround for MVP**: P1 band opacity fades as balls leave (simpler visual cue).

---

### Accessibility (WCAG AA, Keyboard Nav)
**Why not v1**: Critical for public launch, but MVP is invite-only demo to 10-20 strategy leads. All will use mouse/trackpad.

**When to revisit**: Before any public/paid launch or if early tester requests it.

**Workaround for MVP**: Document known gaps; offer to walk through via screen-share if needed.

---

### Analytics / Telemetry
**Why not v1**: We'll get feedback via direct user interviews (10 users). Don't need PostHog for that.

**When to revisit**: Post-MVP, when we scale to 100+ users and can't interview everyone.

**Workaround for MVP**: Manual feedback form (Google Form link) + Vercel basic analytics (page views, load time).

---

## MVP Success Looks Like

### Minimum Viable User Flow
1. User lands on demo page (no login)
2. Reads 2-sentence context: "This shows how an AI-native CRM (P2) captures market share from Salesforce (P1) over 5 product releases."
3. Presses Play
4. Watches 60-90 seconds of migration (balls moving, bands emptying, P2 growing)
5. Hovers on a few balls/bands to understand segments
6. Pauses at Milestone 3, exports PNG
7. Fills out 30-second feedback form

**Time to value**: <3 minutes from landing to "aha moment"

### Metrics We'll Track (Manual for MVP)
- Completion rate: Did they watch to the end? (target: 70%+)
- Engagement: Did they hover/pause/scrub? (target: 60%+)
- Export rate: Did they export? (target: 40%+)
- Comprehension: Post-run survey "Is the concept clearer now?" (target: 80% yes)

### Feedback That Tells Us We're Right
- "I finally get why Innovators move first."
- "This makes the timing argument visual—way better than my spreadsheet."
- "I'm showing this to my board."
- "Can I plug in my own numbers?" ← means they believe in it enough to want to use it

### Feedback That Tells Us We're Wrong
- "This is just eye candy, doesn't tell me anything new."
- "Too confusing, I don't know what I'm looking at."
- "Cool, but I'd still use a line chart for this."

---

## Technical Guardrails

### What We CANNOT Compromise On
1. **60 FPS animation smoothness** (on modern laptops): If it's janky, users think "toy, not tool." Budget 1000-2000 agents max for MVP if needed.
2. **Segment migration accuracy**: Innovators MUST move before Laggards, per the theory. Algorithm must be defensible.
3. **Data integrity**: Hardcoded scenario data must be realistic (no 200% adoption, no negative capacity). Users will scrutinize.
4. **Export quality**: PNG must be slide-deck ready (1920×1080, clear labels, no artifacts).

### What We CAN Be Scrappy About
1. **Visual polish**: P1/P2 bubbles can be simple spheres (no fancy shaders, bloom effects, depth-of-field). Clean > cinematic for MVP.
2. **Edge cases**: If user resizes window during playback, it's OK if layout breaks—just tell them to refresh.
3. **Error states**: If WebGL fails and Canvas fallback also fails, show "Please try Chrome" message. No need for 5 fallback tiers.
4. **Tooltips**: Basic black box with white text is fine. No animations, no smart positioning (can overflow screen edge).
5. **Loading states**: "Loading..." text is fine. No skeleton screens or progress bars.
6. **Copy/microcopy**: Functional labels ("Play", "Export") beat clever branding ("Unleash the transition!").

---

## Launch Readiness Checklist

### Must Work Before Anyone Can Use This
- [ ] Hardcoded scenario loads with 1000 balls in correct band positions
- [ ] Play button triggers migration, balls move smoothly (60 FPS)
- [ ] 5 milestones fire in sequence, migration rates shift per segment
- [ ] P1 bands visibly deplete (Innovators first), P2 grows
- [ ] Pause stops animation, Play resumes from same state
- [ ] Hover tooltips show segment name and band stats
- [ ] Export button downloads usable PNG (1920×1080)
- [ ] Works in Chrome/Edge/Safari on macOS/Windows
- [ ] Canvas fallback activates if WebGL unavailable
- [ ] Loads in <5 seconds on fast connection

### Can Break (We'll Fix Post-Launch)
- [ ] Doesn't work in Firefox (if <10% of testers use it)
- [ ] Slow on 5+ year old laptops (we'll reduce agent count in v2)
- [ ] Scrub timeline feels choppy (Play/Pause is enough for MVP)
- [ ] Tooltip positioning glitches at screen edges
- [ ] Mobile layout is cramped (desktop-first)
- [ ] No keyboard shortcuts (mouse-only is fine)
- [ ] Export PNG has slight color banding (good enough for demo)
- [ ] Refresh loses animation state (expected, no save state)
- [ ] No undo/redo on speed changes (not needed for MVP)

---

## Dev Time Estimates (Gut Feel, Not Technical)

| Feature | Complexity | Est. Days |
|---------|------------|-----------|
| Basic scene setup (Three.js + R3F) | Complex | 2-3 |
| Ball particle system + migration logic | Complex | 3-4 |
| Segment-aware selection algorithm | Medium | 2 |
| 5-band P1 bubble with visual depletion | Medium | 1-2 |
| P2 growth + string visual | Simple | 1 |
| Static P0 placement | Simple | 0.5 |
| Play/Pause/Speed controls | Simple | 1 |
| Hover tooltips (balls + bands) | Simple | 1 |
| Canvas fallback render path | Medium | 2-3 |
| PNG export | Simple | 1 |
| Hardcoded scenario data + UI text | Simple | 1 |
| **TOTAL** | | **15-20 days** |

Add 20% buffer for integration bugs = **18-24 days** (roughly 3-4 weeks for one developer).

---

## What We're Explicitly NOT Doing (So We Don't Scope Creep)

- No login/auth system
- No database or backend (pure client-side)
- No scenario editor forms
- No control factor sliders
- No AI narrative generation
- No video export
- No analytics integration
- No mobile optimization
- No real-time collaboration
- No multiple P2s visualization
- No P1 perforation physics
- No accessibility audit
- No A/B testing framework
- No customer support chat
- No onboarding tutorial
- No keyboard shortcuts
- No undo/redo
- No fullscreen mode (browser native is fine)
- No dark/light theme toggle (dark only)
- No custom color pickers
- No data import/export (beyond PNG)
- No API for developers
- No embeddable widget
- No WordPress/Notion integration

---

## Critical Path: What Gets Built When

### Week 1: Core Visualization Engine
- Days 1-2: Next.js + R3F scene setup, camera, lighting
- Days 3-5: Particle system (1000 balls), P1/P2 bubbles, string path
- Deliverable: Static scene with positioned elements

### Week 2: Animation Logic
- Days 6-8: Migration algorithm (segment-aware ball selection)
- Days 9-10: Milestone timing system, Play/Pause controls
- Deliverable: Balls migrate on Play, rates change per milestone

### Week 3: Interactivity & Fallback
- Days 11-12: Hover tooltips, speed slider
- Days 13-15: Canvas fallback implementation
- Deliverable: Full interactive demo (WebGL + Canvas paths)

### Week 4: Polish & Export
- Days 16-17: PNG export, P0 cluster, final visual polish
- Days 18-19: Testing across browsers, fixing critical bugs
- Day 20: Deploy to Vercel, prepare feedback form
- Deliverable: Live demo URL + testing checklist

---

## Go/No-Go Criteria

**We launch MVP if**:
- 3 internal team members can complete the user flow (land → Play → export) without help
- Animation runs smoothly on 3+ test laptops (macOS + Windows)
- Exported PNG is legible when pasted into a slide deck
- Feedback form is live and recording responses

**We delay if**:
- Animation is <30 FPS or visually broken
- Tooltips don't work (users can't understand what they're seeing)
- Export fails in 2+ major browsers
- Scene doesn't load in <10 seconds

---

## Post-MVP: What We Learn Next

**Validation questions**:
1. Did the visualization make the P0-P1-P2 concept clearer? (survey score ≥4/5)
2. Did users want to customize scenarios? (% who asked "can I change the inputs?")
3. Did users share exports with colleagues? (qualitative feedback)
4. What was confusing? (open-ended feedback themes)

**Prioritize v2 features based on**:
- If comprehension fails → simplify visualization (fewer balls? slower speed?)
- If comprehension succeeds + users want customization → build scenario editor
- If users want to simulate "what-ifs" → add control factor sliders
- If sharing is high → add video export, public URLs
- If adoption is low → revisit hypothesis (maybe market doesn't want this?)

**Kill criteria**:
- If <50% of users understand the concept better than a spreadsheet
- If zero users export or share (no perceived value)
- If feedback is "cool but useless" (novelty, not utility)

---

## The Brutal Truth

This MVP cuts 70% of the PRD. We're not building:
- The scenario configurator (biggest PRD section)
- Control factor theory visualization
- AI explainability
- Most export formats
- User accounts
- Multi-device support

**Why that's OK**: We're testing ONE hypothesis—"Does animated ball migration make market dynamics comprehensible?" Everything else is downstream of that answer.

If the answer is YES → build the scenario editor, add control factors, polish for launch.

If the answer is NO → pivot or kill. No amount of feature richness will save a visualization that doesn't communicate.

**MVP is a LEARNING vehicle, not a product launch.**

---

## Final Scope Lock

**In**: Play, Pause, Speed, 1000 balls, 5 milestones, segment bands, P0 cluster, tooltips, PNG export, Canvas fallback.

**Out**: Everything else.

**Timeline**: 3-4 weeks (one developer).

**Success**: 8/10 testers say "this made it clearer."

**Ship date**: End of Week 4, no exceptions. If features are incomplete, we CUT them, not delay.

---

*Last updated: 2025-10-28*
*Next review: After first 10 user tests (target: ~Week 5)*
