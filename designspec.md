# Design Specification: P0-P1-P2 Demand Plane Visualization

**Version**: v1.0 MVP
**Date**: October 28, 2025
**Owner**: Design & Development Team
**Target Audience**: Developers, designers, and implementers

---

## Design Principles

### 1. Cinematic Clarity Over Static Precision
The animation itself is the insight. Every design decision should enhance the visceral understanding of "who moves when and why" rather than optimizing for data density. Users should feel like they're watching a market transition unfold, not reading a dashboard.

**Application**: Prioritize smooth 60 FPS animation, clear color transitions, and obvious visual beats (milestones) over detailed annotations or dense UI chrome.

### 2. Theory Made Tangible
The P0-P1-P2 concept is abstract in text but concrete in motion. The design must make invisible market forces (adoption curves, segment behavior, superiority criteria) physically visible through spatial metaphors.

**Application**: Bubbles represent market presence, balls represent consumers, the string represents the demand plane, bands represent segments. These aren't decorative—they're the theory embodied.

### 3. Guided Discovery, Not Explained Complexity
Users shouldn't need a manual to understand what they're seeing. The visualization should be immediately intuitive at a surface level ("balls moving from one bubble to another") while revealing deeper insights through interaction (hover to discover segments, watch to see timing patterns).

**Application**: Default state should be clean and uncluttered. Progressive disclosure through hover states and animation reveals. Tooltips answer "what is this?" at the moment of curiosity.

### 4. Shareable Artifacts Over Interactive Sessions
The export is as important as the experience. Decision-makers need to take this insight into meetings, slide decks, and strategy documents. Design for the screenshot from day one.

**Application**: Every frame should be legible when paused. Key moments (milestone transitions) should be visually distinct. PNG exports must work without context loss.

### 5. Ruthless Simplicity (MVP Constraint)
This MVP is a learning vehicle, not a product launch. Every pixel, interaction, and line of code must justify its existence against the core hypothesis: "Does animated migration make market dynamics comprehensible?"

**Application**: If a feature doesn't directly serve the animation, the hardcoded scenario, or basic interaction (play/pause/hover/export), it's out of scope. No settings panels, no customization, no "nice-to-haves."

---

## User Flows

### Flow 1: First-Time User - Immediate Comprehension Test
**Purpose**: Validate that the visualization communicates the P0-P1-P2 concept without prior knowledge.

**Step-by-step journey**:
1. User lands on demo page (no login, no splash screen)
2. Sees dark canvas with three bubbles positioned:
   - Small garnet-red cluster (bottom-right) = P0
   - Large orange segmented sphere (center-right) = P1
   - Small blue dot (center-left) = P2
3. Reads 2-sentence context above canvas: "This shows how an AI-native CRM (P2) captures market share from Salesforce (P1) over 5 product releases. Legacy tools (P0) persist in niche markets."
4. Notices large "Play" button below canvas (high contrast, obvious affordance)
5. Presses Play
6. Watches:
   - Small balls inside P1 begin moving along a visible string toward P2
   - Balls gradient shift from orange to blue as they travel
   - P1's bottom band (labeled "Innovators") depletes first
   - P2 bubble grows with each wave of arrivals
   - Five distinct visual "pulses" mark milestones (subtle glow or speed change)
   - Animation completes in 60-90 seconds
7. While watching, hovers over a moving ball → tooltip appears: "Innovator | Migrating at Milestone 2"
8. Hovers over P1 band → tooltip: "Early Adopters: 65% remaining"
9. Clicks Pause at Milestone 3 (halfway through)
10. Clicks "Export PNG" button → downloads 1920×1080 screenshot
11. Sees "Give Feedback" link → clicks, opens Google Form in new tab

**Success state**:
- User completes feedback form saying "clearer than a spreadsheet" or "I finally get the timing"
- User exports PNG (indicates perceived value)
- Session duration: 3-5 minutes (watch full animation + explore)

**Error/edge cases**:
- **WebGL not supported**: Canvas fallback activates automatically; user sees 2D version with simpler graphics but same logic
- **Impatient user**: Sees Speed slider (0.5x, 1x, 2x) below Play button; can accelerate to 2x
- **Confused user**: Hovers over elements but tooltips don't clarify → indicates design failure; track via feedback
- **Mobile visitor**: Sees banner "Best viewed on desktop" but visualization still loads (cramped but functional)

---

### Flow 2: Strategy Lead - Export for Board Meeting
**Purpose**: User needs to capture a specific moment in the transition to illustrate a strategic point.

**Step-by-step journey**:
1. User arrives with intent: "I need to show when Early Majority starts moving"
2. Presses Play, watches animation
3. Notices Milestone 3 pulse (visual beat)
4. Clicks Pause immediately after Milestone 3
5. Observes:
   - P1's top two bands (Early/Late Majority) now actively migrating
   - P2 has grown to ~40% the size of P1
   - String is "busy" with many balls in transit
6. Adjusts view (if canvas allows slight pan/zoom—MVP may skip this)
7. Clicks "Export PNG"
8. Downloads file named "p0-p1-p2-milestone-3.png"
9. Opens in Preview/Photos, confirms legibility
10. Pastes into Keynote/PowerPoint slide
11. Adds annotation: "Milestone 3: Early Majority adoption begins"

**Success state**:
- User successfully embeds PNG in presentation
- Image is clear, labels readable, colors accurate
- User returns for future scenarios (indicates trust in tool)

**Error/edge cases**:
- **Export fails (browser restriction)**: Shows fallback message: "Screenshot manually or try Chrome"
- **Wrong moment captured**: User can replay and re-export (no limit)
- **File naming**: MVP uses timestamp or generic name; v2 can add custom labels

---

### Flow 3: Skeptical User - Theory Validation
**Purpose**: User familiar with adoption curves wants to verify the model's logic.

**Step-by-step journey**:
1. User opens app with skepticism: "Is this just random balls moving?"
2. Presses Play, immediately pauses after 5 seconds
3. Hovers over multiple balls → sees segment labels (Innovator, Early Adopter)
4. Resumes Play, watches carefully
5. Notices pattern:
   - P1's bottom band (Innovators) depletes first
   - Next band up (Early Adopters) starts moving second
   - Top bands (Late Majority, Laggards) barely touched in first half
6. Pauses again at Milestone 4
7. Hovers over P1 bands → confirms Innovators at 5%, Early Adopters at 20%, Laggards at 85%
8. Thinks: "This matches Rogers' diffusion curve—they got it right"
9. Resumes to end, sees Laggards finally move in Milestone 5
10. Exports PNG, fills feedback: "Accurate model, well-executed"

**Success state**:
- User validates segment-migration logic through interactive exploration
- Tooltips provide enough data to verify theory without overwhelming
- User becomes advocate (shares with peers)

**Error/edge cases**:
- **Tooltip data incorrect**: Critical bug; user loses trust immediately
- **No obvious pattern**: Design failure; bands aren't visually distinct enough
- **Too fast to observe**: User can slow to 0.5x speed to study

---

## Key Screens/Views

### Screen 1: Main Canvas (The Entire MVP)
**Purpose**: Display the animated P0-P1-P2 transition in a clean, focused environment.

**What information is displayed?**
- **P0 cluster** (bottom-right): Small garnet-red bubble, static, labeled "Legacy Solutions (P0)"
- **P1 bubble** (center-right): Large orange sphere, divided into 5 horizontal bands (Innovators at bottom → Laggards at top), each band labeled on hover, filled with small balls (consumers)
- **P2 bubble** (center-left): Starts as tiny blue dot, grows as balls arrive, labeled "Leapfrog Innovation (P2)"
- **Demand string**: Thin, subtle line connecting P1 center to P2 center, represents the demand plane
- **Balls in motion**: Small spheres traveling from P1 → P2, gradient-shifting orange→blue
- **Milestone indicators**: Five subtle pulses or markers along timeline (could be small notches on a progress bar at bottom, or brief glow effects on P2 at milestone moments)
- **Context text** (above canvas): 2-3 sentences explaining the scenario (e.g., "Salesforce → AI CRM transition")
- **Controls** (below canvas): Play/Pause button, Speed slider (0.5x, 1x, 2x), Export PNG button
- **Tooltips** (on hover): Overlay showing segment type, migration status, band statistics

**What actions can users take?**
1. **Press Play**: Start animation from beginning (or resume if paused)
2. **Press Pause**: Freeze animation at current state
3. **Adjust Speed**: Slider between 0.5x (slow), 1x (default), 2x (fast)
4. **Hover balls**: See tooltip with segment and milestone info
5. **Hover bands**: See tooltip with band name and percentage remaining
6. **Export PNG**: Download current canvas state as image
7. **Click Feedback link**: Open Google Form in new tab (external)

**Primary call-to-action**: **Play button** (large, centered, high contrast—this is the hero action)

**Mental model**:
Think "Apple product demo video meets data simulation." The canvas is a stage, the balls are actors, the animation is the story. It's NOT an interactive tool (yet)—it's a cinematic explainer you can pause and inspect. Like watching a nature documentary where you can freeze-frame and zoom in on the tiger.

---

### Screen 2: Tooltip Overlay (Interaction Layer)
**Purpose**: Provide contextual information without cluttering the default view.

**What information is displayed?**
- **Ball tooltip** (when hovering over moving ball):
  - Segment type (e.g., "Innovator")
  - Current state (e.g., "Migrating at Milestone 2" or "Arrived at P2")
  - Optional: Propensity score (if we want to show nerdiness—MVP can skip)
- **Band tooltip** (when hovering over P1 segment band):
  - Band name (e.g., "Early Adopters")
  - Percentage remaining (e.g., "45% remaining")
  - Optional: Original count (e.g., "180 / 400 remaining")
- **Bubble tooltip** (when hovering over P0/P1/P2 bubbles):
  - Bubble name (e.g., "P1: Incumbent Alpha")
  - Current population (e.g., "650 consumers")

**What actions can users take?**
- None directly—tooltip is informational only
- Tooltip auto-appears on hover, disappears on mouse-out
- Does NOT pause animation (passive overlay)

**Primary call-to-action**: N/A (informational only)

**Mental model**:
Think "YouTube video with closed captions." The main content plays, but hovering gives you the script/details. Tooltips are the "subtitles" for the visual language of balls and bands.

---

## Information Architecture

### Primary Navigation Structure
**MVP has NO navigation**—it's a single-page demo. No header, no sidebar, no tabs. The canvas IS the page.

**Layout hierarchy** (top to bottom):
1. **Header region** (optional, minimalist):
   - Logo or product name (small, top-left)
   - "Feedback" link (small, top-right)
2. **Context block** (above canvas):
   - Scenario description (2-3 sentences, centered, medium font)
3. **Canvas region** (center, largest):
   - Full 3D/2D visualization (takes ~70% of viewport height)
4. **Controls region** (below canvas):
   - Play/Pause button (large, centered)
   - Speed slider (centered, below button)
   - Export PNG button (medium, centered or right-aligned)
5. **Footer region** (optional, minimal):
   - Attribution (e.g., "Built with [tech stack]")
   - Link to concept documentation (external)

**How do users move between major sections?**
They don't—it's one scrollable page. On desktop, everything fits in viewport. On mobile, user may need to scroll to see controls.

**What's always accessible vs. contextual?**
- **Always accessible**: Play/Pause, Speed slider, Export button, Feedback link
- **Contextual**: Tooltips (only on hover), Milestone pulses (only during animation at specific timestamps)

---

## Interaction Patterns

### How do users input data?
**MVP = zero data input**. This is a hardcoded demo. Users control playback, not scenario parameters.

**Interactions available**:
1. **Button clicks**: Play, Pause, Export
2. **Slider drag**: Speed control (0.5x, 1x, 2x)
3. **Mouse hover**: Trigger tooltips
4. **Link click**: Feedback form (external)

**V2 (out of scope)**: Form inputs for milestone configuration, sliders for control factors, text fields for scenario naming.

---

### How does the system provide feedback?

**During playback**:
- **Visual feedback**: Balls move smoothly; milestone pulses (brief glow on P2 or subtle camera shake)
- **State changes**: Play button icon changes to Pause icon; Speed slider thumb moves
- **No explicit notifications**: Animation itself is the feedback loop

**On interaction**:
- **Hover**: Tooltip fades in (200ms ease), follows cursor slightly offset
- **Click Play**: Button press animation (100ms scale-down), animation starts immediately
- **Click Pause**: Button press animation, motion freezes instantly (no lag)
- **Export**: Button shows brief "Exporting..." text or spinner (2-3 seconds), then downloads file; button reverts to "Export PNG" (no persistent success message—file download is the confirmation)

**On errors**:
- **WebGL failure**: Instant fallback to Canvas; no error message (seamless degradation)
- **Export failure**: Toast/alert: "Export failed. Please try Chrome or screenshot manually." (dismissible)
- **Slow performance**: Automatic agent count reduction; optional notification: "Reduced detail for performance" (corner badge, non-intrusive)

**Loading states**:
- **Initial load**: Simple "Loading..." text on dark background (no spinner, no progress bar—MVP is simple)
- **Scene preparation**: If <2 seconds, no loader. If >2 seconds, show loading text.
- **During animation**: No loading states—everything is precomputed at load time

---

### What happens during loading/processing states?

**Page load**:
1. User navigates to URL
2. Dark gray background appears immediately
3. "Loading..." text fades in (white, centered)
4. Scene loads (WebGL context, shaders, particle system, hardcoded data)
5. Canvas renders static initial state (P0/P1/P2 bubbles, all balls inside P1)
6. "Loading..." fades out
7. Controls become interactive (Play button pulses slightly to draw attention)
8. **Total time**: <5 seconds on fast connection

**Fallback (slow connection or WebGL failure)**:
1. After 3 seconds, check WebGL status
2. If failing/slow, switch to Canvas rendering
3. Show brief message: "Using compatibility mode" (corner badge, auto-dismiss after 2 seconds)
4. Render simplified 2D version

**No progress bars or percentages**—MVP load is all-or-nothing. Either scene loads or fallback activates.

---

## Content Requirements

### What copy/messaging is needed?

**Above canvas (scenario context)**:
> "This visualization shows how an AI-native CRM platform (P2) captures market share from Salesforce (P1) over 5 major product releases. Each ball represents a customer segment migrating based on adoption patterns. Legacy solutions (P0) persist in specialized niches."

**Control labels**:
- Button: "Play" / "Pause" (toggles)
- Slider: "Speed: 0.5x | 1x | 2x" (labels at slider ends or above thumb)
- Button: "Export PNG"
- Link: "Give Feedback"

**Tooltip templates**:
- Ball: `[Segment Type] | [State]`
  Example: "Innovator | Migrating at Milestone 2"
- Band: `[Band Name]: [Percentage]% remaining`
  Example: "Early Adopters: 45% remaining"
- Bubble: `[Bubble Name] | [Population] consumers`
  Example: "P1: Incumbent Alpha | 650 consumers"

**Empty states**:
- N/A (no empty states in MVP—scenario is always loaded)

**Error messages**:
- "Export failed. Please try Chrome or screenshot manually."
- "Best viewed on desktop" (mobile banner)
- "Using compatibility mode" (WebGL fallback)

**Onboarding** (future):
- MVP skips onboarding tutorial. Context text + intuitive Play button = self-explanatory.
- V2 could add: Pulsing arrows pointing to Play button, or 5-second auto-play preview loop before user interaction.

---

### What media/assets are required?

**Icons**:
- Play icon (triangle pointing right)
- Pause icon (two vertical bars)
- Export icon (download arrow or share symbol)
- Optional: Info icon (for tooltip hints)

**3D/Graphics**:
- P0 bubble (garnet red, small sphere, slight transparency)
- P1 bubble (orange, large sphere, 5 horizontal band divisions, semi-transparent shell)
- P2 bubble (blue gradient, grows from dot to large sphere, slight glow/pulse)
- Balls (small spheres, gradient-capable, instanced for performance)
- String/line (thin, subtle, could be glowing thread or simple line)

**Textures/Effects** (optional):
- Subtle noise texture for dark background (depth)
- Glow/bloom effect for milestone pulses (if performance allows)
- Gradient ramps for ball color transitions (orange → blue)

**Typography**:
- Headings: Sans-serif, medium weight (e.g., Inter, Helvetica, system font)
- Body: Sans-serif, regular weight
- Tooltips: Sans-serif, small size, high contrast

**No images/photography**—entire visual is procedural/3D-generated.

---

### Tone and voice guidelines

**Overall tone**: Confident, educational, non-marketing.

**Principles**:
- **Be direct**: "This shows how markets transition" not "Discover the magic of market dynamics!"
- **Be precise**: Use theory terms correctly (Innovators, P1/P2, demand plane) without over-explaining
- **Be neutral**: This is a simulation, not a prediction. Avoid hype ("revolutionary," "game-changing") or guarantees.
- **Be accessible**: Assume user knows basic business strategy but not this specific theory. Define P0/P1/P2 once, then use consistently.

**Examples**:
- **Good**: "Innovators migrate first, followed by Early Adopters as P2 matures."
- **Bad**: "Watch in amazement as cutting-edge customers leap into the future!"
- **Good**: "Milestone 3 unlocks Early Majority adoption."
- **Bad**: "You won't believe what happens at Milestone 3!"

**Avoid**:
- Exclamation points (except in success confirmations)
- Marketing jargon ("synergy," "leverage," "disrupt")
- First-person ("we believe," "our vision")—this MVP is user-focused, not brand-focused

---

## Responsive/Accessibility Considerations

### Mobile vs. desktop priorities

**MVP = Desktop-first** (explicitly scoped in PRD/MVP docs)

**Why**: Target users (PMs, founders, strategy leads) do scenario planning on laptops. Mobile is <5% of expected use case.

**Desktop experience** (primary):
- Canvas: 1600×900px or larger (responsive to viewport)
- Controls: Below canvas, full-width buttons
- Tooltips: Offset 10px from cursor, smart boundary detection (stay on screen)

**Tablet experience** (secondary, reduced fidelity):
- Canvas: 1024×768px, reduced agent count (500 balls instead of 1000)
- Touch hover: Tap to show tooltip (not mouse hover)
- Controls: Larger tap targets (min 44×44px)

**Mobile experience** (tertiary, view-only):
- Banner: "Best viewed on desktop" (top, dismissible)
- Canvas: Portrait mode (balls stack vertically? or horizontal scroll?)
- No editing/interaction beyond Play/Pause
- Export disabled (or produces smaller 1080×1080 image)

**Breakpoints** (suggested):
- Desktop: ≥1200px wide
- Tablet: 768–1199px wide
- Mobile: <768px wide

---

### Accessibility must-haves

**MVP acknowledges gaps** (per MVPScope.md) but should still aim for:

**Color contrast**:
- WCAG AA minimum for text (4.5:1 ratio for body, 3:1 for large headings)
- P0/P1/P2 should be distinguishable by more than color alone:
  - P0: Red + small size + bottom-right position
  - P1: Orange + large size + right position + segmented
  - P2: Blue + left position + glowing
- Balls: Gradient is fine (not critical info) but labels/tooltips must meet contrast

**Keyboard navigation** (v2, but prep now):
- All controls should be keyboard-accessible (<button> elements, not <div> clicks)
- Tab order: Play/Pause → Speed slider → Export → Feedback link
- Spacebar = Play/Pause toggle
- Arrow keys = scrub timeline (v2 feature)

**Screen readers** (v2, but semantic HTML helps now):
- Use semantic HTML: `<button>`, `<label>`, `<main>`
- ARIA labels: `aria-label="Play animation"` on buttons
- Tooltips should have `role="tooltip"` and `aria-describedby`
- Canvas should have `aria-label` describing scene (e.g., "Interactive visualization showing market transition from P1 to P2")

**Motion sensitivity**:
- Reduced motion toggle (v2): If `prefers-reduced-motion` media query is true, slow animation to 0.5x by default and reduce ball count
- No auto-play on load (user must press Play)

**Visual clarity**:
- Large buttons (min 44×44px)
- Clear focus states (blue outline or glow on Tab)
- No critical info conveyed by animation alone—tooltips provide static alternative

**MVP trade-off**: Full WCAG AA compliance is v2 work. MVP is invite-only demo to 10-20 users (all mouse/trackpad). Document gaps for later.

---

### Browser/device constraints

**Supported** (must work):
- Chrome 90+ (desktop: macOS, Windows)
- Edge 90+ (desktop: Windows)
- Safari 14+ (desktop: macOS)
- Firefox 88+ (desktop: macOS, Windows)—may have WebGL quirks; Canvas fallback critical

**Reduced experience** (functional but not optimal):
- Safari on iPad (reduced agent count, touch controls)
- Chrome on Android tablets (view-only, may be slow)

**Not supported** (MVP):
- Internet Explorer (no WebGL support; show "unsupported browser" message)
- Mobile Safari on iPhone (too small; banner warns "desktop recommended")
- Older browsers (<2 years old)

**Constraints**:
- **WebGL 1.0 required** (or Canvas fallback)
- **JavaScript enabled** (no graceful degradation for JS disabled—it's a JS app)
- **Minimum screen resolution**: 1280×720px (smaller screens get cramped layout)
- **RAM**: Expect 2GB+ available (particle systems are memory-intensive)

---

## Design System Notes

### Is there an existing design system to follow?
**No.** This is a greenfield MVP. We're starting fresh.

However, the PRD specifies tech stack including **Tailwind CSS**, so we should leverage Tailwind's utility-first approach for rapid iteration.

---

### Core components needed (MVP)

**Buttons**:
- Primary button: Large (e.g., 48px height), high contrast (white text on blue background), rounded corners (8px), hover state (slight scale/glow)
- Secondary button: Medium (40px height), lower contrast (white border, transparent fill), hover state (fill with white, text inverts)
- Disabled state: Reduced opacity (0.5), no hover effect

**Sliders**:
- Speed slider: Horizontal, 200px wide, thumb is draggable circle (20px), track is thin line (2px), labels at 0.5x, 1x, 2x positions
- Thumb hover: Slight scale-up (1.1×)
- Active state: Thumb glows or changes color

**Tooltips**:
- Background: Solid black (or dark gray with 95% opacity)
- Text: White, small font (12-14px), padding (8px), rounded corners (4px)
- Arrow/pointer: Optional (CSS triangle pointing to hovered element)
- Fade-in: 200ms ease, fade-out: 150ms ease

**Cards/Panels** (if needed for layout):
- Background: Slightly lighter gray than canvas (subtle distinction)
- Border: 1px subtle line or shadow
- Padding: 16-24px

**Typography scale**:
- Heading (scenario title): 24-28px, semibold
- Body (context text): 16-18px, regular
- Labels (controls): 14-16px, medium
- Tooltips: 12-14px, regular

**Color palette** (from PRD):
- **Background**: Dark gray (#1a1a1a or similar)
- **P0**: Garnet red (#8B0000 or #A5292A)
- **P1**: Orange (#FF8C42 or #F77F00)
- **P2**: Blue tones (#4A90E2 or #0077B6)
- **Balls**: Gradient from P1 orange to P2 blue (interpolated)
- **String**: Subtle white/gray (#666 or rgba(255,255,255,0.3))
- **Text**: White (#FFFFFF) for primary, light gray (#CCCCCC) for secondary
- **Accents**: Highlight/focus state could be cyan (#00D9FF) or bright blue (#1E90FF)

**Spacing system** (Tailwind defaults work):
- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

**Shadows/Depth**:
- Subtle shadow for buttons: `0 2px 8px rgba(0,0,0,0.2)`
- Glow for milestone pulses: `0 0 20px rgba(74,144,226,0.8)` (P2 blue)

---

## Visual Reference/Inspiration

### Products with similar UX patterns worth studying

1. **Loom** (video demos): Clean single-purpose page, large Play button, minimal chrome, focus on the media content
   - **Learn from**: Simplicity, "press Play and understand" philosophy

2. **Observable** (data notebooks): Animated visualizations with scrubbing timeline, hover tooltips, export options
   - **Learn from**: Tooltip design, playback controls, code-to-visual translation

3. **Figma** (canvas tools): Infinite canvas, zoom/pan, object hover states, clean property panels
   - **Learn from**: Canvas interaction patterns (though MVP skips zoom/pan)

4. **Spotify Canvas** (album art animations): Looping, smooth animations, speed controls, export as video
   - **Learn from**: Playback UI, speed slider design

5. **AirTable Universe** (template demos): Pre-configured demos, "Use this template" CTA, immediate value without setup
   - **Learn from**: Hardcoded scenarios that still feel purposeful

6. **D3.js Gallery** (especially force-directed graphs): Physics-based motion, ball/node interactions, color gradients
   - **Learn from**: Visual encoding of data (size, color, position)

---

### What design aesthetics fit the brand?

**Primary aesthetic**: **Cinematic Data Storytelling**

**Descriptors**:
- **Minimal**: No clutter, no unnecessary UI chrome, focus on the animation
- **Sophisticated**: Dark theme, subtle gradients, professional color palette (not playful/toy-like)
- **Scientific**: Precise, data-driven, defensible (this is a simulation, not a decoration)
- **Immersive**: Full-screen canvas, smooth motion, ambient lighting (if 3D), users should feel "inside" the concept

**NOT**:
- Playful (no bouncy animations, no comic sans, no bright neon colors)
- Corporate/boring (no gray gradients everywhere, no clip art, no stock photos)
- Gamified (no points, no achievements, no progress bars beyond necessary playback timeline)
- Overwhelming (no particle explosions, no distracting background animations)

**Reference mood**:
- Apple product launch videos (clean, confident, focused)
- TED Talk data visualizations (Hans Rosling's Gapminder—motion shows change)
- NASA mission control displays (dark, high-contrast, purposeful)
- Bloomberg Terminal aesthetics (information-dense but structured)

---

## Additional Design Considerations

### Animation Timing & Easing

**Milestone pulses**:
- Duration: 500ms
- Easing: `ease-out` (quick start, slow end)
- Effect: P2 bubble glows briefly, then fades

**Ball migration**:
- Duration per ball: Variable (depends on segment and milestone rate)
- Easing: `linear` for travel along string (constant velocity feels like physics)
- Color transition: `ease-in-out` (smooth gradient shift)

**Tooltip appearance**:
- Fade-in: 200ms `ease-out`
- Position update: Instant (follows mouse with slight offset)
- Fade-out: 150ms `ease-in`

**Button interactions**:
- Press: 100ms scale-down (0.95×), `ease-out`
- Hover: 200ms glow or color shift, `ease-in-out`

---

### Export Specifications

**PNG export**:
- Resolution: 1920×1080px (16:9 aspect ratio, slide-deck standard)
- Format: PNG (lossless, transparency if needed for overlays)
- Filename: `p0-p1-p2-export-[timestamp].png`
- Quality: Max (no compression artifacts visible)

**What's captured**:
- Full canvas at current animation state
- All visible bubbles, balls, labels
- **Exclude**: UI controls (Play button, sliders) from export—only the visualization itself

**V2 (out of scope)**:
- GIF export (looping 10-second clip)
- MP4 export (higher quality, smaller file size)
- Custom resolution options (1080×1080 for social, 4K for print)

---

### Edge Case Handling (Visual)

**Scenario: Too many balls in transit**:
- Design: String can appear "busy" (many balls overlapping)
- Solution: Slight Z-axis offset (3D) or alpha blending (2D) so balls don't fully occlude each other
- Tooltip: Hover shows individual ball even if overlapping

**Scenario: User resizes window during playback**:
- Behavior: Animation pauses, canvas re-renders at new size, user must press Play again
- Alternative (v2): Dynamic resize without pause (complex)

**Scenario: Very slow computer**:
- Detection: Monitor FPS; if <30 FPS for 5 seconds, reduce agent count by 50%
- Notification: Small badge in corner: "Reduced detail for performance"
- User control (v2): Settings panel to manually set agent count (250, 500, 1000, 2000)

**Scenario: Colorblind users**:
- P0/P1/P2 should differ by position and size, not just color
- Tooltip text provides explicit labels ("P1: Incumbent Alpha")
- V2: Optional high-contrast mode or pattern overlays (stripes, dots)

---

## Developer Handoff Checklist

When implementing this design, ensure:

- [ ] Dark gray background (#1a1a1a) is set globally
- [ ] P0 is garnet red, P1 is orange, P2 is blue (use exact hex codes from color palette)
- [ ] Balls gradient smoothly from orange → blue over ~2 seconds of travel
- [ ] Five milestone pulses are visually distinct (timestamp-based triggers)
- [ ] Tooltips appear within 200ms of hover, positioned offset from cursor
- [ ] Play/Pause button toggles icon state (not just text label)
- [ ] Speed slider has three clear stops (0.5x, 1x, 2x) with labels
- [ ] Export PNG captures 1920×1080 canvas without UI controls
- [ ] Canvas fallback activates if WebGL unavailable (detect and switch)
- [ ] Mobile shows "Best viewed on desktop" banner (dismissible)
- [ ] All buttons are keyboard-accessible (Tab, Spacebar to activate)
- [ ] Fonts are system sans-serif or loaded web font (Inter/Roboto suggested)
- [ ] Page loads in <5 seconds on fast connection (target: <2.5 seconds)
- [ ] Animation runs at 60 FPS on test laptops (macOS + Windows Chrome)

---

## Appendix: Mental Models Summary

To help developers understand user expectations:

**Users think**:
- "This is like a video I can pause and inspect"
- "Balls = people, bubbles = products, string = the market shift"
- "Innovators are adventurous, Laggards are cautious—the animation should show this"
- "If I hover, I get more info. If I just watch, I get the story."
- "This is a demo, not a tool I customize (yet)"

**Users do NOT think**:
- "This is a dashboard with data inputs and controls"
- "I can edit the scenario parameters"
- "The numbers are precise forecasts"
- "This is like Excel with a visualization layer"

**Developer alignment**: Prioritize animation quality and tooltip clarity over UI flexibility. This MVP is a video player, not Photoshop.

---

**Document version**: v1.0 MVP
**Last updated**: October 28, 2025
**Next review**: After first 10 user tests (est. Week 5 post-launch)
**Change log**:
- 2025-10-28: Initial design spec created based on README, PRD, and MVPScope artifacts
