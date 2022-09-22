<!-- .slide: data-background="./Images/header.svg" data-background-repeat="none" data-background-size="40% 40%" data-background-position="center 10%" class="header" -->
# ACS 3310 - JavaScript Dates

<small style="display:block;text-align:center">Dates and Date Lib</small>

<!-- > -->

Time for another library! This time you'll make a library that works with Dates.

📆 ⏰ ⌛️

<!-- > -->

<!-- Put a link to the slides so that students can find them -->
<!-- 
➡️ [**Slides**](/Syllabus-Template/Slides/Lesson1.html ':ignore') -->

<!-- ➡️ [**Slides**](https://docs.google.com/presentation/d/1zBpVfNByDj5u4Bsg1EtW_zx3qm_6oEm85BStYOyKlDk/edit?usp=sharing ':ignore') -->



## Video Lessons 

- https://youtu.be/Yo-AKuJ7-fw
- https://youtu.be/DZi7Cdahfzc
- https://youtu.be/UA9p5kvW8rg
- https://youtu.be/1xgbcqUtlk0
- https://youtu.be/a2zzi8wf5YY
- https://youtu.be/obKWiV57zk0
- https://youtu.be/hx64NZYRBjs
- https://youtu.be/Lcl0xb5XaHE
- https://youtu.be/seHP41DsUlU
- https://youtu.be/gbKwrr94rbw
- https://youtu.be/JeIe7hbITEc

<!-- > -->

Playlist: 

https://www.youtube.com/playlist?list=PLoN_ejT35AEioZ_5TEk0h3LVqzT-EoM2M

<!-- > -->

## Why you should know this? 

🤔

<!-- > -->

Writing JavaScript will make you better at writing JavaScript! 

👩‍💻

<!-- > -->

Working with dates will expand your knowledge of JS. You might work with dates in any app you create. 

🧐

<!-- > -->

## Learning Objectives

1. Describe the Date Object and its important methods
1. Use the Date Object to generate dates and times, and format dates and times. 
1. Construct methods that build and expand the core functionality of the Date object

<!-- > -->

Get this repo: https://github.com/Tech-at-DU/JavaScript-Dates-lab

<!-- > -->

## UTC and the JS Date Object

<!-- > -->

What's a Date? 🤔

<!-- > -->

A date is the day of the month and year specified as a number. 

📆  ➡️  3️⃣

<!-- > -->

In JS this will also include the hours, minutes, seconds, and milliseconds. 

⏰

<!-- > -->

Dates in JS are represented as the number of milliseconds since 1970

12:00 AM Jan 1, 1970 === 0️⃣ 🎉

<!-- > -->

This is the **UNIX Epoch**

<!-- > -->

Q: What is UTC? Also known as a timestamp. 

A: It's a number that represents the number of seconds since **Thursday January 1, 1970**. 

The premise is that each day takes 86,400 seconds.

🌏

<!-- > -->

Dates before the epoch can be expressed as a negative number.

🌍  🦖

<!-- > -->

Are there any weird things about dates in JS?

📆  🤔

<!-- > -->

Plenty, just think of leap years...

📆  🏃

<!-- > -->

Can you do Math with dates? 

🧮

<!-- > -->

Yes! The Date Object, like the Number Object, is a wrapper around a primitive value. 

⏰ === 1661736857699

JS will convert a date to a number when needed. 

<!-- > -->

```
const dif = date_1 - date_2 // 8137
``` 

Would return the difference in the two dates. 

<!-- > -->

Try these exercises on your own. 

You can run all of the code here in the console, execute it with node in the commandline, run it in a Repl or any place you can run JavaScript. 

<small><em>I highly encourage you to write and run the code in each example on your own!</em></small>

<!-- > -->

Make a new date with `new Date()` this returns a new date which represents the moment in time when the command was executed. 

```JS 
const a = new Date()
```

<!-- > -->
Try this: 

```JS
// Make a date object
const a = new Date()
console.log(a) // Jul 27 3:45 pm ...

// Make another Date object
const b = new Date()

// Subtract one from the other
b - a // 5009 ms between dates
```

<small>If you made these two dates in the same execution of code you might get 0.</small>

<!-- > -->

**Internally a Date is a number in Milliseconds**

Try this with your birthday. You can initialize a date with almost any human readable date string. For example: 

```JS 
var age = new Date('9/26/65')
var now = new Date()
console.log(now - age) // 1698830617401
```

<!-- > -->

**Challenge:** Find the number of:

- seconds
- minutes
- hours
- days 
- years

Since your birthday. 

<details>
<summary>

**solution**

</summary>

```JS
const bday = new Date('9/26/1965') // get your birthday
const now = new Date()    // get todays date
const diff = now - bday   // calculate the difference in ms
const secs = diff / 1000  // get the seconds
const mins = secs / 60    // get minutes
const hrs = mins / 60     // get hours
const days = hrs / 24     // get days
const yrs = days / 365.25 // get years
console.log('Seconds:', secs)
console.log('Minutes:', mins)
console.log('Hours:', hrs)
console.log('days:', days)
console.log('Years:', yrs)
```

This isn't the only solution!

</details>

<!-- > -->

- **Q:** Is the number accurate? 
- **Q:** What's the difference? 
- **Pair up:** and discuss your solutions

<!-- > -->

## Initializing the Date Object

<!-- > -->

You can initialize the date object in many different ways. It's very flexible. 

The earlier examples initialized the data object with a string. 

<!-- > -->

You can also initialize a date with Year, month, and date. 

```JS 
const newYears = new Date(2020, 0, 1)
// Wed Jan 01 2020 00:00:00 GMT-0800 (PST)
```

Notice! the month starts with a 0 index. 

```
0 - Jan
1 - Feb
2 - Mar
3 - April 
4 - May
5 - June 
6 - July 
7 - Aug
8 - Sept
9 - Oct
10 - Nov
11 - Dec
```

<!-- > -->

## Date methods 🛠

<!-- > -->

The Date object has many instance methods. Most are getters and setters. There are a few class methods also.

<!-- > -->

### Getters 

These mostly return components of a date such as a year, month, day, hours, minutes, etc. Some format the date in a variety of ways. 

<!-- > -->

**Date Components** 

```JS 
new Date().getFullYear()  // 2019
new Date().getMonth()     // 6 (July)
new Date().getHours()     // 10 (10 AM)
```

<!-- > -->

**Formatted Dates** 

```JS
new Date().toLocaleString() // 7/27/2019, 10:15:36 AM
new Date().toDateString()   // Sat Jul 27 2019
```

<!-- > -->

### Setters 

Setters set the value of various components of a date. 

<!-- > -->

**Date.setMonth()**

```js
myDate.setMonth(6) // Sets the month to July
// 0 would be January
```

<!-- > -->
**Date.setMinutes**

```JS 
myDate.setMinutes(30)
```

<!-- > -->

Best Practice! 👩‍💻

_Never mutate source object. Always make a copy and mutate the copy to avoid side effects._

```JS
const d = new Date(2019, 0, 10)
const newDate = new Date(d) // Make a new Date from a date
newDate.setMonth(5)

console.log(d) // 10 January 2019
console.log(newDate) // 10 June 2019
``` 

<!-- > -->

### Class Methods 

Date provides a couple of class methods. 

<!-- > -->

Class methods are methods that are called from the class (class methods are not called from an instance)

```JS
const now = Date.now() // Class method is called on the Class Object

// As opposed to an instance method
const today = new Date() 
today.getFullYear() // method called on an instance
```

<!-- > -->

```JS
// 1564251902406` the ms right now since the Unix Epoch
Date.now() 
// create date from UTC parameters 
Date.UTC(year, month, day, hour, min, sec, ms) 
// creates a date from date string or returns 
// NaN if unable to parse the string.
Date.parse(string)  
```

<!-- > -->

## Timezones 🌎 🌍 🌏

<!-- > -->

- Local time refers to the timezone set on your computer.
- UTC is synonymous with Greenwich Mean Time (GMT) in practice.

By default, almost every date method in JavaScript (except one) gives you a date/time in local time.

Read more here:

https://css-tricks.com/everything-you-need-to-know-about-date-in-javascript/

<!-- > -->

## Offset dates

An offset date tells you the time between two dates, the distance to a future or past date. 

<!-- > -->

```JS
const date = new Date() // Get today 7/27 (or any date)
const startDate = new Date(date) // copy the date
const dueDate = new Date(date)   // copy the date

// Start date have been 7 days ago
startDate.setDate(date.getDate() - 7) // 7/20

// Due date is 3 days from now
dueDate.setDate(date.getDate() + 3) // 7/30
```

<!-- > -->

Notice that you made a date object that was right now then made two date objects that were copies of the first. 

Then you modified the dates by setting their components with one of the setter methods. 

<!-- > -->

Here is an alternate approach

```JS 
var a = new Date()
var b = new Date(a.getYear(), a.getMonth(), a.getDate() - 7)
var c = new Date(a.getYear(), a.getMonth(), a.getDate() + 3)
```

Here b and c have lost the hours, mins, secs, ms. These could have been included if they were needed. 

<!-- > -->

**Delta/difference in dates**

```JS
a.getDate() - b.getDate() // 7
a - b // 59958877622077
```

<!-- > -->

You can also do the math! 

```JS
const date1 = new Date('7/13/2019');
const date2 = new Date('7/15/2019');
// const diffTime = Math.abs(date2.getTime() - date1.getTime());
const diffTime = date2 - date1;
const diffDays = diffTime / 1000 * 60 * 60 * 24; 
console.log(diffDays);
```

It's probably best to stick with the built-in methods over math.  

<!-- > -->

## Activity 

Pair up, you and your pair will be reponsible for solving the problems from the list below. 

We will spend the first part of the class solving the problems after which each group will present their solutions. 

<!-- > -->

**Problem 1** Schedule future dates

Given a date return a list of dates separated by a time.

Write a function that given a date returns an array of date objects that are offset by a number of days.

For example given a start date of 1/1/2019, repeat count of 4, and an interval of 3 days.

`consecutiveDates(new Date(2019, 0, 1), 4, 3) `

<!-- > -->

Outputs an array of dates: 

1. 1/1/2019
2. 1/4/2019
3. 1/7/2019
4. 1/10/2019

```JS 
function consecutiveDates(startDate, repeatCount, daysOffset) {
  // Your code here!
}
```

<!-- > -->

Expand the idea above by supplying an option that sets the unit of time for the offset. Support offset units of: 

- year
- month
- day

`consecutiveDates(new Date(2019, 0, 1), 3, 1, 'year')`

<!-- > -->

Outputs an array dates: 

1. 1/1/2019
2. 1/1/2020
3. 1/1/2021

```JS 
function consecutiveDates(startDate, repeatCount, offset, offsetUnit = 'day') {
  // Your code here!
}
```

<!-- > -->

**Problem 2** Order dates

Given an array of dates return an ordered array of dates. 

```JS 
function orderDates(dates) {
  // orders the dates 
  // returns a new array of ordered dates
}
```

<!-- > -->

Stretch: Return an object containing three keys each holding an array of dates. The keys are: 

- past: array of dates that happened before today
- present: all dates that happen today
- furture: all dates after today

<!-- > -->

**Problem 3** What's next?

Given an array of dates find the date that will happen next. You need to find the date that is closest to now but not before. 

```JS
function nextDate(dates) {
  // your code here!
}
```

**Problem 4** When's your birthday?

Birthday planner. Write a function that takes a date (your birthday) and a year, and returns the day of the week for that date in that year. 

For example: 

```JS
new Date(2020, 8, 26).getDay() // 6 - Lucky me my birthday is Saturday!
```

```JS 
function whensYourBirthday(date) {
  // your code here!
}
```

<!-- > -->

**Stretch Problem** Measure execution time

_Using `Date`_ calculate the number of milliseconds used to execute. 

You can use a loop like this to waste some time.

```JS
function wasteTime(n) {
  let widget = 0
  for (let i = 0; i < n; i += 1) {
    widget += Math.atan(Math.random() / Math.PI)
  }
}
```

You might call the test function with the function to measure like this: 

```JS
const executionTime = measureExecutionTime(() => wasteTime(10000))
```

```JS
function measureExecutionTime(testMe) {
  // Your code here! 
}
``` 

<!-- > -->

## Show your solutions

Your group shows their solutions for the problems. 

<!-- > -->

### Homework

[Assignment 7 - Date Lib](../assignments/assignment-07-date-lib.md)

<!-- > -->

## Wrap Up

- Review Dates
- Review challenges 
- Review Homework

<!-- > -->

## Additional Resources

1. https://javascript.info/rest-parameters-spread-operator
1. https://javascript.info/date
1. https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date
1. https://javascript.info/object-toprimitive

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
