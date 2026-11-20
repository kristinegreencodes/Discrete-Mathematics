chapter({ id: 'ch2', title: 'Predicates & Quantifiers', icon: '∀', c1: '#2B59C3', c2: '#5BC0FF', desc: 'Predicates, domains, ∀ and ∃, negating and nesting quantifiers' }, [

  L('2-1', 'Predicates and domains', [
    card('Statements with variables', `<p>A <b>predicate</b> is a statement with a variable, like <b>P(x): "x > 3"</b>. It becomes a proposition once x gets a value.</p>
      <ul><li>P(5): "5 > 3" — true</li><li>P(1): "1 > 3" — false</li></ul>
      <p>The <b>domain</b> (universe of discourse) is the set of values x is allowed to take, such as all integers or all students in a class.</p>`),
    card('Predicates with more variables', `<p>Predicates can have several variables: <b>Q(x, y): "x + y = 10"</b>.</p>
      ${EX('Q(3, 7) is true. Q(4, 4) is false.')}
      ${TIP('A predicate is like a function that outputs T or F.')}`),
    mc('P(x): "x² < 10", domain = integers. What is P(3)?', ['True', 'False'], 0, '3² = 9 and 9 < 10, so P(3) is true.', { noShuffle: true }),
    mc('P(x): "x² < 10", domain = integers. What is P(−4)?', ['False', 'True'], 0, '(−4)² = 16, which is not less than 10.', { noShuffle: true }),
    mc('Q(x, y): "x = 2y". Which is TRUE?', ['Q(8, 4)', 'Q(4, 8)', 'Q(3, 1)', 'Q(1, 2)'], 0, '8 = 2·4. ✓'),
    blank('The set of values a variable may take is called the ___.', ['domain', 'range', 'predicate', 'quantifier'], 0, 'The domain (or universe of discourse) must be stated for quantified statements to have a meaning.'),
    tf('A predicate like P(x): "x is prime" is a proposition by itself.', false, 'Without a value for x (or a quantifier), it has no single truth value.')
  ]),

  L('2-2', 'Universal and existential quantifiers', [
    card('For all: ∀', `<p><b>∀x P(x)</b> means "<span class="hl">for every</span> x in the domain, P(x) is true."</p>
      <p>It is <b>false</b> if there is even <b>one counterexample</b>.</p>
      ${EX('Domain: integers. ∀x (x² ≥ 0) is <b>true</b>. ∀x (x > 0) is <b>false</b> — counterexample x = −1.')}`),
    card('There exists: ∃', `<p><b>∃x P(x)</b> means "<span class="hl">there is at least one</span> x in the domain for which P(x) is true."</p>
      <p>To prove it, show one example. It is false only if P(x) is false for <b>every</b> x.</p>
      ${EX('Domain: integers. ∃x (x² = 4) is <b>true</b> (x = 2). ∃x (x² = −1) is <b>false</b>.')}`),
    card('Finite domains', `<p>If the domain is {a, b, c}:</p>${F('∀x P(x) ≡ P(a) ∧ P(b) ∧ P(c)')}${F('∃x P(x) ≡ P(a) ∨ P(b) ∨ P(c)')}
      ${TIP('∀ is a big AND. ∃ is a big OR.')}`),
    mc('Domain: integers. Which statement is TRUE?', ['∃x (x + 5 = 2)', '∀x (x + 5 > 2)', '∀x (2x is odd)', '∃x (x² < 0)'], 0, 'x = −3 works. The others fail: x = −10 breaks ∀x(x + 5 > 2), 2x is always even, and squares are never negative.'),
    mc('Domain: {1, 2, 3}. P(x): "x is odd". What is ∀x P(x)?', ['False', 'True'], 0, 'P(2) is false, so "every x is odd" is false.', { noShuffle: true }),
    mc('Domain: {1, 2, 3}. P(x): "x is odd". What is ∃x P(x)?', ['True', 'False'], 0, 'P(1) is true, so at least one x is odd.', { noShuffle: true }),
    blank('To show a "for all" statement is false, give one ___.', ['counterexample', 'example', 'proof by cases', 'tautology'], 0, 'One counterexample disproves a universal statement.'),
    tf('To prove ∃x P(x) is true, it is enough to find one value of x that makes P(x) true.', true, 'An existence statement needs just one witness.'),
    mc('Domain: all real numbers. ∀x (x² > x)?', ['False — try x = 0.5', 'True', 'False — try x = 3', 'True for negatives only, so it\'s true'], 0, '0.5² = 0.25, which is not greater than 0.5. (Also x = 0 or x = 1.)')
  ]),

  L('2-3', 'Negating quantifiers', [
    card('De Morgan\'s laws for quantifiers', `${F('¬∀x P(x) ≡ ∃x ¬P(x)')}${F('¬∃x P(x) ≡ ∀x ¬P(x)')}
      <p>When you push ¬ past a quantifier, <span class="hl">flip ∀ ↔ ∃ and negate the predicate</span>.</p>
      ${EX('"Not every password is strong" ≡ "Some password is <b>not</b> strong."<br>"No student failed" ≡ "Every student did <b>not</b> fail."')}`),
    card('Negating step by step', `<p>Keep moving the ¬ to the right, flipping each quantifier, until it hits the predicate.</p>
      ${EX('¬∀x ∃y (x + y = 0)<br>≡ ∃x ¬∃y (x + y = 0)<br>≡ ∃x ∀y ¬(x + y = 0)<br>≡ <b>∃x ∀y (x + y ≠ 0)</b>')}
      ${TIP('Negations of comparisons: ¬(x < y) is x ≥ y, ¬(x = y) is x ≠ y. And ¬(P → Q) is P ∧ ¬Q.')}`),
    mc('¬∀x P(x) is equivalent to…', ['∃x ¬P(x)', '∀x ¬P(x)', '¬∃x P(x)', '∃x P(x)'], 0, 'Flip the quantifier and negate the predicate.'),
    mc('Negate: "Every employee completed security training."', ['Some employee did not complete security training.', 'No employee completed security training.', 'Every employee did not complete security training.', 'Some employee completed security training.'], 0, '¬∀x T(x) ≡ ∃x ¬T(x).'),
    mc('Negate: "There is a computer with no virus."', ['Every computer has a virus.', 'There is a computer with a virus.', 'No computer has a virus.', 'Some computer has no virus.'], 0, '¬∃x ¬V(x) ≡ ∀x V(x).'),
    mc('Negate ∀x (x > 2 → x² > 4).', ['∃x (x > 2 ∧ x² ≤ 4)', '∃x (x ≤ 2 → x² ≤ 4)', '∀x (x > 2 ∧ x² ≤ 4)', '∃x (x > 2 → x² ≤ 4)'], 0, 'Flip ∀ to ∃, then ¬(P → Q) ≡ P ∧ ¬Q, and ¬(x² > 4) is x² ≤ 4.'),
    mc('Negate ∃x ∀y (x < y).', ['∀x ∃y (x ≥ y)', '∃x ∃y (x ≥ y)', '∀x ∀y (x ≥ y)', '∀x ∃y (x < y)'], 0, 'Flip both quantifiers and negate x < y to x ≥ y.'),
    tf('¬∃x P(x) ≡ ∀x ¬P(x)', true, '"There is no x with P" is the same as "every x fails P".')
  ]),

  L('2-4', 'Nested quantifiers', [
    card('Two quantifiers', `<p>Statements can have more than one quantifier. Read them <span class="hl">left to right</span>.</p>
      ${TBL(['Statement', 'Meaning'], [['∀x ∀y P(x,y)', 'P is true for every pair'], ['∃x ∃y P(x,y)', 'some pair makes P true'], ['∀x ∃y P(x,y)', 'for each x, you can find a y (y may depend on x)'], ['∃y ∀x P(x,y)', 'one single y works for every x']])}`),
    card('Order matters!', `<p>Domain: integers, P(x, y): "x + y = 0".</p>
      <ul><li><b>∀x ∃y (x + y = 0)</b> — TRUE. For each x, pick y = −x.</li><li><b>∃y ∀x (x + y = 0)</b> — FALSE. No single y works for every x.</li></ul>
      ${TIP('Swapping ∀ and ∃ changes the meaning. Swapping two ∀\'s (or two ∃\'s) does not.')}`),
    card('Translating with nested quantifiers', `<p>L(x, y): "x loves y". Domain: all people.</p>
      ${TBL(['English', 'Logic'], [['Everybody loves somebody.', '∀x ∃y L(x, y)'], ['There is someone everybody loves.', '∃y ∀x L(x, y)'], ['Somebody loves everybody.', '∃x ∀y L(x, y)'], ['Nobody loves everybody.', '¬∃x ∀y L(x, y)']])}`),
    mc('Domain: integers. Which is TRUE?', ['∀x ∃y (y = x + 1)', '∃y ∀x (y = x + 1)', '∀x ∀y (x < y)', '∃x ∀y (x > y)'], 0, 'For each x, choose y = x + 1. No single y works for all x, and the others fail too.'),
    mc('Domain: positive integers. ∃x ∀y (x ≤ y)?', ['True — x = 1', 'False', 'True — x = 0', 'True — x = y'], 0, '1 is less than or equal to every positive integer.'),
    mc('C(x, y): "x has chatted with y". Which means "Someone has chatted with everyone"?', ['∃x ∀y C(x, y)', '∀x ∃y C(x, y)', '∀y ∃x C(x, y)', '∃y ∃x C(x, y)'], 0, 'One person x (∃x) chatted with every y (∀y).'),
    tf('∀x ∀y P(x, y) is equivalent to ∀y ∀x P(x, y).', true, 'Two quantifiers of the same type can be swapped.'),
    tf('∀x ∃y P(x, y) is always equivalent to ∃y ∀x P(x, y).', false, 'Example: x + y = 0 over the integers — the first is true, the second is false.')
  ]),

  L('2-5', 'Translating with quantifiers', [
    card('The two golden patterns', `<p>Domain: all animals. D(x): x is a dog. B(x): x barks.</p>
      ${TBL(['English', 'Correct', 'Common mistake'], [['All dogs bark.', '∀x (D(x) → B(x))', '∀x (D(x) ∧ B(x)) — says every animal is a barking dog'], ['Some dogs bark.', '∃x (D(x) ∧ B(x))', '∃x (D(x) → B(x)) — true if any non-dog exists']])}
      ${TIP('<b>∀ goes with →</b>, <b>∃ goes with ∧</b>.')}`),
    card('"No" and "not all"', `${TBL(['English', 'Logic'], [['No dogs bark.', '∀x (D(x) → ¬B(x)) ≡ ¬∃x (D(x) ∧ B(x))'], ['Not all dogs bark.', '∃x (D(x) ∧ ¬B(x))'], ['Only dogs bark.', '∀x (B(x) → D(x))']])}`),
    mc('S(x): x is a student, P(x): x passed. "Every student passed."', ['∀x (S(x) → P(x))', '∀x (S(x) ∧ P(x))', '∃x (S(x) ∧ P(x))', '∀x (P(x) → S(x))'], 0, 'Use → with ∀.'),
    mc('S(x): x is a server, U(x): x is updated. "Some server is not updated."', ['∃x (S(x) ∧ ¬U(x))', '∃x (S(x) → ¬U(x))', '∀x (S(x) → ¬U(x))', '¬∀x (S(x) ∧ U(x))'], 0, 'Use ∧ with ∃.'),
    mc('H(x): x is a hacker, C(x): x is caught. "No hacker is caught."', ['∀x (H(x) → ¬C(x))', '∀x (H(x) ∧ ¬C(x))', '∃x (H(x) ∧ ¬C(x))', '¬∀x (H(x) → C(x))'], 0, '"No H is C" means every H is not C.'),
    tf('"Some cats are black" translates to ∃x (Cat(x) → Black(x)).', false, 'With ∃ use ∧: ∃x (Cat(x) ∧ Black(x)). The → version is true as soon as anything that isn\'t a cat exists.')
  ])
]);
