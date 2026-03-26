# Lesson 2 — TypeScript for Libraries (2:45 Session)

## Overview

In this lesson you will learn how to use **TypeScript** to describe how functions behave, and apply these ideas to designing reusable library code.

You will work in pairs throughout the lesson. Expect to discuss, write code, and compare ideas.

---

# Learning Goals

By the end of this lesson you should be able to:

- Add type annotations to functions
- Read and explain function types
- Use generics to write reusable functions
- Design a clear, typed function API

---

# ⏱️ Part 1 — Warmup: Pure vs Impure (20 min)

## Task (Pairs)

Decide whether each function is **pure** or **impure**.

```js
function square(n) {
  return n * n
}
```

```js
let counter = 0
function increment() {
  counter++
}
```

```js
function doubleAll(arr) {
  return arr.map(n => n * 2)
}
```

```js
function randomNumber() {
  return Math.random()
}
```

## Discuss

- Which of these would you trust in a library?
- Why?

Be ready to share.

---

# ⏱️ Part 2 — Reading Types (25 min)

## Examine this function

```ts
function filterBy<T>(arr: T[], fn: (item: T) => boolean): T[]
```

## Task (Pairs — 5–7 minutes)

1. Write your answers down
2. Be ready to explain

Answer:

- What does this function do?
- What does `fn` do?
- What is `T`?

## Share

We will discuss answers as a class.

---

# ⏱️ Part 3 — Function Types (30 min)

## Example

```ts
function double(n: number): number {
  return n * 2
}

const fn: (n: number) => number = double
```

### This type means:

```ts
(n: number) => number
```

- takes a number
- returns a number

---

## Practice (Pairs — 5 minutes)

Work with a partner.

1. Write your answers down
2. Be ready to explain your answers

```ts
function applyTwice(value: number, fn: (n: number) => number): number
```

Discuss and write:

- What does `fn` take?
- What does it return?
- What does `applyTwice` return?

---

### Practice 2 (Pairs — 3 minutes)

Work with a partner.

1. Write your answers down
2. Be ready to explain your reasoning

```ts
function mapNumbers(arr: number[], fn: (n: number) => number): number[]
```

Discuss and write:

- What does the function `fn` take?
- What does it return?
- What does `mapNumbers` return?

---

### Practice 3 (Pairs — 3 minutes)

Work with a partner.

1. Write your answers down
2. Be ready to explain your reasoning

```ts
function checkAll(arr: number[], fn: (n: number) => boolean): boolean
```

Discuss and write:

- What does the function `fn` take?
- What does it return?
- What does `checkAll` return?

---

# ⏱️ Part 4 — Generics (30 min)

## Problem

```ts
function firstNumber(arr: number[]): number
function firstString(arr: string[]): string
```

## Question

What is wrong with this approach?

---

## Solution

```ts
function first<T>(arr: T[]): T | undefined {
  return arr[0]
}
```

`T` is a placeholder type determined when the function is called.

---

## Practice (Pairs)

Write:

```ts
function last<T>(arr: T[]): T | undefined
```

Explain:

- What is `T`?
- Where does it come from?

---

# ⏱️ Part 5 — Convert JS → TS (25 min)

## Task (Pairs)

Convert these to TypeScript:

```js
function unique(array) {
  return [...new Set(array)]
}
```

```js
function sum(nums) {
  return nums.reduce((acc, n) => acc + n, 0)
}
```

```js
function filter(arr, fn) {
  return arr.filter(fn)
}
```

Focus on:

- parameter types
- return types
- function types

---

# ⏱️ Part 6 — Mini Library Sprint (50 min)

## Choose ONE problem (assigned by instructor)

### Option A — Advanced filter
Create a function that:
- filters items
- also limits the number of results

### Option B — Map with index
Create a function that:
- maps items
- callback receives (item, index)

### Option C — Flexible pluck
Create a function that:
- extracts a property
- works with any key (not just "name")

### Option D — groupBy (challenge)
Create a function that:
- groups items into categories
- returns an object of arrays

---

## Step 1 — Design (10 min)

Write down:

- function name
- parameter names
- what the function should do
- one example call

---

## Step 2 — Add Types (15–20 min)

- add TypeScript types
- use generics where needed
- type any callback functions
- update your example call if needed

---

## Step 3 — Edge Cases (10 min)

Write at least two edge cases:

- empty array
- unexpected input

---

## Step 4 — Compare (10–15 min)

Join another group.

1. Explain your function to them
2. Compare designs
3. Decide which version is clearer and why

Focus on:

- naming
- parameter order
- type clarity

---

# ⏱️ Part 7 — Lab 2 Start (30 min)

## Instructions

1. Accept the assignment: https://classroom.github.com/a/tpmlN-gN
2. Clone your repo
3. Run:

```bash
npm ci
npm run build
npm test
```

If any command fails, stop and ask for help immediately.

4. Begin implementing functions

---

# Reflection (End of Class)

Answer:

1. What does `(item: T) => boolean` mean?
2. What does `T` represent?
3. What makes a function API clear?