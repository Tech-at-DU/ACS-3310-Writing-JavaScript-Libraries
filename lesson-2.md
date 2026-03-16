

# Lesson 2 — Introduction to TypeScript for Libraries

## Overview

In the previous lesson you explored what JavaScript libraries are and how developers use them. In this lesson we will introduce **TypeScript**, a tool that helps developers write safer and more maintainable JavaScript.

TypeScript adds **types** to JavaScript. Types describe what kind of data a function expects and what it returns. This is especially important when building libraries that other developers will use.

In this lesson we will learn:

- what TypeScript is
- why libraries often use TypeScript
- how to write basic types
- how to convert JavaScript functions to TypeScript

---

# Learning Goals

By the end of this lesson you should be able to:

- Explain what **TypeScript** is
- Add **type annotations** to functions
- Understand **generic types** at a basic level
- Convert simple JavaScript code into TypeScript

---

# Warmup — Pure vs Impure Functions

Before we begin working with TypeScript, we will review an important idea used throughout modern JavaScript libraries: **pure functions**.

Many libraries are designed around pure functions because they are easier to test, easier to reason about, and easier to reuse.

## What Is a Pure Function?

A **pure function** has two key properties:

1. The function always returns the **same output for the same inputs**.
2. The function **does not change anything outside of itself** (no side effects).

Example of a pure function:

```js
function add(a, b) {
  return a + b
}
```

This function is pure because:

- it always returns the same result for the same inputs
- it does not modify any external variables

## What Is an Impure Function?

An **impure function** either:

- modifies external state
- relies on external state
- produces side effects (logging, network requests, modifying variables, etc.)

Example:

```js
let total = 0

function addToTotal(n) {
  total += n
}
```

This function is **impure** because it modifies the external variable `total`.

Another example:

```js
function logMessage(message) {
  console.log(message)
}
```

This function produces a side effect (printing to the console).

## Why Libraries Prefer Pure Functions

Libraries often favor pure functions because they are:

- easier to test
- easier to reuse
- easier to understand
- less likely to introduce bugs

For example, many utility libraries such as **Lodash** or **Ramda** rely heavily on pure functions.

## Warmup Activity

Work in pairs and decide whether each function is **pure or impure**.

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

Discuss with your partner:

- Which functions are pure?
- Which are impure?
- Why?

We will briefly discuss your answers before continuing the lesson.

---


# Installing and Running TypeScript

Before writing TypeScript code we need to install the **TypeScript compiler**.

## Step 1 — Initialize a Project

Create a new project folder and initialize npm:

```bash
npm init -y
```

This creates a `package.json` file for the project.

## Step 2 — Install TypeScript

Install TypeScript as a development dependency:

```bash
npm install typescript --save-dev
```

This installs the TypeScript compiler locally in your project.

You can verify the installation with:

```bash
npx tsc --version
```

## Step 3 — Create a TypeScript Configuration

Create a configuration file for the TypeScript compiler:

```bash
npx tsc --init
```

This generates a `tsconfig.json` file that controls how TypeScript compiles your code.

A typical library configuration might include:

```json
{
  "compilerOptions": {
    "target": "ES2019",
    "module": "ESNext",
    "moduleResolution": "Node",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true
  }
}
```

## Step 4 — Compile TypeScript

TypeScript files use the `.ts` extension.

Example project structure:

```
project/
  src/
    index.ts
  dist/
```

Compile the project using:

```bash
npx tsc
```

This compiles all `.ts` files and writes the generated JavaScript to the `dist` folder.

## Step 5 — Add a Build Script

You can make compilation easier by adding a script to `package.json`:

```json
"scripts": {
  "build": "tsc"
}
```

Now you can compile your project with:

```bash
npm run build
```

In this course we will use this workflow when building libraries.

---

# Why Libraries Use TypeScript

When developers install a library, they rely on its API. If the API is unclear or accepts unexpected data, bugs can appear.

TypeScript helps prevent these problems.

Example without types:

```js
function repeat(text, count) {
  // 
}
```

Example with TypeScript:

```ts
function repeat(text: string, count: number): string {
  return text.repeat(count)
}
```

In this example TypeScript makes it clear that the function expects a **string** and a **number**, and that it returns a **string**.

Types help developers:

- understand how a library works
- catch mistakes early
- write better documentation

---

# Basic Type Annotations

TypeScript allows you to add type information to variables and function parameters.

Example:

```ts
function add(a: number, b: number): number {
  return a + b
}
```

Here we specify:

- `a` must be a number
- `b` must be a number
- the function returns a number

---

# Generic Types

Libraries often need to work with **many types of data**. Generics allow us to write flexible functions.

Example:

```ts
function first<T>(array: T[]): T {
  return array[0]
}
```

This function works for any type of array.

Example usage:

```ts
first([1,2,3])
first(['a','b','c'])
```

---

# Converting JavaScript to TypeScript

Work in pairs.

Below is a simple JavaScript function.

```js
function unique(array) {
  return [...new Set(array)]
}
```

Your task is to convert this function into **TypeScript**.

Questions to consider:

1. What type should the array contain?
2. What type should the function return?
3. Can the function work with multiple types?

Write your TypeScript version of the function.

Example discussion points:

- Should the function use generics?
- What happens if the array contains objects?

---

# Design Typed Utility Functions

In small groups, design **two typed utility functions**.

Examples might include:

```
chunk(array, size)
partition(array, predicate)
unique(array)
```

For each function write:

- function name
- parameter types
- return type
- example usage

Example:

```
function chunk<T>(array: T[], size: number): T[][]
```

Discuss how TypeScript helps make the API clearer.

---

# Preparing for Homework 1

Your Homework 1 assignment asks you to create a **utility library written in TypeScript**.

Before beginning the assignment:

1. Decide what functions your library will include.
2. Think about what types those functions should use.
3. Write the function signatures before implementing the logic.

Example:

```ts
function groupBy<T>(array: T[], keyFn: (item: T) => string): Record<string, T[]>
```

Planning the types first often leads to a cleaner design.

---

# Reflection

Answer the following questions:

1. How do types help developers understand a library?
2. What types might be useful for your utility library functions?
3. What advantages do generics provide when designing reusable functions?

Be prepared to discuss your answers with the class.