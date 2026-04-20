# PostKit — Updated Requirements

## Overview

Real software changes after it ships.

Requirements evolve, product needs shift, and systems that seemed complete need new capabilities. As a developer, your job is not just to build — it is to adapt.

This document describes updated requirements for PostKit. Your task is to analyze the changes, determine what they mean for your library and your app, and implement them.

There are no TypeScript types provided here. Reading the requirements, understanding their implications, and making the right implementation decisions is part of the assignment.

---

## What Has Changed and Why

PostKit users have asked for three things:

**1. They want to retire posts without deleting them.**
Writers sometimes finish with a post but do not want to lose it. They need a way to move posts out of the active workflow while keeping them accessible.

**2. They want to know when a post was published.**
The current display shows when a post was last updated. For published posts, users care more about when it was published — that is the date that matters for their readers.

**3. They want a consistent, reusable way to display post summaries.**
Right now the app assembles post metadata — slug, excerpt, reading time, tags, status — in different ways in different places. Users notice inconsistencies. The team needs a standard summary representation that all parts of the app can use.

---

## Updated Requirements

### R2 — Filter Posts *(updated)*

In addition to filtering by status and tag, users must be able to:
- show posts that have been retired from the active workflow
- exclude retired posts from the default view — they should not appear unless explicitly requested

---

### R5 — Create and Edit Posts *(updated)*

Posts that have been retired from the active workflow must not be editable. Users who open a retired post should be able to read it but not modify it.

---

### R6 — Understand Post URLs *(no change)*

No change to slug behavior. Verify your implementation still works correctly with the updated post data shape.

---

### R7 — Preview Post Metadata *(updated)*

For posts that have been published, the preview must show when the post was published — not when it was last edited. For posts that have not yet been published, continue showing the last updated date.

---

### R11 — Post Summaries *(new)*

The app must produce a consistent summary representation for each post. This summary is what the list view, search results, and any other view uses to display a post without access to the full post body.

A post summary must include enough information to display the post in a list: a readable identifier, a short preview of the content, an estimate of reading time, the post's tags, and its current status.

Users must see consistent post summaries across all views. If the summary changes in one place it must change everywhere.

**Implementation note:** You must define a `PostSummary` type and a function that produces a `PostSummary` from a `Post`. This function will compose multiple PostKit libraries. Where that function lives — in the app, or in a shared utility — is your decision. Be prepared to explain it.

---

## What You Must Do

### Part 1 — Analyze the Impact

Before writing any code, map the changes to your system.

For each updated requirement, answer:

1. Which parts of your app are affected?
2. Which PostKit libraries need to change?
3. Where does your architecture handle this cleanly? Where does it not?
4. What do your existing tests tell you? Which ones break?

Write this analysis down. You will submit it as part of the assignment.

---

### Part 2 — Update Your Library

Determine which requirements affect your library's responsibilities.

For each change to your library:

1. Update the implementation
2. Update or add tests — your test suite should fail before the fix and pass after
3. Update your README to reflect the new behavior
4. Publish a new version to npm with the correct semver bump
5. Explain your semver choice in the PR description

**Choosing the right version bump is part of the assignment.** Think about whether existing callers of your library will break.

---

### Part 3 — Update the PostKit App

Implement all updated and new requirements in your app.

In addition to the requirement changes, you must implement R11:

- Define a `PostSummary` type
- Write a function that produces a `PostSummary` from a `Post` using the appropriate PostKit libraries
- Update the list view and any other relevant views to use `PostSummary` consistently

If a classmate's library has not been updated to support these requirements yet:

- Document the gap with a comment in your code
- Implement a temporary workaround where possible
- Open a GitHub issue on their repository

---

### Part 4 — Test Suite

Run your test suite before making any changes.

- Which tests break immediately? What do they tell you?
- Which tests still pass but should probably be updated?
- Write at least two new tests that cover the new requirements

Your test suite should give you confidence that the requirements are met after your changes.

---

## Deliverables

### Library Repository

- updated implementation covering affected requirements
- updated and passing test suite
- updated README with accurate examples and install instructions
- new version published to npm
- PR description explaining what changed and which semver bump was chosen and why

### PostKit App Repository

- all updated requirements implemented
- R11 (`PostSummary`) implemented and used consistently
- test suite updated — failing tests fixed, new tests added
- any library gaps documented with comments and GitHub issue links
- `REFLECTION.md` file (see below)

---

## Reflection (Required)

Create a `REFLECTION.md` file in your app repository. Answer these questions honestly:

**On the changes:**
1. Which requirement change was hardest to implement? Why?
2. Which part of your app absorbed the change most cleanly? What made it clean?
3. Which part required the most rework? What design decision caused that?

**On your tests:**
4. How many tests broke when you first ran your suite against the new requirements?
5. Which test caught a real bug that you would not have found otherwise?
6. Was there a failure that your tests missed? What would you add now?

**On AI:**
7. How did you use AI during this assignment? What prompts were most effective?
8. What did AI get wrong, and how did you catch it?
9. Did your prompt quality improve from earlier in the course? In what way?

**On the system:**
10. If PostKit requirements changed again in six months, what would you do differently in your architecture?

---

## Grading Rubric

| Criteria | Points |
|---|---:|
| Correct library update with passing tests | 20 |
| Correct semver bump with written rationale | 10 |
| Updated README reflects new behavior | 10 |
| All updated app requirements implemented | 20 |
| R11 PostSummary implemented consistently | 15 |
| Test suite updated with new tests | 10 |
| Workarounds documented and issues filed | 5 |
| Reflection quality and honesty | 10 |

---

## The Point of This Assignment

This assignment is not testing whether you can implement three features.

It is testing whether you built something that can change.

A system designed around clear requirements, clean boundaries, and honest tests absorbs change in predictable places. A system that was assembled quickly without that structure makes every change unpredictable.

You will know which kind you built when your test suite runs for the first time.

> The cost of a poor design is paid every time the system changes.
