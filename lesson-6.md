

# Lesson 6 — Building and Distributing a Library

## Overview

When developers publish libraries to npm, the code that users install is usually **compiled and prepared for distribution**. Source code written in TypeScript is typically converted into JavaScript before publishing.

In this lesson you will learn how to:

- compile TypeScript
- generate a `dist` folder
- configure build scripts
- understand what files should be published

These steps are important for preparing a library for **real-world use**.

---

# Learning Goals

By the end of this lesson you should be able to:

- Compile TypeScript into JavaScript
- Understand the purpose of the **dist folder**
- Configure a **build script** in `package.json`
- Understand how libraries are prepared for distribution

---

# Source Code vs Distributed Code

When developing a library you usually write code inside a **src folder**.

Example:

```
my-library/
  src/
    chunk.ts
    index.ts
```

However, the version published to npm usually contains **compiled JavaScript**.

Example published structure:

```
my-library/
  dist/
    chunk.js
    index.js
```

The `dist` folder contains the **built version of the library**.

---

# Compiling TypeScript

TypeScript provides a compiler called **tsc**.

The compiler converts `.ts` files into `.js` files.

Example command:

```
npx tsc
```

This command reads configuration from **tsconfig.json** and outputs compiled files.

---

# Example tsconfig.json

A typical configuration for libraries might look like this:

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true,
    "module": "ESNext",
    "target": "ES2019",
    "moduleResolution": "Node"
  },
  "include": ["src"]
}
```

Important options:

| Option | Purpose |
|------|---------|
| outDir | output folder for compiled code |
| declaration | generates TypeScript type definitions |
| module | module format |

---

# Build Script

Most libraries define a build command inside **package.json**.

Example:

```json
"scripts": {
  "build": "tsc",
  "test": "vitest"
}
```

Run the build command with:

```
npm run build
```

This compiles the project and creates the `dist` folder.

---

# Entry Points

Libraries usually expose a **single entry point**.

Example in `package.json`:

```json
{
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}
```

This tells tools and developers where to find:

- the JavaScript entry file
- the TypeScript definitions

---

# Active Learning — Build a Library

Work in pairs.

Imagine you are preparing your **Homework 1 utility library** for distribution.

Design the build process.

Answer these questions:

1. Where should source code live?
2. Where should compiled code go?
3. What command should build the library?

Example:

```
src/ → TypeScript source

dist/ → compiled JavaScript

npm run build
```

Discuss your design with your partner.

---

# Active Learning — Inspect a Real Library

Choose one of the following libraries:

- nanoid
- date-fns
- lodash-es

Look at the repository on GitHub.

Answer these questions:

1. Where is the source code located?
2. Does the project include a build step?
3. What files appear in the published package?

Discuss what you observe.

---

# Preparing for Later Assignments

Later in this course you will prepare a library for **npm publication**.

Understanding how to build and package a library is a key step in that process.

---

# Reflection

Answer the following questions:

1. Why do libraries usually publish compiled JavaScript instead of TypeScript?
2. What is the purpose of the `dist` folder?
3. Why is a build step important when publishing a library?

Be prepared to discuss your answers in class.