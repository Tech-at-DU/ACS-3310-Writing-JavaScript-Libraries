# Week 1 — PostKit Library API Design

## Overview

This week you will design the API for your assigned **PostKit** library.

You are **not** writing implementation code yet.

Your job this week is to design a clear, usable, well-documented API that another student could understand and use.

Your assigned library spec is described in:

```text
PostKit-libs.md
```

Read that file carefully before you begin.

---

## Your Goal

By the end of this week, you should have an approved API design for your library.

That means you will define:

- what your package exports
- what each function or component should do
- what inputs it accepts
- what output it returns
- how another developer should use it

---

## What You Must Do

You must:

1. Read your assigned package spec in `PostKit-libs.md`
2. Design the exported API for your package
3. Document the expected behavior of each export
4. Provide example usage in code (hypothetical)
5. Identify important edge cases
6. Get peer feedback and instructor approval before moving to Week 2

---

## Important Constraint

The package spec defines the **required behavior**.

You are responsible for designing the **API**.

That means you will choose:

- function names
- parameter names
- exact function signatures
- return types (when the spec allows flexibility)

Your API should be:

- clear
- predictable
- easy to understand
- realistic for another developer to use

---

## Deliverable

Create or update a `README.md` in your library repository.

Your `README.md` must include the following sections.

### 1. Package Name
Give your package a clear name.

### 2. Purpose
Write 1–2 sentences explaining what your package does.

The spec provides a short description. You will put this in your own words. What you write will be seen by other developers. 

### 3. Exports
List all exported functions or components.

For each export, include:
- the name
- the input(s)
- the output
- a short description of behavior

### 4. Example Usage
Include example code (hypothical) showing how your package should be used.

### 5. Edge Cases
Describe any important edge cases or special behaviors.

### 6. Notes / Design Decisions
Briefly explain any important API choices you made.

Examples:
- Why did you choose these function names?
- Why does a function return a boolean instead of a result object?
- Why did you separate one task into two functions?

---

## What You Are NOT Doing This Week

Do **not**:

- implement the library logic
- write the full test suite
- publish to npm
- move on without approval

This week is about **design**, not implementation.

---

## Expectations for API Design

Your API should satisfy all of the following:

- matches your assigned PostKit library spec
- includes **3 to 7 exports**
- uses TypeScript-friendly design
- is consistent and easy to read
- is documented clearly enough that another developer could use it

Remember: another student will eventually depend on your package in the final PostKit app.

---

## Suggested Workflow

### Step 1 — Read the spec
Read your assigned package in `PostKit-libs.md`.

### Step 2 — Sketch the API
Draft your exports and example usage.

### Step 3 — Review your own design
Ask:

- Are the names clear?
- Are the inputs and outputs easy to understand?
- Does the API match the required behavior?
- Would another developer know how to use this package?

### Step 4 — Write the README
Document the API clearly.

### Step 5 — Request peer reviews via PR and revise based on feedback

### Step 6 — Get approval
You must get instructor approval before starting Week 2.

---

## Peer Review & Approval Process (Required)

You will propose your API via a Pull Request (PR) in your own repository and review two assigned peers. Follow the steps below exactly.

---

### Step 1 — Create Your API Proposal PR

- Create a branch: `api-proposal`
- Add or update your `README.md`
- Open a Pull Request titled:

```text
API Proposal — <package-name>
```

**How to do this:**

1. Open your repository on GitHub
2. Create a new branch named `api-proposal`
3. Add or update your `README.md`
4. Commit your changes to the `api-proposal` branch
5. Click "Compare & pull request"
6. Open a Pull Request from `api-proposal` → `main`

⚠️ Do NOT commit your API directly to `main`

---

### Step 2 — Assigned Peer Reviews

You must review **exactly two assigned libraries**.

Assignment rule:
- If your library is **N**, review **N+1** and **N+2**
- Wrap around at the end:
  - 9 → review 10 and 1
  - 10 → review 1 and 2

**How to find and review your assigned repos:**

1. Locate the class repo list (provided in class / Classroom)
2. Open each assigned repository on GitHub
3. Click the **Pull Requests** tab
4. Open the PR titled `API Proposal — <package-name>`
5. Click **Files changed**
6. Add comments directly on lines of the README
7. Click **Review changes**
8. Submit your review (Comment, Approve, or Request changes)

Also, request reviewers on your own PR:
- Add your assigned reviewers (N+1 and N+2) in the **Reviewers** section

---

### Step 3 — What to Look For in Reviews

For each review, you must leave meaningful feedback.

Your review must include:

- at least **3 comments**
- at least **1 suggested improvement**
- at least **1 question**

Focus on:

- clarity of function names
- inputs and outputs
- API usability
- completeness of documentation
- edge cases

---

### Step 4 — Revise Your API

- Respond to all comments
- Update your README
- Push changes to your PR

---

### Step 5 — Approval Requirements

Your API must receive:

- **2 peer approvals**
- **instructor approval**

Approval means:

- reviewers understand how to use your API
- nothing important is unclear or ambiguous

If your reviewers are confused, your API is not ready.

You may not begin Week 2 until your API is approved.

---

### Important

- Reviews must be thoughtful and specific
- "Looks good" is not acceptable feedback
- Approval means you believe the API is clear and usable

---

## Grading Rubric (Week 1)

| Criteria | Points |
|---|---:|
| Completeness of API design | 30 |
| Clarity of documentation | 25 |
| Alignment with assigned spec | 25 |
| Quality of examples | 10 |
| Instructor approval and revision effort | 10 |

---

## Definition of Done

You are finished with Week 1 when:

- your API is clearly defined
- your `README.md` is complete
- your package matches the required spec
- your examples make sense
- your instructor has approved your API

---

## Final Reminder

A good library does not start with code.

It starts with a clear API.

This week, focus on designing something that is:

> easy to understand, easy to use, and ready to build next week.

---

## Resources 

- [PostKit Libs Spec](./PostKit-libs.md)
- [PostKit Project Spec](./PostKit.md)