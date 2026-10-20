// Lists every Dutch text the app can speak, as speakDutch() will send it.
//
// The lesson screens are assembled at runtime, so this opens the app in a
// headless browser, renders every screen of every lesson, mission variant and
// learning run with the app's own render functions, and collects each
// data-speak value. The texts are passed through the app's own
// normalizeDutchSpeechText, so they match speakDutch() lookups exactly.
//
// Output: scripts/audio/speech-texts.json (sorted). render-speech.py turns it into clips.
// With --check, nothing is written: it fails if any text lacks a rendered clip.
const fs = require("fs");
const net = require("net");
const path = require("path");
const { spawn } = require("child_process");
const { chromium } = require("@playwright/test");

const root = path.resolve(__dirname, "..", "..");
const outFile = path.join(__dirname, "speech-texts.json");

function freePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

async function waitForServer(url, attempts = 50) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Server did not start at ${url}`);
}

// street.js keeps its greetings private; read them from the source.
function streetTexts() {
  const source = fs.readFileSync(path.join(root, "street.js"), "utf8");
  const greetings = [...source.matchAll(/greet:\s*"([^"]+)"/g)].map((match) => match[1].replace("!", ""));
  const phrases = [...source.matchAll(/\["([^"؀-ۿ]+)",\s*"[^"]*[؀-ۿ]/g)].map((match) => match[1].replace(/[!?]$/, ""));
  return [...greetings, ...phrases];
}

function launchBrowser() {
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  if (executablePath) return chromium.launch({ executablePath });
  return chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
}

// Runs inside the page, where the app's top-level functions and state live.
function collectInPage(extraTexts) {
  const found = new Map();
  const add = (text, source) => {
    const spoken = normalizeDutchSpeechText(text);
    if (!spoken || !isDutchText(spoken)) return;
    if (!found.has(spoken)) found.set(spoken, source);
  };
  const template = document.createElement("template");
  const collect = (html, source) => {
    template.innerHTML = html;
    template.content.querySelectorAll("[data-speak]").forEach((element) => add(element.dataset.speak, source));
  };
  const resetQuestionState = () => {
    selectedAnswer = "";
    checked = false;
    buildAnswerIds = [];
    hintOpen = false;
    audioSkipped = false;
    matchSelection = null;
    matchedPairIds = [];
    matchPairError = "";
    typedAnswer = "";
    typedFallback = false;
    lessonDetailKind = "";
    teachingStep = 0;
    activeWordHelp = null;
  };
  const renderSession = (lesson, questions, run, review = null) => {
    activeReview = review;
    activeLessonId = review ? review.id : lesson.id;
    activeLearningRun = run || null;
    sessionQuestions = questions;
    screen = "lesson";
    questions.forEach((question, index) => {
      activeQuestionIndex = index;
      const source = `${lesson.id}#${question.id || index}`;
      for (let step = 0; step < 4; step += 1) {
        resetQuestionState();
        teachingStep = step;
        collect(renderLesson(), source);
      }
      resetQuestionState();
      selectedAnswer = question.answer || "";
      checked = true;
      collect(renderLesson(), source);
      for (const kind of ["concept", "pattern", "feedback", "correction", "notes"]) {
        lessonDetailKind = kind;
        try { collect(renderLesson(), source); } catch {}
      }
      add(getQuestionSpeechText(question), source);
    });
  };

  for (const lesson of getAllLessons()) {
    try {
      if (lesson.kind === "mission") {
        for (const variant of lesson.variants || []) {
          renderSession(lesson, variant.questions.map((question) => prepareSessionQuestion(question)));
        }
      } else if (getLearningRuns(lesson).length) {
        for (const run of getLearningRuns(lesson)) renderSession(lesson, buildLearningFirstSession(lesson, run), run);
      }
      if (lesson.kind !== "mission" && getLessonExercises(lesson).length) {
        activeLearningRun = null;
        const sourceQuestions = lesson.questions || [];
        const intro = getLessonIntroQuestion(lesson, sourceQuestions);
        renderSession(lesson, (intro ? [intro, ...sourceQuestions] : sourceQuestions).map((question) => prepareSessionQuestion(question)));
      }
      // Reviews (today, older lessons, mistakes) draw from the whole exercise bank.
      const bank = getLegacyEvidenceExercises(lesson).filter((question) => !isInfoQuestion(question));
      const reviewQuestions = bank.map((question) => prepareAdaptiveReviewQuestion(question));
      const review = { id: "review-today", title: "", unit: "", description: "", questions: reviewQuestions, xp: 0, reviewKind: "today" };
      renderSession(lesson, reviewQuestions, null, review);
      previewLessonId = lesson.id;
      screen = "preview";
      collect(renderLessonPreview(), `${lesson.id}#preview`);
    } catch (error) {
      found.set(`__error__ ${lesson.id}: ${error.message}`, "error");
    }
  }

  // Toolkit word list and grammar notes (rendered from progress, so add their sources directly).
  for (const concept of courseConcepts.values()) add(concept.audioText || concept.dutch, `concept:${concept.id}`);
  for (const lesson of getAllLessons()) {
    for (const pattern of lesson.patterns || []) add(pattern.audioText || pattern.modelDutch, `pattern:${lesson.id}`);
  }
  collect(renderLetters(), "letters");
  for (const text of extraTexts) add(text, "street");

  return [...found.entries()].map(([text, source]) => ({ text, source }));
}

function checkClips(texts) {
  const audioDir = path.join(root, "audio", "nl");
  const context = { window: {} };
  require("vm").runInNewContext(fs.readFileSync(path.join(audioDir, "manifest.js"), "utf8"), context);
  const clips = context.window.NEDERURDU_AUDIO.clips;
  const missingClips = texts.filter((text) => !clips[text]);
  const missingFiles = Object.values(clips)
    .flatMap(([id]) => [`${id}.ogg`, `${id}-slow.ogg`])
    .filter((file) => !fs.existsSync(path.join(audioDir, file)));
  if (missingClips.length || missingFiles.length) {
    if (missingClips.length) console.error(`${missingClips.length} texts have no clip:\n  ${missingClips.slice(0, 20).join("\n  ")}`);
    if (missingFiles.length) console.error(`${missingFiles.length} clip files are missing: ${missingFiles.slice(0, 10).join(", ")}`);
    console.error("Run: npm run audio:build");
    process.exitCode = 1;
    return;
  }
  console.log(`All ${texts.length} speech texts have recorded clips.`);
}

(async () => {
  const port = await freePort();
  const url = `http://127.0.0.1:${port}/`;
  const server = spawn(process.execPath, ["server.js"], { cwd: root, env: { ...process.env, PORT: String(port) }, stdio: "ignore" });
  let browser;
  try {
    await waitForServer(url);
    browser = await launchBrowser();
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript(() => localStorage.clear());
    await page.goto(url);
    await page.waitForFunction(() => typeof renderLesson === "function" && typeof normalizeDutchSpeechText === "function");
    const entries = await page.evaluate(collectInPage, streetTexts());
    const failures = entries.filter((entry) => entry.source === "error");
    if (failures.length) throw new Error(`Could not render:\n${failures.map((entry) => entry.text).join("\n")}`);
    if (errors.length) throw new Error(`Page errors:\n${errors.join("\n")}`);

    const texts = [...new Set(entries.map((entry) => entry.text))].sort((a, b) => a.localeCompare(b, "nl"));
    if (process.argv.includes("--check")) {
      checkClips(texts);
      return;
    }
    fs.writeFileSync(outFile, `${JSON.stringify(texts, null, 1)}\n`);
    const chars = texts.reduce((sum, text) => sum + text.length, 0);
    console.log(`${texts.length} speech texts (${chars} characters) → ${path.relative(root, outFile)}`);
  } finally {
    await browser?.close();
    server.kill();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
