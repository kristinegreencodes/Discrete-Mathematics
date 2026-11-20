chapter({ id: 'ch7', title: 'Number Systems & Number Theory', icon: '🔢', c1: '#1971C2', c2: '#4DABF7', desc: 'Binary/hex, div and mod, congruences, primes, GCD, inverses and RSA' }, [

  L('7-1', 'Binary, octal and hex', [
    card('Place value in any base', `<p>In base b, each place is worth a power of b. The digits allowed are 0 to b − 1.</p>
      ${EX('1011₂ = 1·2³ + 0·2² + 1·2¹ + 1·2⁰ = 8 + 0 + 2 + 1 = <b>11</b>')}
      ${TBL(['Base', 'Name', 'Digits'], [['2', 'binary', '0, 1'], ['8', 'octal', '0–7'], ['10', 'decimal', '0–9'], ['16', 'hexadecimal', '0–9, A=10, B=11, C=12, D=13, E=14, F=15']])}`),
    card('Decimal → base b', `<p><span class="hl">Divide by b repeatedly and read the remainders from bottom to top.</span></p>
      ${EX('Convert 13 to binary:<br>13 ÷ 2 = 6 r <b>1</b><br>6 ÷ 2 = 3 r <b>0</b><br>3 ÷ 2 = 1 r <b>1</b><br>1 ÷ 2 = 0 r <b>1</b><br>Read up: <b>1101₂</b>')}`),
    card('Binary ↔ hex shortcut', `<p>Each hex digit = <b>4 bits</b>. Each octal digit = <b>3 bits</b>.</p>
      ${EX('1010 1111₂ → A F → <b>AF₁₆</b> = 175<br>2F₁₆ → 0010 1111₂')}
      ${TIP('Memorize powers of 2: 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024.')}`),
    int('Convert 11010₂ to decimal.', 26, '16 + 8 + 0 + 2 + 0 = 26.'),
    int('Convert 45 to binary (type the bits, e.g. 1011).', 101101, '45 = 32 + 8 + 4 + 1 → 101101.', { hint: 'Type the binary digits only.' }),
    int('Convert 2F₁₆ to decimal.', 47, '2·16 + 15 = 47.'),
    int('Convert 157₈ to decimal.', 111, '1·64 + 5·8 + 7 = 111.'),
    mc('Convert 255 to hexadecimal.', ['FF', 'EF', 'F0', '1FF'], 0, '255 = 15·16 + 15 = FF.'),
    mc('Convert 1100 0011₂ to hexadecimal.', ['C3', 'B3', 'C4', '93'], 0, '1100 = C, 0011 = 3.'),
    int('What is the largest decimal number you can write with 8 bits?', 255, '11111111₂ = 2⁸ − 1 = 255.'),
    int('Add in binary: 1011₂ + 0110₂ (answer in binary).', 10001, '11 + 6 = 17 = 10001₂.', { hint: 'Type the binary digits only.' })
  ]),

  L('7-2', 'Division, div and mod', [
    card('The division algorithm', `<p>For any integer a and positive integer d, there are unique integers q and r with</p>
      ${F('a = d·q + r, &nbsp; 0 ≤ r < d')}
      <p><b>q = a div d</b> (quotient) and <b>r = a mod d</b> (remainder).</p>
      ${EX('101 = 11·9 + 2 → 101 div 11 = 9, 101 mod 11 = 2')}`),
    card('Negative numbers', `<p>The remainder must be <b>non-negative</b>, so the quotient rounds <b>down</b>.</p>
      ${EX('−11 mod 3: −11 = 3·(−4) + 1 → <b>−11 mod 3 = 1</b>, &nbsp; −11 div 3 = −4')}
      ${TIP('Shortcut: for negative a, add multiples of d until you land in 0 … d−1. −11 + 12 = 1.')}`),
    card('Divisibility', `<p><b>a ∣ b</b> ("a divides b") means b = a·k for some integer k — that is, b mod a = 0.</p>
      ${EX('3 ∣ 12 ✓ &nbsp; 5 ∤ 12 ✗')}
      <p>Properties: if a ∣ b and a ∣ c then a ∣ (b + c); if a ∣ b and b ∣ c then a ∣ c.</p>`),
    int('What is 47 mod 6?', 5, '47 = 6·7 + 5.'),
    int('What is 47 div 6?', 7, '6·7 = 42 ≤ 47 < 48.'),
    int('What is −17 mod 5?', 3, '−17 = 5·(−4) + 3.'),
    int('What is −17 div 5?', -4, '−17 = 5·(−4) + 3, so the quotient is −4.'),
    int('What is 123 mod 10?', 3, 'mod 10 gives the last digit.'),
    tf('7 ∣ 56', true, '56 = 7 · 8.'),
    tf('If a ∣ b and a ∣ c, then a ∣ (b − c).', true, 'b = am and c = an, so b − c = a(m − n).'),
    int('It is 9:00 now. What hour will a 12-hour clock show 100 hours from now? (Use 12 for 12 o\'clock.)', 1, '(9 + 100) mod 12 = 109 mod 12 = 1.')
  ]),

  L('7-3', 'Modular arithmetic', [
    card('Congruence', `<p><b>a ≡ b (mod m)</b> means a and b have the same remainder when divided by m — equivalently, <span class="hl">m ∣ (a − b)</span>.</p>
      ${EX('17 ≡ 5 (mod 12) because 12 ∣ 12. &nbsp; 38 ≡ 3 (mod 5) because 5 ∣ 35.')}`),
    card('Arithmetic mod m', `<p>You can reduce at any step:</p>
      ${F('(a + b) mod m = ((a mod m) + (b mod m)) mod m')}${F('(a · b) mod m = ((a mod m) · (b mod m)) mod m')}
      ${EX('(97 · 64) mod 10 = (7 · 4) mod 10 = 28 mod 10 = <b>8</b>')}
      <p><b>ℤ<sub>m</sub></b> = {0, 1, …, m − 1} with +ₘ and ·ₘ is "arithmetic modulo m".</p>`),
    card('Applications', `<ul><li><b>Clocks & calendars</b> — day of the week is mod 7.</li><li><b>Hashing</b> — h(k) = k mod m picks a memory slot.</li><li><b>Check digits</b> — ISBN, credit cards (Luhn).</li><li><b>Cryptography</b> — shift ciphers and RSA.</li></ul>`),
    tf('29 ≡ 4 (mod 5)', true, '29 − 4 = 25, and 5 ∣ 25.'),
    tf('16 ≡ 3 (mod 6)', false, '16 − 3 = 13, which is not divisible by 6.'),
    int('Compute (88 + 57) mod 9.', 1, '88 mod 9 = 7, 57 mod 9 = 3, 7 + 3 = 10, 10 mod 9 = 1.'),
    int('Compute (23 · 19) mod 7.', 3, '23 mod 7 = 2, 19 mod 7 = 5, 2·5 = 10, 10 mod 7 = 3.'),
    int('Today is Wednesday (day 3, where Sunday = 0). What day number is it 52 days from now?', 6, '(3 + 52) mod 7 = 55 mod 7 = 6 → Saturday.'),
    int('A hash function is h(k) = k mod 11. Where does key 1234 go?', 2, '1234 = 11·112 + 2.'),
    mc('Which number is congruent to 2 (mod 7)?', ['23', '22', '21', '27'], 0, '23 − 2 = 21 = 7·3.')
  ]),

  L('7-4', 'Primes and factorization', [
    card('Primes', `<p>A <b>prime</b> is an integer p > 1 whose only positive divisors are 1 and p. An integer > 1 that isn't prime is <b>composite</b>.</p>
      ${EX('Primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, …<br>1 is <b>neither</b> prime nor composite. 2 is the only even prime.')}`),
    card('Fundamental Theorem of Arithmetic', `<p>Every integer > 1 can be written as a product of primes in <span class="hl">exactly one way</span> (up to order).</p>
      ${EX('360 = 2³ · 3² · 5')}
      ${TIP('Test for primality: if n is composite, it has a prime factor ≤ √n. So to check 97, try 2, 3, 5, 7 (since √97 ≈ 9.8). None divide it → prime.')}`),
    mc('Which is prime?', ['97', '91', '87', '51'], 0, '91 = 7·13, 87 = 3·29, 51 = 3·17.'),
    mc('Prime factorization of 84?', ['2² · 3 · 7', '2 · 3 · 14', '4 · 21', '2³ · 7'], 0, '84 = 4 · 21 = 2² · 3 · 7.'),
    mc('To test if 221 is prime, you only need to try primes up to…', ['14 (√221 ≈ 14.9)', '110', '221', '50'], 0, 'If 221 had a factor, one would be ≤ √221. (221 = 13·17.)'),
    tf('1 is a prime number.', false, 'Primes must be greater than 1.'),
    int('How many primes are less than 30?', 10, '2, 3, 5, 7, 11, 13, 17, 19, 23, 29.'),
    int('What is the largest prime factor of 1001?', 13, '1001 = 7 · 11 · 13.')
  ]),

  L('7-5', 'GCD, LCM & the Euclidean algorithm', [
    card('GCD and LCM', `<p><b>gcd(a, b)</b> is the largest integer dividing both. <b>lcm(a, b)</b> is the smallest positive integer both divide.</p>
      <p>Using prime factorizations: gcd takes the <b>smaller</b> powers, lcm takes the <b>larger</b> powers.</p>
      ${EX('120 = 2³·3·5, 500 = 2²·5³<br>gcd = 2²·5 = 20 &nbsp; lcm = 2³·3·5³ = 3000')}
      ${F('gcd(a, b) · lcm(a, b) = a · b')}`),
    card('Euclidean algorithm', `<p>gcd(a, b) = gcd(b, a mod b). Repeat until the remainder is 0; the last non-zero remainder is the gcd.</p>
      ${EX('gcd(252, 198)<br>252 = 1·198 + 54<br>198 = 3·54 + 36<br>54 = 1·36 + 18<br>36 = 2·18 + <b>0</b> → gcd = <b>18</b>')}
      <p>If gcd(a, b) = 1, a and b are <b>relatively prime</b>.</p>`),
    int('Find gcd(48, 18).', 6, '48 = 2·18 + 12, 18 = 1·12 + 6, 12 = 2·6 + 0.'),
    int('Find gcd(1071, 462).', 21, '1071 = 2·462 + 147; 462 = 3·147 + 21; 147 = 7·21 + 0.'),
    int('Find lcm(12, 18).', 36, 'gcd = 6, so lcm = 12·18/6 = 36.'),
    int('gcd(a, b) = 4 and a·b = 240. Find lcm(a, b).', 60, 'lcm = ab / gcd = 240 / 4 = 60.'),
    tf('15 and 28 are relatively prime.', true, '15 = 3·5 and 28 = 2²·7 share no prime factor.'),
    order('Order the Euclidean algorithm steps for gcd(84, 36).', ['84 = 2·36 + 12', '36 = 3·12 + 0', 'gcd = 12'], 'The last non-zero remainder is 12.')
  ]),

  L('7-6', 'Modular inverses & fast exponents', [
    card('Modular inverse', `<p>An <b>inverse of a mod m</b> is a number ā with <b>a·ā ≡ 1 (mod m)</b>. It exists exactly when <span class="hl">gcd(a, m) = 1</span>.</p>
      ${EX('Inverse of 3 mod 7: 3·5 = 15 ≡ 1 → <b>5</b>')}
      <p>For bigger numbers use the extended Euclidean algorithm to find s, t with s·a + t·m = 1; then s mod m is the inverse.</p>`),
    card('Solving linear congruences', `<p>To solve a·x ≡ b (mod m), multiply both sides by the inverse of a.</p>
      ${EX('3x ≡ 4 (mod 7). Inverse of 3 is 5. x ≡ 5·4 = 20 ≡ <b>6</b> (mod 7). Check: 3·6 = 18 ≡ 4 ✓')}`),
    card('Fast modular exponentiation', `<p>To compute bⁿ mod m, square repeatedly and reduce mod m each step.</p>
      ${EX('3¹³ mod 7: 3¹ ≡ 3, 3² ≡ 2, 3⁴ ≡ 4, 3⁸ ≡ 2.<br>13 = 8 + 4 + 1 → 3¹³ ≡ 2·4·3 = 24 ≡ <b>3</b> (mod 7)')}
      ${TIP('Fermat\'s little theorem: if p is prime and p ∤ a, then a<sup>p−1</sup> ≡ 1 (mod p).')}`),
    int('Find the inverse of 4 modulo 9.', 7, '4·7 = 28 = 3·9 + 1.'),
    int('Find the inverse of 7 modulo 26.', 15, '7·15 = 105 = 4·26 + 1.'),
    tf('6 has an inverse modulo 9.', false, 'gcd(6, 9) = 3 ≠ 1, so no inverse exists.'),
    int('Solve 2x ≡ 5 (mod 9). Give x in 0–8.', 7, 'The inverse of 2 mod 9 is 5. x ≡ 25 ≡ 7. Check: 14 ≡ 5 ✓'),
    int('Compute 2¹⁰ mod 11.', 1, '1024 = 93·11 + 1. (Fermat: 2¹⁰ ≡ 1 mod 11.)'),
    int('Compute 5⁶ mod 13.', 12, '5² = 25 ≡ 12, 5⁴ ≡ 144 ≡ 1, 5⁶ = 5⁴·5² ≡ 12.')
  ]),

  L('7-7', 'Cryptography: shift ciphers & RSA', [
    card('Shift (Caesar) cipher', `<p>Number letters A = 0 … Z = 25. Encrypt with <b>E(p) = (p + k) mod 26</b>, decrypt with <b>D(c) = (c − k) mod 26</b>.</p>
      ${EX('k = 3: H(7) → 10 = K. "HI" → "KL".')}
      <p>An <b>affine cipher</b> uses E(p) = (a·p + b) mod 26, where gcd(a, 26) = 1 so it can be undone.</p>`),
    card('RSA in five steps', `<ol><li>Pick primes p and q. Let <b>n = p·q</b>.</li><li>Let <b>φ = (p − 1)(q − 1)</b>.</li><li>Pick <b>e</b> with gcd(e, φ) = 1. Public key: (n, e).</li><li>Find <b>d = e⁻¹ mod φ</b>. Private key: d.</li><li>Encrypt <b>C = Mᵉ mod n</b>. Decrypt <b>M = Cᵈ mod n</b>.</li></ol>
      ${EX('p = 5, q = 11 → n = 55, φ = 40, e = 3, d = 27 (3·27 = 81 ≡ 1 mod 40).<br>M = 7: C = 7³ mod 55 = 343 mod 55 = 13.')}
      ${TIP('RSA is secure because factoring a huge n back into p and q is extremely hard.')}`),
    mc('Encrypt "A" with a shift cipher, k = 5.', ['F', 'E', 'V', 'G'], 0, 'A = 0 → 5 = F.'),
    mc('Decrypt "D" from a shift cipher with k = 7.', ['W', 'K', 'X', 'T'], 0, 'D = 3. (3 − 7) mod 26 = 22 = W.'),
    int('RSA: p = 3, q = 11. What is n?', 33, 'n = 3 · 11.'),
    int('RSA: p = 3, q = 11. What is φ = (p − 1)(q − 1)?', 20, '2 · 10 = 20.'),
    int('RSA: φ = 20, e = 3. Find d = e⁻¹ mod 20.', 7, '3·7 = 21 ≡ 1 (mod 20).'),
    int('RSA with n = 33, e = 3: encrypt M = 4. C = 4³ mod 33 = ?', 31, '64 mod 33 = 31.'),
    mc('In RSA, which part is kept secret?', ['d (and the primes p, q)', 'n', 'e', 'The ciphertext'], 0, '(n, e) is public. d, p and q must stay private.'),
    tf('In an affine cipher E(p) = (a·p + b) mod 26, a = 13 is a valid key.', false, 'gcd(13, 26) = 13, so 13 has no inverse mod 26 and the cipher couldn\'t be decrypted.')
  ])
]);
