chapter({ id: 'ch10', title: 'Counting', icon: '🧮', c1: '#0B7285', c2: '#3BC9DB', desc: 'Product and sum rules, permutations, combinations, repetition, pigeonhole, binomial theorem' }, [

  L('10-1', 'Product and sum rules', [
    card('Product rule', `<p>If a task is a <b>sequence</b> of steps with n₁ ways, then n₂ ways, …, the total is <span class="hl">n₁ · n₂ · …</span></p>
      ${EX('A license plate: 3 letters then 3 digits → 26³ · 10³ = <b>17,576,000</b>.')}
      ${TIP('Keywords: "and then", "followed by", building something in stages.')}`),
    card('Sum rule', `<p>If a task can be done in <b>one of several disjoint ways</b> (n₁ ways OR n₂ ways), the total is <span class="hl">n₁ + n₂</span>.</p>
      ${EX('Pick a project from 12 Python ideas or 8 Java ideas (no overlap): 12 + 8 = <b>20</b>.')}`),
    card('Mixing both', `${EX('Passwords of length 6 to 8, each character an uppercase letter or a digit (36 choices):<br>36⁶ + 36⁷ + 36⁸ ≈ 2.8 trillion.')}
      ${TIP('"At least one digit"? Use complement counting: total − (no digits).')}`),
    int('A restaurant has 4 appetizers, 6 entrées and 3 desserts. How many 3-course meals?', 72, '4 · 6 · 3 = 72.'),
    int('How many 4-digit PINs are possible (digits 0–9, repeats allowed)?', 10000, '10⁴ = 10,000.'),
    int('How many bit strings of length 10 are there?', 1024, '2¹⁰ = 1024.'),
    int('You can take one elective from 5 math courses or 7 CS courses. How many choices?', 12, 'Sum rule: 5 + 7.'),
    int('How many 3-letter strings (A–Z) have NO repeated letters?', 15600, '26 · 25 · 24 = 15,600.'),
    int('How many 4-character passwords use only digits and contain at least one 7?', 3439, 'Total 10⁴ = 10,000; with no 7: 9⁴ = 6,561. 10,000 − 6,561 = 3,439.'),
    int('How many bit strings of length 6 start with 1 or end with 00?', 40, 'Start with 1: 2⁵ = 32. End with 00: 2⁴ = 16. Both: 2³ = 8. 32 + 16 − 8 = 40.')
  ]),

  L('10-2', 'Permutations', [
    card('Arrangements where order matters', `<p>A <b>permutation</b> is an ordered arrangement. The number of r-permutations of n distinct objects:</p>
      ${F('P(n, r) = n! / (n − r)! = n(n − 1)…(n − r + 1)')}
      ${EX('Gold, silver, bronze among 8 runners: P(8, 3) = 8·7·6 = <b>336</b>.')}
      <p>Arranging all n objects: <b>n!</b> ways.</p>`),
    card('Factorials', `${TBL(['n', 'n!'], [['0', '1'], ['1', '1'], ['3', '6'], ['4', '24'], ['5', '120'], ['6', '720'], ['7', '5040'], ['10', '3,628,800']])}
      ${TIP('Order matters? → permutation. "Arrange", "rank", "line up", "president/VP/secretary" are clues.')}`),
    int('In how many ways can 5 books be arranged on a shelf?', 120, '5! = 120.'),
    int('Compute P(7, 2).', 42, '7 · 6 = 42.'),
    int('A club of 10 elects a president, VP and treasurer (different people). How many ways?', 720, 'P(10, 3) = 10·9·8 = 720.'),
    int('How many ways can the letters of COMPUTER be arranged? (all different)', 40320, '8! = 40,320.'),
    int('6 people sit in a row, but Ana must sit in the leftmost seat. How many arrangements?', 120, 'Ana is fixed; arrange the other 5: 5! = 120.'),
    int('How many ways can 4 people be seated around a round table (rotations count as the same)?', 6, 'Circular arrangements: (n − 1)! = 3! = 6.')
  ]),

  L('10-3', 'Combinations', [
    card('Selections where order does NOT matter', `<p>A <b>combination</b> is an unordered selection. The number of r-combinations of n objects:</p>
      ${F('C(n, r) = (n choose r) = n! / (r! (n − r)!)')}
      ${EX('Choose a 3-person team from 8: C(8, 3) = 56.')}
      ${TIP('C(n, r) = P(n, r) / r! — divide out the r! orders of the same group.')}`),
    card('Useful facts', `<ul><li>C(n, 0) = C(n, n) = 1</li><li>C(n, 1) = n</li><li>C(n, r) = C(n, n − r)</li><li>Number of bit strings of length n with exactly r ones = C(n, r)</li></ul>`),
    int('Compute C(10, 3).', 120, '10·9·8 / 3! = 720/6 = 120.'),
    int('How many 5-card hands from a standard 52-card deck?', 2598960, 'C(52, 5) = 2,598,960.'),
    int('How many bit strings of length 8 have exactly three 1s?', 56, 'Choose positions for the 1s: C(8, 3) = 56.'),
    int('A committee of 2 women and 3 men from 6 women and 7 men. How many committees?', 525, 'C(6, 2) · C(7, 3) = 15 · 35 = 525.'),
    mc('Choosing 4 toppings from 12 for a pizza is a…', ['Combination: C(12, 4)', 'Permutation: P(12, 4)', 'Product rule: 12⁴', 'Factorial: 12!'], 0, 'The order you choose toppings in doesn\'t matter.'),
    mc('Awarding 1st, 2nd and 3rd prize among 20 entrants is a…', ['Permutation: P(20, 3)', 'Combination: C(20, 3)', '20³', '3!'], 0, 'The prizes are different, so order matters.'),
    tf('C(20, 17) = C(20, 3)', true, 'Choosing 17 to include is the same as choosing 3 to leave out.')
  ]),

  L('10-4', 'Counting with repetition', [
    card('Four counting formulas', `${TBL(['', 'Order matters', 'Order doesn\'t matter'], [['No repetition', 'P(n, r)', 'C(n, r)'], ['Repetition allowed', 'nʳ', 'C(n + r − 1, r)']])}
      <p>The last one ("stars and bars") counts ways to choose r items from n types with repeats.</p>
      ${EX('Buy 6 donuts from 4 flavors: C(4 + 6 − 1, 6) = C(9, 6) = <b>84</b>.')}`),
    card('Words with repeated letters', `${F('n! / (n₁! n₂! … n<sub>k</sub>!)')}
      ${EX('Arrangements of BANANA (B:1, A:3, N:2): 6! / (1!·3!·2!) = 720 / 12 = <b>60</b>.')}`),
    card('Integer solutions', `<p>The number of solutions to x₁ + x₂ + … + xₙ = r with each xᵢ ≥ 0 is also <b>C(n + r − 1, r)</b>.</p>
      ${EX('x₁ + x₂ + x₃ = 5: C(3 + 5 − 1, 5) = C(7, 5) = 21.')}`),
    int('How many arrangements of the letters in LEVEL?', 30, '5! / (2!·2!·1!) = 120/4 = 30. (L×2, E×2, V×1)'),
    int('How many arrangements of MISSISSIPPI? (M:1, I:4, S:4, P:2)', 34650, '11! / (4!·4!·2!) = 39,916,800 / 1,152 = 34,650.'),
    int('Choose 3 scoops of ice cream from 5 flavors (repeats allowed, order doesn\'t matter). How many choices?', 35, 'C(5 + 3 − 1, 3) = C(7, 3) = 35.'),
    int('How many nonnegative integer solutions does x₁ + x₂ + x₃ + x₄ = 10 have?', 286, 'C(4 + 10 − 1, 10) = C(13, 10) = 286.'),
    mc('A 4-digit code where digits may repeat and order matters. Which formula?', ['10⁴', 'C(13, 4)', 'P(10, 4)', 'C(10, 4)'], 0, 'Order matters with repetition: nʳ.')
  ]),

  L('10-5', 'The pigeonhole principle', [
    card('Basic pigeonhole', `<p>If <b>n + 1</b> or more objects go into <b>n</b> boxes, <span class="hl">some box gets at least 2</span>.</p>
      ${EX('Among 13 people, two were born in the same month.')}`),
    card('Generalized pigeonhole', `<p>If N objects go into k boxes, some box has at least <b>⌈N / k⌉</b> objects.</p>
      ${EX('100 people → some birth month has at least ⌈100/12⌉ = <b>9</b> people.')}
      ${TIP('Reverse question: "How many objects guarantee at least r in one of k boxes?" Answer: k(r − 1) + 1.')}`),
    int('What is the minimum number of students needed to guarantee 2 share a birthday? (366 possible days)', 367, '366 boxes, so 367 students.'),
    int('30 files are stored in 7 folders. At least how many files must some folder contain?', 5, '⌈30 / 7⌉ = ⌈4.29⌉ = 5.'),
    int('How many cards must you draw from a deck to guarantee 3 of the same suit?', 9, 'k = 4 suits, r = 3: 4·2 + 1 = 9.'),
    int('A drawer has red, blue and black socks. How many must you pull (in the dark) to guarantee a matching pair?', 4, '3 colors → 3 + 1 = 4.'),
    tf('If 10 pigeons fly into 9 holes, at least one hole has at least 2 pigeons.', true, 'Basic pigeonhole principle.')
  ]),

  L('10-6', 'Binomial theorem & Pascal\'s triangle', [
    card('Binomial theorem', `${F('(x + y)ⁿ = Σ<sub>k=0</sub><sup>n</sup> C(n, k) x<sup>n−k</sup> y<sup>k</sup>')}
      ${EX('(x + y)³ = x³ + 3x²y + 3xy² + y³')}
      <p>The coefficient of x<sup>n−k</sup>y<sup>k</sup> is C(n, k).</p>`,
      { say: 'The binomial theorem. x plus y to the n equals the sum from k equals 0 to n of n choose k, times x to the n minus k, times y to the k. For example, x plus y cubed equals x cubed plus 3 x squared y plus 3 x y squared plus y cubed.' }),
    card('Pascal\'s triangle', `<div class="formula" style="line-height:1.7">1<br>1 &nbsp; 1<br>1 &nbsp; 2 &nbsp; 1<br>1 &nbsp; 3 &nbsp; 3 &nbsp; 1<br>1 &nbsp; 4 &nbsp; 6 &nbsp; 4 &nbsp; 1<br>1 &nbsp; 5 &nbsp; 10 &nbsp; 10 &nbsp; 5 &nbsp; 1</div>
      <p>Each entry is the sum of the two above it: <b>C(n, k) = C(n − 1, k − 1) + C(n − 1, k)</b> (Pascal's identity).</p>
      ${TIP('Row n adds up to 2ⁿ — the total number of subsets of an n-element set.')}`),
    int('What is the coefficient of x²y³ in (x + y)⁵?', 10, 'C(5, 3) = 10.'),
    int('What is the coefficient of x³ in (x + 2)⁵?', 40, 'C(5, 2) · x³ · 2² = 10 · 4 = 40.'),
    int('What is the sum of the numbers in row 6 of Pascal\'s triangle?', 64, '2⁶ = 64.'),
    mc('Row 4 of Pascal\'s triangle is…', ['1 4 6 4 1', '1 3 3 1', '1 4 4 1', '1 5 10 10 5 1'], 0, 'C(4, 0) … C(4, 4).'),
    int('How many terms are in the expansion of (x + y)¹²?', 13, 'k runs from 0 to 12.')
  ])
]);
