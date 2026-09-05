import { runtime, runtimeCatalog } from "./runtime/browser/runtime-bridge.js";

(() => {
  "use strict";

  const app = document.querySelector("#app");
  const STORAGE_KEY = "nederurdu-v2-prototype-state";

  const PHASES = [
    { id: "scene", label: "منظر", short: "01", description: "بات سنیں اور موقع سمجھیں" },
    { id: "decode", label: "سمجھیں", short: "02", description: "معنی، آواز، اور لفظ" },
    { id: "notice", label: "قاعدہ دیکھیں", short: "03", description: "جملے کا کام دیکھیں" },
    { id: "rehearse", label: "مشق", short: "04", description: "مدد کے ساتھ جواب دیں" },
    { id: "act", label: "استعمال", short: "05", description: "اپنی بات بنائیں" },
    { id: "check", label: "نئی جانچ", short: "06", description: "نئے موقع پر خود جواب دیں" },
    { id: "complete", label: "تیار", short: "07", description: "جو سیکھا اسے محفوظ کریں" }
  ];

  const PEOPLE_LESSONS = runtimeCatalog;
  if (PEOPLE_LESSONS.length !== 5) throw new Error("NederUrdu V2 lesson catalog did not load.");

  const LEVELS = {
    foundation: {
      id: "foundation",
      short: "بنیاد",
      title: "Foundation",
      urdu: "آواز، حروف، اور ایپ کی مدد",
      progress: 0,
      worlds: [
        world("controls", "شروع کرنے کی تیاری", "Luisteren & bedienen", "آواز سنیں اور ضروری کنٹرول استعمال کریں", "headphones", "mint"),
        world("sounds", "پہلی آوازیں", "Klanken & letters", "اہم Dutch آواز اور لکھائی پہچانیں", "sound", "blue"),
        world("survival", "فوری مدد", "Hulp vragen", "دہرانے، آہستہ بولنے، اور مدد کے جملے", "lifebuoy", "saffron"),
        world("typing", "نام اور نمبر", "Naam & nummer", "اپنا نام، فون نمبر، اور چھوٹا جملہ لکھیں", "edit", "violet")
      ]
    },
    a1: {
      id: "a1",
      short: "A1",
      title: "Everyday Dutch",
      urdu: "روزمرہ زندگی میں بات چیت",
      progress: 6,
      worlds: [
        world("people", "لوگوں سے ملیں", "Mensen ontmoeten", "سلام، تعارف، نام، جگہ، اور خاندان", "people", "mint", PEOPLE_LESSONS),
        world("learning", "Dutch سیکھیں", "Nederlands leren", "کلاس، تاریخ، نمبر، مدد، اور ادب", "book", "blue"),
        world("home", "گھر اور محلہ", "Thuis & buurt", "کمرے، جگہ، پڑوسی، کرایہ، اور مسئلہ", "home", "terracotta"),
        world("market", "کھانا اور خریداری", "Eten & winkelen", "کھانا، قیمت، پسند، مارکیٹ، اور کاؤنٹر", "basket", "saffron"),
        world("health", "صحت", "Gezondheid", "جسم، تکلیف، ملاقات، دوا، اور ڈاکٹر", "health", "rose"),
        world("clothes", "کپڑے اور وقت", "Kleding & tijd", "رنگ، سائز، انتخاب، قیمت، اور کھلنے کا وقت", "clock", "violet"),
        world("travel", "سفر اور راستہ", "Reizen & plaats", "سمت، اجازت، اسٹیشن، بس، اور ٹائم ٹیبل", "train", "blue"),
        world("social", "فارغ وقت اور دوست", "Vrije tijd", "شوق، ویک اینڈ، فارم، منصوبہ، اور وضاحت", "spark", "mint")
      ]
    },
    a2: {
      id: "a2",
      short: "A2",
      title: "Independent Dutch",
      urdu: "عملی حالات میں زیادہ خود مختاری",
      progress: 0,
      worlds: [
        world("moving", "گھر اور منتقلی", "Wonen & verhuizen", "گھر بیان کریں، موازنہ کریں، اور دعوت کا جواب دیں", "home", "terracotta"),
        world("netherlands", "نیدرلینڈز میں زندگی", "Leven in Nederland", "رسم، موسم، ریسٹورنٹ، خبر، اور ماضی", "windmill", "blue"),
        world("family-school", "بچے اور خاندان", "Kinderen & gezin", "اسکول پیغام، ملاقات، مقصد، اور اطلاع آگے دینا", "school", "saffron"),
        world("services", "خریداری اور سروس", "Winkel & service", "آرڈر، شکایت، ہدایت، اور کام کی گفتگو", "basket", "rose"),
        world("education", "تعلیم اور تربیت", "Opleiding", "کورس، اصول، ماضی کا تجربہ، اور منصوبہ", "book", "violet"),
        world("jobs", "نوکری تلاش کریں", "Werk zoeken", "خالی جگہ، فون، فارم، درخواست، اور انٹرویو", "briefcase", "mint"),
        world("work", "کام کی جگہ", "Op het werk", "کام، حفاظت، بیماری، چھٹی، ساتھی، اور موازنہ", "helmet", "saffron"),
        world("public", "Gemeente اور عوامی زندگی", "Gemeente & publiek", "درخواست، مرمت، پولیس، خبر، اور سرکاری معلومات", "building", "blue")
      ]
    }
  };

  function world(id, urduTitle, dutchTitle, description, iconName, tone, lessons = null) {
    return { id, urduTitle, dutchTitle, description, iconName, tone, progress: id === "people" ? 18 : 0, lessons };
  }

  const saved = readSavedState();
  const progressStore = runtime.createProgressStore(localStorage);
  const restoredProgress = progressStore.load();
  let lastRenderedView = "";
  let overlayReturnAction = "";
  let activeSession = null;
  const savedResponses = saved.responses && typeof saved.responses === "object" ? saved.responses : {};
  Object.entries(restoredProgress.completedLessons).forEach(([lessonId, record]) => {
    if (!savedResponses[lessonId]) savedResponses[lessonId] = { ...record.responses };
  });
  if (saved.learnerName && !savedResponses["meet-neighbour"]) {
    savedResponses["meet-neighbour"] = { name: saved.learnerName };
  }
  const completedLessonIds = new Set([
    ...(Array.isArray(saved.completedLessons) ? saved.completedLessons : []),
    ...Object.keys(restoredProgress.completedLessons)
  ]);
  const state = {
    route: "today",
    level: saved.level || "a1",
    world: saved.world || "people",
    lessonId: saved.lessonId || "meet-neighbour",
    lessonMode: "brief",
    phase: 0,
    selectedAnswer: "",
    checked: false,
    responses: savedResponses,
    completedLessons: [...completedLessonIds].filter((id) => PEOPLE_LESSONS.some((lesson) => lesson.id === id)),
    reviewId: "",
    reviewSelectedAnswer: "",
    reviewChecked: false,
    reviewHadError: false,
    supportOpen: false,
    lessonMapOpen: false,
    lastRoute: saved.lastRoute || "journey"
  };

  function readSavedState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
    } catch (_error) {
      return {};
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      level: state.level,
      world: state.world,
      lessonId: state.lessonId,
      responses: state.responses,
      completedLessons: state.completedLessons,
      lastRoute: state.route === "lesson" ? state.lastRoute : state.route
    }));
  }

  function localizedToday() {
    const formatter = new Intl.DateTimeFormat("ur-PK", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
    const parts = formatter.formatToParts(new Date());
    const value = (type) => parts.find((part) => part.type === type)?.value || "";
    return `${value("weekday")} · ${value("day")} ${value("month")}`.trim();
  }

  function icon(name, className = "") {
    const paths = {
      today: '<path d="M5 5.8h14v13H5z"/><path d="M8 3v5M16 3v5M5 10h14"/><path d="m9 14 2 2 4-4"/>',
      journey: '<path d="M5 4.5 10 3l4 1.5L19 3v16.5L14 21l-4-1.5L5 21z"/><path d="M10 3v16.5M14 4.5V21"/><circle cx="15.7" cy="8" r="1.4"/>',
      practice: '<path d="M7 9v6M17 9v6M4 11v2M20 11v2M7 12h10"/><path d="M5 9h2v6H5zM17 9h2v6h-2z"/>',
      toolkit: '<path d="M4 7h16v12H4z"/><path d="M9 7V5h6v2M4 11h16M10 11v2h4v-2"/>',
      profile: '<circle cx="12" cy="8" r="3"/><path d="M5.5 20c.5-4 2.7-6 6.5-6s6 2 6.5 6"/>',
      speaker: '<path d="M5 10v4h3l4 3V7L8 10z"/><path d="M15 9c1 .8 1.5 1.8 1.5 3S16 14.2 15 15M17.5 6.5c1.7 1.5 2.5 3.3 2.5 5.5s-.8 4-2.5 5.5"/>',
      play: '<path d="m9 7 8 5-8 5z"/>',
      arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
      back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
      close: '<path d="m6 6 12 12M18 6 6 18"/>',
      chevron: '<path d="m8 10 4 4 4-4"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      lock: '<rect x="5" y="10" width="14" height="10" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
      wave: '<path d="M7 12V7.5a1.5 1.5 0 0 1 3 0V11M10 10V5.5a1.5 1.5 0 0 1 3 0V10M13 10V6.5a1.5 1.5 0 0 1 3 0v5M16 10V8.5a1.5 1.5 0 0 1 3 0V14c0 4-2.6 7-6.5 7H11c-2.3 0-4.2-1-5.4-2.8L3.3 15a1.5 1.5 0 0 1 2.4-1.8L7 14"/>',
      letters: '<path d="M5 5h6v14H5zM13 5h6v14h-6z"/><path d="M7 9h2M7 12h2M15 9h2M15 12h2"/>',
      pin: '<path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11z"/><circle cx="12" cy="10" r="2"/>',
      dialogue: '<path d="M4 5h12v10H9l-4 3v-3H4z"/><path d="M15 9h5v9h-3v3l-3-3h-3v-3"/>',
      flag: '<path d="M6 21V4M7 5h11l-2 4 2 4H7"/>',
      people: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3.5 20c.4-4 2.2-6 5.5-6s5.1 2 5.5 6M14 15c3.8-.5 5.8 1.2 6.5 5"/>',
      book: '<path d="M4 5.5C7 4.5 9.7 5 12 7v13c-2.3-2-5-2.5-8-1.5zM20 5.5c-3-1-5.7-.5-8 1.5v13c2.3-2 5-2.5 8-1.5z"/>',
      home: '<path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10M9 20v-6h6v6"/>',
      basket: '<path d="m5 9 2 11h10l2-11zM8 9l4-6 4 6M4 9h16"/>',
      health: '<path d="M12 21S4 16.5 4 10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11z"/><path d="M9 12h6M12 9v6"/>',
      clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      train: '<rect x="5" y="3" width="14" height="16" rx="4"/><path d="M8 7h8M8 12h8M8 19l-2 2M16 19l2 2"/><circle cx="9" cy="15.5" r="1"/><circle cx="15" cy="15.5" r="1"/>',
      spark: '<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z"/>',
      headphones: '<path d="M4 13v-2a8 8 0 0 1 16 0v2"/><path d="M4 12h3v7H5a1 1 0 0 1-1-1zM20 12h-3v7h2a1 1 0 0 0 1-1z"/>',
      sound: '<path d="M4 10v4h4l4 4V6l-4 4z"/><path d="M16 8c2 2.2 2 5.8 0 8"/>',
      lifebuoy: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="m5.5 5.5 3.7 3.7M14.8 14.8l3.7 3.7M18.5 5.5l-3.7 3.7M9.2 14.8l-3.7 3.7"/>',
      edit: '<path d="M4 20h4l11-11-4-4L4 16zM13 7l4 4"/>',
      windmill: '<path d="M10 10h4l2 11H8z"/><circle cx="12" cy="8" r="2"/><path d="m12 6-1-5 3 2M14 8l5-1-2 3M12 10l1 5-3-2M10 8 5 9l2-3"/>',
      school: '<path d="m3 10 9-6 9 6-9 5z"/><path d="M6 12v6c3 2 9 2 12 0v-6M21 10v6"/>',
      briefcase: '<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M9 7V4h6v3M3 12h18M10 12v2h4v-2"/>',
      helmet: '<path d="M4 15a8 8 0 0 1 16 0v3H4zM12 7v8M8 8.5 10 15M16 8.5 14 15"/>',
      building: '<path d="M3 9h18L12 3zM5 10v9M9 10v9M15 10v9M19 10v9M3 20h18"/>',
      calendar: '<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/>',
      route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h2a4 4 0 0 0 4-4v-4a4 4 0 0 1 4-4"/>',
      grammar: '<path d="M5 5h14M8 5v14M16 5v14M5 12h14M5 19h14"/>',
      saved: '<path d="M6 4h12v17l-6-4-6 4z"/>',
      mistake: '<path d="M12 3 2.5 20h19z"/><path d="M12 9v5M12 17h.01"/>',
      mic: '<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/>',
      eye: '<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle cx="12" cy="12" r="2.5"/>',
      help: '<circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.4 2.4 0 1 1 3.6 2.1c-1 .6-1.4 1.1-1.4 2.4M12 17h.01"/>'
    };
    return `<svg class="icon ${className}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.spark}</svg>`;
  }

  function logoMark() {
    return `<span class="logo-mark" aria-hidden="true"><i></i><b></b><em></em></span>`;
  }

  function render() {
    const parsed = parseHash();
    if (parsed) Object.assign(state, parsed);
    document.documentElement.dataset.route = state.route;
    document.documentElement.dataset.level = state.level;
    document.body.classList.toggle("lesson-active", state.route === "lesson");
    const viewKey = `${state.route}:${state.lessonId}:${state.lessonMode}`;
    const shouldResetScroll = viewKey !== lastRenderedView;
    lastRenderedView = viewKey;
    app.innerHTML = state.route === "lesson" ? renderLesson() : renderShell();
    requestAnimationFrame(() => app.querySelector(".screen-enter")?.classList.add("is-visible"));
    if (shouldResetScroll) requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
    if (state.supportOpen || state.lessonMapOpen) {
      requestAnimationFrame(() => app.querySelector("[role=dialog] button")?.focus());
    }
    saveState();
  }

  function parseHash() {
    const value = location.hash.replace(/^#\/?/, "");
    if (!value) return null;
    const parts = value.split("/").filter(Boolean);
    if (parts[0] === "lesson") {
      return {
        route: "lesson",
        lessonId: parts[1] || "meet-neighbour",
        lessonMode: parts[2] === "run" ? "run" : "brief"
      };
    }
    if (["today", "journey", "practice", "toolkit"].includes(parts[0])) {
      return { route: parts[0] };
    }
    return null;
  }

  function renderShell() {
    const content = {
      today: renderToday,
      journey: renderJourney,
      practice: renderPractice,
      toolkit: renderToolkit
    }[state.route]?.() || renderToday();

    return `
      <div class="product-shell">
        ${renderNavigation("rail")}
        <div class="product-canvas">
          ${renderTopbar()}
          <main class="screen-content screen-enter" id="main-content" tabindex="-1">
            ${content}
          </main>
          ${renderNavigation("bar")}
        </div>
      </div>
    `;
  }

  function renderNavigation(mode) {
    const items = [
      ["today", "today", "آج", "Today"],
      ["journey", "journey", "سفر", "Journey"],
      ["practice", "practice", "مشق", "Practice"],
      ["toolkit", "toolkit", "مدد", "Toolkit"]
    ];
    return `
      <nav class="primary-nav primary-nav-${mode}" aria-label="اصل حصے">
        ${mode === "rail" ? `<a class="rail-brand" href="#/today" data-route="today" aria-label="NederUrdu home">${logoMark()}<span class="latin">NU</span></a>` : ""}
        <div class="nav-items">
          ${items.map(([route, iconName, urdu, dutch]) => `
            <a class="nav-item ${state.route === route ? "active" : ""}" href="#/${route}" data-route="${route}" ${state.route === route ? 'aria-current="page"' : ""}>
              <span class="nav-item-icon">${icon(iconName)}</span>
              <span><b>${urdu}</b><small class="latin">${dutch}</small></span>
            </a>
          `).join("")}
        </div>
        ${mode === "rail" ? `<button class="rail-profile" data-action="profile" aria-label="پروفائل اور ترتیبات">${icon("profile")}<span class="status-pip"></span></button>` : ""}
      </nav>
    `;
  }

  function renderTopbar() {
    const level = LEVELS[state.level];
    const progress = level.id === "a1" ? Math.round((getPeopleProgress() / 8)) : level.progress;
    return `
      <header class="app-topbar">
        <a class="wordmark" href="#/today" data-route="today" aria-label="NederUrdu Today">
          ${logoMark()}
          <span><strong class="latin">Neder<span>Urdu</span></strong><small>اردو سے Nederlands تک</small></span>
        </a>
        <div class="topbar-actions">
          <button class="level-compass" data-action="open-journey" aria-label="موجودہ سطح ${level.short}">
            <span class="compass-ring" style="--progress:${progress * 3.6}deg"><b class="latin">${level.short}</b></span>
            <span><small>موجودہ راستہ</small><strong class="latin">${level.title}</strong></span>
            ${icon("chevron")}
          </button>
          <button class="profile-button" data-action="profile" aria-label="پروفائل اور ترتیبات">${icon("profile")}<span></span></button>
        </div>
      </header>
    `;
  }

  function renderToday() {
    const current = getCurrentLesson();
    const dueReviewCount = progressStore.dueReviews().length;
    const queuedReviewCount = progressStore.load().reviewQueue.length;
    const brief = current.brief;
    const worldComplete = getPeopleProgress() === 100;
    const stageTitle = worldComplete ? "Mensen ontmoeten voltooid" : current.title;
    const stageCopy = worldComplete
      ? "آپ نے پانچوں ملاقاتیں مکمل کر لی ہیں۔ اب مختصر دہرائی سے سلام، نام، جگہ، اور سوال تازہ رکھیں۔"
      : current.canDo;
    const stageDutch = worldComplete ? "Goed gedaan. Blijf oefenen." : brief.dutch;
    const primaryHref = worldComplete ? "#/practice" : `#/lesson/${current.id}/brief`;
    const primaryData = worldComplete ? 'data-route="practice"' : `data-lesson="${current.id}"`;
    return `
      <section class="today-screen" aria-labelledby="today-title">
        <div class="screen-heading today-heading">
          <div>
            <span class="overline"><i></i> ${localizedToday()}</span>
            <h1 id="today-title">السلام علیکم</h1>
            <p>آج ایک حقیقی Dutch ملاقات کے لیے تیار ہوں۔</p>
          </div>
          <div class="week-rhythm" aria-label="اس ہفتے تین مشق کے دن">
            <span class="done">پ</span><span class="done">م</span><span class="done">ب</span><span>ج</span><span>ش</span>
            <small>اس ہفتے <b class="latin">3</b> دن</small>
          </div>
        </div>

        <article class="daily-stage tone-mint">
          <div class="stage-atmosphere" aria-hidden="true"><i></i><i></i><i></i></div>
          ${renderLessonArtwork(current, "hero")}
          <div class="daily-stage-copy">
            <div class="stage-meta"><span class="world-number latin">A1 · ${worldComplete ? "✓" : current.number}</span><span>لوگوں سے ملیں</span></div>
            <p class="stage-eyebrow">${worldComplete ? "دنیا مکمل" : current.id === "people-mission" ? "آج کا عملی مشن" : "آج کا منظر"}</p>
            <h2 class="latin">${stageTitle}</h2>
            <p>${stageCopy}</p>
            <div class="stage-model" dir="ltr">
              <button data-action="speak" data-speak="${escapeAttr(stageDutch)}" aria-label="Dutch مثال سنیں">${icon("speaker")}</button>
              <span><small>${worldComplete ? "اگلا معمول" : "پہلی بات"}</small><b class="latin">${stageDutch}</b></span>
            </div>
            <div class="stage-actions">
              <a class="primary-action" href="${primaryHref}" ${primaryData}>
                <span>${icon(worldComplete ? "practice" : current.id === "people-mission" ? "flag" : "play")}</span><b>${worldComplete ? "مختصر دہرائی کریں" : current.id === "people-mission" ? "مشن شروع کریں" : "منظر شروع کریں"}</b><small class="latin">${worldComplete ? "4" : current.minutes} min</small>
              </a>
              <button class="round-action" data-action="speak" data-speed="slow" data-speak="${escapeAttr(stageDutch)}" aria-label="سبق کی Dutch مثال آہستہ سنیں">${icon("speaker")}</button>
            </div>
          </div>
        </article>

        <section class="today-route" aria-labelledby="route-title">
          <div class="section-heading">
            <div><span class="overline">آپ کا مختصر راستہ</span><h2 id="route-title">آج کے دو قدم</h2></div>
            <button data-action="open-journey">پورا سفر دیکھیں ${icon("arrow")}</button>
          </div>
          <div class="route-grid">
            <a class="route-card route-new" href="${primaryHref}" ${primaryData}>
              <span class="route-icon">${icon(worldComplete ? "check" : "route")}</span>
              <span><small>${worldComplete ? "دنیا مکمل" : current.id === "people-mission" ? "عملی مشن" : "نئی بات"} · <b class="latin">${worldComplete ? "4" : current.minutes} min</b></small><strong class="latin">${worldComplete ? "Gerichte herhaling" : current.title}</strong><em>${worldComplete ? "جو سیکھا وہ تازہ رکھیں" : current.urduTitle}</em></span>
              <i>${icon("arrow")}</i>
            </a>
            <a class="route-card route-review" href="#/practice" data-route="practice">
              <span class="route-icon">${icon("practice")}</span>
              <span><small>${dueReviewCount ? "آج واجب" : queuedReviewCount ? "اگلی دہرائی محفوظ" : "پہلا منظر مکمل ہونے کے بعد"} · <b class="latin">4 min</b></small><strong>${dueReviewCount ? `${dueReviewCount} مختصر دہرائی` : queuedReviewCount ? "صحیح وقت پر واپس آئے گی" : "دہرائی خود بنے گی"}</strong><em>${dueReviewCount ? "یاد سے جواب دیں، پھر مخصوص مدد لیں" : "سنیں، پہچانیں، اور نئی مثال میں استعمال کریں"}</em></span>
              <i class="due-count latin">${dueReviewCount || queuedReviewCount}</i>
            </a>
          </div>
        </section>
      </section>
    `;
  }

  function renderJourney() {
    const level = LEVELS[state.level];
    const levelProgress = level.id === "a1" ? Math.round((getPeopleProgress() / 8)) : level.progress;
    let selected = level.worlds.find((item) => item.id === state.world);
    if (!selected) {
      selected = level.worlds[0];
      state.world = selected.id;
    }
    return `
      <section class="journey-screen" aria-labelledby="journey-title">
        <div class="screen-heading journey-heading">
          <div><span class="overline"><i></i> آپ کا نقشہ</span><h1 id="journey-title">Dutch دنیا میں اپنا راستہ</h1><p>سطح چنیں، پھر ایک دنیا اور حقیقی منظر کھولیں۔</p></div>
          <div class="journey-summary"><b class="latin">${levelProgress}%</b><span>موجودہ سطح</span></div>
        </div>

        <div class="level-tabs" role="tablist" aria-label="سطح منتخب کریں">
          ${Object.values(LEVELS).map((item) => `
            <button role="tab" aria-selected="${item.id === state.level}" class="level-tab ${item.id === state.level ? "active" : ""}" data-action="level" data-level="${item.id}">
              <span class="latin">${item.short}</span><b class="latin">${item.title}</b><small>${item.urdu}</small>
            </button>
          `).join("")}
        </div>

        <div class="journey-layout">
          <aside class="world-selector" aria-label="دنیا منتخب کریں">
            <div class="world-selector-head"><span>دنیا</span><b class="latin">${String(level.worlds.findIndex((item) => item.id === selected.id) + 1).padStart(2, "0")} / ${String(level.worlds.length).padStart(2, "0")}</b></div>
            <div class="world-list">
              ${level.worlds.map((item, index) => renderWorldButton(item, index, selected.id)).join("")}
            </div>
          </aside>
          ${renderWorldDetail(selected, level)}
        </div>
      </section>
    `;
  }

  function renderWorldButton(item, index, selectedId) {
    const progress = item.id === "people" && state.level === "a1" ? getPeopleProgress() : item.progress;
    return `
      <button class="world-button tone-${item.tone} ${item.id === selectedId ? "active" : ""}" data-action="world" data-world="${item.id}" aria-pressed="${item.id === selectedId}">
        <span class="world-button-icon">${icon(item.iconName)}</span>
        <span><small class="latin">WORLD ${String(index + 1).padStart(2, "0")}</small><strong>${item.urduTitle}</strong><em class="latin">${item.dutchTitle}</em></span>
        <i>${progress ? `<b class="latin">${progress}%</b>` : icon("arrow")}</i>
      </button>
    `;
  }

  function renderWorldDetail(selected, level) {
    const lessons = selected.lessons || genericLessonsFor(selected);
    const isPeople = selected.id === "people" && state.level === "a1";
    const progress = isPeople ? getPeopleProgress() : selected.progress;
    return `
      <section class="world-detail tone-${selected.tone}" aria-labelledby="world-title">
        <div class="world-hero">
          <div class="world-hero-copy">
            <span class="world-kicker"><b class="latin">${level.short}</b> · ${selected.urduTitle}</span>
            <h2 class="latin" id="world-title">${selected.dutchTitle}</h2>
            <p>${selected.description}</p>
            <div class="world-meta"><span>${icon("route")} <b class="latin">${lessons.length}</b> مناظر</span><span>${icon("clock")} تقریباً <b class="latin">45</b> منٹ</span></div>
          </div>
          <div class="world-hero-art" aria-hidden="true">
            ${isPeople ? renderNeighbourScene("compact") : `<span class="world-symbol">${icon(selected.iconName)}</span><i></i><b></b>`}
          </div>
        </div>
        <div class="scene-path-head"><div><span class="overline">اس دنیا کے مناظر</span><h3>ایک واضح، مختصر راستہ</h3></div><span class="path-progress"><i style="--value:${progress}%"></i><b class="latin">${progress}%</b></span></div>
        <div class="scene-path">
          ${lessons.map((lesson, index) => renderSceneStop(lesson, index)).join("")}
        </div>
      </section>
    `;
  }

  function genericLessonsFor(selected) {
    return [
      { id: `${selected.id}-one`, number: "01", title: selected.dutchTitle, urduTitle: "پہلا حقیقی منظر", canDo: selected.description, context: "معنی اور آواز", minutes: 9, status: "locked", icon: selected.iconName },
      { id: `${selected.id}-two`, number: "02", title: "Luisteren en reageren", urduTitle: "سنیں اور مناسب جواب دیں", canDo: selected.description, context: "جملے اور چھوٹی مشق", minutes: 10, status: "locked", icon: "speaker" },
      { id: `${selected.id}-three`, number: "03", title: "Zelf gebruiken", urduTitle: "اپنی بات استعمال کریں", canDo: selected.description, context: "مدد سے آزاد استعمال", minutes: 10, status: "locked", icon: "dialogue" },
      { id: `${selected.id}-mission`, number: "M", title: "Praktijkmissie", urduTitle: "عملی مشن", canDo: selected.description, context: "نئے موقع پر جانچ", minutes: 12, status: "mission", icon: "flag" }
    ];
  }

  function renderSceneStop(lesson, index) {
    const implemented = PEOPLE_LESSONS.some((item) => item.id === lesson.id);
    const locked = lesson.status === "locked" || !implemented;
    const completed = state.completedLessons.includes(lesson.id);
    const current = implemented && !completed && getCurrentLesson().id === lesson.id;
    const available = implemented && !locked && !current && !completed;
    const mission = lesson.status === "mission";
    const href = locked ? "" : `href="#/lesson/${lesson.id}/brief"`;
    return `
      <a class="scene-stop ${current ? "current" : ""} ${available ? "available" : ""} ${completed ? "completed" : ""} ${mission ? "mission" : ""} ${locked ? "locked" : ""}" ${href} data-lesson="${lesson.id}" ${locked ? 'aria-disabled="true"' : ""}>
        <span class="scene-rail"><i></i><b>${completed ? icon("check") : locked ? icon("lock") : mission ? icon("flag") : lesson.number}</b></span>
        <span class="scene-stop-copy"><small>${lesson.context}</small><strong class="latin">${lesson.title}</strong><em>${lesson.urduTitle}</em></span>
        <span class="scene-stop-meta"><b class="latin">${lesson.minutes} min</b>${completed ? `<i>مکمل</i>` : current ? `<i>ابھی</i>` : locked ? icon("lock") : icon("arrow")}</span>
      </a>
    `;
  }

  function renderPractice() {
    const progress = progressStore.load();
    const due = progressStore.dueReviews();
    const queue = [...progress.reviewQueue].sort((first, second) => Date.parse(first.dueAt) - Date.parse(second.dueAt));
    if (state.reviewId) {
      const activeReview = queue.find((item) => item.id === state.reviewId);
      if (activeReview) return renderPracticeReview(activeReview);
      resetReviewState();
    }
    const nextReview = due[0] || queue[0] || null;
    const sourceLesson = nextReview ? getLesson(nextReview.sourceLessonId) : getCurrentLesson();
    const dueNow = due.length > 0;
    const lapseCount = queue.reduce((total, item) => total + item.lapses, 0);
    const focusLabel = dueNow ? "آج کی دہرائی" : nextReview ? "اگلی دہرائی" : "پہلا قدم";
    const focusTitle = dueNow ? sourceLesson.title : nextReview ? "یاد مضبوط کرنے کا وقت محفوظ ہے" : "پہلے ایک حقیقی منظر سیکھیں";
    const focusCopy = dueNow
      ? `${sourceLesson.urduTitle} کی بات اب بغیر سبق دیکھے ایک نئے موقع میں یاد کریں۔`
      : nextReview
        ? `${formatReviewDate(nextReview.dueAt)} کو ${sourceLesson.urduTitle} کی مختصر دہرائی خود یہاں آئے گی۔`
        : "پہلا سبق مکمل کریں؛ ایپ اسی زبان کو ایک دن، چار دن، اور پھر لمبے وقفے کے بعد واپس لائے گی۔";
    const focusAction = dueNow
      ? `<button class="primary-action" data-action="start-review" data-review-id="${escapeAttr(nextReview.id)}"><span>${icon("play")}</span><b>دہرائی شروع کریں</b><small class="latin">4 min</small></button>`
      : nextReview
        ? `<button class="primary-action" disabled><span>${icon("clock")}</span><b>صحیح وقت پر تیار ہوگی</b><small class="latin">Scheduled</small></button>`
        : `<a class="primary-action" href="#/lesson/${sourceLesson.id}/brief" data-lesson="${sourceLesson.id}"><span>${icon("route")}</span><b>پہلا منظر سیکھیں</b><small class="latin">${sourceLesson.minutes} min</small></a>`;
    return `
      <section class="utility-screen practice-screen" aria-labelledby="practice-title">
        <div class="screen-heading">
          <div><span class="overline"><i></i> یاد مضبوط کریں</span><h1 id="practice-title">وہی مشق جو ابھی کام آئے</h1><p>ہر دہرائی بتاتی ہے کہ یہ کیوں منتخب ہوئی اور کس حقیقی بات کو مضبوط کرے گی۔</p></div>
          <div class="utility-orb tone-blue">${icon("practice")}<b class="latin">${due.length}</b></div>
        </div>
        <article class="focus-practice">
          <div class="focus-practice-copy"><span class="overline">${focusLabel}</span><h2 class="${dueNow ? "latin" : ""}">${focusTitle}</h2><p>${focusCopy}</p><div><span>${icon("route")} یاد سے جواب</span><span>${icon("dialogue")} مخصوص مرمت</span><span>${icon("clock")} <b class="latin">4 min</b></span></div></div>
          <div class="practice-meter"><span><b class="latin">${due.length}</b><small>آج باقی</small></span><i style="--meter:${due.length ? Math.min(100, 28 + due.length * 18) : 0}%"></i></div>
          ${focusAction}
        </article>
        <div class="practice-grid">
          <button class="practice-card tone-rose" data-action="prototype-note"><span>${icon("mistake")}</span><small>سمجھ کر درست کریں</small><strong>${lapseCount ? `${lapseCount} مرمت دوبارہ` : "ابھی کوئی ادھوری مرمت نہیں"}</strong><em>ماڈل → آسان کوشش → نئی مثال</em><b class="latin">${lapseCount}</b></button>
          <button class="practice-card tone-blue" data-action="prototype-note"><span>${icon("headphones")}</span><small>طے شدہ یاد دہانی</small><strong>${queue.length} باتیں قطار میں</strong><em>${nextReview ? `${formatReviewDate(nextReview.dueAt)} سے اگلا دور` : "سبق کے بعد خود بنے گی"}</em><b class="latin">${queue.length}</b></button>
          <button class="practice-card tone-mint" data-action="prototype-note"><span>${icon("mic")}</span><small>بغیر نمبر کے</small><strong>تلفظ اسٹوڈیو</strong><em>سنیں، دہرائیں، اپنے آپ سے ملائیں</em>${icon("arrow")}</button>
        </div>
      </section>
    `;
  }

  function renderPracticeReview(item) {
    const lesson = getLesson(item.sourceLessonId);
    const task = lesson.check;
    const correct = state.reviewSelectedAnswer === task.correct;
    return `
      <section class="utility-screen practice-screen review-session" aria-labelledby="practice-title">
        <div class="screen-heading review-heading">
          <div><span class="overline"><i></i> وقفے کے بعد یاد کریں</span><h1 id="practice-title">${lesson.urduTitle}</h1><p>پہلے اپنی یاد سے جواب دیں۔ ضرورت ہو تو جواب کے بعد مخصوص مدد ملے گی۔</p></div>
          <button class="review-close" data-action="close-review" aria-label="دہرائی بند کریں">${icon("close")}</button>
        </div>
        <article class="review-session-card">
          <div class="review-context">
            <span class="review-sequence latin">REVIEW · ${item.intervalIndex + 1}</span>
            <div class="transfer-scene">
              <div class="transfer-sign"><span>${icon("building")}</span><b class="latin">${task.sign}</b><small>${task.setting}</small></div>
              <div class="transfer-person">${renderPortrait(task)}<p dir="ltr"><small class="latin">${task.speaker} zegt:</small><strong class="latin">“${task.promptDutch}”</strong><span dir="rtl">${task.promptUrdu}</span></p><button data-action="speak" data-speak="${escapeAttr(task.promptDutch)}" aria-label="${escapeAttr(task.speaker)} کی بات سنیں">${icon("speaker")}</button></div>
            </div>
          </div>
          <p class="question-instruction">${task.instruction}</p>
          <div class="answer-list" dir="ltr">
            ${task.options.map((option, index) => `<button class="answer-option ${state.reviewSelectedAnswer === option ? "selected" : ""} ${state.reviewChecked ? option === task.correct ? "correct" : state.reviewSelectedAnswer === option ? "wrong" : "" : ""}" data-action="review-answer" data-answer="${escapeAttr(option)}"><span class="latin">${String.fromCharCode(65 + index)}</span><b class="latin">${option}</b>${state.reviewChecked && option === task.correct ? icon("check") : ""}</button>`).join("")}
          </div>
          ${state.reviewChecked ? renderFeedback(correct, task.correctFeedback, task.wrongFeedback) : ""}
          <div class="review-actions">
            ${!state.reviewChecked ? `<button class="primary-action" data-action="check-review" ${state.reviewSelectedAnswer ? "" : "disabled"}><span>${icon("check")}</span><b>جواب چیک کریں</b><small class="latin">Check</small></button>` : !correct ? `<button class="primary-action" data-action="retry-review"><span>${icon("route")}</span><b>مدد کے ساتھ دوبارہ</b><small class="latin">Repair</small></button>` : `<button class="primary-action" data-action="finish-review"><span>${icon("arrow")}</span><b>${state.reviewHadError ? "مرمت محفوظ کریں" : "دہرائی مکمل کریں"}</b><small class="latin">Done</small></button>`}
          </div>
        </article>
      </section>
    `;
  }

  function formatReviewDate(value) {
    return new Intl.DateTimeFormat("ur-PK", { weekday: "long", day: "numeric", month: "short" }).format(new Date(value));
  }

  function resetReviewState() {
    state.reviewId = "";
    state.reviewSelectedAnswer = "";
    state.reviewChecked = false;
    state.reviewHadError = false;
  }

  function renderToolkit() {
    return `
      <section class="utility-screen toolkit-screen" aria-labelledby="toolkit-title">
        <div class="screen-heading">
          <div><span class="overline"><i></i> سبق سے باہر بھی مدد</span><h1 id="toolkit-title">آپ کی Dutch ٹول کٹ</h1><p>سیکھی ہوئی بات تلاش کریں، سنیں، اور حقیقی زندگی میں فوراً استعمال کریں۔</p></div>
          <div class="utility-orb tone-saffron">${icon("toolkit")}</div>
        </div>
        <label class="tool-search"><span>${icon("saved")}</span><input type="search" placeholder="Dutch لفظ یا اردو معنی تلاش کریں" aria-label="ٹول کٹ میں تلاش کریں"/><kbd class="latin">⌘ K</kbd></label>
        <div class="tool-grid">
          <button class="tool-card tool-phrases tone-mint" data-action="prototype-note"><span>${icon("dialogue")}</span><small>حقیقی موقع کے مطابق</small><strong>ضروری جملے</strong><p>سلام، مدد، خریداری، ڈاکٹر، سفر، اور سرکاری دفتر</p><em class="latin">24 learned</em></button>
          <button class="tool-card tone-blue" data-action="prototype-note"><span>${icon("sound")}</span><small>آواز اور لکھائی</small><strong>حروف اور تلفظ</strong><p>Dutch آواز سنیں، فرق دیکھیں، اور آہستہ مشق کریں۔</p>${icon("arrow")}</button>
          <button class="tool-card tone-violet" data-action="prototype-note"><span>${icon("grammar")}</span><small>مثال پہلے، قاعدہ بعد میں</small><strong>جملے کے نقشے</strong><p>سیکھی ہوئی مثال سے لفظوں کی جگہ دوبارہ دیکھیں۔</p>${icon("arrow")}</button>
          <button class="tool-card tone-saffron" data-action="prototype-note"><span>${icon("saved")}</span><small>آپ کی محفوظ فہرست</small><strong>میرے الفاظ</strong><p>جملے، آواز، اور وہ منظر جہاں لفظ ملا تھا۔</p><em class="latin">12 saved</em></button>
        </div>
      </section>
    `;
  }

  function renderLesson() {
    const lesson = getLesson(state.lessonId);
    if (state.lessonMode === "run") ensureRuntimeSession(lesson);
    return state.lessonMode === "run" ? renderStructuredLessonRun(lesson) : renderStructuredLessonBrief(lesson);
  }

  function renderFeedback(correct, correctText, wrongText) {
    return `<aside class="answer-feedback ${correct ? "is-correct" : "is-wrong"}" role="status"><span>${icon(correct ? "check" : "mistake")}</span><p><strong>${correct ? "بات اور موقع دونوں درست" : "یہ جواب کیا کہہ رہا تھا؟"}</strong><small>${correct ? correctText : wrongText}</small></p></aside>`;
  }

  function getLesson(lessonId = state.lessonId) {
    return PEOPLE_LESSONS.find((item) => item.id === lessonId) || PEOPLE_LESSONS[0];
  }

  function getResumableSession(lesson) {
    const snapshot = progressStore.load().sessions[lesson.id];
    return snapshot && !snapshot.completed && snapshot.phase !== "brief" && snapshot.phase !== "complete" ? snapshot : null;
  }

  function beginRuntimeSession(lesson) {
    const resumable = getResumableSession(lesson);
    if (resumable) {
      activeSession = runtime.createSession(lesson, resumable);
    } else {
      activeSession = runtime.createSession(lesson, {
        schemaVersion: 5,
        lessonId: lesson.id,
        phase: "brief",
        maxUnlockedIndex: 0,
        selectedAnswer: null,
        checked: false,
        responses: { ...getLessonResponses(lesson) },
        attempts: { rehearse: 0, check: 0 },
        completed: false
      });
      activeSession.advance();
    }
    syncRuntimeSession();
    persistRuntimeSession();
    return activeSession;
  }

  function ensureRuntimeSession(lesson = getLesson()) {
    if (!activeSession || activeSession.lesson.id !== lesson.id) return beginRuntimeSession(lesson);
    return activeSession;
  }

  function syncRuntimeSession() {
    if (!activeSession) return;
    const snapshot = activeSession.serialize();
    const phaseIndex = PHASES.findIndex((phase) => phase.id === snapshot.phase);
    if (phaseIndex >= 0) state.phase = phaseIndex;
    state.selectedAnswer = snapshot.selectedAnswer || "";
    state.checked = snapshot.checked;
    state.responses[snapshot.lessonId] = { ...snapshot.responses };
  }

  function persistRuntimeSession(completed = false) {
    if (!activeSession) return;
    const snapshot = activeSession.serialize();
    if (completed) progressStore.completeLesson(activeSession.lesson, snapshot);
    else progressStore.saveSession(snapshot);
  }

  function isRuntimePhaseUnlocked(phase, index) {
    if (state.lessonMode !== "run") return false;
    if (!activeSession) return index <= state.phase;
    return activeSession.availablePhases.includes(phase.id);
  }

  function getPeopleProgress() {
    const completed = PEOPLE_LESSONS.filter((lesson) => state.completedLessons.includes(lesson.id)).length;
    return Math.round((completed / PEOPLE_LESSONS.length) * 100);
  }

  function getCurrentLesson() {
    return PEOPLE_LESSONS.find((lesson) => !state.completedLessons.includes(lesson.id)) || PEOPLE_LESSONS[PEOPLE_LESSONS.length - 1];
  }

  function getLessonResponses(lesson) {
    if (!state.responses[lesson.id]) state.responses[lesson.id] = {};
    return state.responses[lesson.id];
  }

  function getResponseValue(lesson, key, useSample = false) {
    const value = String(getLessonResponses(lesson)[key] || "").trim();
    if (value) return value;
    if (!useSample) return "…";
    if (key === "choice") return lesson.act.choices?.[0]?.value || "…";
    return lesson.act.fields?.find((field) => field.key === key)?.placeholder || "…";
  }

  function spellValue(value) {
    const characters = Array.from(String(value || "").trim().toLocaleUpperCase("nl-NL"));
    return characters.map((character) => /\s/.test(character) ? "/" : character).join(" - ").replace(/ - \/ - /g, " / ");
  }

  function interpolateLessonText(template, lesson, useSample = false) {
    return String(template || "").replace(/\{\{(?:(spelled):)?([a-z]+)\}\}/g, (_match, spelled, key) => {
      const value = getResponseValue(lesson, key, useSample);
      return spelled ? spellValue(value) : value;
    });
  }

  function isActReady(lesson) {
    const responses = getLessonResponses(lesson);
    const fieldsReady = (lesson.act.fields || []).every((field) => String(responses[field.key] || "").trim());
    const choiceReady = !lesson.act.choices?.length || String(responses.choice || "").trim();
    return fieldsReady && choiceReady;
  }

  function renderPortrait(person) {
    return `<div class="portrait portrait-${person.tone || "omar"}"><span>${escapeHtml(person.initial || person.speaker?.[0] || "?")}</span></div>`;
  }

  function renderStepHeading(number, data, badge, badgeClass = "unscored-pill") {
    return `<div class="step-heading"><span class="step-number latin">${number}</span><div><small>${data.eyebrow}</small><h1>${data.title}</h1></div><span class="${badgeClass}">${badge}</span></div>`;
  }

  function renderStructuredLessonBrief(lesson) {
    const brief = lesson.brief;
    const resumable = getResumableSession(lesson);
    return `
      <main class="lesson-shell lesson-brief screen-enter" data-lesson-id="${lesson.id}">
        <header class="lesson-topbar">
          <button data-action="lesson-exit" class="lesson-exit" aria-label="سفر کے نقشے پر واپس جائیں">${icon("back")}</button>
          <div class="lesson-location"><small>A1 · لوگوں سے ملیں</small><strong>${lesson.urduTitle}</strong></div>
          <button data-action="lesson-map" class="lesson-map-button" aria-label="سبق کے مرحلے دیکھیں">${icon("journey")}<span>نقشہ</span></button>
        </header>
        <section class="brief-world tone-mint context-${lesson.art}">
          <div class="brief-sky" aria-hidden="true"><i></i><i></i><i></i></div>
          ${renderLessonArtwork(lesson, "lesson")}
          <div class="brief-world-label"><span class="latin">WORLD 01 · ${lesson.number === "M" ? "MISSION" : `SCENE ${lesson.number}`}</span><b>${brief.sceneLabel}</b></div>
        </section>
        <section class="brief-sheet">
          <div class="brief-handle" aria-hidden="true"></div>
          <div class="brief-heading"><span class="scene-badge">${icon(lesson.icon)}</span><div><small>آج آپ یہ کر سکیں گے</small><h1>${lesson.canDo}</h1></div></div>
          <div class="brief-model" dir="ltr">
            ${renderPortrait(brief)}
            <div><small class="latin">${brief.speaker} zegt:</small><strong class="latin">“${brief.dutch}”</strong><span dir="rtl">${brief.urdu}</span></div>
            <div class="brief-audio-actions">
              <button data-action="speak" data-speak="${escapeAttr(brief.dutch)}" aria-label="مثال عام رفتار میں سنیں">${icon("speaker")}</button>
              <button data-action="speak" data-speed="slow" data-speak="${escapeAttr(brief.dutch)}" aria-label="مثال آہستہ سنیں">${icon("speaker")}<small class="latin">0.7×</small></button>
            </div>
          </div>
          <div class="brief-details">
            <span>${icon("clock")}<b><em class="latin">${lesson.minutes} min</em> مختصر منظر</b></span>
            <span>${icon("speaker")}<b>عام اور آہستہ آواز</b></span>
            <span>${icon("route")}<b>منظر سے اپنی بات تک</b></span>
          </div>
          <div class="brief-new-language"><small>${lesson.id === "people-mission" ? "دہرائی کی مفید باتیں" : "نئی مفید باتیں"}</small><div dir="ltr">${brief.newLanguage.map((item) => `<span class="latin">${item}</span>`).join("")}</div></div>
        </section>
        <div class="lesson-action-dock brief-action-dock">
          <button class="primary-action" data-action="start-lesson" ${resumable ? 'data-resume="true"' : ""}><span>${icon(resumable ? "route" : lesson.id === "people-mission" ? "flag" : "play")}</span><b>${resumable ? "وہیں سے سبق جاری رکھیں" : lesson.id === "people-mission" ? "مشن شروع کریں" : "منظر میں داخل ہوں"}</b><small class="latin">${resumable ? "Resume" : "Start"}</small></button>
        </div>
        ${renderLessonOverlay()}
      </main>
    `;
  }

  function renderStructuredLessonRun(lesson) {
    const phase = PHASES[state.phase] || PHASES[0];
    const percent = Math.round((state.phase / (PHASES.length - 1)) * 100);
    return `
      <main class="lesson-shell lesson-run phase-${phase.id} screen-enter" data-lesson-id="${lesson.id}">
        <header class="lesson-topbar lesson-run-topbar">
          <button data-action="lesson-back" class="lesson-exit" aria-label="پچھلے مرحلے پر جائیں">${icon("back")}</button>
          <button class="lesson-progress" data-action="lesson-map" aria-label="سبق کا نقشہ کھولیں، ${percent} فیصد مکمل">
            <span><i style="width:${percent}%"></i></span>
            <b class="latin">${phase.short}</b><em>${phase.label}</em>
          </button>
          <button data-action="support" class="lesson-help" aria-label="اردو مدد کھولیں">${icon("help")}<span>مدد</span></button>
        </header>
        <div class="lesson-breadcrumb"><span class="latin">Mensen ontmoeten</span>${icon("chevron")}<b>${lesson.urduTitle}</b></div>
        <section class="lesson-stage">
          ${renderStructuredLessonStep(phase, lesson)}
        </section>
        ${renderStructuredLessonActionDock(phase, lesson)}
        ${renderLessonOverlay()}
      </main>
    `;
  }

  function renderStructuredLessonStep(phase, lesson) {
    if (phase.id === "scene") return renderStructuredScene(lesson);
    if (phase.id === "decode") return renderStructuredDecode(lesson);
    if (phase.id === "notice") return renderStructuredNotice(lesson);
    if (phase.id === "rehearse") return renderStructuredChoice(lesson.rehearse, "04", "practice-step", "مدد کے ساتھ", "support-pill");
    if (phase.id === "act") return renderStructuredAct(lesson);
    if (phase.id === "check") return renderStructuredChoice(lesson.check, "06", "check-step", "خود جانچ", "check-pill");
    return renderStructuredComplete(lesson);
  }

  function renderStructuredScene(lesson) {
    const data = lesson.scene;
    return `
      <div class="lesson-step scene-step">
        ${renderStepHeading("01", data, "بغیر نمبر")}
        <div class="conversation-stage tone-mint ${data.lines.length > 2 ? "many-lines" : ""}">
          <div class="conversation-setting">${renderLessonArtwork(lesson, "dialogue")}</div>
          ${data.lines.map((line, index) => `
            <div class="conversation-line ${index % 2 ? "line-offset" : ""}" dir="ltr">
              ${renderPortrait(line)}
              <div><small class="latin">${line.speaker}</small><strong class="latin">${line.dutch}</strong><span dir="rtl">${line.urdu}</span></div>
              <button data-action="speak" data-speak="${escapeAttr(line.dutch)}" aria-label="${escapeAttr(line.speaker)} کی بات سنیں">${icon("speaker")}</button>
            </div>
          `).join("")}
        </div>
        <p class="step-note">${data.note}</p>
      </div>
    `;
  }

  function renderStructuredDecode(lesson) {
    const data = lesson.decode;
    return `
      <div class="lesson-step decode-step">
        ${renderStepHeading("02", data, "بغیر نمبر")}
        <div class="word-lens-grid ${data.items.length > 4 ? "five-items" : ""}">
          ${data.items.map((item, index) => `
            <article class="word-lens ${index === 0 ? "featured" : ""}">
              <div><span class="word-index latin">${String(index + 1).padStart(2, "0")}</span><button data-action="speak" data-speak="${escapeAttr(item.audio)}" aria-label="${escapeAttr(item.form)} سنیں">${icon("speaker")}</button></div>
              <strong class="latin" dir="ltr">${item.form}</strong><b>${item.meaning}</b>
              <span class="sound-script">اردو آواز: ${item.sound}</span><small>${item.use}</small>
            </article>
          `).join("")}
        </div>
        <p class="step-note">${data.note}</p>
      </div>
    `;
  }

  function renderStructuredNotice(lesson) {
    const data = lesson.notice;
    const audioText = data.tokens.map((token) => token.text).join(" ");
    return `
      <div class="lesson-step notice-step">
        ${renderStepHeading("03", data, "بغیر نمبر")}
        <section class="pattern-board">
          <div class="pattern-model" dir="ltr">${data.tokens.map((token) => `<span class="pattern-${token.tone} latin">${token.text}</span>`).join("")}<button data-action="speak" data-speak="${escapeAttr(audioText)}" aria-label="مثال سنیں">${icon("speaker")}</button></div>
          <div class="pattern-meaning">${data.meanings.map((meaning) => `<span>${meaning}</span>`).join("")}</div>
          <div class="pattern-rule"><span>${icon("eye")}</span><p><strong class="latin" dir="ltr">${data.ruleDutch}</strong><b>${data.ruleUrdu}</b></p></div>
          <div class="pattern-contrast" dir="ltr"><span><small dir="rtl">${data.contrast[0].label}</small><b class="latin">${data.contrast[0].text}</b></span><i>${icon("arrow")}</i><span><small dir="rtl">${data.contrast[1].label}</small><b class="latin">${data.contrast[1].text}</b></span></div>
        </section>
        <aside class="common-mistake"><span>${data.cautionTitle}</span><p><b class="latin" dir="ltr">${data.cautionDutch}</b> ${data.cautionUrdu}</p></aside>
      </div>
    `;
  }

  function renderStructuredChoice(data, number, stepClass, badge, badgeClass) {
    const isCheck = number === "06";
    return `
      <div class="lesson-step ${stepClass}">
        ${renderStepHeading(number, data, badge, badgeClass)}
        ${isCheck ? `
          <div class="transfer-scene">
            <div class="transfer-sign"><span>${icon("building")}</span><b class="latin">${data.sign}</b><small>${data.setting}</small></div>
            <div class="transfer-person">${renderPortrait(data)}<p dir="ltr"><small class="latin">${data.speaker} zegt:</small><strong class="latin">“${data.promptDutch}”</strong><span dir="rtl">${data.promptUrdu}</span></p><button data-action="speak" data-speak="${escapeAttr(data.promptDutch)}" aria-label="${escapeAttr(data.speaker)} کی بات سنیں">${icon("speaker")}</button></div>
          </div>
        ` : `
          <div class="prompt-scene">
            ${renderPortrait(data)}
            <div dir="ltr"><small class="latin">${data.speaker} zegt:</small><strong class="latin">“${data.promptDutch}”</strong><span dir="rtl">${data.promptUrdu}</span><button data-action="speak" data-speak="${escapeAttr(data.promptDutch)}" aria-label="سوال سنیں">${icon("speaker")}</button></div>
          </div>
        `}
        <p class="question-instruction">${data.instruction}</p>
        <div class="answer-list" dir="ltr">
          ${data.options.map((option, index) => `<button class="answer-option ${state.selectedAnswer === option ? "selected" : ""} ${state.checked ? option === data.correct ? "correct" : state.selectedAnswer === option ? "wrong" : "" : ""}" data-action="answer" data-answer="${escapeAttr(option)}"><span class="latin">${String.fromCharCode(65 + index)}</span><b class="latin">${option}</b>${state.checked && option === data.correct ? icon("check") : ""}</button>`).join("")}
        </div>
        ${state.checked ? renderFeedback(state.selectedAnswer === data.correct, data.correctFeedback, data.wrongFeedback) : !isCheck && data.model ? `<div class="model-hint" dir="ltr"><span>${icon("eye")}</span><p><small dir="rtl">ماڈل</small><b class="latin">${data.model}</b></p></div>` : ""}
      </div>
    `;
  }

  function renderStructuredAct(lesson) {
    const data = lesson.act;
    const responses = getLessonResponses(lesson);
    const preview = interpolateLessonText(data.preview, lesson);
    const sampleAudio = interpolateLessonText(data.preview, lesson, true);
    return `
      <div class="lesson-step act-step">
        ${renderStepHeading("05", data, data.badge, "support-pill")}
        <div class="act-stage tone-${data.visualTone || "saffron"}">
          <div class="act-stage-person">${renderPersonFigure()}</div>
          <div class="act-bubble ${preview.length > 80 ? "long-preview" : ""}" dir="ltr"><small class="latin">Uw antwoord</small><strong class="latin" data-live-preview>${escapeHtml(preview)}</strong><button data-action="speak" data-speak-preview data-speak="${escapeAttr(sampleAudio)}" aria-label="اپنا جملہ سنیں">${icon("speaker")}</button></div>
        </div>
        ${data.fields?.length ? `<div class="act-fields">${data.fields.map((field, index) => `
          <label class="name-field"><span>${field.label}</span><input class="latin" dir="ltr" type="text" value="${escapeAttr(responses[field.key] || "")}" data-response-key="${field.key}" autocomplete="${field.autocomplete || "off"}" placeholder="${escapeAttr(field.placeholder)}" maxlength="${field.maxLength || 40}"/>${index === 0 ? `<small>${data.instruction}</small>` : ""}</label>
        `).join("")}</div>` : ""}
        ${data.choices?.length ? `<div class="act-choice-grid" dir="ltr">${data.choices.map((choice) => `<button class="${responses.choice === choice.value ? "selected" : ""}" data-action="act-choice" data-response-value="${escapeAttr(choice.value)}"><span class="latin">${choice.value}</span><small dir="rtl">${choice.label}</small>${responses.choice === choice.value ? icon("check") : ""}</button>`).join("")}</div><p class="act-choice-note">${data.instruction}</p>` : ""}
        <div class="speak-rehearsal"><span>${icon("mic")}</span><p><strong>بغیر نمبر کے بولنے کی مشق</strong><small>${data.speechHint}</small></p><button data-action="speak" data-speak-preview data-speak="${escapeAttr(sampleAudio)}">${icon("speaker")}<span>سنیں</span></button></div>
      </div>
    `;
  }

  function renderStructuredComplete(lesson) {
    const data = lesson.complete;
    const nextLesson = data.nextId ? getLesson(data.nextId) : null;
    return `
      <div class="lesson-step complete-step">
        <div class="completion-world tone-mint">
          <div class="completion-horizon" aria-hidden="true"></div>
          <span class="completion-seal">${icon(lesson.id === "people-mission" ? "flag" : "check")}</span>
          <p class="overline">${lesson.id === "people-mission" ? "دنیا کا مشن مکمل" : "منظر مکمل"}</p>
          <h1 class="latin" dir="ltr">${data.dutch}</h1>
          <p>${data.urdu}</p>
          <div class="can-do-proof ${data.proofs.length > 3 ? "four-proofs" : ""}">${data.proofs.map((proof) => `<span>${icon(proof.icon)}<b>${proof.text}</b></span>`).join("")}</div>
        </div>
        ${nextLesson ? `<a class="next-scene-card" href="#/lesson/${nextLesson.id}/brief" data-lesson="${nextLesson.id}"><span class="scene-badge">${icon(nextLesson.icon)}</span><div><small>اگلا منظر</small><strong class="latin">${nextLesson.title}</strong><p>${nextLesson.urduTitle} · ${nextLesson.context}</p></div><b class="latin">${nextLesson.minutes} min</b></a>` : `<a class="next-scene-card" href="#/practice" data-route="practice"><span class="scene-badge">${icon("practice")}</span><div><small>اگلا قدم</small><strong>کل مختصر دہرائی</strong><p>سلام، نام، جگہ، اور سوال ایک تازہ مثال میں دوبارہ آئیں گے۔</p></div><b class="latin">4 min</b></a>`}
      </div>
    `;
  }

  function renderStructuredLessonActionDock(phase, lesson) {
    if (phase.id === "rehearse" || phase.id === "check") {
      const data = phase.id === "rehearse" ? lesson.rehearse : lesson.check;
      if (!state.checked) {
        return `<div class="lesson-action-dock"><button class="secondary-action" data-action="support">${icon("help")}<span>مدد</span></button><button class="primary-action" data-action="check-answer" ${state.selectedAnswer ? "" : "disabled"}><span>${icon("check")}</span><b>جواب چیک کریں</b><small class="latin">Check</small></button></div>`;
      }
      if (state.selectedAnswer !== data.correct) {
        return `<div class="lesson-action-dock feedback-dock"><button class="secondary-action" data-action="support">${icon("eye")}<span>ماڈل دیکھیں</span></button><button class="primary-action" data-action="retry-answer"><span>${icon("route")}</span><b>آسان مدد کے ساتھ دوبارہ</b><small class="latin">Retry</small></button></div>`;
      }
      return `<div class="lesson-action-dock feedback-dock"><button class="primary-action" data-action="next-phase"><span>${icon("arrow")}</span><b>${phase.id === "check" ? "نتیجہ دیکھیں" : "اپنی بات بنائیں"}</b><small class="latin">Continue</small></button></div>`;
    }
    if (phase.id === "act") {
      return `<div class="lesson-action-dock"><button class="secondary-action" data-action="support">${icon("help")}<span>مدد</span></button><button class="primary-action" data-action="next-phase" ${isActReady(lesson) ? "" : "disabled"}><span>${icon("arrow")}</span><b>نئے موقع پر جانچیں</b><small class="latin">Continue</small></button></div>`;
    }
    if (phase.id === "complete") {
      return `<div class="lesson-action-dock"><a class="secondary-action" href="#/journey" data-route="journey">${icon("journey")}<span>سفر</span></a><a class="primary-action" href="#/today" data-route="today"><span>${icon("check")}</span><b>آج کے صفحے پر واپس</b><small class="latin">Done</small></a></div>`;
    }
    return `<div class="lesson-action-dock"><button class="secondary-action" data-action="support">${icon("help")}<span>اردو مدد</span></button><button class="primary-action" data-action="next-phase"><span>${icon("arrow")}</span><b>${phase.id === "scene" ? "باتیں سمجھیں" : phase.id === "decode" ? "جملہ دیکھیں" : "مدد کے ساتھ مشق"}</b><small class="latin">Continue</small></button></div>`;
  }

  function renderLessonOverlay() {
    if (!state.supportOpen && !state.lessonMapOpen) return "";
    const lesson = getLesson();
    if (state.lessonMapOpen) {
      return `
        <div class="overlay-backdrop" data-action="close-overlay">
          <section class="lesson-sheet-overlay" role="dialog" aria-modal="true" aria-labelledby="lesson-map-title" data-dialog-panel data-action="dialog-panel">
            <div class="sheet-heading"><div><span class="overline">آپ کہاں ہیں؟</span><h2 id="lesson-map-title">سبق کا نقشہ</h2></div><button data-action="close-overlay" aria-label="نقشہ بند کریں">${icon("close")}</button></div>
            <div class="phase-map-list">
              ${PHASES.map((phase, index) => {
                const unlocked = isRuntimePhaseUnlocked(phase, index);
                const active = index === state.phase && state.lessonMode === "run";
                return `<button data-action="jump-phase" data-phase="${index}" ${unlocked ? "" : "disabled"} class="${active ? "active" : ""} ${unlocked && !active ? "done" : ""}"><span class="latin">${phase.short}</span><p><strong>${phase.label}</strong><small>${phase.description}</small></p><i>${active ? "ابھی" : unlocked ? icon("check") : icon("lock")}</i></button>`;
              }).join("")}
            </div>
            <p class="sheet-note">اگلا مرحلہ تب کھلتا ہے جب نئی بات پہلے دیکھی اور مشق کی جا چکی ہو۔</p>
          </section>
        </div>
      `;
    }
    const supportModel = state.lessonMode === "run" && state.phase >= 4
      ? interpolateLessonText(lesson.act.preview, lesson, true)
      : lesson.brief.dutch;
    return `
      <div class="overlay-backdrop" data-action="close-overlay">
        <aside class="lesson-sheet-overlay support-sheet" role="dialog" aria-modal="true" aria-labelledby="support-title" data-dialog-panel data-action="dialog-panel">
          <div class="sheet-heading"><div><span class="overline">سبق چھوڑے بغیر</span><h2 id="support-title">اردو مدد</h2></div><button data-action="close-overlay" aria-label="مدد بند کریں">${icon("close")}</button></div>
          <div class="support-model" dir="ltr"><button data-action="speak" data-speed="slow" data-speak="${escapeAttr(supportModel)}">${icon("speaker")}</button><p><small class="latin">Uw model</small><strong class="latin">${escapeHtml(supportModel)}</strong><span dir="rtl">${lesson.brief.urdu}</span></p></div>
          <div class="support-sections">
            <details open><summary>جملے کا نقشہ ${icon("chevron")}</summary><p><b class="latin" dir="ltr">${lesson.notice.ruleDutch}</b><span>${lesson.notice.ruleUrdu}</span></p></details>
            <details><summary>مفید پوری باتیں ${icon("chevron")}</summary><p><b class="latin" dir="ltr">${lesson.brief.newLanguage.join(" · ")}</b><span>لفظ نہیں، پوری بات اور اس کا موقع یاد کریں۔</span></p></details>
            <details><summary>${lesson.notice.cautionTitle} ${icon("chevron")}</summary><p><b class="latin" dir="ltr">${lesson.notice.cautionDutch}</b><span>${lesson.notice.cautionUrdu}</span></p></details>
          </div>
        </aside>
      </div>
    `;
  }

  function renderLessonArtwork(lesson, variant) {
    if (lesson.art === "neighbour") return renderNeighbourScene(variant);
    const labels = {
      reception: "Aanmelden",
      community: "Buurtcentrum",
      conversation: "Koffie & buurt",
      mission: "Welkom"
    };
    return `
      <div class="context-art art-${lesson.art} scene-${variant}" aria-hidden="true">
        <span class="context-glow"></span>
        <span class="context-window"><i></i><i></i><i></i></span>
        <span class="context-building"><i></i><i></i><b></b></span>
        <span class="context-sign">${icon(lesson.icon)}<b class="latin">${labels[lesson.art] || "NederUrdu"}</b></span>
        <span class="context-desk"><i></i><b></b></span>
        <span class="context-card"><i></i><i></i><i></i></span>
        <span class="context-person person-a"><i></i><b></b><em></em></span>
        <span class="context-person person-b"><i></i><b></b><em></em></span>
        <span class="context-prop">${icon(lesson.art === "community" ? "pin" : lesson.art === "conversation" ? "dialogue" : lesson.art === "mission" ? "flag" : "letters")}</span>
        <span class="context-floor"></span>
      </div>
    `;
  }

  function renderNeighbourScene(variant) {
    return `
      <div class="neighbour-scene scene-${variant}" aria-hidden="true">
        <span class="scene-sun"></span>
        <span class="scene-cloud cloud-a"></span><span class="scene-cloud cloud-b"></span>
        <span class="scene-building building-back"><i></i><i></i><i></i></span>
        <span class="scene-building building-front"><i></i><i></i><i></i><b></b></span>
        <span class="scene-tree"><i></i><b></b></span>
        <span class="scene-ground"></span>
        <span class="scene-path-line"></span>
        <span class="scene-person person-one"><i></i><b></b><em></em></span>
        <span class="scene-person person-two"><i></i><b></b><em></em></span>
        <span class="scene-wave">${icon("wave")}</span>
      </div>
    `;
  }

  function renderPersonFigure() {
    return `<span class="person-figure" aria-hidden="true"><i></i><b></b><em></em><span></span></span>`;
  }

  function setRoute(route) {
    state.lastRoute = state.route === "lesson" ? state.lastRoute : state.route;
    state.route = route;
    state.supportOpen = false;
    state.lessonMapOpen = false;
    resetReviewState();
    activeSession = null;
    location.hash = `#/${route}`;
    if (location.hash === `#/${route}`) render();
  }

  function openLesson(lessonId, mode = "brief") {
    const lesson = getLesson(lessonId);
    state.lastRoute = state.route === "lesson" ? state.lastRoute : state.route;
    state.route = "lesson";
    state.lessonId = lesson.id;
    state.lessonMode = mode;
    state.phase = 0;
    state.selectedAnswer = "";
    state.checked = false;
    if (mode === "run") beginRuntimeSession(lesson);
    else activeSession = null;
    location.hash = `#/lesson/${state.lessonId}/${mode}`;
    if (location.hash === `#/lesson/${state.lessonId}/${mode}`) render();
  }

  function nextPhase() {
    const session = ensureRuntimeSession();
    session.advance();
    syncRuntimeSession();
    const completed = session.phase === "complete";
    if (completed && !state.completedLessons.includes(state.lessonId)) {
      state.completedLessons.push(state.lessonId);
      saveState();
    }
    persistRuntimeSession(completed);
    render();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }

  function previousLessonStep() {
    if (state.supportOpen || state.lessonMapOpen) {
      state.supportOpen = false;
      state.lessonMapOpen = false;
      render();
      return true;
    }
    if (state.lessonMode === "run") {
      const session = ensureRuntimeSession();
      if (session.phase !== "scene") {
        session.back();
        syncRuntimeSession();
        persistRuntimeSession();
        render();
        return true;
      }
      openLesson(state.lessonId, "brief");
      return true;
    }
    setRoute(state.lastRoute || "journey");
    return true;
  }

  function prefersReducedMotion() {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  }

  function speak(text, slow = false) {
    const clean = String(text || "").replace("…", "Yusuf");
    if (!clean) return;
    if (window.NederUrduTts?.speakNatural) {
      window.NederUrduTts.speakNatural(clean, slow);
      return;
    }
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = "nl-NL";
    utterance.rate = slow ? 0.68 : 0.88;
    const voice = speechSynthesis.getVoices().find((item) => /^nl[-_]/i.test(item.lang));
    if (voice) utterance.voice = voice;
    speechSynthesis.speak(utterance);
  }

  function showPrototypeNote() {
    const existing = document.querySelector(".prototype-toast");
    existing?.remove();
    const toast = document.createElement("div");
    toast.className = "prototype-toast";
    toast.setAttribute("role", "status");
    toast.innerHTML = `${icon("spark")}<span><b>یہ V2 سمت کا نمونہ ہے</b><small>اس حصے کا مکمل runtime اگلے implementation حصے میں جڑے گا۔</small></span>`;
    document.body.append(toast);
    requestAnimationFrame(() => toast.classList.add("visible"));
    window.setTimeout(() => toast.classList.remove("visible"), 3200);
    window.setTimeout(() => toast.remove(), 3600);
  }

  function closeLessonOverlay() {
    const returnAction = overlayReturnAction || (state.lessonMapOpen ? "lesson-map" : "support");
    state.supportOpen = false;
    state.lessonMapOpen = false;
    render();
    requestAnimationFrame(() => app.querySelector(`[data-action="${returnAction}"]`)?.focus());
  }

  app.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action], [data-route], [data-lesson]");
    if (!target) return;
    const action = target.dataset.action;
    const route = target.dataset.route;
    const lessonId = target.dataset.lesson;

    if (target.getAttribute("aria-disabled") === "true" || target.disabled) {
      event.preventDefault();
      return;
    }

    if (route) {
      event.preventDefault();
      setRoute(route);
      return;
    }
    if (lessonId) {
      event.preventDefault();
      openLesson(lessonId, "brief");
      return;
    }
    if (!action) return;

    if (["close-overlay", "support", "lesson-map", "lesson-exit", "lesson-back", "start-lesson", "next-phase", "check-answer", "retry-answer", "open-journey", "world", "level", "answer", "act-choice", "speak", "prototype-note", "profile", "jump-phase", "start-review", "close-review", "review-answer", "check-review", "retry-review", "finish-review"].includes(action)) {
      event.preventDefault();
    }

    if (action === "open-journey") setRoute("journey");
    if (action === "world") {
      state.world = target.dataset.world;
      render();
    }
    if (action === "level") {
      state.level = target.dataset.level;
      state.world = LEVELS[state.level].worlds[0].id;
      render();
    }
    if (action === "lesson-exit") setRoute(state.lastRoute || "journey");
    if (action === "lesson-back") previousLessonStep();
    if (action === "start-lesson") {
      openLesson(state.lessonId, "run");
    }
    if (action === "next-phase") nextPhase();
    if (action === "answer") {
      const session = ensureRuntimeSession();
      session.chooseAnswer(target.dataset.answer || "");
      syncRuntimeSession();
      persistRuntimeSession();
      render();
    }
    if (action === "act-choice") {
      const session = ensureRuntimeSession();
      session.chooseAct(target.dataset.responseValue || "");
      syncRuntimeSession();
      persistRuntimeSession();
      saveState();
      render();
    }
    if (action === "check-answer") {
      const session = ensureRuntimeSession();
      session.checkAnswer();
      syncRuntimeSession();
      persistRuntimeSession();
      render();
    }
    if (action === "retry-answer") {
      const session = ensureRuntimeSession();
      session.retryAnswer();
      syncRuntimeSession();
      persistRuntimeSession();
      overlayReturnAction = "support";
      state.supportOpen = true;
      render();
    }
    if (action === "support") {
      overlayReturnAction = "support";
      state.supportOpen = true;
      state.lessonMapOpen = false;
      render();
    }
    if (action === "lesson-map") {
      overlayReturnAction = "lesson-map";
      state.lessonMapOpen = true;
      state.supportOpen = false;
      render();
    }
    if (action === "close-overlay") {
      if (target.matches("[data-dialog-panel]")) return;
      closeLessonOverlay();
    }
    if (action === "jump-phase") {
      const session = ensureRuntimeSession();
      const phase = PHASES[Number(target.dataset.phase || 0)];
      session.jumpTo(phase.id);
      syncRuntimeSession();
      persistRuntimeSession();
      state.lessonMapOpen = false;
      render();
    }
    if (action === "start-review") {
      state.reviewId = target.dataset.reviewId || "";
      state.reviewSelectedAnswer = "";
      state.reviewChecked = false;
      state.reviewHadError = false;
      render();
    }
    if (action === "close-review") {
      resetReviewState();
      render();
    }
    if (action === "review-answer") {
      state.reviewSelectedAnswer = target.dataset.answer || "";
      state.reviewChecked = false;
      render();
    }
    if (action === "check-review") {
      const item = progressStore.load().reviewQueue.find((review) => review.id === state.reviewId);
      const lesson = item ? getLesson(item.sourceLessonId) : null;
      state.reviewChecked = true;
      if (lesson && state.reviewSelectedAnswer !== lesson.check.correct) state.reviewHadError = true;
      render();
    }
    if (action === "retry-review") {
      state.reviewSelectedAnswer = "";
      state.reviewChecked = false;
      render();
    }
    if (action === "finish-review") {
      const item = progressStore.load().reviewQueue.find((review) => review.id === state.reviewId);
      const lesson = item ? getLesson(item.sourceLessonId) : null;
      if (item && lesson && state.reviewChecked && state.reviewSelectedAnswer === lesson.check.correct) {
        progressStore.recordReview(item.id, !state.reviewHadError);
      }
      resetReviewState();
      render();
    }
    if (action === "speak") speak(target.dataset.speak, target.dataset.speed === "slow");
    if (action === "prototype-note" || action === "profile") showPrototypeNote();
  });

  app.addEventListener("input", (event) => {
    if (!event.target.matches("[data-response-key]")) return;
    const lesson = getLesson();
    const session = ensureRuntimeSession(lesson);
    session.setResponse(event.target.dataset.responseKey, event.target.value);
    syncRuntimeSession();
    persistRuntimeSession();
    saveState();
    const preview = interpolateLessonText(lesson.act.preview, lesson);
    const sampleAudio = interpolateLessonText(lesson.act.preview, lesson, true);
    const livePreview = app.querySelector("[data-live-preview]");
    if (livePreview) livePreview.textContent = preview;
    app.querySelectorAll("[data-speak-preview]").forEach((button) => {
      button.dataset.speak = sampleAudio;
    });
    const continueButton = app.querySelector('[data-action="next-phase"]');
    if (continueButton) continueButton.disabled = !isActReady(lesson);
  });

  document.addEventListener("keydown", (event) => {
    if (!(state.supportOpen || state.lessonMapOpen)) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeLessonOverlay();
      return;
    }
    if (event.key === "Tab") {
      const dialog = app.querySelector("[role=dialog]");
      const focusable = [...(dialog?.querySelectorAll('a[href], button:not(:disabled), input:not(:disabled), [tabindex]:not([tabindex="-1"])') || [])]
        .filter((element) => getComputedStyle(element).display !== "none" && getComputedStyle(element).visibility !== "hidden");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  window.addEventListener("hashchange", render);
  window.handleNederUrduBack = () => {
    if (state.route !== "lesson") return false;
    return previousLessonStep();
  };

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#96;");
  }

  if (!location.hash) history.replaceState(null, "", "#/today");
  render();
})();
