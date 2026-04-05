# Lesson 3 — Testing JavaScript Libraries (2:45 Session)

## Overview

In previous lessons you designed library APIs and used TypeScript to describe function behavior.

In this lesson you will learn how to **verify that your code actually works** using tests.

You will write tests, run them, and use them to prove when code is incorrect.

---

# Learning Goals

By the end of this lesson you should be able to:

- Explain why automated tests are important
- Write unit tests using Vitest
- Use tests to prove implementations do not match their documentation
- Identify normal cases, edge cases, and invalid inputs

---

# ⏱️ Part 1 — Warmup: Unexpected Behavior (15 min)

## Background — Floating Point Surprise

In JavaScript, the following expression does NOT behave as many people expect:

```js
0.1 + 0.2 === 0.3
// false
```

Instead:

```js
0.1 + 0.2
// 0.30000000000000004
```

This happens because of how numbers are represented internally.

Key idea: even simple-looking code can behave unexpectedly.

---

## Task (Pairs — 5 min)

Work with a partner.

Discuss:

- Why might this result be surprising?
- What assumption is being violated?

---

## Task (Pairs — 5 min)

Write your answers:

- What test would you write for this behavior?
- What result would you expect that test to check?

Be ready to share.

---

# ⏱️ Part 2 — What Is a Test? (20 min)

## Example — What a Test Looks Like

A unit test checks that a function returns the expected result.

```ts
test('multiplies two numbers', () => {
  expect(multiply(2, 3)).toBe(6)
})
```

Focus on this idea:

- We call a function
- We check that the result matches what we expect

---

## Quick Activity (Pairs — 5 min)

Given this function:

```ts
function add(a: number, b: number): number {
  return a + b
}
```

Write ONE test for this function using the pattern above.

---

## Breakdown of the Example

```ts
test('multiplies two numbers', () => {
  expect(multiply(2, 3)).toBe(6)
})
```

---

## Test Pattern

Most tests follow this structure:

1. Arrange — prepare inputs
2. Act — call the function
3. Assert — check the result

```ts
test('adds numbers', () => {
  const a = 2
  const b = 3

  const result = add(a, b)

  expect(result).toBe(5)
})
```

## Important Idea

A good test does not just check that code works.

A good test can **prove that code is wrong**.

In this lesson and lab, your goal is to:

- read the documentation
- write tests for the expected behavior
- show that the implementation does not match

---

# ⏱️ Part 3 — How Tests Pass and Fail (15 min)

## Task (Pairs — 5 min)

Discuss and write:

- When does a test pass?
- When does a test fail?

<details>
<summary>Answer (reveal after discussion)</summary>

- A test passes when no error is thrown
- A test fails when an error is thrown

</details>

---

## Key Idea

- A test passes when **no errors are thrown**
- A test fails when an **error is thrown**

---

## How `expect()` Works

```ts
expect(add(2, 3)).toBe(5)
```

- If correct → nothing happens → test passes
- If incorrect → `expect()` throws an error → test fails

---

## Quick Check (2 min)

Will this test pass or fail?

```ts
test('empty', () => {
  const arr = []
  arr[1]
})
```

Type your answer in chat:

- `pass` or `fail`
- one short reason (why?)

---

<details>
<summary>Answer (reveal after discussion)</summary>

This test will **pass** because **no error is ever thrown**.

A test must include an `expect()` (or something that can fail/throw error) to be useful.

</details>

---

# ⏱️ Part 4 — What Should We Test? (25 min)

## Types of Tests

1. Normal cases
2. Edge cases
3. Invalid inputs

Normal cases:
- Typical, expected inputs
- The function behaves the way it is usually used
- Example: `sum([1, 2, 3])`

Edge cases:
- Boundary or unusual inputs
- Often involve empty values, minimum/maximum values, or limits
- Example: `sum([])`

Invalid inputs:
- Inputs that the function is not designed to handle
- May cause errors or require special handling
- Example: `sum(null as any)`, `sum("hello" as any)`

---

## Activity (Pairs — 10 min)

Work with a partner.

You will write test ideas for **two different functions**.

### Function A

Given this function:

```ts
function multiply(nums: number[]): number {
  return nums.reduce((acc, n) => acc * n, 1)
}
```

Write:

- 1 normal test
- 1 edge case
- 1 invalid input test

Write your tests in code.

Be ready to explain why each test belongs in its category.

#### Function B

```ts
function formatName(person: { first: string; last: string; middle?: string }): string {
  return person.middle
    ? `${person.first} ${person.middle} ${person.last}`
    : `${person.first} ${person.last}`
}
```

For formatName, write:
  - 1 normal test
  - 1 edge case
  - 1 invalid input test

Write your tests in code.

Be ready to explain:
  - why each test belongs in its category
  - how the categories change depending on the function

<details>
<summary>Example Tests (reveal after discussion)</summary>

```ts
// Function A: multiply
expect(multiply([2, 3])).toBe(6)
expect(multiply([])).toBe(1)
expect(multiply([undefined as any])).toBeNaN()

// Function B: formatName
expect(formatName({ first: 'Ada', last: 'Lovelace' })).toBe('Ada Lovelace')
expect(formatName({ first: 'Ada', middle: 'Byron', last: 'Lovelace' })).toBe('Ada Byron Lovelace')
expect(() => formatName(null as any)).toThrow()
```

</details>

---

# Common Assertions (Vitest)

You will see different assertion methods used in tests. Here are the most common ones:

```ts
// exact equality (numbers, strings, booleans)
expect(2 + 2).toBe(4)

// deep equality (arrays, objects)
expect([1, 2]).toEqual([1, 2])

// NaN check
expect(Number('hello')).toBeNaN()

// approximate equality (floating point)
expect(0.1 + 0.2).toBeCloseTo(0.3)

// throws error
expect(() => doSomething()).toThrow()
```

## Quick Notes

- Use `.toBe()` for simple values
- Use `.toEqual()` for arrays and objects
- Use `.toBeNaN()` when the result is not a number
- Use `.toBeCloseTo()` for floating point math
- Use `.toThrow()` when testing errors

---

# ⏱️ Part 5 — Prove the Bug Exists (40 min)

Work in pairs.

Do NOT fix the function yet.

Your goal is to write tests based on the *intended behavior*, not the current implementation.

If your tests do not fail, they are not useful.

Your job is to write tests that prove something is wrong.

---

## Problem 1

```ts
function sum(nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 1)
}
```

### Task (Pairs — 10 min)

- Write at least 2 tests that prove this function is incorrect
- Run your tests

<details>
<summary>Example Test (reveal after discussion)</summary>

```ts
expect(sum([1, 2, 3])).toBe(6) // will fail
```

</details>

---

## Problem 2

```ts
function isEven(n: number): boolean {
  return n % 2 === 1
}
```

### Task (Pairs — 10 min)

- Write at least 2 tests (even and odd)
- Run your tests

<details>
<summary>Example Tests (reveal after discussion)</summary>

```ts
expect(isEven(2)).toBe(true)  // fails
expect(isEven(3)).toBe(false) // fails
```

</details>

---

## Problem 3

```ts
function first<T>(arr: T[]): T {
  return arr[1]
}
```

### Task (Pairs — 10 min)

- Write tests for different array sizes
- Include an edge case

<details>
<summary>Example Tests (reveal after discussion)</summary>

```ts
expect(first([1, 2, 3])).toBe(1) // fails
expect(first(["a", "b"])).toBe("a") // fails
```

</details>

---

## Reflection (Pairs — 5 min)

Discuss:

- What inputs revealed each bug?
- How did your test prove it?

---

# ⏱️ Part 6 — Define Behavior First (20 min)

## Activity (Pairs — 10 min)

```ts
function average(nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0) / nums.length
}
```

Write tests for:

- normal case
- edge case (empty array)

<details>
<summary>Example Tests (reveal after discussion)</summary>

```ts
// normal case
expect(average([2, 4, 6])).toBe(4)

// edge case (depends on design)
expect(average([])).toBeNaN()
```

</details>

---

## Discussion (Pairs — 5 min)

- What should happen for an empty array?
- Should it return 0, NaN, or throw an error?

---

# ⏱️ Part 7 — Regex Primer (20 min)

In the lab, many of the functions work with strings. Regular expressions (regex) are a powerful tool for working with text.

You do NOT need to master regex today — just understand the basics.

## What is Regex?

A regex is a pattern used to match text.

```ts
/hello/
```

Matches the string "hello".

---

## Common Patterns

```ts
/\s/      // whitespace (space, tab, newline)
/\s+/     // one or more whitespace characters
/\w/      // word character (letters, numbers, underscore)
/[^\w\s]/ // anything that is NOT a word or whitespace
```

---

## Useful String Methods

```ts
text.replace(/\s+/g, ' ')    // collapse whitespace
text.replace(/[^\w\s]/g, '') // remove punctuation
text.split(/\s+/)            // split on any whitespace
```

---

## Mini Activity (5 min)

Predict the output:

```ts
"Hello,   world!!!".replace(/[^\w\s]/g, '')
```

```ts
"one   two\nthree".split(/\s+/)
```

Be ready to explain your answers.

---

## Why This Matters

Many bugs in the lab come from:

- incorrect whitespace handling
- punctuation not being removed
- splitting strings incorrectly

Regex helps you write correct implementations AND better tests.

---

# ⏱️ Part 8 — Lab / Practice (20 min)

Open your lab repository.

1. Run:

```bash
npm test
```

2. Notice: all tests currently pass, but they do not test anything useful.

3. Replace placeholder tests with real tests that:
- reflect the documented behavior
- fail with the current implementation

4. After your tests fail:
- fix the implementation
- run tests again until everything passes

If anything fails and you are stuck:
👉 Ask for help immediately

---

# Preparing for Homework 2 — Validator Library

For each function you write, you should include:

- tests that describe expected behavior
- at least 2 normal tests
- at least 1 edge case
- at least 1 invalid input test

Your tests should be strong enough to catch incorrect implementations.

---

# Reflection

Write answers:

1. How do tests help detect bugs?
2. What is an edge case?
3. What makes a test useful?

Be ready to discuss.
