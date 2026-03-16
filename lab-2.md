# Lab 2 — Evaluating API Design

## Overview

In this lab you will explore how library **APIs are designed**. You will examine real JavaScript APIs, identify what works well, and discuss what makes some APIs confusing or difficult to use.

The goal of this activity is to help you think like a **library designer**, not just a library user.

Later in this course you will design your own APIs for several libraries, so developing a sense of good API design is important.

---

# Learning Goals

By the end of this lab you should be able to:

- identify characteristics of a good API
- recognize confusing API design
- evaluate naming, parameters, and return values
- propose improvements to existing APIs

---

# Activity Structure

You will work in **small groups (3–4 students)**.

Each group will evaluate several real APIs using the rubric provided below.

For each API, discuss:

1. What does the API do?
2. Is the function name clear?
3. Are the parameters easy to understand?
4. Is the return value obvious?
5. Would you enjoy using this API?

Your group will then **rank the APIs from best to worst** and present one example to the class.

---

# Evaluation Rubric

Use the following rubric to evaluate each API.

Score each category from **1 (poor) to 5 (excellent)**.

| Category | Questions to Ask |
|--------|------------------|
| Naming | Does the function name clearly describe its purpose? |
| Parameters | Are the parameters understandable and logically ordered? |
| Return Value | Is the return value easy to predict? |
| Consistency | Does the API follow common patterns used in other libraries? |
| Ease of Use | Would you enjoy using this API in your own code? |

After scoring each category, compute a **total score for the API**.

Students should assign a **score from 1–5 for each category**. After scoring all categories, compute an **overall score (average or total)** for the API. Use these scores to help your group **rank the APIs from best to worst**.

---

# APIs to Evaluate

Your group should evaluate at least **four of the following APIs**.

## 1. Lodash `chunk`

```js
_.chunk([1,2,3,4], 2)
```

Returns:

```
[[1,2],[3,4]]
```

---

## 2. JavaScript `Array.prototype.map`

```js
[1,2,3].map(n => n * 2)
```

Returns:

```
[2,4,6]
```

---

## 3. Fetch API

```js
fetch("/users")
  .then(res => res.json())
```

---

## 4. Confusing Positional Parameters

```js
createUser("Ana", true, false, 3)
```

---

## 5. Date Formatting Example

```js
formatDate(date, "YYYY-MM-DD", true, "UTC")
```

---

## 6. processData()

```js
processData(d, x)
```

---

## 7. Node.js `fs.readFile`

```js
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err
  console.log(data)
})
```

---

## 8. Express Route Handler

```js
app.get("/users", (req, res) => {
  res.send("hello")
})
```

---

## 9. Boolean Flag Parameters

```js
saveFile("report.txt", true, false)
```

---

## 10. Options Object Pattern

```js
saveFile("report.txt", {
  overwrite: true,
  compress: false
})
```

---

## 11. Promise-Based API

```js
readFile("file.txt")
  .then(text => console.log(text))
  .catch(err => console.error(err))
```

---

## 12. Cryptic Parameter Names

```js
calc(a, b, c)
```

---

# Group Discussion

Once your group has evaluated the APIs:

1. Rank the APIs from **best to worst based on your rubric scores**.
2. Choose one API that works well.
3. Choose one API that needs improvement.
4. Propose a redesigned version of the weaker API.

Your group will briefly present your conclusions to the class.

---

# Reflection Questions

Answer these questions individually before leaving class:

1. What makes an API easy to understand?
2. What was the worst API you examined and why?
3. What design idea will you use when building your own library APIs?

---

# Stretch Challenge

Find an API from an npm package or JavaScript library that you like.

Write a short explanation of:

- why the API is well designed
- what makes it easy to use
- one improvement you might suggest

Be prepared to share your example in the next class.

---

# Instructor Discussion Examples (Review After Activity)

After groups have presented their ideas, compare your redesigns with the following examples.

## Confusing Positional Parameters — Possible Redesign

```js
createUser({
  name: "Ana",
  admin: true,
  emailVerified: false,
  loginAttempts: 3
})
```

Why this works better:

- parameters are self-documenting
- order no longer matters
- easier to extend later

---

## Date Formatting — Possible Redesign

```js
formatDate(date, {
  format: "YYYY-MM-DD",
  timezone: "UTC",
  strict: true
})
```

Why this works better:

- options are clearly labeled
- avoids confusing positional parameters

---

## Poor Naming — Possible Redesign

```js
filterUsers(users, minAge)
```

Why this works better:

- descriptive parameter names
- function purpose is clear