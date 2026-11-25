/* Duck Drift: a breather for tired developers.
 *
 * Mechanic: paced breathing. The glowing path rises for 4 s (inhale) and
 * falls for 6 s (exhale): ~6 breaths/min with a longer exhale. Holding
 * space / mouse / finger lifts the duck at exactly the inhale rate;
 * releasing lets it fall at the exhale rate, so following the path means
 * actually breathing at that pace.
 *
 * Nothing leaves the device: progress lives in localStorage only.
 */
(function () {
  "use strict";

  // ------------------------------------------------------------ constants
  const INHALE = 4, EXHALE = 6, CYCLE = INHALE + EXHALE;
  const STORE_KEY = "duckdrift.v1";
  const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99];
  const REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const WORRIES = [
    "prod is down", "standup in 5", "merge conflict", "47 unread on Slack", "deadline: yesterday",
    "flaky test", "it works on my machine", "npm install…", "who wrote this? (me)", "CI is red",
    "scope creep", "estimate: 2 hours", "legacy code", "500 Internal Server Error", "code review: 63 comments",
    "the client 'has a small change'", "impostor syndrome", "Friday deploy", "N+1 queries", "out of disk space",
  ];
  const REFRAMES = [
    "one thing at a time", "it's a bug, not a verdict on you", "you've fixed worse", "breathe, then git bisect",
    "done is better than perfect", "ask for help, that's senior", "rollback exists for a reason", "future you will thank you",
    "the code can wait 3 minutes", "you are not your commits", "small steps still ship", "let it go… to the backlog",
  ];
  const SUBTITLES = [
    "Your nervous system just merged to main.", "Stress: deprecated.", "Calm uptime: 100%.",
    "0 warnings, 0 errors, 1 relaxed human.", "Heart rate: rate-limited.", "Worries garbage-collected.",
  ];

  // ------------------------------------------------------------ dom
  const $ = (id) => document.getElementById(id);
  const canvas = $("scene");
  const ctx = canvas.getContext("2d");
  const ui = {
    hud: $("hud"), score: $("hud-score"), combo: $("hud-combo"), time: $("hud-time"),
    cue: $("cue-text"), cueCount: $("cue-count"), sync: $("sync-fill"),
    intro: $("screen-intro"), why: $("screen-why"), pause: $("screen-pause"), end: $("screen-end"),
    toast: $("toast"), sound: $("btn-sound"),
  };

  // ------------------------------------------------------------ storage
  function loadStore() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveStore(data) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) { /* private mode: fine */ }
  }

  // ------------------------------------------------------------ state
  let W = 0, H = 0, DPR = 1;
  const S = {
    mode: "intro",          // intro | playing | paused | end
    length: 180,
    moodBefore: 0, moodAfter: 0,
    t: 0, idle: 0,
    holding: false,
    duckY: 0, vy: 0,
    sync: 0, score: 0, combo: 0,
    cycle: 0, cycleSum: 0, cycleN: 0,
    synced: 0, cycles: 0, worries: 0, flies: 0,
    fireflies: [], clouds: [], particles: [], floats: [],
    nextFly: 1.5, nextCloud: 4.5, usedWorries: [],
    stars: [], sound: true, result: null,
  };

  // ------------------------------------------------------------ geometry
  const geo = { duckX: 0, center: 0, A: 0, speed: 0 };
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    geo.duckX = Math.max(90, W * 0.26);
    geo.A = Math.min(H * 0.2, 150);
    geo.center = H * 0.5 + 10;
    geo.speed = Math.max(110, W * 0.11);
    if (!S.stars.length || S.stars.w !== W) makeStars();
    if (S.mode !== "playing") S.duckY = geo.center + geo.A;
  }
  function makeStars() {
    S.stars = [];
    const n = Math.round((W * H) / 6000);
    for (let i = 0; i < n; i++) {
      S.stars.push({ x: Math.random() * W, y: Math.random() * H * 0.75, r: Math.random() * 1.4 + 0.3, p: Math.random() * 6.28 });
    }
    S.stars.w = W;
  }
  const ease = (x) => (1 - Math.cos(Math.PI * x)) / 2;
  function targetY(time) {
    const ph = ((time % CYCLE) + CYCLE) % CYCLE;
    const bottom = geo.center + geo.A, top = geo.center - geo.A;
    if (ph < INHALE) return bottom - ease(ph / INHALE) * 2 * geo.A;
    return top + ease((ph - INHALE) / EXHALE) * 2 * geo.A;
  }
  const screenX = (at) => geo.duckX + (at - S.t) * geo.speed;
  const progress = () => (S.mode === "end" ? 1 : S.length > 0 ? Math.min(1, S.t / S.length) : (S.t % 300) / 300 * 0.85);

  // ------------------------------------------------------------ audio
  let AC = null, master = null;
  function audioInit() {
    if (AC) return;
    try {
      AC = new (window.AudioContext || window.webkitAudioContext)();
      master = AC.createGain(); master.gain.value = S.sound ? 0.6 : 0; master.connect(AC.destination);
      // soft ambient pad
      [110, 164.81, 220].forEach((f, i) => {
        const o = AC.createOscillator(), g = AC.createGain(), lfo = AC.createOscillator(), lg = AC.createGain();
        o.type = "sine"; o.frequency.value = f; g.gain.value = 0.018;
        lfo.frequency.value = 0.07 + i * 0.03; lg.gain.value = 0.012;
        lfo.connect(lg); lg.connect(g.gain); o.connect(g); g.connect(master); o.start(); lfo.start();
      });
    } catch (e) { AC = null; }
  }
  function note(freq, delay = 0, dur = 1.4, vol = 0.12, type = "triangle") {
    if (!AC || !S.sound) return;
    const t0 = AC.currentTime + delay, o = AC.createOscillator(), g = AC.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(vol, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(master); o.start(t0); o.stop(t0 + dur + 0.05);
  }
  const chord = (notes, gap = 0.07, vol = 0.08) => notes.forEach((f, i) => note(f, i * gap, 1.8, vol));
  function setSound(on) {
    S.sound = on; ui.sound.textContent = on ? "🔊" : "🔈";
    if (master) master.gain.value = on ? 0.6 : 0;
  }

  // ------------------------------------------------------------ helpers
  let toastTimer = 0;
  function toast(msg) {
    ui.toast.textContent = msg; ui.toast.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => ui.toast.classList.remove("show"), 1700);
  }
  function burst(x, y, colors, n) {
    const count = REDUCED ? Math.ceil(n / 3) : n;
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2, v = 40 + Math.random() * 140;
      S.particles.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 30, life: 1, max: 0.8 + Math.random() * 0.8, c: colors[i % colors.length], r: 1.5 + Math.random() * 2.5 });
    }
  }
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const fmtTime = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const mult = () => 1 + Math.min(S.combo, 10) * 0.1;
  const localDate = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  // ------------------------------------------------------------ flow
  function show(screen) {
    [ui.intro, ui.why, ui.pause, ui.end].forEach((el) => el.classList.toggle("hidden", el !== screen));
  }
  function start() {
    audioInit(); if (AC && AC.state === "suspended") AC.resume();
    Object.assign(S, {
      mode: "playing", t: 0, holding: false, duckY: geo.center + geo.A, vy: 0, sync: 0, score: 0, combo: 0,
      cycle: 0, cycleSum: 0, cycleN: 0, synced: 0, cycles: 0, worries: 0, flies: 0,
      fireflies: [], clouds: [], particles: [], floats: [], nextFly: 1.5, nextCloud: 4.5, usedWorries: [], moodAfter: 0,
    });
    document.querySelectorAll("#mood-after button").forEach((b) => b.classList.remove("active"));
    $("mood-delta").textContent = "";
    show(null); ui.hud.classList.remove("hidden");
    toast("Hold to breathe in… release to breathe out");
    chord([SCALE[0], SCALE[2], SCALE[4]]);
  }
  function pause() {
    if (S.mode !== "playing") return;
    S.mode = "paused"; S.holding = false; show(ui.pause);
  }
  function resume() { S.mode = "playing"; show(null); }
  function finish() {
    S.mode = "end"; S.holding = false; ui.hud.classList.add("hidden");
    const minutes = Math.max(S.t, 1) / 60;
    const score = Math.round(S.score);
    const rate = score / minutes;
    const title = rate < 450 ? "Sleepy Rubber Duck" : rate < 900 ? "Junior Breather" : rate < 1400 ? "Senior Calm Engineer"
      : rate < 1900 ? "Principal Chill Architect" : "10x Zen Duck";
    const store = loadStore();
    const isBest = score > (store.best || 0);
    const next = {
      best: Math.max(store.best || 0, score), sessions: (store.sessions || 0) + 1,
      breaths: (store.breaths || 0) + S.synced, worries: (store.worries || 0) + S.worries,
      flies: (store.flies || 0) + S.flies, minutes: Math.round(((store.minutes || 0) + minutes) * 10) / 10,
    };
    saveStore(next);
    S.result = { score, title, sub: pick(SUBTITLES), isBest, best: next.best, minutes, date: new Date() };
    $("end-title").textContent = title;
    $("end-sub").textContent = `${S.result.sub} ${isBest ? "New personal best!" : ""}`;
    $("end-stats").innerHTML = [
      [score.toLocaleString(), "calm points", isBest],
      [`${S.synced}/${Math.max(S.cycles, S.synced)}`, "breaths in sync"],
      [S.worries, "worries released"],
      [S.flies, "fireflies caught"],
    ].map(([v, l, b]) => `<div class="stat${b ? " best" : ""}"><b>${v}</b><span>${l}</span></div>`).join("");
    show(ui.end);
    chord([SCALE[0], SCALE[2], SCALE[4], SCALE[5], SCALE[7]], 0.12, 0.09);
    renderLifetime();
  }
  function renderLifetime() {
    const s = loadStore();
    $("lifetime").textContent = s.sessions
      ? `your lifetime calm · ${s.sessions} sessions · ${s.breaths} breaths in sync · ${s.worries} worries released · best ${s.best}`
      : "";
  }

  // ------------------------------------------------------------ update
  function update(dt) {
    S.idle += dt;
    if (S.mode !== "playing") {
      S.duckY = geo.center + Math.sin(S.idle * 0.9) * 14 + (S.mode === "end" ? -geo.A * 0.3 : 0);
      stepParticles(dt);
      return;
    }
    S.t += dt;
    const { A } = geo;
    // duck: rise at the inhale rate while holding, sink at the exhale rate otherwise
    const up = (2 * A) / INHALE, down = (2 * A) / EXHALE;
    const want = S.holding ? -up : down;
    S.vy += (want - S.vy) * Math.min(1, dt * 7);
    S.duckY += S.vy * dt;
    // Clamp to the path's own top and bottom: a full exhale always brings the
    // duck back to the bottom, so one bad breath never ruins the next.
    const lo = geo.center - A, hi = geo.center + A;
    if (S.duckY < lo) { S.duckY = lo; S.vy = 0; }
    if (S.duckY > hi) { S.duckY = hi; S.vy = 0; }

    // sync with the breathing path
    const d = Math.abs(S.duckY - targetY(S.t));
    const s = Math.max(0, Math.min(1, 1 - d / (A * 0.7)));
    S.sync += (s - S.sync) * Math.min(1, dt * 4);
    S.score += s * dt * 12 * mult();
    S.cycleSum += s; S.cycleN++;

    // one full breath completed
    const c = Math.floor(S.t / CYCLE);
    if (c !== S.cycle) {
      const avg = S.cycleSum / Math.max(1, S.cycleN);
      S.cycles++;
      if (avg > 0.5) {
        S.synced++; S.combo++;
        toast(S.combo > 1 ? `breath ${S.synced} in sync · combo ×${mult().toFixed(1)}` : "breath in sync ✓");
        chord([SCALE[0], SCALE[2], SCALE[4]].map((f) => f * (S.combo % 2 ? 1 : 1.5)), 0.1, 0.06);
        burst(geo.duckX, S.duckY, ["#9effc4", "#8ee6ff"], 14);
      } else {
        S.combo = 0;
        toast("no rush, catch the next breath");
      }
      S.cycle = c; S.cycleSum = 0; S.cycleN = 0;
    }

    // spawns
    const lead = (W - geo.duckX + 60) / geo.speed;
    if (S.t >= S.nextFly) {
      const at = S.t + lead;
      S.fireflies.push({ at, y: targetY(at) + (Math.random() - 0.5) * A * 0.35, p: Math.random() * 6.28 });
      S.nextFly = S.t + 1.4 + Math.random() * 0.6;
    }
    if (S.t >= S.nextCloud) {
      const at = S.t + lead + 0.6;
      let pool = WORRIES.filter((w) => !S.usedWorries.includes(w));
      if (!pool.length) { S.usedWorries = []; pool = WORRIES; }
      const text = pick(pool); S.usedWorries.push(text);
      ctx.font = "600 15px Inter, sans-serif";
      const w = Math.max(120, ctx.measureText(text).width + 46);
      S.clouds.push({ at, y: targetY(at) + (Math.random() - 0.5) * A * 0.25, text, w });
      S.nextCloud = S.t + 6 + Math.random() * 2.5;
    }

    // collisions
    S.fireflies = S.fireflies.filter((f) => {
      const x = screenX(f.at);
      if (x < -40) return false;
      if (Math.abs(x - geo.duckX) < 28 && Math.abs(f.y - S.duckY) < 32) {
        S.flies++; S.score += 10 * mult();
        note(pick(SCALE) * (Math.random() < 0.3 ? 2 : 1), 0, 1.2, 0.1);
        burst(x, f.y, ["#ffe58a", "#fff7c2"], 10);
        if (navigator.vibrate) try { navigator.vibrate(8); } catch (e) { }
        return false;
      }
      return true;
    });
    S.clouds = S.clouds.filter((cl) => {
      const x = screenX(cl.at);
      if (x < -cl.w) return false;
      if (Math.abs(x - geo.duckX) < cl.w / 2 + 10 && Math.abs(cl.y - S.duckY) < 36) {
        S.worries++; S.score += 60 * mult();
        burst(x, cl.y, ["#c3b5ff", "#8ee6ff", "#ffffff"], 28);
        S.floats.push({ x, y: cl.y, text: pick(REFRAMES), life: 2.6 });
        [0, 2, 4, 7].forEach((i, k) => note(SCALE[i] * 1.0, k * 0.08, 1.6, 0.07, "sine"));
        return false;
      }
      return true;
    });
    stepParticles(dt);

    // HUD
    ui.score.textContent = Math.round(S.score).toLocaleString();
    ui.combo.textContent = `×${mult().toFixed(1)}`;
    ui.time.textContent = S.length > 0 ? fmtTime(Math.max(0, S.length - S.t)) : "zen";
    const ph = S.t % CYCLE;
    const inhale = ph < INHALE;
    ui.cue.textContent = inhale ? "Breathe in" : "Breathe out";
    ui.cue.style.color = inhale ? "#8ee6ff" : "#c3b5ff";
    ui.cueCount.textContent = String(Math.ceil(inhale ? INHALE - ph : CYCLE - ph));
    ui.sync.style.width = `${Math.round(S.sync * 100)}%`;

    if (S.length > 0 && S.t >= S.length) finish();
  }
  function stepParticles(dt) {
    S.particles = S.particles.filter((p) => {
      p.life -= dt / p.max; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 60 * dt; p.vx *= 0.98;
      return p.life > 0;
    });
    S.floats = S.floats.filter((f) => { f.life -= dt; f.y -= 22 * dt; return f.life > 0; });
  }

  // ------------------------------------------------------------ drawing
  const lerp = (a, b, k) => a + (b - a) * k;
  function mix(c1, c2, k) {
    const a = parseInt(c1.slice(1), 16), b = parseInt(c2.slice(1), 16);
    const r = Math.round(lerp(a >> 16, b >> 16, k)), g = Math.round(lerp((a >> 8) & 255, (b >> 8) & 255, k)), bl = Math.round(lerp(a & 255, b & 255, k));
    return `rgb(${r},${g},${bl})`;
  }
  function skyColors(p) {
    // night → pre-dawn → sunrise
    const stops = [["#060b22", "#17224f"], ["#2a2560", "#b8607d"], ["#4d79c4", "#ffc58f"]];
    if (p < 0.5) { const k = p / 0.5; return [mix(stops[0][0], stops[1][0], k), mix(stops[0][1], stops[1][1], k)]; }
    const k = (p - 0.5) / 0.5; return [mix(stops[1][0], stops[2][0], k), mix(stops[1][1], stops[2][1], k)];
  }

  function drawSky(c, w, h, p, time) {
    const [top, bottom] = skyColors(p);
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, top); g.addColorStop(1, bottom);
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    // stars fade with dawn
    const sa = Math.max(0, 1 - p * 1.4);
    if (sa > 0 && c === ctx) {
      for (const st of S.stars) {
        c.globalAlpha = sa * (0.45 + 0.55 * Math.sin(time * 1.3 + st.p) ** 2);
        c.fillStyle = "#fff"; c.beginPath(); c.arc(st.x, st.y, st.r, 0, 7); c.fill();
      }
      c.globalAlpha = 1;
    }
    // moon sets, sun rises
    const moonY = h * 0.16 + p * h * 0.5;
    if (p < 0.8) {
      c.globalAlpha = 1 - p / 0.8;
      c.fillStyle = "#f4f1de"; c.shadowColor = "#f4f1de"; c.shadowBlur = 30;
      c.beginPath(); c.arc(w * 0.82, moonY, Math.min(w, h) * 0.045, 0, 7); c.fill();
      c.shadowBlur = 0; c.globalAlpha = 1;
    }
    if (p > 0.45) {
      const k = (p - 0.45) / 0.55, r = Math.min(w, h) * 0.09;
      const sy = h * 0.8 - k * h * 0.28;
      const sg = c.createRadialGradient(w * 0.62, sy, r * 0.2, w * 0.62, sy, r * 4);
      sg.addColorStop(0, `rgba(255,220,150,${0.55 * k})`); sg.addColorStop(1, "rgba(255,200,150,0)");
      c.fillStyle = sg; c.fillRect(0, 0, w, h);
      c.fillStyle = `rgba(255,214,140,${Math.min(1, k * 1.4)})`; c.beginPath(); c.arc(w * 0.62, sy, r, 0, 7); c.fill();
    }
  }
  function drawHills(c, w, h, p, off) {
    const layers = [[0.78, 0.035, "#0b1636", "#3b3f6e", 0.15], [0.84, 0.05, "#08112a", "#2c2f58", 0.35]];
    for (const [base, amp, night, dawn, par] of layers) {
      c.fillStyle = mix(night, dawn, p); c.beginPath(); c.moveTo(0, h);
      for (let x = 0; x <= w + 10; x += 10) {
        const X = x + off * par;
        c.lineTo(x, h * base - Math.sin(X * 0.004) * h * amp - Math.sin(X * 0.011 + 1) * h * amp * 0.5);
      }
      c.lineTo(w, h); c.fill();
    }
    // water with reflections
    const wy = h * 0.9;
    const wg = c.createLinearGradient(0, wy, 0, h);
    wg.addColorStop(0, mix("#0e1c44", "#7a8cc7", p)); wg.addColorStop(1, mix("#050a1e", "#40507e", p));
    c.fillStyle = wg; c.fillRect(0, wy, w, h - wy);
    c.strokeStyle = `rgba(255,255,255,${0.08 + p * 0.1})`; c.lineWidth = 1.5;
    for (let i = 0; i < 6; i++) {
      const y = wy + 8 + i * 9, x0 = ((off * (0.6 + i * 0.1)) % 160 + 160) % 160;
      for (let x = -x0; x < w; x += 160) { c.beginPath(); c.moveTo(x, y); c.lineTo(x + 40 + i * 6, y); c.stroke(); }
    }
  }

  function drawPath() {
    const step = 6;
    for (let pass = 0; pass < 2; pass++) {
      ctx.lineWidth = pass ? 4 : 18;
      ctx.lineCap = "round";
      let prev = null;
      for (let x = 0; x <= W + step; x += step) {
        const time = S.t + (x - geo.duckX) / geo.speed;
        const y = targetY(time);
        if (prev) {
          const ph = ((time % CYCLE) + CYCLE) % CYCLE;
          const col = ph < INHALE ? "142,230,255" : "195,181,255";
          const fade = x < geo.duckX ? 0.25 : 1;
          ctx.strokeStyle = `rgba(${col},${(pass ? 0.85 : 0.13) * fade})`;
          ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(x, y); ctx.stroke();
        }
        prev = [x, y];
      }
    }
    // breath markers at each peak/valley ahead
    ctx.font = "600 11px 'JetBrains Mono', monospace"; ctx.textAlign = "center";
    const first = Math.floor(S.t / CYCLE) * CYCLE;
    for (let k = 0; k < 6; k++) {
      [[first + k * CYCLE, "in"], [first + k * CYCLE + INHALE, "out"]].forEach(([tm, label]) => {
        const x = screenX(tm);
        if (x < geo.duckX + 30 || x > W) return;
        ctx.fillStyle = label === "in" ? "rgba(142,230,255,.6)" : "rgba(195,181,255,.6)";
        ctx.fillText(label === "in" ? "↑ in" : "↓ out", x, targetY(tm) + (label === "in" ? 26 : -18));
      });
    }
  }

  function drawFireflies(time) {
    for (const f of S.fireflies) {
      const x = screenX(f.at), y = f.y + Math.sin(time * 3 + f.p) * 6;
      const g = ctx.createRadialGradient(x, y, 0, x, y, 18);
      g.addColorStop(0, "rgba(255,240,160,.95)"); g.addColorStop(0.3, "rgba(255,220,100,.45)"); g.addColorStop(1, "rgba(255,220,100,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 18, 0, 7); ctx.fill();
      ctx.fillStyle = "#fffbe0"; ctx.beginPath(); ctx.arc(x, y, 3, 0, 7); ctx.fill();
    }
  }
  function drawClouds(time) {
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    for (const cl of S.clouds) {
      const x = screenX(cl.at), y = cl.y + Math.sin(time * 1.2 + cl.at) * 4, w = cl.w, h = 46;
      ctx.fillStyle = "rgba(30,24,60,.82)"; ctx.strokeStyle = "rgba(195,181,255,.35)"; ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x - w / 2 + 22, y + 2, 20, Math.PI * 0.5, Math.PI * 1.5);
      ctx.arc(x - w / 6, y - 12, 22, Math.PI, Math.PI * 1.9);
      ctx.arc(x + w / 6, y - 10, 20, Math.PI * 1.1, Math.PI * 1.95);
      ctx.arc(x + w / 2 - 22, y + 2, 20, Math.PI * 1.5, Math.PI * 0.5);
      ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#d9d3ff"; ctx.font = "600 15px Inter, sans-serif";
      ctx.fillText(cl.text, x, y + 4);
      void h;
    }
    ctx.textBaseline = "alphabetic";
  }

  function drawDuck(c, x, y, s, tilt, glow, flap) {
    c.save(); c.translate(x, y); c.rotate(tilt); c.scale(s, s);
    if (glow > 0.05) {
      const g = c.createRadialGradient(0, 0, 4, 0, 0, 60);
      g.addColorStop(0, `rgba(158,255,196,${0.35 * glow})`); g.addColorStop(1, "rgba(158,255,196,0)");
      c.fillStyle = g; c.beginPath(); c.arc(0, 0, 60, 0, 7); c.fill();
    }
    // body
    c.fillStyle = "#ffd447"; c.beginPath(); c.ellipse(0, 6, 26, 18, 0, 0, 7); c.fill();
    c.fillStyle = "#ffc21a"; c.beginPath(); c.ellipse(-4, 12, 20, 9, 0, 0, 7); c.fill();
    // tail
    c.fillStyle = "#ffd447"; c.beginPath(); c.moveTo(-22, 0); c.lineTo(-34, -8); c.lineTo(-26, 8); c.fill();
    // wing
    c.save(); c.translate(-4, 4); c.rotate(-0.2 - flap * 0.6);
    c.fillStyle = "#f5b800"; c.beginPath(); c.ellipse(0, 0, 13, 7, -0.3, 0, 7); c.fill(); c.restore();
    // head
    c.fillStyle = "#ffd447"; c.beginPath(); c.arc(16, -12, 13, 0, 7); c.fill();
    // beak
    c.fillStyle = "#ff8a3d"; c.beginPath(); c.ellipse(30, -9, 9, 4.5, 0.1, 0, 7); c.fill();
    // eye + shine
    c.fillStyle = "#1b1b2f"; c.beginPath(); c.arc(19, -15, 2.6, 0, 7); c.fill();
    c.fillStyle = "#fff"; c.beginPath(); c.arc(20, -16, 0.9, 0, 7); c.fill();
    // cheek
    c.fillStyle = "rgba(255,120,120,.35)"; c.beginPath(); c.arc(14, -7, 3.2, 0, 7); c.fill();
    c.restore();
  }

  function drawParticles() {
    for (const p of S.particles) {
      ctx.globalAlpha = Math.max(0, p.life); ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.textAlign = "center"; ctx.font = "italic 600 16px Inter, sans-serif";
    for (const f of S.floats) {
      ctx.globalAlpha = Math.min(1, f.life); ctx.fillStyle = "#fff";
      ctx.shadowColor = "rgba(195,181,255,.9)"; ctx.shadowBlur = 12;
      ctx.fillText(f.text, f.x, f.y - 30);
    }
    ctx.shadowBlur = 0; ctx.globalAlpha = 1;
  }

  function render() {
    const time = S.idle, p = progress();
    drawSky(ctx, W, H, p, time);
    drawHills(ctx, W, H, p, (S.mode === "playing" || S.mode === "paused" ? S.t : S.idle * 0.3) * geo.speed);
    if (S.mode === "playing" || S.mode === "paused") {
      drawPath(); drawFireflies(time); drawClouds(time);
    }
    const tilt = S.mode === "playing" ? Math.max(-0.35, Math.min(0.35, S.vy / 300)) : Math.sin(time) * 0.06;
    const flap = S.holding ? (Math.sin(time * 18) + 1) / 2 : 0;
    drawDuck(ctx, geo.duckX, S.duckY, Math.min(1.25, Math.max(0.85, W / 900)), tilt, S.mode === "playing" ? S.sync : 0.3, flap);
    drawParticles();
  }

  // ------------------------------------------------------------ postcard
  function postcard() {
    const N = 1080, c = document.createElement("canvas"); c.width = N; c.height = N;
    const x = c.getContext("2d"), r = S.result;
    drawSky(x, N, N, 1, 0);
    drawHills(x, N, N, 1, 400);
    // sparkles
    for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(255,255,255,${Math.random() * 0.5})`; x.beginPath(); x.arc(Math.random() * N, Math.random() * N * 0.55, Math.random() * 2 + 0.5, 0, 7); x.fill(); }
    // card
    x.fillStyle = "rgba(14,22,52,.62)"; roundRect(x, 70, 70, N - 140, 620, 40); x.fill();
    x.strokeStyle = "rgba(255,255,255,.18)"; x.lineWidth = 2; x.stroke();
    x.textAlign = "center"; x.fillStyle = "#ffd36e"; x.font = "700 26px 'JetBrains Mono', monospace";
    x.fillText("D U C K   D R I F T", N / 2, 140);
    x.fillStyle = "#ffffff"; x.font = "800 70px Inter, sans-serif"; x.fillText(r.title, N / 2, 230, N - 200);
    x.fillStyle = "#cdd6f4"; x.font = "500 30px Inter, sans-serif"; x.fillText(r.sub, N / 2, 285, N - 200);
    const tiles = [
      [r.score.toLocaleString(), r.isBest ? "calm points · new best!" : "calm points"],
      [`${S.synced}`, "breaths in sync"],
      [`${S.worries}`, "worries released"],
      [`${S.flies}`, "fireflies caught"],
    ];
    tiles.forEach(([v, l], i) => {
      const tx = 120 + (i % 2) * 430, ty = 330 + Math.floor(i / 2) * 160;
      x.fillStyle = "rgba(255,255,255,.08)"; roundRect(x, tx, ty, 410, 140, 26); x.fill();
      x.fillStyle = i === 0 ? "#ffd36e" : "#ffffff"; x.font = "800 62px 'JetBrains Mono', monospace"; x.fillText(v, tx + 205, ty + 78);
      x.fillStyle = "#aeb9da"; x.font = "500 26px Inter, sans-serif"; x.fillText(l, tx + 205, ty + 118);
    });
    if (S.moodBefore && S.moodAfter) {
      const faces = ["", "😌", "🙂", "😐", "😣", "🔥"];
      const d = S.moodBefore - S.moodAfter;
      x.fillStyle = "#9effc4"; x.font = "700 34px Inter, sans-serif";
      x.fillText(`tension ${faces[S.moodBefore]} ${S.moodBefore} → ${faces[S.moodAfter]} ${S.moodAfter}${d > 0 ? `   (−${d})` : ""}`, N / 2, 670);
    } else {
      x.fillStyle = "#9effc4"; x.font = "700 32px Inter, sans-serif";
      x.fillText(`${Math.max(1, Math.round(r.minutes))} minute${Math.round(r.minutes) > 1 ? "s" : ""} away from the keyboard, well spent`, N / 2, 670);
    }
    drawDuck(x, N / 2, 840, 3.1, -0.08, 0.6, 0.3);
    x.fillStyle = "rgba(255,255,255,.92)"; x.font = "600 28px Inter, sans-serif";
    x.fillText("a breather for tired devs · md-mojahed.github.io/game", N / 2, 1000);
    x.fillStyle = "rgba(255,255,255,.6)"; x.font = "500 22px 'JetBrains Mono', monospace";
    x.fillText(localDate(r.date), N / 2, 1036);
    return c;
  }
  function roundRect(c, x, y, w, h, r) {
    c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
  }
  function postcardBlob() { return new Promise((res) => postcard().toBlob(res, "image/png")); }
  const fileName = () => `duck-drift-${localDate()}.png`;

  // ------------------------------------------------------------ input
  const isUI = (el) => el && el.closest && el.closest("button, a, .screen");
  function press(e) {
    if (S.mode !== "playing" || isUI(e.target)) return;
    S.holding = true; if (e.cancelable) e.preventDefault();
  }
  function release() { S.holding = false; }
  window.addEventListener("pointerdown", press, { passive: false });
  window.addEventListener("pointerup", release);
  window.addEventListener("pointercancel", release);
  window.addEventListener("blur", () => { release(); pause(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) pause(); });
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      if (S.mode === "intro" && !e.repeat) { start(); return; }
      if (S.mode === "playing") S.holding = true;
    } else if (e.code === "Escape" || e.code === "KeyP") {
      S.mode === "playing" ? pause() : S.mode === "paused" && resume();
    } else if (e.code === "KeyM") setSound(!S.sound);
  });
  window.addEventListener("keyup", (e) => { if (e.code === "Space") S.holding = false; });
  window.addEventListener("resize", resize);

  // ------------------------------------------------------------ ui wiring
  function radio(groupId, cb) {
    document.querySelectorAll(`#${groupId} button`).forEach((b) => b.addEventListener("click", () => {
      document.querySelectorAll(`#${groupId} button`).forEach((o) => { o.classList.toggle("active", o === b); o.setAttribute("aria-checked", o === b); });
      cb(b);
    }));
  }
  radio("mood-before", (b) => { S.moodBefore = +b.dataset.v; });
  radio("modes", (b) => { S.length = +b.dataset.len; });
  radio("mood-after", (b) => {
    S.moodAfter = +b.dataset.v;
    const d = S.moodBefore ? S.moodBefore - S.moodAfter : null;
    $("mood-delta").textContent = d === null ? "Noted. Your postcard will show it." :
      d > 0 ? `Tension down by ${d}. That's a real reset. 🎉` :
        d === 0 ? "Steady. Taking the break still counts." : "Rougher than before? One more round, or a short walk outside.";
  });
  $("btn-start").addEventListener("click", start);
  $("btn-again").addEventListener("click", start);
  $("btn-resume").addEventListener("click", resume);
  $("btn-finish").addEventListener("click", finish);
  $("btn-pause").addEventListener("click", pause);
  ui.sound.addEventListener("click", () => setSound(!S.sound));
  $("why-link").addEventListener("click", (e) => { e.preventDefault(); show(ui.why); });
  $("btn-why-back").addEventListener("click", () => show(ui.intro));
  $("btn-png").addEventListener("click", async () => {
    const blob = await postcardBlob(); if (!blob) return;
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = fileName();
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    toast("Postcard saved 🦆");
  });
  const shareBtn = $("btn-share");
  try {
    const probe = new File([new Blob()], "x.png", { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [probe] })) shareBtn.hidden = false;
  } catch (e) { /* no file sharing here */ }
  shareBtn.addEventListener("click", async () => {
    const blob = await postcardBlob(); if (!blob) return;
    try {
      await navigator.share({ files: [new File([blob], fileName(), { type: "image/png" })], title: "Duck Drift", text: `I just took a breather: ${S.result.title} 🦆` });
    } catch (e) { /* user cancelled */ }
  });

  // ------------------------------------------------------------ loop
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    update(dt); render();
    requestAnimationFrame(frame);
  }
  if (/[?&]debug\b/.test(location.search)) window.__duck = { S, start, finish, postcard, targetY, geo, update };
  resize(); renderLifetime(); setSound(true);
  requestAnimationFrame(frame);
})();
