chapter({ id: 'ch9', title: 'Sequences, Induction & Recursion', icon: '🔁', c1: '#E8590C', c2: '#FF922B', desc: 'Arithmetic and geometric sequences, sums, mathematical induction and recurrences' }, [

  L('9-1', 'Sequences', [
    card('Arithmetic sequences', `<p>Each term adds the same <b>common difference d</b>.</p>
      ${F('aₙ = a₀ + n·d', 'Explicit (starting at a₀)')}${F('aₙ = aₙ₋₁ + d', 'Recursive')}
      ${EX('3, 7, 11, 15, … has a₀ = 3, d = 4. a₁₀ = 3 + 10·4 = 43.')}
      ${TIP('If the sequence starts at a₁ instead, use aₙ = a₁ + (n − 1)d.')}`),
    card('Geometric sequences', `<p>Each term multiplies by the same <b>common ratio r</b>.</p>
      ${F('aₙ = a₀ · rⁿ', 'Explicit')}${F('aₙ = r · aₙ₋₁', 'Recursive')}
      ${EX('5, 10, 20, 40, … has a₀ = 5, r = 2. a₆ = 5 · 2⁶ = 320.')}`),
    card('Other famous sequences', `<ul><li><b>Fibonacci</b>: f₀ = 0, f₁ = 1, fₙ = fₙ₋₁ + fₙ₋₂ → 0, 1, 1, 2, 3, 5, 8, 13, 21, …</li><li>Squares: 1, 4, 9, 16, … (aₙ = n²)</li><li>Factorials: n! = 1·2·…·n</li></ul>`),
    int('Arithmetic: a₀ = 2, d = 5. Find a₈.', 42, '2 + 8·5 = 42.'),
    int('Geometric: a₀ = 3, r = 3. Find a₄.', 243, '3 · 3⁴ = 243.'),
    int('What is the next term: 2, 6, 18, 54, …?', 162, 'Geometric with r = 3.'),
    int('Fibonacci: f₀ = 0, f₁ = 1. What is f₁₀?', 55, '0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55.'),
    mc('Which sequence is arithmetic?', ['−4, −1, 2, 5, …', '1, 2, 4, 8, …', '1, 4, 9, 16, …', '1, 1, 2, 3, 5, …'], 0, 'Common difference +3.'),
    int('aₙ = 2aₙ₋₁ + 1, a₀ = 1. Find a₃.', 15, 'a₁ = 3, a₂ = 7, a₃ = 15.')
  ]),

  L('9-2', 'Summations', [
    card('Sigma notation', `${F('Σ<sub>i=1</sub><sup>n</sup> aᵢ = a₁ + a₂ + … + aₙ')}
      ${EX('Σ<sub>i=1</sub><sup>4</sup> i² = 1 + 4 + 9 + 16 = 30')}
      <p>Rules: Σ(aᵢ + bᵢ) = Σaᵢ + Σbᵢ and Σ c·aᵢ = c·Σaᵢ.</p>`,
      { say: 'Sigma notation. The sum from i equals 1 to n of a i means a 1 plus a 2 plus all the way to a n. For example, the sum from i equals 1 to 4 of i squared is 1 plus 4 plus 9 plus 16, which is 30.' }),
    card('Formulas to memorize', `${F('Σ<sub>i=1</sub><sup>n</sup> i = n(n + 1)/2')}${F('Σ<sub>i=1</sub><sup>n</sup> i² = n(n + 1)(2n + 1)/6')}${F('Σ<sub>i=0</sub><sup>n</sup> rⁱ = (r<sup>n+1</sup> − 1)/(r − 1), r ≠ 1')}
      ${EX('1 + 2 + … + 100 = 100·101/2 = 5050<br>1 + 2 + 4 + … + 2¹⁰ = 2¹¹ − 1 = 2047')}`,
      { say: 'Formulas to memorize. The sum of i from 1 to n is n times n plus 1 over 2. The sum of i squared is n times n plus 1 times 2 n plus 1, over 6. The geometric sum of r to the i, from 0 to n, is r to the n plus 1, minus 1, over r minus 1.' }),
    int('Compute Σ_{i=1}^{50} i.', 1275, '50·51/2 = 1275.'),
    int('Compute Σ_{i=1}^{5} (2i + 1).', 35, '3 + 5 + 7 + 9 + 11 = 35.'),
    int('Compute Σ_{i=0}^{5} 3ⁱ.', 364, '(3⁶ − 1)/(3 − 1) = 728/2 = 364.'),
    int('Compute Σ_{i=1}^{6} i².', 91, '6·7·13/6 = 91.'),
    int('Compute Σ_{k=1}^{4} 10.', 40, 'Adding 10 four times.'),
    int('Compute Σ_{i=10}^{20} i.', 165, 'Σ1..20 − Σ1..9 = 210 − 45 = 165.')
  ]),

  L('9-3', 'Mathematical induction', [
    card('The domino idea', `<p>To prove P(n) for all n ≥ 1:</p>
      <ol><li><b>Base case:</b> show P(1) is true.</li><li><b>Inductive step:</b> assume P(k) is true (the <b>inductive hypothesis</b>) and prove P(k + 1).</li></ol>
      <p>Then P(1) → P(2) → P(3) → … all fall like dominoes.</p>`),
    card('Example', `${EX('<b>Claim:</b> 1 + 2 + … + n = n(n+1)/2.<br><b>Base:</b> n = 1: 1 = 1·2/2 ✓<br><b>Hypothesis:</b> 1 + … + k = k(k+1)/2.<br><b>Step:</b> 1 + … + k + (k+1) = k(k+1)/2 + (k+1) = (k+1)(k+2)/2 ✓ — which is the formula with n = k + 1. ∎')}
      ${TIP('In the inductive step, find the P(k) expression hiding inside P(k + 1) and replace it using the hypothesis.')}`),
    card('Strong induction', `<p><b>Strong induction</b> assumes P(1), P(2), …, P(k) are <i>all</i> true to prove P(k + 1). It's handy when P(k + 1) depends on earlier cases, e.g. "every n ≥ 2 is a product of primes."</p>`),
    order('Put the parts of an induction proof in order.', ['Prove the base case P(1)', 'Assume P(k) is true for an arbitrary k', 'Use that assumption to prove P(k + 1)', 'Conclude P(n) is true for all n ≥ 1'], 'Base case, hypothesis, inductive step, conclusion.'),
    blank('In induction, assuming P(k) is true is called the ___.', ['inductive hypothesis', 'base case', 'conclusion', 'contrapositive'], 0, 'The inductive hypothesis is what you use to prove P(k + 1).'),
    mc('To prove 2ⁿ > n for all n ≥ 1, the base case checks…', ['2¹ > 1', '2⁰ > 0', '2ᵏ > k', '2ᵏ⁺¹ > k + 1'], 0, 'Start at the first value, n = 1.'),
    mc('Proving Σ_{i=1}^{n} (2i − 1) = n². In the inductive step, you must show Σ_{i=1}^{k+1} (2i − 1) equals…', ['(k + 1)²', 'k²', 'k² + 1', '2k + 1'], 0, 'The formula with n = k + 1. Indeed k² + (2k + 1) = (k + 1)².'),
    tf('An induction proof without a base case is still valid.', false, 'Without a starting domino, nothing falls. (You could "prove" false things like n = n + 1.)'),
    mc('Which statement is best proved by strong induction?', ['Every integer n ≥ 2 is a product of primes', 'The sum 1 + … + n is n(n+1)/2', '2ⁿ ≥ n + 1', '3 divides n³ − n'], 0, 'A composite k + 1 = a·b uses P(a) and P(b) for smaller values — not just P(k).')
  ]),

  L('9-4', 'Recursion & recurrence relations', [
    card('Recursive definitions', `<p>A <b>recursive definition</b> gives a <b>base case</b> plus a rule that builds new values from earlier ones.</p>
      ${EX('n! : 0! = 1, &nbsp; n! = n · (n − 1)!<br>5! = 5·4·3·2·1 = 120')}`),
    card('Recursive algorithms', `<div class="formula" style="text-align:left;font-family:monospace;font-size:13px">procedure fact(n)<br>&nbsp;if n = 0 then return 1<br>&nbsp;else return n · fact(n − 1)</div>
      ${TIP('Every recursive algorithm needs a base case — otherwise it never stops.')}`,
      { say: 'Procedure fact of n. If n equals 0, return 1. Otherwise return n times fact of n minus 1. Every recursive algorithm needs a base case, otherwise it never stops.' }),
    card('Solving recurrences by iteration', `${EX('aₙ = aₙ₋₁ + 3, a₀ = 2<br>a₁ = 5, a₂ = 8, a₃ = 11 … pattern: <b>aₙ = 2 + 3n</b>')}
      ${EX('Towers of Hanoi: Hₙ = 2Hₙ₋₁ + 1, H₁ = 1 → Hₙ = <b>2ⁿ − 1</b>. 64 disks need 2⁶⁴ − 1 moves!')}`),
    int('What is 6!?', 720, '6·5·4·3·2·1 = 720.'),
    int('f(0) = 3, f(n) = 2f(n − 1) − 1. Find f(4).', 33, 'f(1) = 2·3 − 1 = 5, f(2) = 9, f(3) = 17, f(4) = 33.'),
    int('Towers of Hanoi with 5 disks: how many moves (2ⁿ − 1)?', 31, '2⁵ − 1 = 31.'),
    mc('aₙ = aₙ₋₁ + 7, a₀ = 1. A closed formula is…', ['aₙ = 1 + 7n', 'aₙ = 7ⁿ', 'aₙ = 7n', 'aₙ = 1 · 7ⁿ'], 0, 'Adding 7 n times to 1.'),
    mc('aₙ = 4aₙ₋₁, a₀ = 2. A closed formula is…', ['aₙ = 2 · 4ⁿ', 'aₙ = 4 · 2ⁿ', 'aₙ = 2 + 4n', 'aₙ = 8ⁿ'], 0, 'Geometric with ratio 4.'),
    mc('What happens if a recursive function has no base case?', ['It recurses forever (stack overflow)', 'It returns 0', 'It returns 1', 'It runs once'], 0, 'The base case is what stops the recursion.'),
    int('procedure s(n): if n = 1 return 1, else return n + s(n − 1). What is s(6)?', 21, '6 + 5 + 4 + 3 + 2 + 1 = 21.')
  ])
]);
