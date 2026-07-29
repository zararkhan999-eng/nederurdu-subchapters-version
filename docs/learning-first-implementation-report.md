# NederUrdu Learning-First Rework — Implementation Ledger

Status: **v4 foundation implemented; A0 curriculum audit clean; no chapter is frozen**

Authority:
[`docs/learning-first-curriculum-roadmap.md`](./learning-first-curriculum-roadmap.md)

Snapshot date: **2026-07-29**

Canonical data: `window.NEDERURDU_COURSE`, schema version `4`

This is an evidence ledger, not a completion certificate. A chapter is frozen
only after every curriculum, browser, visual, offline, audio, migration, and
Android gate passes. The required acceptance order remains **A0 → A1 → A2**.

## 1. Implemented foundation

- The canonical v4 course registry contains chapters, units, normal lessons,
  concepts, skills, patterns, missions, and adaptive reviews.
- `window.NEDERURDU_CHAPTERS` remains as a temporary compatibility alias.
- Every normal learning run uses the visible sequence
  **Preview → Learn → Understand → Guided Practice → Use → Independent Check
  → Correction**.
- Missions contain no new teaching and use
  **Preview → Use → Independent Check → Correction**.
- Teaching cards show Dutch, Urdu meaning, Urdu pronunciation help, regular and
  slow audio, context, a useful example, and a concrete confusion or boundary.
- Active exercises have semantic IDs and keys, phase, concept and skill
  ownership, task-specific Urdu instructions, hints, and separate correct and
  selected-wrong explanations.
- Retired v3 question banks are isolated in `legacyQuestions`; they cannot enter
  a lesson run, mission, or adaptive review.
- Progress uses `nederurdu-progress-v4`. The one-time migration preserves the
  v3 record, history, settings, XP, practice days, mistakes, and mission
  history, while mapping completed lessons to `practiced`, never `secure`.
- Guided Practice and Use create practiced evidence. Secure still requires at
  least 80% on Independent Check and correction of every missed required skill.
- Reviews use introduced material only; introduced-only review remains
  supported recognition and cannot promote mastery.

## 2. Current inventory

Teaching cards are not counted as quiz questions. Mission records include all
authored replay variants.

| Item | Count |
| --- | ---: |
| Chapters | 3 |
| Units | 25 |
| Normal lessons | 97 |
| Missions | 25 |
| Adaptive unit reviews | 25 |
| Concepts | 949 |
| Skills | 964 |
| Reusable patterns | 15 |
| Internal learning runs | 359 |
| Teaching blocks | 1,385 |
| Active normal-lesson exercises | 6,404 |
| Retired v3 compatibility records | 5,820 |
| Mission records across all variants | 705 |

### Per-chapter inventory

| Metric | A0 | A1 | A2 |
| --- | ---: | ---: | ---: |
| Units | 9 | 9 | 7 |
| Normal lessons | 36 | 43 | 18 |
| Missions | 9 | 9 | 7 |
| Adaptive reviews | 9 | 9 | 7 |
| Chapter-owned concepts | 345 | 405 | 199 |
| Chapter-owned skills | 353 | 406 | 205 |
| Patterns | 8 | 1 | 6 |
| Learning runs | 107 | 173 | 79 |
| Teaching blocks | 376 | 721 | 288 |
| Active normal-lesson exercises | 1,800 | 3,136 | 1,468 |
| Retired v3 records | 2,160 | 2,580 | 1,080 |
| Mission records across all variants | 321 | 216 | 168 |

## 3. Sequential chapter status

### A0 — Understand and survive

A0 now has nine practical units:

1. greetings and first survival phrases;
2. first sounds and recognisable words;
3. identity and family;
4. possession and questions;
5. numbers, time, and contact details;
6. place, address, and home;
7. daily needs, food, and shopping;
8. transport and health; and
9. school, work, and safety.

All 36 normal lessons and all nine missions received a semantic review. This
review corrected incomplete targets, unnatural first examples, mismatched
number and currency examples, school/work placeholder examples, possessive
translations, pronunciation support, generic Use prompts, and mission coverage.
Every unit has one practical mission and one off-path adaptive review.

Strict audit command:

```bash
node scripts/audit-course-content.js --chapter=a0
```

Current result:

```text
a0: 45 lessons, 2121 questions, 0 errors, 0 review flags
```

This clears the generated-course curriculum gate. A0 is still **not frozen**
because the complete automated browser matrix and remaining representative
visual journey checks have not run.

### A1 — Communicate in everyday life

The v4 schema, phase generator, semantic ownership, nine-unit structure, nine
missions, and nine adaptive reviews exist. The 29 duplicate review nodes are no
longer path lessons.

A1 has not entered its permitted authoring and acceptance cycle. A diagnostic
strict audit currently reports **671 errors and 0 review flags**. Its remaining
generic Use contexts, teaching guidance, practical reading, and mission
coverage must not be accepted or described as finished before A0 is frozen.

### A2 — Handle practical situations independently

The v4 schema, practical-unit placement, phase generator, seven missions, and
seven adaptive reviews exist. Grammar lessons are placed under practical
situations rather than a grammar-first opening.

A2 has not entered its permitted authoring and acceptance cycle. A diagnostic
strict audit currently reports **379 errors and 1 review flag**. Practical
documents, concept-specific guidance, Use situations, option explanations, and
completion-mission evidence remain future A2 work after A1 is frozen.

## 4. Current verification evidence

### Browser and responsive UI

Manual browser review confirmed:

- Preview states a practical outcome, time, current run, targets,
  prerequisites, and all six phases.
- Learn has unscored Urdu-first teaching cards with both audio controls.
- Understand demonstrates and supports recognition before production.
- Guided Practice follows recognition and retains visible help.
- Use supplies a believable situation rather than a disguised translation.
- Independent Check removes automatic hints.
- Correct and selected-wrong feedback explain the actual answer.
- Wrong check items are held until the check ends, then enter supported
  Correction. The continuation button now says whether the learner is
  continuing the check or starting Correction.
- The first A0 home, Preview, and Learn surfaces have no document-width
  overflow at 390×844, 768×1024, or 1440×900.
- The final browser console review contained no errors.

Focused automated checks completed earlier for migration, run prerequisites,
adaptive-review filtering, selected-distractor explanations, correction loops,
mastery transitions, semantic IDs, active/legacy isolation, and mission phase
materialisation.

The complete 49-case desktop/mobile Playwright matrix is still blocked because
the browser-execution environment exhausted its allowance. The reported retry
time is **2026-08-05 15:58**. This is an acceptance blocker; it is not treated
as a pass.

### Android, migration, offline, and audio

- Root web files and all 341 offline visual assets were synchronized to
  `android/app/src/main/assets/public`. Hash comparison found no content
  mismatch; the only excluded file is macOS `.DS_Store`.
- A native debug build completed successfully.
- Final APK:
  `android/app/build/outputs/apk/debug/app-debug.apk`
- Final SHA-256:
  `b71f7fea3c54f36083530ee612d73fa7ef2adfc0dc72b5b281b8fe3e323f534f`
- The APK installed with `-r`, preserving existing app data.
- On the installed app, both `nederurdu-progress-v3` and
  `nederurdu-progress-v4` remained present. V4 reported schema `4`,
  `migratedFrom: nederurdu-progress-v3`, retained XP, practice day, settings,
  and mission history, and mapped the old completed A0 lesson to `practiced`.
- Android WebView exposed stale duplicated GPU tiles on a long Urdu Preview.
  The WebView now uses a stable software layer on Android; the rebuilt Preview
  and Learn screens were visually rechecked without duplication.
- Preview label and close-button contrast and overlap were corrected and
  measured in the rebuilt WebView, including the migrated large-text setting.
- Android selected an offline `nl-NL` voice. Regular and slow speech controls
  each returned a successful native TTS request (`result=0`).
- With emulator Wi-Fi and mobile data disabled, a cold launch settled on the
  complete A0 home screen with saved progress intact. Networking was restored
  after the check.

## 5. Acceptance gate ledger

| Gate | A0 | A1 | A2 |
| --- | --- | --- | --- |
| Inventory and structural decisions | Passed | Scaffold only | Scaffold only |
| Urdu-first teaching records | Passed semantic review | Not accepted | Not accepted |
| Strict generated-course audit | **0 errors / 0 flags** | 671 errors / 0 flags | 379 errors / 1 flag |
| Manual content review | 36 lessons + 9 missions reviewed | Blocked | Blocked |
| Browser phase journey | Representative path passed | Blocked | Blocked |
| Full 49-case browser matrix | **Blocked by environment allowance** | Blocked | Blocked |
| Responsive visual checks | Beginning surfaces passed; remaining representative set pending | Blocked | Blocked |
| Offline and 341 visuals | Android passed; final web automation pending | Blocked | Blocked |
| Regular and slow audio | Android native requests passed | Blocked | Blocked |
| v3→v4 migration and recovery record | Browser focused test + installed Android passed | Shared runtime | Shared runtime |
| Android asset parity | Passed | Shared package | Shared package |
| Native debug build | Passed | Shared package | Shared package |
| Chapter freeze | **NO** | **NO** | **NO** |

## 6. Required next actions

1. When browser execution is available, run all 49 desktop/mobile cases.
2. Complete representative beginning, middle, mission, and final A0 visual
   journeys at phone, tablet, and desktop sizes.
3. Rerun the A0 strict audit after any resulting fix.
4. Record approval and freeze A0 only when every A0 gate is green.
5. Author and audit A1 to zero errors and zero flags, then repeat all gates.
6. Freeze A1 before beginning the A2 authoring and acceptance cycle.

Until those steps are complete, neither this ledger nor the v4 scaffold may be
used to claim that the full A0–A2 rework is done.
