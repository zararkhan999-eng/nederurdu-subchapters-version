# NederUrdu visual rework — Open Door

Date: 6 October 2026  
Status: proposed art direction and interactive screen sketches; ready for review  
Scope: mobile app only. A coherent visual system for every phone screen, followed by a phased implementation.
Reference viewport: **390 × 844 CSS pixels**; narrow checks: **360 × 800** and **320 × 568**. Large-phone check: **430 × 932**.

## Design decision

**Open Door** makes Dutch feel like access to everyday life. A bold cobalt doorway is the recurring brand device: it frames a real situation, opens into the teaching space, and becomes a small marker of progress. Warm paper, strong typography, generous Urdu explanation, and controlled architectural forms give NederUrdu an adult, welcoming character.

The dominant style is contemporary editorial design with architectural geometry. Every destination belongs to the same visual family. Level and world identity come from names, symbols, and scene content; each level does not introduce a new palette or component style.

This is a proposed new art direction. It supersedes the earlier emerald-and-saffron palette only if selected for implementation; the previous V2 masterplan remains the source for learning behavior and migration requirements.

## Current app evidence

Inspected the current V2 prototype at 390 × 844 on 6 October 2026, alongside its render functions, README, and rebuild masterplan. The proposed deliverable now focuses entirely on mobile app dimensions.

- Today, Journey, Practice, and Toolkit already provide a useful navigation structure.
- The lesson runtime already distinguishes scene, meaning, pattern, supported rehearsal, personal use, independent check, and completion.
- On phone, the hero occupies most of the first viewport, its example sentence truncates, and the navigation approaches the main action.
- The existing CSS relies heavily on gradients, colored surfaces, shadows, and large radii. The redesign will establish hierarchy through typography, spacing, and distinct component roles.

The sketches use representative lesson content and sample progress. Their interactions demonstrate proposed UI behavior; they do not read or change learner data. Audio controls demonstrate visual states without producing pronunciation audio.

## Reference board and translation

References are principles to adapt into original NederUrdu artwork and layouts. Project dates below distinguish recent work from established references.

| Reference | What it demonstrates | NederUrdu translation |
| --- | --- | --- |
| [Amazon, Koto, 2025](https://koto.com/projects/amazon) | Shared typography, color, iconography, and brand assets across many products and scripts | One palette and component grammar across A0/A1/A2, all destinations, and Android; equivalent care for Dutch and Urdu typography |
| [Guggenheim, Pentagram, launched 2024](https://www.pentagram.com/work/guggenheim-3/story) | Architectural symbol, modular composition, coordinated Latin and Arabic typography, and motion with a common idea | A doorway motif; modular lesson sheets; carefully paired Dutch and Urdu text; motion that opens, reveals, and connects |
| [Young V&A, Pentagram, established reference](https://www.pentagram.com/work/young-v-and-a/story) | Expressive typography and handmade character within a consistent identity | Confident Dutch display words and small tactile accents, scaled for adult learners; simple controls and readable instructional text |
| [2026 agency trend interviews, Creative Bloq](https://www.creativebloq.com/design/graphic-design/texture-warmth-and-tactile-rebellion-the-big-graphic-design-trends-for-2026) | Tactile craft, expressive typography, and motion as parts of brand identity | Subtle print texture limited to art, expressive entry/completion screens, and focused learning pages |

The Guggenheim reference pairs Latin with Arabic. Urdu requires its own font, line-height, shaping, and readability decisions; that reference does not validate Urdu support.

## Visual grammar

### Palette

| Role | Light target | Use |
| --- | --- | --- |
| Paper | #F5F2EC | Main reading canvas |
| White sheet | #FFFFFF | Answers, reading sheets, menus |
| Ink | #18212B | Main text and structural emphasis |
| Cobalt | #2047ED | Primary actions, selected navigation, the doorway motif |
| Soft cobalt | #E8EDFF | Selected answers and related teaching segments |
| Butter | #F1D27A | Occasional scene detail and completion emphasis |
| Clay | #D87D5C | Occasional scene detail, not an answer-status signal |
| Green | #176B4D | Correct/complete, paired with text and icon |
| Red | #A73535 | Incorrect/error, paired with repair instructions |

Cobalt dominates brand recognition, not every square centimetre. Reading pages are mostly paper and ink; the shell, main action, active state, and motif provide continuity. Art uses the same limited palette in every world. Dark appearance adapts surfaces and contrast while retaining the motif and hierarchy.

### Typography and bilingual composition

- Dutch display: DM Sans for the sketches; evaluate an original wordmark and display refinements during production design.
- Dutch lesson/body: DM Sans with clear distinction between display words and instructional sentences.
- Urdu interface: Noto Sans Arabic; explanations: Noto Naskh Arabic with comfortable line height. Validate both with adult Urdu readers before committing.
- Urdu directions are RTL. Dutch sentences, audio labels, and grammar token sequences are explicitly LTR and isolated from surrounding RTL text.
- Dutch example and Urdu meaning occupy separate lines or aligned regions. Both stay fully visible; neither is decorative filler.
- Target phone sizes: interface/body 16–18 px, Urdu explanation 20–23 px, teaching phrase 30–36 px, and entry-page display 46–60 px. Long Dutch sentences wrap naturally.
- Text enlargement reflows the composition. Large display words never force instructional text to shrink.

### Shape, imagery, and depth

- Signature motif: a doorway with an arched top and a straight baseline. Use once per main composition.
- Scene windows may use the arch; functional controls use restrained 10–12 px rounding; full reading areas use spacing and rules.
- Artwork is a set of original architectural cut-paper scenes with people and meaningful objects, limited to the brand palette. Scenes depict adult life: neighbourhood, shop, station, clinic, work, municipality.
- Use a compact scene crop above the teaching copy on phone. Copy stays on an opaque surface.
- Texture belongs to illustrations and chapter covers. Answer surfaces and small text remain clean.
- Depth comes from overlapping paper planes in artwork and clear content grouping. Elevation is reserved for menus and support overlays.
- Produce each scene in landscape and compact crops; include plain-language scene descriptions for assistive technology.

### Motion

- Doorway reveal on entry: one 320–420 ms opening movement.
- Step transition: 180–240 ms directional movement that preserves learner orientation.
- Selection and feedback: 120–180 ms local changes; explicit status text appears with them.
- Completion: one short motif assembly, followed by a still can-do summary.
- Audio: progress only while sound is playing; clear normal/slow labels.
- Reduced-motion mode replaces movement with immediate state changes. No ambient loops on teaching pages.

## Whole-app coverage

| Screen family | Composition | Shared style rule |
| --- | --- | --- |
| Welcome and onboarding | Doorway cover, one question at a time, level choice | Same display typography, paper, cobalt action, and Urdu-first instructions |
| Today | Greeting, one next lesson, concise due-review strip | Compact art above the current lesson; next action visible in the first phone viewport |
| Journey | Level selector, worlds, ordered scene list | The doorway becomes a world cover; current/completed/locked states share one vocabulary |
| Lesson brief / scene | Situation, full Dutch model, Urdu meaning, clear audio | Lesson focus mode removes global navigation; content uses the same paper/ink system |
| Meaning / pronunciation | One phrase with word meanings and audio speeds | Large Dutch; readable Urdu; no score before teaching |
| Grammar | Sentence model, aligned tokens, Urdu rule, contrast | Cobalt marks the highlighted relationship; labels preserve meaning without color |
| Guided practice | Prompt, full answer choices, visible help | Selected answer uses light cobalt and dark ink; correction teaches the reason |
| Personal use / mission | Adult situation, supported sentence-building or speaking | Scene context is compact; the task stays dominant |
| Independent check | Familiar interaction after teaching | Same answer components; hints are clearly distinguished from independent work |
| Repair feedback | Model, explanation, supported retry, fresh example | Text explains why; status icons reinforce color |
| Completion | Can-do evidence, next scene, later-review cue | Doorway motif closes the loop; progress represents a useful action |
| Practice | Due review, repair queue, listening and pronunciation | Editorial list with one recommended action |
| Toolkit | Phrasebook, sounds, grammar, saved words | The same sheet/list system, with real-use categories |
| Settings / profile | Language, text size, audio, motion, offline/data | Same typography, controls, focus, and spacing |
| Help / saved-item overlays | Bilingual explanation and dismiss action | Opaque sheet, contained focus, contextual origin preserved |
| Empty, loading, offline, error | Plain-language state and useful next action | Same motif and typography at restrained scale; no new visual identity |

The interactive sketches cover Today, Journey with level selection, the complete sample lesson flow, Practice, Toolkit and its detail sheets, welcome, settings, help, and offline status. They establish composition and state treatment. Production-ready scene illustrations, loading/error galleries, and original motion assets are follow-on deliverables.

## Shared components

Phone app shell; four-destination bottom navigation; bilingual page heading; level selector; world cover; lesson row; can-do line; doorway scene; Dutch phrase block; Urdu explanation; normal/slow audio control; grammar token group; answer option; feedback/repair sheet; primary/secondary action; progress track; settings row; contextual support sheet; state message.

Create these once in the isolated rebuild. Screens consume shared tokens and components rather than adding separate late-stage style overrides.

## Mobile dimensions, navigation, and accessibility

- Main reference: 390 × 844 CSS pixels, with a 20 px content inset and 350 px reading width. Adapt to 360, 320, and 430 px phone widths without shrinking body text.
- Phone only: single column; four labeled bottom destinations; compact lesson header and action dock. Reserve platform safe-area clearance for all pinned elements.
- Production navigation target: 72 px plus bottom safe area. Primary actions: minimum 48 px height; controls: minimum 44 px touch target.
- The entry-page illustration occupies about 150–170 px. The lesson title, purpose, and start action must appear in the first 844 px viewport.
- Phone heights may scroll for teaching content; navigation and lesson actions remain clear of text. At 568 px height, use a smaller scene crop and preserve readable content.
- Sketch width controls show 390, 360, and 320 px. Sketch pages flow to show their complete content; fixed safe-area behavior is a production implementation task.
- Active lesson: phase navigation plus help and exit; retain exact resume and intended Back behavior.
- Minimum 44 px interactive targets, visible keyboard focus, accessible control names, semantic landmarks, and a clear selected/correct/incorrect label.
- Validate contrast, 200% text enlargement, mixed RTL/LTR selection, 320 px width, keyboard operation, reduced motion, slow audio, long phrases, and offline fonts.
- Selected, correct, incorrect, disabled, and locked states must be understandable without color.

## Rework sequence

1. **Direction and composition — this deliverable.** Review the dominant style in every mobile destination, the full lesson flow, and phone layouts at the reference widths. Resolve palette, motif, information hierarchy, and bilingual typography as one decision.
2. **Design system and lesson pilot.** Implement shared tokens, typography, shell, controls, audio, support, and answer/feedback states in the isolated rebuild. Apply them to one complete lesson including grammar, personal use, correction, and completion. Create original scene art.
3. **Whole-app application.** Apply the same system to Today, Journey, Practice, Toolkit, onboarding, settings, and all secondary/exception states. Migrate lesson renderers systematically while keeping curriculum coverage work visible.
4. **Delivery and cutover.** Validate complete learner paths, exact resume, accessibility, responsive layouts, offline behavior, progress migration, Android Back/audio, asset loading, and Android parity. Cut over after the implementation gates in the existing masterplan are satisfied.

## Acceptance bar

A learner can identify the next useful action immediately. Dutch examples and Urdu explanations are fully readable. Lesson stages teach meaning, sound, pattern, and use before independent checks. Every screen is recognizable as NederUrdu through typography, palette, geometry, and behavior. The entire product uses the same component rules, including errors and settings.

## Sketch notes

The in-conversation sketch is an original interactive composition study, not a production build. Progress and queue numbers are illustrative. Completion stores sketch navigation only; it is not evidence of learned competence. The offline page previews a proposed state, not a network connection check. Personal-use input stays in the local sketch.

## Sketch review evidence

Visual inspection includes the 390 px Today, Journey, grammar, and repair compositions. Checked 42 screen/width combinations across 390, 360, and 320 px with no horizontal overflow or script errors. The sample lesson completes through meaning, grammar, supported correction, personal use, and independent check. The sketch uses phone width controls only. Readability, hierarchy, and component consistency are the review targets; production accessibility and Android delivery remain implementation gates.
