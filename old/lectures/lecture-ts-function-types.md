# ACS 3310 Lecture: TS Function Types

<small style="display:block;text-align:center">TS Functions as Types</small>

<!-- > -->

## Functions as Types
In Typescript functions are also expressed as types. 

A function that receives a function as a parameter or returns a function must describe that function as a type.

<!-- > -->

```TS
const add: (number, number) => number = (a: number, b: number ) => {
	return a + b
} 
```

<!-- > -->

For example: 

```JS
// This function returns a function that returns a string
function sayHello(): () => string {
	return () => 'Hello'
}
// This variable contains a function that returns a string
const hello = sayHello()
// Calling the function returns the string
console.log(hello())
```

Challenge modify the function above to take a string: Name as input and combine that with the output. The output of the returned function should read: `Hello ${name}`.

<!-- > -->

Let's try that again. Write a function that takes a number as input and returns a function. The returned function should return value multiplied by the input number. 

```JS 
function mathematizer(n: number): (number) => number {
	let sum = n
	return (x) => x * n
}

const m = mathematizer(3)
console.log(m(3))   // 9
console.log(m(2))   // 6
console.log(m(10))  // 30
console.log(m(111)) // 333

// Challenge - Write a function that takes a function doLater(). It should
// take a callback and a time in milliseconds. It should run the callback 
// after the time.

function doLater() {

}

doLater(() => {}, 2000) // executes the callback in 2 secs.
```

<!-- > -->

Try the challenges in `example-13.ts` and `example-14.ts`

<!-- > -->
