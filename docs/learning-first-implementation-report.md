# NederUrdu Learning-First Rework — Implementation Ledger

Status: **v4 foundation implemented; A0 and A1 frozen; A2 inventory is next**

Authority:
[`docs/learning-first-curriculum-roadmap.md`](./learning-first-curriculum-roadmap.md)

Snapshot date: **2026-08-13**

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
| Normal lessons | 92 |
| Missions | 26 |
| Adaptive unit reviews | 25 |
| Concepts | 816 |
| Skills | 868 |
| Reusable patterns | 52 |
| Internal learning runs | 267 |
| Teaching blocks | 1,035 |
| Active normal-lesson exercises | 4,802 |
| Retired v3 compatibility records | 5,520 |
| Mission records across all variants | 843 |

### Per-chapter inventory

| Metric | A0 | A1 | A2 |
| --- | ---: | ---: | ---: |
| Units | 9 | 9 | 7 |
| Normal lessons | 36 | 38 | 18 |
| Missions | 9 | 10 | 7 |
| Adaptive reviews | 9 | 9 | 7 |
| Chapter-associated concepts | 345 | 325 | 246 |
| Chapter-owned skills | 353 | 302 | 213 |
| Patterns | 8 | 38 | 6 |
| Learning runs | 107 | 81 | 79 |
| Teaching blocks | 376 | 371 | 288 |
| Active normal-lesson exercises | 1,800 | 1,537 | 1,470 |
| Retired v3 records | 2,160 | 2,280 | 1,080 |
| Mission records across all variants | 321 | 354 | 168 |

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

The final A0 capstone also received a last semantic correction: its authored
scenario now consistently asks for a ticket first and card payment second in
every generated Use and Independent Check variant. The audit was strengthened
at the same time to reject any run skill without scored, correctable evidence
in Guided Practice or Use.

The generated-course gate, full A0 browser matrix, representative responsive
journeys, offline behavior, audio, migration, Android parity, and native build
all pass. **A0 is frozen as of 2026-08-05.** Later changes may not weaken this
contract or add unreviewed A0 material.

### A1 — Communicate in everyday life

The v4 schema, phase generator, semantic ownership, nine-unit structure, nine
unit missions, one chapter-completion mission, and nine adaptive reviews are
accepted. The 29 duplicate review nodes are no longer path lessons.

A1 completed its permitted inventory, authoring, and acceptance cycle. The
complete inventory and binding remain/split/move/merge/retire decisions are recorded in
[`a1-learning-first-inventory.md`](./a1-learning-first-inventory.md).

The audit now requires stable authored provenance on every selected scored A1
Use task. That deliberate strengthening raised the pre-authoring baseline from
671 to **1,092 errors** by exposing 421 generated Use tasks. Units 1–4 are the
completed authoring batches. Unit 1, personal information, provides the
bridge from A0:

- `a1-greetings-personal-info` and `a1-details-forms` use individual authored
  Urdu teaching records, complete sentence patterns, genuine A0 prerequisites,
  and stable real-life scenarios;
- the learner practises an actual Dutch personal-details form in Understand
  before document reading appears in the mission;
- `a1-personal-info-mission` has three authored variants, each with five Use
  and five Independent Check tasks covering all six declared skills without a
  duplicate quota-filling answer; and
- the exact Unit 1 strict-audit slice reports **0 findings**, while its focused
  browser gate passes **10/10** across desktop and mobile, including Preview,
  teaching, supported recognition, authored Use provenance, mission coverage,
  and responsive checks at 390×844, 768×1024, and 1440×900.

Unit 2, family and people, now follows the same binding contract:

- all four lessons have authored Urdu-first teaching records and complete
  patterns for family articles, `hebben`, `geen` versus `niet`, family
  description, and childcare handover language;
- general work and time chunks were removed from `a1-family-routine-extra` and
  remain reserved for their correct later units;
- `a1-child-care` teaches and recognises a real handover card with separate
  `Brengen`, `Ophalen`, and `Eten mee` fields before document reading is used
  in scored production;
- `a1-family-people-mission` has three authored family/childcare variants, each
  with six Use and six Independent Check tasks covering all six declared
  assessment skills; and
- the exact Unit 2 audit slice reports **0 findings**. Its focused browser gate
  passes **12/12** across desktop and mobile; the earlier Unit 1 gate still
  passes **10/10** after the shared authoring helpers changed.

Unit 3, daily routine, now completes the next mandatory batch:

- `a1-present-time`, `a1-daily-routine`, `a1-calendar-time`, and
  `a1-weather-clothes` teach 22 new targets across six capped runs, with four
  complete sentence patterns and only genuine earlier prerequisites;
- the calendar lesson teaches and recognises a weekly schedule plus a
  late-arrival change before that document format appears in a check or
  mission;
- `a1-daily-routine-mission` has three authored schedule variants, each with
  six Use and six Independent Check tasks covering all four lesson strands;
- the exact Unit 3 audit slice reports **0 findings**, and its focused browser
  gate passes **12/12** across desktop and mobile; and
- the combined Unit 1–2 regression gate passes **22/22**, while the frozen A0
  matrix remains **96/96**.

Unit 4, questions, help, calls, and appointments, now applies the same contract:

- the path is questions → polite help → invitations → calls → appointments;
  `a1-questions-revision` is retired and `a1-short-messages` has moved to Unit 9;
- five lessons teach 36 manually reviewed new targets across 12 capped runs,
  with five complete question, request, invitation, callback, and appointment
  patterns;
- phone callback notes and appointment confirmation cards are taught in
  Understand before document reading appears in checks or the mission;
- `a1-mission-phone-internet` keeps its stable ID and now has three authored
  variants with six Use and six Independent Check tasks covering all five
  lesson strands; and
- the exact Unit 4 audit slice reports **0 findings**, its focused browser gate
  passes **12/12**, the Units 1–3 regression gate passes **34/34**, and frozen
  A0 remains **96/96**.

Unit 5, home, neighbours, repairs, and housing, is now learning-first as well:

- `a1-house-food-plurals` now contains only rooms, home objects, location, and
  plural recognition; its food targets are reserved for Unit 6;
- the duplicate `a1-home-neighbours` path node is retired, while neighbour,
  repair, cleaning, and housing targets live in five focused lessons;
- the five lessons own 44 targets—35 genuinely new and nine valid
  prerequisites—across ten capped runs with five complete practical patterns;
- `a1-house-search-extra` teaches and recognises a three-row housing listing
  before that document format appears in a check or the mission;
- `a1-mission-house-search` has three authored variants with six Use and six
  Independent Check tasks covering every Unit 5 lesson strand; and
- the exact Unit 5 audit slice reports **0 findings**, its focused browser gate
  passes **12/12**, the Units 1–5 regression gate passes **58/58**, and frozen
  A0 remains **96/96**.

Unit 6, food, shopping, returns, and payment, now follows the binding practical
journey:

- the path is supermarket → café ordering → dietary needs/problems → clothes
  → returns → payment problems, with no complaint or payment material hidden
  inside the initial café lesson;
- six focused lessons own 46 targets, including 41 genuinely new targets,
  across 12 capped runs with six complete practical patterns;
- the supermarket list/price card and return receipt are taught and recognised
  before their document formats appear in checks or the mission;
- `a1-food-shopping-mission` has three authored variants with six Use and six
  Independent Check tasks covering all six lesson strands; and
- the exact Unit 6 audit slice reports **0 findings**, its corrected focused
  browser gate passes **12/12**, the Units 1–6 regression gate passes **70/70**,
  and frozen A0 remains **96/96**.

Unit 7, transport and practical places in town, now follows one connected town
journey:

- the path is public transport → map directions → parcel pickup →
  library/community services → public safety, followed by one unit mission;
- duplicate `a1-shopping-transport` and `a1-bus-train-extra` nodes are retired,
  while their useful station and train material is owned by public transport;
- five lessons teach 42 manually reviewed new targets across ten capped runs,
  with five complete practical patterns;
- departure-board, parcel-notice, opening-hours, and safety-sign documents are
  taught and recognised before their formats appear in checks or the mission;
- `a1-mission-post-parcel` has three authored variants with six Use and six
  Independent Check tasks covering every Unit 7 lesson strand; and
- the exact Unit 7 audit slice reports **0 findings**, its focused browser gate
  passes **12/12**, and the Units 1–7 regression gate passes **82/82**.

Unit 8, huisarts appointments, symptoms, and medicine, is now learning-first:

- the mixed `a1-health-pharmacy` node is retired; the path is huisarts
  appointment → symptoms → pharmacy/medicine → mission;
- three lessons teach 24 manually reviewed new targets across seven capped
  runs, with three complete practical patterns;
- a huisarts appointment card and medicine label are taught and recognised
  before their formats appear in checks or the mission;
- `a1-mission-doctor` has three authored variants with six Use and six
  Independent Check tasks covering every Unit 8 strand; and
- the exact Unit 8 audit slice reports **0 findings** and its focused browser
  gate passes **12/12** across desktop and mobile; the combined Units 1–8
  regression gate passes **94/94**.

Unit 9, work and school messages, now completes the required unit sequence:

- the path is short-message basics → absence/delay formula → school contact →
  work-roster changes → unit mission;
- four focused lessons teach 29 manually reviewed new targets across ten capped
  runs, with four complete message, absence, school, and work patterns;
- a short-message card, school-app notice, and work-roster card are taught and
  recognised before the same formats appear in checks or the mission;
- `a1-mission-school-day` is explicitly a unit mission and has three authored
  variants with six Use and six Independent Check tasks covering all four
  lesson strands; and
- the exact Unit 9 audit slice reports **0 findings**, its focused browser gate
  passes **12/12**, the Units 1–9 regression gate passes **106/106**, and frozen
  A0 remains **96/96**.

The separate A1 chapter completion mission now follows all nine unit missions:

- it is a distinct final chapter section rather than a second Unit 9 mission;
- it remains browseable but cannot start until all nine unit capstones are
  practiced;
- nine previously introduced representative skills cover all nine units across
  six connected tasks, with three natural two-strand tasks keeping the Check
  inside the required 4–6-item limit;
- every replay variant has six authored Use tasks and six Independent Check
  tasks covering meaning, listening, authentic document reading, unscored
  speaking support, and practical use; and
- the exact completion-mission audit slice reports **0 findings**, its focused
  browser gate passes **12/12**, the cumulative Units 1–9 plus completion gate
  passes **120/120**, and the shared A0+A1 runtime gate passes **96/96**.

The complete A1 strict audit now reports **0 errors and 0 review flags**. The
last Unit 5 lexical-ownership findings were resolved by making supporting words
explicit prerequisites or replacing them with owned, natural micro-examples.
The housing mission now assesses the A1-taught requests `kunt u zachter zijn?`
and `kunt u iemand sturen?`, rather than reusing two A0 concepts as if A1 had
introduced them. Twenty-one common-mistake notes were also rewritten as
concept-specific Urdu explanations. The synchronized native Android build,
installed migration and update, regular and slow Dutch audio, offline cold
launch, and visual parity gates all passed. **A1 is frozen as of 2026-08-13.**

### A2 — Handle practical situations independently

The v4 schema, practical-unit placement, phase generator, seven missions, and
seven adaptive reviews exist. Grammar lessons are placed under practical
situations rather than a grammar-first opening.

A2 has not entered its permitted authoring and acceptance cycle. A diagnostic
strict audit currently reports **388 errors and 1 review flag**. Practical
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
- Beginning, middle, final normal-lesson, and final mission surfaces have no
  document-width overflow at 390×844, 768×1024, or 1440×900.
- The middle `Adres en telefoonnummer` lesson was checked through Preview and
  Learn. The final `Weer en veiligheid` lesson and final
  `school-work-safety` mission were checked at all three sizes.
- The final browser console review contained no warnings or errors.
- A1 Unit 1 was manually reviewed from the chapter map through both normal
  lesson Previews, authored teaching and pattern cards, supported recognition,
  explanatory feedback, and the unit mission Preview. Its prerequisite summary
  now keeps new concepts and reusable patterns distinct and uses correct Urdu
  singular wording.
- A1 Unit 2 was manually reviewed from the chapter map through its family and
  childcare Previews, teaching cards, pattern explanations, supported
  recognition, correct feedback, the `Kinderopvang` handover document, and the
  unit mission Preview. The handover card and mission remained readable without
  horizontal overflow at phone, tablet, and desktop sizes, and the final
  browser console review contained no warnings or errors.
- A1 Unit 3 was manually reviewed from the chapter map through the schedule
  lesson's Preview, both learning runs, Urdu-first teaching and pattern cards,
  supported recognition, word-bank production, unscored speaking, Use,
  Independent Check, and the next-run transition. The weekly schedule/change
  document and unit mission Preview remained readable at phone, tablet, and
  desktop sizes. The final console review contained no warnings or errors.
- A1 Unit 4 was manually reviewed from the expanded chapter map through the
  appointment Preview, Urdu-first teaching card, and unit mission Preview. The
  five lessons appeared in their binding order, the retired review was absent,
  short messages appeared in Unit 9, and the mission exposed only its six
  taught targets. Phone, tablet, and desktop widths had no horizontal overflow,
  and the final console review contained no warnings or errors.
- A1 Unit 5 was manually reviewed from the expanded chapter map through the
  repair and housing Previews, prerequisite refresher, first genuinely new
  Urdu-first teaching card, and the unit mission Preview. The map showed five
  focused lessons and one mission, the retired duplicate was absent, the
  mission exposed only its six learned targets, and phone, tablet, and desktop
  widths had no horizontal overflow. The final console review contained no
  warnings or errors.
- A1 Unit 6 was manually reviewed from the expanded chapter map through the
  dietary-needs Preview, authored allergy teaching card, returns Preview, and
  unit mission Preview. The map showed the required six-lesson order, the
  mission exposed one learned target from every strand and remained locked
  until practice, and phone, tablet, and desktop widths had no horizontal
  overflow. The final console review contained no warnings or errors.
- A1 Unit 7 was manually reviewed from the expanded chapter map through the
  parcel lesson Preview, unscored Urdu-first teaching and pattern cards,
  supported recognition, and the connected mission Preview. The map showed
  five focused lessons plus one mission in the binding order, both duplicate
  transport nodes were absent, and the mission stayed locked until all five
  lesson strands were practised. The reviewed desktop surfaces had no
  horizontal overflow; the focused browser suite also verifies the same
  teaching and mission surfaces at phone, tablet, and desktop widths.
- A1 Unit 8 was manually reviewed from the expanded chapter map through the
  medicine Preview, unscored dosage-question teaching card, and the doctor
  mission Preview. The map showed three focused lessons plus one mission, the
  mixed duplicate lesson was absent, and the mission remained locked until
  appointment, symptom, and medicine skills were practised. The focused suite
  verifies the same health surfaces without overflow at phone, tablet, and
  desktop widths.
- A1 Unit 9 was manually reviewed from the expanded chapter map through the
  school-contact Preview, its first unscored Urdu-first teaching card, and the
  unit mission Preview. The map showed the required four lessons plus one
  mission, the mission remained locked until all four lesson strands were
  practised, and it exposed exactly six already-taught targets. The focused
  suite verifies the message, school, work, and mission surfaces at phone,
  tablet, and desktop widths.
- The A1 completion mission was manually reviewed as the tenth and final path
  section. Its Preview named all nine required unit missions, exposed only its
  nine learned targets, displayed the four mission phases, and kept Start
  locked. The desktop preview had no horizontal overflow and the browser
  console was empty; the focused suite verifies the same Preview and first Use
  task at phone, tablet, and desktop widths.

Focused automated checks cover migration, run prerequisites, adaptive-review
filtering, selected-distractor explanations, correction loops, mastery
transitions, semantic IDs, active/legacy isolation, offline loading, and
mission phase materialisation.

The exact current A0 matrix passed in one serial invocation:

```text
Desktop: 48/48
Mobile:  48/48
Total:   96/96
Failures: 0
```

The shared matrix now admits both A0 and A1 and contains all chapter-neutral
runtime checks plus curriculum, review, mission, migration, offline, mastery,
and responsive gates for the accepted web chapters. It passes **96/96**. The
separate A1-authored curriculum matrix passes **120/120** across desktop and
mobile. A2 diagnostics remain isolated until its permitted authoring cycle.

### Android, migration, offline, and audio

- Root web files and all 341 offline visual assets were synchronized to
  `android/app/src/main/assets/public` after the A1 acceptance cleanup. The
  Android source assets have the same course, app-runtime, and service-worker
  hashes as the web source.
- The offline cache is `nederurdu-v71-learning-first-a1-acceptance`.
- The Android SDK licenses were accepted with the user's approval. API 35,
  platform-tools, build-tools, emulator, and the Google APIs ARM64 system image
  are installed under `/opt/homebrew/share/android-commandlinetools`.
- The synchronized native debug package built successfully with JDK 17 and
  installed on Android 15:
  `android/app/build/outputs/apk/debug/app-debug.apk`
- Current APK SHA-256:
  `ef04568de731ed27bea7e4c637c4bdd09c00e2081850378ca57e629765ccb0fe`
- APK verification reports one signer with valid v1 and v2 debug signatures.
- Synchronized A1-acceptance course-data SHA-256:
  `b1edfcccd05ce67a9126480078ba7a464c61aa13f964005983d2f92d2d81b4c7`
- Synchronized completion app runtime SHA-256:
  `b0c826938b33ba6bdb1e10a6141895b417e27cb9d9abafeca3bccc903125b361`
- Synchronized A1-acceptance service-worker SHA-256:
  `d53d27b5266746ba6af43705bdab2770a6e83682c8f05473e61a5d75c0dd0f19`
- In the installed A1 acceptance build, a controlled v3 record migrated to v4
  with schema `4`, `migratedFrom: nederurdu-progress-v3`, retained XP, practice
  day and settings, preserved the v3 recovery record, and mapped the old
  completed A0 lesson to `practiced`. Reinstalling the same synchronized APK
  with update semantics retained the migrated data and recovery record.
- Android WebView exposed stale duplicated GPU tiles on a long Urdu Preview.
  The WebView now uses a stable software layer on Android; the rebuilt Preview
  and Learn screens were visually rechecked without duplication.
- Preview label and close-button contrast and overlap were corrected and
  measured in the rebuilt WebView, including the migrated large-text setting.
- On the Google APIs Android 15 emulator, Android selected the embedded
  `nl-NL-language` voice. Regular and slow lesson requests both returned native
  success (`result=0`) and dispatched as Dutch (`nld-NLD`).
- With emulator Wi-Fi and mobile data disabled and no active default network,
  a cold launch settled on the complete learner home from bundled assets with
  saved progress intact. Networking was restored after the check.
- The installed A1 home was opened after the offline gate and visually checked
  in the Android WebView. It showed the expected 48-lesson A1 path total with
  stable Urdu typography and no stale duplicated tiles.

## 5. Acceptance gate ledger

| Gate | A0 | A1 | A2 |
| --- | --- | --- | --- |
| Inventory and structural decisions | Passed | **Passed — binding decisions recorded** | Scaffold only |
| Urdu-first teaching records | Passed semantic review | Units 1–9 and completion mission passed | Not accepted |
| Strict generated-course audit | **0 errors / 0 flags** | **0 errors / 0 flags** | 388 errors / 1 flag |
| Manual content review | 36 lessons + 9 missions reviewed | Units 1–9 and completion mission passed | Blocked |
| Browser phase journey | Representative path passed | Completion **12/12**; complete A1 **120/120** | Blocked |
| Full chapter browser matrix | Shared A0+A1 runtime **96/96 passed** | **120/120 A1-specific + shared 96/96 passed** | Blocked |
| Responsive visual checks | Beginning, middle, final lesson, and final mission passed | Units 1–9 and completion passed at phone, tablet, and desktop sizes | Blocked |
| Offline and 341 visuals | Web automation + Android cold launch passed | **Web automation + installed Android cold launch passed** | Blocked |
| Regular and slow audio | Android native requests passed | **Installed `nl-NL` regular + slow requests passed** | Blocked |
| v3→v4 migration and recovery record | Browser focused test + installed Android passed | Shared runtime | Shared runtime |
| Android asset parity | Passed | **A1-acceptance web/source-asset hashes match** | Shared package |
| Native debug build | Passed | **Passed; signed debug APK installed on Android 15** | Shared package |
| Chapter freeze | **YES — 2026-08-05** | **YES — 2026-08-13** | **NO** |

## 6. Required next actions

1. Inventory every A2 lesson, concept, phrase, exercise, prerequisite, mission,
   and practical document.
2. Record binding remain, split, move, merge, and retire decisions before A2
   authoring begins.
3. Rebuild A2 one unit at a time, repeating the strict audit and learner-journey
   review after every unit, then run the full web and Android acceptance gates.

A0 and A1 are complete and frozen. The full A0–A2 rework is not complete until
A2 also reaches zero errors, zero review flags, passes every acceptance gate,
and receives its own freeze record.
