// Calculators for the Tools tab.
(function () {
  const out = h => { document.getElementById('tout').innerHTML = h ? `<div class="box">${h}</div>` : ''; };
  const R = (k, v) => `<div><span class="k">${k}:</span> <b>${v}</b></div>`;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const field = (id, label, val = '', type = 'text', extra = '') => `<div class="field"><label>${label}</label><input id="${id}" ${type === 'num' ? 'inputmode="numeric"' : ''} value="${esc(val)}" autocomplete="off" autocapitalize="off" ${extra}></div>`;
  const v = id => document.getElementById(id).value;
  const n = id => parseInt(String(v(id)).replace(/−/g, '-').trim(), 10);
  const live = (root, fn) => {
    const run = () => { try { fn(); } catch (e) { out('⚠️ ' + esc(e.message)); } };
    root.querySelectorAll('input,textarea,select').forEach(el => el.addEventListener('input', run));
    root.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => { b.parentNode.querySelectorAll('button').forEach(x => x.classList.remove('on')); b.classList.add('on'); run(); }));
    root.querySelectorAll('[data-ins]').forEach(b => b.addEventListener('click', () => { const t = document.getElementById(b.dataset.for); const s = t.selectionStart ?? t.value.length; t.value = t.value.slice(0, s) + b.dataset.ins + t.value.slice(t.selectionEnd ?? s); t.focus(); t.selectionStart = t.selectionEnd = s + b.dataset.ins.length; run(); }));
    run();
  };
  const seg = (id, opts, on = 0) => `<div class="seg" id="${id}">${opts.map((o, i) => `<button data-v="${o[0]}" class="${i === on ? 'on' : ''}">${o[1]}</button>`).join('')}</div>`;
  const segv = id => document.querySelector(`#${id} .on`).dataset.v;
  const keys = (forId, list) => `<div class="chips" style="justify-content:flex-start;margin:4px 0 8px">${list.map(k => `<button class="chip" style="padding:6px 12px" data-for="${forId}" data-ins="${k}">${k.trim()}</button>`).join('')}</div>`;
  const big = DM.big;
  const isInt = x => Number.isInteger(x) && Math.abs(x) < 1e15;

  function ttHTML(src) {
    const t = DM.truthTable(src);
    if (t.vars.length > 6) throw new Error('Use 6 variables or fewer.');
    const heads = t.vars.concat(t.cols.map(c => c.s));
    const last = t.rows.map(r => r.vals[r.vals.length - 1]);
    const kind = last.every(x => x) ? 'Tautology ✅ (always true)' : last.every(x => !x) ? 'Contradiction ❌ (always false)' : 'Contingency (sometimes true)';
    const mins = t.rows.filter(r => r.vals[r.vals.length - 1]).map(r => t.vars.map(x => r.env[x] ? x : '¬' + x).join(' ∧ '));
    let h = `<div style="overflow-x:auto"><table class="t" style="font-size:13px"><tr>${heads.map(x => `<th style="white-space:nowrap">${x}</th>`).join('')}</tr>` +
      t.rows.map(r => `<tr>${t.vars.map(x => `<td>${r.env[x] ? 'T' : 'F'}</td>`).join('')}${r.vals.map((x, i) => `<td style="${i === r.vals.length - 1 ? 'font-weight:800;color:' + (x ? 'var(--ok)' : 'var(--bad)') : ''}">${x ? 'T' : 'F'}</td>`).join('')}</tr>`).join('') + '</table></div>';
    return { t, last, html: h + R('Type', kind) + R('Rows', `2<sup>${t.vars.length}</sup> = ${t.rows.length}`) + (mins.length && mins.length < t.rows.length ? R('Sum of products (DNF)', mins.map(m => '(' + m + ')').join(' ∨ ')) : '') };
  }

  window.TOOLS = [
    {
      name: 'Truth table builder', icon: '🔣', desc: 'Any logic expression → full truth table, tautology check, DNF',
      ui: () => field('ex', 'Expression (use letters for variables)', '(p → q) ∧ (q → r) → (p → r)') + keys('ex', ['¬', ' ∧ ', ' ∨ ', ' → ', ' ↔ ', ' ⊕ ', '(', ')']) +
        `<p style="color:var(--mut);font-size:12px;margin:0">You can also type: not ~ !, and &amp;, or |, -&gt;, &lt;-&gt;, xor.</p>`,
      init: root => live(root, () => { const s = v('ex').trim(); if (!s) return out(''); out(ttHTML(s).html); })
    },
    {
      name: 'Equivalence checker', icon: '⚖️', desc: 'Are two logic expressions equivalent?',
      ui: () => field('e1', 'Expression 1', '¬(p ∧ q)') + field('e2', 'Expression 2', '¬p ∨ ¬q') + keys('e1', ['¬', ' ∧ ', ' ∨ ', ' → ', ' ↔ ']),
      init: root => live(root, () => {
        const a = DM.parseLogic(v('e1')), b = DM.parseLogic(v('e2'));
        const vars = [...new Set(a.vars.concat(b.vars))].sort();
        let diff = null;
        for (let m = 0; m < (1 << vars.length); m++) {
          const env = {}; vars.forEach((x, k) => env[x] = !((m >> (vars.length - 1 - k)) & 1));
          if (DM.evalLogic(a.tree, env) !== DM.evalLogic(b.tree, env)) { diff = env; break; }
        }
        out(diff ? R('Result', '❌ NOT equivalent') + R('They differ when', vars.map(x => `${x} = ${diff[x] ? 'T' : 'F'}`).join(', ')) : R('Result', '✅ Logically equivalent') + `<p>They match in all ${1 << vars.length} rows.</p>`);
      })
    },
    {
      name: 'Base converter', icon: '💾', desc: 'Binary, octal, decimal, hex — with division steps',
      ui: () => seg('fb', [['10', 'From decimal'], ['2', 'From binary'], ['8', 'From octal'], ['16', 'From hex']]) + field('bv', 'Number', '157'),
      init: root => live(root, () => {
        const b = +segv('fb'), val = DM.fromBase(v('bv'), b);
        if (val === undefined || (typeof val === 'number' && isNaN(val))) return out('Enter a valid base-' + b + ' number.');
        let h = R('Decimal', big(val)) + R('Binary', val.toString(2).replace(/\B(?=(\d{4})+(?!\d))/g, ' ')) + R('Octal', val.toString(8)) + R('Hexadecimal', val.toString(16).toUpperCase());
        if (val > 0n && val < 100000n) {
          let x = val, steps = [];
          while (x > 0n) { steps.push(`${x} ÷ 2 = ${x / 2n} r <b>${x % 2n}</b>`); x /= 2n; }
          h += `<div class="sect" style="margin-left:0">Decimal → binary steps</div><p>${steps.join('<br>')}<br>Read the remainders bottom to top.</p>`;
        }
        out(h);
      })
    },
    {
      name: 'div & mod', icon: '➗', desc: 'Quotient and remainder, including negatives',
      ui: () => `<div class="row">${field('a', 'a', '-17', 'num')}${field('d', 'd (> 0)', '5', 'num')}</div>`,
      init: root => live(root, () => {
        const a = n('a'), d = n('d'); if (!isInt(a) || !(d > 0)) return out('Enter an integer a and a positive d.');
        const q = Math.floor(a / d), r = DM.mod(a, d);
        out(R('a div d', q) + R('a mod d', r) + R('Check', `${a} = ${d}·(${q}) + ${r}`) + R(`${d} ∣ ${a}?`, r === 0 ? 'yes' : 'no'));
      })
    },
    {
      name: 'GCD, LCM & primes', icon: '🔍', desc: 'Euclidean algorithm steps, Bézout coefficients, factorization',
      ui: () => `<div class="row">${field('a', 'a', '252', 'num')}${field('b', 'b', '198', 'num')}</div>`,
      init: root => live(root, () => {
        const a = n('a'), b = n('b'); if (!isInt(a) || !isInt(b) || a <= 0 || b <= 0) return out('Enter two positive integers.');
        const e = DM.euclidSteps(a, b), [g, s, t] = DM.egcd(a, b);
        out(R('gcd', g) + R('lcm', DM.lcm(a, b)) + R('Relatively prime?', g === 1 ? 'yes' : 'no') +
          `<div class="sect" style="margin-left:0">Euclidean algorithm</div><p>${e.steps.map(([x, y, q, r]) => `${x} = ${q}·${y} + ${r}`).join('<br>')}</p>` +
          R('Bézout', `${s}·${a} + ${t}·${b} = ${g}`) +
          R(`${a}`, (a > 1 ? DM.factorStr(a) : a) + (DM.isPrime(a) ? ' (prime)' : '')) + R(`${b}`, (b > 1 ? DM.factorStr(b) : b) + (DM.isPrime(b) ? ' (prime)' : '')));
      })
    },
    {
      name: 'Modular inverse & powers', icon: '🔐', desc: 'a⁻¹ mod m, solve ax ≡ b, fast bⁿ mod m',
      ui: () => `<div class="row">${field('a', 'a', '3', 'num')}${field('m', 'modulus m', '7', 'num')}</div><div class="row">${field('b', 'b (for ax ≡ b)', '4', 'num')}${field('e', 'exponent n (for aⁿ mod m)', '13', 'num')}</div>`,
      init: root => live(root, () => {
        const a = n('a'), m = n('m'), b = n('b'), e = n('e'); if (!isInt(a) || !(m > 1)) return out('Enter an integer a and modulus m > 1.');
        const inv = DM.modInv(a, m);
        let h = R(`gcd(${a}, ${m})`, DM.gcd(a, m)) + R(`Inverse of ${a} mod ${m}`, inv === null ? 'none (gcd ≠ 1)' : `${inv} &nbsp; (check: ${a}·${inv} = ${a * inv} ≡ ${DM.mod(a * inv, m)})`);
        if (inv !== null && isInt(b)) { const x = DM.mod(inv * b, m); h += R(`Solve ${a}x ≡ ${b} (mod ${m})`, `x ≡ ${x}`); }
        if (isInt(e) && e >= 0) {
          let steps = [], p = DM.mod(a, m), k = 1;
          while (k <= e && steps.length < 12) { steps.push(`${a}<sup>${k}</sup> ≡ ${p}`); p = p * p % m; k *= 2; }
          h += R(`${a}<sup>${e}</sup> mod ${m}`, DM.modPow(a, e, m)) + `<p>Repeated squaring: ${steps.join(', ')}<br>${e} in binary = ${e.toString(2)}</p>`;
        }
        out(h);
      })
    },
    {
      name: 'RSA playground', icon: '🗝️', desc: 'Build keys from two primes, encrypt and decrypt',
      ui: () => `<div class="row">${field('p', 'prime p', '5', 'num')}${field('q', 'prime q', '11', 'num')}</div><div class="row">${field('e', 'public e', '3', 'num')}${field('M', 'message M', '7', 'num')}</div>`,
      init: root => live(root, () => {
        const p = n('p'), q = n('q'), e = n('e'), M = n('M');
        if (!DM.isPrime(p) || !DM.isPrime(q) || p === q) return out('p and q must be two different primes.');
        const N = p * q, phi = (p - 1) * (q - 1);
        if (DM.gcd(e, phi) !== 1) return out(R('n', N) + R('φ', phi) + `<p>e must satisfy gcd(e, φ) = 1. gcd(${e}, ${phi}) = ${DM.gcd(e, phi)}.</p>`);
        const d = DM.modInv(e, phi);
        let h = R('n = pq', N) + R('φ = (p−1)(q−1)', phi) + R('Public key (n, e)', `(${N}, ${e})`) + R('Private d = e⁻¹ mod φ', `${d} &nbsp; (${e}·${d} = ${e * d} ≡ 1)`);
        if (isInt(M) && M >= 0 && M < N) { const C = DM.modPow(M, e, N); h += R('Encrypt C = Mᵉ mod n', C) + R('Decrypt Cᵈ mod n', DM.modPow(C, d, N)); }
        else h += '<p>Message M must be between 0 and n − 1.</p>';
        out(h);
      })
    },
    {
      name: 'Shift cipher', icon: '🔤', desc: 'Caesar / affine encrypt and decrypt',
      ui: () => field('tx', 'Text', 'MEET AT NOON') + `<div class="row">${field('a', 'a (1 for Caesar)', '1', 'num')}${field('k', 'shift b', '3', 'num')}</div>` + seg('dir', [['e', 'Encrypt'], ['d', 'Decrypt']]),
      init: root => live(root, () => {
        const a = n('a'), k = n('k'), dec = segv('dir') === 'd';
        if (!isInt(a) || !isInt(k)) return out('Enter integers a and b.');
        const ai = DM.modInv(a, 26); if (ai === null) return out(`a = ${a} has no inverse mod 26 (gcd ≠ 1), so this cipher can't be decrypted.`);
        const res = v('tx').toUpperCase().replace(/[A-Z]/g, ch => { const p = ch.charCodeAt(0) - 65; const c = dec ? DM.mod(ai * (p - k), 26) : DM.mod(a * p + k, 26); return String.fromCharCode(65 + c); });
        out(R(dec ? 'Plaintext' : 'Ciphertext', esc(res)) + R('Rule', dec ? `p = ${ai}·(c − ${k}) mod 26` : `c = (${a}·p + ${k}) mod 26`));
      })
    },
    {
      name: 'Counting', icon: '🧮', desc: 'n!, P(n, r), C(n, r), with repetition, Pascal row',
      ui: () => `<div class="row">${field('n', 'n', '10', 'num')}${field('r', 'r', '3', 'num')}</div>`,
      init: root => live(root, () => {
        const N = n('n'), r = n('r'); if (!(N >= 0) || !(r >= 0) || N > 500 || r > 500) return out('Enter 0 ≤ n, r ≤ 500.');
        let h = R('n!', big(DM.fact(N))) + R('P(n, r) — ordered, no repeats', big(DM.P(N, r))) + R('C(n, r) — unordered, no repeats', big(DM.C(N, r))) +
          R('nʳ — ordered, repeats allowed', big(BigInt(N) ** BigInt(r))) + R('C(n+r−1, r) — unordered, repeats', N > 0 ? big(DM.C(N + r - 1, r)) : (r === 0 ? 1 : 0)) + R('Subsets of n items (2ⁿ)', big(2n ** BigInt(N)));
        if (N <= 20) h += R(`Pascal row ${N}`, [...Array(N + 1).keys()].map(k => DM.C(N, k).toString()).join(' '));
        out(h);
      })
    },
    {
      name: 'Set calculator', icon: '⭕', desc: 'Union, intersection, difference, complement, power set',
      ui: () => field('A', 'Set A', '1, 2, 3, 4') + field('B', 'Set B', '3, 4, 5') + field('U', 'Universal set U (optional)', '1, 2, 3, 4, 5, 6, 7'),
      init: root => live(root, () => {
        const A = DM.parseSet(v('A')), B = DM.parseSet(v('B')), U = DM.parseSet(v('U'));
        const inB = x => B.includes(x), inA = x => A.includes(x), S = DM.setStr;
        const uni = A.concat(B.filter(x => !inA(x))), inter = A.filter(inB), amb = A.filter(x => !inB(x)), bma = B.filter(x => !inA(x));
        let h = R('A ∪ B', S(uni)) + R('A ∩ B', S(inter)) + R('A − B', S(amb)) + R('B − A', S(bma)) + R('A ⊕ B', S(amb.concat(bma))) +
          R('|A|, |B|', `${A.length}, ${B.length}`) + R('|A ∪ B| = |A| + |B| − |A ∩ B|', `${A.length} + ${B.length} − ${inter.length} = ${uni.length}`) +
          R('A ⊆ B?', A.every(inB) ? 'yes' : 'no') + R('|A × B|', A.length * B.length) + R('|P(A)|', '2<sup>' + A.length + '</sup> = ' + Math.pow(2, A.length));
        if (U.length) h += R('Ā', S(U.filter(x => !inA(x)))) + R('B̄', S(U.filter(x => !inB(x))));
        if (A.length <= 4) { const ps = []; for (let m = 0; m < (1 << A.length); m++) ps.push(S(A.filter((_, i) => m >> i & 1))); h += R('P(A)', '{' + ps.join(', ').replace('{}', '∅') + '}'); }
        const sh = []; if (amb.length) sh.push('a'); if (bma.length) sh.push('b'); if (inter.length) sh.push('ab');
        h += Viz.venn({ shade: [], text: [[95, 95, esc(amb.join(', ')) || '∅'], [160, 95, esc(inter.join(', ')) || '∅'], [225, 95, esc(bma.join(', ')) || '∅']] });
        out(h);
      })
    },
    {
      name: 'Sequences & sums', icon: '🔁', desc: 'Arithmetic / geometric terms and sums',
      ui: () => seg('ty', [['a', 'Arithmetic'], ['g', 'Geometric']]) + `<div class="row">${field('a0', 'first term a₀', '3', 'num')}${field('d', 'd or r', '4', 'num')}${field('nn', 'n', '10', 'num')}</div>`,
      init: root => live(root, () => {
        const a0 = parseFloat(v('a0')), d = parseFloat(v('d')), N = n('nn'); if ([a0, d].some(isNaN) || !(N >= 0) || N > 200) return out('Enter numbers (n ≤ 200).');
        const g = segv('ty') === 'g', terms = [...Array(N + 1).keys()].map(i => g ? a0 * Math.pow(d, i) : a0 + i * d);
        const sum = terms.reduce((s, x) => s + x, 0);
        out(R('Formula', g ? `aₙ = ${a0}·${d}ⁿ` : `aₙ = ${a0} + ${d}n`) + R(`a<sub>${N}</sub>`, DM.fmt(terms[N])) + R(`Sum a₀ … a<sub>${N}</sub> (${N + 1} terms)`, DM.fmt(sum)) +
          R('First terms', terms.slice(0, 8).map(x => DM.fmt(x)).join(', ') + (N > 7 ? ', …' : '')));
      })
    },
    {
      name: 'Graph analyzer', icon: '🕸️', desc: 'Degrees, handshake check, Euler path/circuit, connectivity',
      ui: () => field('ed', 'Edges (pairs like a-b), separated by commas', 'a-b, a-c, b-c, b-d, c-d'),
      init: root => live(root, () => {
        const E = v('ed').split(/[,;\n]+/).map(s => s.trim()).filter(Boolean).map(s => s.split(/\s*[-–\s]\s*/).filter(Boolean)).filter(p => p.length === 2);
        if (!E.length) return out('Enter edges like a-b, b-c.');
        const deg = {}, adj = {};
        E.forEach(([x, y]) => { [x, y].forEach(z => { deg[z] = deg[z] || 0; adj[z] = adj[z] || new Set(); }); deg[x]++; deg[y]++; adj[x].add(y); adj[y].add(x); });
        const V = Object.keys(deg).sort(), odd = V.filter(x => deg[x] % 2);
        const seen = new Set([V[0]]), st = [V[0]]; while (st.length) { const x = st.pop(); adj[x].forEach(y => { if (!seen.has(y)) { seen.add(y); st.push(y); } }); }
        const conn = seen.size === V.length, sum = V.reduce((s, x) => s + deg[x], 0);
        const euler = !conn ? 'Not connected, so no Euler path/circuit' : odd.length === 0 ? 'Euler circuit ✅ (all degrees even)' : odd.length === 2 ? `Euler path ✅ from ${odd[0]} to ${odd[1]} (no circuit)` : `Neither (${odd.length} odd vertices)`;
        out(R('Vertices', V.length) + R('Edges', E.length) + R('Degrees', V.map(x => `${x}:${deg[x]}`).join(', ')) + R('Handshake', `Σdeg = ${sum} = 2·${E.length}`) +
          R('Odd-degree vertices', odd.length ? odd.join(', ') : 'none') + R('Connected?', conn ? 'yes' : 'no') + R('Euler', euler) +
          R('Tree?', conn && E.length === V.length - 1 ? 'yes (connected, n − 1 edges)' : 'no') +
          (V.length <= 12 ? Viz.graph({ nodes: V, edges: E, hn: odd }) : ''));
      })
    }
  ];
})();
