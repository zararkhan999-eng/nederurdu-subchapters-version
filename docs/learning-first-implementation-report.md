# NederUrdu Learning-First Rework — Implementation Ledger

Status: **v4 foundation implemented; A0 accepted and frozen; A1 is the active rework chapter**

Authority:
[`docs/learning-first-curriculum-roadmap.md`](./learning-first-curriculum-roadmap.md)

Snapshot date: **2026-08-12**

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
| Missions | 25 |
| Adaptive unit reviews | 25 |
| Concepts | 822 |
| Skills | 870 |
| Reusable patterns | 48 |
| Internal learning runs | 274 |
| Teaching blocks | 1,060 |
| Active normal-lesson exercises | 4,924 |
| Retired v3 compatibility records | 5,520 |
| Mission records across all variants | 795 |

### Per-chapter inventory

| Metric | A0 | A1 | A2 |
| --- | ---: | ---: | ---: |
| Units | 9 | 9 | 7 |
| Normal lessons | 36 | 38 | 18 |
| Missions | 9 | 9 | 7 |
| Adaptive reviews | 9 | 9 | 7 |
| Chapter-owned concepts | 345 | 271 | 203 |
| Chapter-owned skills | 353 | 305 | 209 |
| Patterns | 8 | 34 | 6 |
| Learning runs | 107 | 88 | 79 |
| Teaching blocks | 376 | 396 | 288 |
| Active normal-lesson exercises | 1,800 | 1,654 | 1,471 |
| Retired v3 records | 2,160 | 2,280 | 1,080 |
| Mission records across all variants | 321 | 306 | 168 |

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
missions, and nine adaptive reviews exist. The 29 duplicate review nodes are no
longer path lessons.

A1 has now entered its permitted inventory and authoring cycle. The complete
inventory and binding remain/split/move/merge/retire decisions are recorded in
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

The current full A1 result is **135 errors and 0 review flags**, down by 58
from the post-Unit-7 result. Every remaining finding belongs to Unit 9 or
the still-unwritten chapter completion mission. A1 as a whole is not accepted
or frozen.

### A2 — Handle practical situations independently

The v4 schema, practical-unit placement, phase generator, seven missions, and
seven adaptive reviews exist. Grammar lessons are placed under practical
situations rather than a grammar-first opening.

A2 has not entered its permitted authoring and acceptance cycle. A diagnostic
strict audit currently reports **387 errors and 1 review flag**. Practical
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

The matrix deliberately contains all chapter-neutral runtime checks and all
A0-specific curriculum, review, mission, migration, offline, mastery, and
responsive checks. Explicit A1/A2 authoring checks remain outside this freeze
gate until those chapters reach their own permitted acceptance cycles.

### Android, migration, offline, and audio

- Root web files and all 341 offline visual assets were synchronized to
  `android/app/src/main/assets/public` after the A1 Unit 8 authoring batch. The
  Android source assets have the same course, app-runtime, and service-worker
  hashes as the web source.
- The offline cache is `nederurdu-v68-learning-first-a1-unit8`.
- The Unit 8 native build is pending. Java 17 and Android command-line tools
  were restored, but Google requires the SDK license to be accepted by the
  user before API 35 and its build tools can be installed.
- Last successfully built APK (Unit 2, not the current Unit 8 package):
  `android/app/build/outputs/apk/debug/app-debug.apk`
- Last APK SHA-256:
  `2d010712e3e613186c72df8df101290eadccad240564a35147f0af4f4df31b29`
- Synchronized Unit 8 course-data SHA-256:
  `d66af93d0fa805c5fe846ca77d7030a3181bc1d3390cef140c74a43e5922f33b`
- Synchronized Unit 8 app runtime SHA-256:
  `bb3c8cc20b87c855fa26ad8d834fdad216b9c564714ad0b70f17e29e2a4dcbd4`
- Synchronized Unit 8 service-worker SHA-256:
  `5c877e5ee26cd1343630d2e319b5b303090ea666ce24707f3ee919a7041e3305`
- In the last installed acceptance build, both `nederurdu-progress-v3` and
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
| Inventory and structural decisions | Passed | **Passed — binding decisions recorded** | Scaffold only |
| Urdu-first teaching records | Passed semantic review | Units 1–8 passed; Unit 9 pending | Not accepted |
| Strict generated-course audit | **0 errors / 0 flags** | **Units 1–8: 0 local findings; full A1: 135 errors / 0 flags** | 387 errors / 1 flag |
| Manual content review | 36 lessons + 9 missions reviewed | Units 1–8 content passed; later unit blocked | Blocked |
| Browser phase journey | Representative path passed | Unit 8 **12/12**; Units 1–8 regression **94/94** | Blocked |
| Full chapter browser matrix | **96/96 passed** | Blocked | Blocked |
| Responsive visual checks | Beginning, middle, final lesson, and final mission passed | Units 1–8 passed at phone, tablet, and desktop sizes; Unit 9 blocked | Blocked |
| Offline and 341 visuals | Web automation + Android cold launch passed | Blocked | Blocked |
| Regular and slow audio | Android native requests passed | Blocked | Blocked |
| v3→v4 migration and recovery record | Browser focused test + installed Android passed | Shared runtime | Shared runtime |
| Android asset parity | Passed | Unit 8 web/source-asset hashes match; APK pending | Shared package |
| Native debug build | Passed | Pending user acceptance of the Google SDK license | Shared package |
| Chapter freeze | **YES — 2026-08-05** | **NO** | **NO** |

## 6. Required next actions

1. Rebuild A1 Unit 9, work and school messages, using the same authored
   teaching, dependency, document, mission, and focused-test gate now proven by
   Units 1–8.
3. Add the separate chapter-wide A1 completion mission after all unit missions.
4. Audit the complete generated A1 chapter to zero errors and zero review flags,
   then
   repeat the full browser, responsive, offline, audio, migration, and Android
   acceptance gates.
5. Freeze A1 before beginning the A2 authoring and acceptance cycle.

Until those steps are complete, neither this ledger nor the v4 scaffold may be
used to claim that the full A0–A2 rework is done.
