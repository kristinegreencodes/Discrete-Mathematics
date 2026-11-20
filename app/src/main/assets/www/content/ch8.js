chapter({ id: 'ch8', title: 'Algorithms & Complexity', icon: '⚙️', c1: '#2B8A3E', c2: '#69DB7C', desc: 'Pseudocode, searching, sorting, Big-O growth and loop analysis' }, [

  L('8-1', 'Algorithms & pseudocode', [
    card('What is an algorithm?', `<p>An <b>algorithm</b> is a finite sequence of precise instructions for solving a problem.</p>
      ${TBL(['Property', 'Meaning'], [['Input / Output', 'takes input, produces output'], ['Definiteness', 'every step is precise'], ['Correctness', 'gives the right output for every input'], ['Finiteness', 'always stops after a finite number of steps'], ['Effectiveness', 'each step can be done exactly in finite time'], ['Generality', 'works for all inputs of the right form']])}`),
    card('Reading pseudocode', `<div class="formula" style="text-align:left;font-family:monospace;font-size:13px">procedure max(a₁, …, aₙ)<br>&nbsp;max := a₁<br>&nbsp;for i := 2 to n<br>&nbsp;&nbsp;if aᵢ > max then max := aᵢ<br>&nbsp;return max</div>
      <p>":=" means <b>assign</b>. Trace by tracking each variable step by step.</p>`,
      { say: 'Procedure max of a 1 through a n. Set max to a 1. For i from 2 to n, if a i is greater than max, set max to a i. Return max. The colon equals sign means assign. Trace pseudocode by tracking each variable step by step.' }),
    card('Tracing example', `${EX('x := 1<br>for i := 1 to 4<br>&nbsp;&nbsp;x := x · 2<br>Trace: x = 2, 4, 8, 16 → final <b>x = 16</b>')}`),
    int('Trace: s := 0; for i := 1 to 5: s := s + i. What is s at the end?', 15, '0 + 1 + 2 + 3 + 4 + 5 = 15.'),
    int('Trace: x := 3; for i := 1 to 3: x := 2x − 1. Final x?', 17, '3 → 5 → 9 → 17.'),
    int('Trace: count := 0; for i := 1 to 4: for j := 1 to 3: count := count + 1. Final count?', 12, 'The inner statement runs 4 · 3 = 12 times.'),
    int('Trace: n := 20; k := 0; while n > 1: n := n div 2; k := k + 1. Final k?', 4, 'n: 20 → 10 → 5 → 2 → 1, four halvings.'),
    mc('Which property says an algorithm must eventually stop?', ['Finiteness', 'Definiteness', 'Generality', 'Correctness'], 0, 'Finiteness: it ends after finitely many steps.'),
    tf('An infinite loop can still be a valid algorithm.', false, 'Algorithms must terminate (finiteness).')
  ]),

  L('8-2', 'Searching', [
    card('Linear search', `<p>Check items <b>one by one</b> from the start until you find the target or reach the end.</p>
      <ul><li>Works on any list (sorted or not).</li><li>Worst case: <b>n</b> comparisons → O(n).</li></ul>`),
    card('Binary search', `<p>On a <b>sorted</b> list: compare with the middle item, then throw away the half that can't contain the target. Repeat.</p>
      ${EX('Find 19 in [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]<br>middle 9 → go right; middle 15 → go right; middle 17 → go right; found 19.')}
      <p>Worst case ≈ <b>⌊log₂ n⌋ + 1</b> comparisons → O(log n).</p>
      ${TIP('Binary search on 1,000,000 items needs only about 20 steps!')}`),
    mc('Binary search requires the list to be…', ['Sorted', 'Of even length', 'Unsorted', 'Made of integers only'], 0, 'It decides which half to discard by comparing order.'),
    mc('Worst-case time for linear search on n items:', ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], 0, 'It might check every item.'),
    mc('Worst-case time for binary search on n items:', ['O(log n)', 'O(n)', 'O(n log n)', 'O(1)'], 0, 'Each step halves the list.'),
    int('About how many comparisons does binary search need at most for 1,024 items? (⌊log₂ n⌋ + 1)', 11, 'log₂ 1024 = 10, so 10 + 1 = 11.'),
    int('Linear search for 42 in [8, 15, 42, 4, 23]. How many comparisons until it is found?', 3, 'It checks 8, 15, then 42.'),
    mc('Binary search for 7 in [1, 3, 5, 7, 9, 11, 13]. What is the first element compared?', ['7', '1', '5', '9'], 0, 'The middle of 7 items is the 4th one: 7. Found on the first try!')
  ]),

  L('8-3', 'Sorting', [
    card('Bubble sort', `<p>Repeatedly pass through the list, <b>swapping adjacent items</b> that are out of order. After each pass, the largest remaining item "bubbles" to the end.</p>
      ${EX('[4, 2, 3, 1]<br>Pass 1: [2, 3, 1, <b>4</b>]<br>Pass 2: [2, 1, <b>3, 4</b>]<br>Pass 3: [<b>1, 2, 3, 4</b>]')}
      <p>Worst case: about n²/2 comparisons → <b>O(n²)</b>.</p>`),
    card('Insertion sort', `<p>Build a sorted part on the left. Take the next item and <b>insert</b> it into its correct place.</p>
      ${EX('[5, 2, 4, 1]<br>[2, 5 | 4, 1] → [2, 4, 5 | 1] → [1, 2, 4, 5]')}
      <p>Worst case <b>O(n²)</b>; best case (already sorted) O(n).</p>
      ${TIP('Faster sorts like merge sort run in O(n log n).')}`),
    mc('After the first pass of bubble sort on [5, 1, 4, 2], the list is…', ['[1, 4, 2, 5]', '[1, 2, 4, 5]', '[1, 5, 4, 2]', '[5, 4, 2, 1]'], 0, 'Swaps: 5↔1, 5↔4, 5↔2 → [1, 4, 2, 5].'),
    int('How many comparisons does one full pass of bubble sort make on a list of 6 items?', 5, 'It compares each adjacent pair: n − 1 = 5.'),
    mc('Worst-case complexity of bubble sort:', ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'], 0, 'Nested passes give quadratic time.'),
    mc('Insertion sort on [3, 1, 2]: after inserting the second element, the list is…', ['[1, 3, 2]', '[1, 2, 3]', '[3, 1, 2]', '[2, 1, 3]'], 0, '1 is inserted before 3; 2 is not processed yet.'),
    mc('Which sort has O(n log n) worst-case time?', ['Merge sort', 'Bubble sort', 'Insertion sort', 'Selection sort'], 0, 'Merge sort splits in half (log n levels) and merges in linear time.')
  ]),

  L('8-4', 'Big-O, Big-Ω, Big-Θ', [
    card('Big-O', `<p><b>f(n) is O(g(n))</b> if f grows <span class="hl">no faster than</span> g for large n: there are constants C and k with |f(n)| ≤ C·|g(n)| for all n > k.</p>
      ${EX('3n² + 5n + 2 is O(n²). (C = 10, k = 1 works: 3n² + 5n + 2 ≤ 10n² for n > 1.)')}
      ${TIP('Keep the <b>dominant term</b>, drop constants: 7n³ + 100n² + 9 → O(n³).')}`),
    card('Ω and Θ', `<ul><li><b>Big-Ω</b> (Omega) — lower bound: f grows at least as fast as g.</li><li><b>Big-Θ</b> (Theta) — tight bound: f is both O(g) and Ω(g).</li></ul>
      ${EX('3n² + 5n is Θ(n²). It is also O(n³) (a loose upper bound) but not Θ(n³).')}`),
    card('Growth order', `${F('1 &lt; log n &lt; n &lt; n log n &lt; n² &lt; n³ &lt; 2ⁿ &lt; n!')}
      ${TBL(['Big-O', 'Name', 'Example'], [['O(1)', 'constant', 'array access'], ['O(log n)', 'logarithmic', 'binary search'], ['O(n)', 'linear', 'linear search'], ['O(n log n)', 'linearithmic', 'merge sort'], ['O(n²)', 'quadratic', 'bubble sort'], ['O(2ⁿ)', 'exponential', 'all subsets'], ['O(n!)', 'factorial', 'all orderings']])}`,
      { say: 'Growth order from slowest to fastest: constant, log n, n, n log n, n squared, n cubed, 2 to the n, and n factorial.' }),
    mc('Big-O of 4n³ + 2n² log n + 100?', ['O(n³)', 'O(n² log n)', 'O(4n³)', 'O(100)'], 0, 'n³ dominates; drop the constant 4.'),
    mc('Big-O of 2ⁿ + n¹⁰?', ['O(2ⁿ)', 'O(n¹⁰)', 'O(n)', 'O(n¹⁰ · 2ⁿ)'], 0, 'Exponentials eventually beat any polynomial.'),
    mc('Big-O of (n log n + n)(n + 1)?', ['O(n² log n)', 'O(n log n)', 'O(n²)', 'O(n³)'], 0, '(n log n)(n) = n² log n dominates.'),
    order('Order from slowest-growing to fastest-growing.', ['log n', '√n', 'n', 'n log n', 'n²', '2ⁿ'], '√n grows faster than log n but slower than n.'),
    tf('5n + 3 is O(n²).', true, 'Big-O is an upper bound, so a linear function is also O(n²) — just not Θ(n²).'),
    tf('n² is O(n).', false, 'n² eventually exceeds C·n for any constant C.'),
    mc('If f(n) is both O(n²) and Ω(n²), then f(n) is…', ['Θ(n²)', 'O(n)', 'Ω(n³)', 'Θ(n)'], 0, 'Tight bound = Theta.')
  ]),

  L('8-5', 'Analyzing loops', [
    card('Counting operations', `<p>Count how many times the innermost statement runs.</p>
      ${TBL(['Loop pattern', 'Runs', 'Big-O'], [['for i := 1 to n', 'n', 'O(n)'], ['for i := 1 to n, for j := 1 to n', 'n²', 'O(n²)'], ['for i := 1 to n, for j := 1 to i', 'n(n+1)/2', 'O(n²)'], ['i := n; while i > 1: i := i div 2', '≈ log₂ n', 'O(log n)'], ['two separate loops of n', '2n', 'O(n)']])}
      ${TIP('Nested loops multiply. Back-to-back loops add.')}`),
    card('Worst, best, average', `<p><b>Worst-case</b> complexity is the maximum number of operations over all inputs of size n — it's what Big-O usually reports.</p>`),
    mc('for i := 1 to n: for j := 1 to n: for k := 1 to n: x := x + 1. Complexity?', ['O(n³)', 'O(n²)', 'O(3n)', 'O(n)'], 0, 'Three nested loops: n·n·n.'),
    mc('for i := 1 to n: x := x + 1. Then for j := 1 to n: y := y + 1. Complexity?', ['O(n)', 'O(n²)', 'O(2ⁿ)', 'O(log n)'], 0, 'Separate loops add: 2n is O(n).'),
    mc('i := n; while i > 1: i := i div 2. Complexity?', ['O(log n)', 'O(n)', 'O(n/2)', 'O(1)'], 0, 'Halving each time gives about log₂ n iterations.'),
    int('for i := 1 to 10: for j := 1 to i: count := count + 1. Final count (starting from 0)?', 55, '1 + 2 + … + 10 = 10·11/2 = 55.'),
    mc('for i := 1 to n: for j := 1 to 5: x := x + 1. Complexity?', ['O(n)', 'O(n²)', 'O(5ⁿ)', 'O(1)'], 0, '5n operations — the inner loop is a constant 5.')
  ])
]);
