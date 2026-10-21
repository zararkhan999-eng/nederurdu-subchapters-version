/* Open Door: original architectural scenes and finite, preference-aware motion. */
window.OpenDoor = (() => {
  let lastKey = "", lastSelected = "", lastChecked = false, lastDetail = "";
  let pendingPage = null, skipNext = false;
  const routeOrder = ["home", "journey", "passport", "practice", "toolkit", "letters", "settings", "preview", "lesson", "complete"];
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
  function situation(lesson) {
    const key = [lesson?.id, lesson?.visual, lesson?.unit, lesson?.worldId].join(" ");
    return situations.find(([match]) => match.test(key)) || [null, "BUURTHUIS", "محلے کے مرکز میں دو بالغ افراد سلام کرتے ہیں", "Hallo!", "community"];
  }
  function scene(lesson, compact = false, morph = "") {
    const setting = situation(lesson);
    const [ ,label, description, greeting, kind] = setting;
    return `<div class="nu-scene nu-depth-scene ${compact ? 'mini' : ''} scene-${kind}" ${morph ? `data-morph="${safe(morph)}" data-morph-fly` : ""} role="img" aria-label="${safe(description)}"><span class="nu-scene-label latin">NEDERURDU / ${label}</span><div class="nu-scene-world" aria-hidden="true"><div class="nu-sky-halo"></div><div class="nu-city"><span></span><span></span><span></span></div><div class="nu-floor"></div><div class="nu-ground-shadow"></div><div class="nu-arch-shadow"></div><div class="nu-arch-shell"><div class="nu-room"><span class="nu-room-window"></span><span class="nu-room-light"></span><span class="od-room-detail"></span><div class="nu-door-leaf"><span></span></div></div></div><div class="nu-light-beam"></div><div class="nu-person"><span class="nu-person-arm"></span></div><div class="nu-person other"><span class="nu-person-arm"></span></div><div class="nu-plant"><span></span><span></span><span></span></div><div class="nu-greeting latin">${safe(greeting)}</div><div class="nu-front-step"></div><span class="od-situation-sign latin">${label}</span></div></div>`;
  }
  function decorate(app, state) {
    if (state.screen === "journey" && !app.querySelector(".od-editorial-line")) app.querySelector(".od-world-cover > div:last-child")?.insertAdjacentHTML("afterbegin", '<div class="od-editorial-line" aria-hidden="true"><span class="od-mini-arch"></span><span>ELKE STAP OPENT IETS NIEUWS</span></div>');
    if (state.screen === "home" && !app.querySelector(".od-language-strip")) app.querySelector(".od-hero-copy")?.insertAdjacentHTML("afterbegin", '<div class="od-language-strip" aria-hidden="true"><span>NL</span><i></i><span>اردو</span><b>↗</b></div>');
  }
  function prepareTransition({screen, previous, reduced}) {
    pendingPage = null;
    document.querySelectorAll(".od-route-snapshot,.od-route-ribbon").forEach(el => el.remove());
    // Entering through the street door brings its own camera move and light, so skip the page slide.
    if (skipNext) { skipNext = false; return; }
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
        const cover=document.createElement("div");cover.className="od-portal";cover.setAttribute("aria-hidden","true");cover.innerHTML=`<span class="od-mark">${NU.cat.render({face:true,size:120,mood:"happy"})}</span>`;app.append(cover);
        const arrival=animate(cover,[{opacity:0},{opacity:1,offset:.2},{opacity:1,offset:.4},{opacity:0}],{duration:900});
        animate(cover.firstChild,[{transform:"perspective(550px) rotateY(-30deg) scale(.7)"},{transform:"perspective(550px) rotateY(0) scale(1.6)"}],{duration:900});
        arrival?.finished.then(()=>cover.remove(),()=>cover.remove());
      }
    }
    lastKey=key;lastSelected=state.selected;lastChecked=state.checked;lastDetail=state.detail;
  }
  media.addEventListener("change", () => {if(media.matches) document.getAnimations().forEach(a=>a.cancel());});
  // Settle one-off motion when the app is backgrounded; endless loops (blinks, clouds) cannot be finished.
  document.addEventListener("visibilitychange",()=>{if(document.hidden) document.getAnimations().forEach(a=>{if(a.effect?.getComputedTiming().endTime!==Infinity) a.finish();});});
  return {scene,situation,skipNextTransition:()=>{skipNext=true;},choreograph,prepareTransition,tokens: text => String(text || "").trim().split(/\s+/).map(word=>`<span class="od-grammar-token">${safe(word)}</span>`).join(" ")};
})();
