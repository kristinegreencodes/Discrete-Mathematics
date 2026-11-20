chapter({ id: 'ch3', title: 'Rules of Inference & Proofs', icon: '🧩', c1: '#0E9F7E', c2: '#3EE6C1', desc: 'Valid arguments, inference rules, fallacies and proof methods' }, [

  L('3-1', 'Arguments and validity', [
    card('What is an argument?', `<p>An <b>argument</b> is a list of <b>premises</b> (hypotheses) followed by a <b>conclusion</b>, often marked with ∴ ("therefore").</p>
      ${EX('If it snows, school closes.<br>It snows.<br>∴ School closes.')}`),
    card('Valid vs sound', `<p>An argument is <b>valid</b> if <span class="hl">whenever all premises are true, the conclusion must be true</span>. Validity is about the <b>form</b>, not the facts.</p>
      <p>An argument is <b>sound</b> if it is valid <b>and</b> all its premises are actually true.</p>
      ${F('Valid ⟺ (p₁ ∧ p₂ ∧ … ∧ pₙ) → c is a tautology')}`),
    card('Checking validity with a truth table', `<p>Make a truth table. Look only at the rows where <b>every premise is T</b>. If the conclusion is T in all of those rows, the argument is valid.</p>
      ${TIP('One row with all premises true and conclusion false = invalid.')}`),
    tf('An argument with a false conclusion can still be valid.', true, 'Valid only means the conclusion follows from the premises. If a premise is false, a valid argument can reach a false conclusion.'),
    mc('An argument is valid when…', ['The conclusion must be true whenever all premises are true', 'All premises are true', 'The conclusion is true', 'It uses at least two premises'], 0, 'Validity is about form: true premises guarantee a true conclusion.'),
    blank('A valid argument whose premises are all true is called ___.', ['sound', 'invalid', 'a fallacy', 'a tautology'], 0, 'Sound = valid + true premises.'),
    mc('Premises: p → q and q. Conclusion: p. In which row are the premises true but the conclusion false?', ['p = F, q = T', 'p = T, q = T', 'p = T, q = F', 'p = F, q = F'], 0, 'p → q = T and q = T, but p = F. So the argument is invalid (it\'s the fallacy of affirming the conclusion).')
  ]),

  L('3-2', 'Rules of inference', [
    card('The big four', `${TBL(['Rule', 'Form'], [['<b>Modus ponens</b>', 'p → q, p ∴ q'], ['<b>Modus tollens</b>', 'p → q, ¬q ∴ ¬p'], ['<b>Hypothetical syllogism</b>', 'p → q, q → r ∴ p → r'], ['<b>Disjunctive syllogism</b>', 'p ∨ q, ¬p ∴ q']])}
      ${TIP('Ponens = "putting" (affirm p). Tollens = "taking away" (deny q).')}`),
    card('More rules', `${TBL(['Rule', 'Form'], [['Addition', 'p ∴ p ∨ q'], ['Simplification', 'p ∧ q ∴ p'], ['Conjunction', 'p, q ∴ p ∧ q'], ['Resolution', 'p ∨ q, ¬p ∨ r ∴ q ∨ r']])}`),
    card('Two classic fallacies', `<p>These look valid but are <b>not</b>:</p>
      ${TBL(['Fallacy', 'Form'], [['Affirming the conclusion', 'p → q, q ∴ p ✗'], ['Denying the hypothesis', 'p → q, ¬p ∴ ¬q ✗']])}
      ${EX('"If it\'s a phishing email, it has a link. This email has a link. So it\'s phishing." ✗ Affirming the conclusion.')}`),
    mc('"If the password is wrong, login fails. The password is wrong. So login fails." Which rule?', ['Modus ponens', 'Modus tollens', 'Disjunctive syllogism', 'Addition'], 0, 'p → q and p, therefore q.'),
    mc('"If it rained, the ground is wet. The ground is not wet. So it did not rain." Which rule?', ['Modus tollens', 'Modus ponens', 'Hypothetical syllogism', 'Simplification'], 0, 'p → q and ¬q, therefore ¬p.'),
    mc('"The bug is in the front end or the back end. It is not in the front end. So it\'s in the back end." Which rule?', ['Disjunctive syllogism', 'Resolution', 'Addition', 'Modus ponens'], 0, 'p ∨ q and ¬p, therefore q.'),
    mc('"If I study, I pass. If I pass, I graduate. So if I study, I graduate."', ['Hypothetical syllogism', 'Modus ponens', 'Conjunction', 'Resolution'], 0, 'Chaining conditionals: p → q, q → r ∴ p → r.'),
    mc('"It is sunny and warm. Therefore it is sunny."', ['Simplification', 'Addition', 'Conjunction', 'Modus tollens'], 0, 'p ∧ q ∴ p.'),
    mc('"If you are a hacker, you know Linux. You know Linux. So you are a hacker."', ['Fallacy: affirming the conclusion', 'Valid: modus ponens', 'Valid: modus tollens', 'Fallacy: denying the hypothesis'], 0, 'p → q, q ∴ p is invalid.'),
    mc('"If it is a weekday, I work. It is not a weekday. So I don\'t work."', ['Fallacy: denying the hypothesis', 'Valid: modus tollens', 'Fallacy: affirming the conclusion', 'Valid: disjunctive syllogism'], 0, 'p → q, ¬p ∴ ¬q is invalid — you might work on weekends too.'),
    mc('From p ∨ q and ¬p ∨ r, resolution gives…', ['q ∨ r', 'q ∧ r', 'p ∨ r', '¬q ∨ r'], 0, 'p and ¬p cancel, leaving q ∨ r.'),
    order('Order the steps: premises p → q, q → r, p. Prove r.', ['Start with premises p → q and p', 'Modus ponens gives q', 'Use premise q → r with q', 'Modus ponens gives r'], 'Use modus ponens twice.')
  ]),

  L('3-3', 'Inference with quantifiers', [
    card('Four quantifier rules', `${TBL(['Rule', 'Form'], [['Universal instantiation', '∀x P(x) ∴ P(c) for any c in the domain'], ['Universal generalization', 'P(c) for an <i>arbitrary</i> c ∴ ∀x P(x)'], ['Existential instantiation', '∃x P(x) ∴ P(c) for some specific (new) c'], ['Existential generalization', 'P(c) for some c ∴ ∃x P(x)']])}`),
    card('Universal modus ponens', `<p>Combine instantiation with modus ponens:</p>${F('∀x (P(x) → Q(x)), P(a) ∴ Q(a)')}
      ${EX('All WGU students have a mentor. Kristine is a WGU student. ∴ Kristine has a mentor.')}`),
    mc('"All mammals breathe air. A whale is a mammal. So a whale breathes air." The first step uses…', ['Universal instantiation', 'Existential generalization', 'Universal generalization', 'Existential instantiation'], 0, 'We applied a "for all" statement to the specific case of the whale.'),
    mc('"Kristine passed the exam. So someone passed the exam." This is…', ['Existential generalization', 'Universal generalization', 'Universal instantiation', 'Modus tollens'], 0, 'One example lets us conclude "there exists".'),
    tf('From P(c) for one particular value c, we can conclude ∀x P(x).', false, 'Universal generalization only works when c was arbitrary — not a specific, chosen value.'),
    mc('∀x (S(x) → M(x)) and ¬M(b). What follows?', ['¬S(b)', 'S(b)', 'M(b)', '∃x S(x)'], 0, 'Universal instantiation gives S(b) → M(b); then modus tollens with ¬M(b) gives ¬S(b).')
  ]),

  L('3-4', 'Direct proof', [
    card('Definitions you\'ll use', `<ul><li>n is <b>even</b> if n = 2k for some integer k.</li><li>n is <b>odd</b> if n = 2k + 1 for some integer k.</li><li>a <b>divides</b> b (a ∣ b) if b = a·k for some integer k.</li><li>r is <b>rational</b> if r = a/b with integers a, b and b ≠ 0.</li></ul>`),
    card('How a direct proof works', `<p>To prove <b>p → q</b>: <span class="hl">assume p is true</span>, then use definitions and algebra to show q must be true.</p>
      ${EX('<b>Claim:</b> If n is odd, then n² is odd.<br>Assume n = 2k + 1.<br>n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1.<br>Since 2k² + 2k is an integer, n² is odd. ∎')}`),
    card('Another example', `${EX('<b>Claim:</b> The sum of two even integers is even.<br>Let a = 2j and b = 2k.<br>a + b = 2j + 2k = 2(j + k).<br>j + k is an integer, so a + b is even. ∎')}
      ${TIP('Use <b>different letters</b> (j and k) for different numbers. Using k for both would wrongly assume a = b.')}`),
    mc('In a direct proof of p → q, you start by…', ['Assuming p is true', 'Assuming q is false', 'Assuming p is false', 'Assuming ¬(p → q)'], 0, 'Direct proof: assume the hypothesis, derive the conclusion.'),
    mc('How do you write an odd integer m in a proof?', ['m = 2k + 1 for some integer k', 'm = 2k for some integer k', 'm = k + 1', 'm = k/2'], 0, 'Odd numbers are one more than an even number.'),
    order('Order the steps proving "If n is even, then n² is even."', ['Assume n is even.', 'Then n = 2k for some integer k.', 'So n² = 4k² = 2(2k²).', '2k² is an integer, so n² is even. ∎'], 'Assume, apply the definition, do the algebra, conclude.'),
    mc('Proving a + b is even where a = 2j + 1 and b = 2k + 1, you get a + b = …', ['2(j + k + 1)', '2(j + k) + 1', '4jk + 1', '2j + 2k'], 0, '(2j + 1) + (2k + 1) = 2j + 2k + 2 = 2(j + k + 1), so the sum of two odds is even.'),
    tf('Checking that a statement works for n = 1, 2 and 3 proves it for all integers.', false, 'Examples can disprove a "for all" claim, but they can never prove it for infinitely many cases.')
  ]),

  L('3-5', 'Contrapositive & contradiction', [
    card('Proof by contrapositive', `<p>Since p → q ≡ ¬q → ¬p, you can prove the <b>contrapositive</b> directly instead: <span class="hl">assume ¬q, show ¬p</span>.</p>
      ${EX('<b>Claim:</b> If n² is even, then n is even.<br>Contrapositive: If n is odd, then n² is odd.<br>n = 2k + 1 ⇒ n² = 2(2k² + 2k) + 1, odd. ∎')}
      ${TIP('Use contrapositive when the conclusion is "simpler" to negate than to reach directly.')}`),
    card('Proof by contradiction', `<p>To prove p: <span class="hl">assume ¬p</span> and show this leads to something impossible (like r ∧ ¬r). So p must be true.</p>
      ${EX('<b>Claim:</b> √2 is irrational.<br>Assume √2 = a/b in lowest terms. Then 2b² = a², so a is even: a = 2c. Then 2b² = 4c², b² = 2c², so b is even too. But a/b was in lowest terms — <b>contradiction</b>. ∎')}`),
    card('Another classic', `${EX('<b>There are infinitely many primes</b> (Euclid). Assume only finitely many: p₁, …, pₙ. Let N = p₁p₂…pₙ + 1. Dividing N by any pᵢ leaves remainder 1, so no listed prime divides N — but N must have a prime factor. Contradiction. ∎')}`),
    mc('To prove "If 3n + 2 is odd, then n is odd" by contrapositive, you assume…', ['n is even', 'n is odd', '3n + 2 is even', '3n + 2 is odd and n is even'], 0, 'Contrapositive: if n is even (¬q), then 3n + 2 is even (¬p).'),
    mc('A proof by contradiction of statement p begins by assuming…', ['¬p', 'p', 'p → q', 'q'], 0, 'Assume the opposite and reach an impossibility.'),
    mc('In the √2 proof, what is the contradiction?', ['a and b are both even, but a/b was in lowest terms', 'a is odd and even', '√2 is negative', '2 is not prime'], 0, 'Both being even means the fraction could be reduced, contradicting "lowest terms".'),
    blank('Proving ¬q → ¬p to establish p → q is called proof by ___.', ['contrapositive', 'contradiction', 'cases', 'induction'], 0, 'The contrapositive is logically equivalent to the original conditional.'),
    tf('Proof by contradiction and proof by contrapositive are exactly the same method.', false, 'Contrapositive proves ¬q → ¬p directly. Contradiction assumes the whole statement is false and derives an impossibility.')
  ]),

  L('3-6', 'Cases, counterexamples & existence', [
    card('Proof by cases', `<p>Split into cases that cover every possibility and prove each one.</p>
      ${EX('<b>Claim:</b> n² + n is even for every integer n.<br>Case 1, n even (n = 2k): n² + n = 4k² + 2k = 2(2k² + k). Even.<br>Case 2, n odd (n = 2k+1): n² + n = (2k+1)(2k+2) = 2(2k+1)(k+1). Even. ∎')}`),
    card('Counterexamples', `<p>To <b>disprove</b> "∀x P(x)", one counterexample is enough.</p>
      ${EX('Claim: "Every prime is odd." Counterexample: <b>2</b>.')}`),
    card('Existence proofs', `<p><b>Constructive</b>: show an actual example. <b>Non-constructive</b>: show one must exist without naming it.</p>
      ${EX('"There is an integer that is the sum of two cubes in two different ways": 1729 = 1³ + 12³ = 9³ + 10³ (constructive).')}`),
    mc('Which is a counterexample to "For all integers n, n² > n"?', ['n = 1', 'n = 2', 'n = 5', 'n = −3'], 0, '1² = 1, which is not greater than 1. (n = 0 also works.)'),
    mc('Which is a counterexample to "If n is prime, then n + 2 is prime"?', ['n = 7', 'n = 3', 'n = 5', 'n = 11'], 0, '7 is prime but 9 = 3·3 is not.'),
    tf('A proof by cases must cover every possible case.', true, 'If any case is left out, the proof is incomplete.'),
    mc('Showing that 2 is a prime number that is even proves "there exists an even prime." This is…', ['A constructive existence proof', 'A non-constructive proof', 'A proof by contradiction', 'Universal generalization'], 0, 'You produced the actual example.'),
    mc('The best method to prove a claim about |x| (absolute value) is usually…', ['Proof by cases (x ≥ 0 and x < 0)', 'Counterexample', 'Induction', 'Existence proof'], 0, 'Absolute value has a different formula for x ≥ 0 and x < 0, so splitting into cases is natural.')
  ])
]);
