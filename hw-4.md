


# Homework 4 — Reactive Store Library

## Overview
In this assignment you will build a **reactive state store library** using **TypeScript**.

A reactive store manages application state and allows parts of a program to **subscribe to changes**. When the state updates, all subscribers are notified automatically.

Reactive stores are used in many modern frameworks and libraries such as:

- Redux
- Zustand
- Svelte stores
- Vue reactivity system

Your goal is to design and implement a **small reusable reactive store library**.

---

# Learning Goals

By completing this assignment you will practice:

- Designing a **state management API**
- Implementing **reactive updates**
- Using **TypeScript generics** for reusable libraries
- Writing tests for state changes
- Designing a clear public API

---

# Assignment

Create a library that manages a piece of application state and allows other parts of the program to **subscribe to changes in that state**.

Your library should export a function called `createStore`.

Example usage:

```ts
const store = createStore({ count: 0 })

store.subscribe(state => {
  console.log('state changed:', state)
})

store.set({ count: 1 })
```

Expected output:

```
state changed: { count: 1 }
```

---

# Required Features

Your store must support the following methods.

## `subscribe(listener)`
Register a listener that runs whenever the state changes.

Example:

```ts
store.subscribe(state => {
  console.log(state)
})
```

Requirements:

- Multiple subscribers may be registered
- All subscribers should be called whenever the state updates

---

## `set(newState)`
Replace the current state with a new value.

Example:

```ts
store.set({ count: 5 })
```

Requirements:

- The store should update its internal state
- All subscribers should be notified

---

## `get()`
Return the current state.

Example:

```ts
const current = store.get()
```

---

## `update(fn)`
Update the state using a function.

Example:

```ts
store.update(state => ({ count: state.count + 1 }))
```

Requirements:

- The function receives the current state
- The function returns the new state
- Subscribers should be notified after the update

---

# TypeScript Requirement

Your store should use **TypeScript generics** so it works with any state shape.

Example:

```ts
const store = createStore<{ count: number }>({ count: 0 })
```

Subscribers should receive the correct type.

Example:

```ts
store.subscribe(state => {
  state.count
})
```

---

# Project Structure

Your project should follow a structure similar to this:

```
store-lib/
  src/
    createStore.ts
    index.ts
  tests/
  package.json
  tsconfig.json
  README.md
```

Your `index.ts` file should export the public API.

---

# Tests

You must include tests using **Vitest**.

Minimum requirements:

- Test subscribing to state
- Test setting state
- Test updating state
- Test that subscribers are called when state changes

Example:

```ts
store.subscribe(listener)
store.set({ count: 2 })

expect(listener).toHaveBeenCalled()
```

---

# README Requirements

Your README should include:

- Library description
- Installation instructions
- Usage examples
- API documentation

Example usage section:

```
const store = createStore({ count: 0 })

store.subscribe(state => console.log(state))

store.update(s => ({ count: s.count + 1 }))
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
| TypeScript generics | 20 |
| Store behavior | 20 |
| Tests | 20 |
| Documentation | 15 |

---

# Tips

Start by designing the API before writing code.

Write down:

- What methods the store exposes
- How subscribers are stored
- How updates notify subscribers

A typical internal structure might look like:

```
state
subscribers[]
```

Focus on making your library **simple, predictable, and well tested**.
