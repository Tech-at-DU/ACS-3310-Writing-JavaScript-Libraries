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
import { chunk } from 'lodash' // Import lib code

chunk([1,2,3,4], 2) // use code
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

The **API (Application Programming Interface)** defines how other developers interact with your library. It describes the functions, objects, and behaviors that users of the library rely on.

For example, a utility library might expose a function like this:

```js
chunk(array, size)
```

A developer does not need to know how `chunk` works internally. They only need to understand **how to use it**.

When designing a library, the API is one of the most important things to consider. A good API makes a library easy to understand and pleasant to use.

## Elements of an API

When designing an API, developers should think carefully about several things:

### Function Names

Function names should clearly describe what the function does.

Examples:

```
chunk(array, size) // splits an array into "chunks" of size
unique(array)      // removes duplicate values
formatDate(date)   // formats a date
```

Good names help developers quickly understand what a function is meant to do.

### Parameters

Parameters define the inputs to a function.

A well-designed API should make parameters:

- easy to understand
- consistent across functions
- ordered logically

Example:

```js
chunk(array, size)
```

Here the developer can easily understand:

- the function takes an array
- the second argument controls the chunk size

### Return Values

Functions should return values that are predictable and useful.

Example:

```
chunk([1,2,3,4], 2)

→ [[1,2],[3,4]]
```

Developers should be able to guess what a function returns _without reading the implementation_.

### Consistency

Good libraries use **consistent patterns**.

For example:

```
// These share the same "signature"
map(array, fn)
filter(array, fn)
reduce(array, fn)
```

Consistency makes APIs easier to learn because similar functions behave in similar ways.

### Side Effects

Some functions modify their inputs. Others return new values without changing the original data.

Libraries should be clear about this behavior.

Example:

```
sort(array)
```

Does the function modify the array, or return a new sorted array?

**Clear APIs avoid surprises.**

### Documentation and Examples

Even a well-designed API needs examples.

Example:

```js
chunk([1,2,3,4], 2)
// [[1,2],[3,4]]
```

Good documentation helps developers quickly understand how to use the library.

## Characteristics of a Good API

Good APIs are:

- **simple** – easy to understand
- **predictable** – functions behave consistently
- **well named** – function names describe their purpose
- **well documented** – examples show how to use the library

In this course you will practice designing APIs for several small libraries.

## Exploring APIs

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

Read about tsconfig.json here: https://www.typescriptlang.org/tsconfig/

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

## GitHub Classroom Lab

In this lab you will set up a simple TypeScript project and practice compiling code.

Follow these steps carefully:

1. Open the assignment link:

https://classroom.github.com/a/rp_Ioyeq

2. Accept the assignment. This will create a private repository for you.

3. Clone your repository to your computer:

```bash
git clone <your-repo-url>
cd ACS-3310-Lab-1
```

4. Install dependencies:

```bash
npm install
```

5. Compile the TypeScript project:

```bash
npm run build
```

6. Run the tests:

```bash
npm test
```

7. Complete the challenges in the `src/` folder.

8. When finished, commit and push your work:

```bash
git add .
git commit -m "complete lab 1"
git push
```

## What You Should Learn

- how to clone a repository
- how to install dependencies
- how to compile TypeScript
- how to run tests

## Submission

Your work is submitted automatically when you push to GitHub.

You should complete this lab during class.

---

# Explore a Real Library

In this activity you will explore the design of a real npm library.

Work in small groups and choose **one of the following libraries**:

- lodash
- date-fns
- nanoid

Visit the npm page and GitHub repository for the library.

Answer the following questions.

## Questions

1. What problem does the library solve?

2. What does the **API look like**?

3. What are some example functions the library provides?

4. How does the documentation explain how to use the library?

5. What does the project structure look like?


Write your answers in a short shared document.

---

# API Design Exercise

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

# API Design from Specifications

Work in groups of 3–4.

You will design function APIs based on **requirements**.

Your goal is to decide:

- function names
- parameter names
- parameter order
- return values

---

## Requirement 1 — Split an Array

**Description:**  
Split an array into smaller arrays of a given size.

**Input:**
- a list of values
- a number representing the size

**Output:**
- a list of lists

---

## Requirement 2 — Group Items

**Description:**  
Group items in a list based on a rule.

**Input:**
- a list of items
- a function that returns a key for each item

**Output:**
- an object mapping keys to lists of items

---

## Requirement 3 — Filter Valid Items

**Description:**  
Return only items that meet a condition.

**Input:**
- a list of items
- a function that checks if an item is valid

**Output:**
- a list of valid items

---

## Requirement 4 — Format Currency

**Description:**  
Format a number as a currency string.

**Input:**
- a number
- a currency code (e.g. USD, EUR)

**Output:**
- a formatted string

---

## Instructions

For each:

- design a function signature
- write example usage

Do NOT copy existing libraries.

---

## Discussion

Compare your solutions with another group.

Discuss:

- Which API is easier to understand?
- Which naming choices are better?
- Where do designs differ?

---

# Reflection

Answer the following questions:

1. What makes an API easy to use?

2. What makes a library difficult to use?

3. Why might developers choose to use a library instead of writing code themselves?

Be prepared to discuss your answers in class.