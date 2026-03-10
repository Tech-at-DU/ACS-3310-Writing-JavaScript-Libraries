# Inheritance vs. Composition

Inheritance is a design pattern where a new class is derived from an existing class. This is known as a class hierarchy.

## Inheritance

A child class inherits from a parent class. This allows the child to re-use code from the parent. The child can also override the behavior of the parent.

You can call the parent class's constructor using `super()`, which must be called before accessing `this` in the child constructor:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a noise.`;
  }
  describe() {
    return `${this.name} is an animal.`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Calls the parent class constructor
    this.breed = breed;
  }

  // Overrides the speak method in the super class
  speak() {
    return `${this.name} the ${this.breed} barks.`;
  }
  describe() {
    // Calls the describe method in the super class! 
    return `${super.describe()} It's a ${this.breed}.`;
  }
}

const fido = new Dog('Fido', 'Labrador');
console.log(fido.speak());     // "Fido the Labrador barks."
console.log(fido.describe());  // "Fido is an animal. It's a Labrador."
```

✅ **Check for Understanding:**

- What does the keyword `extends` do?
- How does method overriding work in a subclass?
- What are potential problems if you change the base class?

🤖 **AI Prompts:**

- "Explain how `super()` works in JavaScript class inheritance."
- "Generate an example of class inheritance in JavaScript using `Vehicle` and `Car`."

🧪 **Mini Challenge:**

- Add a `speak()` method to the `Dog` class that customizes the message further, e.g., includes breed or other quality.
- Create an instance of `Dog` and call both the `speak()` method and any new method you add.

---

## Composition

Composition is a design pattern where an object is composed of other objects. Composition favors "has-a" relationships over "is-a" relationships.

```js
class Engine {
  start() {
    return 'Engine starts';
  }
}

class Car {
  constructor() {
    this.engine = new Engine(); // Car has an Engine
  }
  drive() {
    return this.engine.start() + ' and car drives';
  }
}
```

✅ **Check for Understanding:**

- What does it mean for one object to “have” another object?
- How is composition implemented in JavaScript?
- What is the difference between delegation and inheritance?

🤖 **AI Prompts:**

- "Generate a class in JavaScript that uses composition to manage a logger."
- "How do I replace inheritance with composition in a class hierarchy?"

🧪 **Mini Challenge:**

- Write a class `Phone` that uses a `Battery` class to log charge level and turn on/off behavior.

---

## NeuDate (Inheritance Example)

In the code below we subclass from `Date` to create a new class `NeuDate`.

```js
class NeuDate extends Date {
  constructor(...args) {
    super(...args)
  }
  weekday() {
    return this.toLocaleString('en', { weekday: 'long' })
  }
}
```

🤖 **AI Prompt:**

- "Create a class in JavaScript that extends the `Date` object and adds a getter method to return the day of the week as a string."
- "Adds a getter method to return the month as a string."

---

## Composition version (D class)

In JavaScript, placing `#` in front of a property makes it a **private field**. This means the property cannot be accessed from outside the class.

```js
class Example {
  #hidden = 42;
  getHidden() {
    return this.#hidden;
  }
}

const e = new Example();
e.getHidden();  // ✅ works
e.#hidden;      // ❌ SyntaxError: Private field '#hidden' must be declared in an enclosing class
```

In **TypeScript**, private fields can also be declared using the `private` keyword:

```ts
class TSExample {
  private hidden: number = 42;
  getHidden(): number {
    return this.hidden;
  }
}
```

The `#` syntax is enforced at runtime in JavaScript, while `private` in TypeScript is only enforced at compile-time.

🤖 **AI Prompt:** 
- "What the difference between # (private) in JavaScript and the `private` keyword in TypeScript?"

---

Here is another version of a class that wraps around `Date`.

```js
class D {
  #date;
  constructor(...args) {
    this.#date = new Date(...args);
  }
  weekday() {
    return this.#date.toLocaleString('en', { weekday: 'long' });
  }
}
```

✅ **Check for Understanding:**

- What does the `#` symbol mean in front of a property?
- Why use # to mark `date` as private?
- How does `...args` preserve the behavior of the original `Date` constructor?

🤖 **AI Prompt:**

- "Explain the benefit of storing the `Date` object as a private field in a composed class."
- "Explain `args`"

---

## Modules

### Why Modules Matter

Modules help you organize, isolate, and reuse code. A module can define its own scope and expose only what is needed. In modern JavaScript, modules are first-class citizens thanks to the import and export syntax.

**Modules are special because:**

- They help keep code modular and maintainable
- Each module is evaluated once and cached
- You can control what is visible to other parts of your codebase
- They're compatible with bundlers like Rollup, Webpack, and native ESM in Node.js

📌 **Example:**
Instead of hardcoding a weekdays array in every class, you can import it from a shared module and use it consistently across your project.

🤖 **AI Prompt:**

- "Why should I use modules instead of writing everything in one file?"
- "What’s the difference between default and named exports in JavaScript modules?"

Sometimes you need to work with data that is static and shared between all instances. In this case, a module is the best tool.

```js
export const weekdays = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
```

✅ **Check for Understanding:**

- Why is it more efficient to import static data from a module than to create it per instance?

- What does it mean that modules are evaluated only once?

🤖 **AI Prompts:**

- "Convert the weekdays and months array into a reusable module that exports them."
- "What are the scoping rules of ES modules in JavaScript?"

🧪 **Extension Challenge:**

Split your `D` class into 2 files: one for the class and one for the constants. Import appropriately.

📦 **Integrating with the Library Project**

💡 You can add your `NeuDate` or `D` class to your utility library! Consider creating a submodule called DatePlus with your extended or composed date enhancements.

🤖 **AI Prompt:**

- "How would you export a class and utility function from the same JavaScript module?"
