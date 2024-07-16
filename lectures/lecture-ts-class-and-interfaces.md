<!-- .slide: data-background="./Images/header.svg" data-background-repeat="none" data-background-size="40% 40%" data-background-position="center 10%" class="header" -->
# ACS 3310 - TS Classes and Interfaces

<!-- > -->

The lesson covers classes and interfaces with TS.

<!-- > -->

## Classes & Interfaces

<!-- > -->

A class is object with specific properties and methods. Sounds like a type!

🐈

Your programs will expect the correct object type!

<!-- > -->

In addition to primitive types, we can denote the shape of a JavaScript object using type annotations:

```TypeScript
let user: { first: string, last: string, count: number } = { 
  first: 'Jane', 
  last: 'Smith',
  count: 222
};
```

Here we define `user` as an object with first: string, last: string, and count: number.

<!-- > -->

Define a class like this: 

```TypeScript
class Person {
  first: string
  last: string
  age: number

  constructor() {
    ...
  }
}
```

Note: properties and types are inside the class but outside the constructor!

<!-- > -->

We can also define the type ahead of time using an interface:

```TypeScript
interface Person {
  name: string;
  age: number;
  greet(message: string): string;
}

let user: Person = {
  name: 'Jane', 
  age: 22, 
  greet(message) { return this.name + message }
}
```

Any Person will have: name, age, and greet. 

<!-- > -->

What's important about interfaces is that they allow you to mix compatible types! 

```TypeScript
class Student {
  name: string
  age: number
  units: number
  greet() {}
}

class Instructor {
  name: string
  age: number
  vacationDays: number
  greet() {}
}

const persons: Person = [new Instructor(), new Student()]
```

<!-- > -->

Try these ideas out in example-8.ts and example-9.ts 

https://github.com/Tech-at-DU/typescript-intro
