# NederUrdu V2 north-star prototype

This is an isolated, from-zero product direction for NederUrdu. It does not
replace, import, or mutate the current V1 runtime. Its purpose is to make the
new navigation, hierarchy, visual depth, bilingual composition, and
learning-before-testing contract tangible before the full curriculum is
migrated.

## Included now

- adaptive Today, Journey, Practice, and Toolkit destinations;
- phone bottom navigation and wide-screen navigation rail;
- Foundation, A1, and A2 world architecture based on the verified curriculum
  evidence;
- a complete five-scene A1 “Meet people” world: greet and introduce, spell a
  name, say origin and residence, ask a question back, and complete a fresh
  community-centre mission;
- a structured lesson catalog separated from rendering, with scene, meaning,
  pronunciation, pattern, supported rehearsal, personal production, fresh
  transfer, specific repair, completion evidence, and later-review links;
- focused lesson mode, lesson map, Urdu support sheet, Dutch speech hooks,
  regular/slow audio intent, personalized learner responses, completion
  persistence, Journey progress, completed-world review routing, and Android
  hardware-Back hook;
- responsive layouts, safe fixed-control clearance, reduced-motion handling,
  focus styles, and 44 px touch targets.

Future A1 worlds remain visibly locked rather than falsely labelled as
finished lessons. The existing app and Android mirror remain untouched until
the production architecture and migration gates in the masterplan pass.

## Run

From the repository root:

```sh
npm start
```

Then open:

```text
http://127.0.0.1:4173/v2-prototype/index.html
```

## Verify

With the local server running:

```sh
node scripts/verify-v2-prototype.js
node scripts/audit-v2-curriculum.js
node scripts/capture-v2-prototype.js
```

The browser verification walks the four destinations and a complete lesson at
320x568, 360x800, 390x844, 768x1024, 1024x768, and 1440x900. It also completes
all five lessons in sequence, reloads persisted progress, verifies the
completed-world route, and runs a 200% text-size scenario. It checks runtime
errors, adaptive navigation, route scroll reset, horizontal overflow,
fixed-control clearance, 44 px touch targets, phase locks, regular/slow audio
intent, specific mistake repair, personalized input, fresh transfer,
completion evidence, and hardware Back.

The curriculum audit checks all five lesson records for teaching before
scoring, 4–5 integrated meaning/sound/use items, deterministic answer integrity,
specific feedback, personalized production controls, fresh transfer, evidence
of learning, next-scene continuity, and later-review links.

## Source of truth

The product and migration decisions live in
`docs/nederurdu-v2-rebuild-masterplan.md`. The prototype is a design and
interaction artifact; production implementation should follow the modular
architecture and phase gates specified there.
