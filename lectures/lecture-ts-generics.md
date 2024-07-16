# ACS 3310 Lecture TS Generics

## Generic types 

Generic types solve the situation where you have a function that defines a parameter that can take an argument of different types.

<!-- > -->

Imagine the following: 

```JS
const a = 22
const b = 'Zen'
const c = { name: 'Yin', age: 44 }

function sendItBack(thing: any): any {
	return thing
}

console.log(sendItBack(a))
console.log(sendItBack(b))
console.log(sendItBack(c))
```
How can you make this type safe?


<!-- > -->

There is something subtle going on here. The function above takes any type as an input and returns any type as an ouput. 

🔬

<!-- > -->

So what's the problem? There is no guarantee that the input will match the output! 

🍎 ➡️ 🍎

🍊 ➡️ 🍊

🍐 ➡️ 🍓 😱

<!-- > -->

Using `any` here works but it's not type safe. What if the function transformed the input into another type? 

<!-- > -->

While this example seems contrived, because it is, it is more common than you might think! 

Think of some examples where this might occur?

<!-- > -->

Where generics come into play often is Arrays. 

Think about functions like: `push`, `slice`, `splice` and `reverse`.

<!-- > -->

```JS
function sendItBackString(thing: string): string {...}
function sendItBackNumber(thing: number): number {...}
function sendItBackBoolean(thing: boolean): boolean {...}
// ... this tedious and impossible
```

Thisa is not a scalable solution! 

<!-- > -->

Solve this problem with a generic:

```JS
// Solve sendItBack with a generic type <T>
// Challenge - replace any with a generic type T
function sendItBack<T>(thing: T): T {
	return thing
}
```

The generic type is expressed as `<T>` and you'll use `T` where that type is needed. Here `thing` is type `T` and the function returns something of type `T`. 

<!-- > -->

Imagine you have a function that takes in an array, of any type, and it prints the type of each item in the array: 

```JS
const numbers = [1, 43, 6, 71, 8]
const names = ['Ann', 'Bob', 'Cen', 'Dan']
const objs = [{ name: 'Eun', age: 23 }, { name: 'Fin', age: 32 }]

function getTypes<T>(arr: T[]) {
	arr.forEach(thing => console.log(typeof thing))
}

// One function can handle an array of any type! 
getTypes(numbers) // number, number, number, number, number
getTypes(names)   // string, string, string, string
getTypes(objs)    // object, object
```

Again this is a contrived example but it does something that is not possible without generics.

<!-- > -->

Consider this example. The function here reverses an array, nevermind that Array.reverse() is a thing! For the function below to work it needs to know the type of the input array and the type of the output array. 

```JS
const numbers = [1,2,3,4]

function reverse<T>(arr: T[]): T[] {
	const rra: T[] = [] // new array of type T
	arr.forEach(item => rra.unshift(item))
	return rra
}

console.log(reverse(numbers)) // 4,3,2,1 
```

<!-- > -->

What's going on there? The function takes an array of type `T` and returns an Array of type `T`. Inside the function we declare an array `rra` of type `T` and return this. 

<!-- > -->

Consider this idea. You need to create a function that returns the next item from an array. The function needs to take in an array of any type, and return a function that returns a value that matches the type of the input array. 

<!-- > -->

```JS
function iterate<T>(arr: T[]): () => T {
	let i = -1
	return () => {
		i += 1
		return arr[i]
	}
}

const nextNumber = iterate([3,6,4,1,7,9])
const nextName = iterate(['An', 'Bo', 'Cy', 'De'])

console.log(nextNumber()) // 3
console.log(nextNumber()) // 6
console.log(nextName())   // An
console.log(nextName())   // Bo
```

Here the type of the input array needs to be known and the type of the the return value for the function that is returned. 

<!-- > -->

What if you need more than one generic type? 

<!-- > -->

Consider this: 

```TypeScript
function thing<T, U>(it: T, other: U): { a: T, b: U } {
	return { a: it, b: other }
}
```

Here there are two generic types T and U. 

<!-- > -->

- https://www.typescriptlang.org/docs/handbook/generics.html

<!-- > -->
