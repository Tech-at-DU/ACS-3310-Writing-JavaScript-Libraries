<!-- .slide: data-background="./Images/header.svg" data-background-repeat="none" data-background-size="40% 40%" data-background-position="center 10%" class="header" -->
# ACS 3310 Lecture: TS Enums

<small style="display:block;text-align:center">TS Enums</small>

<!-- > -->

## Learning Objectives
1. Define instance properties and their types
1. Use enums
1. Use generics
1. Write types for functions

<!-- > -->

# Review 

Download the examples here: https://github.com/Tech-at-DU/typescript-intro

Take a look at `example-8.ts` and `example-9.ts` add the types and compile it. 

<!-- > -->

# Enumerations 

<!-- > -->

An enumeration is a named set values. These act like constants you might define to describe all of the possible choices that are be avaiable. 

<!-- > -->

Use enumerations, enum for short, to name the possible choices. 

For example: 

- Units - Metric, Standard, Imperial
- Direction - North, South, East, West

<!-- > -->

Why use an enum? 

- More reliable than strings 
- Descriptive choices
- Prevents erroneous values

<!-- > -->

Consider this typical scenario: 

```JS
function getWeather(zip, apikey, unit = 'metric') {
  // ...
}
```

Using a string to represent a range of possible values for unit.

```JS
getWeather(zip, apikey, 'millimeters') 
```

What could go wrong? 

<!-- > -->

**Constants**: Defining contants is good but doesn't show that these values work together. Your constants are in a pool of other variables. 

```JS
const METRIC = 'metric'
const IMPERIAL = 'imperial'
const STANDARD = 'standard'
const KEY = '123456'

function getWeather(zip, apikey, unit = METRIC) {
  // ...
}
```

Better, but what is STANDARD? What is KEY could it be a unit? 

<!-- > -->

Another possible choice might be an **object**: 

```JS
const Units = {
  metric: 'metric',
  imperial: 'imperial',
  standard: 'standard'
}

function getWeather(zip, apikey, unit = Units.metric) {
  // ...
}
```

This is getting better but not perfect. 

```JS
Units.millimeters = 'mm'
```

<!-- > -->

With typescript you can define an enum! 

```TS
enum Unit {
  metric,
  imperial,
  standard
}

function getWeather(
	zip: string, apikey: string, unit: Unit = Unit.metric) {
  // ...
}
```

<!-- > -->

These are the possible choices for units in the openweathermap API. Unlike the methods above TypeScript would check against the enum and would show an error if we used a value not on the list! 

<!-- > -->

In many situations you have a limited set of choices and your program should always choose from that set. An enum guarantees that you will always choose from the possible choices! 

<!-- > -->

Under the hood enums are just objects with keys. You could have done this but TypeScript does it for you and adds error checking! 

<!-- > -->

Imagine you are making a game or mapping app. It needs to work with the compass directions.

```TS
// Define an enum that represents the possible directions 
enum Direction {
	North, South, East, West
}
```

<!-- > -->

An enum can be used as a value and a type. The function takes the `Direction` enum as the parameter and check it against possible cases in the switch block. 

```TS
function move(direction: Direction) { // direction is enum type
	switch(direction) {
		case Direction.E:
			// Go East
		case Direction.W:
			// Go West
		case Direction.N:
			// Go North
		case Direction.S: 
			// Go South
	}
}
```

<!-- > -->

So what's the value of an enum? 

```TS
console.log(Direction.N) // 0
```

Under the hood an enum is an array and each of the cases is just the index of that case. 

<!-- > -->

Some times it's useful to assign a value to each case of an enum. For example maybe our program needs to print the direction.

<!-- > -->

With the current code this `printDirection` function is not very useful.

```TS
let currentDirection = Direction.N

function printDirection() {
	console.log(`You are travelling ${currentDirection}`)
}

printDirection()
```

The output here is: `You are travelling 0` which isn't very useful. 

<!-- > -->

Each case for an enum can also be a value.

```TS
enum Direction {
	N = 'North', // Set each case to a string
	S = 'South',
	E = 'East',
	W = 'West',
}
```

With this change everything works the same as before but the value of the enum is represented as the strings you defined: 

```TS
console.log(Direction.N) // 'North'
printDirection() // You are travelling North
```

<!-- > -->

Try the challenges in `example-12.ts`

<!-- > -->

Read more about enums here: 

- https://www.typescriptlang.org/docs/handbook/enums.html
- https://2ality.com/2020/01/typescript-enums.html
- https://en.wikipedia.org/wiki/Enumerated_type

<!-- > -->
