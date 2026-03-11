

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

# Why Libraries Use TypeScript

When developers install a library, they rely on its API. If the API is unclear or accepts unexpected data, bugs can appear.

TypeScript helps prevent these problems.

Example without types:

```js
function chunk(array, size) {
  // What should size be?
  // What type of values are in the array?
}
```

Example with TypeScript:

```ts
function chunk<T>(array: T[], size: number): T[][] {
  // Now the expected types are clear
}
```

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

# Active Learning — Converting JavaScript to TypeScript

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

# Active Learning — Design Typed Utility Functions

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