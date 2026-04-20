# Lesson 10 — Specifying Tests and Evaluating AI Output

## Overview

In the last lesson you identified what to test. Today you will write those tests — using AI as the implementation tool.

The key insight: writing a precise test specification requires the same thinking as writing the test. If you can describe the behavior, the input, and the expected output clearly enough for AI to generate a correct test, you have already done the hard part.

This lesson focuses on how to write test specifications that produce meaningful AI output — and how to evaluate whether the tests AI generates will actually do their job.

---

## Learning Goals

By the end of this lesson you should be able to:

- Write a precise test specification that describes behavior, input, and expected output
- Construct an AI prompt that produces a meaningful integration test
- Evaluate AI-generated tests for correctness and usefulness
- Set up React Testing Library in a Vite + React project
- Run a test suite against your PostKit app

---

## ⏱️ Part 1 — Test Setup (15 min)

### Getting React Testing Library Running

Before writing any tests, get the tooling in place.

Install:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Add to `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom'
```

Add to `package.json` scripts:

```json
"test": "vitest",
"test:ui": "vitest --ui"
```

Verify it works:

```bash
npm test
```

If you see `No test files found`, the setup is correct — you just have not written tests yet.

---

## ⏱️ Part 2 — The Specification Before the Prompt (25 min)

### Lecture

The most common mistake when asking AI to write tests is skipping the specification.

You open a prompt, paste in a component, and ask: "write tests for this." AI will generate tests. They will pass. They will test almost nothing useful — because AI defaulted to testing the easiest things to assert, not the things that matter.

**The specification is the thinking.** It forces you to answer:

- What behavior am I testing?
- What is the precise input?
- What is the expected output — exactly?
- What would a bug look like? Would this test catch it?

Once you can answer those, the prompt almost writes itself.

**Test specification format:**

```
Behavior: [what the system should do, in plain language]
Setup:    [what state or data needs to exist before the test]
Action:   [what the user does or what function is called]
Assert:   [exactly what should be true afterward]
Failure:  [what bug would this test catch?]
```

**Example — filter pipeline:**

```
Behavior: Clicking the 'Draft' filter button shows only draft posts in the list

Setup: Store contains two posts — one with status 'draft', one with status 'published'

Action: Render PostListView, click the button labeled 'Draft'

Assert:
  - The draft post title appears in the document
  - The published post title does NOT appear in the document
  - The list renders exactly one post card

Failure: Would catch — filter button not connected to store, wrong status passed
to filterByStatus, filterByStatus bug, useMemo dependency missing
```

**Example — post creation:**

```
Behavior: Creating a post with valid fields adds it to the store and navigates to the editor

Setup: Store is empty. Form fields are filled with valid title, body, tags, category.

Action: Click the 'Create post' button

Assert:
  - Store now contains one post with the correct title
  - The URL has changed to /posts/<new-post-id>
  - The post has status 'draft'
  - The post has a non-empty id (slug)

Failure: Would catch — addPost not called, navigation not triggered, wrong
initial status, slug not generated
```

Notice that the specification describes behavior from the user's perspective, not from the implementation's perspective. It does not say "the `addPost` function is called with the right arguments." It says "the store contains a post with the correct title." The test verifies the outcome, not the mechanism.

---

### Active Learning — Write Your Specifications (15 min)

Take the test target list you built in Lesson 9.

For each target, write a full specification using the format above.

Aim for at least three complete specifications before moving on. These are what you will use to write your AI prompts.

---

## ⏱️ Part 3 — Prompting for Tests (20 min)

### Lecture

A test prompt has a different structure than a feature prompt. You are not asking AI to make a decision — you are asking it to implement a decision you have already made.

**Test prompt structure:**

```
1. TECH STACK      — what testing libraries are you using?
2. COMPONENT       — paste the relevant component or store code
3. DEPENDENCIES    — what stores, libraries, or types does it use?
4. SPECIFICATION   — your full test specification
5. CONSTRAINTS     — what should the test NOT do?
6. ASK             — generate one test for this specification
```

**Example prompt:**

```
I am testing a React app using Vitest and React Testing Library.

Here is my PostListView component:
[paste component code]

It uses:
- usePostStore (Zustand) — has a posts array and a setState method for seeding
- postkit-filter-sort library — filterByStatus(posts, status): Post[]
- Post type: { id: string, title: string, status: 'draft'|'review'|'published', ... }

Test specification:
  Behavior: Clicking the Draft filter shows only draft posts
  Setup: usePostStore seeded with one draft post and one published post
  Action: Render PostListView, click button labeled 'Draft'
  Assert:
    - Draft post title appears in document
    - Published post title does NOT appear
    - Exactly one post card renders
  Failure this test should catch: filter not connected to store, wrong field
  passed to filterByStatus

Constraints:
  - Do not mock the filterByStatus library — use the real implementation
  - Do not test implementation details like function call counts
  - Use userEvent instead of fireEvent for interactions

Write one test for this specification.
```

**Why "do not mock the library":** mocking `filterByStatus` tests that your component calls it — not that the filtering actually works. For integration tests you want the real behavior, including any edge cases in the library.

**Why "do not test implementation details":** `expect(filterByStatus).toHaveBeenCalledWith(posts, 'draft')` would pass even if the list showed wrong results. Test outcomes, not mechanisms.

---

## ⏱️ Part 4 — Evaluating AI-Generated Tests (20 min)

### Lecture

AI will generate a test. Your job is not done. You need to evaluate it before trusting it.

**The four questions to ask about every AI-generated test:**

**1. Would this test fail if the behavior was broken?**

The most important question. Temporarily break the behavior and run the test. If it still passes, the test is not useful.

Simple way to check: comment out the filter call in your component. If the test still passes, it is not testing the filter.

```tsx
// const visible = useMemo(() => {
//   if (statusFilter) result = filterByStatus(result, statusFilter)
// ...
// }, [...])
const visible = posts // just show everything
```

Run the test. If it passes now, rewrite it.

**2. Is it testing an outcome or a mechanism?**

Outcome: `expect(screen.queryByText('Published post')).not.toBeInTheDocument()`
Mechanism: `expect(filterByStatus).toHaveBeenCalled()`

Outcomes are more valuable. They survive refactoring. Mechanism tests break whenever you change the implementation, even when the behavior is correct.

**3. Is the setup realistic?**

A test that seeds the store with perfectly formatted posts will not catch failures caused by real data. Check that the test data includes edge cases: empty tags, long titles, posts with overlapping tags.

**4. Is it testing one thing?**

A test that checks filter AND sort AND search is harder to read and harder to debug when it fails. Split it into three tests with three specifications.

---

### Active Learning — Evaluate and Fix (15 min)

Work in pairs.

Exchange one AI-generated test with your partner.

For each test, answer the four questions. Then:

1. Temporarily break the behavior the test is supposed to catch
2. Run the test — does it fail?
3. If it does not fail, identify why and rewrite the assertion

Report back: did the AI-generated test actually work? What did you have to change?

---

## ⏱️ Part 5 — Lab: Write and Run Your Tests (40 min)

Work on your PostKit test suite.

### Goals for today

- [ ] Test tooling installed and running
- [ ] At least three integration tests written and passing
- [ ] Each test verified: fails when behavior is broken
- [ ] Tests cover at least two different acceptance criteria from PostKit.md

### Suggested test targets if you do not have your own list

**Filter pipeline** — most valuable, covers multiple libraries and store connections

**Post creation** — verifies the editor, validation, store, and slug generation all work together

**Persistence** — verify posts in the store match what the storage library serialized and loaded

**Search** — verify the search input correctly narrows the list

### Working with AI

For each test:
1. Write the specification first
2. Write the prompt using the structure from Part 3
3. Review the generated test against the four evaluation questions
4. Break the behavior and verify the test fails
5. Fix what needs fixing

Note what AI got wrong and what you had to correct. Include this in your AI use note.

---

## ⏱️ Wrap-up (5 min)

Share with the class:

1. Which test was hardest to specify? Why?
2. Did the AI-generated test actually fail when you broke the behavior?
3. What did you have to change or add to make the test meaningful?

---

## A Note on What Comes Next

You now have a test suite that describes the current behavior of your PostKit app.

Next week something will change. When it does, some of your tests will break. That is not a failure — that is what tests are for. A breaking test tells you exactly where to look.

Pay attention to which tests break and why. The answer will tell you something about how well your system was designed to absorb change.

---

## Reflection

1. Why does writing a test specification require the same thinking as writing the test itself?
2. What does it mean to test an outcome rather than a mechanism? Why does the distinction matter?
3. Describe the prompt you wrote for your most useful test. What made it specific enough to produce good output?
4. What behavior in your PostKit app are you most confident is working correctly now, and why?
