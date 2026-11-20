// Small SVG diagram renderers: Venn diagrams, graphs/trees, logic gates, arrow diagrams.
(function () {
  const C = { a: '#7C5CFF', b: '#3EE6C1', c: '#FFB547', d: '#FF6B8B', g: '#8A8FB3', t: '#E9EAF6', bg: '#12142b' };
  let uid = 0;
  const svg = (inner, w = 320, h = 190) => `<svg class="viz" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  const txt = (x, y, s, o = {}) => `<text x="${x}" y="${y}" fill="${o.c || C.t}" font-size="${o.s || 12}" font-weight="${o.w || 700}" text-anchor="${o.a || 'middle'}" dominant-baseline="middle" font-family="inherit">${s}</text>`;
  const V = {};

  // Venn diagram. o.n = 2 or 3, o.shade = list of regions: 'a','b','c','ab','ac','bc','abc','u' (outside all)
  V.venn = (o = {}) => {
    const n = o.n || 2, id = 'v' + (++uid), L = o.labels || ['A', 'B', 'C'];
    const circ = n === 2 ? [[120, 95, 62], [200, 95, 62]] : [[128, 78, 55], [192, 78, 55], [160, 132, 55]];
    let defs = '';
    circ.forEach((c, i) => {
      defs += `<clipPath id="${id}c${i}"><circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}"/></clipPath>`;
      defs += `<mask id="${id}m${i}"><rect x="0" y="0" width="320" height="190" fill="#fff"/><circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="#000"/></mask>`;
    });
    const letters = 'abc'.slice(0, n);
    let body = `<rect x="6" y="6" width="308" height="178" rx="10" fill="none" stroke="${C.g}" stroke-width="1.5"/>`;
    (o.shade || []).forEach(reg => {
      const inc = reg === 'u' ? [] : reg.split('').map(ch => letters.indexOf(ch));
      const exc = [...Array(n).keys()].filter(k => !inc.includes(k));
      let el = `<rect x="7" y="7" width="306" height="176" rx="9" fill="${o.color || C.a}" opacity=".75"/>`;
      inc.forEach(k => { el = `<g clip-path="url(#${id}c${k})">${el}</g>`; });
      exc.forEach(k => { el = `<g mask="url(#${id}m${k})">${el}</g>`; });
      body += el;
    });
    circ.forEach((c, i) => { body += `<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="none" stroke="${[C.b, C.c, C.d][i]}" stroke-width="2.5"/>`; });
    const lp = n === 2 ? [[78, 40], [242, 40]] : [[82, 30], [238, 30], [160, 182 - 4]];
    circ.forEach((c, i) => { body += txt(lp[i][0], lp[i][1], L[i], { c: [C.b, C.c, C.d][i], s: 15 }); });
    body += txt(22, 20, 'U', { c: C.g, s: 12 });
    (o.text || []).forEach(([x, y, s]) => { body += txt(x, y, s, { s: 13 }); });
    return svg(`<defs>${defs}</defs>` + body);
  };

  // Graph: o.nodes = ['a','b',...] or [{id,x,y}], o.edges = [['a','b', label?]], o.directed, o.hl = ['a-b'], o.hn = ['a'] highlighted nodes
  V.graph = (o = {}) => {
    const w = o.w || 320, h = o.h || 190, id = 'g' + (++uid);
    let nodes = (o.nodes || []).map(nd => typeof nd === 'string' ? { id: nd } : nd);
    if (nodes.some(nd => nd.x === undefined)) {
      const cx = w / 2, cy = h / 2, r = Math.min(w, h) / 2 - 26;
      nodes = nodes.map((nd, i) => Object.assign({}, nd, { x: cx + r * Math.cos(-Math.PI / 2 + 2 * Math.PI * i / nodes.length), y: cy + r * Math.sin(-Math.PI / 2 + 2 * Math.PI * i / nodes.length) }));
    }
    const P = {}; nodes.forEach(nd => P[nd.id] = nd);
    const R = o.r || 14;
    let s = o.directed ? `<defs><marker id="${id}ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.g}"/></marker></defs>` : '';
    const seen = {};
    (o.edges || []).forEach(e => {
      const [u, v, lab] = e, A = P[u], B = P[v]; if (!A || !B) return;
      const hl = (o.hl || []).includes(u + '-' + v) || (!o.directed && (o.hl || []).includes(v + '-' + u));
      const col = hl ? C.c : C.g, sw = hl ? 3.5 : 2;
      if (u === v) { s += `<circle cx="${A.x}" cy="${A.y - R - 9}" r="10" fill="none" stroke="${col}" stroke-width="${sw}"/>`; if (lab !== undefined) s += txt(A.x, A.y - R - 27, lab, { c: C.c, s: 11 }); return; }
      const key = [u, v].sort().join('|'); const k = seen[key] = (seen[key] || 0) + 1;
      const dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
      const x1 = A.x + ux * R, y1 = A.y + uy * R, x2 = B.x - ux * (R + (o.directed ? 2 : 0)), y2 = B.y - uy * (R + (o.directed ? 2 : 0));
      const bend = (k - 1) * 22 * (k % 2 ? 1 : -1) + (o.directed && (o.edges || []).some(f => f[0] === v && f[1] === u) ? 14 : 0);
      const mx = (x1 + x2) / 2 - uy * bend, my = (y1 + y2) / 2 + ux * bend;
      s += `<path d="M${x1},${y1} Q${mx},${my} ${x2},${y2}" fill="none" stroke="${col}" stroke-width="${sw}" ${o.directed ? `marker-end="url(#${id}ar)"` : ''}/>`;
      if (lab !== undefined) s += `<rect x="${mx - 10}" y="${my - 8}" width="20" height="16" rx="5" fill="${C.bg}"/>` + txt(mx, my + 1, lab, { c: C.c, s: 11 });
    });
    nodes.forEach(nd => {
      const hn = (o.hn || []).includes(nd.id);
      s += `<circle cx="${nd.x}" cy="${nd.y}" r="${R}" fill="${hn ? C.b : C.a}" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>` + txt(nd.x, nd.y + 1, nd.label || nd.id, { s: 12, c: hn ? '#062' : '#fff' });
    });
    return svg(s, w, h);
  };

  // Rooted tree from nested arrays: ['A', ['B', ['D'], ['E']], ['C']]
  V.tree = (o = {}) => {
    const nodes = [], edges = []; let leafX = 0; const depthMax = { d: 0 };
    function walk(t, d) {
      const id = t[0], kids = t.slice(1);
      depthMax.d = Math.max(depthMax.d, d);
      let x;
      if (!kids.length) x = leafX++;
      else { const xs = kids.map(k => { edges.push([id, k[0]]); return walk(k, d + 1); }); x = (xs[0] + xs[xs.length - 1]) / 2; }
      nodes.push({ id, d, x }); return x;
    }
    walk(o.t, 0);
    const w = 320, h = Math.max(120, 50 + depthMax.d * 46), sx = leafX > 1 ? (w - 60) / (leafX - 1) : 0;
    const pos = nodes.map(nd => ({ id: nd.id, x: leafX > 1 ? 30 + nd.x * sx : w / 2, y: 24 + nd.d * 46 }));
    return V.graph({ nodes: pos, edges, w, h, hn: o.hn, hl: o.hl, r: 13 });
  };

  // Logic gate symbol(s). o.gates = ['AND','OR',...]
  const gatePath = (t, x, y) => {
    const neg = /^N(AND|OR)$/.test(t) || t === 'NOT', base = t.replace(/^N(?=AND|OR)/, '');
    let p = '';
    if (base === 'AND') p = `M${x},${y - 18} L${x + 22},${y - 18} A18,18 0 0 1 ${x + 22},${y + 18} L${x},${y + 18} Z`;
    else if (base === 'OR' || base === 'XOR') p = `M${x},${y - 18} Q${x + 30},${y - 18} ${x + 42},${y} Q${x + 30},${y + 18} ${x},${y + 18} Q${x + 12},${y} ${x},${y - 18} Z`;
    else if (base === 'NOT') p = `M${x},${y - 16} L${x + 34},${y} L${x},${y + 16} Z`;
    let s = `<path d="${p}" fill="#262A52" stroke="${C.b}" stroke-width="2.2"/>`;
    if (base === 'XOR') s += `<path d="M${x - 7},${y - 18} Q${x + 5},${y} ${x - 7},${y + 18}" fill="none" stroke="${C.b}" stroke-width="2.2"/>`;
    const outX = base === 'NOT' ? x + 34 : x + 41;
    if (neg) s += `<circle cx="${outX + 5}" cy="${y}" r="5" fill="#262A52" stroke="${C.b}" stroke-width="2"/>`;
    const inY = base === 'NOT' ? [y] : [y - 9, y + 9];
    inY.forEach(iy => { s += `<line x1="${x - 16}" y1="${iy}" x2="${x + (base === 'OR' || base === 'XOR' ? 5 : 0)}" y2="${iy}" stroke="${C.g}" stroke-width="2"/>`; });
    s += `<line x1="${outX + (neg ? 10 : 0)}" y1="${y}" x2="${outX + 22}" y2="${y}" stroke="${C.g}" stroke-width="2"/>`;
    return s;
  };
  V.gates = (o = {}) => {
    const g = o.gates || ['AND', 'OR', 'NOT'], cols = Math.min(3, g.length), rows = Math.ceil(g.length / cols);
    let s = '';
    g.forEach((t, i) => {
      const cx = 18 + (i % cols) * (300 / cols) + (cols < 3 ? 30 : 0), cy = 34 + Math.floor(i / cols) * 70;
      s += gatePath(t, cx + 16, cy) + txt(cx + 40, cy + 32, t, { c: C.c, s: 12 });
    });
    return svg(s, 320, rows * 70 + 10);
  };

  // Arrow diagram for functions/relations: o.A, o.B (arrays), o.pairs [[a,b]]
  V.arrows = (o = {}) => {
    const A = o.A, B = o.B, h = Math.max(A.length, B.length) * 34 + 40;
    const ya = i => 30 + i * 34 + (Math.max(A.length, B.length) - A.length) * 17, yb = i => 30 + i * 34 + (Math.max(A.length, B.length) - B.length) * 17;
    let s = `<ellipse cx="70" cy="${h / 2}" rx="42" ry="${h / 2 - 8}" fill="none" stroke="${C.b}" stroke-width="2"/><ellipse cx="250" cy="${h / 2}" rx="42" ry="${h / 2 - 8}" fill="none" stroke="${C.c}" stroke-width="2"/>`;
    s += `<defs><marker id="arw${++uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${C.a}"/></marker></defs>`;
    const mid = 'arw' + uid;
    (o.pairs || []).forEach(([a, b]) => { const i = A.indexOf(a), j = B.indexOf(b); s += `<line x1="86" y1="${ya(i)}" x2="232" y2="${yb(j)}" stroke="${C.a}" stroke-width="2" marker-end="url(#${mid})"/>`; });
    A.forEach((a, i) => { s += txt(70, ya(i), a); }); B.forEach((b, i) => { s += txt(250, yb(i), b); });
    s += txt(70, 10, o.la || 'A', { c: C.b, s: 11 }) + txt(250, 10, o.lb || 'B', { c: C.c, s: 11 });
    return svg(s, 320, h);
  };

  window.Viz = V;
})();
