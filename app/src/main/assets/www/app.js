/* Discrete Math — Mimo-style learning app for WGU Applied Discrete Mathematics */
(function () {
  const $app = document.getElementById('app');
  const KEY = 'discrete_math_v1';
  const today = () => { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };
  const dayKey = (off) => { const d = new Date(); d.setDate(d.getDate() + off); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };

  // ---------- state ----------
  const def = { done: {}, xp: 0, streak: 0, best: 0, last: '', days: {}, mist: {}, examBest: {},
    set: { auto: false, rate: 1.0, pitch: 1.0, readOpts: true, unlockAll: false, goal: 30, voice: '' } };
  let st;
  try { st = Object.assign({}, def, JSON.parse(localStorage.getItem(KEY) || '{}')); st.set = Object.assign({}, def.set, st.set || {}); }
  catch (e) { st = JSON.parse(JSON.stringify(def)); }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { } };

  // flatten lessons
  const FLAT = [];
  COURSE.forEach((ch, ci) => ch.lessons.forEach((l, li) => { l.ch = ch; l.ci = ci; l.li = li; l.gi = FLAT.length; FLAT.push(l); }));
  const LMAP = {}; FLAT.forEach(l => LMAP[l.id] = l);

  const isUnlocked = (l) => st.set.unlockAll || l.gi === 0 || st.done[l.id] || st.done[FLAT[l.gi - 1].id];
  const chapterDone = ch => ch.lessons.filter(l => st.done[l.id]).length;
  const examUnlocked = ch => st.set.unlockAll || chapterDone(ch) === ch.lessons.length;

  function addXP(n) {
    st.xp += n;
    const t = today();
    if (st.last !== t) {
      st.streak = st.last === dayKey(-1) ? st.streak + 1 : 1;
      st.best = Math.max(st.best, st.streak); st.last = t;
    }
    st.days[t] = (st.days[t] || 0) + n;
    save();
  }
  const streakNow = () => (st.last === today() || st.last === dayKey(-1)) ? st.streak : 0;

  // ---------- text to speech ----------
  let speaking = false;
  window.onTtsState = (on) => { speaking = on; document.querySelectorAll('.spk[data-live]').forEach(b => b.classList.toggle('on', on)); };
  const SYM = [
    [/\|([^|<>]{1,30})\|/g, ' the size of $1 '], [/\s\|\s/g, ' given '], [/∣/g, ' divides '], [/∤/g, ' does not divide '],
    [/≡([^.;]{0,40}?)\(mod/g, ' is congruent to $1 (mod'], [/\(mod\s*(\w+)\)/g, ' modulo $1 '], [/\bmod\b/g, ' mod '],
    [/¬\s*\(/g, ' not ('], [/¬/g, ' not '], [/∧/g, ' and '], [/∨/g, ' or '], [/⊕/g, ' x or '], [/↔|⟺|⇔/g, ' if and only if '], [/→|⇒/g, ' implies '], [/≡/g, ' is equivalent to '],
    [/∀/g, ' for all '], [/∃/g, ' there exists '], [/∴/g, ' therefore '], [/∉/g, ' is not an element of '], [/∈/g, ' is an element of '], [/⊆/g, ' is a subset of '], [/⊂/g, ' is a proper subset of '],
    [/∪/g, ' union '], [/∩/g, ' intersect '], [/∅/g, ' the empty set '], [/ℤ⁺/g, ' the positive integers '], [/ℤ/g, ' the integers '], [/ℕ/g, ' the natural numbers '], [/ℚ/g, ' the rationals '], [/ℝ/g, ' the real numbers '],
    [/⌊([^⌋]*)⌋/g, ' the floor of $1 '], [/⌈([^⌉]*)⌉/g, ' the ceiling of $1 '], [/∘/g, ' composed with '], [/([a-zA-Z])̄/g, ' $1 bar '], [/x̄/g, ' x bar '],
    [/\bO\(/g, ' big O of ('], [/Θ\(/g, ' big theta of ('], [/Ω\(/g, ' big omega of ('], [/Σ/g, ' the sum of '], [/φ/g, ' phi '], [/χ/g, ' chi '],
    [/(\d+|\b[nrkm]|\))!/g, '$1 factorial '], [/[⁰¹²³⁴⁵⁶⁷⁸⁹ⁿʳᵏᵉᵈʰⁱ⁺⁻]+/g, m => m === '²' ? ' squared ' : m === '³' ? ' cubed ' : m === '⁻¹' ? ' inverse ' : m === '⁺' ? ' plus ' : ' to the power ' + [...m].map(c => { const i = '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c); return i >= 0 ? i : ({ 'ⁿ': ' n ', 'ʳ': ' r ', 'ᵏ': ' k ', 'ᵉ': ' e ', 'ᵈ': ' d ', 'ʰ': ' h ', 'ⁱ': ' i ', '⁺': ' plus ', '⁻': ' minus ' }[c]); }).join('') + ' '], [/Ā/g, ' A complement '], [/ȳ/g, ' y bar '],
    [/√/g, ' square root of '], [/≤/g, ' less than or equal to '], [/≥/g, ' greater than or equal to '], [/≠/g, ' not equal to '], [/±/g, ' plus or minus '], [/≈/g, ' approximately '], [/×/g, ' times '], [/÷/g, ' divided by '], [/−/g, ' minus '], [/·/g, ' times '], [/:=/g, ' gets '],
    [/[₀-₉ₙₖᵢₘ₋₊]+/g, m => ' sub ' + [...m].map(c => { const i = '₀₁₂₃₄₅₆₇₈₉'.indexOf(c); return i >= 0 ? i : { 'ₙ': ' n ', 'ₖ': ' k ', 'ᵢ': ' i ', 'ₘ': ' m ', '₋': ' minus ', '₊': ' plus ' }[c]; }).join('') + ' '],
    [/P\(/g, ' P of ('], [/<(?!\/?[a-z])/g, ' less than '], [/(?<![a-z"'])>/g, ' greater than '], [/=/g, ' equals '], [/%/g, ' percent '], [/∎/g, ' end of proof. '], [/✓|✗|✅|❌|⚠️/g, ''],
    [/(\S)\s*\/\s*(?=\S)/g, '$1 over '], [/∞/g, ' infinity '], [/μ/g, ' mu '], [/σ/g, ' sigma '], [/α/g, ' alpha '],
    [/🔥|💡|👉|📊|📈|🎯|⭐|🎲|🃏/g, '']
  ];
  function speakify(html) {
    const d = document.createElement('div');
    d.innerHTML = String(html).replace(/<sub>(.*?)<\/sub>/g, ' sub $1 ').replace(/<sup>2<\/sup>/g, ' squared ').replace(/<sup>(.*?)<\/sup>/g, ' to the power $1 ')
      .replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<\/(p|li|h\d|div|tr)>/g, '. ').replace(/<br\s*\/?>/g, '. ').replace(/<\/t[dh]>/g, ', ');
    let t = d.textContent || '';
    t = t.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    SYM.forEach(([r, s]) => { t = t.replace(r, s); });
    return t.replace(/\.\s*\./g, '.').replace(/\s+/g, ' ').trim();
  }
  function speak(html) {
    const text = speakify(html);
    if (!text) return;
    if (window.AndroidTTS && AndroidTTS.isReady && AndroidTTS.isReady()) {
      AndroidTTS.speak(text, st.set.rate, st.set.pitch);
    } else if (window.speechSynthesis) {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text); u.rate = st.set.rate; u.pitch = st.set.pitch; u.lang = 'en-US';
      u.onstart = () => onTtsState(true); u.onend = () => onTtsState(false); u.onerror = () => onTtsState(false);
      speechSynthesis.speak(u);
    } else toast('Text-to-speech is not available');
  }
  function stopSpeak() {
    if (window.AndroidTTS && AndroidTTS.stop) AndroidTTS.stop();
    if (window.speechSynthesis) speechSynthesis.cancel();
    onTtsState(false);
  }
  const toggleSpeak = (html) => { if (speaking) stopSpeak(); else speak(html); };
  window.DMSpeak = { speak, stop: stopSpeak, speakify };

  function toast(msg) {
    const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 1800);
  }
  window.toast = toast;

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const vizHTML = v => { if (!v) return ''; if (v.html) return v.html; try { return Viz[v.type](v); } catch (e) { return ''; } };

  // ---------- navigation ----------
  let tab = 'learn', overlay = null; // overlay: {type:'player'|'tool'|'glossary'|'formulas'|'settings'...}
  let learnScroll = 0;
  window.handleBack = () => {
    if (overlay && overlay.type === 'player') { confirmQuit(); return true; }
    if (overlay) { stopSpeak(); overlay = null; render(); return true; }
    if (tab !== 'learn') { tab = 'learn'; render(); return true; }
    return false;
  };

  function render() {
    if (overlay) {
      if (overlay.type === 'player') return renderPlayer();
      if (overlay.type === 'tool') return renderTool();
      if (overlay.type === 'page') return renderPage();
    }
    const views = { learn: viewLearn, practice: viewPractice, tools: viewTools, library: viewLibrary, me: viewMe };
    $app.innerHTML = `<div class="topbar"><h1>${{ learn: '∀ Discrete Math', practice: 'Practice', tools: 'Math Tools', library: 'Library', me: 'Profile' }[tab]}</h1>
      <span class="pill fire">🔥 ${streakNow()}</span><span class="pill xp">⚡ ${st.xp}</span></div>
      <div class="scroll" id="sc">${views[tab]()}</div>
      <nav class="nav">${[['learn', '🗺️', 'Learn'], ['practice', '🎯', 'Practice'], ['tools', '🧮', 'Tools'], ['library', '📚', 'Library'], ['me', '👤', 'Me']]
        .map(([k, i, l]) => `<button data-tab="${k}" class="${tab === k ? 'on' : ''}"><span class="i">${i}</span>${l}</button>`).join('')}</nav>`;
    $app.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { if (tab === 'learn') learnScroll = document.getElementById('sc').scrollTop; tab = b.dataset.tab; render(); });
    bind();
    if (tab === 'learn') { const sc = document.getElementById('sc'); if (learnScroll) sc.scrollTop = learnScroll; else { const nx = sc.querySelector('.node.next'); if (nx) sc.scrollTop = Math.max(0, nx.offsetTop - 220); } }
  }

  // generic data-act binder
  const ACTS = {};
  function bind(root = $app) {
    root.querySelectorAll('[data-act]').forEach(el => el.onclick = (e) => { const [a, ...args] = el.dataset.act.split('|'); ACTS[a] && ACTS[a](...args, el, e); });
  }

  // ---------- Learn ----------
  function viewLearn() {
    const totalDone = FLAT.filter(l => st.done[l.id]).length;
    const nextL = FLAT.find(l => !st.done[l.id]);
    const goalToday = st.days[today()] || 0;
    let h = `<div class="box row" style="gap:14px">${ring(goalToday / st.set.goal)}<div style="flex:1"><h3>Daily goal</h3><p>${Math.min(goalToday, st.set.goal)} / ${st.set.goal} XP today · ${totalDone}/${FLAT.length} lessons</p></div>
      ${nextL ? `<button class="pill" style="background:var(--pri);color:#fff" data-act="start|${nextL.id}">▶ Go</button>` : ''}</div>`;
    COURSE.forEach((ch, ci) => {
      const d = chapterDone(ch), pct = Math.round(d / ch.lessons.length * 100);
      h += `<div class="chap" style="--c1:${ch.c1};--c2:${ch.c2}"><div class="chap-head"><span class="ico">${ch.icon}</span><small>Chapter ${ci + 1}</small><h2>${ch.title}</h2><p>${ch.desc}</p>
        <div class="prog"><i style="width:${pct}%"></i></div></div><div class="path">`;
      ch.lessons.forEach((l, li) => {
        const done = st.done[l.id], un = isUnlocked(l), next = un && !done && (!nextL || nextL.id === l.id || st.set.unlockAll && nextL.id === l.id);
        const off = [0, 40, 70, 40, 0, -10][li % 6] + 10;
        const nq = l.s.filter(x => x.k !== 'card').length;
        h += `<button class="node ${done ? 'done' : ''} ${next ? 'next' : ''} ${un ? '' : 'lock'}" style="padding-left:${off}px" data-act="${un ? 'start|' + l.id : 'locked'}">
          <span class="dot">${done ? '✓' : un ? (li + 1) : '🔒'}</span><span class="lab"><b>${l.title}</b><span>${done ? '★ Completed · tap to review' : `${l.s.length - nq} cards · ${nq} exercises`}</span></span></button>`;
      });
      const eu = examUnlocked(ch), best = st.examBest[ch.id];
      h += `<button class="node ${best >= 70 ? 'done' : ''} ${eu ? '' : 'lock'}" style="padding-left:10px" data-act="${eu ? 'exam|' + ch.id : 'lockedExam'}">
        <span class="dot" style="border-radius:16px">${eu ? '🏆' : '🔒'}</span><span class="lab"><b>Chapter ${ci + 1} Test</b><span>${best !== undefined ? 'Best score ' + best + '%' : 'Pass with 70% or more'}</span></span></button></div></div>`;
    });
    h += `<div class="box" style="text-align:center"><h3>🎓 Final Exam</h3><p>50 questions from every chapter. Great practice before your WGU objective assessment.</p><br><button class="btn" data-act="final">Start Final Exam</button></div>`;
    return h;
  }
  function ring(p) {
    p = Math.min(1, p); const r = 26, c = 2 * Math.PI * r;
    return `<svg class="goal-ring" viewBox="0 0 64 64"><circle cx="32" cy="32" r="${r}" stroke="#262A52" stroke-width="7" fill="none"/><circle cx="32" cy="32" r="${r}" stroke="#3EE6C1" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p)}" transform="rotate(-90 32 32)"/><text x="32" y="37" text-anchor="middle" fill="#fff" font-size="14" font-weight="800">${p >= 1 ? '✓' : Math.round(p * 100) + '%'}</text></svg>`;
  }
  ACTS.locked = () => toast('Finish the previous lesson to unlock this one');
  ACTS.lockedExam = () => toast('Complete every lesson in this chapter first');
  ACTS.start = (id) => startLesson(LMAP[id]);
  ACTS.exam = (cid) => { const ch = COURSE.find(c => c.id === cid); startQuiz(`Chapter ${COURSE.indexOf(ch) + 1} Test`, poolFrom(ch.lessons), 15, 'exam', ch.id); };
  ACTS.final = () => startQuiz('Final Exam', poolFrom(FLAT), 50, 'exam', 'final');

  function poolFrom(lessons) {
    const pool = [];
    lessons.forEach(l => l.s.forEach((x, i) => { if (x.k !== 'card') pool.push({ item: x, key: l.id + ':' + i }); }));
    return pool;
  }

  // ---------- Player ----------
  function prepItem(x, key) {
    const it = { x, key, state: {} };
    if (x.k === 'mc' || x.k === 'multi') it.order = (x.noShuffle || x.o.some(o => /(all|none|both) of the above/i.test(o))) ? x.o.map((_, i) => i) : shuffle(x.o.map((_, i) => i));
    if (x.k === 'blank') it.order = shuffle(x.o.map((_, i) => i));
    if (x.k === 'order') it.order = (() => { let o; do { o = shuffle(x.o.map((_, i) => i)); } while (x.o.length > 1 && o.every((v, i) => v === i)); return o; })();
    return it;
  }
  function startLesson(l) {
    stopSpeak();
    overlay = { type: 'player', mode: 'lesson', lesson: l, title: l.title, items: l.s.map((x, i) => prepItem(x, l.id + ':' + i)), idx: 0, firstTry: 0, nQ: l.s.filter(x => x.k !== 'card').length, retried: {}, xp: 0, answered: false };
    render();
  }
  function startQuiz(title, pool, n, mode, examId) {
    if (!pool.length) { toast('Nothing to practice yet'); return; }
    stopSpeak();
    const pick = shuffle(pool).slice(0, n);
    overlay = { type: 'player', mode, examId, title, items: pick.map(p => prepItem(p.item, p.key)), idx: 0, firstTry: 0, nQ: pick.length, retried: {}, xp: 0, answered: false };
    render();
  }
  function confirmQuit() {
    const o = overlay;
    if (o.finished || o.idx === 0 && !o.answered) { stopSpeak(); overlay = null; render(); return; }
    if (o.quitAsk) { stopSpeak(); overlay = null; render(); return; }
    o.quitAsk = true; toast('Press back again to quit — progress in this lesson will be lost');
    setTimeout(() => { if (overlay === o) o.quitAsk = false; }, 2500);
  }

  function itemSpeech(it) {
    const x = it.x;
    if (x.k === 'card') return `${x.t}. ${x.say || x.b}`;
    let s = x.q;
    if (x.k === 'blank') s = x.q.replace(/___/g, ' blank ');
    if (st.set.readOpts) {
      if (x.k === 'mc' || x.k === 'multi') s += '. ' + it.order.map((oi, i) => `Option ${'ABCDEFG'[i]}: ${x.o[oi]}`).join('. ');
      if (x.k === 'tf') s += '. True or false?';
      if (x.k === 'blank') s += '. Choices: ' + it.order.map(i => x.o[i]).join(', ');
      if (x.k === 'order') s += '. Put these in order: ' + it.order.map(i => x.o[i]).join('. ');
    }
    return s;
  }

  function renderPlayer() {
    const o = overlay;
    if (o.finished) return renderFinish();
    const it = o.items[o.idx], x = it.x;
    const pct = Math.round(o.idx / o.items.length * 100);
    let body = '', foot = '';
    if (x.k === 'card') {
      body = `<div class="kind">${o.mode === 'lesson' ? 'Learn' : 'Review'}</div><h2>${x.t}</h2>${vizHTML(x.viz)}<div class="txt">${x.b}</div>`;
      foot = `<button class="btn" data-act="next">Continue</button>`;
    } else {
      const kindLbl = { mc: 'Choose the answer', tf: 'True or false?', num: 'Calculate', blank: 'Fill in the blank', order: 'Put in order', multi: 'Select all that apply' }[x.k];
      body = `<div class="kind">${kindLbl}${o.mode !== 'lesson' && it.key ? `<span class="badge">${LMAP[it.key.split(':')[0]] ? LMAP[it.key.split(':')[0]].title : ''}</span>` : ''}</div>${vizHTML(x.viz)}`;
      body += `<div id="qz">${qHTML(it)}</div>`;
      if (!o.answered) foot = `<button class="btn" id="checkBtn" data-act="check" ${canCheck(it) ? '' : 'disabled'}>Check</button>`;
      else {
        const ok = it.state.ok;
        foot = `<div class="fb ${ok ? 'ok' : 'bad'}"><h4>${ok ? '✅ ' + pickPraise() : '❌ Not quite'}<button class="spk" data-live data-act="sayfb">🔊</button></h4><p>${ok ? '' : `<b>Answer:</b> ${answerText(x)}<br>`}${x.e || ''}</p></div>
          <button class="btn ${ok ? 'ok' : 'bad'}" data-act="next">${ok ? 'Continue' : (o.mode === 'lesson' ? 'Got it' : 'Continue')}</button>`;
      }
    }
    $app.innerHTML = `<div class="lp-top"><button class="x" data-act="quit">✕</button><div class="bar"><i style="width:${pct}%"></i></div><button class="spk" data-live data-act="say">🔊</button></div>
      <div class="lp-body" id="lpb">${body}</div><div class="lp-foot">${foot}</div>`;
    if (speaking) document.querySelectorAll('.spk[data-live]').forEach(b => b.classList.add('on'));
    bind(); bindQ(it);
    if (st.set.auto && !o.answered && o._spokenIdx !== o.idx + ':' + o.items.length) { o._spokenIdx = o.idx + ':' + o.items.length; speak(itemSpeech(it)); }
  }
  const PRAISE = ['Nice work!', 'Correct!', 'You got it!', 'Excellent!', 'Great job!', 'Spot on!'];
  const pickPraise = () => PRAISE[Math.floor(Math.random() * PRAISE.length)];
  ACTS.quit = () => confirmQuit();
  ACTS.say = () => toggleSpeak(itemSpeech(overlay.items[overlay.idx]));
  ACTS.sayfb = () => { const it = overlay.items[overlay.idx]; toggleSpeak((it.state.ok ? 'Correct. ' : 'The answer is: ' + answerText(it.x) + '. ') + (it.x.e || '')); };

  function answerText(x) {
    if (x.k === 'mc') return x.o[x.a];
    if (x.k === 'tf') return x.a ? 'True' : 'False';
    if (x.k === 'num') return (x.show || Stat.fmt(x.a, 4)) + (x.unit ? ' ' + x.unit : '');
    if (x.k === 'blank') return x.o[x.a];
    if (x.k === 'order') return x.o.map((s, i) => `${i + 1}) ${s}`).join(' ');
    if (x.k === 'multi') return x.a.map(i => x.o[i]).join('; ');
    return '';
  }

  function qHTML(it) {
    const x = it.x, s = it.state, done = overlay.answered;
    if (x.k === 'mc' || x.k === 'multi') {
      return `<div class="q">${x.q}</div><div class="opts">${it.order.map((oi) => {
        let cls = '';
        const sel = x.k === 'mc' ? s.sel === oi : (s.sel || []).includes(oi);
        if (sel) cls = 'sel';
        if (done) { const right = x.k === 'mc' ? oi === x.a : x.a.includes(oi); if (right) cls = 'right'; else if (sel) cls = 'wrong'; }
        return `<button class="opt ${cls}" data-o="${oi}">${x.k === 'multi' ? `<span class="ck">${sel ? '✓' : ''}</span>` : ''}${x.o[oi]}</button>`;
      }).join('')}</div>`;
    }
    if (x.k === 'tf') {
      return `<div class="q">${x.q}</div><div class="tfrow">${[true, false].map(v => {
        let cls = s.sel === v ? 'sel' : ''; if (done) { if (v === x.a) cls = 'right'; else if (s.sel === v) cls = 'wrong'; }
        return `<button class="opt ${cls}" data-tf="${v}">${v ? 'True' : 'False'}</button>`;
      }).join('')}</div>`;
    }
    if (x.k === 'num') {
      return `<div class="q">${x.q}</div><input class="num-in" id="numIn" inputmode="decimal" autocomplete="off" placeholder="${x.ph || 'Your answer'}" value="${s.val ? esc(s.val) : ''}" ${done ? 'disabled' : ''}>
        <p style="color:var(--mut);font-size:13px;text-align:center">${x.hint || 'Round to ' + (x.dp !== undefined ? x.dp : 2) + ' decimal places if needed. Fractions like 3/8 work too.'}</p>`;
    }
    if (x.k === 'blank') {
      const filled = s.sel !== undefined ? x.o[s.sel] : '';
      const parts = x.q.split('___');
      return `<div class="kind" style="color:var(--mut)">${x.lead || ''}</div><div class="blank-s">${parts[0]}<span class="slot" data-clear="1" style="${done ? (s.ok ? 'color:var(--ok);border-color:var(--ok)' : 'color:var(--bad);border-color:var(--bad)') : ''}">${filled || '&nbsp;'}</span>${parts.slice(1).join('___')}</div>
        <div class="chips">${it.order.map(i => `<button class="chip ${s.sel === i ? 'used' : ''}" data-b="${i}">${x.o[i]}</button>`).join('')}</div>`;
    }
    if (x.k === 'order') {
      const ans = s.seq || [];
      return `<div class="q">${x.q}</div><div class="answer-zone">${ans.length ? ans.map((i, p) => `<button class="chip" data-rm="${p}">${p + 1}. ${x.o[i]}</button>`).join('') : '<div class="ph">Tap the items below in the correct order</div>'}</div>
        <div class="chips">${it.order.map(i => `<button class="chip ${ans.includes(i) ? 'used' : ''}" data-ad="${i}">${x.o[i]}</button>`).join('')}</div>`;
    }
    return '';
  }
  function canCheck(it) {
    const x = it.x, s = it.state;
    if (x.k === 'mc' || x.k === 'blank') return s.sel !== undefined;
    if (x.k === 'tf') return s.sel !== undefined;
    if (x.k === 'multi') return (s.sel || []).length > 0;
    if (x.k === 'num') return !!(s.val && s.val.trim());
    if (x.k === 'order') return (s.seq || []).length === x.o.length;
  }
  function refreshQ(it) {
    const b = document.getElementById('lpb'), keep = b.scrollTop;
    document.getElementById('qz').innerHTML = qHTML(it);
    b.scrollTop = keep;
    const cb = document.getElementById('checkBtn'); if (cb) cb.disabled = !canCheck(it);
    bindQ(it);
  }
  function bindQ(it) {
    if (overlay.answered) return;
    const x = it.x, s = it.state, b = document.getElementById('lpb');
    if (!b) return;
    b.querySelectorAll('[data-o]').forEach(el => el.onclick = () => {
      const v = +el.dataset.o;
      if (x.k === 'mc') s.sel = v; else { s.sel = s.sel || []; s.sel = s.sel.includes(v) ? s.sel.filter(z => z !== v) : s.sel.concat(v); }
      refreshQ(it);
    });
    b.querySelectorAll('[data-tf]').forEach(el => el.onclick = () => { s.sel = el.dataset.tf === 'true'; refreshQ(it); });
    b.querySelectorAll('[data-b]').forEach(el => el.onclick = () => { s.sel = +el.dataset.b; refreshQ(it); });
    b.querySelectorAll('[data-clear]').forEach(el => el.onclick = () => { delete s.sel; refreshQ(it); });
    b.querySelectorAll('[data-ad]').forEach(el => el.onclick = () => { s.seq = (s.seq || []).concat(+el.dataset.ad); refreshQ(it); });
    b.querySelectorAll('[data-rm]').forEach(el => el.onclick = () => { s.seq.splice(+el.dataset.rm, 1); refreshQ(it); });
    const ni = document.getElementById('numIn');
    if (ni) {
      ni.oninput = () => { s.val = ni.value; const cb = document.getElementById('checkBtn'); if (cb) cb.disabled = !canCheck(it); };
      ni.onkeydown = e => { if (e.key === 'Enter' && canCheck(it)) ACTS.check(); };
    }
  }
  function parseNum(v) {
    v = String(v).trim().replace(/,/g, '').replace(/−/g, '-').replace(/\s+/g, '');
    let pct = false; if (v.endsWith('%')) { pct = true; v = v.slice(0, -1); }
    let n;
    if (/^-?\d*\.?\d+\/-?\d*\.?\d+$/.test(v)) { const [a, b] = v.split('/'); n = parseFloat(a) / parseFloat(b); }
    else n = Number(v);
    return { n, pct };
  }
  function grade(it) {
    const x = it.x, s = it.state;
    if (x.k === 'mc' || x.k === 'blank') return s.sel === x.a;
    if (x.k === 'tf') return s.sel === x.a;
    if (x.k === 'multi') return s.sel.length === x.a.length && x.a.every(i => s.sel.includes(i));
    if (x.k === 'order') return s.seq.every((v, i) => v === i);
    if (x.k === 'num') {
      const { n, pct } = parseNum(s.val); if (isNaN(n)) return false;
      const ok = v => Math.abs(v - x.a) <= x.tol;
      if (ok(n)) return true;
      if (pct && ok(n / 100)) return true;
      if (x.pct && ok(n / 100)) return true; // typed 25 for 0.25 on percent questions
      return false;
    }
    return false;
  }
  ACTS.check = () => {
    const o = overlay, it = o.items[o.idx];
    if (!canCheck(it)) return;
    stopSpeak();
    const ok = grade(it); it.state.ok = ok; o.answered = true;
    const first = !it.retry;
    if (ok && first) { o.firstTry++; }
    if (it.key) {
      if (!ok) st.mist[it.key] = (st.mist[it.key] || 0) + 1;
      else if (o.mode === 'review' && st.mist[it.key]) delete st.mist[it.key];
      save();
    }
    if (!ok && o.mode === 'lesson' && (it.tries || 0) < 2) { // Mimo-style: wrong items come back at the end
      const again = prepItem(it.x, it.key); again.retry = true; again.tries = (it.tries || 0) + 1; o.items.push(again);
    }
    vibrate(ok ? 15 : [30, 40, 30]);
    renderPlayer();
    if (!ok) { const lb = document.getElementById('lpb'); lb && lb.classList.add('shake'); }
    const lb = document.getElementById('lpb'); if (lb) lb.scrollTop = lb.scrollHeight;
  };
  const vibrate = p => { try { navigator.vibrate && navigator.vibrate(p); } catch (e) { } };
  ACTS.next = () => {
    const o = overlay; stopSpeak();
    o.answered = false; o.idx++;
    if (o.idx >= o.items.length) finish(); else renderPlayer();
    const lb = document.getElementById('lpb'); if (lb) lb.scrollTop = 0;
  };

  function finish() {
    const o = overlay; o.finished = true;
    const acc = o.nQ ? Math.round(o.firstTry / o.nQ * 100) : 100;
    o.acc = acc;
    if (o.mode === 'lesson') {
      const wasDone = st.done[o.lesson.id];
      o.xp = wasDone ? 5 + o.firstTry : 10 + o.firstTry * 2;
      st.done[o.lesson.id] = Math.max(st.done[o.lesson.id] || 0, acc) || 1;
    } else {
      o.xp = o.firstTry * 2 + (o.mode === 'exam' && acc >= 70 ? 15 : 0);
      if (o.mode === 'exam') st.examBest[o.examId] = Math.max(st.examBest[o.examId] || 0, acc);
    }
    addXP(o.xp);
    renderFinish();
  }
  function renderFinish() {
    const o = overlay, pass = o.mode !== 'exam' || o.acc >= 70;
    const next = o.mode === 'lesson' ? FLAT[o.lesson.gi + 1] : null;
    const goal = st.days[today()] || 0;
    $app.innerHTML = `<div class="scroll"><div class="finish"><div class="trophy">${pass ? (o.acc === 100 ? '🏆' : '🎉') : '📘'}</div>
      <h2>${o.mode === 'lesson' ? 'Lesson complete!' : pass ? 'You passed!' : 'Keep practicing'}</h2><p style="color:var(--mut)">${o.title}</p>
      <div class="stats3"><div style="border-color:#FFB547;color:#FFB547"><small>XP</small><b>+${o.xp}</b></div>
      <div style="border-color:#3EE6C1;color:#3EE6C1"><small>Accuracy</small><b>${o.acc}%</b></div>
      <div style="border-color:#FF9F43;color:#FF9F43"><small>Streak</small><b>🔥${streakNow()}</b></div></div>
      ${goal >= st.set.goal ? '<p>🎯 Daily goal reached — awesome!</p>' : `<p style="color:var(--mut)">${st.set.goal - goal} XP to today's goal</p>`}
      ${o.mode === 'exam' && !pass ? '<p style="color:var(--mut)">You need 70% to pass. Review the lessons or try "Review mistakes" in Practice.</p>' : ''}
      </div></div><div class="lp-foot">${next && isUnlocked(next) ? `<button class="btn" data-act="start|${next.id}">Next: ${next.title}</button><div style="height:12px"></div>` : ''}<button class="btn ghost" data-act="home">Back to path</button></div>`;
    bind();
    if (st.set.auto) speak(`${o.mode === 'lesson' ? 'Lesson complete' : pass ? 'You passed' : 'Keep practicing'}. You earned ${o.xp} XP with ${o.acc} percent accuracy.`);
  }
  ACTS.home = () => { stopSpeak(); overlay = null; tab = 'learn'; learnScroll = 0; render(); };

  // ---------- Practice ----------
  function viewPractice() {
    const doneLessons = FLAT.filter(l => st.done[l.id]);
    const mistKeys = Object.keys(st.mist).filter(k => LMAP[k.split(':')[0]]);
    let h = `<div class="sect">Smart practice</div>
      <button class="list-item" data-act="review"><span class="em">🩹</span><div><b>Review mistakes</b><span>${mistKeys.length} question${mistKeys.length === 1 ? '' : 's'} you missed</span></div><span class="chev">›</span></button>
      <button class="list-item" data-act="quick"><span class="em">⚡</span><div><b>Quick practice</b><span>10 random questions from lessons you finished</span></div><span class="chev">›</span></button>
      <button class="list-item" data-act="calcdrill"><span class="em">🧮</span><div><b>Calculation drill</b><span>Only number-answer questions (mod, counting, graphs…)</span></div><span class="chev">›</span></button>
      <button class="list-item" data-act="final"><span class="em">🎓</span><div><b>Final exam</b><span>50 mixed questions across the whole course${st.examBest.final !== undefined ? ' · best ' + st.examBest.final + '%' : ''}</span></div><span class="chev">›</span></button>
      <div class="sect">Practice by chapter</div>`;
    COURSE.forEach((ch, ci) => {
      h += `<button class="list-item" data-act="chprac|${ch.id}"><span class="em">${ch.icon}</span><div><b>${ci + 1}. ${ch.title}</b><span>${chapterDone(ch)}/${ch.lessons.length} lessons${st.examBest[ch.id] !== undefined ? ' · test best ' + st.examBest[ch.id] + '%' : ''}</span></div><span class="chev">›</span></button>`;
    });
    if (!doneLessons.length) h = `<div class="box"><p>Finish your first lesson to unlock quick practice. Chapter practice works any time.</p></div>` + h;
    return h;
  }
  ACTS.review = () => {
    const keys = Object.keys(st.mist).filter(k => LMAP[k.split(':')[0]]);
    if (!keys.length) { toast('No mistakes to review — nice!'); return; }
    const pool = keys.map(k => { const [lid, i] = k.split(':'); return { item: LMAP[lid].s[+i], key: k }; }).filter(p => p.item);
    startQuiz('Review mistakes', pool, 15, 'review');
  };
  ACTS.quick = () => { const d = FLAT.filter(l => st.done[l.id]); startQuiz('Quick practice', poolFrom(d.length ? d : FLAT.slice(0, 3)), 10, 'practice'); };
  ACTS.calcdrill = () => { const d = FLAT.filter(l => st.done[l.id]); const pool = poolFrom(d.length >= 3 ? d : FLAT).filter(p => p.item.k === 'num'); startQuiz('Calculation drill', pool, 10, 'practice'); };
  ACTS.chprac = (cid) => { const ch = COURSE.find(c => c.id === cid); startQuiz(ch.title + ' practice', poolFrom(ch.lessons), 12, 'practice'); };

  // ---------- Tools ----------
  function viewTools() {
    return `<div class="sect">Calculators</div>` + TOOLS.map((t, i) => `<button class="list-item" data-act="tool|${i}"><span class="em">${t.icon}</span><div><b>${t.name}</b><span>${t.desc}</span></div><span class="chev">›</span></button>`).join('');
  }
  ACTS.tool = (i) => { overlay = { type: 'tool', i: +i }; render(); };
  function renderTool() {
    const t = TOOLS[overlay.i];
    $app.innerHTML = `<div class="topbar"><button class="x" style="font-size:22px;color:var(--mut)" data-act="back">←</button><h1>${t.icon} ${t.name}</h1><button class="spk" data-live data-act="saytool">🔊</button></div>
      <div class="scroll" id="sc"><div class="box">${t.ui()}</div><div id="tout"></div></div>`;
    bind();
    t.init && t.init(document.getElementById('sc'));
  }
  ACTS.back = () => { stopSpeak(); overlay = null; render(); };
  ACTS.saytool = () => { const r = document.getElementById('tout'); toggleSpeak(r && r.innerText.trim() ? r.innerHTML : TOOLS[overlay.i].desc); };

  // ---------- Library ----------
  function viewLibrary() {
    return `<div class="sect">Reference</div>
      <button class="list-item" data-act="page|formulas"><span class="em">📐</span><div><b>Formula sheet</b><span>Every formula in the course, explained</span></div><span class="chev">›</span></button>
      <button class="list-item" data-act="page|laws"><span class="em">⚖️</span><div><b>Laws & rules cheat sheet</b><span>Equivalences, inference rules, fallacies, Boolean laws</span></div><span class="chev">›</span></button>
      <button class="list-item" data-act="page|glossary"><span class="em">📖</span><div><b>Glossary</b><span>${GLOSSARY.length} discrete math terms with tap-to-listen</span></div><span class="chev">›</span></button>
      <button class="list-item" data-act="page|symbols"><span class="em">🔣</span><div><b>Symbol guide</b><span>How to read every symbol in the course</span></div><span class="chev">›</span></button>
      <div class="sect">Lessons by chapter</div>` +
      COURSE.map((ch, ci) => `<button class="list-item" data-act="page|ch|${ch.id}"><span class="em">${ch.icon}</span><div><b>${ci + 1}. ${ch.title}</b><span>Read all lesson notes</span></div><span class="chev">›</span></button>`).join('');
  }
  ACTS.page = (p, arg) => { overlay = { type: 'page', p, arg, q: '' }; render(); };
  function renderPage() {
    const o = overlay; let title = '', body = '';
    if (o.p === 'formulas') { title = '📐 Formulas'; body = FORMULAS.map((g, gi) => `<div class="sect">${g.g}</div>` + g.items.map((f, fi) => `<div class="gl"><button class="spk" data-act="sayf|${gi}|${fi}">🔊</button><b>${f.n}</b>${F(f.f)}<p>${f.d}</p></div>`).join('')).join(''); }
    if (o.p === 'glossary') {
      title = '📖 Glossary';
      body = `<div class="search"><input id="gq" placeholder="Search terms…" value="${esc(o.q)}"></div><div id="glist"></div>`;
    }
    if (o.p === 'laws') { title = '⚖️ Laws & rules'; body = LAWS_PAGE; }
    if (o.p === 'symbols') { title = '🔣 Symbols'; body = SYMBOLS_PAGE; }
    if (o.p === 'ch') {
      const ch = COURSE.find(c => c.id === o.arg); title = ch.icon + ' ' + ch.title;
      body = ch.lessons.map(l => `<div class="sect">${l.title}</div>` + l.s.filter(x => x.k === 'card').map(x => `<div class="box"><h3>${x.t}</h3>${vizHTML(x.viz)}<div class="txt" style="font-size:15px">${x.b}</div></div>`).join('')).join('');
    }
    $app.innerHTML = `<div class="topbar"><button class="x" style="font-size:22px;color:var(--mut)" data-act="back">←</button><h1>${title}</h1>${o.p === 'ch' || o.p === 'laws' || o.p === 'symbols' ? '<button class="spk" data-live data-act="saypage">🔊</button>' : ''}</div><div class="scroll" id="sc">${body}</div>`;
    bind();
    if (o.p === 'glossary') {
      const draw = () => {
        const q = o.q.toLowerCase();
        const list = GLOSSARY.filter(g => !q || g[0].toLowerCase().includes(q) || g[1].toLowerCase().includes(q));
        const el = document.getElementById('glist');
        el.innerHTML = list.map(g => `<div class="gl"><button class="spk" data-term="${esc(g[0])}">🔊</button><b>${g[0]}</b><p>${g[1]}</p></div>`).join('') || '<div class="box"><p>No matches.</p></div>';
        el.querySelectorAll('[data-term]').forEach(b => b.onclick = () => { const g = GLOSSARY.find(z => z[0] === b.dataset.term); speak(g[0] + '. ' + g[1]); });
      };
      const gi = document.getElementById('gq'); gi.oninput = () => { o.q = gi.value; draw(); }; draw();
    }
  }
  ACTS.sayf = (gi, fi) => { const f = FORMULAS[gi].items[fi]; speak(`${f.n}. ${f.say || f.f}. ${f.d}`); };
  ACTS.saypage = () => toggleSpeak(document.getElementById('sc').innerHTML);
  // ---------- Profile / settings ----------
  function viewMe() {
    const total = FLAT.length, done = FLAT.filter(l => st.done[l.id]).length;
    let week = '';
    for (let i = -6; i <= 0; i++) { const d = new Date(); d.setDate(d.getDate() + i); const k = dayKey(i); week += `<div>${'SMTWTFS'[d.getDay()]}<i class="${st.days[k] ? 'on' : ''}">${st.days[k] ? '🔥' : ''}</i></div>`; }
    const s = st.set;
    return `<div class="grid2"><div class="tile"><div class="big">🔥 ${streakNow()}</div><small>Day streak · best ${st.best}</small></div><div class="tile"><div class="big">⚡ ${st.xp}</div><small>Total XP</small></div>
      <div class="tile"><div class="big">${done}/${total}</div><small>Lessons done</small></div><div class="tile"><div class="big">${Math.round(done / total * 100)}%</div><small>Course progress</small></div></div>
      <div class="box"><h3>This week</h3><div class="week">${week}</div></div>
      <div class="sect">Text to speech</div><div class="box">
        <div class="setrow"><div><b>Auto-read every screen</b><span>Reads lessons and questions aloud automatically</span></div><button class="toggle ${s.auto ? 'on' : ''}" data-act="tog|auto"></button></div>
        <div class="setrow"><div><b>Read answer choices</b><span>Include the options when reading a question</span></div><button class="toggle ${s.readOpts ? 'on' : ''}" data-act="tog|readOpts"></button></div>
        <div class="setrow" style="display:block"><b>Speech speed: <span id="rv">${s.rate.toFixed(2)}×</span></b><input type="range" id="rate" min="0.5" max="2" step="0.05" value="${s.rate}"></div>
        <div class="setrow" style="display:block"><b>Voice pitch: <span id="pv">${s.pitch.toFixed(2)}</span></b><input type="range" id="pitch" min="0.6" max="1.6" step="0.05" value="${s.pitch}"></div>
        <div class="setrow" id="voiceRow" style="display:none;"><div style="flex:1"><b>Voice</b><div class="field"><select id="voiceSel"></select></div></div></div>
        <button class="btn ghost" data-act="testvoice">🔊 Test voice</button>
      </div>
      <div class="sect">Learning</div><div class="box">
        <div class="setrow"><div><b>Unlock all lessons</b><span>Jump to any topic (useful for exam prep)</span></div><button class="toggle ${s.unlockAll ? 'on' : ''}" data-act="tog|unlockAll"></button></div>
        <div class="setrow"><div><b>Daily goal</b><span>XP per day</span></div><div class="seg" style="margin:0">${[20, 30, 50, 80].map(g => `<button class="${s.goal === g ? 'on' : ''}" data-act="goal|${g}">${g}</button>`).join('')}</div></div>
      </div>
      <div class="box"><button class="btn bad" data-act="reset">Reset all progress</button></div>
      <p style="text-align:center;color:var(--mut);font-size:12px">Discrete Math v1.0 · built for WGU Applied Discrete Mathematics</p>`;
  }
  ACTS.tog = (k) => { st.set[k] = !st.set[k]; save(); if (k === 'auto' && !st.set.auto) stopSpeak(); render(); };
  ACTS.goal = (g) => { st.set.goal = +g; save(); render(); };
  ACTS.testvoice = () => speak('Hi Kristine! If p implies q, and p is true, then q is true. Let\'s master discrete math together.');
  ACTS.reset = (el) => {
    if (!el.dataset.sure) { el.dataset.sure = 1; el.textContent = 'Tap again to confirm reset'; return; }
    const keepSet = st.set; st = JSON.parse(JSON.stringify(def)); st.set = keepSet; save(); toast('Progress reset'); render();
  };
  // live sliders
  document.addEventListener('input', e => {
    if (e.target.id === 'rate') { st.set.rate = +e.target.value; document.getElementById('rv').textContent = st.set.rate.toFixed(2) + '×'; save(); }
    if (e.target.id === 'pitch') { st.set.pitch = +e.target.value; document.getElementById('pv').textContent = st.set.pitch.toFixed(2); save(); }
  });
  document.addEventListener('change', e => {
    if (e.target.id === 'voiceSel') { st.set.voice = e.target.value; save(); if (window.AndroidTTS) AndroidTTS.setVoice(st.set.voice); speak('This is my new voice.'); }
  });
  const _rMe = render;
  function fillVoices() {
    const row = document.getElementById('voiceRow'); if (!row || !window.AndroidTTS || !AndroidTTS.voices) return;
    let list = []; try { list = JSON.parse(AndroidTTS.voices()); } catch (e) { }
    if (!list.length) return;
    row.style.display = 'flex';
    const sel = document.getElementById('voiceSel');
    sel.innerHTML = '<option value="">System default</option>' + list.sort().map(v => `<option ${v === st.set.voice ? 'selected' : ''} value="${esc(v)}">${esc(v)}</option>`).join('');
  }
  const origRender = render;
  render = function () { origRender(); if (!overlay && tab === 'me') fillVoices(); };

  // apply saved voice when TTS becomes ready
  setTimeout(function tryVoice() {
    if (window.AndroidTTS && AndroidTTS.isReady) { if (AndroidTTS.isReady()) { if (st.set.voice) AndroidTTS.setVoice(st.set.voice); } else setTimeout(tryVoice, 700); }
  }, 600);

  window.DMApp = { st, FLAT, COURSE, ACTS, render: () => render(), speakify };
  render();
})();
