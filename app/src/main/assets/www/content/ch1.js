chapter({ id: 'ch1', title: 'Propositional Logic', icon: '🔣', c1: '#7C5CFF', c2: '#B06CFF', desc: 'Propositions, connectives, truth tables, conditionals and logical equivalence' }, [

  L('1-1', 'What is a proposition?', [
    card('Statements that are true or false', `<p>A <b>proposition</b> is a declarative sentence that is <span class="hl">either true or false, but not both</span>.</p>
      <ul><li>"Iowa is a state." — proposition (true)</li><li>"7 + 5 = 13." — proposition (false)</li><li>"Close the door." — <b>not</b> a proposition (a command)</li><li>"What time is it?" — <b>not</b> a proposition (a question)</li><li>"x + 2 = 5" — <b>not</b> a proposition until we know x</li></ul>
      ${TIP('Ask yourself: "Can I answer this with TRUE or FALSE?" If yes, it is a proposition — even if you don\'t personally know the answer.')}`),
    card('Propositional variables', `<p>We name propositions with lowercase letters like <b>p, q, r, s</b>. Each one has a <b>truth value</b>: <b>T</b> (true) or <b>F</b> (false).</p>
      ${EX('p: "It is raining." &nbsp; q: "I bring an umbrella."<br>Now we can build bigger statements like "It is raining <b>and</b> I bring an umbrella."')}
      <p>A proposition built from others using words like <b>not, and, or, if…then</b> is called a <b>compound proposition</b>.</p>`),
    mc('Which sentence is a proposition?', ['There are 50 states in the USA.', 'Please submit your assignment.', 'Is the server down?', 'x − 3 = 10'], 0, 'It is a declarative sentence with a truth value (true). Commands, questions and sentences with unknown variables are not propositions.'),
    multi('Select ALL sentences that are propositions.', ['2 + 2 = 5', 'Paris is the capital of France.', 'Read chapter 3 tonight.', 'n is an even number.'], [0, 1], '"2 + 2 = 5" is a (false) proposition, and the Paris sentence is a true proposition. A command has no truth value, and "n is even" depends on n.'),
    tf('"x + 1 = 4" is a proposition.', false, 'Its truth depends on the value of x, so by itself it is not a proposition. (In Chapter 2 we call this a predicate.)'),
    tf('A false sentence can still be a proposition.', true, 'Propositions just need a definite truth value. "5 is even" is false, but it is still a proposition.'),
    blank('A proposition made by combining other propositions with connectives is called a ___ proposition.', ['compound', 'simple', 'atomic', 'open'], 0, 'Compound propositions combine simpler ones using not, and, or, if-then and if-and-only-if.')
  ]),

  L('1-2', 'Not, and, or', [
    card('Negation ¬p', `<p>The <b>negation</b> of p, written <b>¬p</b> ("not p"), has the <span class="hl">opposite</span> truth value of p.</p>
      ${TT(['p', '¬p'], [[1, 0], [0, 1]])}
      ${EX('p: "The file is saved." → ¬p: "The file is <b>not</b> saved."')}`),
    card('Conjunction p ∧ q (AND)', `<p><b>p ∧ q</b> is true <span class="hl">only when both p and q are true</span>.</p>
      ${TT(['p', 'q', 'p ∧ q'], [[1, 1, 1], [1, 0, 0], [0, 1, 0], [0, 0, 0]])}
      ${TIP('The ∧ symbol looks like an "A" without the crossbar — <b>A</b> for <b>A</b>ND.')}`),
    card('Disjunction p ∨ q (inclusive OR)', `<p><b>p ∨ q</b> is true when <span class="hl">at least one</span> of p, q is true. It is false only when both are false.</p>
      ${TT(['p', 'q', 'p ∨ q'], [[1, 1, 1], [1, 0, 1], [0, 1, 1], [0, 0, 0]])}
      <p>In math, "or" is <b>inclusive</b>: "both" counts as true.</p>`),
    card('Exclusive or p ⊕ q (XOR)', `<p><b>p ⊕ q</b> is true when <span class="hl">exactly one</span> of p, q is true.</p>
      ${TT(['p', 'q', 'p ⊕ q'], [[1, 1, 0], [1, 0, 1], [0, 1, 1], [0, 0, 0]])}
      ${EX('"Your meal comes with soup <b>or</b> salad" usually means XOR — you get one, not both.')}
      ${TIP('XOR is used everywhere in cybersecurity: one-time pads and many ciphers combine bits with XOR.')}`),
    mc('p is true and q is false. Which is TRUE?', ['p ∨ q', 'p ∧ q', '¬p', '¬p ∨ q'], 0, 'An OR needs only one true part. p ∧ q needs both; ¬p is false; ¬p ∨ q is F ∨ F = F.'),
    tf('p ∨ q is true when both p and q are true.', true, 'Inclusive OR is true when at least one part is true — including when both are.'),
    tf('p ⊕ q is true when both p and q are true.', false, 'Exclusive OR is true when exactly one is true. T ⊕ T = F.'),
    mc('Let p: "I study" and q: "I pass." Which is "I study but I don\'t pass"?', ['p ∧ ¬q', 'p ∨ ¬q', '¬p ∧ q', 'p → ¬q'], 0, '"But" works like "and" in logic. "I don\'t pass" is ¬q, so the statement is p ∧ ¬q.'),
    blank('p ∧ q is true only when ___.', ['both p and q are true', 'at least one is true', 'exactly one is true', 'both are false'], 0, 'Conjunction (AND) requires every part to be true.'),
    mc('p = T, q = T, r = F. What is (p ∧ q) ∨ r?', ['True', 'False'], 0, 'p ∧ q = T ∧ T = T, and T ∨ F = T.', { noShuffle: true })
  ]),

  L('1-3', 'The conditional p → q', [
    card('If p, then q', `<p>The <b>conditional</b> p → q means "if p, then q". p is the <b>hypothesis</b> (premise) and q is the <b>conclusion</b>.</p>
      ${TT(['p', 'q', 'p → q'], [[1, 1, 1], [1, 0, 0], [0, 1, 1], [0, 0, 1]])}
      <p>It is false in <span class="hl">only one case: T → F</span> (a true hypothesis with a false conclusion).</p>`,
      { say: 'The conditional p implies q means if p then q. p is the hypothesis and q is the conclusion. The conditional is false in only one case: when p is true and q is false. In every other row it is true.' }),
    card('Why is F → anything true?', `<p>Think of a promise: "If you get an A, I'll buy you pizza."</p>
      <ul><li>You get an A, you get pizza — promise kept (T).</li><li>You get an A, no pizza — promise <b>broken</b> (F).</li><li>No A — whatever happens, the promise wasn't broken (T).</li></ul>
      ${TIP('A false hypothesis makes the conditional "vacuously true".')}`),
    card('Many ways to say p → q', `${TBL(['English', 'Logic'], [['if p, then q', 'p → q'], ['q if p', 'p → q'], ['p only if q', 'p → q'], ['p implies q', 'p → q'], ['p is sufficient for q', 'p → q'], ['q is necessary for p', 'p → q'], ['q whenever p', 'p → q'], ['q unless ¬p', 'p → q']])}
      ${TIP('"<b>only if</b>" points to the conclusion: "p only if q" = p → q. "Necessary" also points to the conclusion.')}`),
    card('The biconditional p ↔ q', `<p><b>p ↔ q</b> means "p if and only if q" (iff). It is true when p and q have the <span class="hl">same</span> truth value.</p>
      ${TT(['p', 'q', 'p ↔ q'], [[1, 1, 1], [1, 0, 0], [0, 1, 0], [0, 0, 1]])}
      <p>p ↔ q is the same as (p → q) ∧ (q → p). It is the negation of XOR.</p>`),
    mc('When is p → q FALSE?', ['p true, q false', 'p false, q true', 'p false, q false', 'p true, q true'], 0, 'A conditional fails only when the hypothesis is true and the conclusion is false.'),
    tf('If p is false, then p → q is true no matter what q is.', true, 'A false hypothesis makes a conditional vacuously true.'),
    mc('"You can log in <b>only if</b> you have a password." Let l = log in, w = have a password.', ['l → w', 'w → l', 'l ↔ w', 'l ∧ w'], 0, '"p only if q" means p → q. Logging in requires the password, so l → w.'),
    mc('"Having a valid ID is <b>necessary</b> for boarding." Let b = board, v = valid ID.', ['b → v', 'v → b', 'v ∧ b', 'b ∨ v'], 0, 'The necessary condition is the conclusion: if you board, you must have had a valid ID. b → v.'),
    mc('"The alarm sounds <b>if</b> there is smoke." Let a = alarm sounds, s = smoke.', ['s → a', 'a → s', 'a ∧ s', 'a ↔ s'], 0, '"q if p" means p → q. Here smoke is the condition, so s → a.'),
    mc('p = T, q = F. What is p ↔ q?', ['False', 'True'], 0, 'The biconditional is true only when both sides match. T and F don\'t match.', { noShuffle: true }),
    blank('In p → q, the statement p is called the ___.', ['hypothesis', 'conclusion', 'converse', 'contrapositive'], 0, 'p is the hypothesis (premise); q is the conclusion.')
  ]),

  L('1-4', 'Converse, inverse, contrapositive', [
    card('Three related conditionals', `<p>Start with p → q.</p>
      ${TBL(['Name', 'Form', 'Example (if it rains, the grass is wet)'], [['Original', 'p → q', 'If it rains, the grass is wet.'], ['<b>Converse</b>', 'q → p', 'If the grass is wet, it rained.'], ['<b>Inverse</b>', '¬p → ¬q', 'If it doesn\'t rain, the grass isn\'t wet.'], ['<b>Contrapositive</b>', '¬q → ¬p', 'If the grass isn\'t wet, it didn\'t rain.']])}`),
    card('Which ones are equivalent?', `<p><span class="hl">A conditional is always equivalent to its contrapositive.</span></p>
      ${F('p → q ≡ ¬q → ¬p')}
      <p>The converse and inverse are equivalent to <b>each other</b>, but <b>not</b> to the original.</p>
      ${TIP('Memory trick: <b>Contra</b>positive = <b>flip AND negate</b>. Converse = flip only. Inverse = negate only.')}`),
    mc('What is the <b>contrapositive</b> of "If I am in Iowa, then I am in the USA"?', ['If I am not in the USA, then I am not in Iowa.', 'If I am in the USA, then I am in Iowa.', 'If I am not in Iowa, then I am not in the USA.', 'I am in Iowa and not in the USA.'], 0, 'Flip and negate: ¬q → ¬p. (It is true, just like the original.)'),
    mc('What is the <b>converse</b> of p → q?', ['q → p', '¬p → ¬q', '¬q → ¬p', '¬(p → q)'], 0, 'The converse swaps the hypothesis and conclusion.'),
    mc('What is the <b>inverse</b> of "If the password is correct, access is granted"?', ['If the password is not correct, access is not granted.', 'If access is granted, the password is correct.', 'If access is not granted, the password is not correct.', 'The password is correct and access is not granted.'], 0, 'The inverse negates both parts without swapping: ¬p → ¬q.'),
    multi('Which statements are logically equivalent to p → q? Select all.', ['¬q → ¬p', '¬p ∨ q', 'q → p', '¬p → ¬q'], [0, 1], 'The contrapositive ¬q → ¬p and the conditional identity ¬p ∨ q are equivalent to p → q. The converse and inverse are not.'),
    tf('The converse of a true conditional is always true.', false, '"If it\'s a dog, it\'s a mammal" is true, but its converse "If it\'s a mammal, it\'s a dog" is false.'),
    tf('The converse and the inverse of a conditional are logically equivalent to each other.', true, 'The inverse ¬p → ¬q is the contrapositive of the converse q → p, so they are equivalent.')
  ]),

  L('1-5', 'Building truth tables', [
    card('How many rows?', `<p>A truth table with <b>n</b> different variables needs <span class="hl">2<sup>n</sup> rows</span> — one for every combination of T and F.</p>
      ${TBL(['Variables', 'Rows'], [['1', '2'], ['2', '4'], ['3', '8'], ['4', '16']])}
      ${TIP('Standard pattern for 3 variables: p column = TTTTFFFF, q = TTFFTTFF, r = TFTFTFTF.')}`),
    card('Order of operations', `<p>Without parentheses, connectives are applied in this order:</p>
      ${F('¬ &nbsp;then&nbsp; ∧ &nbsp;then&nbsp; ∨ &nbsp;then&nbsp; → &nbsp;then&nbsp; ↔')}
      ${EX('¬p ∧ q → r means ((¬p) ∧ q) → r.')}
      <p>Work from the inside out: make a column for every sub-expression.</p>`),
    card('Worked example: ¬p ∨ q', `${TT(['p', 'q', '¬p', '¬p ∨ q'], [[1, 1, 0, 1], [1, 0, 0, 0], [0, 1, 1, 1], [0, 0, 1, 1]])}
      <p>The last column is T, F, T, T — exactly the same as p → q! That is why <b>p → q ≡ ¬p ∨ q</b>.</p>`),
    card('Tautology, contradiction, contingency', `<ul><li><b>Tautology</b> — always true (every row T). Example: p ∨ ¬p.</li><li><b>Contradiction</b> — always false (every row F). Example: p ∧ ¬p.</li><li><b>Contingency</b> — sometimes true, sometimes false. Example: p → q.</li></ul>`),
    int('How many rows are in a truth table for a compound proposition with variables p, q, r and s?', 16, '2⁴ = 16 rows.'),
    int('How many rows does the truth table for (p ∧ q) → (q ∨ r) need?', 8, 'There are three different variables (p, q, r), so 2³ = 8 rows.'),
    mc('Which is a <b>tautology</b>?', ['p ∨ ¬p', 'p ∧ ¬p', 'p → q', 'p ∧ q'], 0, 'p ∨ ¬p is true whether p is true or false.'),
    mc('Which is a <b>contradiction</b>?', ['p ∧ ¬p', 'p ∨ ¬p', 'p → p', '¬p ∨ q'], 0, 'p and not-p can never both be true.'),
    mc('How is ¬p ∨ q ∧ r grouped by default?', ['(¬p) ∨ (q ∧ r)', '¬(p ∨ q) ∧ r', '((¬p) ∨ q) ∧ r', '¬(p ∨ (q ∧ r))'], 0, '¬ binds tightest, then ∧, then ∨.'),
    mc('p = F, q = T, r = F. What is (p ∨ q) → r?', ['False', 'True'], 0, 'p ∨ q = T. Then T → F = F.', { noShuffle: true }),
    mc('p = F, q = F. What is ¬(p ∨ q) ↔ (¬p ∧ ¬q)?', ['True', 'False'], 0, 'Left: ¬(F ∨ F) = T. Right: T ∧ T = T. T ↔ T = T. (This is De Morgan\'s law, so it\'s always true.)', { noShuffle: true }),
    tf('p → q is a contingency.', true, 'It is true in three rows and false in one (T → F), so it is neither always true nor always false.')
  ]),

  L('1-6', 'Logical equivalences & laws', [
    card('What "equivalent" means', `<p>Two propositions are <b>logically equivalent</b> (≡) if they have <span class="hl">identical truth values in every row</span>. Equivalently, A ↔ B is a tautology.</p>`),
    card('De Morgan\'s laws', `${F('¬(p ∧ q) ≡ ¬p ∨ ¬q')}${F('¬(p ∨ q) ≡ ¬p ∧ ¬q')}
      <p>When you push a negation inside, <span class="hl">flip ∧ ↔ ∨ and negate each part</span>.</p>
      ${EX('"It is not true that I\'m tired and hungry" ≡ "I\'m not tired <b>or</b> I\'m not hungry."')}`),
    card('Key laws', `${TBL(['Law', 'Equivalence'], [['Double negation', '¬(¬p) ≡ p'], ['Identity', 'p ∧ T ≡ p, &nbsp; p ∨ F ≡ p'], ['Domination', 'p ∨ T ≡ T, &nbsp; p ∧ F ≡ F'], ['Idempotent', 'p ∨ p ≡ p, &nbsp; p ∧ p ≡ p'], ['Complement', 'p ∨ ¬p ≡ T, &nbsp; p ∧ ¬p ≡ F'], ['Commutative', 'p ∨ q ≡ q ∨ p'], ['Associative', '(p ∨ q) ∨ r ≡ p ∨ (q ∨ r)'], ['Distributive', 'p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)<br>p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)'], ['Absorption', 'p ∨ (p ∧ q) ≡ p, &nbsp; p ∧ (p ∨ q) ≡ p']])}`),
    card('Conditional identities', `${F('p → q ≡ ¬p ∨ q', 'Conditional identity')}${F('¬(p → q) ≡ p ∧ ¬q', 'Negating a conditional')}${F('p ↔ q ≡ (p → q) ∧ (q → p)', 'Biconditional')}
      ${TIP('The negation of a conditional is NOT another conditional. "It\'s not true that if it rains I stay home" means "it rains <b>and</b> I don\'t stay home."')}`),
    mc('By De Morgan\'s law, ¬(p ∨ q) ≡ ?', ['¬p ∧ ¬q', '¬p ∨ ¬q', 'p ∧ q', '¬p ∨ q'], 0, 'Negate each part and flip ∨ to ∧.'),
    mc('Negate: "The server is up and the firewall is on."', ['The server is down or the firewall is off.', 'The server is down and the firewall is off.', 'The server is up or the firewall is on.', 'If the server is up, the firewall is off.'], 0, '¬(p ∧ q) ≡ ¬p ∨ ¬q.'),
    mc('Which is equivalent to ¬(p → q)?', ['p ∧ ¬q', '¬p → ¬q', '¬p ∨ q', 'q → p'], 0, '¬(p → q) ≡ ¬(¬p ∨ q) ≡ p ∧ ¬q.'),
    mc('Simplify p ∨ (p ∧ q).', ['p', 'q', 'p ∧ q', 'T'], 0, 'Absorption law: p ∨ (p ∧ q) ≡ p.'),
    mc('Which law says p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)?', ['Distributive', 'Associative', 'Absorption', 'De Morgan\'s'], 0, 'Distributing ∧ over ∨ — just like multiplication over addition.'),
    mc('Simplify p ∧ F.', ['F', 'p', 'T', '¬p'], 0, 'Domination law: anything AND false is false.'),
    order('Put the steps in order to show ¬(p ∨ ¬q) ≡ ¬p ∧ q.', ['¬(p ∨ ¬q)', '≡ ¬p ∧ ¬(¬q)   (De Morgan)', '≡ ¬p ∧ q   (Double negation)'], 'First apply De Morgan\'s law, then remove the double negation.'),
    tf('p → q ≡ ¬p ∨ q', true, 'This is the conditional identity — check the truth tables, they match in every row.'),
    multi('Select ALL tautologies.', ['(p ∧ q) → p', 'p → (p ∨ q)', '(p ∨ q) → p', 'p ∨ ¬p'], [0, 1, 3], 'Simplification (p ∧ q) → p and addition p → (p ∨ q) are tautologies, as is p ∨ ¬p. (p ∨ q) → p fails when p = F, q = T.')
  ]),

  L('1-7', 'Translating English to logic', [
    card('Keyword cheat sheet', `${TBL(['English words', 'Symbol'], [['not, it is false that', '¬'], ['and, but, although, yet', '∧'], ['or (inclusive), either…or', '∨'], ['if…then, implies, only if, sufficient, necessary', '→'], ['if and only if, iff, exactly when', '↔'], ['unless', 'p unless q ≡ ¬q → p ≡ p ∨ q']])}
      ${TIP('"p unless q" means "if not q, then p" — which is the same as p ∨ q.')}`),
    card('Step by step', `<p>1. Name each simple statement with a letter. 2. Find the main connective. 3. Add parentheses.</p>
      ${EX('Let h: "I\'m hungry", e: "I eat", s: "I sleep".<br>"If I\'m hungry and I don\'t eat, then I don\'t sleep."<br>→ <b>(h ∧ ¬e) → ¬s</b>')}`),
    mc('Let r: "it rains", g: "we play golf". Translate: "We play golf unless it rains."', ['¬r → g', 'r → g', 'g → r', 'g ∧ r'], 0, '"p unless q" means ¬q → p. Here: if it does not rain, we play golf.'),
    mc('Let a: "access is granted", p: "password is correct", t: "token is valid". "Access is granted if and only if the password is correct and the token is valid."', ['a ↔ (p ∧ t)', '(a ↔ p) ∧ t', 'a → (p ∧ t)', '(p ∧ t) → a'], 0, 'The main connective is "if and only if", with "password and token" grouped together.'),
    mc('Let s: "you are a student", d: "you get a discount". Translate: "You get a discount only if you are a student."', ['d → s', 's → d', 'd ↔ s', 's ∧ d'], 0, '"p only if q" is p → q, so d → s.'),
    mc('Let f: "the file is encrypted", r: "the file is readable". "The file is not encrypted but it is readable."', ['¬f ∧ r', '¬(f ∧ r)', '¬f ∨ r', 'f → r'], 0, '"But" means "and". Not encrypted is ¬f.'),
    blank('"p is sufficient for q" translates to ___.', ['p → q', 'q → p', 'p ↔ q', 'p ∧ q'], 0, 'If p happens, that is enough for q to happen: p → q.')
  ])
]);
