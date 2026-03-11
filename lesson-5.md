


# Lesson 5 — The npm Ecosystem and `package.json`

## Overview

JavaScript libraries are usually distributed through **npm (Node Package Manager)**. npm is the central ecosystem where developers publish and install reusable packages.

In this lesson you will learn how libraries are defined and configured using a file called **`package.json`**. This file describes your library and tells npm how it should be installed and used.

Understanding npm and `package.json` is essential for building real libraries.

---

# Learning Goals

By the end of this lesson you should be able to:

- Explain what **npm** is
- Understand the purpose of **`package.json`**
- Identify common fields in `package.json`
- Understand the difference between **dependencies** and **devDependencies**
- Understand the basics of **semantic versioning**

---

# What Is npm?

**npm** is a package manager used to install and share JavaScript libraries.

Developers use npm to:

- install libraries created by others
- publish their own libraries
- manage project dependencies

Example installing a library:

```
npm install lodash
```

This command downloads the library and adds it to your project.

---

# The `package.json` File

Every npm project contains a file called **`package.json`**.

This file describes the project and defines how it should behave.

Example:

```json
{
  "name": "array-utils",
  "version": "1.0.0",
  "description": "Utility functions for arrays",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "test": "vitest",
    "build": "tsc"
  }
}
```

This file tells npm:

- the name of the package
- the version
- where the main code is located
- how to run project scripts

---

# Common `package.json` Fields

| Field | Purpose |
|------|---------|
| `name` | name of the library |
| `version` | library version |
| `description` | short explanation |
| `main` | entry point for JavaScript |
| `types` | TypeScript definitions |
| `scripts` | commands you can run with npm |
| `license` | license for the project |

---

# Scripts

Scripts allow you to define commands that run common tasks.

Example:

```json
"scripts": {
  "test": "vitest",
  "build": "tsc",
  "dev": "vite"
}
```

Run scripts like this:

```
npm run build
```

Scripts make development workflows easier.

---

# Dependencies vs Dev Dependencies

Libraries often depend on other libraries.

Example installing a dependency:

```
npm install lodash
```

This adds the package to **dependencies**.

Example installing a development tool:

```
npm install vitest --save-dev
```

This adds the package to **devDependencies**.

### Difference

| Type | Purpose |
|-----|---------|
| dependencies | required for the library to run |
| devDependencies | only needed during development |

Testing tools and build tools usually belong in **devDependencies**.

---

# Semantic Versioning

Libraries use **semantic versioning** to track changes.

Version numbers follow this format:

```
MAJOR.MINOR.PATCH
```

Example:

```
1.2.3
```

Meaning:

| Number | Meaning |
|------|---------|
| MAJOR | breaking changes |
| MINOR | new features |
| PATCH | bug fixes |

This system helps developers understand how updates might affect their code.

---

# Active Learning — Explore a Real `package.json`

Work in pairs.

Visit the npm page or GitHub repository for one of these libraries:

- nanoid
- date-fns
- lodash

Find the **`package.json`** file.

Answer these questions:

1. What is the package name?
2. What version is the library currently using?
3. What scripts are defined?
4. Does the project have dependencies or devDependencies?

Discuss your findings with your partner.

---

# Active Learning — Design a `package.json`

Now imagine you are publishing your **Homework 1 utility library**.

Write a basic `package.json` configuration.

Include at least these fields:

- name
- version
- description
- main
- types
- scripts

Example starting point:

```json
{
  "name": "array-utils",
  "version": "1.0.0",
  "description": "Utility functions for arrays"
}
```

Discuss your design with your group.

---

# Preparing for Later Assignments

Later in this course you will prepare a library for **real npm publication**.

Understanding `package.json` now will make that process much easier.

Real-world libraries depend heavily on good project configuration.

---

# Reflection

Answer the following questions:

1. Why is `package.json` important for libraries?
2. What is the difference between dependencies and devDependencies?
3. Why is semantic versioning important when publishing libraries?

Be prepared to discuss your answers in class.