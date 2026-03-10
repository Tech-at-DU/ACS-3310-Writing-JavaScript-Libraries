# Homework 6 — Publish Your Library + Final Project Proposal

## Overview
In this assignment you will prepare one of your previous libraries for **real-world publication**. This includes improving the project structure, writing documentation, configuring package metadata, and preparing the package for distribution through **npm**.

You will also submit a **proposal for your final project library**.

The goal of this assignment is to practice the final steps required to turn code into a **reusable open‑source library**.

---

# Learning Goals

By completing this assignment you will practice:

- Preparing a library for **npm publishing**
- Writing clear **documentation and examples**
- Configuring **package metadata**
- Understanding **semantic versioning**
- Designing a **larger library project**

---

# Assignment

Choose **one of your previous libraries** (Homework 1–5) and prepare it for publication.

Your goal is to transform the assignment into a **polished reusable package**.

You do **not need to actually publish it to npm**, but the project should be fully prepared so that it *could* be published.

---

# Required Improvements

Your project must include the following improvements.

## Clean Project Structure

Ensure the project has a clear structure similar to this:

```
my-library/
  src/
  tests/
  dist/
  package.json
  tsconfig.json
  README.md
  LICENSE
```

---

## Package Metadata

Your `package.json` should include:

- `name`
- `version`
- `description`
- `main`
- `types`
- `scripts`
- `author`
- `license`

Example:

```json
{
  "name": "my-library",
  "version": "1.0.0",
  "description": "A small utility library",
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}
```

---

## Build Step

Your project must include a build step that compiles TypeScript.

Example:

```
npm run build
```

This should produce compiled files in a `dist` folder.

---

## README Documentation

Your README should include:

- Library description
- Installation instructions
- Usage examples
- API documentation

Example:

```
npm install my-library
```

Usage example:

```ts
import { createStore } from 'my-library'
```

---

## Example Usage

Add a section in your README showing **realistic example usage** of your library.

Example:

```
const store = createStore({ count: 0 })

store.subscribe(state => console.log(state))

store.update(s => ({ count: s.count + 1 }))
```

---

# Tests

Your project must still include **working tests** using Vitest.

Run:

```
npm test
```

All tests should pass.

---

# Final Project Proposal

In addition to preparing your library, submit a **proposal for your final project library**.

Your proposal should include:

### 1. Library Name

Example:

```
state-machine-lib
```

### 2. Problem the Library Solves

Explain what the library does and why it would be useful.

### 3. Proposed API

Show example usage of the library.

Example:

```ts
const machine = createMachine(config)

machine.transition('START')
```

### 4. Key Features

List the major features you plan to implement.

Example:

- State transitions
- Event handling
- Debug logging

### 5. Why This Design Makes Sense

Explain your design decisions.

---

# Submission

Submit a **GitHub repository** containing:

- Updated library
- Tests
- Documentation

Also submit a **proposal document** describing your final project.

---

# Evaluation

| Category | Points |
|--------|--------|
| Project polish | 25 |
| Documentation quality | 20 |
| Package configuration | 20 |
| Tests | 20 |
| Final project proposal | 15 |

---

# Tips

Think about how other developers would use your library.

Good libraries have:

- Clear documentation
- Consistent APIs
- Helpful examples

Your goal is to make your project feel like a **real open‑source package**.
