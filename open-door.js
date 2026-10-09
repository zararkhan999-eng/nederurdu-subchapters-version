/* Open Door: original architectural scenes and finite, preference-aware motion. */
window.OpenDoor = (() => {
  let lastKey = "", lastSelected = "", lastChecked = false, lastDetail = "";
  let pendingPage = null;
  const routeOrder = ["home", "journey", "practice", "toolkit", "letters", "settings", "preview", "lesson", "complete"];
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  const situations = [
    [/shop|food|eten|boodsch|winkel|money|cafe|restaurant/i, "WINKEL", "دکان میں گفتگو", "Goedemorgen!", "shop"],
    [/train|transport|travel|station|route|vervoer|reizen/i, "STATION", "اسٹیشن پر گفتگو", "Waar is het spoor?", "station"],
    [/health|body|doctor|clinic|gezond|huisarts|lichaam/i, "HUISARTS", "ڈاکٹر کے پاس گفتگو", "Hoe gaat het?", "clinic"],
    [/work|job|werk|beroep/i, "WERKPLEK", "کام کی جگہ گفتگو", "Welkom!", "work"],
    [/municip|service|gemeente|administr/i, "GEMEENTE", "بلدیہ میں گفتگو", "Goedendag!", "municipality"],
    [/home|family|house|wonen|familie|huis/i, "THUIS", "گھر میں گفتگو", "Kom binnen!", "home"]
  ];
  const safe = text => String(text || "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function scene(lesson, compact = false, morph = "") {
    const key = [lesson?.id, lesson?.visual, lesson?.unit, lesson?.worldId].join(" ");
    const setting = situations.find(([match]) => match.test(key)) || [null, "BUURTHUIS", "محلے کے مرکز میں دو بالغ افراد سلام کرتے ہیں", "Hallo!", "community"];
    const [ ,label, description, greeting, kind] = setting;
    return `<div class="nu-scene nu-depth-scene ${compact ? 'mini' : ''} scene-${kind}" ${morph ? `data-morph="${safe(morph)}" data-morph-fly` : ""} role="img" aria-label="${safe(description)}"><span class="nu-scene-label latin">NEDERURDU / ${label}</span><div class="nu-scene-world" aria-hidden="true"><div class="nu-sky-halo"></div><div class="nu-city"><span></span><span></span><span></span></div><div class="nu-floor"></div><div class="nu-ground-shadow"></div><div class="nu-arch-shadow"></div><div class="nu-arch-shell"><div class="nu-room"><span class="nu-room-window"></span><span class="nu-room-light"></span><span class="od-room-detail"></span><div class="nu-door-leaf"><span></span></div></div></div><div class="nu-light-beam"></div><div class="nu-person"><span class="nu-person-arm"></span></div><div class="nu-person other"><span class="nu-person-arm"></span></div><div class="nu-plant"><span></span><span></span><span></span></div><div class="nu-greeting latin">${safe(greeting)}</div><div class="nu-front-step"></div><span class="od-situation-sign latin">${label}</span></div></div>`;
  }
  // Original vector compositions use the same paper, cobalt and doorway geometry.
  function graphic(kind) {
    const art = {
      practice: `<g class="od-art-piece"><rect x="66" y="27" width="113" height="83" rx="10" fill="#10298f" transform="rotate(-12 122 69)"/><rect x="75" y="19" width="113" height="83" rx="10" fill="#f1d27a" transform="rotate(-6 132 61)"/></g><g class="od-art-piece"><rect x="107" y="34" width="113" height="83" rx="10" fill="#b8c8fb"/><rect x="107" y="27" width="113" height="83" rx="10" fill="#fff"/><text x="123" y="76" fill="#2047ed" font-size="38" font-weight="600">Aa</text><path d="M172 55v24m8-33v42m8-29v16" stroke="#2047ed" stroke-width="4" stroke-linecap="round"/></g><g class="od-art-piece"><circle cx="236" cy="89" r="21" fill="#d87d5c"/><path d="m228 89 6 6 12-13" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></g><path class="od-art-line" d="M40 85c-15-36 18-70 56-66m-11-7 12 7-9 10" fill="none" stroke="#2047ed" stroke-width="2"/>`,
      toolkit: `<g class="od-art-piece"><path d="M66 43q40-12 79 0v74q-39-12-79 0Z" fill="#10298f"/><path d="M145 43q40-12 79 0v74q-39-12-79 0Z" fill="#d87d5c"/><path d="M71 34q37-12 74 0v74q-37-12-74 0Z" fill="#fff"/><path d="M145 34q37-12 74 0v74q-37-12-74 0Z" fill="#f1d27a"/><path d="M145 34v73" stroke="#d3bd80" stroke-width="2"/><path d="M85 55h43m-43 12h36m-36 12h40" stroke="#b8c8fb" stroke-width="3"/></g><g class="od-art-piece"><rect x="174" y="11" width="85" height="47" rx="9" fill="#2047ed"/><path d="m185 56 11 10V54" fill="#2047ed"/><text x="189" y="42" fill="#fff" font-size="25" font-weight="600">NL</text><circle cx="238" cy="35" r="4" fill="#f1d27a"/></g><g class="od-art-piece"><path d="M45 24a17 17 0 1 1 0 34 17 17 0 0 1 0-34" fill="#d87d5c"/><path d="m40 42 4 4 7-9" stroke="#fff" stroke-width="2" fill="none"/></g>`,
      settings: `<g class="od-art-piece"><rect x="56" y="24" width="185" height="89" rx="15" fill="#b8c8fb"/><rect x="56" y="17" width="185" height="89" rx="15" fill="#fff"/><path d="M79 40h137m-137 22h137m-137 22h137" stroke="#e2e6ee" stroke-width="5" stroke-linecap="round"/></g><g class="od-art-piece"><circle cx="110" cy="40" r="10" fill="#2047ed"/><circle cx="177" cy="62" r="10" fill="#d87d5c"/><circle cx="132" cy="84" r="10" fill="#2047ed"/><circle cx="110" cy="40" r="3" fill="#fff"/><circle cx="177" cy="62" r="3" fill="#fff"/><circle cx="132" cy="84" r="3" fill="#fff"/></g><g class="od-art-piece"><path d="M250 46V32a13 13 0 0 1 26 0v14h-7V32a6 6 0 0 0-12 0v14Z" fill="#f1d27a"/></g>`,
      letters: `<g class="od-art-piece"><rect x="63" y="29" width="76" height="83" rx="9" fill="#b8c8fb" transform="rotate(-8 101 71)"/><rect x="63" y="22" width="76" height="83" rx="9" fill="#fff" transform="rotate(-8 101 64)"/><text x="78" y="79" font-size="51" font-weight="600" fill="#2047ed" transform="rotate(-8 101 64)">A</text></g><g class="od-art-piece"><rect x="148" y="33" width="68" height="77" rx="9" fill="#d87d5c" transform="rotate(7 182 71)"/><text x="165" y="87" font-size="49" font-weight="500" fill="#fff" transform="rotate(7 182 71)">a</text></g><g class="od-art-piece"><circle cx="247" cy="62" r="25" fill="#f1d27a"/><path d="M235 57h6l7-6v22l-7-6h-6Zm18-3q10 8 0 16" fill="none" stroke="#18212b" stroke-width="2" stroke-linejoin="round"/></g>`,
      journey: `<path class="od-art-line" d="M45 103C83 103 73 45 118 45s23 57 68 57 48-66 87-66" fill="none" stroke="#2047ed" stroke-width="3" stroke-dasharray="4 7"/><g class="od-art-piece"><path d="M83 78V38a21 21 0 0 1 42 0v40h-11V38a10 10 0 0 0-20 0v40Z" fill="#f1d27a"/><path d="M163 120V80a21 21 0 0 1 42 0v40h-11V80a10 10 0 0 0-20 0v40Z" fill="#d87d5c"/></g><g class="od-art-piece"><circle cx="45" cy="103" r="7" fill="#2047ed"/><circle cx="273" cy="36" r="12" fill="#2047ed"/><path d="m268 36 4 4 7-8" stroke="#fff" stroke-width="2" fill="none"/></g>`
    };
    return `<div class="od-graphic od-graphic-${safe(kind)}" aria-hidden="true"><svg viewBox="0 0 320 136" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 117h320M0 18h320M31 0v136M288 0v136" stroke="#2047ed" stroke-opacity=".07"/><circle cx="281" cy="112" r="32" stroke="#2047ed" stroke-opacity=".12"/>${art[kind] || art.journey}<path d="M12 12h8m-4-4v8m280 104h8m-4-4v8" stroke="#2047ed" stroke-opacity=".35"/></svg></div>`;
  }
  function decorate(app, state) {
    // Decorative SVGs stay outside teaching and answer surfaces.
    const target = {practice: ".review-hero .utility-heading", toolkit: ".toolkit-screen .od-support", settings: ".settings-panel .settings-intro", letters: ".letters-panel .letters-heading"}[state.screen];
    if (target && !app.querySelector(".od-graphic")) app.querySelector(target)?.insertAdjacentHTML("beforebegin", graphic(state.screen));
    if (state.screen === "journey" && !app.querySelector(".od-editorial-line")) app.querySelector(".od-world-cover > div:last-child")?.insertAdjacentHTML("afterbegin", '<div class="od-editorial-line" aria-hidden="true"><span class="od-mini-arch"></span><span>ELKE STAP OPENT IETS NIEUWS</span></div>');
    if (state.screen === "home" && !app.querySelector(".od-language-strip")) app.querySelector(".od-hero-copy")?.insertAdjacentHTML("afterbegin", '<div class="od-language-strip" aria-hidden="true"><span>NL</span><i></i><span>اردو</span><b>↗</b></div>');
  }
  function prepareTransition({screen, previous, reduced}) {
    pendingPage = null;
    document.querySelectorAll(".od-route-snapshot,.od-route-ribbon").forEach(el => el.remove());
    if (!previous || previous === screen || reduced || media.matches || screen === "lesson") return;
    const app = document.querySelector("#app");
    const snapshot = document.createElement("div");
    snapshot.className = "od-route-snapshot";
    snapshot.setAttribute("aria-hidden", "true");
    snapshot.inert = true;
    const page = document.createElement("div");
    page.className = "od-route-snapshot-content";
    // Copy only the page, leaving persistent navigation and transient controls out.
    [...app.children].filter(el => !el.matches(".bottom-nav,.od-portal,.od-offline")).forEach(el => page.append(el.cloneNode(true)));
    const lessonContent = app.querySelector(".quiz-content");
    if (previous === "lesson") {
      const copy = page.querySelector(".quiz-screen");
      if (copy) { copy.style.height = "100dvh"; copy.style.minHeight = "0"; }
      const reading = page.querySelector(".quiz-content");
      if (reading && lessonContent) {
        reading.style.cssText = `display:block;flex:1 1 0;min-height:0;height:${lessonContent.clientHeight}px;overflow:hidden;padding-bottom:210px`;
      }
      page.querySelectorAll(".quiz-action-bar,.quiz-feedback-panel,.lesson-detail-layer").forEach(el=>el.remove());
    }
    page.querySelectorAll("[id]").forEach(el => el.removeAttribute("id"));
    // Copies of shared elements become ghosts, hidden by NU.motion only when the element flies to the new page.
    page.querySelectorAll("[data-morph]").forEach(el => { el.dataset.morphGhost = el.dataset.morph; el.removeAttribute("data-morph"); el.removeAttribute("data-morph-fly"); });
    page.style.transform = `translateY(${-window.scrollY}px)`;
    snapshot.append(page);
    const backwards = routeOrder.indexOf(screen) < routeOrder.indexOf(previous);
    pendingPage = {snapshot, direction: backwards ? -1 : 1, readingScroll: lessonContent?.scrollTop || 0};
  }
  function transitionPage(app) {
    const transition = pendingPage;
    pendingPage = null;
    if (!transition) return;
    const {snapshot, direction} = transition;
    app.append(snapshot);
    const reading = snapshot.querySelector(".quiz-content");
    if (reading) reading.scrollTop = transition.readingScroll;
    const incoming = [...app.children].filter(el => !el.matches(".bottom-nav,.od-route-snapshot,.od-offline"));
    incoming.forEach(el => animate(el, [{translate: `${direction * 36}px 10px`, scale: ".97", opacity: .2}, {translate:"0 0", scale: "1", opacity:1}], NU.motion.springs.snappy));
    const outgoing = animate(snapshot,[{translate:"0 0",opacity:1},{translate:`${direction * -48}px -6px`,opacity:0}],{duration:340});
    if (outgoing) outgoing.finished.then(()=>snapshot.remove(),()=>snapshot.remove());
    else snapshot.remove();
    const ribbon=document.createElement("div");
    ribbon.className="od-route-ribbon";ribbon.setAttribute("aria-hidden","true");ribbon.innerHTML='<span></span><i></i><b></b>';
    app.append(ribbon);
    const sweep=animate(ribbon,[{translate:`${direction * -110}% 0`,opacity:0},{translate:"0 0",opacity:1,offset:.42},{translate:`${direction * 110}% 0`,opacity:0}],{duration:620});
    if (sweep) sweep.finished.then(()=>ribbon.remove(),()=>ribbon.remove());else ribbon.remove();
  }
  function animate(element, frames, options = {}) {
    if (element?.closest(".od-route-snapshot") && !element.matches(".od-route-snapshot")) return;
    if (!element || media.matches || document.body.classList.contains("od-reduced")) return;
    return element.animate(frames, {duration: 550, easing: "cubic-bezier(.16,1,.3,1)", ...options});
  }
  function choreograph(state) {
    const app = document.querySelector("#app");
    decorate(app, state);
    const key = `${state.screen}:${state.question || ''}:${state.step || 0}`;
    const entered = key !== lastKey;
    document.body.classList.toggle("od-reduced", state.reduced);
    if (state.reduced) { pendingPage = null; document.getAnimations().forEach(a => a.cancel()); }
    if (!state.reduced) {
      transitionPage(app);
      if (entered) {
        app.querySelectorAll(".nu-depth-scene").forEach(scene => scene.classList.add("is-playing"));
        const main = app.querySelector(".learning-teaching-card,.today-panel,.learning-preview-hero,.review-hero,.od-world-cover,.od-empty,.settings-panel,.letters-panel,.complete-screen");
        animate(main, [{transform: "translateY(22px) scale(.975)", opacity: .5}, {transform: "translateY(0) scale(1)", opacity: 1}], {duration: 650});
        app.querySelectorAll(".od-graphic .od-art-piece").forEach((part,i) => animate(part,[{translate:"0 12px",rotate:`${i % 2 ? -6 : 6}deg`,opacity:.1},{translate:"0 0",rotate:"0deg",opacity:1}],{duration:680,delay:i*70}));
        // Animate only visible items: large journeys and alphabets retain a bounded motion budget.
        [...app.querySelectorAll(".od-intro,.teaching-dutch,.teaching-urdu,.teaching-pronunciation,.teaching-example,.od-word,.unit-row,.review-hub-card,.letter-card,.setting-row")].filter(el => el.getBoundingClientRect().top < innerHeight).slice(0, 10).forEach((el,i) => animate(el,[{transform:"translateY(14px)",opacity:.3},{transform:"translateY(0)",opacity:1}],{delay:Math.min(i*65,260)}));
        [...app.querySelectorAll(".od-grammar-token")].forEach((token,i) => animate(token,[{transform:"translateY(20px) rotate(-3deg)",opacity:0},{transform:"translateY(0) rotate(0)",opacity:1}],{delay:Math.min(i*90,360)}));
        animate(app.querySelector(".pattern-rule-highlight"),[{transform:"translateY(0)"},{transform:"translateY(-7px)",offset:.4},{transform:"translateY(0)"}],{duration:1400,delay:400});
        animate(app.querySelector(".od-completion-door"),[{transform:"perspective(500px) rotateY(-70deg) translateY(22px)"},{transform:"perspective(500px) rotateY(0) translateY(0)"}],{duration:1100});
        animate(app.querySelector(".nav-button.active .ui-icon"),[{transform:"translateY(5px) rotate(-12deg)"},{transform:"translateY(0) rotate(0)"}],{duration:500});
      }
      if (!entered && state.selected && state.selected !== lastSelected) animate(app.querySelector(".choice-button.selected,.word-bank-token.selected,.match-pair-button.selected"),[{transform:"translateY(0)"},{transform:"translateY(-4px)",offset:.4},{transform:"translateY(0)"}],{duration:300});
      if (state.checked && !lastChecked) {
        const panel = app.querySelector(".quiz-feedback-panel");
        animate(panel,panel?.classList.contains("wrong") ? [{translate:"0 0"},{translate:"5px 0",offset:.2},{translate:"-4px 0",offset:.45},{translate:"2px 0",offset:.7},{translate:"0 0"}] : [{translate:"0 20px",opacity:.5},{translate:"0 0",opacity:1}]);
      }
      if (state.detail && state.detail !== lastDetail) animate(app.querySelector(".lesson-detail-sheet"),[{translate:"0 40px",opacity:.6},{translate:"0 0",opacity:1}],{duration:600});
      if (state.portal) {
        NU.sound.play("whoosh");
        const cover=document.createElement("div");cover.className="od-portal";cover.setAttribute("aria-hidden","true");cover.innerHTML='<span class="od-mark"></span>';app.append(cover);
        const arrival=animate(cover,[{opacity:0},{opacity:1,offset:.2},{opacity:1,offset:.4},{opacity:0}],{duration:900});
        animate(cover.firstChild,[{transform:"perspective(550px) rotateY(-30deg) scale(.7)"},{transform:"perspective(550px) rotateY(0) scale(1.6)"}],{duration:900});
        arrival?.finished.then(()=>cover.remove(),()=>cover.remove());
      }
    }
    lastKey=key;lastSelected=state.selected;lastChecked=state.checked;lastDetail=state.detail;
  }
  media.addEventListener("change", () => {if(media.matches) document.getAnimations().forEach(a=>a.cancel());});
  document.addEventListener("visibilitychange",()=>{if(document.hidden) document.getAnimations().forEach(a=>a.finish());});
  return {scene,choreograph,prepareTransition,tokens: text => String(text || "").trim().split(/\s+/).map(word=>`<span class="od-grammar-token">${safe(word)}</span>`).join(" ")};
})();
