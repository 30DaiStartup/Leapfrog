Product Requirements Document (PRD)
Product: P0–P1–P2 Demand Plane Visualization
Owner: Zach Henderson
Date: October 28, 2025
Version: v0.9 (PRD draft for MVP)

1) Product Overview
Problem statement (what user pain are we solving?)
Decision‑makers, product leaders, and investors struggle to see how markets transition from an incumbent (P1 / current alpha) to a leapfrogging innovation (P2 / improvable gamma) while legacy solutions (P0s) persist. Traditional charts (S‑curves, share lines) fail to convey who moves first, why they move, at what rate, and how control factors shape outcomes—making strategy debates abstract, slow, and error‑prone.
Solution summary (our approach in 2–3 sentences)
Build an interactive, cinematic visualization that simulates demand shifting from P1 → P2 along a “demand string,” with consumers represented as balls that migrate in milestone‑driven waves. The model encodes adoption by segment (Innovators → Laggards) and surfaces Control Factors (Dominion/Contingency/Influence) as first‑class scenario levers, so users can press Play and watch the market evolve—while understanding why it happens. [P0–P1–P2 D...Spec.page]
Target users

Primary persona:
Strategy/Product Lead (PM/GM/Founder). Needs to explain and stress‑test the path for a new P2 to overtake P1, justify milestone scope/SAM/SOM, and align execs and investors around timing, risk, and required control actions.
Secondary personas:
• Investor/Finance Partner (needs confidence in adoption dynamics and resource pacing)
• GTM/RevOps Leader (needs to plan capacity, references, channels aligned with segment timing)
• Competitive Intelligence/Corporate Strategy (needs to narrate superiority criteria shifts and overshoot/surrender moments).

Success criteria (how we’ll measure success)

Engagement: ≥70% of users complete a full scenario run (configure → play → review), with average session time ≥6 minutes.
Comprehension: Post‑run survey ≥80% report “clearer understanding” of when & why segments move (Likert ≥4).
Collaboration/Share: ≥50% of runs exported or shared (PNG/GIF/URL) with annotations.
Adoption: ≥10 active scenarios per account per month by target users in first 60 days after GA.
Performance: Smooth animation at 60 FPS for 10k agents on modern laptops (Chrome/Edge/Safari).


2) User Stories & Use Cases
Core user journeys (start‑to‑finish flows)

Explain P2’s growth path
As a PM/Founder, I set 5 milestones (slices), each with segment fit (value coverage), capacity, and Control Factor weights; I press Play and watch how Innovators → Laggards migrate from P1 → P2 as P2 grows, while P1 shows band perforations (empty seats). I export a gif and annotate why Slice 3 unlocks Early Majority.
Stress‑test against headwinds
As a Strategy Lead, I toggle Contingency headwinds (e.g., regulation delay) for Slice 2 and see how adoption slows (balls queue at the string), then adjust Influence (lighthouse references) to partially offset. I compare scenarios A/B and pick the plan with better certainty.
Show P0 persistence
As a CI lead, I place several P0s “to the north,” each with tiny persistent demand, and demonstrate that even as P2 ascends, P0s remain in niches (visual credibility in the story). [P0–P1–P2 D...Spec.page]
Board update narrative
As a Founder, I load last month’s scenario, update milestone 3 capacity, and append a Control Factor explanation layer that narrates Dominion (our choices), Contingency (headwinds), Influence (partners) that changed adoption rates. Export deck images.

Edge cases to consider

Multiple P2s (competing gammas) vying for the same users (parallel strings, split flows).
Capacity shock within a slice (supply_cap drops; in‑transit balls queue).
No fit for certain segments (balls don’t move; story must explain “why”).
Lagging machines/browser fallback (auto‑reduce agent count; degrade to Canvas).
Data loss on refresh (autosave drafts).
Mobile portrait (reflow bands and strings to stay legible).

What’s explicitly OUT of scope (MVP)

Real‑world data ingestion, forecasting, or market sizing accuracy claims (we simulate; we do not forecast).
Revenue/price optimization or full S‑curve estimation beyond the visualization heuristics.
Team collaboration (live multi‑editor) and comments (MVP exports only).
Payments/subscriptions (unless we decide to gate advanced exports).


3) Functional Requirements
Must‑have features (by capability)
Scenario Setup

Create/edit 5 milestone slices with value‑coverage by segment, capacity, SOM/SAM gating, and Dominion/Contingency/Influence sliders. Defaults provided.
Set population size and segment mix (Innov–Lagg).
Place/label P0 clusters. [P0–P1–P2 D...Spec.page]

Playback & Visualization

Play/Pause/Scrub timeline; speed control.
Balls migrate along center string from P1 (right) → P2 (left); color‑lerp orange→blue.
P1 shows band perforations (holes), not radius shrink, until threshold; P2 grows with pulse at milestones.
Explainability Overlay: on milestone boundaries, popchips show Control Factor rationale.

Output & Sharing

Export PNG/GIF/MP4 (short capture) and shareable URL with read‑only params snapshot.
Save/load scenarios to user account (versioned).

User interactions & expected behaviors

Hover a ball → tooltip with segment, milestone trigger, current propensity.
Hover a band/cluster → show remaining population and % moved.
Adjust a slider during pause → model recomputes preview deltas before resume.

Data requirements (capture/display)

Scenario metadata (name, owner, timestamps).
Milestone configs (coverage vector, capacity, SOM, control sliders).
Population + segment mix; visual palette selection.
Render/export artifacts (thumbnails, small videos).
No PII beyond account identity; scenario content is business data users choose to store.


4) Non‑Functional Requirements
Performance expectations

Animation: 60 FPS target for 10k agents on modern laptop (Chrome/Edge/Safari).
Load: <2.5s to interactive on fast connection; <5s on 3G throttled.
Export: 10‑second scene export completes <15s (client‑side capture preferred).

Security/privacy considerations

Authenticated access required to view/edit scenarios.
Scenario data is customer confidential; use project‑scoped rules; no sharing by default.
Data residency: US (default); disclose Firebase/hosting region.
No collection of sensitive PII.
Provide data export/delete self‑service (basic GDPR‑style controls).

Accessibility requirements

WCAG 2.1 AA color contrast; provide pattern/shape cues (not just color).
Keyboard navigation for all controls; focus states; captions for tutorials.
Motion sensitivity toggle (reduced motion: fewer particles, slower lerp).

Browser/device support

Desktop: Latest Chrome/Edge/Safari/Firefox.
Tablet: iPad Safari (reduced agent count).
Mobile: view only (no heavy editing) in MVP.


5) Open Questions & Assumptions
Assumptions

Five slices are sufficient to narrate P2’s ascent for MVP.
Users will accept a simulation (heuristics) vs. “forecast,” if we provide transparency and control factor explainability.
Animation realism is a differentiator for stakeholder persuasion.

Needs validation/research

Default segment mix presets by industry—do we provide starter templates?
How many agents are “enough” for comprehension (5k vs 10k vs 50k)?
Which explainability artifacts resonate most (action‑graph HUD vs. textual callouts)?

Technical unknowns

Client‑side video capture limits across browsers; do we need a server render path?
How many concurrent export jobs before throttling is needed?


6) Dependencies & Constraints
External integrations needed

Auth (Google OAuth via Firebase Auth).
Storage/DB (Firestore + Firebase Storage).
Optional AI narrative: generate milestone summaries (Claude/Gemini).
Analytics & monitoring (Sentry/PostHog or Firebase Analytics).

Technical limitations

WebGL performance varies; must have Canvas fallback.
SSR with WebGL components requires dynamic import (Next.js constraint).

Timeline/resource constraints

MVP target: 2 weeks dev for core sim + UI + export (1 engineer + 1 design).
Additional 1–2 weeks for polish and explainability HUD.


7) Recommended Tech Stack (optimized to leverage existing tools)

Guiding principles: Reuse the current Next.js + React + TypeScript + Vercel + Firebase stack where it fits; add minimal new tech for high‑FPS graphics and narrative AI.

Frontend / User Interface

Recommended tool: React (Next.js app router) + TypeScript + Zustand + Tailwind CSS + WebGL (Three.js / React‑Three‑Fiber) with Canvas fallback (D3/Canvas)
Why this tool: React + R3F offers GPU‑instanced particles for tens of thousands of agents with rich lighting; Canvas/D3 gives a fast fallback for weaker devices. Zustand provides minimal, fast state management for real‑time controls.
Existing tool fit: Yes (Next.js, React, TypeScript, Zustand, Tailwind are already in use).
Key capabilities needed: High‑FPS animation, parameter controls panel, tooltip system, export button, responsive layout, dark theme.
Alternatives considered: PixiJS (excellent 2D; less 3D); plain D3/Canvas (simpler but less cinematic); SvelteKit (lean, but we already use Next). Trade‑off: Three.js adds learning curve but unlocks visual polish.

Backend / Server

Recommended tool: Next.js API routes (Serverless on Vercel) + Firebase Cloud Functions (if needed)
Why this tool: Minimal backend—only for auth callbacks, signed URL creation, export post‑processing if we need server capture, and AI proxy endpoints.
Existing tool fit: Yes (Vercel + Next.js + Firebase are existing).
Key capabilities needed: Auth handshakes, storage writes, limited server transforms.
Alternatives: Node/Koa service (overkill); Cloud Run (more ops). Trade‑off: serverless cold‑start vs. simplicity.

Database / Data Storage

Recommended tool: Firestore (document DB) + Firebase Storage
Why this tool: Scenarios are JSON docs with nested arrays (milestones, sliders) and associated media exports—natural fit for document storage; Storage for images/gifs.
Existing tool fit: Yes (Firestore/Storage).
Data structure fit: One Scenario document per version; subcollection for Exports; user profile doc for preferences.

Authentication & User Management

Recommended tool: Firebase Auth + Google OAuth
Why this tool: Fast, familiar SSO; rule‑based access to scenarios.
Existing tool fit: Yes.
Security requirements: Email/Google SSO; role = owner/editor/viewer; project‑scoped Firestore rules; token‑based download links.

Payment Processing (if applicable later)

Recommended tool: Stripe
Why this tool: Easy seat‑based SaaS subscriptions, customer portal, metered exports if needed.
Existing tool fit: No, but common and simple to add.
Integration complexity: Low–medium; webhooks + role flags.

Email / Notifications

Recommended tool: Resend or SendGrid (transactional)
Why this tool: Simple transactional emails (signup, export ready).
Existing tool fit: No (not listed), but lightweight to add.
Volume expectations: Low transactional; no marketing in MVP.

File Storage / Media

Recommended tool: Firebase Storage
Why this tool: Store thumbnails/exports, secure access, signed URLs.
Existing tool fit: Yes.
Storage needs: PNG/GIF/short MP4 (<50MB each), thumbnails.

APIs / Integrations

Recommended tool: Anthropic Claude (for narrative generation), Google Gemini (already available) as backup
Why this tool: Auto‑generate milestone explanations and “why this changed” overlays from scenario params (text only, optional).
Existing tool fit: Gemini is available; Claude not listed—add if we want stronger long‑form reasoning.
Third‑party services needed: Claude/Gemini. Keep behind a server route.

Hosting / Infrastructure

Recommended tool: Vercel
Why this tool: Simple global deploys, great for Next.js, preview URLs.
Existing tool fit: Yes.
Scale requirements: Global read; compute is light (client‑heavy). Bandwidth mainly for exports.

Analytics / Monitoring

Recommended tool: Sentry (errors) + PostHog or Vercel Analytics (product usage)
Why this tool: Sentry for animation/runtime errors; product analytics to track runs, exports, and conversion.
Existing tool fit: Not listed; can also use Firebase Analytics if preferred (less granular on web).
What we need to track: Scenario creations, milestone edits, play events, export events, FPS telemetry.

Development Tools

Version control: Git + GitHub (branches + PRs).
CI/CD: Vercel auto‑deploy previews per PR.
Testing: Vitest/Jest (unit), Playwright (e2e flows and visual diffs of scenes), ESLint/Prettier.
Storybook (optional) for UI controls panel.


8) Stack Integration Assessment

Fit together: Next.js + Vercel + Firebase is a common, well‑trodden combo; adding Three.js/R3F is straightforward (with dynamic imports to avoid SSR pitfalls). Zustand integrates cleanly with React and R3F.
Friction points: WebGL in SSR—must disable SSR for the canvas scene; ensure graceful fallback to Canvas/D3. Exporting MP4 may require client WebM + server transcode if needed.
Learning curve: R3F adds moderate learning but yields high payoff in polish and performance.
Vendor lock‑in: Firestore data model is portable (JSON), but rule syntax is Firebase‑specific; Vercel is easy to migrate; Claude/Gemini are abstracted behind our API to mitigate lock‑in.


9) Cost Estimation (assumptions: low traffic MVP; 1–5 active users/day; 100 scenarios; 100 exports/month)





















































ToolFree tier sufficient?Est. monthly @ launchEst. monthly @ 10×VercelYes (Hobby) for previews; likely Pro for team$20–$40$80–$120Firebase (Auth/Firestore/Storage)Likely Yes (Spark) → Blaze minimal$0–$25$50–$150SentryYes (small)$0–$29$29–$100PostHog / Vercel AnalyticsYes (starter)$0–$20$20–$100Resend/SendGridYes (low volume)$0–$15$15–$50Claude/Gemini (optional)Depends on tokens$0–$50$100–$300StripeNo monthly; fees per tx$0scales with revenue
Total stack cost: ~$20–$100/month (MVP) → ~$300–$800/month (10×)
(Pure estimates; revisit once usage is known.)

10) Stack Risks & Mitigation

WebGL performance variance → Mitigation: auto‑detect GPU; dynamic agent count; Canvas fallback.
Export reliability across browsers → Mitigation: prefer PNG/GIF first; offer WebM; add server transcode only if needed.
AI vendor pricing/limits → Mitigation: toggle between Gemini/Claude; cache narratives; make AI optional.
Firestore rule complexity → Mitigation: small, well‑scoped collections; unit tests for rules; emulate locally.
Team skill on R3F → Mitigation: limit shader complexity in MVP; encapsulate scene in a small module.


11) Decision Rationale


Why this stack?

Leverages existing tools (Next.js, React, Vercel, Firebase, Zustand) to move fast.
Cinematic UX with R3F/Three.js to make the theory visceral (core differentiator).
Low‑ops serverless footprint; client‑heavy rendering.
Clear path to explainability (Control Factors overlay) aligned with the method.
Optional AI narrative to accelerate storytelling without coupling product value to AI cost.



Optimizing for: speed to insight, persuasive storytelling, and a shareable artifact—while keeping costs low and avoiding backend complexity.


Assumptions: Users value a simulation that illustrates superiority criteria shifts and overshoot/surrender dynamics over precise forecasts.


Reconsider if: We must ingest real market data; require enterprise SSO/compliance now; or if exports demand heavy server rendering.



12) Developer Enablement

Docs & resources: Next.js, Vercel, Firebase, Three.js/R3F, Zustand all have extensive docs and examples; many community templates exist.
Common stack: Very common and easy to hire for; R3F is niche but growing.
Onboarding time: 0.5–1 day to clone, run, and deploy preview; ~2–3 days to be productive in scene code.


13) Appendices (Conceptual Alignment)

Planes of demand & the need for visualization (why the visual matters to comprehension). [P0–P1–P2 D...Spec.page]
Alpha/Beta/Gamma/Delta dynamics & superiority criteria (theory driving milestone design).
Control Factors + DOT (Discovery/Optimality/Testing) informing scenario sliders and the explainability HUD.


14) Next Steps (Actionable)

Lock milestone defaults (names, target segments, coverage vectors).
Confirm control sliders (Dominion/Contingency/Influence) ranges and labels.
Approve palette & layout (P0 garnet, P1 orange, P2 blue, dark gray background).
Implement MVP (2 weeks): scene + hazard model + controls + export + storage.
Usability test with 3–5 strategy leads; refine explainability overlay.