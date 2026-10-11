/* Lesson scene helpers: Dutch syllable karaoke, Pim's tips and reactions, and streak moments. */
window.NU = window.NU || {};
NU.lesson = (() => {
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Dutch vowel groups are matched longest-first so "oei", "aai" and "ij" stay one sound.
  const VOWELS = /(aai|ooi|oei|eeu|ieu|aa|ee|oo|uu|ie|oe|eu|ui|ou|au|ei|ij|[aeiouyàáèéëïóöü])/gi;
  const KEEP_TOGETHER = /^(ch|ng|sch|st|tr|pr|br|kr|gr|dr|bl|kl|pl|fl|sl|sp|sn|sm|sw|zw|tw|kw|schr)$/i;

  // Splits a word between vowel groups: one consonant starts the next syllable, clusters split after the first.
  function syllablesOf(word) {
    const vowels = [...word.matchAll(VOWELS)];
    if (vowels.length < 2) return [word];
    const parts = [];
    let start = 0;
    for (let i = 0; i < vowels.length - 1; i++) {
      const endOfVowel = vowels[i].index + vowels[i][0].length;
      const consonants = word.slice(endOfVowel, vowels[i + 1].index);
      let cut = endOfVowel;
      if (consonants.length === 1) cut = endOfVowel;
      else if (consonants.length > 1) cut = KEEP_TOGETHER.test(consonants.slice(-2)) && consonants.length === 2 ? endOfVowel : endOfVowel + 1;
      if (cut > start) { parts.push(word.slice(start, cut)); start = cut; }
    }
    parts.push(word.slice(start));
    return parts.filter(Boolean);
  }

  // Markup for a Dutch word or sentence with each syllable wrapped for highlighting.
  function karaokeHTML(text) {
    return String(text || "").split(/(\s+)/).map((chunk) => {
      if (/^\s+$/.test(chunk) || !chunk) return chunk;
      const [, lead, core, tail] = chunk.match(/^([^\p{L}]*)([\p{L}'’-]*)(.*)$/u) || [null, "", chunk, ""];
      const syl = core ? syllablesOf(core).map((s) => `<span class="kw-syl">${esc(s)}</span>`).join("") : "";
      return `<span class="kw-word">${esc(lead)}${syl}${esc(tail)}</span>`;
    }).join("");
  }

  // Lights syllables in time with speech. Native TTS gives no word timings, so pacing is estimated.
  let karaokeRun = 0;
  function karaoke(el, { slow = false } = {}) {
    if (!el) return;
    const run = ++karaokeRun;
    const syllables = [...el.querySelectorAll(".kw-syl,.od-grammar-token")];
    el.querySelectorAll(".kw-syl.is-lit,.kw-syl.is-done").forEach((s) => s.classList.remove("is-lit", "is-done"));
    if (!syllables.length || NU.motion.level() === "off") return;
    const step = slow ? 380 : 240;
    let t = 260;
    syllables.forEach((syl, i) => {
      const gap = i && syl.parentElement !== syllables[i - 1].parentElement ? (slow ? 160 : 90) : 0;
      t += gap;
      setTimeout(() => {
        if (run !== karaokeRun) return;
        syllables[i - 1]?.classList.replace("is-lit", "is-done");
        syl.classList.add("is-lit");
      }, t);
      t += step;
    });
    setTimeout(() => {
      if (run !== karaokeRun) return;
      syllables.forEach((s) => s.classList.remove("is-lit", "is-done"));
    }, t + 500);
  }

  // Pim's encouragement, always Dutch with the Urdu meaning.
  const PRAISE = [["Goed zo!", "بہت خوب!"], ["Super!", "زبردست!"], ["Prima!", "بہترین!"], ["Helemaal goed!", "بالکل صحیح!"], ["Knap gedaan!", "شاباش!"]];
  const COMFORT = [["Bijna!", "تقریباً ٹھیک!"], ["Geen zorgen!", "فکر نہ کریں!"], ["Nog een keer!", "ایک بار اور!"]];
  const pick = (list, seed) => list[Math.abs(seed) % list.length];
  const phrase = (correct, seed = 0) => pick(correct ? PRAISE : COMFORT, seed);
  function reaction(correct, seed = 0) {
    const [nl, ur] = pick(correct ? PRAISE : COMFORT, seed);
    return `<span class="pl-pim-react ${correct ? "is-happy" : "is-sad"}" aria-hidden="true">${NU.cat.render({ face: true, size: 52, mood: correct ? "happy" : "sad" })}</span>
      <span class="pl-pim-line"><b class="latin" dir="ltr">${esc(nl)}</b><small>${esc(ur)}</small></span>`;
  }

  // A tip from Pim: face + speech bubble. `body` is trusted markup from the caller.
  function tip(body, { className = "", label = "" } = {}) {
    return `<div class="pl-pim-tip ${className}"${label ? ` role="note" aria-label="${esc(label)}"` : ""}>
      <span class="pl-pim-tip-face" aria-hidden="true">${NU.cat.render({ face: true, size: 44 })}</span>
      <div class="pl-pim-tip-bubble">${body}</div>
    </div>`;
  }

  // Streak milestones get a banner that slides down from the top.
  function streakToast(count) {
    if (![3, 5, 10, 15, 20].includes(count)) return;
    document.querySelector(".pl-streak-toast")?.remove();
    const toast = document.createElement("div");
    toast.className = "pl-streak-toast";
    toast.setAttribute("role", "status");
    toast.innerHTML = `<span class="pl-streak-toast-face" aria-hidden="true">${NU.cat.render({ face: true, size: 40, mood: "happy" })}</span>
      <span><b class="latin" dir="ltr">${count} op rij!</b><small>لگاتار ${count} صحیح جواب</small></span>`;
    document.body.append(toast);
    const show = NU.motion.animate(toast, [{ transform: "translate(-50%,-120%)" }, { transform: "translate(-50%,0)" }], { spring: "bouncy", fill: "forwards" });
    const hide = () => {
      const out = NU.motion.animate(toast, [{ transform: "translate(-50%,0)", opacity: 1 }, { transform: "translate(-50%,-120%)", opacity: 0 }], { duration: 320, fill: "forwards" });
      (out?.finished || Promise.resolve()).then(() => toast.remove(), () => toast.remove());
    };
    setTimeout(hide, show ? 1900 : 1600);
  }

  return { syllablesOf, karaokeHTML, karaoke, phrase, reaction, tip, streakToast };
})();
