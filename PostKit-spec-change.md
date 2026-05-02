# PostKit — Updated Requirements

## Overview

Real software changes after it ships.

This document describes one updated requirement for PostKit. Your task is to analyze the change, predict its impact, implement it, and then reflect honestly on what the experience revealed about your system.

The implementation is intentionally small. The point is not what you build — it is what you learn about what you already built.

---

## What Has Changed and Why

PostKit users have asked for one thing:

**They want to know when a post was published.**

The current display shows when a post was last updated. For published posts, users care more about when it was published — that is the date that matters to their readers. Last edited is a detail for the writer. Published date is information for everyone.

---

## Updated Requirement

### R7 — Preview Post Metadata *(updated)*

For posts that have been published, the preview must show when the post was published — not when it was last edited.

For posts that have not yet been published, continue showing the last updated date.

**What this means:**

- The `Post` type needs a way to record when a post was published
- Publishing a post (advancing status to `published`) must record that moment
- The preview panel must show the right date depending on the post's status

There are no types provided here. Reading the requirement, understanding what it implies for your data model, and deciding how to implement it is part of the assignment.

---

## What You Must Do

### Part 1 — Predict the Impact (before writing any code)

Open your app. Open `TEST-TARGETS.md`. Do not write any code yet.

Answer these questions in writing:

1. What change does this requirement make to the `Post` type?
2. Which files in your app will need to change?
3. Which boundaries from your lesson 9 map does this change cross?
4. Run your test suite right now. Which tests break immediately?
5. Which tests do you expect to break after you implement the change?

Write your answers down. These are your predictions. You will compare them against what actually happened.

---

### Part 2 — Implement the Change

Make the smallest change that satisfies the requirement.

1. Update the `Post` type
2. Update the store — when a post is advanced to `published`, record the published date
3. Update the preview panel — show `publishedAt` for published posts, `updatedAt` for others
4. Update your test suite — fix any tests that broke, add at least one new test for the new behavior

No library changes are required. This change lives entirely in your app.

---

### Part 3 — Reflect

After implementing, compare what happened against your predictions.

Write `REFLECTION.md` in your app repo. Answer these six questions:

**On the change:**
1. What did you predict would need to change? What actually needed to change? Where were you wrong?
2. Which part of your app absorbed this change most cleanly — you made the change and it just worked? What made that possible?
3. Which part required more rework than you expected? What design decision caused that?

**On your tests:**
4. How many tests broke when you first ran your suite? What did that tell you?
5. Did any test catch a bug you would not have found otherwise? Describe it specifically.

**On the system:**
6. If this requirement had arrived on week 2 instead of week 8, would you have built anything differently? What?

Be specific. Name the files. Paste the code that surprised you. Vague answers ("it went well") are not useful — to you or to anyone reading this.

---

### Part 4 — Present

Prepare a 3-minute presentation for the last class.

Structure it around the gap between prediction and reality:

1. **What I predicted** — which files, which tests, how much work
2. **What actually happened** — where you were right and where you were wrong
3. **One thing that worked cleanly** — and why you think it did
4. **One thing that didn't** — and what you would do differently

You do not need slides. Use your code. Show the change.

---

## Deliverables

Submit via Gradescope:

### PostKit App Repository
- [ ] R7 implemented correctly
- [ ] Test suite updated — broken tests fixed, at least one new test added
- [ ] `REFLECTION.md` with all six questions answered specifically
- [ ] Written impact analysis from Part 1 (can be included in REFLECTION.md)

---

## Grading Rubric

| Criteria | Points |
|---|---:|
| R7 implemented correctly | 20 |
| Test suite updated with new test | 20 |
| Impact analysis completed before implementation | 15 |
| Reflection answers are specific (names files, shows code, identifies surprises) | 35 |
| Presentation delivered | 10 |

---

## The Point of This Assignment

You have spent seven weeks building a system — first individual functions, then libraries, then an app that composes them.

This assignment asks one question: **now that you have built it, do you understand it?**

A developer who can predict where a change will land, implement it cleanly, and articulate what the experience revealed understands their system. That understanding is what makes the next change easier.

The gap between your prediction and what actually happened is not a mistake. It is information. The goal of the reflection is to make that information explicit.
