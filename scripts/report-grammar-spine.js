#!/usr/bin/env node
// Reports concepts that use a grammar feature before the lesson that owns it
// (docs/a1-a2-grammar-spine-followup.md §2 and §6–7). A concept marked as a
// whole practical chunk (atomicChunk, teachAsChunk, or a "whole phrase" /
// "practical chunk" teaching mode) is counted separately: it may appear early
// as a memorised phrase. Usage:
//   node scripts/report-grammar-spine.js [--feature=modal] [--all] [--strict] [--json]
// --all lists every early concept, not just the first 12 per feature;
// --strict exits 1 when an unmarked concept uses a feature before its owner.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const args = process.argv.slice(2);
const onlyFeature = (args.find((arg) => arg.startsWith("--feature=")) || "").split("=")[1];
const showAll = args.includes("--all");
const strict = args.includes("--strict");
const asJson = args.includes("--json");

const context = { window: {}, console };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "course-data.js"), "utf8"), context);
const course = context.window.NEDERURDU_COURSE;

const lessonById = new Map([...course.lessons, ...(course.missions || [])].map((lesson) => [lesson.id, lesson]));
const unitById = new Map(course.units.map((unit) => [unit.id, unit]));
const order = course.chapters
  .flatMap((chapter) => chapter.unitIds)
  .flatMap((unitId) => [...unitById.get(unitId).lessonIds, ...(unitById.get(unitId).missionIds || [])])
  .filter((id, index, ids) => lessonById.has(id) && ids.indexOf(id) === index);
const position = new Map(order.map((id, index) => [id, index]));

const separableVerb = /\b(?:op|mee|terug|af|in|uit|aan|over|weg|thuis|toe)(?:halen|staan|nemen|bellen|vullen|spreken|stappen|komen|blijven|vragen|brengen|krijgen|leggen|sturen|melden|vallen|geven|zoeken|maken|ruimen|lossen|zetten|bellen|gaan|doen)\b/;
const participles = /\b(?:gekregen|gelezen|gekomen|gegaan|gebeld|gedaan|gezien|gegeten|geslapen|genomen|gebleven|begonnen|veranderd|betaald|ingevuld|opgestuurd|ontvangen|bezorgd|gerepareerd|gekocht|gestuurd|gevallen|gezegd|geholpen|opgelost|gewerkt|gewacht|gemaakt|gebracht|gehaald|gesproken|gevonden|geweest|gehad|vergeten|mislukt|verloren|gegeven|gestopt|geopend)\b/;
const adjectivalParticiples = /\b(?:getrouwd|gesloten|gewond|geopend|gesloten)\b$/;

// Each feature: how to spot it in a concept's Dutch, and the lesson that owns it.
const features = [
  { id: "modal", label: "modal verbs kunnen/willen/moeten/mogen", owner: "a1-modal-verbs",
    test: (text) => /\b(?:kan|kunt|kunnen|wil|wilt|willen|moet|moeten|mag|mogen)\b/.test(text) },
  { id: "modal-past", label: "past of modals (moest, kon, wilde)", owner: "a2-school-absence-notice",
    test: (text) => /\b(?:moest|moesten|kon|konden|wilde|wilden|mocht|mochten)\b/.test(text) },
  { id: "separable", label: "separable verbs", owner: "a1-daily-routine",
    // A particle at the end of a sentence, not a lone preposition ("op" = on).
    test: (text) => separableVerb.test(text) || /\s(?:op|mee|terug|af|uit|aan)$/.test(text) || /\bvul\b.*\bin$/.test(text) },
  { id: "perfect", label: "perfect tense (heb/ben + participle)", owner: "a1-perfect-intro",
    test: (text) => /\b(?:heb|hebt|heeft|hebben|ben|bent|is|zijn)\b/.test(text) && participles.test(text) && !adjectivalParticiples.test(text) },
  { id: "simple-past", label: "simple past was/had/ging", owner: "a1-past-was-had",
    // "de was" and a bare "was" are the noun laundry, not the past of zijn.
    test: (text) => /\b(?:was|waren|had|hadden|ging|gingen)\b/.test(text) && !/\bde was\b/.test(text) && text !== "was" },
  { id: "omdat-dat", label: "subordinate omdat / dat (verb last)", owner: "a2-reasons-omdat-dat",
    test: (text) => /\bomdat\b/.test(text) || /\b(?:denk|denkt|zegt|zeggen|weet|wil|wilt|hoop|vind|vindt|gezegd)\b.*\bdat\b/.test(text) },
  { id: "als", label: "subordinate als (if/when)", owner: "a2-strong-combined",
    test: (text) => /\bals\b/.test(text) },
  { id: "connectors", label: "en/maar/want joining clauses", owner: "a1-short-messages",
    test: (text) => /\b(?:want|maar)\b/.test(text) },
  { id: "reflexive", label: "reflexive verbs (ik voel me)", owner: "a1-feelings-reflexive",
    test: (text) => /\b(?:voel|voelt|voelen|meld|meldt)\b.*\b(?:me|je|zich|ons)\b/.test(text) },
  { id: "comparative", label: "comparatives (-er, beter, liever)", owner: "a1-comparatives",
    test: (text) => /\b(?:beter|liever|duurder|goedkoper|warmer|kouder|groter|kleiner|zachter|langzamer|eerder|later)\b/.test(text) || /\b\w+er dan\b/.test(text) },
  { id: "liggen-staan", label: "liggen/staan for 'is located'", owner: "a1-house-food-plurals",
    test: (text) => /\b(?:ligt|liggen)\b/.test(text) || /\bstaat\b.*\b(?:in|op)\b/.test(text) },
  { id: "imperative", label: "imperative", owner: "a1-directions-town",
    test: (text) => !/\?$/.test(text) && /^(?:sla|lees|neem|vul|kom|wacht|spreek|schrijf|zeg|luister|onderteken|stuur|vergeet|bel|blokkeer|geef|doe|loop|stop)\b/.test(text) && !/^(?:bel|stop) \d/.test(text) },
  { id: "sinds", label: "sinds + present", owner: "a1-doctor-symptoms",
    test: (text) => /\bsinds\b/.test(text) },
  { id: "passive", label: "passive (wordt + participle)", owner: "a2-landlord-repairs",
    test: (text) => /\b(?:wordt|worden)\b/.test(text) && /\bge\w+(?:d|t)\b/.test(text) }
];

const chunkModes = new Set(["atomic chunk", "whole phrase", "practical chunk"]);
function normalized(value) {
  return String(value || "").toLowerCase().replace(/[-_]+/g, " ").trim();
}
function isMarkedChunk(concept) {
  if (concept.atomicChunk === true || concept.teachAsChunk === true) return true;
  if ([concept.learningMode, concept.teachingMode, concept.conceptType, concept.kind].some((mode) => chunkModes.has(normalized(mode)))) return true;
  const lesson = lessonById.get(concept.introducedInLessonId);
  const block = (lesson?.teachingBlocks || []).find((item) => item.conceptId === concept.id);
  return chunkModes.has(normalized(block?.mode || block?.teachingMode || block?.kind));
}

const results = [];
for (const feature of features) {
  if (onlyFeature && feature.id !== onlyFeature) continue;
  const ownerAt = position.has(feature.owner) ? position.get(feature.owner) : Infinity;
  const early = [];
  const uses = [];
  for (const concept of course.concepts) {
    const text = normalized(concept.dutch).replace(/[.,!]/g, "");
    if (!feature.test(text)) continue;
    const at = position.get(concept.introducedInLessonId);
    if (at === undefined) continue;
    const use = { lessonId: concept.introducedInLessonId, at, dutch: concept.dutch, chunk: isMarkedChunk(concept) };
    uses.push(use);
    if (at < ownerAt && concept.introducedInLessonId !== feature.owner) early.push(use);
  }
  early.sort((a, b) => a.at - b.at);
  results.push({
    feature: feature.id,
    label: feature.label,
    owner: feature.owner,
    ownerPosition: Number.isFinite(ownerAt) ? ownerAt + 1 : null,
    uses: uses.length,
    earlyUnmarked: early.filter((use) => !use.chunk),
    earlyChunks: early.filter((use) => use.chunk)
  });
}

if (asJson) {
  console.log(JSON.stringify(results, null, 2));
} else {
  for (const row of results) {
    const owner = row.ownerPosition ? `#${row.ownerPosition} ${row.owner}` : `${row.owner} (not in the course yet)`;
    console.log(`\n${row.feature}: ${row.label}. Owner ${owner}. ${row.uses} concept(s) use it; before the owner: ${row.earlyUnmarked.length} unmarked, ${row.earlyChunks.length} marked chunk(s).`);
    const shown = showAll ? row.earlyUnmarked : row.earlyUnmarked.slice(0, 12);
    for (const use of shown) console.log(`   #${use.at + 1} ${use.lessonId.padEnd(30)} ${use.dutch}`);
    if (shown.length < row.earlyUnmarked.length) console.log(`   … ${row.earlyUnmarked.length - shown.length} more (--all)`);
  }
  const total = results.reduce((sum, row) => sum + row.earlyUnmarked.length, 0);
  console.log(`\nGrammar spine: ${total} unmarked concept(s) use a feature before the lesson that owns it.`);
}
if (strict && results.some((row) => row.earlyUnmarked.length)) process.exitCode = 1;
