# Lesson 3 — Testing JavaScript Libraries

## Overview

In previous lessons you explored what libraries are and how TypeScript helps make library APIs clearer. In this lesson we will learn how to **test libraries**.

Testing is especially important for libraries because other developers depend on them. A bug in a library can break many applications.

In this lesson you will learn:

- why testing libraries is important
- how automated tests work
- how to write tests using **Vitest**
- how to test a library API

---

# Learning Goals

By the end of this lesson you should be able to:

- Explain why **automated tests** are important for libraries
- Write **unit tests** using Vitest
- Test the behavior of library functions
- Use tests to verify that your code works correctly

---

# Why Testing Matters

Libraries are used by many developers. If a function behaves incorrectly, it can cause problems in many applications.

Automated tests help developers:

- detect bugs early
- ensure code behaves as expected
- safely change or improve code later

For example, imagine a `chunk` function:

```ts
chunk([1,2,3,4], 2)
```

If this function stops working correctly, many programs might break. Tests help ensure this does not happen.

---

# What Is a Unit Test?

A **unit test** checks that a small piece of code works correctly.

Example function:

```ts
function add(a: number, b: number): number {
  return a + b
}
```

Example test:

```ts
test('adds two numbers', () => {
  expect(add(2,3)).toBe(5)
})
```

The test verifies that the function returns the expected result.

---

# Introducing Vitest

In this course we will use **Vitest** to write and run tests.

Vitest provides functions such as:

- `test()` — defines a test
- `expect()` — checks results

Example test file:

```ts
import { chunk } from '../src/chunk'


test('chunk splits array into groups', () => {
  expect(chunk([1,2,3,4], 2)).toEqual([[1,2],[3,4]])
})
```

To run tests:

```
npm test
```

---

# What Should We Test?

When testing a library function we usually test:

1. **Normal behavior**
2. **Edge cases**
3. **Incorrect inputs** (when relevant)

Example tests for `chunk`:

```ts
expect(chunk([1,2,3,4], 2)).toEqual([[1,2],[3,4]])
expect(chunk([1,2,3], 2)).toEqual([[1,2],[3]])
```

These tests verify different situations.

---

# Active Learning — Write Your First Tests

Work in pairs.

Consider the following function:

```ts
function double(n: number): number {
  return n * 2
}
```

Write **two tests** for this function.

Questions to consider:

1. What is a normal case?
2. What happens with zero?
3. What other values might be useful to test?

Example:

```ts
test('double multiplies numbers by two', () => {
  expect(double(4)).toBe(8)
})
```

Discuss your tests with your partner.

---

# Active Learning — Testing a Utility Function

Now consider a function from your Homework 1 assignment.

Example:

```ts
function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}
```

Write **three tests** for this function.

Ideas:

- normal case
- duplicate values
- empty array

Example test idea:

```ts
expect(unique([1,1,2,3])).toEqual([1,2,3])
```

Discuss why these tests are useful.

---

# Preparing for Homework 1

Your Homework 1 assignment requires tests for each function in your library.

Minimum requirement:

- **at least two tests per function**

Before writing your functions, try writing tests first.

Example:

```ts
expect(chunk([1,2,3,4], 2)).toEqual([[1,2],[3,4]])
```

This approach is called **test-driven thinking**.

---

# Reflection

Answer the following questions:

1. Why are automated tests important for libraries?
2. What kinds of situations should tests cover?
3. How might tests help you improve your library design?

Be prepared to discuss your answers in class.