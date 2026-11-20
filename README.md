# ∀ Discrete Math

A Mimo-style Android app for mastering **WGU Applied Discrete Mathematics**, with text-to-speech on every screen.

## Features
- **12 chapters, 67 bite-sized lessons**: propositional logic, predicates & quantifiers, rules of inference & proofs, sets, functions & relations, Boolean algebra & logic circuits, number systems & number theory (mod, GCD, RSA), algorithms & Big-O, sequences/induction/recursion, counting, discrete probability, graphs & trees.
- **400+ interactive exercises**: multiple choice, true/false, number answers, fill-in-the-blank, put-in-order and select-all. Missed questions come back at the end of the lesson.
- Diagrams: Venn diagrams, graphs, trees, logic gates, arrow diagrams.
- **Text-to-speech** reads lessons, questions, answers and math symbols out loud ("p implies q", "A union B", "17 is congruent to 5 modulo 12"). Auto-read mode, speed, pitch and voice settings.
- Chapter tests, a 50-question final exam, review-your-mistakes mode, quick practice and calculation drills. XP, daily goal and streaks.
- **12 math tools**: truth table builder (with tautology check and DNF), equivalence checker, base converter, div & mod, GCD/LCM with Euclid steps, modular inverse & fast powers, RSA playground, shift/affine cipher, counting (n!, P, C), set calculator with Venn diagram, sequences & sums, graph analyzer (degrees, Euler paths).
- **Library**: formula sheet, laws & inference-rules cheat sheet, symbol guide and a 129-term glossary.
- Works fully offline.

## Install
Open the **Releases** page of this repo and download `DiscreteMath.apk` from the latest release, then open it on your phone (allow "install unknown apps" if asked).

## Build
GitHub Actions builds the APK on every push to `main` (`.github/workflows/build-apk.yml`).
The app is a native Android WebView shell with a native TextToSpeech bridge (`app/src/main/java/...`); the lessons and UI live in `app/src/main/assets/www/`.
