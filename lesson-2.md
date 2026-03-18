# Lesson 2 — Introduction to TypeScript for Libraries

## Overview

In this lesson you will begin using **TypeScript** to describe and enforce how functions behave.

TypeScript adds **types** to JavaScript. These types help clarify what a function expects and what it returns. This is especially important when building libraries used by other developers.

In this lesson you will:

- review pure vs impure functions
- learn core TypeScript types
- understand function types and callbacks
- learn the basics of generics
- apply these ideas in a design activity and lab

---

# Learning Goals

By the end of this lesson you should be able to:

- Explain what **TypeScript** is
- Add **type annotations** to functions
- Read and write **function types**
- Use **generics** for reusable functions
- Convert JavaScript code into TypeScript

---

# Warmup — Pure vs Impure Functions

Many JavaScript libraries are built from **pure functions**.

A **pure function**:

1. returns the same output for the same inputs
2. does not modify anything outside the function

Example:

```js
function add(a, b) {
  return a + b
}
```

An **impure function**:

- changes external state
- depends on external state
- produces side effects

Example:

```js
let total = 0

function addToTotal(n) {
  total += n
}
```

## Warmup Activity

Work with a partner. Decide whether each function is pure or impure.

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

---

# Why Use TypeScript?

Libraries expose APIs that other developers depend on.

Without types:

```js
function repeat(text, count) {
  return text.repeat(count)
}
```

With TypeScript:

```ts
function repeat(text: string, count: number): string {
  return text.repeat(count)
}
```

Types make it clear:

- what inputs are expected
- what output is returned

They also help catch mistakes early.

---

# Core TypeScript Types

## Basic Types

```ts
const name: string = "Ana"
const age: number = 20
const isActive: boolean = true
```

## Arrays

```ts
const nums: number[] = [1, 2, 3]
```

## Functions

```ts
function add(a: number, b: number): number {
  return a + b
}
```

---

# Function Types (Important)

Functions themselves have types.

Example:

```ts
function filter(arr: number[], fn: (n: number) => boolean): number[] {
  return arr.filter(fn)
}
```

```ts
function double(n: number): number {
  return n * 2
}

const fn: (n: number) => number = double
```

The type:

```ts
(n: number) => number
```

means:

- takes a number
- returns a number

---

## Practice

```ts
function applyTwice(value: number, fn: (n: number) => number): number
```

What does this type mean?

- What does the function `fn` take?
- What does it return?

---

### Practice 2

```ts
function mapNumbers(arr: number[], fn: (n: number) => number): number[]
```

- What does the function `fn` take?
- What does it return?
- What does `mapNumbers` return?

---

### Practice 3

```ts
function checkAll(arr: number[], fn: (n: number) => boolean): boolean
```

- What does the function `fn` take?
- What does it return?
- What does `checkAll` return?

---

# Generics (Introduction)

Sometimes we want functions to work with many types.

Without generics:

```ts
function firstNumber(arr: number[]): number {
  return arr[0]
}

function firstString(arr: string[]): string {
  return arr[0]
}
```

With generics:

```ts
function first<T>(arr: T[]): T | undefined {
  return arr[0]
}
```

Now the function works with any type.

`T` represents a placeholder type that is determined when the function is called.

---

## Multiple Generic Types

You can use multiple generic type parameters when needed.

```ts
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b]
}
```

---

## Practice — Convert to TypeScript

Work in pairs.

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

---

## Reading Types

```ts
function filterBy<T>(arr: T[], fn: (item: T) => boolean): T[]
```

- What does this function take?
- What does it return?

---

# Activity — Mini Library Sprint

Work in pairs. Choose ONE:

1. filterBy
2. mapBy
3. pluck
4. groupBy (challenge)

---

## Step 1 — Design

- function name
- parameters
- return value

---

## Step 2 — Add Types

- add TypeScript types
- use generics

---

## Step 3 — Think About Edge Cases

- empty array
- invalid input

---

## Step 4 — Compare

Compare with another group.

---

# Lab 2

https://classroom.github.com/a/rhZh9dZJ

---

# Reflection

1. How do types improve code clarity?
2. When are generics useful?