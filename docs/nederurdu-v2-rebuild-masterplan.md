# NederUrdu V2 rebuild masterplan

Status: **working direction; implementation is intentionally phased**  
Created from the live-product, curriculum, and Android audit on 2026-09-04.

### Implementation snapshot — 2026-09-05

| Part | Current state | Gate |
| --- | --- | --- |
| 0 | Baseline and source verification complete | Passed |
| 1 | Isolated shell, tokens, bilingual composition, responsive navigation, focused lesson controls, and layered scene system implemented | Automated responsive, zoom, motion, focus, and touch checks passed; production component gallery and offline/error states remain |
| 2 | Today, Journey, Practice, Toolkit, adaptive route model, five-scene People path, resume/progress, and completed-world state implemented | Automated navigation and Back paths passed; moderated three-second orientation check remains |
| 3 | All five original “Meet people” lessons and the integrated mission implemented from structured data | Curriculum audit and full browser walkthrough passed; two-profile moderated learner test remains |
| 4–9 | Not started as production migration | Pending |

The V2 prototype remains isolated under v2-prototype/. No V1 or Android
shipping file is changed by this phase.

## 1. Executive decision

NederUrdu V2 will be a ground-up product rebuild. The existing interface will
not be used as the visual or structural starting point. The new experience will
have a new application shell, navigation model, course map, lesson runtime,
component system, motion language, and maintainable front-end architecture.

Starting from zero does **not** mean deleting verified learning work or losing a
safe rollback. V1 stays intact while V2 is built beside it. The old runtime is
removed from the shipped app only after V2 passes curriculum, accessibility,
responsive, offline, progress-migration, and Android gates.

### Keep as evidence or infrastructure

- the verified A1 and A2 source analyses and the permanent teaching contract;
- the canonical concept, skill, prerequisite, mastery, and review metadata;
- existing learner progress until a tested V4-to-V5 migration replaces it;
- the Dutch TTS browser/Android bridge and Android Back integration;
- the offline PWA and Android wrapper as capabilities, not as UI constraints;
- current tests as behavioural evidence where their expectations remain valid.

### Replace

- the five-layer legacy CSS cascade and late override strategy;
- the single 4,700-line UI runtime;
- the long, flat, card-on-card course home;
- the preview page that repeats too much information before learning begins;
- the isolated lesson card and empty-space layout;
- global navigation that can overlap or compete with lesson content;
- decorative motion that does not explain direction, hierarchy, or feedback;
- mechanically repeated visual assets and any childish or generic imagery;
- curriculum presentation that exposes bank volume instead of a coherent story.

### North-star promise

> An Urdu-speaking adult always knows where they are, why the Dutch matters,
> what they are learning now, and what useful action comes next.

## 2. Evidence and current baseline

The two local source files were re-verified before this plan:

| Level | Source | Pages | Verified SHA-256 |
| --- | --- | ---: | --- |
| A1 | `545623269-TaalCompleet-A1.pdf` | 345 | `598b11096ac6e89889a5296cf28e1c3ad2876a8bc42ecbf92ff5088af3448976` |
| A2 | `821969468-Taalcompleet-A2.pdf` | 360 | `339333d24f9e11160921544125d0c8cdb839e5fc754d9f5b5de1da67e033e43d` |

The material is curriculum evidence only. NederUrdu will not reproduce either
book's wording, page layouts, exercises, photographs, or audio.

The current generated-course audit is structurally clean:

| Track | Lessons | Questions | Audit errors | Review flags |
| --- | ---: | ---: | ---: | ---: |
| Foundation/A0 | 45 | 2,121 | 0 | 0 |
| A1 | 48 | 1,891 | 0 | 0 |
| A2 | 28 | 1,095 | 0 | 0 |

Those totals are not proof of a strong learner experience. The live 390 x 844
walkthrough exposed the actual product problems:

- six stylesheets create more than 20,000 lines of competing presentation;
- the home screen is a long vertical document rather than an orienting place;
- level selection, today's action, motivation, progress, and the course map all
  compete for attention;
- the fixed tab bar interrupts lesson-preview content;
- the lesson screen is one flat panel with a large empty region and little sense
  of place, progression, or relationship between steps;
- hierarchy is produced mainly by more rounded rectangles, not by composition;
- navigation explains the current screen but not the learner's location inside
  the wider unit, scene, lesson, and phase.

This is an information architecture and interaction problem. Adding more glow,
particles, gradients, or animation to V1 would not solve it.

## 3. Product model

NederUrdu is for adult Urdu-speaking learners who need useful Dutch for life in
the Netherlands. It should feel calm, ambitious, respectful, and exceptionally
clear—not childish, exam-like, or game-like for its own sake.

### Product principles

1. **One meaningful action per view.** Every screen has one obvious primary
   next step; secondary detail is available without crowding the main task.
2. **Dutch in the world, Urdu as a bridge.** Dutch is visually prominent where
   it is being learned. Urdu unlocks meaning, instructions, and error repair,
   then fades as the learner gains independence.
3. **Teach before asking.** Unknown language is never scored. The learner first
   meets it in a situation, hears it, understands it, notices the pattern, and
   rehearses it.
4. **Depth must mean something.** Background, world, content, active task, and
   navigation layers have separate jobs. Elevation is not decoration.
5. **The journey is spatial, not endless.** Learners move between understandable
   worlds and scenes instead of scrolling through a giant undifferentiated path.
6. **Adult dignity.** Situations, writing, illustration, feedback, and rewards
   reflect real adult needs and identities.
7. **Progress is competence.** The app foregrounds can-do evidence, retrieval,
   and repaired mistakes—not XP or a raw question count.
8. **Polish is consistency.** Type, spacing, motion, controls, focus, audio, and
   feedback obey one system across every screen.

## 4. New information architecture

### Four top-level destinations

| Destination | Job | Main content |
| --- | --- | --- |
| **Today** | Remove decision fatigue | resume card, one new learning action, due review, weekly rhythm |
| **Journey** | Understand and explore the whole course | level compass, worlds, scenes, lessons, missions, progress |
| **Practice** | Strengthen weak or due skills | spaced review, mistakes, pronunciation, listening, saved practice |
| **Toolkit** | Use Dutch outside a lesson | phrasebook, alphabet and sounds, grammar patterns, saved words, quick help |

Profile, display, audio, accessibility, data, and reset controls move behind one
clearly labelled profile/settings control. Settings is not a primary learning
destination.

### Adaptive navigation

- Compact phone: four labelled destinations in a bottom navigation bar.
- Medium tablet: a compact navigation rail plus the active content pane.
- Expanded tablet/desktop: navigation rail + world/lesson list + supporting
  detail pane.
- Active lesson: global destinations are hidden. The learner gets a focused
  lesson header, phase map, safe-area action dock, and deliberate exit control.
- Back always follows this order: close transient help → previous teaching step
  → lesson brief → the exact journey location the learner came from.
- Each top-level destination preserves its own scroll and selection state.

This follows current platform guidance: use stable top-level navigation, adapt
bar to rail rather than stretching a phone layout, and use supporting/list-detail
panes when more space is available.

### The journey hierarchy

```text
NederUrdu
├── Foundation — optional sound, print, and interface support
├── A1 — everyday participation
│   └── World → Scene → Lesson → Unit mission
└── A2 — independent practical communication
    └── World → Scene → Lesson → Unit mission
```

- **World** is a real-life domain such as Home, Market, Health, Work, or the
  Municipality.
- **Scene** is a concrete situation inside that world.
- **Lesson** promises one observable can-do action.
- **Mission** recombines already practised skills in a fresh situation.
- **Review** is woven between scenes by the scheduler; it is not a duplicate
  path node pretending to be new content.

The learner can reach any world in two actions, return to the current scene in
one action, and open completed material without losing today's position.

## 5. Visual concept: The Living Bridge

The brand idea is a living bridge from Urdu to Dutch life. The product feels
like an explorable Dutch world rather than a quiz stack. It uses original
geometry inspired by bridges, windows, streets, canals, signs, and paper—not a
copied mascot, competitor layout, or generic neon dashboard.

### Five depth layers

| Layer | Purpose | Examples |
| --- | --- | --- |
| 0. Atmosphere | Establish place without stealing attention | light, horizon, quiet texture |
| 1. World | Show the domain and direction | neighbourhood, market, station, clinic silhouettes |
| 2. Content | Hold readable information | scene cards, can-do copy, progress, vocabulary |
| 3. Active task | Focus the current decision | answer surface, phrase builder, document, feedback |
| 4. Navigation | Keep orientation and control | top bar, phase map, action dock, help sheet |

Every layer gets a documented z-index token. Text and primary controls never
sit underneath decorative content. Decorative layers never receive pointer
events.

### Visual language

- Deep ink and emerald form the dependable foundation.
- Warm paper provides long-form reading comfort.
- Saffron marks forward movement and achievement.
- Canal blue identifies listening, public information, and Dutch-world context.
- Unit accents add recognition without changing core interaction semantics.
- Surfaces use controlled tonal separation, cast shadows, edge highlights, and
  foreground overlap to create depth. The system does not rely on glass blur.
- Corner shape changes by role: navigational worlds, teaching sheets, compact
  controls, and feedback surfaces must not all look like the same card.
- Dutch uses a restrained contemporary grotesk; Urdu UI uses a clear sans; Urdu
  explanations may use a highly readable Naskh face. Font assets ship locally
  for Android and offline parity.
- Original scene art is built as reusable foreground, midground, and background
  SVG/WebP layers. It depicts adult life and remains legible at small sizes.

### Initial palette targets

| Token | Direction |
| --- | --- |
| Ink | `#102A26` |
| Deep emerald | `#0B5C4E` |
| Bridge green | `#1B8C72` |
| Saffron | `#F2B94B` |
| Canal blue | `#2E6F9E` |
| Warm paper | `#FFFDF7` |
| Mist | `#EAF4F0` |

These are art-direction targets, not acceptance by eye alone. Text, icons,
focus, disabled states, and every adjacent surface pair will be measured.

### Motion language

- 160 ms for press/state feedback, 240 ms for local changes, 360 ms for a
  screen or shared-element transition.
- A selected scene expands into its lesson brief so the learner understands
  where the new surface came from.
- Progress moves in the same physical direction as the learner's action.
- Correct answers settle into place; corrections reveal and highlight the exact
  changed part.
- No screen waits for animation. Frequent controls do not perform elaborate
  choreography.
- No perpetual foreground motion. Any ambient movement is low-amplitude,
  bounded, and absent from lesson reading/answering states.
- `prefers-reduced-motion` replaces spatial and scale transitions with short
  fades and keeps all meaning available without motion.

## 6. Course architecture

### Foundation: optional, adaptive support

Foundation replaces “A0 as a compulsory long course” with an available support
track. A short, respectful diagnostic can recommend—but never force—practice
with:

- operating replay, slow audio, microphone, typing, and answer controls;
- alphabet and common keyboard forms;
- word boundaries, capitals, and punctuation;
- high-value Dutch sound contrasts;
- copying a name, phone number, and one model sentence;
- essential survival phrases such as asking for repetition and help.

Learners who demonstrate these skills start A1 immediately. Foundation remains
reachable later from Toolkit and prerequisite refreshers.

### A1: eight worlds

| World | Communicative spine |
| --- | --- |
| 1. Meet people | greet, introduce, spell, origin, residence, family, simple personal questions |
| 2. Learn Dutch | classroom instructions, dates, numbers, help, repetition, polite requests |
| 3. Home and neighbourhood | describe rooms, locate things, read rental information, report a simple problem |
| 4. Food and shopping | choose and buy food, prices, meals, checkout, short recipe language |
| 5. Health | symptoms, appointments, doctor/pharmacy interaction, medicine information |
| 6. Clothing and time | describe and choose items, sizes, opening hours, clock time, problems |
| 7. Travel and place | routes, directions, permission/ability, departure boards, bus and train information |
| 8. Leisure and social life | hobbies, forms, weekend plans, clarification, negation, short exchanges |

Sound-print work, questions, verb forms, noun phrases, word order, and
pronunciation spiral through these worlds. They do not become isolated grammar
zones.

### A2: eight worlds

| World | Communicative spine |
| --- | --- |
| 1. Housing and moving | describe and compare homes, neighbours, travel information, invitations |
| 2. Life in the Netherlands | customs, restaurant, weather/news, recipes, past weekend or holiday |
| 3. Children and family | school messages, appointments, child services, purpose, relaying information |
| 4. Shopping and services | phone/online orders, complaints, instructions, meetings, object pronouns |
| 5. Education and training | courses, rules, proposals, internships, past experience, future plans |
| 6. Finding work | vacancies, information calls, forms, applications, goals, interviews |
| 7. At work | tasks, safety, sickness/leave, notes, small talk, comparison and frequency |
| 8. Municipality and public life | applications, repairs, phone menus, police, waste, news, public information |

Main-clause order, inversion, subordinate clauses, past forms, modals,
adjectives, pronouns, and communication strategies recur with rising
independence.

## 7. The new lesson experience

The curriculum phases remain rigorous, but the interface presents them as one
coherent scene rather than a checklist of seven mini-products.

| Learner-facing moment | Curriculum job | What the UI does |
| --- | --- | --- |
| **Brief** | can-do + situation | shows who, where, why, and the single promised action |
| **Enter the scene** | comprehensible input | plays a short dialogue/message/sign with concise Urdu support |
| **Decode** | meaning, sound, print | teaches a small lexical set with audio, stress, article/form, and chunks |
| **Notice** | model before rule | visually reveals the sentence pattern and one useful contrast |
| **Rehearse** | controlled + guided combination | moves from recognition to supported building and speaking |
| **Act** | purposeful use | performs the adult action in a believable new variation |
| **Check and repair** | transfer, feedback, retry | checks reduced-support use, explains errors, reteaches, and retries |

These moments may share a screen. A short lesson should feel like one episode,
not seven menus.

### Persistent lesson orientation

- Header: exit/back, `World / Scene / Lesson`, and concise progress.
- Phase map: compact visual timeline; tap opens a labelled lesson map. It never
  allows skipping into untaught scored production.
- Supporting pane or help sheet: Urdu meaning, vocabulary, grammar note, and
  transcript. It is on demand and preserves the learner's exact position.
- Main stage: scene or current interaction.
- Action dock: one primary action and, when needed, one quiet secondary action.
  The scroll container always includes measured safe-area clearance.

### Feedback

- Correct feedback confirms meaning or communicative effect, not only “right.”
- Wrong feedback explains what the learner's answer communicated and highlights
  the changed form or order.
- The learner returns to the relevant model, completes an easier supported
  attempt, and retries with a fresh example.
- Score, streak, and celebration remain secondary to the can-do recap.

## 8. Technical architecture

V2 will be developed in a separate source and build boundary, then compiled to
static assets for the web and `file:///android_asset/` WebView.

```text
src-v2/
├── app/                 # route shell, screen composition, error boundaries
├── components/          # navigation, surfaces, controls, audio, feedback
├── features/
│   ├── today/
│   ├── journey/
│   ├── lesson/
│   ├── practice/
│   └── toolkit/
├── curriculum/          # V5 schema, adapters, level and unit content
├── state/               # progress, mastery, review, session and migrations
├── platform/            # web TTS, Android bridge, Back, storage, offline
├── styles/              # tokens, base, layout, components, motion, RTL
└── assets/              # local fonts, icons and layered scene art

dist-v2/                 # static production output; only this ships
```

### Architecture decisions

- TypeScript component modules with a small declarative UI layer and a static
  production bundle; no runtime network dependency.
- Hash-based routes so browser refresh, Android file URLs, deep navigation, and
  hardware Back behave predictably.
- A single design-token source for color, type, spacing, radius, depth, motion,
  safe areas, focus, and breakpoints.
- Curriculum data is separate from rendering. V4 content is read through an
  adapter during the pilot; V5 units replace it one verified scene at a time.
- Progress writes are versioned and atomic. V4 remains as a recovery record
  after V5 migration.
- Web Speech and the Android TTS bridge implement one audio interface.
- The Android sync copies `dist-v2/` recursively; source files never ship.
- Service-worker cache names include the V2 release version and do not conceal
  local changes during development.
- Tests use page objects and semantic roles instead of selectors tied to the old
  visual hierarchy.

## 9. Phased implementation

Each phase ends with a visible, testable artifact. A phase does not pass because
files exist; it passes its stated gate.

### Part 0 — Baseline, safety, and source verification — complete

Deliverables:

- preserve the dirty V1 working tree and avoid destructive replacement;
- verify A1/A2 source identity and hashes;
- run the current curriculum audit;
- inspect phone home, preview, and lesson screens;
- inventory the web, offline, TTS, progress, review, Android, and Back paths.

Gate: enough evidence exists to distinguish reusable learning infrastructure
from UI/runtime debt. **Passed.**

### Part 1 — Product foundation and design system — prototype implemented

Deliverables:

- V2 source/build boundary and independent entry point;
- route shell for Today, Journey, Practice, Toolkit, and focused lessons;
- tokens for type, color, spacing, depth, shape, motion, focus, and safe area;
- bilingual typography and RTL/LTR composition rules;
- core buttons, icons, surfaces, sheets, navigation bar/rail, loading, empty,
  error, offline, and disabled states;
- a component gallery at all supported densities and text sizes.

Gate: all core components pass contrast, focus, 320 px width, 200% text zoom,
reduced motion, and touch-target checks before feature screens use them.

Current evidence: the prototype passes automated geometry and interaction
checks at six target viewports plus 200% text. Production loading, error,
offline, and full component-gallery coverage still belong to Part 4.

### Part 2 — Journey and navigation prototype — automated gate passed

Deliverables:

- Today screen with one clear learning action and one due-review action;
- adaptive Journey atlas with level compass, worlds, scenes, and stable resume;
- phone bar, tablet rail, and expanded supporting-pane layouts;
- scene-to-brief shared transition and exact scroll/selection restoration;
- real loading, locked, available, in-progress, due, completed, and secure states.

Gate: a learner can identify the next action in under three seconds, reach any
world in two actions, resume in one, and use Back without losing location.

Current evidence: all four destinations, phone bar, desktop rail, world
switching, five available People scenes, visibly locked future worlds, route
scroll reset, persisted completion, completed-world review routing, and
hardware Back pass the browser walkthrough. The three-second claim still
requires a short moderated learner test.

### Part 3 — A1 vertical slice: Meet people — functional slice complete

Build one complete, original subchapter before migrating the whole course:

1. greet and introduce oneself appropriately;
2. say and spell a name;
3. say where one comes from and lives;
4. ask the other person the same questions;
5. complete a fresh community-centre or neighbour introduction mission.

The slice includes scene input, Dutch audio and slow audio, Urdu support,
pronunciation, vocabulary in chunks, `zijn/wonen` and question patterns,
recognition, guided combination, speaking rehearsal, short writing, feedback,
repair, transfer, and later review links.

Gate: two learner profiles—a confident reader and a learner needing extra
sound/print support—can complete the real flow without encountering an
untaught target or an interface dead end.

Current evidence: all five scenes implement Brief → Scene → Decode → Notice →
Rehearse → Act → Fresh Check → Complete from one structured catalog. The audit
passes teaching-before-scoring, integrated meaning/sound/use, focused lexis,
specific repair, personalized production, fresh transfer, retrieval links, and
mission evidence. The browser completes all five lessons in sequence with
zero runtime errors and survives reload. Moderated testing with both named
learner profiles remains the final human gate.

### Part 4 — Learning runtime and Curriculum V5

Deliverables:

- typed V5 schema for worlds, scenes, lessons, input, lexis, pattern, sound,
  tasks, feedback, repair, mission, and review links;
- session engine enforcing input → recognition → guided use → action → check;
- reusable renderers for dialogue, audio, image/meaning, sentence rails,
  word-bank, document, form, ordering, choice, speaking self-check, and writing;
- prerequisite guidance and optional Foundation refreshers;
- mastery and review engine with V4-to-V5 progress migration;
- audits that reject production-before-teaching, hidden new material, generic
  distractors/feedback, broken audio, and missing review/transfer links.

Gate: the pilot passes automated audit, full learner walkthrough, progress
reload, mistake repair, due review, offline reload, and Android Back.

### Part 5 — Foundation migration

Deliverables:

- short entry diagnostic;
- optional alphabet, sound-print, typing, audio-control, and survival-phrase
  scenes;
- skip and re-enter paths without shame, lockout, or loss of A1 position;
- Toolkit links to the same support content rather than duplicate lessons.

Gate: Foundation helps learners who need it and never becomes compulsory busy
work for learners who do not.

### Part 6 — A1 migration, world by world

Order:

1. Meet people;
2. Learn Dutch;
3. Home and neighbourhood;
4. Food and shopping;
5. Health;
6. Clothing and time;
7. Travel and place;
8. Leisure and social life.

For each world: freeze the coverage matrix, author scenes, implement the unit
mission, schedule cross-world retrieval, audit, manually walk early/middle/late
lessons, and only then retire equivalent V1 content.

Gate: the complete A1 grammar, vocabulary, pronunciation/literacy, strategy,
genre, and four-skill matrix is covered with zero errors and zero review flags.

### Part 7 — A2 migration, world by world

Order:

1. Housing and moving;
2. Life in the Netherlands;
3. Children and family;
4. Shopping and services;
5. Education and training;
6. Finding work;
7. At work;
8. Municipality and public life.

A2 increases text/audio length, connected language, document complexity,
writing, and independence gradually. It does not become a set of longer A1
translation questions.

Gate: the full A2 form/function spiral and every unit can-do mission pass the
same content, learner-flow, responsive, offline, and Android criteria.

### Part 8 — Practice, Toolkit, and personalization

Deliverables:

- due-review queue organised by useful skill, not question bank;
- mistake repair with model, explanation, supported retry, and fresh transfer;
- pronunciation studio with hear/notice/rehearse/compare flow;
- useful phrasebook and grammar pattern library linked back to learned scenes;
- daily plan that balances new learning and retrieval;
- settings for Urdu support, sound, motion, text size, and literacy help.

Gate: every surface explains why an item is present and links practice back to
the learner's communicative goal.

### Part 9 — Hardening, Android parity, and cutover

Deliverables:

- responsive and visual QA at 320x568, 360x800, 390x844, 768x1024, 1024x768,
  and 1440x900;
- portrait, landscape, text zoom, keyboard, screen reader, reduced motion,
  low-performance, offline, and stale-cache testing;
- clean Android asset sync, exact mirror comparison, debug build, device TTS,
  hardware Back, update/persistence, and safe-area testing;
- V4-to-V5 migration rehearsal using representative real progress records;
- removal of V1 from the production bundle only after rollback is documented.

Gate: the release checklist has no unresolved learning, accessibility,
navigation, visual, performance, offline, migration, or Android blocker.

Public Play publication, account ownership, payment, legal declarations, and
private release-signing decisions remain separate and require explicit user
approval.

## 10. Quality bars

### Navigation and comprehension

- One primary CTA per state.
- No hidden top-level destination and no “More” overflow destination.
- No fixed control obscures content, focus, feedback, or the last scroll item.
- Current world, scene, lesson, and phase are available without leaving the
  lesson.
- Closing help restores focus and exact internal scroll position.

### Learning

- One observable can-do action per lesson.
- New words appear in chunks with meaning, sound, print, form, and context.
- Grammar is introduced through a sentence that accomplishes the lesson goal.
- Recognition precedes unsupported recall or production.
- Every error has explanatory feedback and an easier repair path.
- Final checks use a fresh context.
- Important items receive roughly seven meaningful encounters across different
  activity types and later dates.
- All four skills are integrated across every world.

### Visual and accessibility

- No horizontal overflow at supported widths.
- Body text meets WCAG AA contrast; interaction/focus states meet non-text
  contrast and have a clearly visible two-pixel-equivalent focus indicator.
- Controls meet or exceed a 44 x 44 CSS pixel practical target.
- Urdu shaping, mixed-direction lines, numerals, punctuation, and Dutch terms
  are checked in the browser, not inferred from source.
- 200% text zoom does not remove content or functionality.
- Motion is optional, brief, cancellable, and never the sole carrier of meaning.

### Performance

- No always-on blur field, pointer tracker, or large full-screen animation in a
  lesson.
- Images have explicit dimensions and responsive sources; world art is loaded
  only when needed.
- The app shell renders without waiting for remote fonts or services.
- V2 UI code and critical CSS have explicit bundle budgets set during Part 1;
  curriculum data is measured separately and loaded by active track/world.
- A constrained-device profile receives the same hierarchy and feedback with
  simpler compositing, not a visually broken fallback.

## 11. External design references

These are principles and quality bars, not templates to copy:

- [Apple Human Interface Guidelines: tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars)
- [Apple Human Interface Guidelines: motion](https://developer.apple.com/design/human-interface-guidelines/motion)
- [Material 3 canonical and layered layouts](https://m3.material.io/foundations/layout/canonical-examples/overview)
- [Android adaptive navigation](https://developer.android.com/develop/adaptive-apps/guides/build-adaptive-navigation)
- [Duolingo's learning-path rationale](https://blog.duolingo.com/new-duolingo-home-screen-design/)
- [Duolingo's cross-tab craft and QA write-up](https://blog.duolingo.com/core-tabs-redesign/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

## 12. Definition of “done”

NederUrdu V2 is not done when it has attractive screenshots. It is done when:

1. an absolute beginner can enter, orient, learn, make an error, recover, and
   resume without external help;
2. A1 and A2 coverage match the verified source-derived inventories without
   copying protected textbook content;
3. every representative learner journey feels coherent from Today through a
   world, scene, lesson, mission, and later review;
4. the visual system feels dimensional and premium while text remains calm,
   readable, and adult;
5. phone, tablet, desktop, offline web, and Android WebView behave as one
   product;
6. existing progress migrates safely and V1 can be recovered until cutover;
7. automated audits are clean and real browser/device walkthroughs pass.

The first implementation target is Parts 1–3: the clean V2 shell, the adaptive
Journey atlas, and the complete A1 “Meet people” vertical slice. That slice is
the design and learning benchmark for every later world.
