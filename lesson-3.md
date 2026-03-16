# Lesson 3 — Testing JavaScript Libraries

## Overview

In previous lessons you explored what libraries are and how TypeScript helps make library APIs clearer. In this lesson we will learn how to **test libraries**.

Testing is especially important for libraries because other developers depend on them. A bug in a library can break many applications.

---

# Warmup — The Leftpad Incident

Before we begin writing tests, let's look at a real example of how problems in a small library can affect a large part of the software ecosystem.

In 2016 a very small npm package called **left-pad** was removed from npm. The package only contained a few lines of code used to pad strings on the left side.

Example behavior:

```js
leftPad("cat", 5, " ")
// "  cat"
```

Even though the library was tiny, it was used by **thousands of other packages**. When the package was removed, many projects suddenly stopped building.

Developers around the world saw errors when running:

```
npm install
```

Many applications and build systems failed because they depended (directly or indirectly) on this tiny library.

## Discussion Questions

Look up the source code for leftpad. Then discuss the questions below. 

Work in small groups and discuss:

1. Why would so many libraries depend on such a small utility?
2. What risks appear when many packages depend on each other?
3. How might testing help library authors prevent breaking changes?
4. Should very small utilities be published as separate packages?

We will briefly discuss your ideas before continuing the lesson.

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

A **unit test** checks that a small unit of code works correctly. Most often the unit of code is a function! 

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

## How Tests Pass and Fail

A unit test **passes** when the code inside the test runs without throwing an error.

Most testing libraries work the same way:

- If an **expectation fails**, an error is thrown.
- If **no errors occur**, the test passes.

Example:

```ts
test('adds two numbers', () => {
  expect(add(2,3)).toBe(5)
})
```

If the function returned `4` instead of `5`, the `expect` statement would throw an error and the test would **fail**.

### Important Idea

A test that contains **no expectations** will almost always pass.

Example:

```ts
test('empty test', () => {
  const x = 2 + 2 // Always passes!
})

// Or even: 
test('empty test', () => {
  // Always passes! 
})
```

This test does not check anything, so it will pass even if the code is wrong.

Good tests should always include **clear expectations about behavior**.

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
   This is the most common or expected use of the function. Tests should verify that the function works correctly for typical inputs.

2. **Edge cases**  
   Edge cases are unusual or boundary situations where bugs often appear. These usually occur at the "edges" of valid input.

   Examples of edge cases include:

   - empty arrays
   - very small inputs (0, 1, or negative numbers)
   - very large inputs
   - inputs at boundaries (for example the exact chunk size)

   For example:

   ```ts
   chunk([], 2)        // empty array
   chunk([1], 2)       // smaller than chunk size
   chunk([1,2,3], 2)   // remainder values
   ```

3. **Incorrect inputs** (when relevant)  
   These tests check how the function behaves when it receives invalid data.

   Examples:

   - passing the wrong type
   - passing `null` or `undefined`
   - passing values that should cause an error

   Not every function needs these tests, but they can help make a library more robust.

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