/* Journey map: each unit is a building on a winding Dutch road; lessons are stops along it.
   The finished stretch is red bike path, the road ahead is still dotted. Pim rides to the
   next lesson, finished units light up, and tapping a stop opens a small card. */
window.NU = window.NU || {};
NU.map = (() => {
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const GAP = 98, PAD = 58;
  const UNIT_COLORS = ["#ff7a1a", "#2b6bff", "#3dc25d", "#8a5cff", "#ff5ca8", "#e09b00", "#16a3b8", "#d9573c", "#5a6be0"];

  // Each unit gets a building that matches what it teaches.
  const KINDS = [
    [/gemeente|forms/, "townhall"], [/bank|bill/, "bank"], [/message|email/, "post"],
    [/health|doctor|body/, "clinic"], [/transport|travel|movement|going-out/, "station"],
    [/shop|food|complaint/, "shop"], [/letter/, "school"], [/school|work/, "office"],
    [/number|time/, "clock"], [/start-speaking|questions|personal|help/, "cafe"],
    [/family|people|sentences|home|housing|routine|things/, "home"]
  ];
  const kindFor = (id) => (KINDS.find(([re]) => re.test(id)) || [null, "home"])[1];
  const SIGNS = {
    cafe: '<path d="M-7-4h12v6a6 6 0 0 1-12 0Z" fill="#fff"/><path d="M5-2h3a2.5 2.5 0 0 1 0 5H5" fill="none" stroke="#fff" stroke-width="2"/>',
    school: '<text x="0" y="4" text-anchor="middle" font-size="10" font-weight="800" fill="#fff" font-family="DM Sans,sans-serif">ABC</text>',
    home: '<path d="M-8 0 0-7l8 7" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-5.5-1v8h11v-8" fill="#fff"/><rect x="-1.8" y="2" width="3.6" height="5" rx="1.2" fill="#2a2f45"/>',
    clock: '<circle r="7" fill="#fff"/><path d="M0-4V0l3 2" stroke="#2a2f45" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
    station: '<rect x="-8" y="-6" width="16" height="11" rx="3" fill="#fff"/><path d="M-6-2h12" stroke="#2b6bff" stroke-width="2"/><circle cx="-4" cy="7" r="1.6" fill="#fff"/><circle cx="4" cy="7" r="1.6" fill="#fff"/>',
    shop: '<path d="M-8-5h3l2 9h9l2-6H-4" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/><circle cx="-2" cy="7" r="1.6" fill="#fff"/><circle cx="5" cy="7" r="1.6" fill="#fff"/>',
    clinic: '<path d="M-2.5-8h5v5.5H8v5H2.5V8h-5V2.5H-8v-5h5.5Z" fill="#fff"/>',
    office: '<rect x="-8" y="-4" width="16" height="11" rx="2" fill="#fff"/><path d="M-3-4v-3h6v3" fill="none" stroke="#fff" stroke-width="2"/>',
    townhall: '<path d="M-8-1 0-7l8 6Z" fill="#fff"/><path d="M-6 0v6M-2 0v6M2 0v6M6 0v6M-8 7h16" stroke="#fff" stroke-width="1.8"/>',
    bank: '<text x="0" y="5" text-anchor="middle" font-size="14" font-weight="800" fill="#fff" font-family="DM Sans,sans-serif">€</text>',
    post: '<rect x="-8" y="-5" width="16" height="11" rx="2" fill="#fff"/><path d="m-8-4 8 6 8-6" fill="none" stroke="#ff7a1a" stroke-width="1.8"/>'
  };

  const shade = NU.pimParts.shadeOf;
  let stripeId = 0;

  // A small gabled building in the street's style (one hard shade, sills under the windows);
  // `state` is "lit", "open" or "ahead".
  function building(kind, color, state) {
    const lit = state === "lit";
    const glass = lit ? "#ffd56b" : "#e3f2ff";
    const tall = kind === "clock" || kind === "office";
    const h = tall ? 92 : 82, top = 112 - h;
    const roof = (c) => kind === "townhall" || kind === "bank"
      ? `<path d="M10 ${top}L60 ${top - 22}L110 ${top}Z" fill="${c}"/>`
      : kind === "station"
        ? `<path d="M10 ${top}q50-34 100 0Z" fill="${c}"/>`
        : kind === "clock"
          ? `<path d="M34 ${top}l26-26 26 26Z" fill="${c}"/>`
          : `<path d="M20 ${top}v-10h10v-10h10v-10h40v10h10v10h10v10Z" fill="${c}"/>`;
    const bodyX = kind === "clock" ? 34 : 14, bodyW = kind === "clock" ? 52 : 92;
    const cols = kind === "clock" ? 2 : 3, rows = tall ? 3 : 2;
    let windows = "";
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const w = 12, gap = (bodyW - cols * w) / (cols + 1);
        const wx = bodyX + gap + c * (w + gap), wy = top + 10 + r * 24;
        windows += `<rect x="${wx.toFixed(1)}" y="${wy}" width="${w}" height="15" rx="6" fill="${glass}"/><rect x="${(wx - 2).toFixed(1)}" y="${wy + 14}" width="${w + 4}" height="3.4" rx="1.7" fill="#fff"/>`;
      }
    }
    // Each building needs its own pattern id, or every awning takes the first building's colour.
    const stripes = `map-stripes-${++stripeId}`;
    const awning = kind === "cafe" || kind === "shop"
      ? `<path d="M12 ${112 - 30}h96l-6 10H18Z" fill="#fff"/><path d="M12 ${112 - 30}h96l-6 10H18Z" fill="url(#${stripes})"/>` : "";
    const columns = kind === "townhall" || kind === "bank"
      ? `<g fill="#ffffffaa">${[24, 44, 70, 90].map((x) => `<rect x="${x}" y="${112 - 38}" width="6" height="38" rx="2"/>`).join("")}</g>` : "";
    const clockFace = kind === "clock" || kind === "station"
      ? `<circle cx="60" cy="${top - 10}" r="9" fill="#fff" stroke="#2a2f45" stroke-width="2"/><path d="M60 ${top - 15}v5l3 2" stroke="#2a2f45" stroke-width="1.8" fill="none"/>` : "";
    // The sign hangs in the gable; the clock tower and station use their clock instead.
    const sign = kind === "clock" || kind === "station" ? "" : `<g transform="translate(60 ${top - 13})"><circle r="11" fill="#2a2f45" opacity=".9"/>${SIGNS[kind]}</g>`;
    const flag = lit ? `<g class="map-flag"><path d="M60 ${top - 30}v-22" stroke="#2a2f45" stroke-width="2"/><path class="map-flag-cloth" d="M60 ${top - 52}h16l-4 5 4 5H60Z" fill="#ff4d4d"/></g>` : "";
    const sparkles = lit ? `<g class="map-sparkles" fill="#ffc23d">${[[14, 20], [104, 30], [96, 4]].map(([x, y], i) => `<path style="animation-delay:${i * .5}s" d="M${x} ${y - 6}l1.8 4.2 4.2 1.8-4.2 1.8-1.8 4.2-1.8-4.2-4.2-1.8 4.2-1.8Z"/>`).join("")}</g>` : "";
    return `<svg class="map-building map-building-${state}" viewBox="0 -40 120 156" aria-hidden="true">
      <defs><pattern id="${stripes}" width="12" height="10" patternUnits="userSpaceOnUse"><rect width="6" height="10" fill="${color}"/></pattern></defs>
      <ellipse cx="60" cy="113" rx="54" ry="5" fill="#1f243318"/>
      <g transform="translate(-3 3)">${roof(shade(color))}<rect x="${bodyX}" y="${top}" width="${bodyW}" height="${h}" fill="${shade(color)}"/></g>
      ${roof(color)}<rect x="${bodyX}" y="${top}" width="${bodyW}" height="${h}" fill="${color}"/><rect x="${bodyX}" y="${top}" width="${bodyW}" height="3" fill="#ffffff55"/>${clockFace}${windows}${columns}${awning}
      <rect x="51" y="${112 - 22}" width="18" height="22" rx="9" fill="${shade(color, 0.5)}"/>
      ${sign}
      ${flag}${sparkles}
    </svg>`;
  }

  // Decorations sit in their own small SVGs so the stretched road viewBox never distorts them.
  const deco = (x, y, art) => `<span class="map-deco" style="left:${x}%;top:${y}px" aria-hidden="true"><svg viewBox="-16 -20 32 34">${art}</svg></span>`;
  const tree = (x, y) => deco(x, y, '<rect x="-2" y="0" width="4" height="12" rx="2" fill="#b9773d"/><circle cx="-1.5" cy="-4.5" r="11" fill="#26963f"/><circle cy="-6" r="11" fill="#3dc25d"/><circle cx="-4" cy="-10" r="3" fill="#9be3ab"/>');
  const tulips = (x, y) => deco(x, y, [-8, 0, 8].map((tx, i) => `<path d="M${tx} 12v-8" stroke="#26963f" stroke-width="2" stroke-linecap="round"/><path d="M${tx - 3.5} -4q0 7 3.5 7t3.5-7l-1.8 1.6L0-6l-1.7 3.6Z" fill="${["#ff4d4d", "#ffc23d", "#ff5ca8"][i]}" stroke="${["#ff4d4d", "#ffc23d", "#ff5ca8"][i]}" stroke-width="1.4" stroke-linejoin="round"/>`).join(""));

  function nodeIcon(lesson) {
    if (lesson.trophy) return '<path d="M8 4h8v5a4 4 0 0 1-8 0Z M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 20h6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>';
    if (lesson.secure) return '<path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.3 6L12 16.4 6.6 19.4l1.3-6L3.4 9.3l6-.7Z" fill="currentColor"/>';
    if (lesson.done) return '<path d="m5 12.5 4.5 4.5L19 7" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>';
    if (lesson.current) return '<path d="M9 6.5v11l9-5.5Z" fill="currentColor"/>';
    if (lesson.mission) return '<path d="M6 21V4M6 5h11l-2 3.5 2 3.5H6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>';
    return "";
  }

  function render({ chapter, units, completed, total, nextChapter = null }) {
    const percent = total ? Math.round((completed / total) * 100) : 0;
    let lessonNumber = 0;
    const sections = units.map((unit, u) => {
      const color = unit.trophy ? "#e09b00" : UNIT_COLORS[u % UNIT_COLORS.length];
      const kind = kindFor(unit.id);
      const doneCount = unit.lessons.filter((l) => l.done).length;
      const state = doneCount === unit.lessons.length ? "lit" : doneCount || unit.lessons.some((l) => l.current) ? "open" : "ahead";
      const left = u % 2 === 0;                       // building side
      const centre = left ? 64 : 36, amp = 14;
      const n = unit.lessons.length;
      const height = Math.max(PAD * 2 + (n - 1) * GAP, 236);   // short units still need room for their building
      const points = unit.lessons.map((_, i) => ({ x: centre + amp * Math.sin(i * 1.15 + (left ? 0.4 : 2.2)), y: PAD + i * GAP }));
      const pathFrom = (pts, startY, endY) => {
        let d = `M${pts[0].x.toFixed(2)} ${startY}L${pts[0].x.toFixed(2)} ${pts[0].y}`;
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1], b = pts[i];
          d += `C${a.x.toFixed(2)} ${a.y + GAP / 2} ${b.x.toFixed(2)} ${b.y - GAP / 2} ${b.x.toFixed(2)} ${b.y}`;
        }
        if (endY != null) d += `L${pts[pts.length - 1].x.toFixed(2)} ${endY}`;
        return d;
      };
      // The paved stretch runs to the last finished stop (or the current one).
      const reached = unit.lessons.reduce((acc, l, i) => (l.done || l.current ? i : acc), -1);
      const allDone = doneCount === n;
      const road = pathFrom(points, 0, height);
      const paved = reached >= 0 ? pathFrom(points.slice(0, reached + 1), 0, allDone ? height : null) : "";
      const nodes = unit.lessons.map((lesson, i) => {
        lessonNumber += 1;
        const p = points[i];
        const status = lesson.trophy ? "trophy" : lesson.secure ? "secure" : lesson.done ? "done" : lesson.current ? "current" : "ahead";
        const statusText = { trophy: "آخری مشن", secure: "مہارت پکی", done: "مکمل", current: "اگلا سبق", ahead: "آگے" }[status];
        return `<button class="map-node map-node-${status} ${lesson.mission ? "is-mission" : ""}" style="left:${p.x.toFixed(2)}%;top:${p.y}px" data-action="map-node" data-lesson="${esc(lesson.id)}"
          data-title="${esc(lesson.title)}" data-minutes="${lesson.minutes}" data-status="${status}" data-number="${lessonNumber}" aria-label="${esc(`سبق ${lessonNumber}: ${lesson.title} — ${statusText}`)}">
          <span class="map-node-face">${nodeIcon(lesson) ? `<svg viewBox="0 0 24 24" aria-hidden="true">${nodeIcon(lesson)}</svg>` : `<b class="latin">${lessonNumber}</b>`}</span>
          ${lesson.current ? '<span class="map-node-ring" aria-hidden="true"></span>' : ""}
        </button>`;
      }).join("");
      const midY = PAD + ((n - 1) * GAP) / 2;
      const scenery = n >= 3
        ? `${tree(left ? 10 : 90, Math.max(30, midY - 92))}${tulips(left ? 25 : 75, Math.max(40, midY - 82))}`
        : "";
      return `<section class="map-unit map-unit-${state} ${unit.trophy ? "map-unit-trophy" : ""}" style="--unit:${color}" data-unit="${esc(unit.id)}">
        <header class="map-banner">
          <span class="map-banner-num latin">${unit.trophy ? "★" : u + 1}</span>
          <div><strong>${esc(unit.title)}</strong>${unit.goal ? `<small>${esc(unit.goal)}</small>` : ""}</div>
          <span class="map-banner-count latin">${doneCount}/${n}</span>
        </header>
        <div class="map-trail" style="height:${height}px">
          <svg class="map-road" viewBox="0 0 100 ${height}" preserveAspectRatio="none" aria-hidden="true">
            <path class="map-road-base" d="${road}"/><path class="map-road-ahead" d="${road}"/>
            ${paved ? `<path class="map-road-paved" d="${paved}"/><path class="map-road-line" d="${paved}"/>` : ""}
          </svg>
          ${scenery}
          <div class="map-building-slot ${left ? "is-left" : "is-right"}" style="top:${Math.max(0, midY - 70)}px">${building(unit.trophy ? "townhall" : kind, color, state)}</div>
          ${nodes}
        </div>
      </section>`;
    }).join("");

    return `<section class="map" data-chapter="${esc(chapter.id)}">
      <header class="map-hero">
        <div class="map-hero-ring" style="--p:${percent}"><span class="latin">${percent}%</span></div>
        <div><span class="map-hero-kicker">آپ کا سفر</span><h1>${esc(chapter.title)}</h1><p>${esc(chapter.subtitle || "")}</p><small>${completed} / ${total} سبق مکمل</small><button class="map-passport" data-action="passport"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="11" r="3.2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 17h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>پاسپورٹ</button></div>
      </header>
      ${sections}
      <footer class="map-finish">
        <svg class="map-finish-flag" viewBox="0 0 48 48" aria-hidden="true"><path d="M10 44V6" stroke="#2a2f45" stroke-width="3" stroke-linecap="round"/><path d="M11 7h28v20H11Z" fill="#fff" stroke="#2a2f45" stroke-width="2"/><path d="M11 7h7v5h-7Zm14 0h7v5h-7Zm-7 5h7v5h-7Zm14 0h7v5h-7Zm-21 5h7v5h-7Zm14 0h7v5h-7Zm-7 5h7v5h-7Zm14 0h7v5h-7Z" fill="#2a2f45"/></svg>
        <strong>${completed >= total ? `${esc(chapter.id.toUpperCase())} مکمل — شاباش!` : `${esc(chapter.id.toUpperCase())} کی منزل`}</strong>
        <small>${nextChapter ? `اس کے بعد ${esc(nextChapter.id.toUpperCase())} کا سفر شروع ہوتا ہے۔` : "یہ آخری باب ہے۔ آپ نے بہت لمبا سفر طے کیا!"}</small>
        ${nextChapter ? `<button class="secondary-button map-finish-next" data-action="chapter" data-chapter="${esc(nextChapter.id)}"><span class="latin">${esc(nextChapter.id.toUpperCase())}</span> کا نقشہ دیکھیں</button>` : ""}
      </footer>
      <div class="map-pim" aria-hidden="true"><span class="map-pim-say">یہاں سے شروع!</span>${NU.cat.render({ size: 92 })}</div>
    </section>`;
  }

  // ---- Behaviour -------------------------------------------------------------
  let card = null;
  function closeCard() {
    card?.remove();
    card = null;
    document.querySelectorAll(".map-node.is-open").forEach((n) => n.classList.remove("is-open"));
  }

  function openCard(node, onOpen) {
    const wasOpen = node.classList.contains("is-open");
    closeCard();
    if (wasOpen) return;
    node.classList.add("is-open");
    NU.sound.play("pop");
    NU.haptics.play("tap");
    const { title, minutes, status, number, lesson } = node.dataset;
    const label = { current: "شروع کریں", done: "دوبارہ کریں", secure: "دوبارہ کریں", trophy: "مشن دیکھیں", ahead: "سبق دیکھیں" }[status];
    const tag = { current: "اگلا سبق", done: "مکمل", secure: "مہارت پکی ★", trophy: "آخری مشن", ahead: `سبق ${number}` }[status];
    card = document.createElement("div");
    card.className = `map-card map-card-${status}`;
    card.setAttribute("role", "dialog");
    card.setAttribute("aria-label", title);
    card.innerHTML = `<span class="map-card-tag">${tag}</span><strong dir="auto">${esc(title)}</strong><small>تقریباً ${esc(minutes)} منٹ</small><button class="primary-button map-card-go">${label}</button>`;
    const trail = node.closest(".map-trail");
    card.style.top = `${node.offsetTop + 44}px`;
    trail.append(card);
    card.querySelector(".map-card-go").addEventListener("click", (e) => { e.stopPropagation(); closeCard(); onOpen(lesson); });
    NU.motion.drop(card);
    // Keyboard users land on the card's action; Escape returns them to the stop.
    card.querySelector(".map-card-go").focus({ preventScroll: true });
    card.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeCard(); node.focus(); } });
    if (card.getBoundingClientRect().bottom > innerHeight - 90) card.scrollIntoView({ block: "center", behavior: NU.motion.level() === "off" ? "auto" : "smooth" });
  }

  // ---- Scroll ride ------------------------------------------------------------
  // Pim rides the road as you scroll. She follows a reading line down the page with a little spring lag,
  // pedals in step with the distance she covers, ducks under the unit banners like tunnels and high-fives
  // finished stops as she passes. When scrolling stops she rides on to the nearest stop and pulls over
  // beside it; if that is the next lesson she rings her bell and points it out.
  const PARK = 80, PIM_W = 92, PIM_H = 73;
  let ride = null;

  function roadPoints(map) {
    return [...map.querySelectorAll(".map-node")].map((node) => {
      const trail = node.closest(".map-trail");
      return { node, status: node.dataset.status, top: trail.offsetTop, x: trail.offsetLeft + node.offsetLeft, y: trail.offsetTop + node.offsetTop, left: trail.offsetLeft, width: trail.clientWidth };
    });
  }
  function roadAt(points, y) {
    if (y <= points[0].y) return points[0];
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1], b = points[i];
      if (y <= b.y) return { ...b, x: a.x + ((b.x - a.x) * (y - a.y)) / (b.y - a.y) };
    }
    return points[points.length - 1];
  }
  const sideAt = (spot) => (spot.x > spot.left + spot.width / 2 ? -1 : 1);       // park on the roomier side

  function draw(r, lean = 0) {
    const spot = roadAt(r.points, r.y);
    const raw = spot.x + r.off;
    // Parked Pim stays inside the trail; only the ride-in starts beyond it.
    const x = Math.abs(r.off) > PARK + 1 ? raw : Math.max(spot.left + PIM_W / 2 - 10, Math.min(spot.left + spot.width - PIM_W / 2 + 10, raw));
    // Parked near the top of a unit, Pim drops a little so her speech clears the banner.
    let top = r.y + 16 - PIM_H;
    const floor = spot.top + 48;
    if (top < floor) top += (floor - top) * Math.min(1, Math.abs(r.off) / PARK);
    r.pim.style.transform = `translate(${(x - PIM_W / 2).toFixed(1)}px,${top.toFixed(1)}px) rotate(${lean.toFixed(2)}deg)`;
    return x;
  }

  function face(r, left) {
    r.cat.classList.toggle("cat-facing-left", left);
  }

  function say(r, on) {
    r.pim.classList.toggle("is-saying", on);
    if (on) NU.motion.drop(r.pim.querySelector(".map-pim-say"));
  }

  // Finished stops get a bump and a sparkle as Pim rides past them.
  function cheerPast(r, from, to, speed) {
    const lo = Math.min(from, to), hi = Math.max(from, to);
    r.points.forEach((p) => {
      if (p.y <= lo || p.y > hi || !/done|secure/.test(p.status)) return;
      NU.motion.bump(p.node.querySelector(".map-node-face"));
      // Sparkles live in screen space, so a fast fling would leave them hanging behind.
      if (speed < 900) NU.motion.burst(p.node, { count: 6, spread: 46, gravity: 10, shapes: ["star", "dot"] });
      const now = performance.now();
      if (now - r.lastCheer > 90) { NU.sound.play("xp"); NU.haptics.play("tap"); r.lastCheer = now; }
    });
  }

  // While scrolling Pim follows the middle of the screen; once it stops she rides to the nearest stop.
  function targetY(r, riding) {
    const line = innerHeight * 0.5 - r.map.getBoundingClientRect().top;
    if (riding) return Math.max(r.points[0].y, Math.min(r.points[r.points.length - 1].y, line));
    return r.points.reduce((best, p) => (Math.abs(p.y - line) < Math.abs(best.y - line) ? p : best)).y;
  }

  function step(now) {
    const r = ride;
    if (!r?.map.isConnected) { ride = null; return; }
    const dt = Math.min(0.05, (now - r.lastT) / 1000 || 1 / 60);
    r.lastT = now;
    const riding = now - r.lastScroll < 420;
    const ty = targetY(r, riding);
    const prevY = r.y;
    r.y += (ty - r.y) * (1 - Math.exp(-dt * 7));
    const spot = roadAt(r.points, r.y);
    const wantOff = riding ? 0 : sideAt(spot) * PARK;
    r.off += (wantOff - r.off) * (1 - Math.exp(-dt * 5));
    const prevX = r.x;
    const dy = r.y - prevY;
    // Lean into the ride a little; speed lines appear when scrolling fast.
    const speed = Math.abs(dy) / dt;
    r.x = draw(r, Math.max(-7, Math.min(7, (dy / dt) / 160)) * (r.cat.classList.contains("cat-facing-left") ? -1 : 1));
    const dx = r.x - prevX;
    const dist = Math.hypot(dx, dy);
    if (Math.abs(dx) > 0.25) face(r, dx < 0);
    r.pim.classList.toggle("is-zooming", speed > 650);
    r.pim.style.setProperty("--trail", `${Math.atan2(-dy, -dx)}rad`);
    // Wheels turn by distance travelled (rendered wheel radius is about 12px).
    r.wheel += dist / 12;
    r.spokes.forEach((s) => { s.style.transform = `rotate(${r.wheel}rad)`; });
    NU.cat.setCrank(r.cat, r.crank0 + r.wheel * 0.55);
    cheerPast(r, prevY, r.y, speed);
    if (dist > 0.6 && r.pim.classList.contains("is-saying")) say(r, false);
    const moving = riding || Math.abs(ty - r.y) > 0.4 || Math.abs(wantOff - r.off) > 0.4;
    if (moving) { r.raf = requestAnimationFrame(step); return; }
    // Settled: face the road, brake, and if parked at the next lesson, point it out.
    r.raf = 0;
    r.pim.classList.remove("is-zooming");
    face(r, sideAt(spot) > 0);
    NU.cat.act(r.cat, "brake");
    const atFrontier = Math.abs(r.y - r.frontier.y) < 24 && r.frontier.status === "current";
    if (atFrontier) {
      if (r.rodeSinceArrival) NU.sound.play("bell");
      setTimeout(() => { NU.cat.act(r.cat, "wave"); NU.cat.act(r.cat, "talk", 900); }, 260);
      say(r, true);
    }
    r.rodeSinceArrival = false;
  }

  function kick() {
    if (!ride) return;
    ride.lastScroll = performance.now();
    ride.rodeSinceArrival = true;
    if (!ride.raf) { ride.lastT = performance.now(); ride.raf = requestAnimationFrame(step); }
  }
  addEventListener("scroll", () => ride && kick(), { passive: true, capture: true });
  addEventListener("resize", () => { if (ride?.map.isConnected) { ride.points = roadPoints(ride.map); ride.frontier = ride.points[ride.frontierIndex]; draw(ride); } }, { passive: true });

  function startRide(map, current, { intro }) {
    if (ride?.raf) cancelAnimationFrame(ride.raf);
    ride = null;
    const pim = map.querySelector(".map-pim");
    const points = roadPoints(map);
    if (!pim || !points.length) { pim?.remove(); return; }
    const frontierIndex = current ? points.findIndex((p) => p.node === current) : points.length - 1;
    const frontier = points[frontierIndex];
    const cat = pim.querySelector(".nu-cat");
    map.append(pim);
    const side = sideAt(frontier);
    const r = {
      map, pim, cat, points, frontier, frontierIndex, spokes: [...cat.querySelectorAll(".cat-spokes")],
      y: frontier.y, x: undefined, off: side * PARK, wheel: 0, crank0: Number(cat.dataset.crank) || 0,
      lastScroll: 0, lastT: performance.now(), lastCheer: 0, raf: 0, rodeSinceArrival: false
    };
    r.x = draw(r);
    face(r, side > 0);
    if (NU.motion.level() === "off") { if (current) say(r, true); return; }
    ride = r;
    if (!intro) { if (current) say(r, true); return; }
    // Ride in from beyond the road on the parking side.
    r.off = side * (frontier.width + PIM_W);
    r.x = draw(r);
    face(r, side > 0);
    r.raf = requestAnimationFrame(step);
  }

  // Units completed since the map was last seen get a one-time light-up celebration.
  const LIT_KEY = "nederurdu-map-lit";
  function celebrateNewlyLit(map) {
    let seen = [];
    try { seen = JSON.parse(localStorage.getItem(LIT_KEY) || "[]"); } catch { seen = []; }
    const lit = [...map.querySelectorAll(".map-unit-lit")].map((u) => u.dataset.unit);
    const fresh = lit.filter((id) => !seen.includes(id));
    try { localStorage.setItem(LIT_KEY, JSON.stringify([...new Set([...seen, ...lit])])); } catch { /* Optional. */ }
    if (!fresh.length || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      const art = entry.target.querySelector(".map-building");
      NU.sound.play("unlock");
      NU.haptics.play("celebrate");
      NU.motion.jelly(art);
      NU.motion.burst(art, { count: 26, spread: 140, shapes: ["star", "dot"] });
    }), { threshold: 0.6 });
    fresh.forEach((id) => { const slot = map.querySelector(`[data-unit="${CSS.escape(id)}"] .map-building-slot`); if (slot) observer.observe(slot); });
  }

  function mount(map, { entered = true, onOpen = () => {} } = {}) {
    if (!map) return;
    closeCard();
    const current = map.querySelector(".map-node-current");
    map.querySelectorAll("[data-action='map-node']").forEach((node) => node.addEventListener("click", (e) => { e.stopPropagation(); openCard(node, onOpen); }));
    map.addEventListener("click", (e) => { if (!e.target.closest(".map-card")) closeCard(); });
    celebrateNewlyLit(map);
    if (!entered) { startRide(map, current, { intro: false }); return; }
    // Callers scroll to the top after rendering; wait for that, then bring the next stop into view.
    setTimeout(() => {
      current?.scrollIntoView({ block: "center", behavior: NU.motion.level() === "full" ? "smooth" : "auto" });
      setTimeout(() => startRide(map, current, { intro: true }), NU.motion.level() === "full" ? 450 : 0);
    }, 80);
    if (NU.motion.level() !== "off") NU.motion.stagger([...map.querySelectorAll(".map-banner")].slice(0, 3), "rise", { each: 90 });
  }

  const unitColor = (index) => UNIT_COLORS[Math.max(0, index) % UNIT_COLORS.length];

  return { render, mount, building, kindFor, unitColor, signIcon: (kind) => SIGNS[kind] || SIGNS.home };
})();
