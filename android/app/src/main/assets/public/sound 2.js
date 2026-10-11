/* NederUrdu sound and haptics kit. Every UI sound is synthesised with Web Audio,
   so there are no audio files to cache and nothing breaks offline. */
window.NU = window.NU || {};
NU.sound = (() => {
  let context = null, master = null, echo = null;
  let isEnabled = () => true;

  function ctx() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!context) {
      context = new AudioContextClass();
      master = context.createDynamicsCompressor();
      master.threshold.value = -14;
      master.connect(context.destination);
      // A short feedback delay gives the chimes a little room without a reverb impulse file.
      echo = context.createDelay();
      echo.delayTime.value = 0.09;
      const feedback = context.createGain();
      feedback.gain.value = 0.22;
      const wet = context.createGain();
      wet.gain.value = 0.18;
      echo.connect(feedback).connect(echo);
      echo.connect(wet).connect(master);
    }
    if (context.state === "suspended") context.resume().catch(() => {});
    return context;
  }

  const semitone = (base, steps) => base * 2 ** (steps / 12);

  function tone(frequency, { at = 0, duration = 0.15, volume = 0.12, type = "sine", glide = 0, attack = 0.012, wet = true } = {}) {
    const c = ctx();
    if (!c) return;
    const start = c.currentTime + at;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, start);
    if (glide) osc.frequency.exponentialRampToValueAtTime(Math.max(30, frequency * glide), start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain).connect(master);
    if (wet) gain.connect(echo);
    osc.start(start);
    osc.stop(start + duration + 0.05);
  }

  function noise({ at = 0, duration = 0.35, volume = 0.06, from = 400, to = 3200 } = {}) {
    const c = ctx();
    if (!c) return;
    const start = c.currentTime + at;
    const buffer = c.createBuffer(1, Math.ceil(c.sampleRate * duration), c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const source = c.createBufferSource();
    source.buffer = buffer;
    const filter = c.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 1.4;
    filter.frequency.setValueAtTime(from, start);
    filter.frequency.exponentialRampToValueAtTime(to, start + duration);
    const gain = c.createGain();
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + duration * 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    source.connect(filter).connect(gain).connect(master);
    source.start(start);
  }

  const C6 = 1046.5;
  const library = {
    tap: () => tone(1400, { duration: 0.035, volume: 0.035, type: "triangle", wet: false }),
    select: () => {
      tone(620, { duration: 0.09, volume: 0.09, type: "triangle", glide: 1.25 });
    },
    deselect: () => tone(560, { duration: 0.08, volume: 0.06, type: "triangle", glide: 0.8 }),
    pop: () => tone(380, { duration: 0.12, volume: 0.1, glide: 2.4 }),
    // Correct answers climb a little with each answer in a streak (capped to stay pleasant).
    correct: ({ combo = 1 } = {}) => {
      const lift = Math.min(Math.max(combo - 1, 0), 7);
      tone(semitone(C6, lift - 5), { duration: 0.12, volume: 0.13, type: "triangle" });
      tone(semitone(C6, lift - 1), { at: 0.085, duration: 0.14, volume: 0.13, type: "triangle" });
      tone(semitone(C6, lift + 2), { at: 0.17, duration: 0.3, volume: 0.1, type: "sine" });
      tone(semitone(C6, lift + 14), { at: 0.17, duration: 0.18, volume: 0.025, type: "sine" });
    },
    wrong: () => {
      tone(233, { duration: 0.16, volume: 0.1, type: "square", glide: 0.92, wet: false });
      tone(185, { at: 0.13, duration: 0.24, volume: 0.09, type: "square", glide: 0.85, wet: false });
    },
    whoosh: () => noise({ duration: 0.32, volume: 0.035, from: 300, to: 2600 }),
    swish: () => noise({ duration: 0.2, volume: 0.025, from: 1800, to: 600 }),
    unlock: () => [0, 4, 7, 12, 16].forEach((step, i) => tone(semitone(523.25, step), { at: i * 0.06, duration: 0.22, volume: 0.07, type: "triangle" })),
    xp: () => tone(1760, { duration: 0.05, volume: 0.03, type: "square", wet: false }),
    // Pim's voice: a sawtooth glide through a vowel-like filter.
    meow: () => {
      const c = ctx();
      if (!c) return;
      const start = c.currentTime;
      const osc = c.createOscillator(), filter = c.createBiquadFilter(), gain = c.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(520, start);
      osc.frequency.exponentialRampToValueAtTime(820, start + 0.12);
      osc.frequency.exponentialRampToValueAtTime(480, start + 0.42);
      filter.type = "bandpass";
      filter.Q.value = 3;
      filter.frequency.setValueAtTime(900, start);
      filter.frequency.exponentialRampToValueAtTime(1700, start + 0.14);
      filter.frequency.exponentialRampToValueAtTime(800, start + 0.42);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.22, start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.46);
      osc.connect(filter).connect(gain).connect(master);
      osc.start(start);
      osc.stop(start + 0.5);
    },
    // Rubber stamp: a low thump with a papery slap.
    stamp: () => {
      tone(140, { duration: 0.18, volume: 0.22, type: "sine", glide: 0.5, attack: 0.004, wet: false });
      noise({ duration: 0.12, volume: 0.08, from: 1800, to: 600 });
    },
    // Bicycle bell: two quick metallic "tring"s.
    bell: () => [0, 0.16].forEach((at) => {
      tone(2350, { at, duration: 0.28, volume: 0.06, type: "sine", attack: 0.004 });
      tone(3150, { at, duration: 0.22, volume: 0.035, type: "sine", attack: 0.004 });
      tone(4700, { at, duration: 0.08, volume: 0.02, type: "triangle", attack: 0.002 });
    }),
    complete: () => {
      const notes = [[0, 0], [4, 0.12], [7, 0.24], [12, 0.36]];
      notes.forEach(([step, at]) => tone(semitone(523.25, step), { at, duration: 0.2, volume: 0.11, type: "triangle" }));
      [0, 4, 7, 12].forEach(step => tone(semitone(523.25, step), { at: 0.52, duration: 0.7, volume: 0.06, type: "sine" }));
      noise({ at: 0.5, duration: 0.6, volume: 0.02, from: 3000, to: 8000 });
    },
    streak: () => [0, 7, 12, 19].forEach((step, i) => tone(semitone(659.25, step), { at: i * 0.07, duration: 0.18, volume: 0.07, type: "square" }))
  };

  function play(name, options) {
    if (!isEnabled() || !library[name]) return;
    try { library[name](options); } catch { /* Audio is optional. */ }
  }

  // Browsers only allow audio after a gesture: unlock on the first touch.
  addEventListener("pointerdown", () => { if (isEnabled()) ctx(); }, { once: true, passive: true });

  return { play, names: Object.keys(library), configure: ({ enabled }) => { if (enabled) isEnabled = enabled; } };
})();

NU.haptics = (() => {
  let isEnabled = () => true;
  const patterns = {
    tap: 6,
    select: 10,
    success: [14, 40, 22],
    error: [30, 50, 30],
    streak: [10, 30, 10, 30, 28],
    celebrate: [20, 40, 20, 40, 60]
  };
  function play(name) {
    if (!isEnabled() || !patterns[name]) return;
    try {
      // The Android app exposes native system haptics; browsers fall back to the Vibration API.
      if (window.NederUrduHaptics?.play) window.NederUrduHaptics.play(name);
      else if (navigator.userActivation?.hasBeenActive !== false) navigator.vibrate?.(patterns[name]);
    } catch { /* Haptics are optional and may be blocked. */ }
  }
  return { play, names: Object.keys(patterns), configure: ({ enabled }) => { if (enabled) isEnabled = enabled; } };
})();
