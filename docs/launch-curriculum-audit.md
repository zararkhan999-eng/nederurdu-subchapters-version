# NederUrdu lesson-first launch curriculum audit

**Reviewed:** 2026-10-06  
**Status:** Level promises and full lesson-run inventory recorded; curriculum is **not ready for visual rollout** until the A2 teaching and document-reading gaps below are closed.

This review uses the canonical schema-v4 course in `course-data.js`, the learning-first contract in `learning-first-curriculum-roadmap.md`, and the A1/A2 inventory records. The CEFR promises below are deliberately practical course promises, not a certification claim. The Council of Europe describes CEFR levels through can-do descriptors; NederUrdu A0 is the app's own foundation band, aligned to Pre-A1 work, rather than an official CEFR level. [Council of Europe: CEFR levels](https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions), [Pre-A1 and A1 descriptors](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors-search).

## 1. Level promises

| Level | Learner promise | Introduced and practised | Independent-use boundary |
|---|---|---|---|
| **A0 — Foundation / Pre-A1** | Meet immediate needs with very short Dutch: greet, ask for repetition or help, give basic personal details, recognise numbers and times, make a simple request, and understand essential directions or safety language. | Sound and print support; memorised social chunks; basic people and thing words; a few high-frequency present forms; yes/no and simple questions; numbers, time, place, shopping, travel, health, school, work, and safety phrases. Recognition and short supported replies come before combining chunks. | Choose and say a rehearsed phrase or one short sentence in a familiar situation. This level does not promise connected narration, flexible conversation, or independent paragraph writing. Alphabet and pronunciation support remain available. |
| **A1 — Everyday communication** | Handle simple, predictable exchanges about personal information, family, routines, home, food, appointments, transport, health, school, and work. Read short familiar forms, signs, schedules, labels, and messages; write a brief model-based reply. | Common present forms and sentence frames; question order; time-first V2; basic articles and possessives; common negation; modals and two-verb/separable-verb chunks; practical vocabulary, politeness, pronunciation, short dialogues, forms, and notices. | Ask and answer short questions and complete familiar practical tasks, with repetition, rephrasing, visual or Urdu help, and learned chunks available. A1 does not promise sustained spontaneous conversation or independent explanation of unfamiliar events. |
| **A2 — Practical independence** | Complete familiar multi-step tasks at the municipality, work, school, doctor, home, shop, bank, or by email. Understand short everyday documents; report a past event, explain a simple reason or condition, state a plan or obligation, and write a short practical message. | Present and past forms; future plans and modals; main- and subordinate-clause order; connectors; separable verbs; common pronoun, adjective, article, plural, negation, and preposition patterns; authentic forms, notices, messages, schedules, bills, and service interactions. | Complete routine, familiar exchanges with less support and connect a few simple sentences. The promise is not broad fluency: an A2 learner may still need a cooperative speaker, time to prepare, and help when a conversation moves beyond the familiar task. |

These boundaries follow the difference between Pre-A1 formulaic expressions, A1 short simple exchanges that may depend on repetition and repair, and A2 simple direct exchanges on familiar matters. The CEFR A2 reading and writing descriptors also support finding predictable details in everyday materials and linking simple sentences with connectors. [Council of Europe: CEFR Companion Volume](https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2018/1680787989.pdf).

## 2. Coverage map and method

The complete map is [lesson-coverage-map.csv](./lesson-coverage-map.csv). It contains one row for each current learning run: the run's outcome, prerequisites, new Dutch–Urdu targets, any explicit pattern card, Use prompts, and target-by-target phase markers.

| Level | Regular lessons | Runs | New target placements | Explicit pattern cards | Target links: Teach / Understand / Guided / Use / Independent Check |
|---|---:|---:|---:|---:|---|
| A0 | 36 | 107 | 345 concepts + 8 patterns | 8 | 353 / 353 / 353 / 353 / 353 |
| A1 | 38 | 81 | 264 concepts + 38 patterns | 38 | 302 / 302 / 302 / 302 / 302 |
| A2 | 19 | 41 | 144 concepts + 7 patterns | 7 | 151 / 151 / 151 / 89 / 151 |
| **Total** | **93** | **229** | **753 concepts + 53 patterns** | **53** | **806 / 806 / 806 / 806 / 806** |

The phase figures count semantic links in the active lesson-run records, not just whether a phase screen exists. A target's map markers mean: **T** has a teaching block, **R** is linked to Understand, **G** is linked to Guided Practice, **U** is linked to Use, and **I** is linked to the Independent Check. A marker proves traceability in the course data; it does not, by itself, prove that a prompt is natural or instructionally sufficient. Use prompt samples are included so that situation quality can be reviewed in context.

**Readiness evidence:** every new concept and explicit pattern in the current runs is now linked to teaching, recognition, guided practice, and an independent check. Every new concept has a target-level Use exercise in the current data. Pattern cards now have guided sentence builds, though the quality and later transfer of each still need instructional review. Independent Checks currently contain five or six items per run.

The current content audit reports **0 errors and 0 review flags** for all three levels (A0 45 path records / 2,262 questions; A1 48 / 2,043; A2 28 / 1,169). It checks target-level Use, pattern Guided Practice, generic or repeated document fields, and whether an A2 reading question points to one of its rows. It still cannot establish that a document is believable or that feedback and situations teach well.

**Rendered sample:** `Ziek melden en een schoolbericht lezen` was reviewed in the live app through its opening Understand prompt. Its preview now states a practical can-do outcome instead of listing translations. The teaching cards give Dutch, Urdu meaning, pronunciation support, and contextual use. The path places school absence before the dedicated A2 past-tense unit, so the lesson now explicitly teaches `had` (past of `hebben`) and `moest` (past of `moeten`) before recognition and production; it contrasts the sentence with the present and keeps `thuisblijven` in the infinitive after the modal. The lesson also lists the earlier modal and separable-verb lessons as prerequisites. No answer was submitted, so feedback and correction remain unreviewed in the rendered flow.

## 3. Grammar progression map

“In examples” means the form occurs in a phrase, sentence, or exercise. “Explicit” means there is an authored pattern card that explains the pattern. The difference is material: seeing a form in a sentence is not enough to promise independent use.

| Grammar target | A0 | A1 | A2 | Audit judgement / work needed |
|---|---|---|---|---|
| Verb changes across people and common types | `zijn`, `hebben`, `gaan`, and `komen` appear in short forms; `ben/bent/is` and `hebben` have explicit cards. | Many common present forms recur in routines and service phrases; some cards teach sentence frames rather than a reusable person-by-person verb system. | Present forms recur in work, school, health, and public-service examples; no broad present-tense system card. | **Partial.** Add a compact regular/irregular contrast and revisit it with new verbs; retain phrase-level support. |
| Present, past, and future plans | Present and immediate plans are introduced; no past-tense promise. | Present-time language and plans recur; no past-narrative promise. | `a2-perfect-tense` teaches `hebben/zijn + voltooid deelwoord`, shows common regular forms (`bellen → gebeld`, `werken → gewerkt`), contrasts one common irregular (`vallen → gevallen`) and a simple-past example. `a2-future-modal-verbs` contrasts `gaan + infinitive` with modal meanings. | **Partially addressed at A2.** Check that guided practice helps choose d/t and the auxiliary for the taught verbs, and that learners revisit the forms later. |
| Statements, questions, time/place order, subordinate clauses | Short model statements, basic question words, and spatial chunks. | Explicit time-first V2 (`vandaag werk ik`) and question order (`waar woont u?`); two-verb and separable forms recur. | `a2-word-order-connectors` now shows main-clause order, verb-final `omdat/dat`, and inversion after a fronted `als` clause. | **Partial at A1/A2.** Review the number of new clause patterns on the A2 card and provide supported recognition before building sentences. |
| Articles, plurals, adjective forms | `de/het/een` word chunks; number examples include plurals. | Articles recur in family and everyday nouns; plural forms appear in vocabulary. | `documenten` and adjective forms occur in phrases; no A2 card explains plural or adjective changes. | **Partial.** Keep article-with-noun teaching; add targeted plural and adjective contrasts where they are required for a practical task. |
| Pronouns, possessives, reflexive forms | Subject pronouns and basic possessives appear in short sentences. | Subject and possessive forms recur in personal, family, and service contexts. | Object `hem` and reflexive `zich` appear in phrases; no explicit A2 pattern. | **Partial.** Teach object position and a small set of common reflexives through a context; do not imply a full pronoun paradigm before it is taught. |
| Negation: `geen` and `niet` | Explicit A0 contrast: `geen` with an indefinite noun vs `niet` for other negation. | Negation is recycled in personal and practical phrases. | `niet` appears in work, school, repair, and messages; no A2 contrast/retrieval card. | **Good introduction; reinforce cyclically.** The A0 card already gives a useful contrast and common mistake. Revisit it in new A1/A2 settings. |
| Modal verbs and two-verb constructions | `willen`, `kunnen`, and `moeten` appear in immediate requests or instructions. | `willen`, `kunnen`, `mogen`, and `moeten` recur in frames; some cards teach a specific request or plan. | `a2-future-modal-verbs` now contrasts `gaan + infinitive` with plan, ability, obligation, and permission frames. | **Partially addressed.** Check that the dense card distinguishes meanings and gives enough practice with questions and negatives. |
| Separable verbs | A few concrete instruction or movement phrases. | Explicit `opstaan` and `terugbellen` sentence patterns; examples span daily life. | Explicit `invullen` pattern for an imperative; `afmelden`, `meenemen`, and `opsturen` also appear as useful chunks. The school-absence lesson now lists the earlier separable-verb lesson as a prerequisite. | **Partial.** Learners meet a new verb after the earlier pattern, but the current A2 lesson does not contrast its main-clause, imperative, infinitive, and perfect forms together. |
| Prepositions and verb–preposition combinations | Spatial `in/op/onder` and `naar/met` have early teaching. | Location, time, direction, and chunks such as `allergisch voor` recur. | `a2-doctor-advice` explicitly teaches `allergisch voor` with a contrast and a common omission error. | **Partially addressed.** Teach further practical verb–preposition combinations only where the lesson requires them. |
| Connectors and word-order effects | Simple links such as `en/maar` are encountered. | Connectors are used in routine phrases and time sequences. | `a2-word-order-connectors` contrasts `omdat` and `want`, includes verb-final `dat`, and shows fronted `als` inversion. | **Partially addressed.** Review its density and give supported recognition for the two subordinate clause patterns. |

### Focus review: current A2 grammar lessons

- **Future and modals:** `a2-future-modal-verbs` now has a card contrasting `gaan + infinitive` with `kan/moet/mag + infinitive`, including plan, ability, obligation, and permission examples. This is a dense card; the meaning distinctions and question/negative forms still need a learner-sequence review.
- **Perfect tense:** `a2-perfect-tense` now names the participle, shows a regular `ge- + stem + -d/-t` pattern (`bellen → gebeld`, `werken → gewerkt`), contrasts the common irregular `vallen → gevallen`, and distinguishes the simple past. Check that guided practice helps learners choose d/t and the auxiliary for these taught verbs; feedback must not imply that one auxiliary rule covers every verb.
- **Connectors and clauses:** `a2-word-order-connectors` now contrasts `omdat` with `want`, includes a verb-final `dat` example, and shows fronted `als` with inversion in the main clause. Review this dense card in the learner sequence and add separate guided recognition if learners cannot distinguish the two clause positions.
- **School absence:** this lesson appears before the dedicated A2 past-tense unit. Its pattern card now teaches `had` and `moest` in `hij had koorts en moest thuisblijven`, with a present-tense contrast and the infinitive after the modal. It also lists `a2-future-modal-verbs` and `a2-separable-verbs-routine` as prerequisites. Later feedback and the parent-school lesson still need review to confirm reinforcement.
- **Pattern practice:** all 53 current pattern skills now have a target-linked guided word-order build in addition to recognition, Use, and checking. Review whether the tiles make the intended pattern visible and whether the following Use item genuinely transfers it.

## 4. Vocabulary, real use, and modalities

- New targets are primarily taught as full phrases and sentence chunks, not only isolated translations. The CSV preserves Dutch and Urdu forms and shows exactly where a target appears.
- The content audit found no exact duplicate Dutch phrase among distinct new-concept introductions within a level. Reuse is explicitly marked in review placements: A0 22, A1 69, A2 8. This supports intentional recycling, though A2 retrieval should be strengthened around the missing grammar patterns.
- A1 has 17 document-choice records with distinct document titles and meaningful field labels (for example, a personal-details form, receipt, departure board, medicine label, school notice, and work roster).
- **A2's 41 document cards** have lesson-specific titles and document types, phrase-matched Urdu field labels, and distinct labels when several details share a category. Their questions now ask what the named field tells the learner, and correct/wrong feedback directs attention to the field and its value. Answers still use Urdu meaning choices, so a rendered review must confirm the task feels like practical information-finding and the document layout supplies enough context.
- Each new vocabulary target now has a target-linked situation in Use; the coverage map shows all 753 concepts and 53 patterns linked through Teach, Understand, Guided Practice, Use, and Independent Check. Lesson previews now use the authored practical outcome instead of a run's translation list. The generated situations still need review for believable context, appropriate register, and a real communicative choice before treating this structural pass as quality approval.
- Listening, speaking repetition, builds, and short-input tasks exist, but they do not yet prove that learners independently write a practical message. The capstone and message lessons still need an adult review for a purposeful written outcome.
- Situations in the Use phase are included in the CSV. The map shows target linkage, while the prompt text lets the reviewer judge whether there is a believable reason to communicate and whether politeness/register is appropriate.

## 5. Lesson readiness and chapter checks

| Gate | Current evidence | Decision |
|---|---|---|
| Learner sees a practical outcome and prerequisites | Every run has an Urdu outcome and prerequisite IDs in the course object; included in the map. | **Pass structurally.** Review the Urdu wording and scope as lessons are revised. |
| Targets are taught before recognition/production/check | All 753 concept and 53 pattern placements are linked to teaching, Understand, Guided Practice, and Independent Check. | **Pass for traceability.** Review whether guided pattern builds actually teach the target distinction. |
| Practice moves from support toward independent use | Every new concept has a target-linked Use item; every run has Understand, Guided Practice, Use, and a five- or six-item Independent Check. | **Pass structurally; sample review needed.** Check that each situation provides a believable reason to communicate. |
| Feedback explains and repairs the answer | The structural audit found no explanation-field errors; answer-specificity and correction quality were not proved by that result. | **Sample review required.** Keep specific distractor explanations and require a supported repair after an error. |
| Reviews do not add new material | The content audit reports no review flags. | **Pass structurally.** Keep reviews limited to introduced targets. |
| Unit missions sample lessons in their unit | Each unit has a mission; A1/A2 have separate chapter-completion missions. | **Pass structurally.** |
| Chapter check samples the whole chapter | A1/A2 have separate completion missions; the A0 completion check is its final unit mission and now requires the earlier A0 unit missions. | **Pass structurally.** The current sequence has a prerequisite-gated cumulative check. |
| Reading uses believable real documents | A1 records are recognizable; A2's 41 cards now have lesson-specific document types, distinct matching field labels, and questions tied to requested information. | **Needs learner-facing review.** Check whether each card reads like the named notice, record, form, or message and asks learners to find useful information in context. |

## 6. Required curriculum work before visual rollout

1. Keep the level promises above as the scope gate; label A0 as the app's foundation / Pre-A1 band.
2. Review all 53 pattern sequences for understandable contrasts, specific mistake feedback, meaningful Use, independent checking, and later retrieval. Decide where further practical preposition–verb combinations belong and teach them as reusable chunks.
3. Review the newly linked Use prompt for every concept in the CSV. All targets now have an exercise link, but the prompt should still create a believable reason to choose or produce that phrase; revise weak contexts and preserve teach-before-test order.
4. Review A2's 41 typed documents in the lesson UI. Confirm that each format looks like its named form, notice, email, bill, or record, and that learners extract an actionable detail from it. Upgrade the answer format if Urdu meaning choices make a practical task feel like a translation drill.
5. Recheck register, pronunciation, grammar contrasts, and wrong-answer feedback in representative lessons. Trace whether past and modal forms in the school-absence lesson have explicit prior teaching and supported practice. The structural audit now rejects generic A2 document titles/fields, missing target-linked Use items, and patterns without Guided Practice; it cannot judge naturalness or feedback quality.
6. Review mission prompts and verify that every assessed target has already been practised.
7. Once these gates pass, start visual work with one representative A2 lesson from Preview through Correction, then approve its design language before scaling.

## Reproducing the coverage map

After course content changes, regenerate the map from the canonical course object with:

```sh
node scripts/export-launch-coverage-map.js
```

The structural content audit run for this review was:

```sh
node scripts/audit-course-content.js
```
