# Week 2 — PostKit Library Implementation & Testing

## Overview

This week you will **implement your library** and **write unit tests** based on your **approved API** from Week 1.

Your goal is to produce a **working, tested, and reliable library** that matches your documented behavior.

---

## Prerequisite

You must have **instructor approval** for your API from Week 1 before starting implementation.

If your API is not approved, stop and fix it first.

---

## Your Goal

By the end of this week, your repository should contain:

- complete implementation of all exports
- a passing test suite
- a README that accurately reflects real behavior

---

## What You Must Do

You must:

1. Implement all exported functions/components from your approved API
2. Write unit tests for each export
3. Verify that behavior matches your README and spec
4. Fix any bugs revealed by your tests

---

## Testing Requirements

For **each exported function**, you must include:

- at least **2 normal test cases**
- at least **1 edge case**
- **meaningful assertions** (tests must actually verify behavior)

Where appropriate, include:
- invalid input tests

### Your tests must:

- **fail when behavior is incorrect**
- **pass when behavior is correct**

If your tests never fail, they are not useful.

---

## Important Workflow (Follow This)

### Step 1 — Implement one function
Write a first working version.

### Step 2 — Write tests
Describe expected behavior clearly.

### Step 3 — Run tests

```bash
npm test
```

### Step 4 — Fix bugs
Use failing tests to guide fixes.

### Step 5 — Repeat
Move to the next function.

---

## Expectations for Code Quality

Your code should be:

- readable and well-organized
- consistent with your API design
- correctly typed with TypeScript
- free of unnecessary complexity

Avoid:

- copying code from the internet
- overengineering simple functions
- ignoring edge cases

---

## README Updates (Required)

Your `README.md` must now reflect the **real implementation**.

Update it to include:

- accurate examples (must match actual behavior)
- any edge cases discovered during testing
- any changes made from your original API design

---

## Deliverable

Your repository must include:

- complete implementation of your library
- passing test suite (`npm test`)
- updated README with correct examples

---

## Grading Rubric (Week 2)

| Criteria | Points |
|---|---:|
| Correct implementation | 40 |
| Test quality and coverage | 30 |
| Alignment with approved API | 15 |
| Code clarity and TypeScript usage | 10 |
| Completeness | 5 |

---

## Definition of Done

You are finished when:

- all required exports are implemented
- your tests clearly describe behavior
- your tests fail when behavior is incorrect (at some point)
- all tests pass after fixes
- your README matches your implementation

---

## What You Are NOT Doing This Week

Do **not**:

- publish to npm yet
- start building the PostKit app

Your code will be reviewed before publishing.

---

## Common Mistakes

- writing tests that always pass
- writing only one test per function
- ignoring edge cases
- not updating README after implementation
- fixing code without writing tests first

---

## Final Reminder

This week is about turning your design into **working, tested code**.

Focus on:

> correctness, clarity, and confidence in your implementation.

---

## Resources 

- [PostKit Libs Spec](./PostKit-libs.md)
- [PostKit Project Spec](./PostKit.md)