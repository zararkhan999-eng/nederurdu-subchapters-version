# NederUrdu mobile rework — immersive Open Door

Updated: 6 October 2026  
Status: implemented in the mobile web app and Android web assets  
Scope: phone app only; 390 × 844 reference, with 360 px and 320 px narrow layouts.

## Direction

The user positively received Open Door's visual identity and asked for a more immersive experience with more motion graphics. Retain cobalt, warm paper, strong Dutch typography, readable Urdu, and the doorway motif. Develop them into a dimensional, moving environment.

The app should feel like entering a Dutch situation, understanding its language, and leaving with a useful ability. Use a shared motion vocabulary across all destinations: **open, approach, assemble, lift, repair, continue**.

## Immersive scene system

The revised sketch uses an original layered neighbourhood-centre scene: distant buildings, perspective paving, cast shadows, an extruded arch, a furnished interior, a hinged door, foreground people, a plant, a light beam, and a greeting.

The scene has depth before motion begins. Entry moves the camera toward its settled position, opens the door in perspective, reveals the interior light, introduces the two people, and brings in their greeting. A slow camera settle ends after one sequence. The Replay motion control lets the design be inspected again.

Production art should extend this same scene language to the shop, station, workplace, clinic, home, and municipality. Use real situation details and adult characters; share materials, lighting, camera behavior, and geometry across worlds.

## Mobile choreography

| Moment | Actual revised sketch | Timing / purpose |
| --- | --- | --- |
| Today / welcome / world cover | Dimensional doorway scene with camera approach, opening door, light reveal, people and greeting | Main scene opening about 1.7 s; finite camera settle follows |
| Enter a lesson | Cobalt portal crosses the app and opens onto the lesson | 900 ms; connect the doorway brand device to navigation |
| Move to teaching | Reading sheet moves forward into place | 650 ms; focus attention on the current learning task |
| Learn meanings | Word groups reveal in sequence | 560 ms with short stagger; show the teaching order |
| Notice grammar | Sentence pieces assemble; highlighted verb rises and settles | 560 ms assembly, followed by one emphasis movement |
| Select an answer | Answer lifts from the sheet | 300 ms; make selection feel tangible |
| Correct answer | Explanation rises into view | 550 ms; confirm and explain |
| Incorrect answer | A small lateral correction movement | 550 ms; pair movement with a specific repair explanation |
| Simulated audio state | Finite moving waveform | Visual playback state only; no pronunciation audio in this sketch |
| Complete a lesson | Doorway mark turns forward and settles | 1.1 s; express a newly accessible real-life action |
| Practice / Toolkit / Journey | Lists arrive in a short sequence and current navigation icon settles | Shared timing and easing across the app |

## Depth rules

- Scene depth: background, architectural planes, interior, people, and foreground details.
- Content depth: raised paper sheet with a restrained base edge and cast shadow.
- Interaction depth: primary actions and selected answers lift; pressed actions move down.
- Navigation depth: the bottom bar sits above content; the active destination has the same cobalt material.
- Text sits on opaque reading surfaces. Decorative scene elements do not cover instructions or accept taps.

## Reading and motion

Scene movement ends while the learner reads. Teaching motion runs on entering a screen or step, rather than restarting on every answer, help, or input change. There are no endless ambient loops in the revised sketch. Reduced-motion preference cancels the moving sequences and presents the settled scene immediately. The sketch also exposes a motion toggle in its design controls.

## Mobile layout

The Today greeting is compact to give the immersive scene more room. Its scene is 230 px high on the main phone reference; lesson-context scenes are compact. Primary action and bottom destinations remain visible in the main reference composition. Longer teaching pages flow vertically with readable Urdu and Dutch text.

Production must implement pinned lesson actions and platform safe areas, exact resume, natural Android Back behavior, locally available fonts/assets, and audio. The sketch demonstrates composition and movement; it does not read learner progress or reproduce those native behaviors.

## Production work after the motion study

1. Create the complete scene-art kit with shared lighting, materials, camera positions, and phone crops.
2. Build reusable motion primitives for portal entry, sheet transitions, grammar assembly, answer lift, explanatory correction, audio state, and completion.
3. Apply the system to one complete lesson, including meaning, pronunciation, grammar, supported use, personal use, independent check, repair, and later review.
4. Extend the same system to every destination and all settings, help, empty, offline, loading, and error states.
5. Validate on phone hardware: readable moving/still states, frame pacing, memory use, motion cancellation, safe-area behavior, accessibility, and Android/offline parity.

Use transforms and opacity for frequent interaction motion; reserve the portal mask for entry. Avoid rebuilding heavy scene assets on answer selection. Pause offscreen scene work. Low-motion and static scenes must retain the same depth, hierarchy, and next action.

## Reference continuity

The base direction adapts the consistency of [Koto's Amazon system](https://koto.com/projects/amazon) and the architectural symbol, modular composition, and coordinated motion of [Pentagram's Guggenheim identity](https://www.pentagram.com/work/guggenheim-3/story). The revised scene and animation are original NederUrdu sketch work.

## Verification

The revised sketch was inspected on phone-width layouts. No script errors or horizontal overflow were observed at 390, 360, and 320 px in the focused checks. Focused checks confirmed the entry portal and live grammar/replay animations. Reduced-motion inspection found zero active animations. Echoed sketch-state updates no longer restart the page and cancel its movement. Production performance and the full native app remain to be verified during implementation.

## Implementation — 6 October 2026

- `open-door.css` is the active visual system. `open-door-layout.css` preserves existing exercise geometry in a lower CSS layer; legacy importance is removed so the new identity controls the entire interface. The older six stylesheets remain as historical source files and are no longer linked by the app.
- `open-door.js` supplies original community, shop, station, clinic, workplace, home and municipality doorway scenes, portal entry, sheet arrival, grammar assembly, selection lift, feedback repair, audio emphasis and completion movement. Scene motion finishes; lists animate only visible items with a bounded item count.
- Today shows the next real learning part, Journey contains every chapter and authored lesson, Practice uses existing review eligibility, and Toolkit shows only concepts and patterns with recorded introduction evidence. Settings remain available from the header.
- Authored curriculum, answer handling, correction flow, speech hooks, progress schema and review scheduling remain in `app.js`. Native Back returns from the new destinations. Lesson and preview actions use phone safe areas. Lessons have one internal reading scroller, with space below the last answer for the pinned action bar. Lesson help preserves scroll and focus.
- DM Sans, Noto Sans Arabic and Noto Naskh Arabic are included locally with their SIL Open Font License files. The service-worker shell includes the new identity, layout, scripts and fonts; the cache advances to v79.
- Android web assets are synchronized with the canonical packaging script. Changed delivery files and font assets are byte-identical to the web source.

### Rendered review

Headless installed Chrome was used to inspect the actual mobile pages. Today, Journey, Practice, Toolkit, Settings and Letters had no observed horizontal overflow at 320, 360 and 390 px. Teaching, grammar, listening, sentence-building, short input, document reading, feedback and completion were inspected at 390 px. Large text was inspected at 320 px. After a taught concept, Toolkit displayed that concept. The app motion switch persisted through reload; both that switch and the operating-system reduced-motion setting produced zero running animations in the focused browser inspection.

No automated test suite was added or run. No native Android build or physical-device performance review was performed. The browser inspection does not establish full course interaction coverage, audio quality on hardware, or native frame pacing.

## Graphic expansion and page transitions — 9 October 2026

Added original vector compositions for Practice (layered flashcards and sound), Toolkit (open book and language bubble), Settings (dimensional sliders), and Letters (typography cards and sound). Today has a bilingual graphic strip; Journey has an editorial doorway signature. Shared coloured accents extend to lesson previews, teaching sheets, review cards and word cards. Artwork is decorative and does not substitute for authored learning content.

Page navigation now captures an inert outgoing page, slides and fades it away, and brings the incoming page forward over 560 ms. A 620 ms cobalt/butter/clay ribbon connects the two views. Forward and back navigation use opposite directions. Persistent navigation remains interactive; completed transition layers are removed. Lesson entry retains the 900 ms doorway portal, and exiting a lesson uses the page transition while preserving the outgoing reading position. No snapshot is created for answer selections, help toggles or settings updates. Both reduced-motion controls bypass navigation animation.

The offline shell and linked assets advance to v80. Android uses the same files through the canonical sync script.

Focused rendered review: graphics were inspected in the phone browser, with no observed horizontal overflow at 390 px and on the 320 px Toolkit view. Page-change snapshots and ribbons were present during navigation and removed after settling. Lesson exit and rapid navigation were inspected; no transition layers remained after completion. Rebinding motion did not duplicate graphic compositions. The app setting and OS reduced-motion preference produced zero running animations in the focused review. No automated test suite or physical-device performance review was run for this extension.
