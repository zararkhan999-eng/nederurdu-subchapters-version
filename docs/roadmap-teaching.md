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

---

## Stage 2 — Producing Dutch (version 1.2)

### 2.1 "Hear Dutch, answer in Dutch" in every lesson
The `listenReplies` format already does this well; generate at least 2 per
run from each lesson's phrases.

### 2.2 Typing in every lesson
- One "type the missing word" item per run (`ik ___ om zeven uur op` → `sta`).
- Accept common variants (capitals, final punctuation, `u`/`jij` where both
  fit); give targeted feedback on near-misses (`stat` → "check the ending").

### 2.3 Guided role-play (new exercise type)
The app speaks line 1 (with audio); the learner chooses or builds line 2,
hears the model answer, says it aloud, and continues for 3–4 turns. This
needs no speech recognition. It is used in missions first.

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

### 3.3 Reading real texts
A gemeente letter, a school app message, a pharmacy label, and a
landlord's email, each with 3–4 comprehension questions.

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
