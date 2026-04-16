# Lesson 6 — Building PostKit: Day One

## Overview

Your packages are published. Today you start building the PostKit application.

This session is structured as a lab, but not a free-for-all. You will begin by reading the project requirements and AI policy together as a class. Then you will install and test the packages your classmates built before writing a single line of app code. By the end of class you should have a running app with at least one feature working end to end.

**Required reading before starting any code:**

- [PostKit Requirements](./PostKit.md)
- [AI Use Policy](./ai-policy.md)

---

## Learning Goals

By the end of this lesson you should be able to:

- Read and reason from a requirements document
- Install and verify all PostKit packages
- Identify and report problems in a package using GitHub issues
- Use AI effectively to integrate an unfamiliar library
- Scaffold a PostKit application with a clear structure
- Integrate at least one library into a working feature

---

## ⏱️ Part 1 — Requirements, Policy, and Missing Packages (25 min)

### The Requirements Document (10 min)

Open [PostKit.md](./PostKit.md) and read it as a class.

The PostKit requirements describe what users need — not how to build it. This is an important distinction. The document tells you what problems to solve. You decide how to solve them.

As you read, notice:

- Requirements describe user needs, not implementation steps
- The acceptance criteria at the bottom are what you are building toward
- Technical constraints (React, TypeScript, class libraries) are fixed — everything else is your decision

When you sit down to implement any feature, start by finding its requirement. Understand what the user needs before writing any code.

### The AI Policy (5 min)

Open [ai-policy.md](./ai-policy.md) and read the section **"How to Use AI Well on PostKit"**.

The short version: use AI to implement one requirement at a time, with the relevant library documentation in your prompt. Do not ask AI for a complete solution from the full spec. The app will change later in the term — build something you understand.

Your PR descriptions must include an AI use note as described in the policy. This is required regardless of whether you used AI.

### Missing Packages — Group Discussion (10 min)

Not all packages were completed. This is a real problem that needs a real solution.

This is also not unusual. In professional projects, dependencies fall through — a vendor goes dark, a package gets abandoned, a team member is unavailable. Work does not stop. The team finds a path forward.

Missing Packages: 
- Validation Library Sunil
- UI Component Library Ashley
-  Storage Library David (Working on it, maybe Friday?)

As a class, identify which packages are missing and discuss the options:

**Option A — Volunteer implementation**
Another student implements a minimal version covering the requirements. Simpler than the original spec, but functional enough to unblock the app.

**Option B — Stub with AI as a class**
Use the library spec from [PostKit-libs.md](./PostKit-libs.md) to write a prompt together. Generate a minimal implementation, review it as a class, publish it. This is a live example of requirements-driven AI use.

**Option C — Implement inline**
Students who need the missing functionality implement it directly in their app, in a clearly labeled module, with a comment noting it should be a separate library. This keeps the app moving while documenting the gap.

The instructor will facilitate this decision. Whichever path is chosen, the goal is the same: no one is blocked.

---

## ⏱️ Part 2 — Install and Test the Packages (30 min)

Before building anything, you need to know what you are working with.

### Step 1 — Collect all package names (5 min)

As a class, compile the list of all published PostKit packages with their npm names. Each student should share their package name.

### Step 2 — Create the app and install everything (5 min)

```bash
npm create vite@latest postkit-app -- --template react-ts
cd postkit-app
npm install
```

Then install all PostKit packages:

```bash
npm install <slug-package> <excerpt-package> <reading-time-package> \
  <tag-utility-package> <validation-package> <filter-sort-package> \
  <search-package> <date-display-package> <storage-package> \
  <ui-components-package>
```

### Step 3 — Test each package against its README (20 min)

For each package, write a small test script or use the browser console to verify the documented examples actually work.

You are looking for:

- Functions that throw on inputs the README shows as valid
- Return types that do not match the documentation
- Behavior that differs from the description
- Missing exports

Track what you find:

| Package | Installs? | README example works? | Issues found |
|---|---|---|---|
| slug | | | |
| excerpt | | | |
| reading-time | | | |
| tag-utility | | | |
| validation | | | |
| filter-sort | | | |
| search | | | |
| date-display | | | |
| storage | | | |
| ui-components | | | |

**If you find an issue:**

1. Note it in your table
2. Tell the package author — they are in the room
3. Open a GitHub issue on their repository
4. If it is blocking, ask the author when a fix will be published
5. Plan your workaround

---

### Opening a GitHub Issue

An issue is the correct way to report a problem with someone else's package. Do not modify their code directly.

A useful issue has three parts: **what you expected**, **what actually happened**, **how to reproduce it**.

```
Title: filterByStatus returns empty array for all inputs

**Expected behavior**
filterByStatus(posts, 'draft') should return only posts with status 'draft'

**Actual behavior**
Returns an empty array regardless of input

**To reproduce**
const posts = [{ id: '1', status: 'draft', ... }, { id: '2', status: 'published', ... }]
filterByStatus(posts, 'draft') // []

**Package version**
1.0.0
```

A vague issue ("it doesn't work") gives the author nothing to act on. A specific issue with reproduction steps can be fixed in minutes.

**Library authors are expected to respond to issues within one class session.** If a blocking issue is filed against your package, fixing it is your first priority.

---

## ⏱️ Part 3 — App Structure (15 min)

### Lecture

The PostKit requirements describe what to build, not how to organize it. Here is a reasonable starting structure:

```
postkit-app/
  src/
    components/
      PostList.tsx        ← list of posts with filter/sort controls
      PostEditor.tsx      ← create and edit posts
      PostPreview.tsx     ← slug, excerpt, reading time, status
      SearchBar.tsx       ← search input
    lib/
      storage.ts          ← wrapper around the storage package
      posts.ts            ← post utilities (create, update, generate id)
    types.ts              ← import and re-export the shared Post type
    App.tsx
    main.tsx
```

**Suggested build order:**

Start with the simplest thing that shows something on screen, then layer in complexity.

1. Hardcoded posts rendering — proves imports and types work
2. Storage — posts persist between reloads
3. Post editor — create and save real posts
4. Filter and sort — make the list controllable
5. Search — connect the search library
6. Post preview — slug, excerpt, reading time, date

One feature working end to end is better than five features half-built.

**On the shared `Post` type:**

The `Post` and `PostStatus` types are defined in [PostKit.md](./PostKit.md) under Technical Constraints. Copy them into `types.ts` in your app and import from there everywhere. Do not define your own version.

**On working around missing packages:**

If a library you need is not available, implement the functionality in `lib/` with a clear comment:

```ts
// TODO: replace with <package-name> when available
// Tracking issue: <link to GitHub issue>
export function createSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}
```

This keeps your app moving and documents the gap honestly.

---

## ⏱️ Part 4 — Prompt Writing Practice (20 min)

Work in pairs.

Pick one requirement from [PostKit.md](./PostKit.md) — something small and concrete. For example, R6 (slug generation) or R7 (post preview metadata).

Write a prompt to ask AI to implement it. Your prompt must:

1. State the requirement you are solving (copy it from PostKit.md)
2. Include the relevant library's README documentation
3. Describe the specific component or function you need
4. Specify React and TypeScript

Submit the prompt to an AI tool, review the output, then answer:

1. Did the AI use the library API correctly?
2. What did it invent or get wrong?
3. What did you have to verify or fix?

Be ready to share one finding with the class.

---

## ⏱️ Part 5 — Lab: Scaffold and First Integration (65 min)

Work on your PostKit app.

### Goals for today

- [ ] App is created and runs locally
- [ ] All available PostKit packages are installed
- [ ] The `Post` type is defined and used
- [ ] At least two or three posts render on screen
- [ ] At least one library is integrated and working in the UI
- [ ] Any missing packages are stubbed or worked around with a comment

### Where to start

Pick one requirement. Understand it. Identify which library it uses. Read that library's README. Then implement.

When you get stuck:

1. Re-read the library README carefully
2. Check whether the issue is your call vs. the library's behavior
3. Ask the library author — they are in the room
4. Use AI with the README in your prompt (see [AI Use Policy](./ai-policy.md))
5. If still blocked: stub it, document the gap, move to a different requirement

---

## ⏱️ Wrap-up (10 min)

Share with the class:

1. Which requirement did you implement first, and why?
2. Did you find any issues with a library that others should know about?
3. What was harder than expected? What was easier?

---

## Reflection

1. What is the difference between a requirement and a technical spec? Why does that distinction matter when building an app?
2. What is the most important thing to do before writing code that uses an unfamiliar library?
3. Describe how you would use AI to implement one specific PostKit requirement. What would you include in the prompt?
4. What did you get working today? Which requirement does it satisfy?
