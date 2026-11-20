chapter({ id: 'ch6', title: 'Boolean Algebra & Logic Circuits', icon: '💡', c1: '#5F3DC4', c2: '#9775FA', desc: 'Boolean operations, identities, logic gates, sum-of-products and simplification' }, [

  L('6-1', 'Boolean values and operations', [
    card('Bits instead of T/F', `<p><b>Boolean algebra</b> works with the values <b>1</b> (true) and <b>0</b> (false).</p>
      ${TBL(['Operation', 'Notation', 'Logic'], [['Complement (NOT)', 'x̄ or x\'', '¬x'], ['Boolean sum (OR)', 'x + y', 'x ∨ y'], ['Boolean product (AND)', 'x · y or xy', 'x ∧ y']])}
      ${TIP('In Boolean algebra, 1 + 1 = 1 (OR), not 2!')}`,
      { say: 'Boolean algebra works with 1 for true and 0 for false. The complement, x bar, is NOT. Boolean sum, x plus y, is OR. Boolean product, x times y, is AND. In Boolean algebra, 1 plus 1 equals 1, because it means OR.' }),
    card('Tables and precedence', `${TBL(['x', 'y', 'x + y', 'x · y'], [[1, 1, 1, 1], [1, 0, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]])}
      <p>Precedence: <b>complement first, then product, then sum</b> — like ¬, ∧, ∨.</p>
      ${EX('x + y·z̄ means x + (y · (z̄))')}`),
    int('Evaluate 1 + 1 in Boolean algebra.', 1, 'Boolean sum is OR: 1 OR 1 = 1.'),
    int('Evaluate 1 · 0 + 1̄ (the bar is over the last 1).', 0, '1 · 0 = 0 and 1̄ = 0, so 0 + 0 = 0.'),
    int('x = 1, y = 0, z = 1. Evaluate x·ȳ + z̄.', 1, 'ȳ = 1, so x·ȳ = 1. z̄ = 0. 1 + 0 = 1.'),
    int('x = 0, y = 1, z = 1. Evaluate (x + y)·z̄.', 0, 'x + y = 1, z̄ = 0, so 1 · 0 = 0.'),
    blank('In Boolean algebra, the product x·y corresponds to the logical ___ operation.', ['AND', 'OR', 'NOT', 'XOR'], 0, 'Product = AND, sum = OR, complement = NOT.')
  ]),

  L('6-2', 'Boolean identities', [
    card('Identities to know', `${TBL(['Law', 'Sum form', 'Product form'], [['Identity', 'x + 0 = x', 'x · 1 = x'], ['Domination', 'x + 1 = 1', 'x · 0 = 0'], ['Idempotent', 'x + x = x', 'x · x = x'], ['Complement', 'x + x̄ = 1', 'x · x̄ = 0'], ['Double complement', 'x̿ = x', ''], ['Absorption', 'x + xy = x', 'x(x + y) = x'], ['De Morgan', '<span style="text-decoration:overline">x + y</span> = x̄ · ȳ', '<span style="text-decoration:overline">xy</span> = x̄ + ȳ'], ['Distributive', 'x(y + z) = xy + xz', 'x + yz = (x + y)(x + z)']])}`,
      { say: 'Boolean identities. Identity: x plus 0 is x, x times 1 is x. Domination: x plus 1 is 1, x times 0 is 0. Idempotent: x plus x is x, x times x is x. Complement: x plus x bar is 1, x times x bar is 0. Absorption: x plus x y is x. De Morgan: the complement of x plus y is x bar times y bar, and the complement of x y is x bar plus y bar.' }),
    card('Duality', `<p>The <b>dual</b> of a Boolean identity swaps + ↔ · and 0 ↔ 1. If an identity is true, its dual is true too.</p>
      ${EX('x + 0 = x &nbsp;⟷&nbsp; dual: x · 1 = x')}
      ${TIP('Handy shortcut: x + x̄y = x + y.')}`),
    mc('Simplify x + 1.', ['1', 'x', '0', 'x̄'], 0, 'Domination law: OR with 1 is always 1.'),
    mc('Simplify x · x̄.', ['0', '1', 'x', 'x̄'], 0, 'Complement law.'),
    mc('Simplify xy + x.', ['x', 'y', 'xy', 'x + y'], 0, 'Absorption: x + xy = x.'),
    mc('The complement of (x · y) is…', ['x̄ + ȳ', 'x̄ · ȳ', 'x + y', 'x̄y'], 0, 'De Morgan: complement each and switch · to +.'),
    mc('What is the dual of x + 1 = 1?', ['x · 0 = 0', 'x · 1 = x', 'x + 0 = x', 'x̄ + 1 = 1'], 0, 'Swap + with · and 1 with 0.'),
    mc('Simplify x + x̄y.', ['x + y', 'xy', 'x', 'y'], 0, 'x + x̄y = (x + x̄)(x + y) = 1 · (x + y) = x + y.'),
    order('Order the steps to simplify xy + xȳ.', ['xy + xȳ', '= x(y + ȳ)   distributive', '= x · 1   complement', '= x   identity'], 'Factor out x, then y + ȳ = 1.')
  ]),

  L('6-3', 'Logic gates', [
    card('The basic gates', `<p>Circuits are built from <b>gates</b>. Each gate takes bits in and puts one bit out.</p>
      ${TBL(['Gate', 'Output is 1 when…'], [['AND', 'all inputs are 1'], ['OR', 'at least one input is 1'], ['NOT (inverter)', 'the input is 0'], ['NAND', 'NOT AND — not all inputs are 1'], ['NOR', 'NOT OR — all inputs are 0'], ['XOR', 'exactly one input is 1 (inputs differ)']])}`, { viz: { type: 'gates', gates: ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'] } }),
    card('Reading a circuit', `<p>Work from the inputs to the output, writing the expression after each gate.</p>
      ${EX('x and y go into an AND gate → xy.<br>z goes into a NOT gate → z̄.<br>Both go into an OR gate → <b>xy + z̄</b>.')}
      ${TIP('The little circle (bubble) on NAND and NOR means "invert the output".')}`),
    mc('Which gate outputs 1 only when both inputs are 0?', ['NOR', 'NAND', 'XOR', 'AND'], 0, 'NOR = NOT OR. OR is 0 only when both inputs are 0, so NOR is 1 then.', { viz: { type: 'gates', gates: ['NOR'] } }),
    mc('Which gate outputs 0 only when both inputs are 1?', ['NAND', 'NOR', 'OR', 'XOR'], 0, 'NAND = NOT AND.'),
    int('Inputs x = 1, y = 1 go into an XOR gate. What is the output?', 0, 'XOR is 1 only when the inputs differ.'),
    int('x = 1, y = 0, z = 0. Circuit output = (x AND y) OR (NOT z). What is it?', 1, 'x AND y = 0, NOT z = 1, 0 OR 1 = 1.'),
    mc('x and y go into an OR gate, and that output goes into a NOT gate. The circuit computes…', ['x̄ȳ (same as a NOR gate)', 'x̄ + ȳ', 'xy', 'x + y'], 0, 'NOT(x + y) = x̄ȳ by De Morgan — that\'s a NOR gate.'),
    tf('A NAND gate gives the same output as an AND gate followed by a NOT gate.', true, 'That\'s exactly what NAND means.')
  ]),

  L('6-4', 'Sum of products & functional completeness', [
    card('Minterms', `<p>A <b>minterm</b> is a product that uses every variable once (plain or complemented) and is 1 for exactly <b>one</b> input row.</p>
      ${EX('Row x = 1, y = 0, z = 1 → minterm <b>xȳz</b>.')}
      ${TIP('Use the variable if it\'s 1 in that row; use its complement if it\'s 0.')}`),
    card('Sum-of-products (DNF)', `<p>To build an expression from a truth table: <span class="hl">write a minterm for every row where the output is 1, then add them</span>.</p>
      ${TBL(['x', 'y', 'F'], [[1, 1, 0], [1, 0, 1], [0, 1, 1], [0, 0, 0]])}
      <p>F = 1 in rows (1, 0) and (0, 1) → <b>F = xȳ + x̄y</b> (this is XOR).</p>`),
    card('Functional completeness', `<p>A set of operations is <b>functionally complete</b> if it can build every Boolean function.</p>
      <ul><li>{+, ·, ¯} is complete (sum-of-products proves it).</li><li>{NAND} alone is complete. {NOR} alone is complete.</li></ul>
      ${EX('NOT x = x NAND x. &nbsp; x AND y = (x NAND y) NAND (x NAND y).')}`),
    mc('What is the minterm for the row x = 0, y = 1, z = 0?', ['x̄yz̄', 'xȳz', 'x + ȳ + z', 'x̄ + y + z̄'], 0, 'Complement the variables that are 0.'),
    mc('F is 1 only in rows (x, y) = (1, 1) and (0, 0). Its sum-of-products is…', ['xy + x̄ȳ', 'xȳ + x̄y', 'x + y', 'x̄ + ȳ'], 0, 'Minterms xy and x̄ȳ. (This is XNOR — "equal".)'),
    int('A function of 3 variables is 1 in exactly 3 rows. How many minterms are in its sum-of-products expansion?', 3, 'One minterm per row with output 1.'),
    tf('The NAND gate alone is functionally complete.', true, 'NOT, AND and OR can all be built from NAND gates.'),
    mc('x NAND x equals…', ['x̄', 'x', '1', '0'], 0, 'NOT(x · x) = NOT x.'),
    int('How many different Boolean functions of 2 variables are there?', 16, 'A 2-variable truth table has 4 rows, each 0 or 1: 2⁴ = 16.')
  ]),

  L('6-5', 'Simplifying circuits & K-maps', [
    card('Why simplify?', `<p>Fewer gates = cheaper, faster circuits. Use Boolean laws or a <b>Karnaugh map (K-map)</b>.</p>
      ${EX('F = xyz + xyz̄ + xȳz<br>= xy(z + z̄) + xȳz = xy + xȳz<br>= x(y + ȳz) = x(y + z) = <b>xy + xz</b>')}`),
    card('K-map basics', `<p>A K-map arranges truth-table cells so neighbors differ in <b>one</b> variable (Gray code order 00, 01, 11, 10).</p>
      ${TBL(['', 'ȳ', 'y'], [['x̄', '0', '1'], ['x', '0', '1']])}
      <p>Circle groups of 1s in sizes 1, 2, 4, 8… The variable that changes inside a group drops out. Here the 1s form a column where y = 1 → <b>F = y</b>.</p>
      ${TIP('Make groups as large as possible, and use as few groups as possible. Groups may overlap and wrap around the edges.')}`),
    mc('Simplify xy + xȳ + x̄y.', ['x + y', 'xy', 'x̄ + ȳ', '1'], 0, 'This is 1 in every row except x = y = 0, which is x + y.'),
    mc('In a K-map, a group of 2 adjacent 1s eliminates how many variables?', ['1', '2', '0', '3'], 0, 'A group of 2ᵏ cells eliminates k variables. 2 = 2¹.', { noShuffle: true }),
    mc('Simplify (x + y)(x + ȳ).', ['x', 'y', 'x + y', '1'], 0, 'Distributive (product form): x + yȳ = x + 0 = x.'),
    mc('K-map order for two variables along an edge is…', ['00, 01, 11, 10', '00, 01, 10, 11', '00, 10, 01, 11', '11, 10, 01, 00'], 0, 'Gray code: neighbors differ in only one bit.', { noShuffle: true }),
    tf('Simplifying a Boolean expression can change the circuit\'s output for some inputs.', false, 'Simplification keeps the same truth table — only the number of gates changes.')
  ])
]);
