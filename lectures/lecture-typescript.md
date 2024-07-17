<!-- .slide: data-background="./Images/header.svg" data-background-repeat="none" data-background-size="40% 40%" data-background-position="center 10%" class="header" -->
# ACS 3310 Lecture: Writing in TypeScript

<small style="display:block;text-align:center">Writing TypeScript</small>

<!-- > -->

In this class, you will begin writing TypeScript code and learn how to adapt your existing JS code to TypeScript.

<!-- > -->

## Why Is This Important? 🤔

<!-- > -->

Type safe code is an industry best practice. Expect to write code in TypeScript for professional projects.  

👩‍💻 

<!-- > -->

TypeScript will also force you to think about the types you use in the code you write which will make a you a stronger programmer.

```js
module.exports = (field) => function(next) { // 🤔
  this.populate(field);
  next();
};
```

<!-- > -->

## Learning Objectives

1. Define static & dynamic typing
2. Explain the pros & cons of static vs. dynamic typing
3. Convert existing JS code to TypeScript
4. Implement functions, enums, & interfaces using TypeScript

<!-- > -->

## Static vs. Dynamic Typing

<!-- > -->

### Q: What is a type?

Data types describe the *shape* of the data that we're expecting.

Example types found in many languages: 

`string`, `number`, `boolean`, `object`, `array`, any `class` is a type

<!-- > -->

### Q: What is static typing?

In a statically typed language, variable types are *static*, meaning that once a variable is set to a type, it cannot be changed. 

```js
x = 88 // once a number, x is always a number
```

<!-- > -->

Statically typed languages generally check *at compile time* that a variable is being assigned the correct type of data. 

Examples of statically typed languages include Java, C, C++, Swift and **TypeScript**.

<!-- > -->

**Q:** Can you use static typing in JS?

**A:** Nope. JavaScript is a dynamically typed language.

<!-- > -->

TypeScript is another language separate from JS and must be compiled into vanilla JS. 

🍎 ➡️ 🥧

**You can't use TypeScript in environments that expect JavaScript, for example the browser.**

You compile your TypeScript into vanilla JavaScript. 

<!-- > -->

### What is dynamic typing?

<!-- > -->

In a dynamically typed language, a variable's type can change over the course of the program. Consider the following code:

```JavaScript
let x = 10       // x starts as a Number
x = 'hello'      // x becomes a String
```

Usually you won't do this on purpose, **most often it will happen by accident.** 😱

<!-- > -->

In a dynamically typed language, we do not know *until runtime* what type of data a particular variable holds.

 📦 🤔

<!-- > -->

Examples of dynamically typed languages include Python, PHP, Ruby, and **JavaScript**,.

<!-- > -->

## Why use one or the other?

**Discussion:** Write down 3 reasons each for using either a statically typed or dynamically typed language.

<!-- > -->

### Static typing catches errors earlier in program development.

<!-- > -->

**Q:** What is happening on each line of code below?

```JavaScript
function getPriceWithTax(amount, rate) {
  const price = amount.toFixed(2)
  const tax = price * rate
  return price + tax
}
```

<small>Ask yourself what type is assigned the variables at each line.</small>

What could possibly go wrong? 🤔

<!-- > -->

### Static typing improves readability 🥸

<!-- > -->

Consider this code 🔎:

```JavaScript
function mystery(x) {
  if (x.powerLevel <= 100) {
    x.leave();
  } else {
    x.display();
  }
}
```

Now, consider the following questions:
- What is x?
- What other fields, data, and behavior does x have? 
- How else can I interact with x?
- How would I find this information?

<!-- > -->

Now, let's take a look at this code with some types added. 😎

```TypeScript
class Cat {
  powerLevel: number;
  personality: string;
  appearance: string;
  photo: Image;
  leave(): void { ... }
  display(): void { ... }
}

function mystery(x: Cat) { ... }
```

<!-- > -->

### Static typing can improve your workflow ⚒️

<!-- > -->

Since our types are set in stone at compile time, many code editors will use that information to give you smart autocomplete suggestions based on that particular data type. 

<!-- > -->

If you use VSCode, you can use Intellisense to browse available methods from a class while writing code. You can also Cmd+Click on a method name to go directly to its definition.

<!-- > -->

### Advantages of dynamic typing 🧐

<!-- > -->

There isn't just one right answer that works in all scenarios; you will need to decide which style is right for your project. 

<!-- > -->

Here are some pros of _dynamic_ typing to consider:

- It's faster to write
- It's more succinct
- Doesn't require extra compilation step

<!-- > -->

Advantages of static typing: 

- Spots errors faster
- When there's a type error it's obvious
- Code is self documenting

<!-- > -->

## Challenge: Getting started with Typescript

Take a look at this 5 min tutorial from the source. Take 5 mins and do the tutorial. 

https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

<!-- > -->

- What did you see in the tutorial? 
- Compare typescript and JavaScript?
- Did you see anything new? 

<!-- > -->

Install typescript: 

https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html

<!-- > -->

Tl;dr

Install TypeScript

```
npm install -g typescript 
```

Compile your TypeScript code

```
tsc src/index.ts
```

Creates: index.js from index.ts

<!-- > -->

TypeScript files use the `.ts` file extension. Convert any JS file to TypeScript by changing the name to `.ts`.

📄.js ➡️ 📄.ts

<!-- > -->

## Features of TypeScript 

<!-- > -->

Follow the example with these files:

https://github.com/Tech-at-DU/typescript-intro

Your source code will be the files named: .ts 

Typescript files must be compiled into .js before they can be used. 

- `npm install -g typescript`
- `tsc example-2.ts`

<!-- > -->

### Variables

The basic types are `string`, `number`, and `boolean`. 

You can't reassign a different type.

```TypeScript
let y = 88;           // implicitly typed number
let sum: number = 10; // explicitly typed number
const title: string = 'hello'; // type string
let done: boolean = false;     // type boolean

sum = undefined;  // OK
sum = null;       // OK
sum = '100';      // Not OK - will result in a compile error
Math.round(title) // Compile error - round expects a number
```

<!-- > -->

Try these ideas out in example-2.ts 

https://github.com/Tech-at-DU/typescript-intro

<!-- > -->

### Functions, Parameters, and Return types

<!-- > -->

You can add types to the parameters and return values of functions:

```TypeScript
// Add types to each parameter, and a type for the return value
function add(num1: number, num2: number): number {
  return num1 + num2;
}

const x = add(4, 6); // x is type number implcitly
const y: number = add(2, 7); // explicit type
const z = add('2', 7); // Compile Error
const w: string = add(6, 1); // Compile Error
```

<!-- > -->

Try these ideas out in example-3.ts

https://github.com/Tech-at-DU/typescript-intro

<!-- > -->

You can also use default and optional parameters. If you want to skip one, just pass in `undefined`:

```TypeScript
function greet(greeting = 'Hello', person?: string) {
  if (person) {
    console.log(`${greeting}, ${person}!`);
  } else {
    console.log(`${greeting}!`);
  }
}

greet();       // prints 'Hello!'
greet('Hola'); // prints 'Hola!'
greet(undefined, 'Jane'); // prints 'Hello, Jane!'
```

<!-- > -->

Finally, if you don't know what type a piece of data will be, e.g. if you're receiving it from an API, you can always use the `any` type:

```TypeScript
let someValue: any = 10; // some value is a number
someValue = [1, 2, 3];   // some value is now an array
```

<!-- > -->

Try these ideas out in example-4.ts 

https://github.com/Tech-at-DU/typescript-intro

<!-- > -->

### Arrays and Tuples

<!-- > -->

There are two ways to declare an array, which are completely equivalent (if you've used Java before, these should look familiar):

```TypeScript
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
```

Note! Every memeber of an array must be the same type. 

<!-- > -->

What if we want an array with mixed values of different types? In that case, we can use the 'tuple' type:

```TypeScript
let person1: [string, number] = ['Jane', 20];
```

<!-- > -->

Try these ideas out in example-5.ts and example-6.ts

https://github.com/Tech-at-DU/typescript-intro

<!-- > -->

An enumeration is a list of all possible choices: 

🍎 🍊 🍐

<!-- > -->

Use an enum when your program will:

- Make a choice from a fixed list 
  - zip, city, geo
- Has a fixed list of values or responses
  - North, South, East, West

<!-- > -->

Define an enum like this:

```TypeScript
enum Fruit { 
  Apple, 
  Orange, 
  Pear 
};
```

<!-- > -->

Use an enum like this: 

```TypeScript
enum Fruit { Apple, Orange, Pear };

let f: Fruit = Fruit.Pear; // 🍐
```

<!-- > -->

Why did we use an enum? 🤔

```TypeScript
enum Fruit { Apple, Orange, Pear };

let f: Fruit = Fruit.Pear;

switch(f) {
  case Fruit.Apple:
    ...
  case Fruit.Orange:
    ...
  case Fruit.Pear:
    ...
}
```

Notice you didn't use any strings! Enum is more reliable than a string!

<!-- > -->

Try these ideas out in example-7.ts 

https://github.com/Tech-at-DU/typescript-intro

<!-- > -->
