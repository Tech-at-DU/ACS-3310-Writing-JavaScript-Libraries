# Homework 3 — Event Emitter Library

## Overview
In this assignment you will build a small **Event Emitter library** using **TypeScript**.

Event emitters are a common pattern used in many JavaScript systems. They allow parts of a program to **emit events** and other parts to **listen for those events**.

Examples of systems that use event emitters include:

- Node.js EventEmitter
- browser DOM events
- many frontend frameworks

Your goal is to design and implement a **small reusable event emitter library**.

---

# Learning Goals

By completing this assignment you will practice:

- Designing a **stateful library API**
- Implementing an **event-driven architecture**
- Using **TypeScript types and generics**
- Writing tests for event behavior
- Designing a clear public API

---

# Assignment

Create a library that allows code to **register listeners for events and emit events**.

Your library should expose an `EventEmitter` class.

Example usage:

```ts
const emitter = new EventEmitter()

emitter.on('message', msg => {
  console.log(msg)
})

emitter.emit('message', 'hello world')
```

Expected output:

```
hello world
```

---

# Practical Example: Chat Application

Event emitters are useful when **different parts of a program need to react to something happening**, but those parts should not be tightly connected to each other.

Imagine a simple chat application.

One part of the program receives messages from a server. Another part of the program displays those messages in the user interface.

Instead of directly calling UI code, the network layer can **emit an event** when a message arrives.

Example:

```ts
const emitter = new EventEmitter()

// UI component
emitter.on('message', msg => {
  console.log('Display message:', msg)
})

// Network layer
function receiveMessageFromServer(text: string) {
  emitter.emit('message', text)
}

receiveMessageFromServer('Hello!')
```

In this design:

- The **network code** does not need to know anything about the UI
- The **UI listens for events** and reacts when they happen

This pattern is very common in real systems such as:

- user interface frameworks
- multiplayer games
- logging systems
- plugin systems

Event emitters help make software **more modular and easier to extend**.

---

# Required Features

Your event emitter must support the following methods.

## `on(event, listener)`
Register a listener for an event.

Example:

```ts
emitter.on('login', user => {
  console.log(user.name)
})
```

Requirements:

- Multiple listeners may be registered for the same event
- Listeners should be called in the order they were added

---

## `emit(event, data)`
Trigger an event and call all listeners for that event.

Example:

```ts
emitter.emit('login', { name: 'Ana' })
```

Requirements:

- All listeners for the event should run
- Each listener receives the emitted data

---

## `off(event, listener)`
Remove a listener.

Example:

```ts
function handler(msg) {
  console.log(msg)
}

emitter.on('message', handler)
emitter.off('message', handler)
```

Requirements:

- After removal, the listener should no longer be called

---

## `once(event, listener)`
Register a listener that runs **only once**.

Example:

```ts
emitter.once('ready', () => {
  console.log('ready!')
})
```

Requirements:

- The listener should automatically be removed after the first call

---

# TypeScript Requirement

Your event emitter should be **typed** so that events can specify the type of data they emit.

Example typed event map:

```ts
interface Events {
  message: string
  login: { name: string }
}
```

Example emitter usage:

```ts
const emitter = new EventEmitter<Events>()

emitter.on('message', msg => {
  msg.toUpperCase()
})
```

TypeScript should enforce that listeners receive the correct type of data.

---

# Project Structure

Your project should follow a structure similar to this:

```
emitter-lib/
  src/
    EventEmitter.ts
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

- Test registering listeners
- Test emitting events
- Test removing listeners
- Test `once` listeners

Example:

```ts
emitter.on('event', handler)
emitter.emit('event')

expect(handler).toHaveBeenCalled()
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
const emitter = new EventEmitter()

emitter.on('message', msg => console.log(msg))

emitter.emit('message', 'hello')
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
| TypeScript typing | 20 |
| Event emitter behavior | 20 |
| Tests | 20 |
| Documentation | 15 |

---

# Tips

Start by designing your API before writing code.

Write down:

- What methods your emitter exposes
- What arguments they accept
- How events should be stored internally

A good event emitter implementation typically stores listeners in a structure like:

```
{
  eventName: [listener1, listener2]
}
```

Focus on making your library **easy to use and well tested**.
