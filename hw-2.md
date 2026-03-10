# Homework 2 — Validation Library

## Overview
In this assignment you will design and implement a **validation library** written in **TypeScript**. The goal is to practice designing a clean API, composing functions, and writing reusable validation logic.

Validation libraries are common in real applications. They are used to check that data such as form input, API responses, or configuration values meet certain requirements.

Examples of real validation libraries include:

- Zod
- Yup
- Joi

Your goal is **not to recreate these libraries**, but to design a **small and well-structured validation system**.

---

# Learning Goals

By completing this assignment you will practice:

- Designing a reusable **library API**
- Writing **composable functions**
- Using **TypeScript types** to describe data
- Writing **tests for validation logic**
- Documenting how your library should be used

---

# Assignment

Create a **validation library** that exports a collection of validator functions.

Each validator checks whether a value meets a condition and returns either:

- `true` / `false`, or
- an object describing the validation result.

Your library must include **at least 5 validators**.

Example validators:

```
isString(value)
isNumber(value)
minLength(value, length)
maxLength(value, length)
isEmail(value)
```

You may design your own validators as long as they are generally useful.

---

# Composable Validators

A **composable validator** means that small validation functions can be **combined together to build more complex validation rules**.

Instead of writing one large validator, you write many small validators and run them together.

Each validator checks **one condition** and can be reused in many places.

Example small validators:

```
isString(value)
minLength(3)
maxLength(20)
```

These validators can then be **composed** (combined) into a validation pipeline.

Example:

```ts
validate(username, [
  isString,
  minLength(3),
  maxLength(20)
])
```

The `validate` function should run each validator and collect the results.

Example result:

```ts
{
  valid: false,
  errors: ['Must be at least 3 characters']
}
```

---

## How Composition Works

Each validator should follow the same structure so they can work together.

Example validator type:

```ts
type Validator<T> = (value: T) => string | null
```

Example validator implementation:

```ts
export function minLength(length: number): Validator<string> {
  return (value: string) => {
    if (value.length < length) {
      return `Must be at least ${length} characters`
    }

    return null
  }
}
```

Example `validate` function:

```ts
export function validate<T>(value: T, validators: Validator<T>[]) {
  const errors: string[] = []

  for (const validator of validators) {
    const result = validator(value)

    if (result) {
      errors.push(result)
    }
  }

  return {
    valid: errors.length === 0,
    errors
  }
}
```

---

## What Your Library Must Support

Your library must allow validators to be **combined together** in a similar way.

For example:

```ts
validate(username, [
  isString,
  minLength(3),
  maxLength(20)
])
```

Your implementation may differ, but it must support:

- Running multiple validators on the same value
- Collecting validation errors
- Returning a result that clearly indicates success or failure

The key idea is that **small validators should work together to create larger validation rules**.

---

# TypeScript Requirement

Your library must include **TypeScript types**.

Example validator type:

```ts
type Validator<T> = (value: T) => boolean
```

Or a more detailed result type:

```ts
interface ValidationResult {
  valid: boolean
  errors: string[]
}
```

Your code should compile successfully with TypeScript.

---

# Project Structure

Your project should follow a structure similar to this:

```
validator-lib/
  src/
    index.ts
    validators/
      isString.ts
      minLength.ts
  tests/
  package.json
  tsconfig.json
  README.md
```

Your `index.ts` file should export the public API of the library.

Example:

```ts
export * from './validators/isString'
export * from './validators/minLength'
```

---

# Tests

You must include tests using **Vitest**.

Minimum requirements:

- **At least 2 tests per validator**

Example:

```ts
import { isString } from '../src/validators/isString'


test('isString returns true for strings', () => {
  expect(isString('hello')).toBe(true)
})
```

---

# README Requirements

Your project must include a `README.md` that explains how to use your library.

The README should include:

- Library description
- Installation instructions
- Usage examples
- Documentation for each validator

Example:

```
validate(username, [isString, minLength(3)])
```

---

# Submission

Submit a **GitHub repository** containing:

- Source code
- Tests
- TypeScript configuration
- README documentation

Your project should run successfully with:

```
npm install
npm test
```

---

# Evaluation

| Category | Points |
|--------|--------|
| API design | 25 |
| TypeScript usage | 20 |
| Validator correctness | 20 |
| Tests | 20 |
| Documentation | 15 |

---

# Tips

Start by designing the API before writing code.

Write down:

- Validator name
- What it checks
- Example usage

Example:

```
minLength(3)
```

A well-designed API makes your library easier to use and easier to maintain.
