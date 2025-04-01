# ACS 3310 Lecture: Writing in TypeScript
In this class, you will begin writing TypeScript code and learn how to adapt your existing JS code to TypeScript.

---

## Why Is This Important? 🤔

Type safe code is an industry best practice. Expect to write code in TypeScript for professional projects.  
👩‍💻 

TypeScript will also force you to think about the types you use in the code you write, which will make you a stronger programmer.

```js
// What is going on here? What is a field and what is next? 
module.exports = (field) => function(next) { // 🤔
  this.populate(field);
  next();
};
```

---

## Learning Objectives

1. Define static & dynamic typing
2. Explain the pros & cons of static vs. dynamic typing
3. Convert existing JS code to TypeScript
4. Implement functions, enums, & interfaces using TypeScript
5. Use AI to convert JS to TS and catch errors
6. Write Jest tests for TypeScript files

---

## Static vs. Dynamic Typing

### 💬 What is a type?
Data types describe the *shape* of the data that we're expecting.

Common types: `string`, `number`, `boolean`, `object`, `array`, `class`

---

### 🧠 Static Typing

In statically typed languages, variable types are *fixed*.

```ts
let x: number = 88; // x is always a number
```

Checked at *compile time*.

🧠 **Check for Understanding:** What happens if you assign `x = 'hello'`?

Static typed languages: Java, C++, Swift, **TypeScript**

---

### Dynamic Typing

In dynamically typed languages, variable types can change:

```js
let x = 10;   // Number
x = 'hello';  // String 😱
```

Checked *at runtime*. Can lead to hidden bugs.

Dynamic typed languages: Python, PHP, Ruby, **JavaScript**

---

## JS vs TS

- JS is dynamic → harder to debug large projects
- TS is compiled → safer, but slower to write

> **🍎 TS must be compiled to JS. Browsers can't run TS directly.**

---

## Why Use Static Types?

- ✅ Catch bugs earlier
- ✅ Improve readability
- ✅ Enable autocompletion + intellisense
- ✅ Easier refactoring

💬 **Discussion:** List 3 pros of static typing vs dynamic.

🤖 **AI Prompt:** "What are the advantages of TypeScript over JavaScript?"

---

### Code Example – Debugging with Types
```js
function getPriceWithTax(amount, rate) {
  const price = amount.toFixed(2);
  const tax = price * rate;
  return price + tax;
}
```

Q: What type is `price`? Is `price * rate` valid?

---

### Code Example – Mystery Types
```js
function mystery(x) {
  if (x.powerLevel <= 100) x.leave();
  else x.display();
}
```
What is `x`? What other properties/methods does it have?

Now with TypeScript:
```ts
class Cat {
  powerLevel: number;
  leave(): void {}
  display(): void {}
}
function mystery(x: Cat) { ... }
```

✅ More readable, discoverable, and testable

---

### IDE Power

VSCode uses TS types for:
- 🧠 Autocomplete
- 🔎 Cmd-click to jump to definition
- 🔁 Refactor warnings

---

## Benefits of Dynamic Typing

- Faster to write code
- More concise
- No compilation step

🤖 **Prompt:** "When is dynamic typing useful?"

---

## 🚀 Getting Started with TypeScript

Try this 5 min tutorial:
👉 https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

Reflect:
- What surprised you?
- What was different from JS?
- What problems does TS solve?

Install TypeScript:
```bash
npm install -g typescript
```
Compile your code:
```bash
tsc index.ts  # outputs index.js
```

Use `.ts` for TypeScript files.

🧠 Check: What happens if you forget to compile?

---

## Try These Files:

https://github.com/Tech-at-DU/typescript-intro

- Start with `example-2.ts`

---

## TypeScript Features

### ✅ Variables
```ts
let name: string = 'Ada';
let age: number = 22;
let isAdmin: boolean = true;
```

---

### ✅ Functions
```ts
function add(x: number, y: number): number {
  return x + y;
}
add(2, 3); // 5
add('2', 3); // ❌ Compile error
```

🤖 **Prompt:** "Add type annotations to this JS function: function greet(name) { return 'Hello ' + name; }"

---

### ✅ Optional & Default Params
```ts
function greet(name = 'guest') {
  console.log(`Hello, ${name}!`);
}
```

---

### ✅ The `any` Type
```ts
let data: any = 42;
data = 'hello';
```
Use sparingly — defeats the purpose of TypeScript!

🤖 **Prompt:** "When should I use the 'any' type in TypeScript?"

---

### ✅ Arrays and Tuples
```ts
let nums: number[] = [1, 2, 3]; // Array
let pair: [string, number] = ['Alice', 30]; // Tuple
```

🧠 Check: What happens if you push a string into `nums`?

---

### ✅ Enums
```ts
enum Fruit { Apple, Orange, Pear } // Enum Fruit
let snack: Fruit = Fruit.Orange;
```

Use enums to replace string literals in options or states.

---

## 🔧 Interfaces
```ts
interface User {
  id: number;
  name: string;
  isAdmin?: boolean; // optional
}
```

🧪 Challenge: Write a function that accepts a `User` and returns a greeting string.

🤖 **Prompt:** "Write a TypeScript interface for a product with id, title, and price."

---

## 🧪 Testing with TypeScript + Jest

1. Install Jest & ts-jest:
```bash
npm install --save-dev jest ts-jest
npx ts-jest config:init
```

2. Create `sum.ts`:
```ts
export function sum(a: number, b: number): number {
  return a + b;
}
```

3. Create `sum.test.ts`:
```ts
import { sum } from './sum';
test('adds numbers', () => {
  expect(sum(2, 3)).toBe(5);
});
```

Run tests:
```bash
npm run test
```

---

## 🧪 Project Integration

🎯 Update your ACS 3310 library project to use TypeScript:
- Rename `index.js` → `index.ts`
- Add type annotations
- Use interfaces or enums where possible

🤖 **Prompt:** "Convert this JS module to TypeScript with proper types."

---

## 🧠 TypeScript Playground

Play with types online — no install needed:  
👉 https://www.typescriptlang.org/play

Try out:
- Adding types
- Hover to see inferred types
- See compiled JS on the right

---

## 🎯 Wrap-Up

- ✅ Why TypeScript?
- ✅ Static vs dynamic types
- ✅ Adding types to functions
- ✅ Using TS with Jest
- ✅ How to refactor JS to TS
- ✅ Using AI to support TS learning

Great job! 🎉
Let’s apply this to your own libraries next. 🔧
