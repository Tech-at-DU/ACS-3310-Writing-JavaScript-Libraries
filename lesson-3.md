# Lesson 3 — Testing JavaScript Libraries

## Overview

In previous lessons you designed library APIs and used TypeScript to describe function behavior.

In this lesson you will learn how to **verify that your code actually works** using tests.

You have already written functions in Homework 1. Now we will learn how to **prove those functions behave correctly**.

---

# Learning Goals

By the end of this lesson you should be able to:

* Explain why **automated tests** are important for libraries
* Write **unit tests** using Vitest
* Use tests to detect bugs
* Understand what kinds of situations tests should cover

---

# Warmup — The Leftpad Incident

In 2016 a very small npm package called **left-pad** was removed from npm. The package only contained a few lines of code used to pad strings.

```js
leftPad("cat", 5, " ")
// "  cat"
```

Even though the library was tiny, it was used by **thousands of other packages**. When it was removed, many projects stopped working.

Developers around the world saw errors when running:

```
npm install
```

### Important Idea

Testing would **not have prevented this problem**. The issue was not a bug—it was that the package disappeared.

However, this event shows:

* how many systems depend on small libraries
* how fragile the ecosystem can be
* why reliability matters

---

# Why Testing Matters

Libraries are used by many developers. If a function behaves incorrectly, it can break many applications.

You wrote functions like `chunk`, `unique`, or `sum`.

If one of those functions is wrong, every program using it is also wrong.

Tests help you:

* detect bugs early
* confirm behavior is correct
* safely refactor code later

---

# What Is a Unit Test?

A **unit test** checks that a small piece of code works correctly.

Most often, the unit is a function.

Example:

```ts
function add(a: number, b: number): number {
  return a + b
}
```

Test:

```ts
test('adds two numbers', () => {
  expect(add(2, 3)).toBe(5)
})
```

---

# How Tests Pass and Fail

A test **passes** when no errors are thrown.

A test **fails** when an expectation is not met.

```ts
expect(add(2, 3)).toBe(5)
```

If the result is not `5`, an error is thrown and the test fails.

### Important

A test with **no expectations** will always pass.

```ts
test('empty', () => {
  const x = 2 + 2
})
```

Good tests must clearly define expected behavior.

---

# What Should We Test?

When testing a function, we usually test:

### 1. Normal behavior

Typical inputs the function is expected to handle.

### 2. Edge cases

Edge cases are boundary or unusual inputs where bugs often appear.

Examples:

* empty arrays
* very small values
* values at boundaries

```ts
chunk([], 2)
chunk([1], 2)
```

### 3. Incorrect inputs (when relevant)

These test how the function behaves with invalid data.

Examples:

* wrong types
* null or undefined

---

# Introducing Vitest

You have already used Vitest in earlier labs.

Vitest provides:

* `test()` — defines a test
* `expect()` — checks results

Example:

```ts
test('chunk splits arrays', () => {
  expect(chunk([1,2,3,4], 2)).toEqual([[1,2],[3,4]])
})
```

Run tests with:

```
npm test
```

---

# Active Learning — Prove the Bug Exists

Work in pairs. **Do not use AI** to fix the function. *Focus on writing tests that describe expected behavior*.

Consider the following function:

```ts
function sum(nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 1)
}
```

## Your Task

1. Do NOT change the function
2. Write a test that proves something is wrong
3. Run the test
4. Observe the result

## Questions

* What should the function return?
* What input reveals the problem?

Example idea:

```ts
expect(sum([1,2,3])).toBe(6)
```

## Discussion

You did not "find" the bug.

You **proved the bug exists** by defining expected behavior.


## Problem 2

Consider the following function:

```ts
function isEven(n: number): boolean {
  return n % 2 === 1
}
```

## Your Task
	1.	Write a test that proves this function behaves incorrectly
	2.	Think about both even and odd numbers
	3.	Run your test and observe the result

## Questions
	•	What should isEven(4) return?
	•	What should isEven(3) return?

## Problem 3

Consider the following function:

```ts
function first<T>(arr: T[]): T {
  return arr[1]
}
```

## Your Task
	1.	Write a test that reveals the issue
	2.	Consider arrays of different sizes

## Questions
	•	What should happen with a single-element array?
	•	What should happen with a larger array?

You did not “find” the bug.

You proved the bug exists by *defining expected behavior*.

---

# Active Learning — Define Behavior First

Consider this function:

```ts
function average(nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0) / nums.length
}
```

## In pairs:

1. What should happen if the array is empty?
2. Write a test for that case

There may not be one correct answer.

This is a design decision.

---

# Preparing for Homework 2 — Validator Library

Your next assignment is to build a **Validator Library**.

Testing will be a required part of this assignment.

For each validator you should test:

* valid inputs
* invalid inputs
* edge cases

Example:

```ts
isEmail("test@example.com") // true
isEmail("invalid")          // false
```

You should write tests **before or alongside your implementation**.

---

# Reflection

Answer the following questions:

1. How do tests help you detect bugs?
2. What is an edge case?
3. What did you learn from writing a failing test?

Be prepared to discuss your answers.
