# Homework 1 — Functional Utility Library

## Overview
In this assignment you will create a small **JavaScript utility library** written in **TypeScript**. The goal is to practice designing a clear API, writing pure functions, and structuring a small library project.

This assignment focuses on **good library design**, not complex algorithms.

---

# Learning Goals
By completing this assignment you will practice:

- Designing a small library API
- Writing **pure, reusable functions**
- Using **TypeScript types and generics**
- Organizing a library project structure
- Writing tests for a library
- Documenting your code for other developers

---

# Assignment
Create a small **utility library** that exports at least **5 reusable functions** that operate on arrays or objects.

Your library should contain general-purpose functions similar to those found in libraries like lodash or underscore.

Examples of acceptable functions include:

- `chunk(array, size)`
- `groupBy(array, keyFn)`
- `partition(array, predicate)`
- `uniqueBy(array, keyFn)`
- `flatten(array)`

If you choose to implement these functions, your implementation should match the behavior described below.

## Function Specifications

### `chunk(array, size)`
Split an array into smaller arrays of a given size.

Example:

```ts
chunk([1,2,3,4,5], 2)
// → [[1,2],[3,4],[5]]
```

Requirements:

- The original array must **not be modified**
- The last chunk may contain fewer elements if the array length is not divisible by `size`

---

### `groupBy(array, keyFn)`
Group elements of an array based on the result of a function.

Example:

```ts
const users = [
  {name: 'Ana', role: 'admin'},
  {name: 'Bob', role: 'user'},
  {name: 'Cara', role: 'admin'}
]

groupBy(users, user => user.role)

// → {
//   admin: [
//     {name:'Ana', role:'admin'},
//     {name:'Cara', role:'admin'}
//   ],
//   user: [
//     {name:'Bob', role:'user'}
//   ]
// }
```

Requirements:

- The result should be an **object**
- Keys come from the result of `keyFn`
- Each key maps to an array of matching items
- The original array must not be modified

---

### `partition(array, predicate)`
Split an array into **two arrays** based on a condition.

Example:

```ts
partition([1,2,3,4], n => n % 2 === 0)

// → [[2,4], [1,3]]
```

Requirements:

- First array: elements where predicate returns `true`
- Second array: elements where predicate returns `false`
- The order of elements should be preserved

---

### `uniqueBy(array, keyFn)`
Remove duplicate items from an array based on a key function.

Example:

```ts
const users = [
  {id:1, name:'Ana'},
  {id:2, name:'Bob'},
  {id:1, name:'Ana'}
]

uniqueBy(users, user => user.id)

// → [
//   {id:1, name:'Ana'},
//   {id:2, name:'Bob'}
// ]
```

Requirements:

- Only the **first occurrence** of each key should be kept
- The original order of items should be preserved
- The original array must not be modified

---

### `flatten(array)`
Convert a nested array into a single flat array.

Example:

```ts
flatten([1, [2,3], [4, [5]]])

// → [1,2,3,4,5]
```

Requirements:

- The result should contain **all values in a single array**
- Nested arrays should be recursively expanded
- The original array must not be modified

---

You may implement these functions **or design your own**, as long as they are general-purpose utilities.

---

# Requirements

Your library must:

- Be written in **TypeScript**
- Contain **at least 5 exported functions**
- Use **pure functions** (no mutation of inputs)
- Include **TypeScript types** for parameters and return values
- Include **tests using Vitest**
- Include a **README with documentation**

---

# Project Structure
Your project should follow a structure similar to this:

```
array-utils/
  src/
    index.ts
    chunk.ts
    groupBy.ts
  tests/
  package.json
  tsconfig.json
  README.md
```

Your `index.ts` file should export the public API of the library.

Example:

```ts
export * from './chunk'
export * from './groupBy'
export * from './partition'
```

---

# Pure Function Requirement
All functions must be **pure**.

This means:

- Do not modify input arrays or objects
- Do not depend on external state
- Always return the same output for the same input

Example:

```ts
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }

  return result
}
```

---

# Tests
You must include **tests for each function**.

Minimum requirement:

- **2 tests per function**

Example:

```ts
import { chunk } from '../src/chunk'

test('chunk splits array into groups', () => {
  expect(chunk([1,2,3,4], 2)).toEqual([[1,2],[3,4]])
})
```

---

# README Requirements
Your project must include a `README.md` that explains how your library works.

Your README should include:

- Library description
- Installation instructions
- Usage examples
- Documentation for each function

Example section:

```
## chunk

chunk(array, size)

Splits an array into smaller arrays of the given size.
```

---

# Submission
Submit a **GitHub repository** containing:

- Source code
- Tests
- TypeScript configuration
- README documentation

Your project should run successfully with:

```
npm install
npm test
```

---

# Evaluation
Your assignment will be evaluated based on:

| Category | Points |
|--------|--------|
| API design clarity | 25 |
| TypeScript types | 20 |
| Correct function behavior | 20 |
| Tests | 20 |
| Documentation | 15 |

---

# Tips

Before writing code, start by designing your API.

Write down:

- Function name
- Parameters
- Return value
- Example usage

Example:

```
groupBy(users, user => user.role)
```

Good libraries start with **clear design**, not code.
