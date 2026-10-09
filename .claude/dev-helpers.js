// Dev-only helpers for reviewing lesson screens in the preview browser. Not loaded by the app.
window.__fin = () => document.getAnimations().forEach((a) => { if (a.effect?.getComputedTiming().endTime !== Infinity) a.finish(); });
window.__answer = (wrong = false) => {
  const q = getActiveQuestion();
  if (!q) return false;
  if (document.querySelector('[data-action="next"]')) { nextQuestion(); return true; }
  if (isInfoQuestion(q)) { continueInfoStep(); return true; }
  if (q.type === "match-pairs") { matchedPairIds = getMatchPairs(q).map((p) => p.id); selectedAnswer = q.answer; checkAnswer(); return true; }
  if (["build", "sequence"].includes(q.type)) {
    const tiles = getAnswerTiles(q), used = new Set();
    buildAnswerIds = String(q.answer).split(/\s+/).map((w) => { const t = tiles.find((x) => x.word === w && !used.has(x.id)); if (t) { used.add(t.id); return t.id; } }).filter(Boolean);
    if (wrong) buildAnswerIds.reverse();
    checkAnswer(); return true;
  }
  if (q.type === "short-input") { typedAnswer = q.answer; selectedAnswer = q.answer; checkAnswer(); return true; }
  selectedAnswer = wrong ? (q.options || []).find((o) => o !== q.answer) : q.answer;
  checkAnswer();
  return true;
};
window.__go = async (lessonId, pred, max = 80) => {
  document.querySelector(".launch-screen")?.remove();
  startLesson(lessonId);
  for (let i = 0; i < max; i++) {
    const q = getActiveQuestion();
    if (screen !== "lesson") return "left:" + screen;
    if (pred(q) && !checked) { __fin(); return q.type + ":" + activeQuestionIndex; }
    __answer();
  }
  return "notfound";
};
window.__css = async () => {
  document.querySelectorAll("link[rel=stylesheet]").forEach((l) => { l.href = l.href.replace(/\?.*/, "?t=" + Date.now()); });
  await new Promise((r) => setTimeout(r, 400));
};
"helpers ready";
