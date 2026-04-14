# Lesson 5 — Publishing Your Library

## Overview

Today you will prepare your PostKit library for publication to npm.

Before you publish, you will review your API and documentation with your classmates. After that, a short set of lectures will cover the tools and process you need: npm, `package.json`, semantic versioning, and how to build and package a TypeScript library correctly.

By the end of class, your library should be published and installable.

---

## Learning Goals

By the end of this lesson you should be able to:

- Evaluate your own API design and documentation for clarity
- Explain the purpose of `package.json` and its key fields
- Apply semantic versioning correctly
- Build a TypeScript library for distribution
- Configure which files are published to npm
- Publish a package to npm

---

## ⏱️ Part 1 — Your API Is a Contract (20 min)

### Lecture

When you publish a library, something changes.

Before publishing, your code is just a project. You can rename functions, change parameters, break things — no one else is affected.

After publishing, your code is a **contract**.

Developers who install your package write code that depends on your function names, parameter order, and return types. If you change any of those things in a future version, their code breaks. If you publish something that throws on common inputs, you block their work.

This is not theoretical. After today, your classmates will install your package and build an application with it. They will not be asking you questions — they will be reading your README and calling your functions. If your documentation is wrong or your behavior is surprising, they will lose time.

**A good library API is:**

- **Predictable** — functions do what their names suggest
- **Consistent** — similar functions work similarly
- **Honest** — documented behavior matches actual behavior
- **Forgiving** — edge cases are handled gracefully, not silently crashed

---

## ⏱️ Part 2 — Review and Revise (40 min)

### Step 1 — Self-review (15 min)

Read your own README as if you are a developer who has never seen your library.

Ask yourself:

1. Can I understand what each function does without looking at the code?
2. Are the examples accurate — would they actually work?
3. Are edge cases documented?
4. Is there anything a classmate might misuse because it is unclear?

Also check your source code for **[JSDoc comments](https://jsdoc.app)**. Every exported function should have one.

JSDoc comments appear as tooltips in the editor when another developer calls your function. They are the difference between documentation someone has to look up and documentation that appears as they type.

Example:

```ts
/**
 * Converts a post title into a URL-safe slug.
 * @param title - The post title to convert
 * @returns A lowercase, hyphen-separated slug
 * @example
 * createSlug("Hello World") // "hello-world"
 * createSlug("  Extra  Spaces  ") // "extra-spaces"
 */
export function createSlug(title: string): string {
```

If your functions are missing JSDoc, add them now before publishing.

Fix anything you find.

### Step 2 — Peer review with your neighbors (25 min)

Find the students whose work interacts with yours.

Look at [PostKit-libs.md](./PostKit-libs.md) to identify who you depend on and who depends on you.

Exchange READMEs and ask:

1. If I called your functions from the PostKit app, would I know exactly what to pass and what to expect back?
2. Is there anything in your API that would be surprising or inconsistent?
3. Do any of your return types conflict with how another library will use them?

Give specific feedback. "Looks good" is not useful. "Your `filterByTag` function — does it return an empty array or `null` when nothing matches?" is useful.

Make any final updates before moving on.

---

## ⏱️ Part 3 — What Is npm? (20 min)

### Lecture

**npm** is the package registry used to publish and install JavaScript libraries.

When you run:

```
npm install date-fns
```

npm downloads the `date-fns` package from the registry and adds it to your project.

When you run:

```
npm publish
```

npm uploads your package to the registry and makes it available to anyone.

---

### The `package.json` File

Every npm package is described by a `package.json` file. This file tells npm — and developers — what your package is and how to use it.

Key fields:

```json
{
  "name": "postkit-slug",
  "version": "1.0.0",
  "description": "Generate and validate URL-safe slugs for PostKit posts",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc",
    "test": "vitest",
    "prepublishOnly": "npm test && npm run build"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vitest": "^1.0.0"
  }
}
```

| Field | Purpose |
|---|---|
| `name` | the package name on npm — must be unique |
| `version` | current version |
| `description` | short summary shown on npmjs.com |
| `main` | the JavaScript file developers import |
| `types` | the TypeScript definition file |
| `files` | which files to include when publishing |
| `scripts` | commands you can run with `npm run` |
| `devDependencies` | tools needed during development but not at runtime |

---

### Semantic Versioning

Libraries use a three-part version number: `MAJOR.MINOR.PATCH`

| Number | When to increment | What it means to your users |
|---|---|---|
| PATCH | Bug fix, no behavior change | Safe to update |
| MINOR | New function added, nothing removed | Safe to update |
| MAJOR | Breaking change — renamed function, changed signature | May break their code |

The version number is a message to every developer who depends on your library. Use it accurately.

In PostKit, when your classmates run `npm install` they may pin to your version. A wrong version bump means they get a breaking change they didn't expect.

---

## ⏱️ Part 4 — Building TypeScript and Packaging for npm (20 min)

### Lecture

You write your library in TypeScript. But the code that gets published to npm should be compiled JavaScript — with TypeScript type definitions alongside it.

Why? Developers using your library may not be using TypeScript at all. They should still be able to install and use your package.

The compiled output lives in a `dist/` folder:

```
my-library/
  src/
    index.ts        ← you write this
  dist/
    index.js        ← compiled JavaScript (published)
    index.d.ts      ← TypeScript definitions (published)
  package.json
  tsconfig.json
```

---

### Compiling with TypeScript

The TypeScript compiler `tsc` converts your `.ts` files to `.js` and generates `.d.ts` type definition files.

A typical `tsconfig.json` for a library:

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true,
    "module": "ESNext",
    "target": "ES2019",
    "moduleResolution": "Node",
    "strict": true
  },
  "include": ["src"]
}
```

Key options:

| Option | Purpose |
|---|---|
| `outDir` | where compiled files go |
| `declaration` | generate `.d.ts` type definition files |
| `strict` | enforce strict type checking |

Run the build:

```
npm run build
```

---

### Controlling What Gets Published

By default, `npm publish` uploads everything in your project folder — including source files, test files, and config files. That is not what you want.

Use the **`files` field** in `package.json` to specify exactly what gets published:

```json
"files": ["dist"]
```

This means only the `dist/` folder is included in the published package. Your `src/`, tests, and config stay local.

This is better than `.npmignore` because it is a whitelist — you choose what is included, rather than trying to remember everything to exclude.

**What should be in `dist/`:**
- `index.js` — the compiled JavaScript
- `index.d.ts` — the TypeScript definitions

**What should NOT be published:**
- `src/` — your source TypeScript
- `*.test.ts` — your tests
- `tsconfig.json`, `vite.config.ts`, etc.

---

### Automate the Build Before Publishing

Add a `prepublishOnly` script to ensure you always build before publishing:

```json
"scripts": {
  "build": "tsc",
  "test": "vitest",
  "prepublishOnly": "npm test && npm run build"
}
```

`prepublishOnly` runs automatically before `npm publish`. It runs your tests first — if tests fail, publishing stops. Then it builds. This prevents the common mistake of publishing stale or broken code.

---

## ⏱️ Part 5 — Lab: Build and Publish (55 min)

Work on your own PostKit library.

### Checklist

- [ ] All exported functions have JSDoc comments with `@param`, `@returns`, and `@example`
- [ ] `tsconfig.json` is configured with `outDir: "dist"` and `declaration: true`
- [ ] `npm run build` produces `dist/index.js` and `dist/index.d.ts`
- [ ] `package.json` has `main`, `types`, and `files` fields pointing to `dist/`
- [ ] `prepublishOnly` script runs tests then build
- [ ] All tests pass
- [ ] Package name is unique on npm
- [ ] You are logged in to npm (`npm whoami`)
- [ ] `npm publish` succeeds
- [ ] You can run `npm install <your-package-name>` in a fresh folder and import your library

### Verify Installation

Create a temporary folder outside your project and test the install:

```
mkdir test-install && cd test-install
npm init -y
npm install <your-package-name>
```

Then create a small file that imports and calls one of your functions. If it works, your package is ready.

---

## ⏱️ Wrap-up (10 min)

Share with the class:

1. What is one thing you changed about your API or documentation during the review?
2. Did you find anything during the install test that needed fixing?

---

## Reflection

Answer the following questions:

1. Why is publishing a library different from just writing code for yourself?
2. What does the `files` field in `package.json` control, and why does it matter?
3. Why should `devDependencies` not be in `dependencies` for a published library?
4. What does semantic versioning communicate to developers who depend on your library?
5. How does your library connect to the rest of the PostKit system?
