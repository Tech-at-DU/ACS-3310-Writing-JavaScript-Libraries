# Week 3 — PostKit Library Publishing & Integration Prep

## Overview

This week you will prepare your library for **real-world use** and make it available to your classmates.

You will:

- fix issues from Week 2
- add a build step for your library
- publish your package to npm
- verify that others can install and use it

This is the transition from **local project → reusable package**.

---

## Prerequisite

You must have completed Week 2:

- all exports implemented
- tests written and passing
- README updated and accurate

If your tests are failing, do not publish yet.

---

## Your Goal

By the end of this week, you will have:

- a published npm package
- a working build output
- clear install + usage instructions
- confirmation that another student can use your package

---

## What You Must Do

### 1) Fix Issues from Week 2

- address any bugs found in testing
- ensure behavior matches your README
- simplify or clarify confusing API areas if needed (update README accordingly)

---

### 2) Add a Build Step

Your package must produce a distributable build.

Minimum requirement:

- compiled output in `dist/`
- JavaScript output (ESM or CJS)
- TypeScript declaration file(s)

Recommended files:

- `dist/index.js`
- `dist/index.d.ts`

You may use a provided starter config (e.g., Rollup) if available.

---

### 3) Prepare Package Metadata

Update your `package.json`:

- `name` (must be unique)
- `version` (start at `1.0.0`)
- `main` and/or `module`
- `types` (points to `.d.ts` file)
- `files` (include only what should be published, e.g., `dist`)

Add a `.npmignore` or use `files` to avoid publishing source and config you don’t need.

---

### 4) Publish to npm

Run:

```bash
npm publish
```

If you encounter issues:

- check npm login (`npm whoami`)
- ensure package name is unique
- ensure build output exists before publishing

---

### 5) Verify Installation

In a separate test project (or a fresh folder), verify:

```bash
npm install <your-package-name>
```

Then import and use your package.

If it fails to install or import, your package is not complete.

---

### 6) Cross-Test with a Classmate

Pair with another student and:

- install each other’s package
- run a small usage example
- report any issues

You must fix any blocking issues found.

---

## README Requirements (Updated)

Your `README.md` must now include:

- package description
- install instructions
- usage examples (must work as written)
- list of exports
- notes on edge cases and behavior

Your README should be sufficient for another student to use your package **without asking you questions**.

---

## Deliverable

Your submission must include:

- published npm package
- working install via `npm install`
- successful import and usage
- build output in `dist/`
- updated README with install + usage

---

## Grading Rubric (Week 3)

| Criteria | Points |
|---|---:|
| Successful npm publish | 25 |
| Install + import works correctly | 25 |
| Build output (JS + types) is correct | 20 |
| Documentation quality (README) | 20 |
| Cross-testing and issue resolution | 10 |

---

## Definition of Done

You are finished when:

- your package is published to npm
- another student can install and use it
- your build output is correct and minimal
- your README is accurate and complete
- no blocking issues remain

---

## What You Are NOT Doing This Week

Do **not**:

- start building the PostKit app yet (unless instructed)
- change your API without updating documentation

This week is about making your library **usable by others**.

---

## Common Mistakes

- publishing without a build step
- missing or incorrect `types` field
- exporting the wrong entry file
- broken import paths after install
- README examples that don’t actually work
- forgetting to test in a fresh project

---

## Final Reminder

A published package is only useful if others can use it easily.

Focus on:

> reliability, clarity, and real-world usability.
