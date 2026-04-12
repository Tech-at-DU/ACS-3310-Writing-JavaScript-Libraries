# Lesson 6 — Building PostKit: Day One

## Overview

Your packages are published. Today you start building the PostKit application.

This session is a lab, but not a free-for-all. Before writing a single line of app code, you will spend time understanding the tools you are about to use — the packages your classmates built. You will install them, test them against their documentation, and surface any issues while the authors are in the room.

You will also talk about how to use AI effectively when integrating libraries it has never seen.

By the end of class you should have a running React app with at least one PostKit feature working end to end.

---

## Learning Goals

By the end of this lesson you should be able to:

- Install and verify all PostKit packages
- Identify gaps between a package's documentation and its actual behavior
- Write effective AI prompts for integrating unfamiliar libraries
- Scaffold a PostKit application with a clear structure
- Integrate at least one library into a working feature

---

## ⏱️ Part 1 — The Mindset Shift (15 min)

### Lecture

For the last three weeks you have been an expert in one thing: your own library. You know every function, every edge case, every design decision.

That changes today.

Today you become a **consumer**. You are installing nine libraries built by other people, reading documentation you did not write, and making those libraries work together in an application.

This is how most real development works. You spend more time integrating and composing than you do inventing.

**What changes as a consumer:**

- You read the README before writing any code
- You work with what the library does, not what you wish it did
- When something is broken or unclear, you document it and work around it — you do not rewrite it
- If a package has a bug, you open an issue. You do not copy the source code into your project

**What does not change:**

- You are still responsible for the quality of the code you write
- You are still debugging, reasoning, and making decisions
- The app has to work, regardless of what problems you find in the libraries

The PostKit spec says it directly: if a library has issues, document the problem and work around it carefully. That is not a concession — that is the job.

---

## ⏱️ Part 2 — Install and Test the Packages (30 min)

Before building anything, you need to know what you are working with.

### Step 1 — Collect all package names (5 min)

As a class, compile a list of all published PostKit packages with their npm names. Each student should post their package name in the class channel or shared document.

### Step 2 — Install everything (5 min)

Create your PostKit app project (or use a starter if provided):

```bash
npm create vite@latest postkit-app -- --template react-ts
cd postkit-app
npm install
```

Then install all the PostKit packages:

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
- Return types that do not match what the README says
- Behavior that differs from the description
- Missing exports

Use this table to track what you find:

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
2. Tell the package author now — they are in the room
3. Open a GitHub issue on their repository (see below)
4. If it is blocking, ask the author when a fix will be published
5. In the meantime, plan your workaround

This is not about blame. Every package will have rough edges. The goal is to surface them before they slow you down silently.

---

### Opening a GitHub Issue

When you find a problem with a package, open an issue on the author's GitHub repository. Do not modify their code. Do not copy their source into your project. An issue is the correct way to communicate a problem.

A useful issue has three parts:

**1. What you expected**
**2. What actually happened**
**3. How to reproduce it**

Example:

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

**PRs from consumers:** If the fix is a small, obvious change — a typo in the README, a single missing edge case — you may submit a PR. Ask the author first. Do not send unsolicited PRs that change behavior or API design.

---

## ⏱️ Part 3 — Using AI to Integrate Unfamiliar Libraries (15 min)

### Lecture

AI tools are useful during app development. They are also easy to misuse when working with libraries they have never seen.

**The core problem:** AI was trained on public code and documentation. Your classmates' PostKit libraries were not in that training data. If you ask AI to "use the slug library to generate a slug," it will invent a plausible-sounding API that may have nothing to do with what your classmate actually built.

This will produce code that looks correct and fails at runtime.

**How to fix it: give AI the documentation it needs.**

When asking AI to help integrate a library, include the README content in your prompt. The more specific you are about the actual API, the more useful the output will be.

**Prompt structure that works:**

```
I am building a React app called PostKit.

I am using a library called [package-name]. Here is its documentation:

[paste the relevant README section]

I need to [specific task — e.g., "generate a slug when the user types a title 
and display it below the input field"].

Please write the React component code to do this.
```

**What AI is good at in this context:**
- Scaffolding component structure and wiring
- Managing local state for form inputs
- Writing the plumbing around library calls you specify

**Where AI will still be wrong:**
- Exact function signatures (verify against the README)
- Edge case handling specific to your classmate's implementation
- How two libraries compose together — that requires your judgment

**The rule:** treat AI output as a first draft. Read it, verify every library call against the actual documentation, test it, and fix what is wrong. The AI use note in your PR should document exactly this.

---

## ⏱️ Part 4 — Prompt Writing Practice (20 min)

Work in pairs.

Pick one PostKit feature from the spec — something small and concrete. For example: generating and displaying a slug when a user types a post title.

Write a prompt to ask AI to implement it. Your prompt must:

1. Describe what PostKit is and what you are building
2. Include the relevant library's documentation (copy from the README)
3. State the specific task clearly
4. Mention the tech stack (React + TypeScript)

Submit the prompt to an AI tool, review the output, and answer:

1. Did the AI use the library correctly?
2. What did it get wrong or invent?
3. What did you have to fix or verify manually?

Be ready to share one finding with the class.

---

## ⏱️ Part 5 — App Structure Overview (15 min)

### Lecture

The PostKit spec describes features, not file structure. How you organize the app is your decision — but here is a reasonable starting point.

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
      posts.ts            ← shared post utilities (create, update, etc.)
    types.ts              ← re-export shared Post types
    App.tsx
    main.tsx
```

**Suggested order to build features:**

1. Get a hardcoded list of posts rendering — proves your imports work
2. Add storage — posts persist between reloads
3. Add the post editor — create and save real posts
4. Add filter and sort — make the list controllable
5. Add search — connect the search library
6. Add post preview — slug, excerpt, reading time, date formatting

Start simple. One feature working end to end is better than five features broken.

**On the shared `Post` type:**

All libraries that operate on posts use the same `Post` type. Import it from one place and use it everywhere. Do not define your own version of it in the app.

---

## ⏱️ Part 6 — Lab: Scaffold and First Integration (55 min)

Work on your PostKit app.

### Goals for today

By the end of class, you should have:

- [ ] PostKit app created and running locally
- [ ] All PostKit packages installed
- [ ] At least one package integrated and working in the UI
- [ ] Post data rendering on screen (even if hardcoded)

### Where to start

1. Create the app and install packages (if not done in Part 2)
2. Define or import the `Post` type
3. Create a hardcoded array of two or three sample posts
4. Render them in a list showing title, status, and tags
5. Then connect one library — reading time, date formatting, or tags are good first choices because they are self-contained

### When you get stuck

1. Read the library's README again — carefully
2. Check if the issue is in the docs vs. how you are calling it
3. Ask the library author — they are in the room
4. Use AI with the documentation in your prompt
5. If still blocked, document the issue and move to a different feature

---

## ⏱️ Wrap-up (10 min)

Share with the class:

1. What is working in your app so far?
2. What was the most useful thing you found during the package testing?
3. Did you find any issues with a library that the author needs to know about?

---

## Reflection

Answer the following questions:

1. What is the most important thing to do before writing app code that uses an unfamiliar library?
2. Why does AI generate incorrect library usage, and how do you compensate for that?
3. What is the difference between a bug in a library and a gap in its documentation? Does that change how you respond?
4. Describe the first feature you got working. What libraries did it use?
