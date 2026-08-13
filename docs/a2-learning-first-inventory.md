# A2 Learning-First Rework — Inventory and Binding Decisions

Status: **binding inventory implemented; curriculum audit accepted at 0 errors and 0 review flags**

Authority: [`learning-first-curriculum-roadmap.md`](./learning-first-curriculum-roadmap.md)

Inventory date: **2026-08-13**

A0 and A1 are frozen. This document opens the permitted A2 cycle and binds all
A2 work to practical situations, Urdu-first teaching, and the required
Learn → Understand → Guided Practice → Use → Independent Check → Correction
sequence.

## Final implementation result

The binding structure below is now implemented in the schema-v4 course:

| Item | Final count |
| --- | ---: |
| Practical units | 8 |
| Normal lessons | 19 |
| Unit missions | 8 |
| Separate chapter-completion missions | 1 |
| Adaptive reviews | 8 |
| A2-associated concepts | 150 |
| A2-owned skills | 146 |
| Learning runs | 41 |
| Teaching blocks | 154 |
| Normal-lesson exercises | 777 |
| Mission exercises across all variants | 318 |

The final strict generated-course result is:

```text
a2: 28 lessons and missions, 1,095 active questions, 0 errors, 0 review flags
```

Every unit has its dedicated capstone. The added
`a2-school-absence-notice` lesson owns the transferred school-notice material,
and `a2-chapter-completion-mission` is a separate final check requiring all
eight unit missions. A0 and A1 regression audits also remain at zero errors and
zero review flags.

## 1. Reproducible exhaustive inventory

The complete machine-readable inventory is generated from the same schema-v4
registry that runs the app:

```bash
node scripts/report-learning-first-inventory.js --chapter=a2
```

That report includes every unit, lesson, mission variant, adaptive review,
concept, phrase, skill, pattern, prerequisite, teaching block, run, exercise,
semantic ID, phase, authored Urdu instruction, hint, correct/wrong explanation,
and document kind. This avoids maintaining a second hand-copied question bank
that can silently drift from the app.

### Baseline counts before A2 authoring

| Item | Count |
| --- | ---: |
| Units | 7 |
| Normal path lessons | 18 |
| Unit missions | 7 |
| Separate chapter-completion missions | 0 |
| Off-path adaptive reviews | 7 |
| A2-associated concepts | 246 |
| A2-associated skills including prerequisites | 252 |
| A2-owned skills | 213 |
| Reusable patterns | 6 |
| Learning runs | 79 |
| Teaching blocks | 288 |
| New-concept placements | 207 |
| Review-concept placements | 75 |
| Normal-lesson exercises | 1,470 |
| Mission exercises across all variants | 168 |
| Retired v3 compatibility records | 1,080 |

Normal lessons currently contain 38–116 exercises, with a median of 74. The
current final mission is also the Unit 7 mission, so A2 has no independent
chapter completion check.

Exact strict-audit baseline:

```text
a2: 25 lessons, 1638 questions, 388 errors, 1 review flag
```

### Strict-audit taxonomy

| Rule | Findings |
| --- | ---: |
| Generic or mangled Use context | 125 |
| Inauthentic lesson document | 79 |
| Non-situational Use prompt | 77 |
| Mission Use skill coverage | 21 |
| Mission Check skill coverage | 21 |
| Concept confusion evidence | 18 |
| Repeated usage template | 9 |
| Urdu-first visible label | 8 |
| Unit mission lesson coverage | 6 |
| Missing option explanation | 5 |
| Hidden lexical material | 4 |
| Repeated confusion template | 4 |
| Completion mission evidence | 3 |
| Low concept-guidance diversity | 2 |
| Practical topic drift | 2 |
| Other isolated error rules | 3 |
| Translation-drift review flag | 1 |

## 2. Current lesson and target inventory

The “new/review” counts below are exact schema placements. The exhaustive
stable IDs and Dutch/Urdu records are in the generated inventory command above.

| Current unit | Lesson | Runs | New | Review | Exercises | Binding decision |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| Gemeente/forms | `a2-separable-verbs-routine` | 3 | 7 | 2 | 52 | **Remain and rewrite** only around filling, signing, sending, and bringing forms; remove doctor, cleaning, and abstract infinitive drift. |
| Gemeente/forms | `a2-gemeente-official` | 4 | 12 | 4 | 77 | **Remain and narrow** to arrival, appointment, identity, BSN, and counter help. |
| Gemeente/forms | `a2-gemeente-documents` | 6 | 15 | 7 | 112 | **Remain and split internally** into document requirements, form correction, submission, and waiting for a decision. |
| Work/school | `a2-future-modal-verbs` | 3 | 9 | 1 | 54 | **Move into employment and rewrite** around availability, permission, obligation, and a near-future work plan. |
| Work/school | `a2-work-school` | 4 | 8 | 6 | 71 | **Split**: keep baan/salaris/contract in employment; transfer school absence and child messages to a new school lesson. |
| Work/school | `a2-work-conditions` | 6 | 14 | 7 | 109 | **Remain and refocus** on roster, contract, payslip, leave, sickness, and asking a supervisor. |
| Work/school | `a2-parent-school` | 6 | 16 | 5 | 113 | **Remain and split internally** into progress/support and parent-meeting/safety conversations. |
| Health | `a2-perfect-tense` | 3 | 10 | 0 | 54 | **Remain and rewrite** only for telling the huisarts what happened and when symptoms started. |
| Health | `a2-strong-combined` | 3 | 9 | 0 | 53 | **Remain but fully repurpose** as a practical follow-up conversation; it is not an abstract “strong combined” review. |
| Health | `a2-doctor-advice` | 6 | 18 | 5 | 113 | **Remain and narrow** to symptoms, duration, instructions, medicine, warning signs, and follow-up. |
| Housing | `a2-word-order-connectors` | 3 | 10 | 1 | 56 | **Remain and rewrite** around cause, consequence, condition, and requested solution in a housing complaint. |
| Housing | `a2-health-housing` | 3 | 5 | 6 | 60 | **Split and narrow** to heating/leak/repair basics; remove health and insurance drift. |
| Housing | `a2-landlord-repairs` | 6 | 15 | 6 | 116 | **Remain and refocus** on written repair reporting, access time, evidence, missed visit, cost, and follow-up. |
| Complaints | `a2-shopping-services` | 3 | 9 | 2 | 55 | **Remain and rewrite** as the first return/guarantee conversation; merge duplicate `ruilen` variants. |
| Complaints | `a2-customer-complaints` | 6 | 13 | 8 | 111 | **Remain and refocus** on damaged/wrong delivery, repair/exchange/refund, case number, and escalation. |
| Bills/banking | `a2-bills-banking` | 6 | 14 | 7 | 110 | **Remain and split internally** into reading a bill, disputing an amount, payment plan, failed debit, lost card, and proof. |
| Messages | `a2-writing-messages` | 2 | 6 | 1 | 38 | **Remain and narrow** to choosing informal versus formal opening and writing one clear short request; move casual invitation material to optional review. |
| Messages | `a2-formal-digital-messages` | 6 | 17 | 7 | 116 | **Remain and refocus** on subject, reason, date, request, attachment, contact route, follow-up, and closing. |

The only allowed new path lesson is a focused school absence/notice lesson
created from material removed from `a2-work-school`. Its targets are not new to
the course inventory; they are moved to their correct owner.

## 3. Learner-journey diagnosis

- All 18 normal lessons have strict-audit failures. They currently repeat a
  generator shape instead of providing authored task demonstrations and
  situation-specific teaching.
- Seventy-nine `document-choice` activities have no authentic lesson document
  kind. A learner is asked to “read a document” that is effectively a target
  sentence placed in a generic card.
- The 202 Use-context failures repeat the answer inside a generic topic sentence
  or merely append “someone is listening.” They do not create a real decision
  or communication need.
- Four mixed-topic lessons still behave like grammar buckets. Separable verbs
  combine forms, doctors, and cleaning; future/modals combine work, gemeente,
  parking, and health; connector examples mention transport and weather inside
  housing; the “combined” health lesson declares itself a review while adding
  nine new targets.
- The dependency map is still an immediate-previous-lesson chain. For example,
  the first health lesson depends on the final school lesson, housing depends on
  the final health lesson, and complaints depend on housing. These are path
  positions, not educational prerequisites.
- The chapter starts with five arbitrary final-A1 work-schedule skills. A2
  instead needs situation-specific A1 prerequisites and optional refreshers.
- Six unit missions omit at least one normal-lesson strand. The employment
  mission currently contains only school targets; the utilities mission is
  really bills/banking; and the “lost or stolen” mission contains attachment
  and appointment-email targets.
- The current last mission covers only formal-message material but is marked as
  the A2 completion check. It cannot demonstrate chapter-wide listening,
  reading, speaking support, writing, and practical use.
- `ik wil hem graag ruilen` and `ik wil hem ruilen` share one Urdu prompt and
  create the remaining review flag. Hidden supporting words and five missing
  distractor explanations also remain.

## 4. Binding eight-unit structure

### Unit 1 — Gemeente, identity, forms, and applications

Order: form actions → arrival/identity/counter help → requirements, correction,
submission, and response → unit mission.

Keep the three stable lesson IDs and `a2-mission-social-help`. The mission must
cover all three lesson strands and use a taught appointment letter, identity
checklist, and form/correction record.

Implementation checkpoint: **completed and locally clean**. The three lessons
now teach 31 manually reviewed practical targets across eight capped runs. They
use individual Urdu-first teaching records, two complete reusable patterns,
eight typed documents, stable authored Use situations, and genuine A1 or
earlier-Unit-1 prerequisites. The unit mission has three authored variants;
each contains six Use and six Independent Check tasks and represents all three
lesson strands. The exact Unit 1 audit slice has 0 findings and its focused
desktop/mobile browser gate passes 10/10, including phone, tablet, and desktop
overflow checks.

### Unit 2 — Employment and work conditions

Order: job vocabulary and starting information → plans, permission, and
obligation → contract/roster/payslip/leave/sickness → unit mission.

Keep `a2-work-school` for the employment-owned material, then
`a2-future-modal-verbs`, `a2-work-conditions`, and `a2-mission-job-start`.
Remove every child/school target from the unit mission.

### Unit 3 — School contact as a parent

Add one stable school-absence lesson from the material transferred out of
`a2-work-school`, followed by `a2-parent-school` and a dedicated unit mission.
Teach a school-app notice and parent-meeting card before either is assessed.

### Unit 4 — Health, past events, advice, and follow-up

Order: what happened/when → complete huisarts story and follow-up → symptoms,
instructions, medicine, warning signs → unit mission.

Keep the three current lesson IDs and `a2-health-doctor-mission`, but replace
the abstract grammar framing with one healthcare journey.

### Unit 5 — Housing problems and written repair follow-up

Order: problem basics → reason/condition/requested solution → detailed written
report, access, evidence, missed visit, and cost → unit mission.

Keep the three current lesson IDs and `a2-housing-problems-mission`; remove all
health examples and teach an authentic repair form/message before assessment.

### Unit 6 — Returns, guarantees, complaints, and escalation

Order: first return conversation → delivery/guarantee/case follow-up and
escalation → unit mission.

Keep both lessons and `a2-shopping-complaints-mission`. Use a taught receipt,
order confirmation, guarantee condition, and complaint number.

### Unit 7 — Bills, payments, banking, and card safety

Keep `a2-bills-banking` and `a2-mission-utilities`, but retitle/re-author the
mission around one bill/payment/card journey. Teach the bill, debit failure,
payment reference, and proof-of-payment formats before the capstone.

### Unit 8 — Formal messages, attachments, and follow-up

Keep both message lessons. Keep the stable ID `a2-mission-lost-stolen`, but
re-author it as the formal-message unit mission matching its actual taught
content. It cannot remain the chapter completion check.

### Separate A2 chapter completion mission

Add `a2-chapter-completion-mission` after all eight unit missions. It introduces
nothing, requires every unit capstone to be practiced, samples every unit, and
covers listening, reading, unscored speaking support, accessible short writing,
meaning, and practical use in connected real-life tasks.

## 5. Replacement dependency and content contract

- Remove all cross-unit immediate-previous dependencies. Each lesson names only
  the exact A1/A2 skills it reuses.
- Keep all lessons browseable. Missing prerequisites produce an optional Urdu
  refresher, never a surprise scored question.
- Each A2 run contains at most four new practical chunks plus one grammar or
  communication function. A review-only run moves to adaptive review.
- Every authentic document is taught and recognised before its format appears
  in Use, Independent Check, or a mission.
- Each lesson receives individual Urdu teaching records, pronunciation,
  examples, usage boundaries, and concept-specific common mistakes.
- Every scored Use item needs authored provenance and a concrete setting/action
  that does not repeat the answer.
- Each unit mission requires practiced evidence from every normal lesson and
  assesses every declared skill in both Use and its 4–6-item Check.
- Free typing always has a word-bank route. Speaking repetition stays unscored.
- Reviews contain introduced material only; missions contain practiced or
  secure material only.

## 6. Mandatory A2 authoring order

1. Rebuild Unit 1 and reach zero findings for its exact audit slice.
2. Rebuild employment, then school contact, without reintroducing mixed-topic
   ownership.
3. Rebuild health, then housing, with grammar embedded in those situations.
4. Rebuild complaints, then bills/banking.
5. Rebuild formal messages and its unit mission.
6. Add the separate A2 completion mission.
7. Run the complete A2 audit and browser matrices until both report zero errors
   and zero review flags.
8. Complete manual phone/tablet/desktop journeys, offline/audio/migration asset
   parity, installed Android update persistence, and a native debug build.
9. Freeze A2 only when every gate is green.

A2 authoring may now begin with Unit 1. No later unit is accepted merely because
the generator can produce its phases.
