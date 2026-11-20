chapter({ id: 'ch5', title: 'Functions & Relations', icon: '🔀', c1: '#C2255C', c2: '#FF6B8B', desc: 'Domain and range, one-to-one and onto, composition, inverses, relation properties' }, [

  L('5-1', 'Functions', [
    card('What is a function?', `<p>A <b>function</b> f: A → B assigns <span class="hl">exactly one</span> element of B to <b>each</b> element of A.</p>
      <ul><li><b>Domain</b> = A (the inputs)</li><li><b>Codomain</b> = B (where outputs are allowed to land)</li><li><b>Range</b> (image) = the outputs actually hit</li></ul>
      <p>If f(a) = b, then b is the <b>image</b> of a and a is a <b>pre-image</b> of b.</p>`,
      { viz: { type: 'arrows', A: ['1', '2', '3'], B: ['a', 'b', 'c', 'd'], pairs: [['1', 'a'], ['2', 'c'], ['3', 'c']] } }),
    card('Not a function', `<p>A rule is <b>not</b> a function if some input has <b>no</b> output or <b>more than one</b> output.</p>
      ${TIP('Every arrow must start at a domain element, and every domain element must have exactly one arrow leaving it. Outputs can be shared.')}`),
    mc('In the diagram above (1→a, 2→c, 3→c, codomain {a, b, c, d}), what is the range?', ['{a, c}', '{a, b, c, d}', '{1, 2, 3}', '{c}'], 0, 'Only a and c are actually hit.'),
    mc('Which is NOT a function from {1, 2, 3} to {x, y}?', ['{(1, x), (2, y)}', '{(1, x), (2, x), (3, x)}', '{(1, y), (2, x), (3, y)}', '{(1, x), (2, y), (3, x)}'], 0, '3 has no output, so it\'s not a function on {1, 2, 3}.'),
    int('f: ℤ → ℤ, f(x) = x² − 3x. What is f(5)?', 10, '25 − 15 = 10.'),
    mc('f(x) = x² on domain {−2, −1, 0, 1, 2}. What is the range?', ['{0, 1, 4}', '{−2, −1, 0, 1, 2}', '{0, 1, 2, 4}', '{−4, −1, 0, 1, 4}'], 0, 'The outputs are 4, 1, 0, 1, 4 → {0, 1, 4}.'),
    tf('Two different inputs of a function can have the same output.', true, 'That\'s allowed. What\'s not allowed is one input with two outputs.'),
    blank('The set of all allowed outputs of f: A → B (whether or not they are hit) is the ___.', ['codomain', 'range', 'domain', 'pre-image'], 0, 'The codomain is B. The range is the part of B that is actually hit.')
  ]),

  L('5-2', 'One-to-one, onto, bijection', [
    card('One-to-one (injective)', `<p>f is <b>one-to-one</b> if <span class="hl">different inputs always give different outputs</span>: f(a) = f(b) ⇒ a = b.</p>
      ${TIP('No two arrows land on the same target.')}`, { viz: { type: 'arrows', A: ['1', '2', '3'], B: ['a', 'b', 'c', 'd'], pairs: [['1', 'b'], ['2', 'a'], ['3', 'd']] } }),
    card('Onto (surjective)', `<p>f is <b>onto</b> if <span class="hl">every element of the codomain is hit</span>: range = codomain.</p>
      ${TIP('Every target gets at least one arrow.')}`, { viz: { type: 'arrows', A: ['1', '2', '3', '4'], B: ['a', 'b', 'c'], pairs: [['1', 'a'], ['2', 'b'], ['3', 'c'], ['4', 'c']] } }),
    card('Bijection', `<p>A <b>bijection</b> is both one-to-one <b>and</b> onto — a perfect pairing. Only bijections have inverses.</p>
      ${TBL(['If |A| vs |B|', 'Possible?'], [['|A| > |B|', 'cannot be one-to-one'], ['|A| < |B|', 'cannot be onto'], ['|A| = |B| (finite)', 'one-to-one ⇔ onto ⇔ bijection']])}`),
    mc('f: ℤ → ℤ, f(x) = x + 4. This function is…', ['A bijection', 'One-to-one but not onto', 'Onto but not one-to-one', 'Neither'], 0, 'Different x give different outputs, and every integer y is hit by x = y − 4.'),
    mc('f: ℤ → ℤ, f(x) = 2x. This function is…', ['One-to-one but not onto', 'Onto but not one-to-one', 'A bijection', 'Neither'], 0, 'It\'s one-to-one, but odd numbers are never hit.'),
    mc('f: ℤ → ℤ, f(x) = x². This function is…', ['Neither one-to-one nor onto', 'One-to-one only', 'Onto only', 'A bijection'], 0, 'f(2) = f(−2) and negative numbers are never hit.'),
    mc('f: ℝ → ℝ, f(x) = x³. This function is…', ['A bijection', 'One-to-one only', 'Onto only', 'Neither'], 0, 'Cubing is strictly increasing on ℝ and hits every real number.'),
    tf('A function from a 5-element set to a 3-element set can be one-to-one.', false, 'Pigeonhole: 5 inputs into 3 outputs means some output is shared.'),
    mc('f: {1, 2, 3} → {a, b, c}: 1→b, 2→c, 3→a. f is…', ['A bijection', 'Only one-to-one', 'Only onto', 'Not a function'], 0, 'Each target is hit exactly once.')
  ]),

  L('5-3', 'Composition, inverses, floor & ceiling', [
    card('Composition', `<p><b>(f ∘ g)(x) = f(g(x))</b> — apply g first, then f.</p>
      ${EX('f(x) = 2x + 1, g(x) = x²<br>(f ∘ g)(3) = f(9) = 19<br>(g ∘ f)(3) = g(7) = 49')}
      ${TIP('Composition is usually NOT commutative: f ∘ g ≠ g ∘ f.')}`),
    card('Inverse functions', `<p>If f is a bijection, its <b>inverse</b> f⁻¹ undoes it: f(a) = b ⇔ f⁻¹(b) = a.</p>
      ${EX('f(x) = 3x − 2. Solve y = 3x − 2 for x: x = (y + 2)/3. So f⁻¹(y) = (y + 2)/3.')}`),
    card('Floor and ceiling', `<p><b>⌊x⌋</b> (floor) = the largest integer ≤ x. <b>⌈x⌉</b> (ceiling) = the smallest integer ≥ x.</p>
      ${TBL(['x', '⌊x⌋', '⌈x⌉'], [['3.7', '3', '4'], ['5', '5', '5'], ['−2.3', '−3', '−2']])}
      ${TIP('Careful with negatives: floor goes DOWN (more negative).')}`),
    int('f(x) = x + 5, g(x) = 3x. Find (f ∘ g)(4).', 17, 'g(4) = 12, then f(12) = 17.'),
    int('f(x) = x + 5, g(x) = 3x. Find (g ∘ f)(4).', 27, 'f(4) = 9, then g(9) = 27.'),
    mc('f(x) = 4x + 8. What is f⁻¹(x)?', ['(x − 8)/4', '4x − 8', 'x/4 + 8', '1/(4x + 8)'], 0, 'Solve y = 4x + 8: x = (y − 8)/4.'),
    int('What is ⌊−4.2⌋?', -5, 'The greatest integer less than or equal to −4.2 is −5.'),
    int('What is ⌈7.01⌉?', 8, 'The smallest integer greater than or equal to 7.01 is 8.'),
    int('How many bytes are needed to store 100 bits? Use ⌈100/8⌉.', 13, '100/8 = 12.5, and you can\'t have half a byte, so ⌈12.5⌉ = 13.'),
    tf('Only bijections have inverse functions.', true, 'If f is not one-to-one, the inverse would have two outputs; if not onto, some inputs of the inverse would have none.')
  ]),

  L('5-4', 'Relations and their properties', [
    card('Relations', `<p>A <b>relation</b> R on a set A is any subset of A × A. We write <b>a R b</b> when (a, b) ∈ R.</p>
      ${EX('A = {1, 2, 3}, R = "less than" = {(1,2), (1,3), (2,3)}')}
      <p>Relations can be drawn as a <b>directed graph</b> or stored as a 0/1 <b>matrix</b>.</p>`, { viz: { type: 'graph', nodes: ['1', '2', '3'], edges: [['1', '2'], ['1', '3'], ['2', '3']], directed: true } }),
    card('Four properties', `${TBL(['Property', 'Means', 'Graph test'], [['<b>Reflexive</b>', '(a, a) ∈ R for every a', 'a self-loop on every vertex'], ['<b>Symmetric</b>', '(a, b) ∈ R ⇒ (b, a) ∈ R', 'every arrow has a return arrow'], ['<b>Antisymmetric</b>', '(a, b) and (b, a) ∈ R ⇒ a = b', 'no pair of opposite arrows between different vertices'], ['<b>Transitive</b>', '(a, b) and (b, c) ∈ R ⇒ (a, c) ∈ R', 'every 2-step path has a shortcut']])}
      ${TIP('Symmetric and antisymmetric are NOT opposites — a relation can be both (e.g. equality) or neither.')}`),
    mc('On ℤ, the relation "≤" is…', ['Reflexive, antisymmetric, transitive', 'Reflexive, symmetric, transitive', 'Symmetric only', 'Irreflexive and symmetric'], 0, 'a ≤ a; a ≤ b and b ≤ a forces a = b; and ≤ chains.'),
    mc('On ℤ, the relation "<" is NOT…', ['Reflexive', 'Transitive', 'Antisymmetric', 'A relation'], 0, 'a < a is never true.'),
    mc('R = {(1,1), (2,2), (3,3), (1,2), (2,1)} on {1, 2, 3}. R is…', ['Reflexive, symmetric and transitive', 'Reflexive and antisymmetric', 'Symmetric only', 'Not reflexive'], 0, 'All self-loops, every pair reversed, and chains like 1→2→1 have 1→1.'),
    tf('R = {(1, 2), (2, 3)} on {1, 2, 3} is transitive.', false, '(1, 2) and (2, 3) are in R, but (1, 3) is not.'),
    mc('"a is a sibling of b" (people) is…', ['Symmetric', 'Reflexive', 'Antisymmetric', 'Reflexive and antisymmetric'], 0, 'If a is b\'s sibling, b is a\'s sibling. You are not your own sibling, so it\'s not reflexive.'),
    multi('R = {(1,1), (2,2), (3,3), (1,3)} on {1, 2, 3}. Select ALL properties R has.', ['Reflexive', 'Antisymmetric', 'Transitive', 'Symmetric'], [0, 1, 2], '(1,3) has no (3,1), so not symmetric. It is reflexive, antisymmetric and transitive.')
  ]),

  L('5-5', 'Equivalence relations & partial orders', [
    card('Equivalence relations', `<p>A relation that is <b>reflexive, symmetric and transitive</b> is an <b>equivalence relation</b>. It splits the set into <b>equivalence classes</b> (a partition).</p>
      ${EX('a ~ b if a ≡ b (mod 3). Classes: [0] = {…, −3, 0, 3, 6, …}, [1] = {…, 1, 4, 7, …}, [2] = {…, 2, 5, 8, …}')}`),
    card('Partial orders', `<p>A relation that is <b>reflexive, antisymmetric and transitive</b> is a <b>partial order</b>, e.g. ≤ on ℤ, ⊆ on sets, "divides" on ℤ⁺.</p>
      <p>A <b>Hasse diagram</b> draws a partial order with smaller elements lower and no self-loops or shortcut edges.</p>`,
      { viz: { type: 'graph', nodes: [{ id: '1', x: 160, y: 165 }, { id: '2', x: 100, y: 105 }, { id: '3', x: 220, y: 105 }, { id: '6', x: 160, y: 40 }], edges: [['1', '2'], ['1', '3'], ['2', '6'], ['3', '6']] } }),
    mc('An equivalence relation must be…', ['Reflexive, symmetric and transitive', 'Reflexive, antisymmetric and transitive', 'Symmetric and antisymmetric', 'Only transitive'], 0, 'Those three properties define an equivalence relation.'),
    mc('A partial order must be…', ['Reflexive, antisymmetric and transitive', 'Reflexive, symmetric and transitive', 'Irreflexive and symmetric', 'Symmetric and transitive'], 0, 'Antisymmetry is what makes it an "order".'),
    int('Congruence mod 5 on ℤ has how many equivalence classes?', 5, 'Remainders 0, 1, 2, 3, 4.'),
    mc('Under congruence mod 4, which number is in the same class as 7?', ['19', '18', '20', '6'], 0, '7 mod 4 = 3 and 19 mod 4 = 3.'),
    tf('"Has the same birthday as" is an equivalence relation on people.', true, 'Reflexive, symmetric and transitive — the classes are the 366 possible birthdays.'),
    tf('The divisibility relation "a ∣ b" on positive integers is a partial order.', true, 'a ∣ a; if a ∣ b and b ∣ a then a = b (for positives); and divisibility chains.')
  ])
]);
