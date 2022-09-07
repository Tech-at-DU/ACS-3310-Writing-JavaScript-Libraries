<!-- .slide: data-background="./Images/header.svg" data-background-repeat="none" data-background-size="40% 40%" data-background-position="center 10%" class="header" -->
# ACS 3310 - API Lib

<!-- > -->

This project will create a library that works with an API.

⚙️

<!-- > -->

APIs are used everywhere and are an important part of the web ecosystem. 

🌍

<!-- > -->

Libraries make working with APIs easier. 

🧰

<!-- Put a link to the slides so that students can find them -->

<!-- ➡️ [**Slides**](/Syllabus-Template/Slides/Lesson1.html ':ignore') -->

<!-- > -->

## Learning Objectives 

1. Describe and define callback functions
1. Use callback functions
1. Describe Promise it's uses and states
1. Use Promise in Aynchronous code 
1. Describe uses and functions of `aysnc` and `await`
1. Use `aysnch` and `await` to handle asynchronous calls

<!-- > -->

Follow these lessons in these videos: 

- [Callbacks](https://www.youtube.com/watch?v=x4FqqFCduuM&list=PLoN_ejT35AEioZ_5TEk0h3LVqzT-EoM2M&index=21&t=20s)
- [Promises](https://www.youtube.com/watch?v=vRPhVPGuSd4&list=PLoN_ejT35AEioZ_5TEk0h3LVqzT-EoM2M&index=22)
- [Async Await](https://www.youtube.com/watch?v=4exyyvKJ_GI&list=PLoN_ejT35AEioZ_5TEk0h3LVqzT-EoM2M&index=23)
- [Challenges](https://www.youtube.com/watch?v=RfZQDxfrRt8&list=PLoN_ejT35AEioZ_5TEk0h3LVqzT-EoM2M&index=24)

<!-- > -->

## What's a callback? 

<!-- > -->

A callback is a function that invoked by another function. A callback is often used with asynchronous actions like handling network requests. 

<!-- > -->

Some examples of callbacks: 

- `setInterval()` and `setTimeOut()` use a callback to run code after time period is over. 
- `map()`, `filter()`, and `reduce()` use a callback to execute code with each iteration. 
- `addEventListener()` uses a callback to run code when an event occurs. 

<!-- > -->

In practical terms a callback is a function passed to another function or method as an argument.

```JS
function hello() {
  console.log('Hello World')
}

setTimeout(hello, 3000) // hello callback runs 3 secs later
```

<!-- > -->

In javascript a function is value and can be assigned or passed around your code just like any other type of value. 

```JS
// doStuff is a function
function doStuff(n) { 
  return n * 2
}

// doStuff can be assigned to variables: 
const doingThings = doStuff
doingThings(11) // returns 22

// Passed as a parameter (it's a callback here)
[1,2,3,4].map(doStuff) // returns [2, 4, 3, 8]
```

<!-- > -->

A callback is the function you pass to a parameter as an argument. 

**Important: Arrow functions work best for callbacks!**

<!-- > -->

Q: What's a parameter? 

A: A variable that stores a value received by a function

```JS
function doStuff(n) {  // n is the parameter
  return n * 2
}
```

<!-- > -->

Q: What's an argument? 

A: An argument is the value passed to a function. 

```JS
doStuff(2) // 2 is the argument! 
```

<!-- > -->

### Implement a function with a callback

<!-- > -->

You have probably used the OpenWeatherMap API before. 

Imagine you want take your code to the next level. 

Do this using callbacks!

<!-- > -->

Start with a function that takes a callback as a parameter! 

```JS 
function getWeather(callBack) {
  // gets the weather data...
  // Then executes the callback function

  callback()
}
```

Notice `callback` is the name of a parameter variable and this function is invoked on the last line. 

<!-- > -->

How would you use this? 

```JS 
function getWeather(callBack) {
  // gets the weather data...
  // Then executes the callback function

  callback() // handleWeather is executed here! 
}

function handleWeather() {
  // Something happens here after the weather data is loaded. 
}

getWeather(handleWeather) // call getWeather and pass the callback
```

Here `handleWeather` is a function that is passed to `getWeather` and is executed as `callback` there. 

<!-- > -->

Or use an inline/anonymous function. 

```JS 
function getWeather(callBack) {
  // gets the weather data...
  // Then executes the callback function

  callback() // The anonymous function runs here!
}

// Arrow functions are best for callbacks!
getWeather(() => {
  // something happens here after the weather data is loaded
})

```

<!-- > -->

Make your callback more useful by adding parameters. 

```JS 
function getWeather(callBack, apikey, units) {
  // Gets the weather with apikey and units...
  // Calls the callback

  callback()
}
```

<!-- > -->

Q: How do you get data from a callback? 

A: Pass it as a parameter!

```JS 
function getWeather(callBack, apikey, units) {
  // loads json with apikey and units
  const json = ...

  callback(json) // passes JSON to callback
}

// Our callback receives JSON in data
getWeather( (data) => { 
  // do stuff with data/json received from callback
})
```

<!-- > -->

Q: What if there is an error? 🤔

A: Add an error callback! 😮

<small>This is how most JS methods handled errors before promises. Many systems still use this arranegment.</small>

<!-- > -->

```JS 
function getWeather(apikey, units, onSuccess, onError) {
  fetch(...)
    .then((data) => {
      onSuccess(data)
    })
    .catch((error) => {
      onError(error)
    })
}
// Call getWeather with two callbacks
getWeather('myapikey', 'metric', (data) => { 
  // onSuccess callback receives json here!
}, (err) => {
  // onError callback receives an error
})
```

<small>onSuccess, and onError are the two callbacks!</small>

<!-- > -->

Or write all of that in separate functions. 

```JS 
function getWeather(apikey, units, onSuccess, onError) {
  ...
}

getWeather('myapikey', 'metric', handleData, handleError)

function handleData(data) { // receives json here!
  // do stuff with data received from callback
}

function handleError(err) {
  // something went wrong
}
```

<small>Notice both callbacks receive an argument!</small>

<!-- > -->

This is starting to get complicated. 

You can simplify this by using a Promise 

<!-- > -->

## Promise

<!-- > -->

Promise is an object that is used to handle asynchronous actions. 

A Promise works with callbacks you can think of Promise as managing both the success 🙌 and error callbacks 👎. 

<!-- > -->

```JS 
function getWeather() {
  // Fetch returns a Promise
  return fetch(...) // Return the Promise
}

getWeather() // Call then() and catch() on the Promise 
  .then((data) => {
    onSuccess(data)
  })
  .catch((error) => {
    onError(error)
  })

function handleData(data) { ... }

function handleError(err) { ... }
```

The `Promise.then()` and `Promise.catch()` methods take the callbacks you used earlier. 

Promise decides which to execute.

<!-- > -->

### async and await

<!-- > -->

The `async` and `await` keywords are used to handle Promises.

<!-- > -->

Any function that that begins with `async` will return a Promise, even if you don't explicitly return a promise in the code block.

```JS
async function something() {

}

something().then().catch()
```

<!-- > -->

The `await` key word can only be used inside of an `async` function. Use it to resolve a Promise. 

```JS 
async function getWeather() {
  const res = await fetch() // code stops here and waits for promise to resolve
  const json = await res.json() // waits here for promise to resolve
  return json // Returns json wrapped in a promise!
}

getWeather().then(json => ...)
```

<!-- > -->

## Using a callback with an API

<!-- > -->

The following examples are more detailed and turn the previouse examples into actual code. 

<!-- > -->

Start with some no frills code. Start here: 

https://github.com/Tech-at-DU/weather-api

Follow the instructions in the readme.

<!-- > -->

## Here are a few ideas

Working with the code above apply the following ideas. 

<!-- > -->

Set up some callbacks. You'll need one for success and one for error. 

```JS
// -------------------------------------------------------------------
// Use a callback to handle data and errors. This is old school and 
// is the basis for all of the other examples here. 
function getWeather(zip, apiKey, success, error) {
  const units = 'imperial'
  const path = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=${units}`
  console.log('**** getWeather ****')
  fetch(path)
    .then(res => res.json())
    .then(json => success(json))
    .catch(err => error(err))
}
```

<!-- > -->

Externally you would use the function above like this: 

```JS 
getWeather('94010', 'mykey', onSuccess, onError)

function onSuccess(json) { ... }

function onError(err) { ... }
```

<!-- > -->

Your code could return a Promise. Simplest would be to return 

```JS 
// -------------------------------------------------------------------
// Use a promise to handle data and errors
function getWeatherPromise(zip, apiKey) {
  const units = 'imperial'
  const path = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=${units}`
  // Return a Promise 
  return fetch(path).then(res => res.json())
}
```

<!-- > -->

Externally uou would use the code above like this: 

```JS 
getWeatherPromise('94102', 'mykey')
  .then(onSuccess)
  .catch(onError)

function onSuccess(json) { ... }

function onError(err) { ... }
```

<!-- > -->

You could also use aysnc and await. 

```JS
async function getWeatherAsync(zip, apiKey) {
  const units = 'imperial'
  const path = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=${units}`
  
  // Await each of these Promises to resolve 
  // (await only works inside functions marked async)
  const res = await fetch(path) // waits for the promise to resolve
  const json = await res.json() // waits for the promise to resolve

  return json
}
```

<!-- > -->

This works exactly the same as the previous example and would be called the same from outside. 

```JS 
getWeatherPromise('94102', 'mykey') // async function returns a Promise!
  .then(onSuccess)
  .catch(onError)

function onSuccess(json) { ... }

function onError(err) { ... }
```

<!-- > -->

## Improving the Experience

<!-- > -->

The current data from OpenWeatherMap is really hard to parse.

- Has multiple levels of data stored
- Some of the keys use the same names
- Some of the keys are confusing

<!-- > -->

You can improve on this. 


Currently OpenWeatherMap is returning something that looks like this: 

```JS
{
  base: "stations",
  clouds: {all: 75},
  cod: 200,
  coord: {lon: -122.48, lat: 37.76},
  dt: 1588021159,
  id: 0,
  main: {
    feels_like: 47.68
    humidity: 55
    pressure: 1021
    temp: 62.76
    temp_max: 66.2
    temp_min: 57.99
  },
  name: "San Francisco",
  sys: {type: 1, id: 5817, country: "US", sunrise: 1587993483, sunset: 1588042595},
  timezone: -25200,
  visibility: 16093,
  weather: [
    {id: 803, main: "Clouds", description: "broken clouds", icon: "04d"}
  ],
  wind: {speed: 25.28, deg: 270}
}
```

<!-- > -->

That's really hard to grasp. What's the difference between `main` and `weather`? Main has the temperature but weather has the description of the weather conditions. Main really seems to be about the temp and air pressure. 

Why is weather an array with only one value? Everything else is objects.

You could improve on this, developers would thank you. 

<!-- > -->

Format a better data object. 

```JS
async function getWeatherAsync(zip, apiKey) {
  const units = 'imperial'
  const path = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=${units}`
  
  const res = await fetch(path) 
  const json = await res.json() 

  // Get all of the relavant info 
  const { base, clouds, cod, coord, dt, id, main, name, sys, timezone, visibility, weather, wind } = json
  const { temp, pressure, humidity, temp_max, temp_min } = main
  const { description, icon } = weather[0]
  // Reformat the object that is returned
  return { temp, pressure, humidity, temp_min, temp_max, clouds, cod, visibility, wind, description, icon }
}

```

<!-- > -->

## Homework

[API Lib](../assignments/assignment-09.md)

<!-- > -->

## Wrap Up

- Continue working on your current tutorial
- Complete reading
- Complete challenges

<!-- > -->

## Additional Resources

1. 

<!-- > -->

## Minute-by-Minute [OPTIONAL]

| **Elapsed** | **Time**  | **Activity**              |
| ----------- | --------- | ------------------------- |
| 0:00        | 0:05      | Objectives                |
| 0:05        | 0:15      | Overview                  |
| 0:20        | 0:30      | In Class Activity I       |
| 0:50        | 0:10      | BREAK                     |
| 1:00        | 0:45      | In Class Activity II      |
| 1:45        | 0:05      | Wrap up review objectives |
| TOTAL       | 1:50      | -                         |
