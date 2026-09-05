# NederUrdu V2 production foundation

This directory is the typed production boundary for the V2 rebuild. It is
deliberately separate from the current V1 runtime and from the visual prototype.

## Current modules

- `curriculum/schema.ts` defines the V5 lesson and world contract.
- `curriculum/validate.ts` rejects incomplete teaching sequences, repeated
  transfer prompts, generic repair, broken personalization, and invalid journey
  continuity before content can ship.
- `state/session-engine.ts` owns phase locks, answer attempts, personalized
  production, fresh transfer, completion, and safe session restoration.
- `state/progress-store.ts` owns V5 persistence, prototype-state recovery,
  completion evidence, and spaced review scheduling.

The `v2-prototype` browser now consumes these modules through
`browser/runtime-bridge.ts`. The compiled bridge validates the exact five-lesson
catalog before rendering; the live lesson flow uses the session engine for
phase locks, attempts, Back, completion, and exact resume, while Practice uses
the progress engine for due items, lapse repair, and rescheduling. The visual
renderer remains a transitional JavaScript module until the reusable component
families are migrated into this source boundary.

## Gates

```sh
npm run v2:typecheck
npm run v2:test
npm run v2:build
```

`v2:build` runs the runtime and curriculum gates before copying an explicit
allowlist into `dist-v2`. The exact browser catalog is also loaded through the
compiled V5 validator, so the fixture tests cannot hide malformed shipping
content. The build writes a deterministic SHA-256 manifest and never mutates V1
or the Android mirror.
