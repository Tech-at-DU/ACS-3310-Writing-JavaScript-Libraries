# Lesson 4 — Structuring a JavaScript Library

## Overview

So far you have explored:

- what libraries are
- how TypeScript improves APIs
- how to test library functions

In this lesson we will focus on **how libraries are structured**. A clear project structure makes a library easier to understand, maintain, and publish.

You will learn how to organize your code, export a public API, and design a library so that other developers can easily use it.

---

# Learning Goals

By the end of this lesson you should be able to:

- Organize code for a small library project
- Understand the purpose of `src`, `tests`, and `index.ts`
- Export functions as a **public API**
- Understand the difference between **internal code** and **public code**

---

# Typical Library Structure

Most JavaScript libraries follow a structure similar to this:

```
my-library/
  src/
    chunk.ts
    groupBy.ts
    index.ts
  tests/
    chunk.test.ts
    groupBy.test.ts
  package.json
  tsconfig.json
  README.md
```

### What each part does

| File/Folder | Purpose |
|-------------|---------|
| `src/` | library source code |
| `tests/` | automated tests |
| `index.ts` | public API entry point |
| `package.json` | package configuration |
| `tsconfig.json` | TypeScript configuration |
| `README.md` | documentation |

---

# Public API vs Internal Code

A library should clearly define what other developers are allowed to use.

The **public API** is the part of the library that users import.

Example:

```ts
import { chunk } from 'my-library'
```

The `index.ts` file usually defines the public API.

Example:

```ts
export { chunk } from './chunk'
export { groupBy } from './groupBy'
```

Only exported functions are visible to users of the library.

Internal helper functions should stay private.

---

# Designing the Public API

A well-designed library API should be:

- simple
- predictable
- easy to discover

Example utility library API:

```ts
import { chunk, unique, partition } from 'array-utils'
```

Instead of requiring users to import many internal files.

---

# Active Learning — Explore a Library Structure

Work in pairs.

Visit the GitHub repository for one of these libraries:

- nanoid
- date-fns
- lodash-es

Look at the project structure.

Answer the following questions:

1. Where is the source code located?
2. Where are the tests located?
3. How does the library export its public API?
4. How easy is the project structure to understand?

Discuss your findings with your partner.

---

# Active Learning — Design Your Library Structure

Now think about your **Homework 1 utility library**.

Design a project structure for it.

Example starting point:

```
array-utils/
  src/
    chunk.ts
    partition.ts
    unique.ts
    index.ts
  tests/
```

Questions to discuss:

1. What files will you create in `src/`?
2. How will you organize your tests?
3. What should your `index.ts` export?

Write your proposed structure.

---

# Preparing for Homework 1

Before implementing your utility library, make sure you have:

- created a clear **project structure**
- planned which files will contain each function
- decided what your **public API** will look like

Example API:

```ts
import { chunk, groupBy, partition } from 'my-utils'
```

Designing the structure first makes implementation much easier.

---

# Reflection

Answer the following questions:

1. Why is it important to separate public API from internal code?
2. What makes a library structure easy to understand?
3. How will you organize the files in your utility library?

Be prepared to discuss your answers in class.