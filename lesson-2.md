# Lesson 2 — Introduction to TypeScript for Libraries

## Overview

In this lesson you will begin using **TypeScript** to describe and enforce how functions behave.

TypeScript adds **types** to JavaScript. These types help clarify what a function expects and what it returns. This is especially important when building libraries used by other developers.

In this lesson you will:

- review pure vs impure functions
- learn core TypeScript types
- see how TypeScript prevents errors
- convert JavaScript functions to TypeScript

---

# Learning Goals

By the end of this lesson you should be able to:

- Explain what **TypeScript** is
- Add **type annotations** to functions
- Use TypeScript with arrays and functions
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

Example with arrays:

```ts
function doubleAll(arr: number[]): number[] {
  return arr.map(n => n * 2)
}
```

---

# TypeScript in Action

TypeScript can catch errors before your code runs.

```ts
function add(a: number, b: number): number {
  return a + b
}

add(2, 3)
add("2", 3) // Error
```

The second call produces an error because the types are incorrect.

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

This repeats the same logic.

With generics:

```ts
function first<T>(arr: T[]): T {
  return arr[0]
}
```

Now the function works with any type.

---

# Activity — Convert JavaScript to TypeScript

Work in pairs.

Convert the following functions to TypeScript.

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

## Requirements

- add type annotations
- choose appropriate types
- use generics where helpful

---

# Preparing for Lab 1

In the lab you will:

- set up a TypeScript project
- compile code
- run tests
- implement functions with types

Focus on writing **clear function signatures** before implementing logic.

---

# Reflection

Answer the following questions:

1. How do types improve code clarity?
2. What types did you find most useful?
3. When might generics be helpful?

Be prepared to discuss your answers.