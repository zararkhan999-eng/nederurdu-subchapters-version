# A1 Learning-First Rework — Inventory and Binding Decisions

Status: **active authoring chapter; not accepted and not frozen**

Authority: [`learning-first-curriculum-roadmap.md`](./learning-first-curriculum-roadmap.md)

Inventory date: **2026-08-11**

This document completes step 1 and records the binding structural decisions for
step 2 of the A1 chapter cycle. A1 content work must follow this inventory. A2
must not enter its authoring cycle until A1 is frozen.

## 1. Baseline A1 inventory before authoring

| Item | Current count |
| --- | ---: |
| Units | 9 |
| Normal path lessons | 43 |
| Learning runs | 173 |
| Unit missions | 9 |
| Mission variants | 27 |
| Off-path adaptive reviews | 9 |
| A1-owned new concepts | 405 |
| Reused A0 concepts | 142 |
| Skills used by A1 lessons | 548 |
| Normal-lesson exercises | 3,136 |
| Mission exercises | 216 |

All active normal exercises already have concept, skill, run, and phase
ownership. Every run has Learn, Understand, Guided Practice, Use, and
Independent Check, and the mechanical maximum of five new targets per A1 run
is respected. These facts describe the shell; they do not make the content
learning-first.

Exact strengthened-audit baseline:

```text
a1: 52 lessons, 3352 questions, 671 errors, 0 review flags
```

After the authored-Use provenance rule exposed 421 generated Use tasks, the
binding pre-authoring baseline became **1,092 errors and 0 review flags**. Unit
1, Unit 2, Unit 3, and Unit 4 have since been authored and each passes its
exact audit slice with **0 findings**. The current complete A1 result is **727
errors and 0 review flags**; all of those findings belong to Units 5–9 or the future chapter
completion mission.

After the Unit 4 rewrite retired the duplicate question-review node and moved
short messages to Unit 9, the current A1 totals are 353 chapter-owned concepts,
368 chapter-owned skills, 15 patterns, 145 runs, 612 teaching blocks, 2,657
normal-lesson exercises, and 258 mission records. The chapter now has 42
normal path lessons until the later binding merge, split, move, and retire
decisions are applied.

### Baseline audit error taxonomy

| Rule | Errors |
| --- | ---: |
| Generic or mangled Use context | 282 |
| Non-situational Use prompt | 226 |
| Concept confusion evidence | 43 |
| Mission Use skill coverage | 27 |
| Mission Check skill coverage | 27 |
| Repeated usage template | 13 |
| Hidden lexical material | 11 |
| Repeated confusion template | 11 |
| Unit document reading | 9 |
| Unit mission lesson coverage | 9 |
| Completion mission evidence | 3 |
| Low concept-guidance diversity | 2 |
| Urdu-first visible label | 2 |
| Remaining isolated contract/item rules | 6 |
| **Total** | **671** |

The largest concentrations are transport/community (134), food/shopping
(128), home (113), family (78), and questions/help (74). Every current normal
lesson and every mission has at least one audit failure.

## 2. Learner-journey diagnosis

- Lessons contain 54–98 exercises; the median is 70. Runs mechanically contain
  16–23 items regardless of the teaching need.
- Seventeen path lessons contain 24 mandatory review-only runs. These must move
  to optional refreshers or adaptive review; repetition cannot masquerade as a
  new lesson run.
- All 173 runs reuse the same task demonstration, listening prompt, listening
  check, and reinforcement prompt. Instructions contain Urdu, but they are not
  authored explanations of the actual task.
- A1 has no authentic form, notice, schedule, message, menu, receipt, label,
  timetable, or dialogue record in a normal lesson. Mission document questions
  therefore use an exercise format the learner did not practice first.
- A1 has only one grammar pattern record. Its model is the fragment `ik heb`.
  Conjugation, question order, inversion, separable verbs, articles, plurals,
  `niet/geen`, modals, and time position are otherwise tested inside chunks
  without reusable pattern teaching.
- Of 721 run-skill placements, 407 never receive practical Use evidence.
- Every mission variant declares more required skills than it assesses. Unit
  missions sample only their latest lesson strands, and the final school-day
  mission omits seven of nine units.
- Direct hidden material remains: `noten` is incorrectly exposed as English
  “nuts”, and an unowned `huis` distractor appears in health work.
- The dependency graph is chronological rather than educational. A lesson
  depends on the immediately preceding lesson even across unrelated units;
  A1 itself currently depends on five arbitrary final-A0 safety concepts.

## 3. Binding structural decisions

The target is **38 focused normal lessons, 9 unit missions, 1 separate chapter
completion mission, and 9 off-path adaptive reviews**. Stable semantic IDs are
kept wherever a lesson remains or its material is transferred.

### Unit 1 — Personal information

| Lesson | Decision |
| --- | --- |
| `a1-greetings-personal-info` | **Remain and rewrite** as the explicit A0-to-A1 bridge with a complete introduction pattern. |
| `a1-details-forms` | **Remain and rewrite** around an authentic form, clerk model, field recognition, and supported completion. |
| `a1-personal-info-mission` | **Remain but fully author** as greeting, introduction, listening, and form capstone. |

### Unit 2 — Family and people

| Lesson | Decision |
| --- | --- |
| `a1-people-family-articles` | **Remain**; focus on family nouns with `een/de/het`. |
| `a1-hebben-family` | **Remain and rewrite**; use a complete `hebben` model and teach `geen` versus `niet`. |
| `a1-family-routine-extra` | **Split**; retain family description here and move general work/time chunks to daily routine. |
| `a1-child-care` | **Remain** as the practical family/school handover outcome. |
| `a1-family-people-mission` | **Remain but fully author**; fix its generic personal-information scenario and cover all four strands. |

Implementation checkpoint: **completed and locally clean**. The four lessons
now use individual Urdu-first teaching records and four reusable patterns.
`a1-family-routine-extra` contains family description only; its general
work/time chunks are reserved for later owning units. `a1-child-care` teaches a
`Kinderopvang` handover card before asking document questions. The unit mission
uses three authored variants, and each variant contains six Use plus six
Independent Check tasks covering all six assessment skills. The exact Unit 2
audit slice has 0 findings, its focused desktop/mobile gate passes 12/12, and
the Unit 1 regression gate remains 10/10.

### Unit 3 — Daily routine

| Lesson | Decision |
| --- | --- |
| `a1-present-time` | **Remain and rewrite** with subject–verb–time/place teaching. |
| `a1-daily-routine` | **Remain** with sequence words and separable-verb support. |
| `a1-calendar-time` | **Remain** for concrete planning and availability. |
| `a1-weather-clothes` | **Remain** as an A1 application of secure A0 weather skills. |
| `a1-daily-routine-mission` | **Remain but fully author** around a daily schedule and a change/delay message. |

Implementation checkpoint: **completed and locally clean**. The four lessons
now use 22 individually reviewed new teaching targets across six capped runs,
with four complete reusable patterns. `a1-calendar-time` teaches and recognises
a weekly schedule and late-arrival change before the same document format can
appear in Independent Check or the mission. The mission has three authored
variants, each with six Use and six Independent Check tasks covering all four
lesson strands. The exact Unit 3 audit slice has 0 findings, its focused
desktop/mobile gate passes 12/12, and the combined Unit 1–2 regression gate
passes 22/22. The frozen A0 matrix also remains 96/96.

### Unit 4 — Questions, help, calls, and appointments

Required order: questions → polite requests → invitations → calls →
appointments.

| Lesson | Decision |
| --- | --- |
| `a1-questions` | **Remain and expand** with question-word and yes/no inversion patterns. |
| `a1-polite-chunks` | **Move** directly after `a1-questions`. |
| `a1-plans-invitations` | **Split**; keep invitation/accept/refuse material and move call/message/changed-appointment chunks to their owning lessons. |
| `a1-phone-calls` | **Remain and rewrite** around complete dialogue turns and voicemail. |
| `a1-appointments` | **Remain and rewrite** around an appointment card and call. |
| `a1-short-messages` | **Move** to Unit 9. |
| `a1-questions-revision` | **Retire as a path lesson**; transfer its genuinely new `welke` examples to questions, appointments, and transport. |
| `a1-mission-phone-internet` | **Keep stable ID but fully author** as the unit call/message/appointment capstone. |

Implementation checkpoint: **completed and locally clean**. The unit now has
five lessons in the required order and 36 manually reviewed new targets across
12 capped runs, with five complete reusable patterns. `a1-questions-revision`
is retired from the path, while `a1-short-messages` now appears first in Unit 9.
Phone callback notes and appointment confirmation cards are taught in
Understand before document checks. The mission has three authored variants,
each with six Use and six Independent Check tasks covering all five lesson
strands. The exact Unit 4 audit slice has 0 findings, its focused
desktop/mobile gate passes 12/12, the combined Unit 1–3 regression gate passes
34/34, and the frozen A0 matrix remains 96/96.

### Unit 5 — Home, neighbours, and housing

| Lesson | Decision |
| --- | --- |
| `a1-house-food-plurals` | **Split**; retain rooms, objects, location, and useful plural recognition; move food nouns to Unit 6. |
| `a1-home-neighbours` | **Merge and retire**; distribute its neighbour and repair targets to the two focused lessons below. |
| `a1-neighbour-talk` | **Remain** for a believable neighbour interaction. |
| `a1-home-repairs` | **Remain** for reporting and arranging a repair. |
| `a1-cleaning-house` | **Remain** as a concrete household-routine lesson, with optional refresher runs only. |
| `a1-house-search-extra` | **Remain** around a listing and viewing appointment. |
| `a1-mission-house-search` | **Remain but fully author**; include objects/location and a neighbour/repair step before house search. |

### Unit 6 — Food, shopping, returns, and payment

Required order: supermarket → café → dietary needs/problems → clothes →
returns → payment problems.

| Lesson | Decision |
| --- | --- |
| `a1-supermarket` | **Remain and rewrite** around a list, price labels, and checkout. |
| `a1-cafe-ordering` | **Remain but narrow** to choosing and ordering from a menu. |
| `a1-cafe-food-needs` | **Remain but narrow** to dietary needs, allergy, wrong order, and missing order. |
| `a1-shopping-clothes` | **Remain but narrow** to choosing, fitting, and buying. |
| `a1-shopping-returns` | **Remain** for receipt, damage, exchange, and refund. |
| `a1-money-bank` | **Remain and refocus** as “Betalen en betaalproblemen,” not abstract banking. |
| `a1-food-shopping-mission` | **Remain but fully author** across food, clothes, returns, and payment. |

### Unit 7 — Transport and practical places in town

| Lesson | Decision |
| --- | --- |
| `a1-shopping-transport` | **Merge and retire**; move its one new station phrase to public transport. |
| `a1-public-transport` | **Remain and absorb** the useful bus/train targets. |
| `a1-directions-town` | **Remain** as a map-based direction lesson. |
| `a1-bus-train-extra` | **Merge and retire**; move `spoor`, `vertraging`, `bestemming`, and its one new question to public transport. |
| `a1-post-parcel-extra` | **Remain** around a parcel form/notice. |
| `a1-library-community` | **Remain** around opening hours and membership/service information. |
| `a1-safety-rules` | **Remain** around authentic signs and announcements. |
| `a1-mission-post-parcel` | **Keep stable ID but fully author** as one connected town journey. |

### Unit 8 — Body and health

Required order: appointment → symptoms → medicine instructions.

| Lesson | Decision |
| --- | --- |
| `a1-health-appointments` | **Remain and clean**; remove the misplaced formal-message phrase. |
| `a1-health-pharmacy` | **Split, merge, and retire**; move symptoms/GP targets to `a1-doctor-symptoms` and medicine/dosage/allergy targets to `a1-pharmacy-medicine`. |
| `a1-doctor-symptoms` | **Remain and absorb** symptom and GP-advice material. |
| `a1-pharmacy-medicine` | **Remain and absorb** medicine, dosage, and allergy material. |
| `a1-mission-doctor` | **Remain but fully author** across appointment, symptom report, advice, and medicine-label reading. |

### Unit 9 — Work and school messages

Required order: message basics → shared absence formula → school contact →
work schedule.

| Lesson | Decision |
| --- | --- |
| `a1-short-messages` | **Move here** and rewrite around a reusable short-message pattern. |
| `a1-work-school-messages` | **Split**; retain the shared greeting, identity, reason, timing, and requested-response formula. |
| `a1-school-contact` | **Remain and absorb** school-only chunks and school-app notices. |
| `a1-work-schedule` | **Remain and absorb** work-only chunks, rosters, and shift changes. |
| `a1-mission-school-day` | **Remain as the unit mission only**; it cannot double as chapter completion. |
| `a1-chapter-completion-mission` | **Add** after all nine unit missions; sample all unit outcomes and all required modalities. |

## 4. Replacement dependency contract

- Replace the arbitrary five-skill A0 prerequisite with an explicit A1 bridge:
  identity, help/repair phrases, pronouns, being/having, yes/no, numbers/time,
  address/contact, and basic question skills.
- Remove the global immediate-previous-lesson dependency chain. Every lesson
  lists only the earlier skills it actually reuses.
- Later runs in the same lesson may depend on earlier runs in that lesson.
- A unit mission requires practiced evidence from every required lesson in that
  unit. Its declared skills must occur in both Use and its 4–6-item Check.
- The A1 completion mission depends on all nine unit capstones and covers
  meaning, listening, document reading, unscored speaking support, writing with
  an accessible word-bank route, and practical use.
- Reviews remain off-path and draw only from introduced material. Retired path
  reviews do not return under new IDs.

## 5. Mandatory authoring order

1. Add A1-only authored teaching/scenario/document/pattern records and audit
   their provenance. Do not let generated templates overwrite them.
2. Rebuild Unit 1 completely and make its unit audit and manual journey clean.
3. Rebuild Unit 2, then Unit 3.
4. Rebuild Unit 4, then Unit 5.
5. Rebuild Unit 6, then Unit 7.
6. Rebuild Unit 8, then Unit 9.
7. Author the separate A1 completion mission.
8. Run the full A1 acceptance matrix and freeze only at zero errors and zero
   review flags with all browser, visual, offline, audio, migration, and
   Android gates green.

Current checkpoint: steps 1–3 and the Unit 4 portion of step 4 are complete.
Unit 5 is the next permitted authoring batch; Units 6–9 and the completion
mission remain blocked behind that sequence.

This document is an inventory and decision record, not an A1 completion
certificate.
