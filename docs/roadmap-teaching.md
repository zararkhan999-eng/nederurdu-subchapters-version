# NederUrdu teaching roadmap (after Play 1.0)

Written 9 October 2026 from a full review of `course-data.js`, every lesson
image, and the app on an Android 16 emulator. Each stage ships as its own
version through the Play closed-testing track, and must pass
`npm run audit:course`, the Playwright suite, and an emulator check.

## Where we are (measured)

| | Now | Target |
|---|---|---|
| Scored questions answered by picking 1 of 3 | 93% | ≤ 60% |
| Learner builds or types Dutch | 7% (18 typed items in the whole course) | ≥ 30% |
| Wrong Dutch options that are near-misses (one form or word off) | 14% | ≥ 50% |
| Wrong options taken from outside the lesson's own 3 phrases | almost none | most |
| Average listening item | 3.2 words, one voice | 25% are 8+ words or two speakers |
| "Hear Dutch, answer in Dutch" items | a few per unit | 2+ per lesson |
| Lesson images that are placeholder icons | 112 of 341 | 0 |

---

## Stage 0 — Pictures (now, version 1.0.1)

**Problem.** Images 1–190 are consistent, good illustrations. 112 others are
a placeholder template: the same white card with a few flat shapes. Many are
unrecognisable or wrong, for example:

- `letter` (alphabet letter) shows a mail envelope
- `open` shows a house
- `raam` (window) shows a house
- `drinken` shows two rectangles
- `soep` and `vlees` are blobs
- `kaart`, `dichtbij`, `ver weg`, and `bestemming` are the same chart icon
- `recept`, `tablet`, and `etiket` are the same document icon
- `woning`, `huur`, `beschikbaar`, `bezichtiging`, `gesloten`, `dicht`, and
  `buurthuis` are the same house icon

Eight illustrated images teach the wrong meaning:

| Word | Image now | Should show |
|---|---|---|
| `lamp` | old oil lantern | ceiling or table lamp |
| `afspraak` | couple at a café (reads as a date) | appointment: calendar with a time, a reception desk |
| `op` | an empty closed box | a book **on** a table |
| `waar` | girl raising her hand in class | person looking around, question mark, map pin |
| `maat` | measuring jug | clothing size label "M" held against a shirt |
| `morgen` | sunrise (reads as "morning") | tomorrow: calendar page turning to the next day |
| `bericht` | paper envelope | chat message on a phone |
| `jongen` and `meisje` | double as `zoon`/`dochter` with captions "son"/"daughter" | caption boy/girl; separate parent-and-child images for son and daughter |

**Teacher rule.** A wrong picture is worse than no picture. Abstract words
(`later`, `welke`, `mag ik`, `geen probleem`, `antwoord`, `veranderen`,
`beginnen`, `tijd`, `dag`, …) get **no** image instead of a meaningless icon.

**Plan.**
1. Sort the 112 placeholders into *concrete → new illustration* (about 70)
   and *abstract → remove the image* (about 40). The list lives in
   `docs/visuals/brief.json`.
2. Write a style guide and one prompt per image that matches the existing
   illustrations: soft flat-shaded illustration, warm off-white background,
   single clear subject, diverse Dutch and South-Asian people, Dutch
   settings (bike lanes, brick houses, PostNL-style parcels), **no text in the
   image** (AI-generated text is often misspelled).
3. Generate, review each image against its Dutch word and Urdu meaning,
   convert to 512 px WebP (about 60 KB), and register in
   `word-visual-data.js`.
4. Fix the alt captions (`meisje` → لڑکی, `jongen` → لڑکا; translate the
   Dutch-only captions such as "paspoort").
5. Rebuild the contact sheets in `visual-review/` and add an audit check:
   every image must be in the reviewed list.

---

## Stage 1 — Smarter questions (version 1.1, during the 14-day closed test)

### 1.1 Wrong options that make learners think
- Build a **distractor engine** in `course-data.js`:
  - draw from the whole course, not only the lesson's own 3 phrases;
  - for sentences, prefer near-misses: wrong verb form (`ik bent`), wrong
    word order (`daarna ik ga`), wrong article (`het tafel`), `niet`/`geen`
    swap, wrong preposition (`op/in/aan`);
  - for meanings, prefer the same topic (time vs time, place vs place);
  - from A1 on, use 4 options.
- Never let two questions in a row share the same option set.
- Audit check: no lesson where 3 or more questions reuse an identical option set.

### 1.2 Situations must not give the answer away
- Audit check: a situation prompt must not contain a Dutch word that appears
  in only the correct option (today, for example, "penicilline" is in both
  the prompt and the answer).
- Rewrite the flagged prompts in Urdu without the key word.

**Done (9 October 2026).** `applyDistractorEngineV4()` at the end of
`course-data.js` rewrites the wrong options of every choice exercise once
the course is built. Rules as built:
- Wrong options use only Dutch taught before that point: earlier lessons,
  or earlier runs of the same lesson.
- Near-misses: verb form (`ik bent`, `u hebben`), word order
  (`daarna ik ga`, `dat ik moet rust nemen`), article (`de formulier`; `het`
  as "it" is left alone), `niet`/`geen`, and `om`/`op`/`in` with times, days,
  and months. Each has its own Urdu explanation.
- Understand and all of A0 keep 3 options; A1/A2 practice uses 4.
- Letters only compete with letters, sound items use sound-alike words, and
  pictures take wrong words from a different picture group.
- When the answer is a greeting, other greetings from outside the run are not
  used as wrong options in situations, because they could also fit.

New audit checks: `consecutive-option-set`, `repeated-option-set`, and
`prompt-gives-answer`. One case of the repeat check is allowed: a run whose
whole option pool is the set plus one word (the first greetings run teaches
only 4 words, so its 9 questions can't avoid repeating a set). Back-to-back
grammar gap drills with the same closed set (`de / het / een`) are also
allowed. The audit now accepts any Dutch taught in an earlier lesson in
wrong options.

The giveaways were mostly names and places written in Latin letters inside
Urdu. They are now written in Urdu script (پاکستان، خان، سارہ، یوٹریکٹ،
نیدرلینڈز، ڈچ، 1234 اے بی). The letter-mission prompt now names the row by
its label, and a mission title says فیملی ڈاکٹر instead of `huisarts`.

| Measured on the same script | Before | After |
|---|---|---|
| Next question shows the same option set | 1,446 | 2 (grammar gap drills) |
| Lessons reusing one set 3+ times | 107 | 1 (first greetings run) |
| Prompt contains a Dutch word only the answer has | 45 | 0 |
| Wrong Dutch options that are near-misses* | 42% | 70% |
| …of which grammar-form near-misses | 4% | 16% |
| Wrong options from outside the run | 0% | 46% |
| Choice items with 4 options | 0% | 42% |

\*Shares a content word with the answer, is one word or form off, or looks
alike as a single word. This is a broader measure than the 14% in the table
at the top.

Cost: about 0.26 s added to building the course in Node (about 0.5 s in a
desktop browser). Check app start-up time on a low-end Android phone before
shipping 1.1.

**Start-up speed (13 October 2026).** Measured in Node on the development
Mac, building the course took 1.3 s before 1.1, 1.8 s after the distractor
engine, and about 2.0 s with the 1.3 lessons. Slow loads made three
launch-screen tests flaky. Fixes, all with byte-identical course output
(checked by hashing the built course):
- cache `optionKey`, `normalizedTextV4`, `dutchWordsV4`, and
  `distractorSeedV4` (called up to 1.4 million times on about 8,000 strings);
- `uniqueV4` skips building a Set for short lists;
- the distractor engine scores and sorts earlier concepts once per lesson
  instead of once per run.

Result: about 1.36 s, back to the pre-1.1 time with 7 more lessons. The
lite launch test now measures the launch screen on `DOMContentLoaded`, so a
slow load can't make it miss the screen. Still to do: time start-up on a
low-end Android phone.

### 1.3 Survival content (new A0/A1 lessons)
1. **Language and help:** `ik spreek Urdu / Engels / een beetje Nederlands`,
   `ik heb een tolk nodig`, `spreekt u Engels?`
2. **Family status:** `mijn man`, `mijn vrouw`, `ik ben getrouwd`,
   `opa/oma`, `zoon/dochter` with their own images
3. **Colours:** rood, blauw, groen, geel, zwart, wit (used in clothes and shopping)
4. **Months and dates:** januari–december, `de eerste`, `de tweede`…,
   `op 3 maart`
5. **Body:** hand, arm, been, rug, voet, tand, keel (+ `tandarts`)
6. **Telling time:** `kwart over`, `kwart voor`, `half acht = 7:30`,
   `hoe laat?` dictation
7. **Emergencies:** `politie`, `brandweer`, `bel 112`,
   `er is een ongeluk`

Each new lesson follows the existing format: teaching cards, a grammar card,
guided practice, use, check, a mission, images per Stage 0 rules, and an
audit pass.

**Done (12 October 2026).** Seven new A0 lessons, all at A0 because the A0
lesson format builds the teaching runs from a short spec:

| Lesson | Unit | Placed after |
|---|---|---|
| `a0-language-help` (Talen en tolk) | Start speaking | `a0-ja-nee-goed-niet` |
| `a0-family-status` (Mijn gezin) | First sentences | `a0-name-land-city` |
| `a0-telling-time` (Hoe laat is het?) | Numbers and time | `a0-time-days` |
| `a0-months-dates` (Maanden en data) | Numbers and time | `a0-date-appointment` |
| `a0-colours-clothes` (Kleuren) | Daily life and shopping | `a0-food-drink` |
| `a0-body-health` (Het lichaam) | Travel and health | `a0-health-emergency` |
| `a0-emergency-police` (Noodgevallen) | Travel and health | `a0-body-health` |

- Every item has hand-written teaching in `a0SurvivalTeachingV4`
  (usage, common confusion, an example using only words already met, and an
  Urdu pronunciation) and its own situation in `exactScenes`.
- Teacher points built in: `half acht` = 7:30, tested against "ساڑھے آٹھ"
  (8:30); `mijn man` / `mijn vrouw` vs `man` / `vrouw`; `opa` / `oma` cover
  both grandparents; `arm` also means "poor"; `juni` / `juli`; colours taught
  predicatively first (`de jas is blauw`), so adjective endings stay in Stage 3.
- Each unit mission now tests one item from its new lesson. Missions are
  capped at 6 targets, so some older items moved to "related"
  (`familie`, `om acht uur`, `ik heb een afspraak`) and three duplicates were
  dropped (`tot ziens`, `ga rechtdoor`, `waar is de apotheek`).
- No pictures yet: these items wait for the Stage 0 image session.
- Notes: `ik spreek een beetje Nederlands` was already taught in
  `a0-understanding-help`, and `bel 112` and `ambulance` stay in
  `a0-health-emergency`. Ordinals stop at `de tweede`; `de derde` and above
  can come with the A1 calendar lesson.

---

## Stage 2 — Producing Dutch (version 1.2)

### 2.1 "Hear Dutch, answer in Dutch" in every lesson
The `listenReplies` format already does this well; generate at least 2 per
run from each lesson's phrases.

### 2.2 Typing in every lesson
- One "type the missing word" item per run (`ik ___ om zeven uur op` → `sta`).
- Accept common variants (capitals, final punctuation, `u`/`jij` where both
  fit); give targeted feedback on near-misses (`stat` → "check the ending").

**Done (13 October 2026).**

*2.2 Typing.* Every run except letters and sounds (244 of 256) has one
typed item in guided practice. A phrase loses one word (the verb after a
subject pronoun, otherwise its longest content word) and the learner types it
into the gap (`ik ___ het niet` → `begrijp`). A run with only single words
asks for one word typed whole. The word-bank fallback spells the word from
letter tiles. Capitals, commas, curly apostrophes, and final punctuation never
make an answer wrong, and accents are optional (`een` for `één`). A near miss
gets targeted feedback: "check the ending" when only the end differs,
otherwise "check the spelling".

*2.1 Hear and reply.* The hand-written `listenReplies` never reached the
v4 lesson runs; they do now. A new table, `listenReplyCuesV4`, adds 153
cues: a heard Dutch question, its Urdu meaning, the reply (one of the run's
phrases), and two wrong replies. 159 reply items in total, each placed in
the first run that owns its answer once every Dutch word in it is taught.
Their options are hand-picked, so the distractor engine skips them.

| Hear-and-reply items per run | Before | After |
|---|---|---|
| A0 (124 runs without letters/sounds) | 0 | 0.26 |
| A1 (81 runs) | 0 | 0.93 |
| A2 (41 runs) | 0 | 1.20 |

Teacher rules for cues:
- One clearly right reply. Wrong replies answer another kind of question
  (a time instead of a place), or are a near miss with a different meaning
  (`ik ben op tijd` for "do you have time?").
- No plain yes/no questions where both `ja` and `nee` fit, and no echo
  greetings (`goedenavond!` → `goedenavond`); the audit flags echoes.
- Nothing untaught: the heard line may use Dutch from earlier lessons and
  earlier runs of the same lesson, like the distractor engine. The 50
  generated fillers ("wat is een goed antwoord?") stay retired.

Why not 2 per run in A0: most A0 runs teach single words or grammar forms
(`ik, jij, u`; numbers; days; `een/de/het`), where no natural question has
one right reply. Those runs get the typed item instead.

Fixes found on the way: the A0 start-lesson scenes and the A1 authored
scenarios rewrote every use-phase prompt, including replies; both now skip
`listen-reply`.

### 2.3 Guided role-play (new exercise type)
The app speaks line 1 (with audio); the learner chooses or builds line 2,
hears the model answer, says it aloud, and continues for 3–4 turns. This
needs no speech recognition. It is used in missions first.

**Done (14 October 2026).** A new exercise type, `role-play`. Every
mission except the letters mission (27 of 28) opens with a short hand-written
conversation (`missionRolePlaysV4` in `course-data.js`): an Urdu scene,
then 2–4 learner turns. The other person's lines play aloud. On each learner
turn the learner picks one of three Dutch replies; a wrong pick shows an Urdu
reason ("“twee keer per dag” = دن میں دو بار، یہ اس گفتگو میں فٹ نہیں
ہوتا") and they retry. A right pick adds the line to the conversation with a
replay button and "اب بلند آواز میں کہیں", and the other person's next line
plays. Where the conversation alone doesn't make the reply clear, a short
Urdu cue says what to say ("کرایہ پوچھیں").

How it fits the mission contract: the role-play is an unscored warm-up in
the mission's Preview (تیاری) step, before Use. The audit's mission rules
now allow exactly one such item and nothing else, so the 6 Use + 6 Check
assessment is unchanged. Every Dutch word in it must be taught before the
mission, and each learner turn needs 3 distinct options, an Urdu meaning,
and an Urdu reason per wrong option (`role-play-structure`).

### 2.4 Real listening
- Two-speaker dialogues (alternate pitch and rate on the device's Dutch voice).
- 8–15-word items at normal speed, with "slow" as the second play.
- **Number and time dictation:** hear a phone number, price, or time, and
  type or choose it.

### 2.5 Sentence building
- Add 1–2 extra wrong tiles (a wrong verb form, an extra word).
- Show the punctuation tile so questions end in `?`.

---

## Stage 3 — Grammar, society, access (version 1.3)

### 3.1 Six grammar patterns, using the existing drill format
1. Regular verb endings, including the inversion rule (`werk jij?`)
2. Plurals (`-en` / `-s`)
3. Adjective endings with de/het (`de blauwe jas`, `een blauw boek`)
4. Object pronouns (`hem, haar, ze, ons`)
5. `er is` / `er zijn`
6. Simple past of `zijn`, `hebben`, `gaan` (`was, had, ging`)

### 3.2 "How it works here" cards (knowledge of Dutch society)
One short Urdu card per unit, for example:
- the huisarts comes first and the hospital only by referral; call 112 only
  in emergencies;
- appointments for everything, and be on time;
- `u` for officials and `jij` for friends and colleagues;
- direct communication is normal, not rude;
- the gemeente, BSN, and DigiD.

This also prepares learners for the KNM part of the inburgering exam.

**Done (20 October 2026).**

*3.1 Grammar.* A coverage check of every Dutch phrase in the course found
no verb-ending drill, no adjective endings, no object pronouns, no
comparatives, no reflexive verbs, no future with `gaan`, and only a few
past forms. Eight new A0 lessons, built with `makeA0DailyLesson`, each
placed where its words are already taught:

| Lesson | Teaches | Placed after |
|---|---|---|
| `a0-plurals-er-is` | `stoelen`, `tafels`, `huizen`, `de boeken`; `er is` / `er zijn` | `a0-home-needs` |
| `a0-verb-endings` | `ik werk`, `hij werkt`, `wij werken`; `werk jij?` drops the t | `a0-food-drink` |
| `a0-adjective-endings` | `de blauwe jas`, `een wit huis`, `het witte huis` | `a0-colours-clothes` |
| `a0-comparatives` | `duurder`, `goedkoper`, `beter`; `… dan …` | `a0-shopping-payment` |
| `a0-feelings-reflexive` | `ik voel me`, `hoe voelt u zich?`, `ik ben moe` | `a0-body-health` |
| `a0-past-was-had` | `was / waren`, `had`, `ging`; `gisteren was ik ziek` | `a0-emergency-police` |
| `a0-object-pronouns` | `mij`, `hem`, `haar`, `ons` after the verb | `a0-child-school` |
| `a0-future-gaan` | `ik ga morgen werken`, `morgen ga ik werken` | `a0-work-basics` |

- Every item has a hand-written teacher card (`a0SurvivalTeachingV4`)
  and its own scene (`exactScenes`).
- Each lesson also lists the known form it contrasts with (`ik ben ziek`
  next to `ik was ziek`, `stoel` next to `stoelen`) as a review item. That
  is what lets a teacher card quote it, and the review run drills the pair.
- The distractor engine now offers the matching mistake forms
  (`hij drink koffie`, `een witte huis`, `morgen ik ga werken`).
- Unit missions test every new lesson. Neighbourhood: `hij drinkt koffie`,
  `ik wil de groene jas`, and price + `dit is goedkoper` as one ordered
  pair (the second pin-payment target was dropped; the final mission still
  has it). Help: `gisteren was ik ziek` replaces the second ticket target,
  and `ik voel me niet goed` is paired with `mijn rug doet pijn`. Home:
  `er zijn drie kamers`. The A0 final mission adds `bel mij morgen` and
  `morgen ga ik werken` to two of its ordered sequences.
- The auto-made examples for two `a0-work-basics` items changed once new
  lessons came before them and quoted untaught words, so both now have
  hand-written cards.
- Building the course takes about 1.57 s in Node (was 1.41 s).

*3.2 Society cards.* `societyCardsV4` in `course-data.js` gives each of
the 26 units a title and three short Urdu facts (huisarts and 112, `u` and
`jij`, punctuality, waste sorting, statiegeld, check-in/out, leerplicht,
zorgverzekering, DigiD, the 14-day return right, PIN safety, and more).
The lesson preview shows the card as "یہاں ایسے ہوتا ہے". It opens on the
unit's first lesson and its missions, and stays folded on the other lessons.

### 3.3 Reading real texts
A gemeente letter, a school app message, a pharmacy label, and a
landlord's email, each with 3–4 comprehension questions.

**Done (20 October 2026).** Four short texts in `readingTextsV4`
(`course-data.js`), each placed in the lesson that already teaches its
phrases, at the end of that run's Use phase (so learners read the text
just before the Check):

| Text | Lesson (run) | Questions |
|---|---|---|
| Pharmacy label (`pharmacy-label`) | `a1-pharmacy-medicine` (2) | what the medicine is for, how often, before or after food, read the leaflet |
| Gemeente letter (`gemeente-letter`) | `a2-gemeente-official` (2) | appointment day and time, which counter, what to bring, the form deadline (before 10 March) |
| School app message (`school-app-message`) | `a2-school-absence-notice` (2) | start time, Friday's cancelled lesson, what to do if the child is ill, and the Dutch question to ask on that call |
| Landlord's email (`landlord-email`) | `a2-landlord-repairs` (2) | what went wrong, when the monteur comes now, who pays, and the first line of your reply when nobody came |

- All questions use the existing `document-choice` type, so the whole text
  stays on screen. Most have Urdu answers ("what does the text say?").
  Two have Dutch answers, like a `situation` item ("what do you say or
  write back?").
- Every Dutch word in the texts was taught before that lesson (`Let op`,
  `Beste`, `Met vriendelijke groet` and similar were left out because they
  are not taught yet). Each question stores the words in the text that
  answer it (`readingEvidence`). Feedback quotes those words with their
  Urdu meaning, and each wrong option gets its own explanation.
- The distractor engine leaves these options alone (`readingText`).
- Audit: a reading question owns a run phrase that the text contains or
  shares a content word with, or the Dutch reply it asks for. The text may
  use any Dutch taught before the lesson. New rules `reading-text-structure`
  (one shared document of 3+ rows, 3–4 questions that close one run's Use
  phase) and `reading-text-coverage` (all four texts present).
- Asset version is now v90.

### 3.4 Accessibility for less-literate learners
- Shorter instructions, with one icon per exercise type.
- A "hear the instruction in Urdu" button (device Urdu voice, falling back
  silently).
- Large-text mode reviewed on every screen.

---

## Order of work

| Step | Ships in | Size |
|---|---|---|
| Stage 0 pictures | 1.0.1 | 2–3 sessions (depends on image generation) |
| 1.1 distractor engine + 1.2 audit | 1.1 | 2 sessions |
| 1.3 survival lessons (7) | 1.1 | 3 sessions |
| 2.1–2.2 reply and typing items | 1.2 | 2 sessions |
| 2.3 role-play type + 2.4 listening | 1.2 | 3 sessions |
| 3.1 grammar | 1.3 | 2 sessions |
| 3.2–3.4 society, reading, access | 1.3 | 3 sessions |
