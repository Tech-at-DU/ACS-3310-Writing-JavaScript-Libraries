# Homework 5 — Plugin System Library

## Overview
In this assignment you will build a **plugin system library** using **TypeScript**.

Plugin systems allow developers to extend a library without changing its core code. This is a common pattern in real JavaScript tools and frameworks.

Examples of systems that use plugins include:

- Vite
- ESLint
- Rollup
- Unified / Remark

Your goal is to design and implement a **small reusable plugin-based library**.

---

# Learning Goals

By completing this assignment you will practice:

- Designing an **extensible library API**
- Implementing a **plugin architecture**
- Using **TypeScript types** to describe plugin behavior
- Writing tests for plugin behavior
- Designing a clear public API

---

# Assignment

Create a library that supports **plugins**.

A plugin is a function or object that can be added to your library to extend its behavior.

Your library should export a `createApp()` function or a class of your choice that supports a `use()` method.

Example usage:

```ts
const app = createApp()

app.use(loggerPlugin)
app.use(timestampPlugin)

app.run('hello')
```

The exact behavior of your library is up to you, but it must allow plugins to modify or respond to the library's behavior.

---

# Practical Example

Imagine a text processing library.

The core library might take a string and process it. Plugins could extend that behavior.

Example:

```ts
const app = createApp()

app.use(text => text.toUpperCase())
app.use(text => `*** ${text} ***`)

app.run('hello')

// → *** HELLO ***
```

In this design:

- The core library does not need to know all future behaviors
- New features can be added by writing plugins
- The system is easier to extend without rewriting the core

This pattern is common in real tools where the core library stays small and plugins add specialized behavior.

---

# Required Features

Your plugin system must support the following.

## `use(plugin)`
Register a plugin with the system.

Example:

```ts
app.use(loggerPlugin)
```

Requirements:

- Multiple plugins may be registered
- Plugins should be applied in the order they are added

---

## Plugin behavior
A plugin must be able to affect the system in some way.

You may choose one of the following designs:

### Option A — Transform plugins
Plugins receive a value and return a new value.

Example:

```ts
const uppercasePlugin = (text: string) => text.toUpperCase()
```

### Option B — Hook plugins
Plugins receive access to a system object and can attach behavior.

Example:

```ts
const loggerPlugin = app => {
  app.onRun(value => {
    console.log('running:', value)
  })
}
```

You may choose either design, but your library must clearly support plugins as an extension mechanism.

---

## `run(value)` or similar
Your system must expose a method that demonstrates the effect of plugins.

Example:

```ts
app.run('hello')
```

Requirements:

- The result should reflect all registered plugins
- Plugin order should matter if plugins transform the same value

---

# TypeScript Requirement

Your plugin system must include **TypeScript types**.

If you use transform plugins, the plugin type might look like:

```ts
type Plugin<T> = (value: T) => T
```

If you use hook plugins, define appropriate types for the app object and plugin shape.

Your code should compile successfully with TypeScript.

---

# Project Structure

Your project should follow a structure similar to this:

```
plugin-lib/
  src/
    createApp.ts
    plugins/
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

- Test registering plugins
- Test plugin execution order
- Test that plugins affect the result or behavior of the system

Example:

```ts
app.use(pluginA)
app.use(pluginB)

expect(app.run('hi')).toBe('...')
```

---

# README Requirements

Your README should include:

- Library description
- Installation instructions
- Usage examples
- API documentation
- Example plugins

Example usage section:

```
const app = createApp()

app.use(pluginA)
app.use(pluginB)

app.run('hello')
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
| Plugin system behavior | 20 |
| Tests | 20 |
| Documentation | 15 |

---

# Tips

Start by deciding what the **core system** does before you design plugins.

Write down:

- What the base app does with no plugins
- What a plugin can change or extend
- What `use()` should accept
- What `run()` should do

A good plugin system keeps the **core small** and makes extension predictable.
