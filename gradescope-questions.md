# PostKit — Gradescope Assignment Questions

These questions are submitted through Gradescope at the end of each phase. Each question requires specific evidence from your own work — code, test output, prompt logs, or error messages. Vague answers without evidence will not receive full credit.

---

## Assignment 1 — Library API Design (PostKit Week 1)

**Submit your GitHub PR link before answering.**

### Q1 — Purpose and consumers (5 pts)
In 2–3 sentences, describe what your library does and who in PostKit depends on it. Name at least one specific function from another library or the app that will call your code.

### Q2 — A design decision (10 pts)
Describe one decision you made about your API — a function name, parameter order, return type, or behavior choice. Explain why you made that choice and what alternative you considered. Paste the relevant function signature from your README.

```
Decision:
Why:
Alternative considered:
Function signature:
```

### Q3 — An edge case (5 pts)
Name one edge case your library must handle. What should your function return or do when it receives that input? Paste the relevant section of your README that documents this.

### Q4 — Peer review (5 pts)
Paste one comment you left on a classmate's PR during peer review. Explain why you asked that question or made that suggestion — what concern did it address?

---

## Assignment 2 — Library Implementation and Tests (PostKit Week 2)

**Submit your GitHub repository link before answering.**

### Q1 — A test that caught a bug (15 pts)
Paste one test that revealed a bug in your implementation. Show the original broken code and the fix.

```
Test:

Broken code:

Fixed code:

What the bug was:
```

### Q2 — Edge case test (10 pts)
Paste one edge case test. Explain what input it uses, what it expects, and what real failure it would catch.

### Q3 — What changed from your API proposal (5 pts)
Did anything change between your Week 1 README and your final implementation? If yes, paste the original and the updated version and explain why. If nothing changed, explain why the original design held up.

---

## Assignment 3 — Publishing and Integration (PostKit Week 3)

**Submit your npm package URL before answering.**

### Q1 — Semver decision (10 pts)
What version did you publish? Walk through why you chose that version number. If you published multiple versions during this week, explain each bump.

### Q2 — Install verification (5 pts)
Paste the output of running your documented README example in a fresh project. If it did not work on the first attempt, describe what failed and what you fixed.

### Q3 — Issue filed or received (5 pts)
Paste a link to one GitHub issue you filed on a classmate's package, or one issue filed on your package. Summarize what the problem was and how it was resolved.

### Q4 — JSDoc (5 pts)
Paste the JSDoc comment for your most important exported function. Does the `@example` reflect the actual behavior?

---

## Assignment 4 — PostKit App (PostKit Week 4)

**Submit your PostKit app repository link before answering.**

### Q1 — Architecture decision (15 pts)
What state management approach did you choose and why? Paste the relevant code from your store showing how posts are stored and how at least one operation (add, update, delete) works.

```
Approach chosen and why:

Store code:
```

### Q2 — Library integration (15 pts)
Pick one PostKit feature that uses at least two libraries. Paste the component or function where they compose together. Explain what each library contributes and what would break if either were missing.

```
Feature:
Libraries used:
Code:
What each library contributes:
```

### Q3 — A problem you hit (10 pts)
Describe one integration failure you encountered — a library that did not behave as documented, a type mismatch, a component that received unexpected data. What was the symptom? What was the cause? How did you resolve it?

### Q4 — Prompt log entry (10 pts)
Paste one entry from your prompt log — the full prompt you wrote, the AI output, and what you had to fix or verify. (See prompt log format.)

---

## Assignment 5 — Integration Tests (PostKit Weeks 5–6)

**Submit your test file(s) before answering.**

### Q1 — Test specification (15 pts)
Paste the specification you wrote before asking AI to generate your most important test. Use the format from Lesson 10:

```
Behavior:
Setup:
Action:
Assert:
Failure this should catch:
```

Then paste the final test. What did you have to change from what AI generated?

### Q2 — Breaking the test (10 pts)
Describe how you verified that one of your tests actually fails when behavior is broken. What did you temporarily change in your code? Paste the test output showing it fail.

### Q3 — System map (10 pts)
Describe your PostKit app in terms of boundaries. Name three connections between components, stores, or libraries in your app where a failure would be hard to detect without a test. For each, explain why.

### Q4 — Prompt log review (5 pts)
Look back at your prompt log from Week 4 and compare it to a prompt you wrote in Week 6. Paste both. What changed? Is the later prompt more specific? Does it produce better output?

---

## Assignment 6 — Spec Change (PostKit Week 7)

**Submit your updated library and app repository links before answering.**

### Q1 — Impact analysis (15 pts)
Before you wrote any code, which parts of your app did you expect to need changes? List them. Then describe what actually needed to change. Where were you right? Where were you surprised?

```
Expected to change:
Actually changed:
Surprises:
```

### Q2 — Test results (15 pts)
Paste the test output from running your suite before making any changes to meet the new requirements. How many tests broke? Paste one broken test and explain exactly what it was telling you.

```
Number of tests that broke:
One broken test:
What it was telling you:
```

### Q3 — PostSummary implementation (15 pts)
Paste your `PostSummary` type definition and the function that produces it. Explain where you put this function and why. What libraries does it use?

```
Type definition:
Function:
Where it lives and why:
Libraries used:
```

### Q4 — What absorbed change cleanly (10 pts)
Paste one part of your app — a component, function, or store — that required minimal changes to meet the new requirements. What about its design made it easy to update?

### Q5 — What did not absorb change cleanly (10 pts)
Paste one part of your app that required significant rework. What design decision made it harder? What would you do differently?

### Q6 — Prompt log: before and after (10 pts)
Paste one prompt from Week 4 and one from this week for a similar kind of task. Show how your approach to prompting changed. What do you do differently now?

### Q7 — Final reflection (5 pts)
In 3–5 sentences: what is the most important thing you would do differently if you built PostKit again from the start, knowing what you know now?

---

## Grading Notes

Answers that are vague, generic, or do not include the requested code or evidence will receive partial credit at most. "I used AI to help with implementation and verified the output" is not an acceptable AI use note — paste the prompt and describe what you fixed.

The goal of these questions is not to assess whether you followed the instructions. It is to assess whether you understand what you built.
