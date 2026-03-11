

# Lab 1 — Getting Started with TypeScript

## Overview

In this lab you will set up a small TypeScript project, compile your first `.ts` file, and solve a few small challenge problems.

The goal is to get comfortable with:

- installing TypeScript
- creating a `tsconfig.json`
- compiling TypeScript
- adding basic type annotations

This lab supports **Lesson 1** and prepares you for **Homework 1**.

---

# Learning Goals

By the end of this lab you should be able to:

- install TypeScript in a project
- create a TypeScript configuration file
- compile TypeScript into JavaScript
- write simple typed functions

---

# Part 1 — Set Up a TypeScript Project

Create a new project folder.

Example:

```bash
mkdir ts-lab-1
cd ts-lab-1
```

Initialize the project:

```bash
npm init -y
```

Install TypeScript as a development dependency:

```bash
npm install typescript --save-dev
```

Create a TypeScript configuration file:

```bash
npx tsc --init
```

---

# Part 2 — Configure the Project

Open `tsconfig.json` and make sure it includes settings similar to these:

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

Create these folders:

```bash
mkdir src
mkdir dist
```

---

# Part 3 — Write and Compile Your First TypeScript File

Create a file named `src/index.ts`.

Add this code:

```ts
function greet(name: string): string {
  return `Hello, ${name}`
}

console.log(greet('TypeScript'))
```

Compile the project:

```bash
npx tsc
```

Run the compiled JavaScript:

```bash
node dist/index.js
```

Expected output:

```bash
Hello, TypeScript
```

---

# Part 4 — Challenge Problems

Create a new file named `src/challenges.ts`.

Solve the following problems using **TypeScript**.

## Challenge 1 — `add`

Write a function named `add` that:

- takes two numbers
- returns their sum

Example:

```ts
add(2, 3) // 5
```

---

## Challenge 2 — `isEven`

Write a function named `isEven` that:

- takes one number
- returns `true` if the number is even
- returns `false` otherwise

Example:

```ts
isEven(4) // true
isEven(5) // false
```

---

## Challenge 3 — `first`

Write a function named `first` that:

- takes an array
- returns the first item in the array

Use a **generic type** so the function can work with arrays of different kinds of values.

Examples:

```ts
first([1, 2, 3]) // 1
first(['a', 'b', 'c']) // 'a'
```

---

## Challenge 4 — `makeUser`

Write a function named `makeUser` that:

- takes a `name` string
- takes an `age` number
- returns an object with `name` and `age`

Example:

```ts
makeUser('Ana', 22)
// { name: 'Ana', age: 22 }
```

---

## Challenge 5 — `printLength`

Write a function named `printLength` that:

- takes a string
- returns the length of the string

Example:

```ts
printLength('hello') // 5
```

---

# Part 5 — Test Your Work Manually

At the bottom of `src/challenges.ts`, add some `console.log()` calls to test your functions.

Example:

```ts
console.log(add(2, 3))
console.log(isEven(10))
console.log(first(['a', 'b', 'c']))
console.log(makeUser('Ana', 22))
console.log(printLength('hello'))
```

Compile again:

```bash
npx tsc
```

Then run:

```bash
node dist/challenges.js
```

---

# Deliverables

By the end of the lab you should have:

- a TypeScript project initialized with npm
- a `tsconfig.json`
- a `src/index.ts` file
- a `src/challenges.ts` file with completed challenge problems
- compiled JavaScript in the `dist` folder

---

# Reflection

Answer these questions before leaving class:

1. What does the TypeScript compiler do?
2. What is the purpose of `tsconfig.json`?
3. How do type annotations help make code easier to understand?
4. What was the hardest part of this lab?

---

# Stretch Challenge

Add type annotations to this function and fix any type problems:

```ts
function doubleAll(values) {
  return values.map(value => value * 2)
}
```

Then test it with an array of numbers.