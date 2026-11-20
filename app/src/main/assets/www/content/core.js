// Course builder helpers. Each chapter file calls chapter(meta, lessons).
window.COURSE = [];
window.card = (t, b, o = {}) => Object.assign({ k: 'card', t, b }, o);
window.mc = (q, o, a, e, x = {}) => Object.assign({ k: 'mc', q, o, a, e }, x);
window.tf = (q, a, e, x = {}) => Object.assign({ k: 'tf', q, a, e }, x);
window.num = (q, a, e, tol, x = {}) => Object.assign({ k: 'num', q, a, e, tol: tol === undefined ? Math.max(0.011, Math.abs(a) * 0.002) : tol }, x);
window.blank = (q, o, a, e, x = {}) => Object.assign({ k: 'blank', q, o, a, e }, x);
window.order = (q, o, e, x = {}) => Object.assign({ k: 'order', q, o, e }, x);
window.multi = (q, o, a, e, x = {}) => Object.assign({ k: 'multi', q, o, a, e }, x);
window.L = (id, title, s, sub) => ({ id, title, s, sub });
window.chapter = (meta, lessons) => { meta.lessons = lessons; COURSE.push(meta); };
// Shorthand for formula blocks and examples inside card bodies
window.F = (s, label) => `<div class="formula">${label ? `<span class="lbl">${label}</span>` : ''}${s}</div>`;
window.EX = s => `<div class="ex">${s}</div>`;
window.TIP = s => `<div class="tip">${s}</div>`;
window.TBL = (head, rows) => `<table class="t"><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
// Whole-number answer (also used for binary strings like 1011)
window.int = (q, a, e, x = {}) => Object.assign({ k: 'num', q, a, e, tol: 0.001, hint: 'Enter a whole number.' }, x);
// Symbols with spoken versions
window.TT = (vars, rows) => TBL(vars, rows.map(r => r.map(c => c === 1 || c === true ? 'T' : c === 0 || c === false ? 'F' : c)));
