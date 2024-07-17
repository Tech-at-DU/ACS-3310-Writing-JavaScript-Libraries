<!-- .slide: data-background="./Images/header.svg" data-background-repeat="none" data-background-size="40% 40%" data-background-position="center 10%" class="header" -->
# ACS 3310 Lecture: TS Classes and Interfaces

<small style="display:block;text-align:center">TS Classes and Interfaces</small>

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

# Classes 

<!-- > -->

Classes are used to create instances of objects. Objects store values as properties. These properties have types!

<!-- > -->

Consider the Person class below. It needs some types. 

```JS
class Person {
	constructor(name, age) {
		this.name = name 
		this.age = age
	}
}
```

<!-- > -->

In typescript the syntax for a class looks like this: 

```JS
class Person {
	name: string // instance variables!
	age: number  // set types here!

	constructor(name: string, age: string) {
		this.name = name 
		this.age = age
	}
}
```

<small>Person stores `name` a string, and `age` a number.</small>

<!-- > -->

Class methods are defined like functions: 

```JS
class Person {
	...
	describe(): string {
		return `${this.name} is ${this.age}`
	}

	setAge(newAge: number) {
		this.age = newAge
	}
}
```

<!-- > -->

Try `example-10.ts` and `example-11.ts`

<!-- > -->
