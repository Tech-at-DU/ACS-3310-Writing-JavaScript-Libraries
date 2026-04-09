# Lesson 4 — Working with Dates in JavaScript (2:45 Session)

## Overview

Dates show up everywhere in apps: posts, events, logs, deadlines.

In this lesson you will learn how to **work with dates** and how to design **small reusable date utilities**.

---

## Learning Goals

By the end of this lesson you should be able to:

- Create and parse dates in JavaScript
- Format dates for display
- Compare and sort dates
- Perform basic date arithmetic
- Recognize common date pitfalls
- Design reusable date utility functions

---

# ⏱️ Part 1 — Why Dates Matter (15 min)

## Discussion (Pairs)

- How would you sort blog posts by date?
- How would you display "2 days ago"?
- How would you format this: `2026-04-02T19:52:00Z`?

## Key Idea

Dates are:
- everywhere
- easy to misuse
- a great example of a **library problem**

---

# ⏱️ Part 2 — Creating Dates (20 min)

## Common Ways

```js
const now = new Date()

const fromString = new Date('2025-12-25')

const fromNumbers = new Date(2025, 11, 25) // Dec (month is 0-indexed!)

const timestamp = Date.now() // number (ms since 1970)
```

## Important

- Months are **0-indexed** in numeric constructor
- Strings are usually ISO format

## Quick Check

- What is the difference between `Date.now()` and `new Date()`?
- What month is `11`?

---

# ⏱️ Part 3 — Formatting Dates (20 min)

## Built-in Methods

```js
const d = new Date()

d.toLocaleString()
d.toDateString()
d.toISOString()
```

## More Control

```js
new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(new Date())
```

## Design Question

When writing a library function:

- Should you return a `Date`?
- A formatted string?
- A number (timestamp)?

👉 Formatting is usually for **display**, not storage.

---

# ⏱️ Part 4 — Comparing and Sorting Dates (20 min)

## Comparing

```js
const d1 = new Date('2025-01-01')
const d2 = new Date('2025-12-25')

console.log(d1 < d2) // true
```

## Sorting

```js
dates.sort((a, b) => a - b)
```

## Example — Posts

```js
posts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
```

## Activity (Pairs)

Write a sort function that sorts posts **newest first**.

---

# ⏱️ Part 5 — Date Arithmetic (20 min)

## Difference Between Dates

```js
const d1 = new Date('2025-01-01')
const d2 = new Date('2025-01-10')

const diffMs = d2 - d1
```

## Convert to Days

```js
const days = diffMs / (1000 * 60 * 60 * 24)
```

## Discussion

- Should you round, floor, or ceil?
- What counts as "1 day ago"?

👉 These are **design decisions** in a library

---

# ⏱️ Part 6 — Common Pitfalls (15 min)

## Watch Out For

- Months are 0-indexed (numeric constructor)
- Invalid dates (`new Date('bad')`)
- Time zones (local vs UTC)
- String parsing inconsistencies

## Example

```js
new Date('2025-12-25')
new Date(2025, 11, 25)
```

👉 These may not behave exactly the same

---

# ⏱️ Part 7 — Think Like a Library Author (20 min)

## Activity (Pairs)

Design 2–3 date utility functions.

Examples:

- `formatDate(dateString)`
- `daysBetween(a, b)`
- `isBefore(a, b)`
- `relativeDate(dateString)`

For each function define:

- Input
- Output
- Behavior
- Edge cases

👉 Be precise. Ambiguous behavior leads to bugs.

---

# ⏱️ Part 8 — Lab Setup (15 min)

You will complete a GitHub Classroom assignment with date problems.

https://classroom.github.com/a/hgeSh6Hb

## Goals

- Write small reusable date functions
- Practice working with Date objects
- Apply API design thinking

## Example Problems

- Format a date
- Compare two dates
- Calculate days between dates
- Sort posts by date
- Generate "x days ago" labels

---

# Reflection (10 min)

Write answers:

1. What makes working with dates difficult?
2. What is one common pitfall?
3. What should a good date utility function define clearly?

---

## Final Thought

Dates are not just values.

They are **behavior + assumptions**.

Good libraries make those assumptions explicit.