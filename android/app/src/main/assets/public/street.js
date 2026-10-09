/* The Today street: a layered Dutch canal scene that follows the real time of day.
   Layers move at different depths with scroll and tilt; Pim rides in, rings the bell and greets
   the learner in Dutch. The lesson house's glowing door opens into the next lesson. */
window.NU = window.NU || {};
NU.street = (() => {
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Each time of day teaches its own greeting, matching the A0 greetings lesson.
  const TIMES = {
    morning: { greet: "Goedemorgen!", urdu: "صبح بخیر!", sky: ["#7cc8ff", "#d6efff", "#fff3d9"], sun: { x: 70, y: 92, r: 22, c: "#ffd36b" }, lit: false, water: ["#5aa9e6", "#2f7fc7"] },
    afternoon: { greet: "Goedemiddag!", urdu: "دوپہر بخیر!", sky: ["#4fb0ff", "#a9dcff", "#e6f6ff"], sun: { x: 320, y: 52, r: 20, c: "#ffe27a" }, lit: false, water: ["#4b9fe0", "#2470bf"] },
    evening: { greet: "Goedenavond!", urdu: "شام بخیر!", sky: ["#6a5bd6", "#ff8f6b", "#ffd08a"], sun: { x: 286, y: 62, r: 24, c: "#ff7a1a" }, lit: true, water: ["#7d6fd0", "#4a3f9e"] },
    night: { greet: "Goedenavond!", urdu: "شام بخیر!", sky: ["#141a40", "#25306b", "#3d4a96"], moon: { x: 282, y: 34, r: 14 }, lit: true, water: ["#26306b", "#141a40"] }
  };
  function timeOfDay(date = new Date()) {
    const forced = new URLSearchParams(location.search).get("time");
    if (TIMES[forced]) return forced;
    const h = date.getHours();
    if (h >= 5 && h < 12) return "morning";
    if (h >= 12 && h < 18) return "afternoon";
    if (h >= 18 && h < 22) return "evening";
    return "night";
  }

  // Short A0 phrases Pim cycles through when tapped.
  const PHRASES = [
    ["Hallo!", "سلام!"],
    ["Hoe gaat het?", "کیا حال ہے؟"],
    ["Dank je wel!", "بہت شکریہ!"],
    ["Tot straks!", "پھر ملتے ہیں!"],
    ["Fietsen is leuk!", "سائیکل چلانا مزے کا ہے!"]
  ];

  const HOUSES = [
    { w: 56, h: 118, c: "#d9673c", gable: "step" },
    { w: 50, h: 132, c: "#f2e3c6", gable: "bell" },
    { w: 58, h: 112, c: "#34477d", gable: "point" },
    { w: 66, h: 140, c: "#e9b949", gable: "neck", lesson: true },
    { w: 52, h: 120, c: "#7fb58b", gable: "step" },
    { w: 56, h: 128, c: "#ec9a8f", gable: "bell" },
    { w: 60, h: 114, c: "#8c5a3c", gable: "point" }
  ];
  const BASE = 228;

  function gable(x, top, w, type, color) {
    const mid = x + w / 2;
    if (type === "step") {
      const s = w / 6;
      return `<path d="M${x} ${top}v-10h${s}v-10h${s}v-10h${s * 2}v10h${s}v10h${s}v10Z" fill="${color}"/>`;
    }
    if (type === "bell") return `<path d="M${x} ${top}c0-14 10-14 12-24c2-10 6-14 ${w / 2 - 12} -16c${w / 2 - 12} 2 ${w / 2 - 8} 6 ${w / 2 - 12} 16c2 10 12 10 12 24Z" fill="${color}"/>`;
    if (type === "neck") return `<path d="M${x} ${top}c8 0 12-6 14-12h${w - 28}c2 6 6 12 14 12ZM${x + 18} ${top - 12}v-18h${w - 36}v18Z" fill="${color}"/><path d="M${mid - 9} ${top - 30}a9 9 0 0 1 18 0Z" fill="${color}"/>`;
    return `<path d="M${x - 2} ${top}L${mid} ${top - 30}L${x + w + 2} ${top}Z" fill="${color}"/>`;
  }

  function house(hs, x, lit, lesson) {
    const top = BASE - hs.h;
    const trim = hs.c === "#f2e3c6" ? "#c9b48e" : "#ffffff";
    const glass = lit ? "#ffd56b" : "#bfe3ff";
    const cols = hs.w > 58 ? 3 : 2;
    const gap = (hs.w - cols * 11) / (cols + 1);
    let windows = "";
    // The lesson house leaves its ground floor clear for the sign and the glowing door.
    for (let row = 0; row < (lesson ? 2 : 3); row++) {
      for (let col = 0; col < cols; col++) {
        const wx = x + gap + col * (11 + gap), wy = top + 14 + row * 30;
        const on = lit && (row + col + Math.round(x)) % 3 !== 0;
        windows += `<rect x="${wx.toFixed(1)}" y="${wy}" width="11" height="18" rx="5.5" fill="${on ? glass : "#bfe3ff"}" stroke="${trim}" stroke-width="2"/>`;
      }
    }
    const doorX = x + hs.w / 2 - 8;
    const door = lesson ? "" : `<rect x="${doorX}" y="${BASE - 22}" width="16" height="22" rx="8" fill="#2a2f45" opacity=".8"/>`;
    return `<g class="street-house">${gable(x, top, hs.w, hs.gable, hs.c)}<rect x="${x}" y="${top}" width="${hs.w}" height="${hs.h}" fill="${hs.c}"/>
      <rect x="${x}" y="${top}" width="${hs.w}" height="4" fill="#00000014"/>${windows}${door}
      <path d="M${x + hs.w / 2} ${top - 16}v-6" stroke="#2a2f45" stroke-width="2"/></g>`;
  }

  function lessonDoor(x, w, label, lessonId, lessonTitle) {
    const dx = x + w / 2 - 11;
    const signW = Math.max(36, label.length * 6 + 10);
    return `<g class="street-door" data-action="street-door" data-lesson="${esc(lessonId)}" role="button" tabindex="0" aria-label="${esc(`اگلا سبق کھولیں: ${lessonTitle}`)}" style="transform-origin:${dx + 22}px ${BASE - 14}px">
      <ellipse class="street-door-glow" cx="${dx + 11}" cy="${BASE - 10}" rx="26" ry="22" fill="#ffd56b" opacity=".55"/>
      <rect x="${dx - 3}" y="${BASE - 33}" width="28" height="33" rx="14" fill="#fff6dc"/>
      <rect x="${dx}" y="${BASE - 30}" width="22" height="30" rx="11" fill="#ffe9a8"/>
      <g class="street-door-leaf" style="transform-origin:${dx}px ${BASE - 15}px"><rect x="${dx}" y="${BASE - 30}" width="22" height="30" rx="11" fill="#ff7a1a"/><circle cx="${dx + 17}" cy="${BASE - 14}" r="1.8" fill="#fff6dc"/></g>
      <g class="street-sign"><rect x="${dx + 11 - signW / 2}" y="${BASE - 50}" width="${signW}" height="14" rx="4" fill="#2b6bff" stroke="#fff" stroke-width="1.5"/>
        <text x="${dx + 11}" y="${BASE - 40}" text-anchor="middle" font-size="8.5" font-weight="800" fill="#fff" font-family="DM Sans, sans-serif" letter-spacing=".4">${esc(label)}</text></g>
      <path class="street-door-arrow" d="M${dx + 11} ${BASE - 70}v12m-5-5 5 5 5-5" fill="none" stroke="#ff7a1a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`;
  }

  function render({ lesson, situation = "BUURTHUIS", time = timeOfDay(), streak = 0, xp = 0 } = {}) {
    const t = TIMES[time];
    const lit = t.lit;
    let x = -6, rows = "", reflect = "", door = "";
    HOUSES.forEach((hs) => {
      rows += house(hs, x, lit, hs.lesson);
      if (hs.lesson) door = lessonDoor(x, hs.w, situation, lesson?.id || "", lesson?.title || "");
      x += hs.w;
    });
    const stars = time === "night"
      ? Array.from({ length: 16 }, (_, i) => `<circle class="street-star" cx="${(i * 61 + 17) % 400}" cy="${(i * 37 + 9) % 110}" r="${i % 3 ? 1 : 1.6}" fill="#fff" style="animation-delay:${(i % 5) * 0.6}s"/>`).join("")
      : "";
    const celestial = t.moon
      ? `<circle cx="${t.moon.x}" cy="${t.moon.y}" r="${t.moon.r}" fill="#fff6d6"/><circle cx="${t.moon.x + 7}" cy="${t.moon.y - 4}" r="${t.moon.r}" fill="${t.sky[0]}"/>`
      : `<circle class="street-sun-halo" cx="${t.sun.x}" cy="${t.sun.y}" r="${t.sun.r * 2}" fill="${t.sun.c}" opacity=".25"/><circle cx="${t.sun.x}" cy="${t.sun.y}" r="${t.sun.r}" fill="${t.sun.c}"/>`;
    const cloud = (cx, cy, s, cls) => `<g class="street-cloud ${cls}" style="--cloud-x:${cx}px"><g transform="translate(${cx} ${cy}) scale(${s})" fill="#fff" opacity="${time === "night" ? .18 : .92}"><ellipse cx="0" cy="0" rx="26" ry="11"/><ellipse cx="-12" cy="-6" rx="12" ry="10"/><ellipse cx="9" cy="-10" rx="15" ry="13"/></g></g>`;
    const lampGlow = lit ? `<circle cx="74" cy="203" r="26" fill="#ffd56b" opacity=".35"/>` : "";

    return `<section class="street street-${time}" aria-label="NederUrdu street">
      <svg class="street-art" viewBox="0 0 400 320" preserveAspectRatio="xMidYMax slice" aria-hidden="false">
        <defs>
          <linearGradient id="street-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.sky[0]}"/><stop offset=".6" stop-color="${t.sky[1]}"/><stop offset="1" stop-color="${t.sky[2]}"/></linearGradient>
          <linearGradient id="street-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.water[0]}"/><stop offset="1" stop-color="${t.water[1]}"/></linearGradient>
          <clipPath id="street-water-clip"><rect x="0" y="${BASE + 4}" width="400" height="30"/></clipPath>
        </defs>
        <g class="street-layer" data-depth="0"><rect width="400" height="320" fill="url(#street-sky)"/>${stars}${celestial}</g>
        <g class="street-layer" data-depth=".15">
          ${cloud(60, 46, 1, "cloud-a")}${cloud(250, 30, .8, "cloud-b")}${cloud(360, 78, .65, "cloud-c")}
          <path class="street-bird" d="M0 0q5-5 10 0q5-5 10 0" fill="none" stroke="#2a2f45" stroke-width="1.6" stroke-linecap="round" transform="translate(-30 60)"/>
        </g>
        <g class="street-layer" data-depth=".3" fill="${time === "night" ? "#2c3778" : "#9dbfe6"}" opacity="${time === "night" ? 1 : .75}">
          <path d="M96 ${BASE}V70l6-22l6 22v${BASE - 70}Z"/><rect x="90" y="96" width="24" height="${BASE - 96}"/>
          <g transform="translate(352 104)"><path d="M-12 ${BASE - 104}l5-70h14l5 70Z"/><g class="street-windmill" style="transform-origin:0 -2px">
            <path d="M0 -2l-3-44h6Z M0 -2l44-3v6Z M0 -2l3 44h-6Z M0 -2l-44 3v-6Z" fill="${time === "night" ? "#3b4790" : "#f7fbff"}"/></g><circle cy="-2" r="4"/></g>
        </g>
        <g class="street-layer street-houses" data-depth=".55">${rows}${door}</g>
        <g class="street-layer" data-depth=".6">
          <rect y="${BASE}" width="400" height="6" fill="#7b8396"/>
          <rect y="${BASE + 4}" width="400" height="30" fill="url(#street-water)"/>
          <g clip-path="url(#street-water-clip)" opacity=".28"><g transform="translate(0 ${BASE * 2 + 8}) scale(1 -1)">${rows}</g></g>
          <g class="street-ripples" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity=".55"><path d="M20 242h18M120 250h26M230 244h14M300 254h22M370 246h12M70 256h14"/></g>
          <g class="street-boat" transform="translate(0 ${BASE + 18})"><path d="M-22 -4h44l-8 10h-28Z" fill="#ff4d4d"/><rect x="-10" y="-12" width="14" height="8" rx="2" fill="#fff6dc"/><circle cx="12" cy="-9" r="3" fill="#ffc23d"/><circle cx="17" cy="-8" r="3" fill="#ff7a1a"/></g>
        </g>
        <g class="street-layer" data-depth="1">
          <rect y="${BASE + 34}" width="400" height="10" fill="#c5c9d3"/>
          <path d="M0 ${BASE + 39}h400" stroke="#aeb3bf" stroke-dasharray="10 6"/>
          <rect y="${BASE + 44}" width="400" height="${320 - BASE - 44}" fill="#c9573c"/>
          <path d="M0 ${BASE + 70}h400" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="14 12" opacity=".6"/>
          ${lampGlow}<path d="M74 ${BASE + 38}V206" stroke="#2a2f45" stroke-width="3.5"/><path d="M66 206h16l-3-12h-10Z" fill="#2a2f45"/><rect x="69" y="198" width="10" height="7" rx="1" fill="${lit ? "#ffd56b" : "#e3edf7"}"/>
          <g class="street-tulips" transform="translate(330 ${BASE + 18})">
            <rect x="-22" y="6" width="44" height="14" rx="3" fill="#8c5a3c"/>
            ${[-15, -5, 5, 15].map((tx, i) => `<g class="street-tulip" style="transform-origin:${tx}px 8px;animation-delay:${i * .4}s"><path d="M${tx} 8v-14" stroke="#3a9a4a" stroke-width="2"/><path d="M${tx - 4} -6c0-6 2-8 4-9 2 1 4 3 4 9-2 2-6 2-8 0Z" fill="${["#ff4d4d", "#ffc23d", "#ff5ca8", "#ff7a1a"][i]}"/></g>`).join("")}
          </g>
        </g>
      </svg>
      <div class="street-hud">
        <span class="street-chip street-chip-streak" aria-label="${streak} دن مسلسل"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-4-1-6 1-9Z" fill="#ff7a1a"/><path d="M12 12c1 2 3 3 3 5a3 3 0 0 1-6 0c0-1 1-2 1-3 1 1 2 0 2-2Z" fill="#ffc23d"/></svg><b class="latin">${streak}</b></span>
        <span class="street-chip street-chip-xp" aria-label="${xp} پوائنٹس"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21.1l1.4-7L2 9.3l7-.8Z" fill="#ffc23d" stroke="#e09b00" stroke-width="1.5" stroke-linejoin="round"/></svg><b class="latin">${xp}</b></span>
      </div>
      <div class="street-cat" data-action="street-cat" role="button" tabindex="0" aria-label="${NU.cat.NAME} سے بات کریں">${NU.cat.render({ size: 150 })}</div>
      <div class="street-bubble" role="status" aria-live="polite">
        <strong class="latin street-bubble-nl" dir="ltr">${t.greet}</strong><small>${t.urdu}</small>
        <button class="street-bubble-speak" data-action="speak" data-speak="${esc(t.greet.replace("!", ""))}" data-regular="true" aria-label="Nederlands آواز سنیں"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"/></svg></button>
      </div>
    </section>`;
  }

  // ---- Behaviour -------------------------------------------------------------
  let parallaxBound = false, frame = 0, tilt = { x: 0, y: 0 }, phrase = -1;

  function applyParallax() {
    frame = 0;
    const street = document.querySelector(".street");
    if (!street) return;
    const scroll = Math.min(window.scrollY, 400);
    street.querySelectorAll(".street-layer").forEach((layer) => {
      const depth = Number(layer.dataset.depth);
      const dx = tilt.x * depth * 10;
      const dy = scroll * (0.35 - depth * 0.3) + tilt.y * depth * 4;
      layer.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`;
    });
  }
  const queue = () => { if (!frame) frame = requestAnimationFrame(applyParallax); };

  function bindParallax() {
    if (parallaxBound) return;
    parallaxBound = true;
    addEventListener("scroll", () => { if (NU.motion.level() !== "off") queue(); }, { passive: true });
    addEventListener("pointermove", (e) => {
      if (NU.motion.level() !== "full" || e.pointerType === "touch") return;
      tilt = { x: (e.clientX / innerWidth - 0.5) * 2, y: (e.clientY / innerHeight - 0.5) * 2 };
      queue();
    }, { passive: true });
    addEventListener("deviceorientation", (e) => {
      if (NU.motion.level() !== "full" || e.gamma == null) return;
      tilt = { x: Math.max(-1, Math.min(1, e.gamma / 25)), y: Math.max(-1, Math.min(1, (e.beta - 45) / 30)) };
      queue();
    }, { passive: true });
  }

  function say(street, nl, ur) {
    const bubble = street.querySelector(".street-bubble");
    if (!bubble) return;
    bubble.querySelector(".street-bubble-nl").textContent = nl;
    bubble.querySelector("small").textContent = ur;
    bubble.querySelector(".street-bubble-speak").dataset.speak = nl.replace(/[!?]$/, "");
    bubble.classList.add("is-open");
    NU.motion.drop(bubble);
    NU.cat.act(street.querySelector(".nu-cat"), "talk", 1300);
  }

  // `entered` is true when Today was just opened; re-renders on the same screen keep Pim parked.
  function mount(street, { entered = true } = {}) {
    if (!street) return;
    bindParallax();
    applyParallax();
    const catBox = street.querySelector(".street-cat");
    const cat = catBox?.querySelector(".nu-cat");
    street.querySelector(".street-door")?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.currentTarget.dispatchEvent(new MouseEvent("click", { bubbles: true })); }
    });
    catBox?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); catBox.dispatchEvent(new MouseEvent("click", { bubbles: true })); }
    });
    const level = NU.motion.level();
    if (!entered || level === "off") {
      street.querySelector(".street-bubble")?.classList.add("is-open");
      return;
    }
    street.classList.add("is-arriving");
    const ride = NU.motion.animate(catBox, [{ transform: "translateX(-115vw)" }, { transform: "translateX(0)" }], { duration: 1500, easing: "cubic-bezier(.2,.7,.3,1)" });
    NU.cat.pedalFor(cat, { duration: 1500, distance: 420 });
    setTimeout(() => NU.sound.play("bell"), 1100);
    (ride?.finished || Promise.resolve()).then(() => {
      street.classList.remove("is-arriving");
      NU.cat.act(cat, "brake");
      setTimeout(() => {
        NU.cat.act(cat, "wave");
        say(street, street.querySelector(".street-bubble-nl").textContent, street.querySelector(".street-bubble small").textContent);
      }, 260);
    }, () => {});
  }

  function poke(street) {
    const cat = street?.querySelector(".nu-cat");
    if (!cat) return;
    phrase = (phrase + 1) % PHRASES.length;
    NU.sound.play("meow");
    NU.haptics.play("select");
    NU.cat.act(cat, "hop");
    NU.cat.mood(cat, "happy");
    setTimeout(() => say(street, ...PHRASES[phrase]), 350);
  }

  // Door opens, the camera pushes in, and warm light fills the screen before the lesson appears.
  function enterDoor(door) {
    const art = door?.closest(".street-art");
    if (!door || NU.motion.level() === "off") return Promise.resolve(() => {});
    NU.sound.play("unlock");
    NU.haptics.play("success");
    const frame = art.getBoundingClientRect(), leaf = door.querySelector(".street-door-leaf"), target = leaf.getBoundingClientRect();
    const originX = target.left - frame.left + target.width / 2, originY = target.top - frame.top + target.height * 0.6;
    // SVG parts cannot turn in 3D, so the door swings open as a horizontal squeeze from its hinge.
    NU.motion.animate(leaf, [{ transform: "scaleX(1)" }, { transform: "scaleX(.12)" }], { duration: 420, fill: "forwards", easing: "ease-out" });
    // Pim rides off ahead of the camera; the bubble and chips step out of the way.
    const street = door.closest(".street");
    const catBox = street?.querySelector(".street-cat");
    NU.motion.animate(catBox, [{ transform: "translateX(0)" }, { transform: "translateX(110vw)" }], { duration: 700, fill: "forwards", easing: "cubic-bezier(.5,0,.8,.6)" });
    NU.cat.pedalFor(catBox?.querySelector(".nu-cat"), { duration: 700, distance: 380, easeOut: false });
    street?.querySelectorAll(".street-bubble,.street-hud").forEach((el) => NU.motion.animate(el, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: "forwards" }));
    NU.motion.animate(art, [{ transform: "scale(1)", transformOrigin: `${originX}px ${originY}px` }, { transform: "scale(5)", transformOrigin: `${originX}px ${originY}px` }], { duration: 760, delay: 220, fill: "forwards", easing: "cubic-bezier(.6,0,.4,1)" });
    const light = document.createElement("div");
    light.className = "street-door-light";
    document.body.append(light);
    const fill = light.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 700, fill: "both" });
    return fill.finished.then(() => () => {
      light.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 420, fill: "forwards" }).finished.then(() => light.remove(), () => light.remove());
    }, () => () => light.remove());
  }

  return { render, mount, poke, enterDoor, timeOfDay };
})();
