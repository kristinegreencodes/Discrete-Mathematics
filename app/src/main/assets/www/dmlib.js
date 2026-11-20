// Discrete math helper library used by tools, content checks and the lesson engine.
(function () {
  const D = {};
  D.fmt = (v, dp = 4) => {
    if (typeof v !== 'number' || !isFinite(v)) return String(v);
    if (Number.isInteger(v)) return String(v);
    return String(+v.toFixed(dp));
  };
  // ---- number theory (BigInt-safe where it matters) ----
  D.mod = (a, n) => ((a % n) + n) % n;
  D.gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  D.lcm = (a, b) => (a && b) ? Math.abs(a / D.gcd(a, b) * b) : 0;
  D.euclidSteps = (a, b) => { const s = []; a = Math.abs(a); b = Math.abs(b); while (b) { const q = Math.floor(a / b), r = a % b; s.push([a, b, q, r]); a = b; b = r; } return { g: a, steps: s }; };
  D.egcd = (a, b) => { // returns [g, s, t] with s*a + t*b = g
    let [r0, r1, s0, s1, t0, t1] = [a, b, 1, 0, 0, 1];
    while (r1 !== 0) { const q = Math.floor(r0 / r1); [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; [t0, t1] = [t1, t0 - q * t1]; }
    return [r0, s0, t0];
  };
  D.modInv = (a, n) => { const [g, s] = D.egcd(D.mod(a, n), n); return g === 1 ? D.mod(s, n) : null; };
  D.modPow = (b, e, m) => {
    if (m === 1) return 0;
    let r = 1n, B = BigInt(D.mod(b, m)), E = BigInt(e), M = BigInt(m);
    while (E > 0n) { if (E & 1n) r = r * B % M; B = B * B % M; E >>= 1n; }
    return Number(r);
  };
  D.isPrime = n => { if (n < 2 || !Number.isInteger(n)) return false; if (n < 4) return true; if (n % 2 === 0) return false; for (let i = 3; i * i <= n; i += 2) if (n % i === 0) return false; return true; };
  D.factor = n => { const f = []; n = Math.abs(n); for (let p = 2; p * p <= n; p++) while (n % p === 0) { f.push(p); n /= p; } if (n > 1) f.push(n); return f; };
  D.factorStr = n => { const f = D.factor(n), c = {}; f.forEach(p => c[p] = (c[p] || 0) + 1); return Object.keys(c).map(p => c[p] > 1 ? `${p}<sup>${c[p]}</sup>` : p).join(' · ') || String(n); };
  // ---- bases ----
  D.toBase = (n, b) => BigInt(n).toString(b).toUpperCase();
  D.fromBase = (s, b) => { s = String(s).trim().toLowerCase(); if (!s) return NaN; const dig = '0123456789abcdefghijklmnopqrstuvwxyz'.slice(0, b); if (![...s].every(c => dig.includes(c))) return NaN; let v = 0n; for (const c of s) v = v * BigInt(b) + BigInt(dig.indexOf(c)); return v; };
  // ---- counting ----
  D.fact = n => { let r = 1n; for (let i = 2n; i <= BigInt(n); i++) r *= i; return r; };
  D.P = (n, r) => { if (r > n || r < 0) return 0n; let p = 1n; for (let i = 0; i < r; i++) p *= BigInt(n - i); return p; };
  D.C = (n, r) => { if (r > n || r < 0) return 0n; r = Math.min(r, n - r); let c = 1n; for (let i = 1; i <= r; i++) c = c * BigInt(n - r + i) / BigInt(i); return c; };
  D.big = x => { const s = x.toString(); return s.length > 4 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : s; };

  // ---- propositional logic parser ----
  // Accepts: ¬ ~ ! NOT, ∧ & AND ^ , ∨ | OR, → -> IMPLIES, ↔ <-> IFF, ⊕ XOR, T F 1 0, parentheses.
  D.parseLogic = (src) => {
    const s = String(src).replace(/<->|<=>|↔|\biff\b/gi, ' ↔ ').replace(/->|=>|→|\bimplies\b/gi, ' → ')
      .replace(/\bxor\b|⊕/gi, ' ⊕ ').replace(/\band\b|&&?|∧|\^|·|\*/gi, ' ∧ ').replace(/\bor\b|\|\|?|∨|\+/gi, ' ∨ ')
      .replace(/\bnot\b|~|!|¬/gi, ' ¬ ').replace(/\(/g, ' ( ').replace(/\)/g, ' ) ');
    const tk = s.split(/\s+/).filter(Boolean);
    let i = 0; const vars = new Set();
    const peek = () => tk[i], eat = t => { if (tk[i] !== t) throw new Error('Expected ' + t); i++; };
    function prim() {
      const t = tk[i++];
      if (t === undefined) throw new Error('Expression ended too early');
      if (t === '(') { const e = bic(); eat(')'); return e; }
      if (t === '¬') { const e = prim(); return { op: '¬', a: e }; }
      if (/^(T|1|true)$/i.test(t)) return { c: true };
      if (/^(F|0|false)$/i.test(t)) return { c: false };
      if (/^[a-z][a-z0-9_]*$/i.test(t)) { vars.add(t); return { v: t }; }
      throw new Error('Unexpected "' + t + '"');
    }
    function bin(next, ops) { return function () { let l = next(); while (ops.includes(peek())) { const op = tk[i++]; l = { op, a: l, b: next() }; } return l; }; }
    const conj = bin(prim, ['∧']), disj = bin(conj, ['∨', '⊕']);
    function imp() { const l = disj(); if (peek() === '→') { i++; return { op: '→', a: l, b: imp() }; } return l; } // right-assoc
    const bic = bin(imp, ['↔']);
    const tree = bic();
    if (i < tk.length) throw new Error('Unexpected "' + tk[i] + '"');
    return { tree, vars: [...vars].sort() };
  };
  D.evalLogic = (n, env) => {
    if ('c' in n) return n.c; if ('v' in n) return env[n.v];
    const a = D.evalLogic(n.a, env); if (n.op === '¬') return !a;
    const b = D.evalLogic(n.b, env);
    return { '∧': a && b, '∨': a || b, '⊕': a !== b, '→': !a || b, '↔': a === b }[n.op];
  };
  D.showLogic = (n, top = true) => {
    if ('c' in n) return n.c ? 'T' : 'F'; if ('v' in n) return n.v;
    if (n.op === '¬') return '¬' + D.showLogic(n.a, false);
    const s = D.showLogic(n.a, false) + ' ' + n.op + ' ' + D.showLogic(n.b, false);
    return top ? s : '(' + s + ')';
  };
  D.subExprs = (n, out = []) => { if ('op' in n) { D.subExprs(n.a, out); if (n.b) D.subExprs(n.b, out); const s = D.showLogic(n); if (!out.some(o => o.s === s)) out.push({ s, n }); } return out; };
  D.truthTable = (src) => {
    const { tree, vars } = D.parseLogic(src);
    const cols = D.subExprs(tree);
    const rows = [];
    for (let m = 0; m < (1 << vars.length); m++) {
      const env = {}; vars.forEach((v, k) => env[v] = !((m >> (vars.length - 1 - k)) & 1)); // T first, like textbooks
      rows.push({ env, vals: cols.map(c => D.evalLogic(c.n, env)) });
    }
    return { vars, cols, rows, tree };
  };

  // ---- sets ----
  D.parseSet = s => { const a = String(s).replace(/[{}]/g, '').split(/[\s,;]+/).filter(Boolean); return [...new Set(a)]; };
  D.setStr = a => '{' + a.join(', ') + '}';

  window.DM = D;
  window.Stat = { fmt: D.fmt }; // used by the lesson engine
})();
