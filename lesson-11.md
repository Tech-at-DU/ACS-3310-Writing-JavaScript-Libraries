# Lesson 11 — The Spec Change

## Overview

The PostKit requirements have changed. One new requirement has been added to the app.

Over the next two weeks you will analyze the change, implement it, reflect on what it revealed, and present your findings to the class.

The implementation is small by design. The work is in understanding what the change touches and why — before, during, and after you write the code.

**Reference documents:**
- [Updated Requirements](./PostKit-spec-change.md)
- [AI Use Policy](./ai-policy.md)

---

## Session 1 — The Reveal (Tue, May 5)

### What this session is for

Read the updated requirement together. Predict its impact before touching any code. Leave with a written analysis and a clear implementation plan.

---

### ⏱️ Part 1 — Read the Requirement (15 min)

The instructor will distribute [PostKit-spec-change.md](./PostKit-spec-change.md).

Read it on your own. Do not open your code yet.

When you have finished, answer in your head:
- What does the user actually want?
- What does this imply about the `Post` type?
- Where does this change live — in the app, in a library, or both?

---

### ⏱️ Part 2 — Impact Analysis (35 min)

Work individually. Open your app. Open `TEST-TARGETS.md` from lesson 9.

Do not write any implementation code. Write predictions.

**Step 1 — Map the change to your system (15 min)**

Using the boundary map you drew in lesson 9 as a reference, answer:

1. What field needs to be added to the `Post` type?
2. Which files in your app reference the `Post` type directly?
3. Which store operation is responsible for advancing a post to `published`? What will need to change there?
4. Which component renders the date in the preview panel? What conditional logic will it need?
5. Which boundaries does this change cross — library, state, or view?

**Step 2 — Run your test suite now (5 min)**

```bash
npm test
```

Write down which tests break immediately, before you change anything. This is your baseline.

**Step 3 — Predict what breaks after you implement (10 min)**

Which tests do you expect to fail once you make the change? Which tests should you add?

Write these down. They become your test plan.

**Step 4 — Estimate the work (5 min)**

How many files will you touch? How long do you think this will take?

Write a number. You will compare this against reality in session 3.

---

### ⏱️ Part 3 — Share Predictions (20 min)

In pairs, share your impact analyses.

- Did you identify the same files?
- Did you predict the same tests breaking?
- Did you make the same decision about the `Post` type?

If you made different predictions, talk through why. You may both be right — different app architectures will feel this change differently.

---

### ⏱️ Part 4 — Plan Your Implementation (15 min)

Before leaving, write a short plan for Session 2:

1. Which file will you change first, and why?
2. What will you do to verify the change is correct before moving on?
3. What is the one thing most likely to go wrong?

---

### Wrap-up

Share with the class:

1. How many files do you predict will need to change?
2. Did running your test suite surprise you? What broke?
3. What is one thing you are uncertain about before you start implementing?

---

## Session 2 — Implementation Day (Thu, May 7)

### What this session is for

Implement R7. One requirement, one session. By the end of class the change should be working and your test suite should be passing.

---

### ⏱️ Part 1 — Implement (90 min)

Work in this order. Resist the urge to jump ahead.

**Step 1 — Update the `Post` type**

Add the field that records when a post was published. Think about:
- What type should it be? (`string`, `Date`, `string | null`?)
- What should its value be for posts that have never been published?
- Where is the type defined in your app?

Make the change. TypeScript will show you immediately which files are now broken. That list is your implementation checklist.

**Step 2 — Update the store**

Find the operation that advances a post's status. When a post moves to `published`, record the current time in the new field.

Write a test for this behavior before implementing it:

```ts
test('advancing a post to published records publishedAt', () => {
  // seed the store with a draft post
  // advance the post to published
  // assert that publishedAt is now set and is a valid date string
})
```

Run it. Watch it fail. Then implement.

**Step 3 — Update the preview panel**

The preview panel should show `publishedAt` for published posts and `updatedAt` for everything else.

The logic is a small conditional. Use your date display library — it is already wired up here.

**Step 4 — Run the full test suite**

```bash
npm test
```

Fix any failing tests. Add the test you wrote in Step 2 if it is not already there. Add at least one test for the preview panel behavior.

**Step 5 — Verify manually**

1. Create a new post — preview should show last updated date
2. Advance the post to review — preview should still show last updated date  
3. Advance the post to published — preview should now show published date
4. Edit the post after publishing — published date should not change

---

### ⏱️ Part 2 — Compare Against Your Predictions (20 min)

Open the impact analysis you wrote in Session 1.

Answer these questions — you will use them in REFLECTION.md:

1. How many files did you actually touch? How does that compare to your prediction?
2. Which tests broke that you did not predict?
3. Which tests that you predicted would break did not actually break?
4. What took longer than you expected? What was faster?
5. Did anything about the change surprise you?

Write these down now while the details are fresh.

---

### Wrap-up

Before leaving, confirm:
- [ ] R7 implemented and working
- [ ] Test suite passing
- [ ] Predictions vs reality notes written while fresh

---

## Session 3 — Reflection and Presentation Prep (Tue, May 12)

### What this session is for

Write your reflection. Prepare your presentation. This is thinking work, not building work.

---

### ⏱️ Part 1 — Write REFLECTION.md (60 min)

Create `REFLECTION.md` in the root of your app repo.

Answer the six questions from the spec change document. The guidance below will help you write answers that are actually useful — to you now, and to yourself in a future job when you are trying to remember why something was hard.

---

**Question 1 — Prediction vs reality**

Pull out your Session 1 impact analysis. Compare it against what actually happened.

A strong answer names specific files:
> "I predicted I would only need to change PostDetailView.tsx and the store. I missed that usePostStore.ts also needed to update the advanceStatus function — I had not thought about where publishedAt gets set, only where it gets displayed."

A weak answer stays abstract:
> "The change was a little bigger than I expected."

---

**Question 2 — What absorbed the change cleanly**

Name the specific place in your code that handled the change with minimal friction. What made it easy?

Common answers worth exploring:
- A component that was already reading only what it needed from the store — so adding a field didn't require restructuring anything
- A date utility that was already handling optional/undefined values — so the null case was already handled
- A test that was already seeding the store with full Post objects — so adding a field just meant adding it to makePost

---

**Question 3 — What required more rework**

Name the specific place that was harder than expected. What decision made it hard?

Be honest. "I hardcoded the date logic in two components and had to update both separately" is a better answer than "it was a little messy."

---

**Question 4 — Test results**

How many tests broke on first run? What did the number tell you about your test coverage?

Zero breaking tests can mean two things: your architecture is clean, or your tests are not testing the right things. Which is it for you?

---

**Question 5 — A test that caught something**

This question has a specific answer or it does not. If a test caught a real bug, describe it exactly. If none did, say that honestly — and describe what test you wish you had written.

---

**Question 6 — If you built it again**

Do not answer this with general principles ("I would write more tests"). Answer it with your specific app:
> "I would not store the date as a raw ISO string in two different fields. I would think earlier about what displayDate means and centralize that logic."

---

### ⏱️ Part 2 — Prepare Your Presentation (30 min)

Your presentation is 3 minutes. No slides required — use your code.

The structure:

1. **What I predicted** — show your impact analysis from Session 1, give the numbers
2. **What actually happened** — where you were right, where you were wrong
3. **One thing that worked cleanly** — show the code, explain why it was easy
4. **One thing that didn't** — show the code, explain what you would change

Practice it once out loud. Three minutes goes faster than you think.

---

### Wrap-up

Before leaving, confirm:
- [ ] `REFLECTION.md` written with specific answers
- [ ] Presentation prepared and timed
- [ ] All deliverables submitted to Gradescope

---

## Session 4 — Presentations (Thu, May 14)

### What this session is for

Share what you learned. Hear how the same change landed differently across ten different architectures.

---

### ⏱️ Presentations (45 min)

Each student presents for 3 minutes. Have your code open and ready before your turn.

After each presentation, one question from the class.

---

### ⏱️ Class Discussion (25 min)

After all presentations:

**On the change:**
- Which files came up most often across everyone's presentations?
- Did anyone's architecture handle the change in a way that surprised you?
- Was there a boundary type — library, state, or view — that kept coming up as the source of friction?

**On predictions:**
- Who was most accurate in their impact analysis? What did they know about their system?
- What was the most common thing people did not predict?

**On tests:**
- Did anyone's tests catch something real? What was it?
- Who found that their tests were not testing what they thought?

**On AI:**
- How did you use AI for this assignment specifically?
- Did your prompts look different from the ones you wrote in week 5? How?

---

### ⏱️ Closing (20 min)

The arc of this course:

**Weeks 1–2** — A function takes input and returns output. Tests verify the contract.

**Weeks 3–4** — Functions become libraries. Libraries make promises to their callers. Semver communicates what changed and how much it costs to upgrade.

**Weeks 5–6** — Libraries compose into a system. Systems have boundaries. Boundaries are where failures hide — and where tests matter most.

**Weeks 7–8** — Systems change. The quality of your design is visible only when change arrives. A clean architecture absorbs change in predictable places. A rushed one spreads it everywhere.

The skill you practiced in this course is not JavaScript, or TypeScript, or npm, or React Testing Library — though you learned all of those.

The skill is asking: *if this changes, what else changes?*

Ask that question before writing a function. Ask it before publishing a library. Ask it before merging a PR. It is the question that separates code that is easy to work in from code that accumulates debt.

You built something real. It changed. You understood it well enough to change it deliberately.

That is the work.
