# A1/A2 Grammar Spine — Follow-up Audit and Proposal

Status: **proposal for the next round; nothing here is implemented yet**

Authority: [`learning-first-curriculum-roadmap.md`](./learning-first-curriculum-roadmap.md)
(§2 lesson contract, §3 caps, §7 chapter cycle)

Course snapshot: commit `03d7af6` (A0 reorder skeleton). Lesson ids and path
positions (`#n`, 1-based over all 113 path lessons) are as of that commit. At
`03d7af6` the six lessons that move to A1 are still inside A0, so the A0
counts below include them. After the move, the A0 counts drop and the A1
counts rise.

This round only changes A0. This document sets up the next round: where A1 and
A2 **teach** grammar, compared with where they already **use** it as memorised
chunks, and how to fix the order.

## 0. Main findings

1. **Modal verbs are the biggest gap.** 60 taught concepts in 40 lessons use
   kunnen/willen/moeten/mogen before `a2-future-modal-verbs` (#99) teaches them
   as grammar. 41 of these concepts are in A1, spread over 26 of its 38 lessons.
   A1 explains the "helper second, infinitive last" frame six times, each time
   as a lesson-specific template, and never teaches the conjugation
   (`ik kan / u kunt`, `ik wil / u wilt`).
2. **Separable verbs are taught three times before they are "taught".** A1
   patterns in `a1-child-care`, `a1-daily-routine` and `a1-phone-calls` each
   explain one verb (`ophalen`, `opstaan`, `terugbellen`). There is no general
   rule until `a2-separable-verbs-routine` (#95). By then, 21 concepts in 17
   A0/A1 lessons already use separable verbs.
3. **The perfect tense arrives after learners need it.** 6 A1 concepts in 5
   lessons, plus 1 in A2, use the perfect before `a2-perfect-tense` (#103):
   `ik heb uw bericht gelezen`, `ik heb nog niets gekregen`,
   `het pakket is nog niet gekomen`, `mijn dienst is veranderd`.
4. **Subordinate clauses are used before they are taught, inside A2.**
   `a2-strong-combined` (#104) and `a2-doctor-advice` (#105) use
   `omdat`/`dat`/`als` with the verb at the end, but `a2-word-order-connectors`
   (#107) teaches that rule three lessons later. This breaks the constitution's
   rule that assessment follows teaching.
5. **The simple connectors are missing.** `want` appears 0 times, `maar` once,
   and `en` joining two clauses once. CEFR A2 expects "and, but, because". The
   course jumps straight to verb-final `omdat`.
6. **Pronoun and determiner gaps.** `jullie`, `hun` and `onze` never appear.
   `ze`/`we`/`je` (unstressed) and `deze`/`die` (10 concepts) are used but never
   taught.
7. **Several grammar points are used but never owned by a lesson:**
   - placement of `niet` (13 A1 concepts);
   - `liggen/staan` as "be located" (7 concepts);
   - the imperative (18 concepts across A0–A2);
   - verb-stem spelling (`ik spreek / wij spreken`, `ik eet / wij eten`);
   - passive recognition (`wordt gerepareerd`);
   - the past of modals (`moest`).
8. **"Patterns" are mostly slot templates.** All 38 A1 lessons have a pattern,
   but only about 13 contain a reusable grammar rule. The other 25 are frames
   like `ik zoek melk` or `mijn pinpas werkt niet`. 14 of the 19 A2 lessons
   have no pattern at all.
9. **Overlap is mostly healthy spiral, with four real duplicates:**
   `a1-people-family-articles`, `a1-polite-chunks`, `a1-present-time` (made
   redundant by the new A0 sentence engine) and `a1-greetings-personal-info`
   (1 new target, 10 review).
10. **The six lessons moving to A1 fit well,** if they sit at specific slots
    (§5). Two of them also unblock existing A1 lessons that use their grammar
    early.

## 1. Method

- The course was loaded read-only through `vm` from `course-data.js`. Units
  were walked in chapter order to get the path order.
- **Concept-level counts:** a concept "uses" a feature when its `dutch` head
  form matches a feature pattern. Concepts are attributed to
  `introducedInLessonId`. Example-only hits are counted separately and are not
  included in the headline numbers.
- **Exercise-level counts:** non-demonstration exercises whose Dutch `speak` or
  `answer` matches. Distractor options are excluded, so deliberately wrong
  forms are not counted.
- Every regex hit list was reviewed by hand. Known false positives were removed
  (for example, `de was` in `a1-cleaning-house` is "laundry", not the past
  tense). The counts are therefore close lower bounds, not exact.
- The scratch scripts are not committed. A repeatable "grammar first-use"
  report is proposed in §9.

## 2. Where grammar is taught, and where it is already used

| Grammar point | Taught as a rule in | First used as a chunk in | Concepts using it before the rule | Lessons using it before the rule |
| --- | --- | --- | ---: | ---: |
| Modal verb + infinitive at end | `a2-future-modal-verbs` (#99) | `a0-understanding-help` «kunt u herhalen?» | 60 (A0 14, A1 41, A2 5) | 40 (A0 11, A1 26, A2 3) |
| Separable verbs | `a2-separable-verbs-routine` (#95); partial A1 patterns in `a1-child-care`, `a1-daily-routine`, `a1-phone-calls` | `a0-home-needs` «doe de deur dicht», `a0-child-school` «ik haal mijn kind om drie uur op» | 21 (A0 4, A1 17) | 17 (A0 3, A1 14) |
| Perfect tense | `a2-perfect-tense` (#103) | `a1-home-repairs` «het probleem is opgelost» | 7 (A1 6, A2 1) | 7 (A1 5, A2 2) |
| Simple past beyond was/had/ging | nowhere | `a2-school-absence-notice` «hij had koorts en moest thuisblijven» | 2 (`moest`, `begon`) | 2 |
| omdat / dat / als (verb last) | `a2-word-order-connectors` (#107) | `a2-strong-combined` (#104) «omdat ik pijn had in mijn rug» | 5 | 2 (`a2-strong-combined`, `a2-doctor-advice`) |
| want / maar / en (verb stays second) | nowhere | `a1-work-schedule` «ik ben ziek en kan niet werken» | 2 | 2 |
| Imperative | nowhere (no pattern) | `a0-understanding-help` «luister alstublieft» | 18 (A0 9, A1 4, A2 5) | 14 A0, 6 A1, 4 A2 |
| Placement of `niet` (end / before infinitive / before place) | A0 `a0-ja-nee-goed-niet` covers only `niet` vs `geen` | `a0-understanding-help` «ik begrijp het niet» | A1 13 | A1 ~12 |
| `deze` / `die` | nowhere | `a1-shopping-clothes` «deze jas is te groot» | 10 (A1 4, A2 6) | 7 |
| `liggen` / `staan` = "is located" | nowhere | `a1-neighbour-talk` «er ligt een pakket voor u» | 7 (A1 5, A2 2) | 7 |
| Passive (`wordt` + participle) | nowhere | `a2-word-order-connectors` «ik wil dat de lekkage wordt gerepareerd» | 2 | 2 |
| `zullen` | nowhere | `a1-plans-invitations` «zullen we om drie uur afspreken?» | 1 | 1 |
| `laten` + infinitive | nowhere | `a1-directions-town` «kunt u het op de kaart laten zien?» | 2 | 2 |
| `sinds` / `al` + present | nowhere | `a1-doctor-symptoms` «ik heb sinds gisteren koorts» | 6 (A1 1, A2 5) | 7 |
| `jullie`, `hun`, `onze` | nowhere | never used | 0 | 0 |

What A1 teaches well today, with a real rule in its pattern:
- time first, then inversion (`a1-present-time`; now redundant with A0);
- question word order (`a1-questions`);
- `op maandag` / `in de middag` (`a1-calendar-time`);
- `te groot` (`a1-shopping-clothes`);
- the three single-verb separable patterns above;
- six modal templates: `a1-polite-chunks`, `a1-neighbour-talk`,
  `a1-appointments`, `a1-cleaning-house`, `a1-safety-rules`,
  `a1-pharmacy-medicine`.

## 3. Findings by topic

### 3.1 Modal verbs (kunnen, willen, moeten, mogen)

| Chapter | Concepts | Non-demo exercises | Lessons | Examples |
| --- | ---: | ---: | ---: | --- |
| A0 | 14 (+10 example-only) | 83 | 11 | «kunt u herhalen?», «ik wil graag water», «mag ik de bon», «ik moet naar de tandarts», «ik kan vandaag niet komen» |
| A1 | 41 | 217 | 26 of 38 | «ik wil een afspraak maken», «ik moet de afspraak annuleren», «mag ik dit passen?», «waar moet ik overstappen?», «ik ben ziek en kan niet werken» |
| A2, before #99 | 5 | — | 3 | «waar moet ik tekenen?», «kan ik de aanvraag online doen?» |

- In A0 this is acceptable: survival chunks are allowed.
- In A1 it is the main grammar engine of the chapter, but it is never taught
  as one rule. Learners see six separate templates and no conjugation table.
  The typical errors this produces (`ik wilt`, `ik kunt`) already appear as
  A1 distractors, which shows the authors expect them.
- `a2-future-modal-verbs` then re-teaches as "new" what A1 has drilled about
  200 times.

**Fix:** add one A1 lesson, `a1-modal-verbs`, early in the questions/help
unit. It fits the A1 cap: targets `ik kan / u kunt`, `ik wil / u wilt`,
`ik moet`, `mag ik`, plus `ik kan niet`, and one pattern: "helper in second
place, infinitive last". The six A1 templates then become reuse.
`a2-future-modal-verbs` becomes the A2 extension (§7, item 3).

### 3.2 Separable verbs

- **A0 (4 concepts):** «doe de deur dicht», «ophalen», «ik haal mijn kind om
  drie uur op», «ik haal haar om drie uur op». The last one is in
  `a0-object-pronouns`, which moves to A1.
- **A1 (17 concepts, 14 lessons):** «ik sta om zeven uur op», «neem een
  paraplu mee», «waar spreken we af?», «ik bel u vanavond terug», «spreek een
  bericht in», «ik wil dit terugbrengen», «waar moet ik overstappen?», «sla
  rechts af», «ik wil mijn pakket ophalen».
- A1 already contains both halves of the rule:
  - split in a main clause: «ik sta … op»;
  - together after a modal: «ik wil mijn pakket ophalen».
  It never puts them side by side.

**Fix:**
- Upgrade the `a1-daily-routine` pattern from "opstaan in this sentence" to the
  general rule. Use a three-row table: main clause (split), imperative (split),
  after a helper (together). Model verbs: `opstaan`, `ophalen`, `meenemen`,
  `terugbellen`.
- `a1-child-care` comes earlier and keeps «ik haal … op» as a known A0 chunk,
  with a forward note.
- `a2-separable-verbs-routine` stays first in A2, but becomes a review plus
  extension: forms vocabulary and separable participles (`ingevuld`,
  `opgestuurd`, `meegenomen`). Today `a2-formal-digital-messages` uses
  `ingevuld` without teaching it.

### 3.3 Perfect tense and simple past

- **Perfect used in A1 before any teaching:**

  | Lesson | Concept |
  | --- | --- |
  | `a1-home-repairs` | «het probleem is opgelost» |
  | `a1-cafe-food-needs` | «ik heb nog niets gekregen» |
  | `a1-post-parcel-extra` | «het pakket is nog niet gekomen», «op welk adres is het bezorgd?» |
  | `a1-short-messages` | «ik heb uw bericht gelezen» |
  | `a1-work-schedule` | «mijn dienst is veranderd» |

  In A2, `a2-work-school` uses «mijn rooster is veranderd» before #103.
- **was/had/ging** currently sits in `a0-past-was-had` and is moving to the A1
  work-school-messages unit. It gives learners only the past of zijn, hebben
  and gaan.
- **A2 uses past forms that are never taught:**
  - `moest` in «hij had koorts en moest thuisblijven»
    (`a2-school-absence-notice`, #101);
  - `begon` in «de pijn begon gisteravond» (`a2-perfect-tense`).
- **Homograph trap:** `a1-cleaning-house` teaches «ik doe vandaag de was»
  (laundry). Once was/had moves into A1, this lesson comes before «ik was
  ziek». Both lessons need an Urdu confusion note.

**Fix:**
- Add `a1-perfect-intro` to the last A1 unit, directly after the moved
  was/had/ging lesson. Teach:
  - `hebben` + regular `ge-…-d/-t`;
  - the six irregular participles A1 already needs (`gelezen`, `gekregen`,
    `gedaan`, `gehad`, `gegeten`, `gezien`);
  - `is gekomen` / `is veranderd` for recognition only.
- The earlier A1 perfect chunks stay as chunks, each with a one-line Urdu note.
- `a2-perfect-tense` becomes the A2 extension: `zijn` vs `hebben` (`gegaan`,
  `gebleven`, `gevallen`, `begonnen`), more irregular verbs, separable
  participles, and story order (`eerst … daarna …`).
- Add `moest` / `kon` / `begon` for recognition in `a2-school-absence-notice`.

### 3.4 Connectors and subordinate clauses

**Used before taught** (rule in `a2-word-order-connectors`, #107):

| Lesson | Position | Concepts |
| --- | --- | --- |
| `a2-strong-combined` | #104 | «omdat ik pijn had in mijn rug», «omdat ik pijn had», «dat ik rust moet nemen», «als de pijn niet weg is» |
| `a2-doctor-advice` | #105 | «de pijn wordt erger als ik loop» |

Neither lesson has a pattern.

**Missing simple step:**
- `want` appears 0 times.
- `maar` appears once («maar hij is kapot», `a2-shopping-services`).
- `en` joins two clauses once («ik ben ziek en kan niet werken»).
- `want` (verb stays second) is the natural A1 "because". `omdat` (verb last)
  then becomes a clear A2 contrast. This also matches how Urdu speakers think:
  `کیونکہ` maps to both, and the word order is the only difference to learn.

**Fix:**
- A1: introduce `en / maar / want / of` in the `a1-short-messages` pattern, for
  example «ik kom later, want de bus heeft vertraging».
- A2: add a new lesson in the school-contact unit, before
  `a2-school-absence-notice`, that teaches `omdat` and `dat`.
  `a2-strong-combined` adds `als`.
- `a2-word-order-connectors` becomes the consolidation lesson: `als` first,
  then inversion («als de monteur komt, ben ik thuis»), `ik wil dat …`, and
  passive recognition.

### 3.5 Other grammar that no lesson owns

| Point | Evidence | Proposed owner |
| --- | --- | --- |
| `niet` placement | `niet` at the end: «vandaag werk ik niet», «mijn pinpas werkt niet»; before an infinitive: «ik kan maandag niet komen»; before a place phrase: «ik ga niet naar buiten» | `a1-appointments` pattern. Its current template «ik wil + afspraak + maken» duplicates the new modal lesson. |
| `liggen/staan` = "is located" | «waar ligt de rijst?», «er ligt een pakket voor u», «het rooster staat in de app», «staat het rooster in de app?» | `a1-house-food-plurals`, which today re-teaches A0 `boeken` and «het boek is in de kamer» |
| Imperative, including polite `u` | «sla rechts af», «lees de bijsluiter», «neem een paraplu mee», «spreek een bericht in» | `a1-directions-town` pattern (today the slot frame «hoe kom ik bij …?») |
| Verb-stem spelling | A0 `ik eet / wij eten`, `ik spreek`; A1 `ik neem`, `ik zoek`, `ik leer / wij leren` | `a1-present-time`, repurposed. It builds directly on the new A0 short/long vowel lessons. |
| Pronoun paradigm | `jullie`/`hun`/`onze` absent. Unstressed `je` is used 18 times in A1 exercises, including possessive «wanneer haal je je kind op?» | `a1-people-family-articles`, repurposed |
| `deze/die` vs `dit/dat` | 10 concepts from `a1-shopping-clothes` on | the moved adjective-endings lesson |
| `sinds` + present | «ik heb sinds gisteren koorts»; A2 has 5 more | `a1-doctor-symptoms` pattern. The tense matches Urdu, which makes it an easy win. |
| Passive recognition | «wordt gerepareerd» ×2 | `a2-landlord-repairs`, recognition only |
| `zullen`, `laten` | 1 and 2 chunks | keep as chunks in A1; recognise in A2 |

## 4. A0 ↔ A1 overlap: spiral review or duplicate

"Near-duplicate" means that a new A1 target is an A0 target with at most an
article or one or two words added.

| A1 lesson | New / review targets | A0 source | Verdict | Action |
| --- | --- | --- | --- | --- |
| `a1-greetings-personal-info` | 1 / 10 | `a0-greetings-courtesy`, `a0-name-land-city` | **Duplicate**: a review lesson as a path node | Merge into `a1-details-forms`, or add real A1 content (`ik woon sinds 2023 in Nederland`, `aangenaam`) |
| `a1-details-forms` | 8 / 8 | `a0-spelling-personal-details`, `a0-address-phone` | Spiral (full form-field sentences) | Keep |
| `a1-people-family-articles` | 6 / 0; 5 are A0 nouns plus an article (`de vader`, `de moeder`, `het kind`, `de broer`, `de zus`) | `a0-people-nouns`, `a0-een-de-het` | **Duplicate** | Repurpose: pronouns and possessives (`jullie`, `ze`, `onze`, `hun`, `dit zijn mijn ouders`) |
| `a1-hebben-family` | 9 / 0; `zoon`, `dochter`, `geen` re-taught | `a0-family-status`, `a0-geen` | Partial duplicate | Mark `zoon`/`dochter`/`geen` as review; keep `ouders`, «heeft u kinderen?» |
| `a1-family-routine-extra`, `a1-child-care` | 3 / 1, 8 / 0 | `a0-child-school` | Spiral | Keep. After the move, `a1-child-care` becomes the owner of `moe` (see §5). |
| `a1-present-time` | 3 / 2; «vandaag werk ik» | `a0-word-order`, `a0-verb-endings` | **Duplicate** after the A0 sentence engine | Repurpose: verb-stem spelling |
| `a1-daily-routine` | 9 / 1 | `a0-daily-actions` | Spiral | Keep; upgrade the separable pattern |
| `a1-calendar-time` | 6 / 0; «ik ben op tijd», «sorry ik ben te laat» | `a0-date-appointment` | Partial duplicate | Mark the two as review; keep `op maandag`, `in het weekend` |
| `a1-weather-clothes` | 4 / 1; «het regent vandaag» | `a0-weather-clothing-safety` | Spiral | Keep |
| `a1-questions` | 8 / 4 | `a0-dit-dat-questions`, `a0-word-order` | Partial: A0 now owns question word order | Narrow to the new question words (`wanneer`, `hoeveel`, `waarom`, `welke`) and `u` questions |
| `a1-polite-chunks` | 5 / 4; 4 of the 5 extend A0 chunks («kunt u mij helpen alstublieft», «sorry ik begrijp het niet») | `a0-understanding-help` | **Duplicate** | Merge into the moved object-pronoun lesson |
| `a1-house-food-plurals` | 5 / 5; `boeken` re-taught | `a0-plurals-er-is`, `a0-place-1` | Partial duplicate | Repurpose: `liggen/staan` |
| `a1-supermarket` … `a1-money-bank` | 5–8 new each | `a0-food-drink`, `a0-shopping-payment` | Spiral, good recombination | Keep |
| `a1-public-transport`, `a1-directions-town` | 10 / 0, 8 / 0 | `a0-transport-directions` | Spiral | Keep |
| `a1-health-appointments` … `a1-pharmacy-medicine` | 7–9 new each | `a0-health-emergency`, `a0-body-health` | Spiral | Keep |
| `a1-school-contact`, `a1-work-schedule` | 10 / 2, 7 / 4 | `a0-child-school`, `a0-work-basics` | Spiral | Keep |

Strict duplicates: 8 of 264 A1 new targets. The real problem is the four
whole-lesson duplicates above, not word-level repetition.

## 5. The six lessons moving from A0 into A1

| Moving lesson (id at `03d7af6`) | Target unit | Recommended slot | Why there | A1 uses it before the slot | What A1 should build on it |
| --- | --- | --- | --- | --- | --- |
| `a0-adjective-endings` | `a1-food-shopping` | after `a1-cafe-food-needs`, before `a1-shopping-clothes` | clothes and returns need «een andere kleur», «een grotere maat»; transport needs «de volgende halte» | «u heeft het verkeerde nummer» (`a1-phone-calls`), as a chunk | `deze/die` vs `dit/dat` with de/het; `groot/klein/nieuw/ander`; «welke maat?» |
| `a0-comparatives` | `a1-food-shopping` | after `a1-shopping-clothes`, before `a1-shopping-returns` | contrast «te groot» (clothes) with «groter»; «een grotere maat» combines both rules | «kunt u zachter zijn?» (`a1-neighbour-talk`); A0 «langzamer alstublieft» stays a chunk | `graag → liever` (A2 uses «ik wil het liever ruilen»); `dan` |
| `a0-past-was-had` | `a1-work-school-messages` | first lesson of the unit | absence and lateness messages; «gisteren was ik ziek» | «de was» (laundry) in `a1-cleaning-house`: needs a confusion note | `a1-perfect-intro` next; A1 messages already need «ik heb uw bericht gelezen» |
| `a0-feelings-reflexive` | `a1-body-health` | after `a1-health-appointments`, before `a1-doctor-symptoms` | the doctor opens with «hoe voelt u zich?»; «ik voel me beter» needs comparatives, which come earlier (unit 6) | none (0 reflexive A1 concepts) | «ik meld me ziek» in `a1-work-schedule`. `ik ben moe` moves with this lesson, but `a1-child-care` (unit 2) now teaches `moe` first, so mark it as review here. |
| `a0-object-pronouns` | `a1-questions-help` | right after `a1-questions`; absorbs `a1-polite-chunks` | `a1-phone-calls` needs «ik bel u … terug», «kunt u mij terugbellen?»; «ik haal haar … op» needs the separable rule from unit 3, which comes earlier | «kunt u mij helpen alstublieft» (polite-chunks); A0 «kunt u mij helpen» stays a chunk | `het` as an object («kunt u het herhalen?»), `u` as an object, `ze` for recognition, `voor mij` / `met u` |
| `a0-future-gaan` | `a1-questions-help` | after the new `a1-modal-verbs`, before `a1-plans-invitations` | same frame as the modals (helper second, infinitive last); plans need «wat ga je doen?» and «zullen we …» | «ik ga om elf uur slapen» (`a1-daily-routine`): lexical "go to sleep", fine as a chunk | present-for-future contrast («ik kom morgen»); `zullen we` stays a chunk |

With the modal lesson and the two moved lessons, `a1-questions-help` would
have 8 lessons. Split it into two units:
- **Vragen en hulp:** `a1-questions`, object pronouns, `a1-modal-verbs`,
  `a1-phone-calls`.
- **Plannen en afspraken:** gaan + infinitive, `a1-plans-invitations`,
  `a1-appointments`.

Re-point `a1-mission-phone-internet` to one of the two, and add a mission for
the other.

## 6. Proposed A1 grammar spine

Each step is one pattern within the A1 cap (5 targets + 1 reusable pattern).
"Upgrade" means an existing lesson's pattern changes from a slot frame to a
rule. "Moved" means one of the six lessons from A0.

1. **Pronouns and possessives completed:** `jullie`, `ze`, unstressed
   `je/we`; `uw`, `ons/onze`, `hun`. In `a1-people-family-articles`
   (repurposed; unit 2).
2. **Present tense and stem spelling:** `ik spreek / wij spreken`,
   `ik zit / wij zitten`, `ik lees / wij lezen`; `gaan/doen/staan`.
   In `a1-present-time` (repurposed; unit 3).
3. **Separable verbs, general rule:** split / imperative / after a helper.
   In `a1-daily-routine` (upgrade; unit 3).
4. **Time prepositions:** `om` / `op` / `in de`, plus inversion as spiral
   review. In `a1-calendar-time` (keep; unit 3).
5. **New question words:** `wanneer`, `hoeveel`, `waarom`, `welke`; `u`
   questions. In `a1-questions` (narrowed; unit 4a).
6. **Object pronouns:** `mij`, `u`, `hem`, `haar`, `ons`, `het`. Moved from
   `a0-object-pronouns`, merged with `a1-polite-chunks` (unit 4a).
7. **Modal verbs:** `kan/kunt`, `wil/wilt`, `moet`, `mag`, infinitive last.
   New lesson `a1-modal-verbs` (unit 4a).
8. **gaan + infinitive** for plans, plus the `zullen we` chunk. Moved from
   `a0-future-gaan` (unit 4b).
9. **niet placement:** end of clause / before an infinitive / before a place.
   In `a1-appointments` (upgrade; unit 4b).
10. **liggen/staan** = "is located", and `er ligt`. In `a1-house-food-plurals`
    (repurposed; unit 5).
11. **Adjective endings, with `deze/die` vs `dit/dat`.** Moved from
    `a0-adjective-endings` (unit 6).
12. **Comparatives**, `te` + adjective vs `-er`, `graag → liever`. Moved from
    `a0-comparatives` (unit 6).
13. **Imperative**, including polite `u`. In `a1-directions-town` (upgrade;
    unit 7).
14. **Reflexive `zich voelen`.** Moved from `a0-feelings-reflexive` (unit 8).
15. **sinds + present.** In `a1-doctor-symptoms` (upgrade; unit 8).
16. **Simple past `was/had/ging`.** Moved from `a0-past-was-had` (unit 9,
    first lesson).
17. **Perfect tense intro:** `hebben` + `ge-…-d/t` and 6 irregular
    participles; `is gekomen` for recognition. New lesson `a1-perfect-intro`
    (unit 9).
18. **Connectors `en / maar / want / of`** (verb stays second). In
    `a1-short-messages` (upgrade; unit 9).

Net change: 38 → about 44 A1 lessons:
- +6 moved lessons;
- +2 new lessons (`a1-modal-verbs`, `a1-perfect-intro`);
- −2 merged lessons (`a1-polite-chunks`, `a1-greetings-personal-info`).

## 7. Proposed A2 grammar spine

Each step is one grammar or communication function within the A2 cap
(4 chunks + 1 function). Today, 14 of the 19 A2 lessons have no pattern.
Every lesson below gets one.

1. **Separable verbs in forms**, plus participles (`ingevuld`, `opgestuurd`).
   In `a2-separable-verbs-routine` (reframed as review + extension; unit 1).
2. **`welke … nodig?`**, and `laten` + infinitive for recognition («ik wil dit
   laten herstellen»). In `a2-gemeente-documents` (unit 1).
3. **Modals extended:** `hoeven … niet te`, `zullen` for promises («ik zal het
   sturen»), modal + separable («ik moet volgende week terugkomen»). In
   `a2-future-modal-verbs` (reframed; unit 2).
4. **Requests and negotiation:** `kunnen we …?`, `hier/er` + preposition
   (`hierover`). In `a2-work-conditions` (unit 2).
5. **Reasons with omdat and dat** (verb last); `want` vs `omdat`. New lesson
   in unit 3, before `a2-school-absence-notice`.
6. **Past of modals for recognition:** `moest`, `kon`, `wilde`; `had/was`
   review. In `a2-school-absence-notice` (unit 3).
7. **Perfect extended:** `zijn` vs `hebben`, irregular participles, story
   order. In `a2-perfect-tense` (unit 4).
8. **als** (condition / when) added; one story combining perfect + omdat + dat
   + als. In `a2-strong-combined` (unit 4). This fixes the dependency break.
9. **Advice and warnings:** `u moet / u mag niet`, `als …, dan …`. In
   `a2-doctor-advice` (unit 4).
10. **Clause-first inversion** («als de monteur komt, ben ik thuis»), `ik wil
    dat …`. In `a2-word-order-connectors` (consolidation; unit 5).
11. **Passive recognition** (`wordt gerepareerd`), and indirect questions with
    `of` / `wanneer` («weet u wanneer de monteur komt?»). In
    `a2-landlord-repairs` (unit 5).
12. **Preference and comparison:** `liever`, `meer/minder`, `het goedkoopst`.
    In `a2-customer-complaints` (unit 6).
13. **Perfect in documents** («al betaald», «is mislukt»), and `te` +
    infinitive in letters («vergeet niet te betalen»). In `a2-bills-banking`
    (unit 7).
14. **Formal frames**, and relative `die/dat` for recognition («het formulier
    dat u heeft gestuurd»). In `a2-writing-messages` and
    `a2-formal-digital-messages` (unit 8).

## 8. What an A2 learner should be able to say

The skills below follow CEFR A2 descriptors and the four exam skills of the
Dutch inburgering A2 level (spreken, schrijven, lezen, luisteren). Each line
names the grammar it depends on and where the spine above teaches it.

- [ ] Give and spell personal details and fill in a form: «Mijn achternaam is
      Khan, K-H-A-N.» (A0, then A1 forms)
- [ ] Describe family and daily routine: «Wij hebben twee kinderen. Ik sta om
      zeven uur op.» (A1 steps 1–3)
- [ ] Ask politely for help, repetition, or permission: «Kunt u dat
      herhalen? Mag ik hier wachten?» (A1 steps 6–7)
- [ ] Make, move, or cancel an appointment by phone: «Ik kan maandag niet
      komen. Kan het dinsdag?» (A1 steps 7 and 9)
- [ ] Talk about plans and obligations: «Morgen ga ik werken. Ik moet om
      negen uur beginnen. Ik hoef zaterdag niet te werken.» (A1 step 8, A2
      step 3)
- [ ] Shop, compare, return, and complain: «Heeft u deze jas in een grotere
      maat? Ik wil hem liever ruilen.» (A1 steps 11–12, A2 step 12)
- [ ] Explain symptoms and how long they have lasted: «Ik voel me niet goed.
      Ik heb sinds gisteren koorts.» (A1 steps 14–15)
- [ ] Say what happened: «Gisteren ben ik gevallen. Ik heb de dokter
      gebeld.» (A1 steps 16–17, A2 step 7)
- [ ] Give a reason, in both word orders: «Ik kom later, want de bus heeft
      vertraging.» / «Ik bel omdat de verwarming kapot is.» (A1 step 18, A2
      step 5)
- [ ] Report someone's message or opinion: «De dokter zegt dat ik rust moet
      nemen.» (A2 steps 5 and 8)
- [ ] State a condition: «Als de pijn niet weg is, kom ik terug.» (A2 steps
      8 and 10)
- [ ] Report a home problem and follow it up: «De verwarming werkt al drie
      dagen niet. Wanneer wordt het gerepareerd?» (A2 steps 10–11)
- [ ] Understand instructions and letters: «Vul het formulier in en stuur het
      op.» «U ontvangt binnen twee weken een brief.» (A1 step 13, A2 steps 1
      and 13)
- [ ] Write a short formal message with a reason and a request: «Geachte
      meneer of mevrouw, ik schrijf omdat … Kunt u … ? Met vriendelijke
      groet.» (A2 steps 5 and 14)
- [ ] Handle a bill or bank problem: «Ik heb deze rekening al betaald. Kan ik
      in termijnen betalen?» (A2 step 13)

## 9. Staged implementation plan for the next round

Under §7 of the constitution, A1 can only reopen once A0 is frozen.

| Stage | Scope | Done when |
| --- | --- | --- |
| 0. Preconditions | A0 round lands, including the six moved lessons with their final ids. Rerun `scripts/report-a0-progression.js` and the audit. | A0 at zero errors and frozen; final ids of the moved lessons recorded in this document |
| 1. Make the audit repeatable | Add a report script, modelled on `report-a0-progression.js`, that lists every concept using a grammar feature (§2 table) before the lesson that owns it. Add it to the A1/A2 inventory step. | Script reproduces the §2 numbers |
| 2. A1 placement | Insert the six moved lessons at the §5 slots; split `a1-questions-help` into two units; update unit missions and prerequisites | A1 order matches §6; missions only assess earlier skills |
| 3. A1 repurposing (no new ids) | Repurpose `a1-people-family-articles`, `a1-present-time` and `a1-house-food-plurals`; merge `a1-polite-chunks` and `a1-greetings-personal-info`; upgrade the patterns in `a1-daily-routine`, `a1-appointments`, `a1-directions-town`, `a1-doctor-symptoms` and `a1-short-messages`; add the `de was` / `was` confusion notes | Every §6 step has exactly one owning pattern |
| 4. A1 new lessons | `a1-modal-verbs`, `a1-perfect-intro`, authored under the full lesson contract | Report from stage 1 shows modal and perfect use only after their owners (earlier uses marked as chunks) |
| 5. A1 verify and freeze | Audit, browser journey, `npm run audio:build`, Android sync | A1 gates green; A1 inventory doc updated |
| 6. A2 reorder and patterns | New omdat/dat lesson in unit 3; reframe `a2-separable-verbs-routine`, `a2-future-modal-verbs` and `a2-perfect-tense` as extensions; add a pattern to the 14 A2 lessons without one, following §7 | No A2 concept uses `omdat`/`dat`/`als` before its owner; every A2 lesson has a pattern |
| 7. A2 verify and freeze | Same gates as stage 5; tick the §8 checklist against the A2 completion mission | A2 frozen; checklist evidence linked |

Risks to watch:
- Merging or repurposing lessons changes their concept ownership. Saved
  progress maps by concept and skill id, so keep the ids, or add explicit
  migration mappings (§6 of the constitution).
- The modal and perfect lessons must not make earlier chunk uses count as
  "assessed before taught". Earlier uses stay chunks, recognised with support,
  and the new lessons own the production.
