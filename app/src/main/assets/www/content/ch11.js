chapter({ id: 'ch11', title: 'Discrete Probability', icon: '🎲', c1: '#862E9C', c2: '#DA77F2', desc: 'Sample spaces, complements, conditional probability, Bayes, expected value' }, [

  L('11-1', 'Sample spaces and events', [
    card('Equally likely outcomes', `<p>The <b>sample space</b> S is the set of all outcomes. An <b>event</b> E is a subset of S.</p>
      ${F('P(E) = |E| / |S|', 'If all outcomes are equally likely')}
      ${EX('Roll one die. P(even) = |{2, 4, 6}| / 6 = 1/2.')}
      ${TIP('0 ≤ P(E) ≤ 1. P(S) = 1 and P(∅) = 0.')}`),
    card('Using counting', `${EX('Two dice: |S| = 36. Sum = 7 happens 6 ways: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). P(7) = 6/36 = <b>1/6</b>.')}
      ${EX('A 5-card hand is all hearts: C(13, 5) / C(52, 5) ≈ 0.000495.')}`),
    num('A bag has 4 red, 5 blue and 3 green marbles. P(blue)? (decimal or fraction)', 5 / 12, '5 of the 12 marbles are blue: 5/12 ≈ 0.4167.'),
    num('Two dice are rolled. P(sum = 8)?', 5 / 36, '(2,6), (3,5), (4,4), (5,3), (6,2): 5/36 ≈ 0.1389.'),
    num('A fair coin is flipped 3 times. P(exactly 2 heads)?', 3 / 8, 'C(3, 2) = 3 of the 8 outcomes: 3/8 = 0.375.'),
    num('A 4-digit PIN is chosen at random. P(it is 1234)?', 1 / 10000, '1 / 10⁴ = 0.0001.', 0.00001, { dp: 4 }),
    tf('A probability can be greater than 1.', false, 'Probabilities are always between 0 and 1.'),
    int('Two dice are rolled. How many outcomes are in the sample space?', 36, '6 · 6 = 36.')
  ]),

  L('11-2', 'Complements and unions', [
    card('Complement rule', `${F('P(Ē) = 1 − P(E)')}
      ${EX('P(at least one head in 4 flips) = 1 − P(no heads) = 1 − 1/16 = <b>15/16</b>.')}
      ${TIP('"At least one" problems are almost always easier with the complement.')}`),
    card('Union rule', `${F('P(A ∪ B) = P(A) + P(B) − P(A ∩ B)')}
      <p>If A and B are <b>mutually exclusive</b> (can't both happen), P(A ∩ B) = 0 and you just add.</p>
      ${EX('Draw a card. P(heart or king) = 13/52 + 4/52 − 1/52 = 16/52 = 4/13.')}`),
    num('P(A) = 0.35. What is P(Ā)?', 0.65, '1 − 0.35 = 0.65.'),
    num('A die is rolled 3 times. P(at least one 6)?', 1 - 125 / 216, '1 − (5/6)³ = 1 − 125/216 = 91/216 ≈ 0.4213.'),
    num('P(A) = 0.5, P(B) = 0.4, P(A ∩ B) = 0.2. Find P(A ∪ B).', 0.7, '0.5 + 0.4 − 0.2 = 0.7.'),
    num('Draw one card. P(it is a face card or a spade)? (12 face cards)', 22 / 52, '12/52 + 13/52 − 3/52 = 22/52 ≈ 0.4231.'),
    tf('If A and B are mutually exclusive, P(A ∪ B) = P(A) + P(B).', true, 'Their intersection is empty.')
  ]),

  L('11-3', 'Conditional probability & independence', [
    card('Conditional probability', `${F('P(A | B) = P(A ∩ B) / P(B)')}
      <p>"The probability of A <b>given</b> that B happened." B becomes the new sample space.</p>
      ${EX('Roll a die. P(6 | even) = (1/6) / (3/6) = <b>1/3</b>.')}`,
      { say: 'Conditional probability. The probability of A given B equals the probability of A and B divided by the probability of B. B becomes the new sample space.' }),
    card('Independence', `<p>A and B are <b>independent</b> if one doesn't affect the other:</p>
      ${F('P(A ∩ B) = P(A) · P(B)')}
      ${EX('Flip a coin and roll a die: P(heads and 6) = 1/2 · 1/6 = 1/12.')}
      ${TIP('Independent ≠ mutually exclusive! Mutually exclusive events with positive probability are always dependent.')}`),
    num('P(A ∩ B) = 0.12 and P(B) = 0.4. Find P(A | B).', 0.3, '0.12 / 0.4 = 0.3.'),
    num('Two cards are drawn without replacement. P(both are aces)?', (4 / 52) * (3 / 51), '4/52 · 3/51 = 12/2652 ≈ 0.004525.', 0.00005, { dp: 4 }),
    num('A server is up 99% of the time; a backup (independent) is up 95%. P(both are down)?', 0.0005, '0.01 · 0.05 = 0.0005.', 0.00001, { dp: 4 }),
    num('A family has 2 children. Given at least one is a girl, P(both are girls)? (assume B/G equally likely)', 1 / 3, 'Outcomes with a girl: GG, GB, BG. Only GG works: 1/3.'),
    tf('If A and B are independent, then P(A | B) = P(A).', true, 'Knowing B happened doesn\'t change the probability of A.'),
    mc('P(A) = 0.5, P(B) = 0.3, P(A ∩ B) = 0.15. Are A and B independent?', ['Yes, 0.5 · 0.3 = 0.15', 'No, they overlap', 'No, 0.5 + 0.3 ≠ 0.15', 'Can\'t tell'], 0, 'P(A)·P(B) equals P(A ∩ B).')
  ]),

  L('11-4', 'Bayes\' theorem', [
    card('Flipping the condition', `${F('P(A | B) = P(B | A) · P(A) / P(B)')}
      <p>with the total probability <b>P(B) = P(B | A)P(A) + P(B | Ā)P(Ā)</b>.</p>`,
      { say: 'Bayes theorem. The probability of A given B equals the probability of B given A, times the probability of A, divided by the probability of B. The total probability of B equals P of B given A times P of A, plus P of B given not A times P of not A.' }),
    card('Spam filter example', `${EX('40% of emails are spam. The word "prize" appears in 30% of spam and 2% of non-spam. If an email contains "prize", P(spam)?<br>P(prize) = 0.3·0.4 + 0.02·0.6 = 0.132<br>P(spam | prize) = 0.12 / 0.132 ≈ <b>0.909</b>')}
      ${TIP('This is exactly how Bayesian spam filters work.')}`),
    num('A disease affects 1% of people. A test is 90% accurate for sick people and has a 5% false-positive rate. P(test positive)?', 0.0585, '0.9·0.01 + 0.05·0.99 = 0.009 + 0.0495 = 0.0585.', 0.0005, { dp: 4 }),
    num('Same test: given a positive test, P(actually sick)?', 0.009 / 0.0585, '0.009 / 0.0585 ≈ 0.1538 — only about 15%!', 0.005),
    num('P(B | A) = 0.8, P(A) = 0.25, P(B) = 0.5. Find P(A | B).', 0.4, '0.8 · 0.25 / 0.5 = 0.4.'),
    tf('P(A | B) is always equal to P(B | A).', false, 'P(sick | positive) can be very different from P(positive | sick) — that\'s why we need Bayes.')
  ]),

  L('11-5', 'Expected value & Bernoulli trials', [
    card('Random variables & expected value', `<p>A <b>random variable</b> X assigns a number to each outcome. Its <b>expected value</b> (mean) is</p>
      ${F('E(X) = Σ x · P(X = x)')}
      ${EX('Roll a die: E(X) = (1 + 2 + 3 + 4 + 5 + 6)/6 = <b>3.5</b>.')}
      <p>Linearity: E(X + Y) = E(X) + E(Y) and E(aX + b) = a·E(X) + b.</p>`),
    card('Bernoulli trials & binomial distribution', `<p>n independent trials, each a success with probability p:</p>
      ${F('P(exactly k successes) = C(n, k) pᵏ (1 − p)<sup>n−k</sup>')}${F('Expected successes = n·p')}
      ${EX('A fair coin 5 times. P(3 heads) = C(5, 3)(0.5)³(0.5)² = 10/32 = 0.3125.')}`),
    num('A game pays $10 with probability 0.2 and $0 otherwise. What is the expected payout?', 2, '10 · 0.2 + 0 · 0.8 = $2.'),
    num('X takes values 1, 2, 3 with probabilities 0.5, 0.3, 0.2. Find E(X).', 1.7, '0.5 + 0.6 + 0.6 = 1.7.'),
    num('Flip a fair coin 10 times. Expected number of heads?', 5, 'n·p = 10 · 0.5 = 5.'),
    num('A multiple-choice quiz has 4 questions with 4 choices each. Guessing, P(exactly 2 right)?', 6 * 0.0625 * 0.5625, 'C(4, 2)(1/4)²(3/4)² = 6 · 1/16 · 9/16 = 54/256 ≈ 0.2109.'),
    num('E(X) = 4. Find E(3X + 2).', 14, '3 · 4 + 2 = 14.'),
    num('A lottery ticket costs $2. You win $100 with probability 0.01. Expected net gain?', -1, '100 · 0.01 − 2 = −$1.')
  ])
]);
