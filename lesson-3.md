# Lesson 3 — Testing JavaScript Libraries (2:45 Session)

## Overview

In this lesson you will learn how to **verify behavior using tests**.

More importantly:

> Tests are used to prove when code is working correctly.

---

# Learning Goals

By the end of this lesson you should be able to:

- Write unit tests using Vitest
- Explain how tests pass and fail
- Identify normal, edge, and invalid cases
- Use tests to prove implementations do not match their documentation

---

# ⏱️ Part 1 — Warmup: Unexpected Behavior (15 min)

```js
0.1 + 0.2 === 0.3
// false
```

## Discussion (Pairs)

- Why is this surprising?
- What assumption is being violated?

## Prompt

What test would you write for this behavior?

---

# ⏱️ Part 2 — What Is a Test? (15 min)

A test checks that code behaves as expected.

```ts
test('adds numbers', () => {
  expect(2 + 3).toBe(5)
})
```

## Key Idea

- A test passes when no error is thrown
- A test fails when an error is thrown

## Important

```ts
test('empty', () => {
  const x = 2 + 2
})
```

This test **passes** because nothing fails.

👉 A test must include `expect()` to be useful.

---

# ⏱️ Part 3 — What Should We Test? (20 min)

## Three Categories

1. **Normal cases** — typical inputs
2. **Edge cases** — boundaries (empty, limits)
3. **Invalid inputs** — incorrect or unexpected inputs

## Activity (Pairs)

Given:

```ts
function multiply(nums: number[]): number {
  return nums.reduce((acc, n) => acc * n, 1)
}
```

Write:
- 1 normal test
- 1 edge case
- 1 invalid input test

---

# ⏱️ Part 4 — Prove the Bug Exists (45 min)

## Core Idea

Write tests based on **intended behavior**, not the current code.

If your tests do not fail, they are not useful.

---

### Problem 1

```ts
function sum(nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 1)
}
```

Write tests that prove this is incorrect.

---

### Problem 2

```ts
function isEven(n: number): boolean {
  return n % 2 === 1
}
```

Write tests for even and odd numbers.

---

### Problem 3

```ts
function first<T>(arr: T[]): T {
  return arr[1]
}
```

Write tests for different array sizes.

---

## Reflection

- What inputs revealed the bugs?
- Why did your tests fail?

---

# ⏱️ Part 5 — Regex Primer (20 min)

In the lab, many bugs come from string handling. Regex helps you **describe patterns**, not just individual characters.

You don’t need to master regex today — just learn how to *read and use common patterns*.

---

## What is Regex? (2 min)

Regex = **pattern matching language for text**

Instead of checking characters one by one, you describe a pattern:

```ts
/hello/        // match "hello"
/\d+/          // one or more digits
```

---

## Why do we need it? (3 min)

String methods alone get messy:

```ts
text.replace('  ', ' ') // only fixes one case
```

Regex handles patterns in one step:

```ts
text.replace(/\s+/g, ' ') // all whitespace
```

👉 You use regex when:
- input is inconsistent
- patterns repeat
- you don’t know exact positions

---

## Quick History (2 min)

- Originated in the 1950s (formal language theory)
- Popularized in Unix tools like `grep`
- Now built into JavaScript, Python, etc.

👉 It exists because text processing is everywhere

---

## Core Idea (5 min)

Regex is built from **small building blocks**:

```ts
\s     // whitespace
\w     // word character
.      // any character
[]     // character set
^      // start of string
$      // end of string
+      // one or more
*      // zero or more
```

Combine them:

```ts
/\s+/        // one or more whitespace
/[^\w\s]/   // NOT word or whitespace (punctuation)
```

👉 The “secret”:
Regex is just **combining small rules into patterns**

---

## Common Uses (5 min)

```ts
// collapse whitespace
text.replace(/\s+/g, ' ')

// remove punctuation
text.replace(/[^\w\s]/g, '')

// split into words
text.split(/\s+/)
```

---

## Mini Activity (Pairs — 5 min)

1. Predict the output:

```ts
"Hello,   world!!!".replace(/[^\w\s]/g, '')
```

```ts
"one   two\nthree".split(/\s+/)
```

2. Discuss:
- Why does this work better than `.split(' ')`?
- What bug would this prevent?

---

## Discussion Prompts (2–3 min)

- When would regex be better than string methods?
- When might regex make code harder to read?

👉 Regex is powerful, but should be used carefully.

---

## Why This Matters

In the lab, bugs come from:

- incorrect whitespace handling
- punctuation not being removed
- splitting strings incorrectly

Regex helps you:

- implement correctly
- write better tests

---

# ⏱️ Part 6 — Lab 3 Unit testing

Open your lab repo.

```bash
npm test
```

Notice:
- all tests pass
- but they do not test anything useful

Replace placeholder tests with real tests that:

- reflect the documented behavior
- fail with the current implementation

Then:

- fix the functions
- run tests until all pass

---

# Reflection (10 min)

Write answers:

1. How do tests detect bugs?
2. What is an edge case?
3. What makes a test useful?