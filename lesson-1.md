# Lesson 1 — What Is a JavaScript Library?

## Overview

In this course you will learn how to design, build, test, and publish **JavaScript libraries**. Libraries are reusable pieces of code that other developers can install and use in their own projects.

Examples of popular JavaScript libraries include:

- lodash
- date-fns
- axios
- React

Libraries help developers avoid rewriting common functionality and encourage reusable solutions.

In this lesson we will explore:

- what libraries are
- how developers use them
- how libraries are structured
- how APIs are designed

---

# Learning Goals

By the end of this lesson you should be able to:

- Explain what a **JavaScript library** is
- Identify the **public API** of a library
- Understand how libraries are **installed and used**
- Analyze the design of an existing npm package

---

# What Is a Library?

A **library** is a collection of reusable code that solves a specific problem.

Instead of writing everything yourself, you can install a library and use the functions it provides.

Example:

```js
import { chunk } from 'lodash'

chunk([1,2,3,4], 2)
```

Libraries usually focus on solving **one category of problems**.

Examples:

| Library | Purpose |
|-------|--------|
| lodash | utility functions |
| axios | HTTP requests |
| date-fns | date manipulation |

---

# What Is an API?

A library exposes a **public API**.

The API defines how developers interact with the library.

Example API:

```js
chunk(array, size)
```

When designing libraries, the API is one of the most important decisions.

Good APIs are:

- simple
- predictable
- well documented

---

# Installing Libraries

Most JavaScript libraries are distributed through **npm**.

Example installation:

```
npm install lodash
```

Then the library can be used in code:

```js
import { chunk } from 'lodash'
```


This course will teach you how to create libraries that can be distributed this way.

---

# Introduction to TypeScript

Most modern JavaScript libraries are written using **TypeScript**. TypeScript is a superset of JavaScript that adds **types** to the language. These types help developers understand how a library should be used and help catch mistakes early.

For example, a function written in JavaScript might look like this:

```js
function add(a, b) {
  return a + b
}
```

With TypeScript we can describe the expected inputs and output:

```ts
function add(a: number, b: number): number {
  return a + b
}
```

This tells developers:

- `a` must be a number
- `b` must be a number
- the function returns a number

Types act like **documentation that the computer can verify**.

---

# Installing TypeScript

To use TypeScript in a project we install it using npm.

```
npm install typescript --save-dev
```

This installs the TypeScript compiler as a development dependency.

You can verify the installation with:

```
npx tsc --version
```

---

# Creating a TypeScript Configuration

TypeScript projects use a configuration file called **tsconfig.json**.

You can create one with:

```
npx tsc --init
```

A simplified configuration for a library might look like this:

```json
{
  "compilerOptions": {
    "target": "ES2019",
    "module": "ESNext",
    "moduleResolution": "Node",
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true
  }
}
```

Important options:

| Option | Purpose |
|------|---------|
| `rootDir` | location of source code |
| `outDir` | where compiled code will be written |
| `declaration` | generate TypeScript type definitions |

---

# Compiling TypeScript

TypeScript code must be compiled into JavaScript before it can run.

Example command:

```
npx tsc
```

This command reads the **tsconfig.json** file and compiles the project.

Example project structure:

```
my-library/
  src/
    index.ts
  dist/
    index.js
```

- `src/` contains TypeScript source code
- `dist/` contains compiled JavaScript

Later in the course we will use this build step when preparing libraries for npm.

---

# TypeScript in This Course

In this course we will gradually introduce TypeScript concepts as we build libraries.

Today we focus on:

- installing TypeScript
- configuring a project
- compiling code

In the next class we will begin writing **typed function signatures** for library APIs.

---

---

# Active Learning — Explore a Real Library

In this activity you will explore the design of a real npm library.

Work in small groups and choose **one of the following libraries**:

- lodash
- date-fns
- nanoid

Visit the npm page or GitHub repository for the library.

Answer the following questions.

## Questions

1. What problem does the library solve?

2. What does the **API look like**?

3. What are some example functions the library provides?

4. How does the documentation explain how to use the library?

5. What does the project structure look like?


Write your answers in a short shared document.

---

# Active Learning — API Design Exercise

Now imagine you are designing a small library.

Choose one of the following ideas:

- array utilities
- string utilities
- number utilities

Design **three functions** your library might provide.

Example:

```
chunk(array, size)
unique(array)
partition(array, fn)
```

For each function write:

- function name
- parameters
- return value
- example usage

Example:

```
chunk(array, size)

Parameters:
array: array of values
size: number

Returns:
array of arrays

Example:
chunk([1,2,3,4], 2)
```

Discuss your design with your group.

---

# Preparing for Homework 1

Your first assignment will be to build a **small utility library**.

Before writing code you should think carefully about:

- what functions the library provides
- what the API should look like
- how developers will use it

Good library design begins with **clear API design**.

---

# Reflection

Answer the following questions:

1. What makes an API easy to use?

2. What makes a library difficult to use?

3. Why might developers choose to use a library instead of writing code themselves?

Be prepared to discuss your answers in class.