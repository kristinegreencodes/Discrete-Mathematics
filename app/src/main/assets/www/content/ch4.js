chapter({ id: 'ch4', title: 'Sets', icon: '⭕', c1: '#D9480F', c2: '#FFB547', desc: 'Notation, subsets, power sets, set operations, Venn diagrams and Cartesian products' }, [

  L('4-1', 'Sets and notation', [
    card('What is a set?', `<p>A <b>set</b> is an <span class="hl">unordered collection of distinct objects</span> called <b>elements</b>.</p>
      <ul><li><b>Roster notation:</b> A = {1, 2, 3, 4}</li><li><b>Set-builder notation:</b> A = {x ∈ ℤ ∣ 1 ≤ x ≤ 4} — "the set of integers x such that 1 ≤ x ≤ 4"</li></ul>
      <p><b>x ∈ A</b> means x is an element of A. <b>x ∉ A</b> means it is not.</p>
      ${TIP('Order and repeats don\'t matter: {1, 2, 2, 3} = {3, 2, 1}.')}`),
    card('Important sets', `${TBL(['Symbol', 'Set'], [['ℕ', 'natural numbers {0, 1, 2, …} (some books start at 1)'], ['ℤ', 'integers {…, −2, −1, 0, 1, 2, …}'], ['ℤ⁺', 'positive integers {1, 2, 3, …}'], ['ℚ', 'rational numbers (fractions)'], ['ℝ', 'real numbers'], ['∅ or { }', 'the empty set (no elements)']])}`),
    card('Cardinality', `<p>The <b>cardinality</b> |A| is the number of distinct elements in a finite set A.</p>
      ${EX('|{a, b, c}| = 3 &nbsp; |∅| = 0 &nbsp; |{∅}| = 1 &nbsp; |{1, {1, 2}}| = 2')}
      ${TIP('{∅} is NOT empty — it is a box containing an empty box.')}`),
    int('What is |{2, 4, 4, 6, 8, 8}|?', 4, 'Duplicates count once: {2, 4, 6, 8} has 4 elements.'),
    int('What is |{x ∈ ℤ ∣ −2 ≤ x ≤ 3}|?', 6, 'The elements are −2, −1, 0, 1, 2, 3.'),
    int('What is |{∅, {∅}}|?', 2, 'Two different elements: ∅ and {∅}.'),
    tf('{1, 2, 3} = {3, 1, 2}', true, 'Sets are unordered.'),
    mc('Which describes {x ∈ ℤ ∣ x² = 9}?', ['{−3, 3}', '{3}', '{9}', '∅'], 0, 'Both 3 and −3 square to 9.'),
    tf('∅ = {∅}', false, '∅ has 0 elements; {∅} has 1 element (the empty set).'),
    mc('Which statement is TRUE for A = {1, {2, 3}}?', ['{2, 3} ∈ A', '2 ∈ A', '3 ∈ A', '|A| = 3'], 0, 'A has exactly two elements: 1 and the set {2, 3}.')
  ]),

  L('4-2', 'Subsets and power sets', [
    card('Subsets', `<p><b>A ⊆ B</b> means every element of A is also in B.</p>
      <p><b>A ⊂ B</b> (proper subset) means A ⊆ B and A ≠ B.</p>
      ${TIP('Facts: ∅ ⊆ A for every set A, and A ⊆ A.')}
      <p>Two sets are <b>equal</b> when A ⊆ B and B ⊆ A.</p>`),
    card('Power set', `<p>The <b>power set</b> P(A) is the set of <span class="hl">all subsets</span> of A.</p>
      ${EX('A = {a, b}<br>P(A) = {∅, {a}, {b}, {a, b}}')}
      ${F('|P(A)| = 2<sup>|A|</sup>')}`),
    tf('∅ ⊆ {1, 2, 3}', true, 'The empty set is a subset of every set.'),
    tf('{1, 2} ⊂ {1, 2}', false, 'A proper subset can\'t equal the whole set. But {1, 2} ⊆ {1, 2} is true.'),
    int('How many subsets does {a, b, c, d} have?', 16, '2⁴ = 16.'),
    int('How many <b>proper</b> subsets does {a, b, c} have?', 7, '2³ = 8 subsets, minus the set itself = 7.'),
    int('What is |P(P(∅))|?', 2, 'P(∅) = {∅} has 1 element, so its power set has 2¹ = 2 elements: ∅ and {∅}.'),
    mc('A = {1, 2, 3}. Which is NOT a subset of A?', ['{1, 4}', '∅', '{3}', '{1, 2, 3}'], 0, '4 is not in A.'),
    multi('A = {x, y}. Select ALL elements of P(A).', ['∅', '{x}', '{x, y}', 'x'], [0, 1, 2], 'P(A) = {∅, {x}, {y}, {x, y}}. x by itself is an element of A, not a subset.')
  ]),

  L('4-3', 'Set operations', [
    card('Union and intersection', `<p><b>A ∪ B</b> (union): elements in A <b>or</b> B (or both).</p><p><b>A ∩ B</b> (intersection): elements in <b>both</b> A and B.</p>
      ${EX('A = {1, 2, 3}, B = {3, 4}<br>A ∪ B = {1, 2, 3, 4} &nbsp; A ∩ B = {3}')}
      <p>If A ∩ B = ∅, the sets are <b>disjoint</b>.</p>`, { viz: { type: 'venn', shade: ['ab'], text: [[160, 95, 'A ∩ B']] } }),
    card('Difference and complement', `<p><b>A − B</b> (or A \\ B): elements in A but <b>not</b> in B.</p><p><b>Ā</b> or <b>Aᶜ</b> (complement): everything in the universal set U that is <b>not</b> in A.</p>
      ${EX('U = {1,…,6}, A = {1, 2, 3}, B = {3, 4}<br>A − B = {1, 2} &nbsp; B − A = {4} &nbsp; Ā = {4, 5, 6}')}`, { viz: { type: 'venn', shade: ['a'], text: [[100, 95, 'A − B']] } }),
    card('Symmetric difference', `<p><b>A ⊕ B</b> (or A Δ B): elements in <span class="hl">exactly one</span> of the sets.</p>
      ${F('A ⊕ B = (A − B) ∪ (B − A) = (A ∪ B) − (A ∩ B)')}`, { viz: { type: 'venn', shade: ['a', 'b'] } }),
    mc('A = {1, 3, 5, 7}, B = {3, 4, 5}. What is A ∩ B?', ['{3, 5}', '{1, 3, 4, 5, 7}', '{1, 7}', '{4}'], 0, '3 and 5 are in both.'),
    mc('A = {1, 3, 5, 7}, B = {3, 4, 5}. What is A − B?', ['{1, 7}', '{4}', '{3, 5}', '{1, 4, 7}'], 0, 'Remove 3 and 5 from A.'),
    mc('A = {1, 3, 5, 7}, B = {3, 4, 5}. What is A ⊕ B?', ['{1, 4, 7}', '{3, 5}', '{1, 7}', '{1, 3, 4, 5, 7}'], 0, 'In exactly one set: 1, 7 (only A) and 4 (only B).'),
    int('U = {1, 2, …, 10}, A = {2, 4, 6, 8, 10}. What is |Ā|?', 5, 'Ā = {1, 3, 5, 7, 9}.'),
    mc('Which region is shaded?', ['A ∩ B', 'A ∪ B', 'A − B', 'A ⊕ B'], 0, 'Only the overlap is shaded.', { viz: { type: 'venn', shade: ['ab'] } }),
    mc('Which region is shaded?', ['B − A', 'A − B', 'B̄', 'A ∩ B'], 0, 'The part of B outside A.', { viz: { type: 'venn', shade: ['b'] } }),
    mc('Which set is shaded?', ['(A ∩ B) ∪ C', 'A ∩ (B ∪ C)', 'A ∪ B ∪ C', 'A ∩ B ∩ C'], 0, 'All of C is shaded, plus the A ∩ B overlap.', { viz: { type: 'venn', n: 3, shade: ['ab', 'c', 'ac', 'bc', 'abc'] } }),
    tf('If A ∩ B = ∅, then A and B are called disjoint.', true, 'Disjoint sets share no elements.')
  ]),

  L('4-4', 'Set identities & inclusion–exclusion', [
    card('Set identities mirror logic laws', `${TBL(['Law', 'Sets'], [['De Morgan', '<span style="text-decoration:overline">A ∪ B</span> = Ā ∩ B̄ &nbsp;&nbsp; <span style="text-decoration:overline">A ∩ B</span> = Ā ∪ B̄'], ['Distributive', 'A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)'], ['Absorption', 'A ∪ (A ∩ B) = A'], ['Complement', 'A ∪ Ā = U, &nbsp; A ∩ Ā = ∅'], ['Identity', 'A ∪ ∅ = A, &nbsp; A ∩ U = A'], ['Difference', 'A − B = A ∩ B̄']])}
      ${TIP('∪ acts like ∨, ∩ acts like ∧, complement acts like ¬, U like T and ∅ like F.')}`,
      { say: 'Set identities mirror the logic laws. De Morgan: the complement of A union B equals A complement intersect B complement, and the complement of A intersect B equals A complement union B complement. Union acts like or, intersection acts like and, complement acts like not.' }),
    card('Inclusion–exclusion (2 sets)', `${F('|A ∪ B| = |A| + |B| − |A ∩ B|')}<p>We subtract the overlap because it was counted twice.</p>
      ${EX('In a class, 18 take Python, 12 take Java, 5 take both. Students taking at least one: 18 + 12 − 5 = <b>25</b>.')}`),
    card('Inclusion–exclusion (3 sets)', `${F('|A ∪ B ∪ C| = |A| + |B| + |C| − |A∩B| − |A∩C| − |B∩C| + |A∩B∩C|')}
      ${TIP('Add singles, subtract pairs, add back the triple.')}`),
    mc('By De Morgan\'s law, the complement of (A ∩ B) is…', ['Ā ∪ B̄', 'Ā ∩ B̄', 'A ∪ B', 'Ā ∩ B'], 0, 'Complement each set and switch ∩ to ∪.'),
    mc('A − B is equal to…', ['A ∩ B̄', 'A ∪ B̄', 'Ā ∩ B', 'Ā ∪ B'], 0, 'Elements in A and not in B.'),
    int('|A| = 40, |B| = 25, |A ∩ B| = 10. Find |A ∪ B|.', 55, '40 + 25 − 10 = 55.'),
    int('100 users: 60 use 2FA on email, 45 on banking, 30 on both. How many use 2FA on neither?', 25, 'At least one: 60 + 45 − 30 = 75. Neither: 100 − 75 = 25.'),
    int('|A| = 12, |B| = 15, |C| = 10, |A∩B| = 5, |A∩C| = 4, |B∩C| = 3, |A∩B∩C| = 2. Find |A ∪ B ∪ C|.', 27, '12 + 15 + 10 − 5 − 4 − 3 + 2 = 27.'),
    mc('Simplify A ∪ (A ∩ B).', ['A', 'B', 'A ∩ B', 'U'], 0, 'Absorption law.')
  ]),

  L('4-5', 'Cartesian products & partitions', [
    card('Ordered pairs and A × B', `<p>An <b>ordered pair</b> (a, b) cares about order: (1, 2) ≠ (2, 1).</p>
      <p>The <b>Cartesian product</b> A × B is the set of all pairs (a, b) with a ∈ A and b ∈ B.</p>
      ${EX('A = {1, 2}, B = {x, y, z}<br>A × B = {(1,x), (1,y), (1,z), (2,x), (2,y), (2,z)}')}
      ${F('|A × B| = |A| · |B|')}`),
    card('Strings and partitions', `<p>A <b>string</b> of length n over an alphabet is like an element of A × A × … × A (n times). There are |A|ⁿ of them.</p>
      <p>A <b>partition</b> of A splits it into non-empty, <span class="hl">pairwise disjoint</span> subsets whose union is A.</p>
      ${EX('{{1, 2}, {3}, {4, 5}} is a partition of {1, 2, 3, 4, 5}.')}`),
    int('|A| = 4 and |B| = 6. What is |A × B|?', 24, '4 · 6 = 24.'),
    tf('A × B = B × A for all sets A and B.', false, 'Order matters in pairs: (1, x) ∈ A × B but (1, x) ∉ B × A in general.'),
    int('How many binary strings of length 8 are there?', 256, '2⁸ = 256 (this is why a byte has 256 values).'),
    mc('Which is a partition of {1, 2, 3, 4}?', ['{{1, 4}, {2}, {3}}', '{{1, 2}, {2, 3}, {4}}', '{{1, 2}, {3}}', '{∅, {1, 2, 3, 4}}'], 0, 'Non-empty, disjoint, and covers everything. The others overlap, miss 4, or include ∅.'),
    mc('A = {a, b}. Which is an element of A × A?', ['(b, a)', '{a, b}', 'a', '(a, b, a)'], 0, 'Elements of A × A are ordered pairs from A.')
  ])
]);
