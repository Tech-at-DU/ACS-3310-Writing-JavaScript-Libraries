# Working with Dates in JavaScript

JavaScript includes a built-in object for working with **dates** and **times**. This object is called the `Date` object.

In this lesson, you'll explore how to:
- Create new dates
- Format and display dates
- Perform arithmetic with dates (add, subtract)
- Compare and sort dates
- Understand how `Date` objects behave in different contexts

---

## 📦 Date Utility Library Goals
As you explore the `Date` object, think like a library author:
- Can this function be reused in multiple contexts?
- What’s the cleanest input/output structure?
- Should I return a Date object, a string, or a timestamp?

💡 These functions could become part of your own date library, like a mini `moment.js`.

🤖 **AI Prompt:** "Help me write a date utility function to get the next upcoming birthday."

---

## Creating Dates

```js
let now = new Date();
console.log(now); // current date and time
```

Dates can also be created from a date string:
```js
let christmas = new Date('2025-12-25');
```

Or by passing year, month (0-indexed), day:
```js
let d = new Date(2025, 11, 25); // Dec 25, 2025
```

✅ Check: What’s the difference between `Date.now()` and `new Date()`?

🤖 **AI Prompt:** "What are the valid formats for creating a Date in JavaScript?"

---

## Formatting Dates
Use `.toLocaleString()`, `.toDateString()`, `.toTimeString()`, or `.toISOString()`:

```js
let d = new Date();
console.log(d.toLocaleString()); // local format: 4/7/2025, 4:11:40 PM
console.log(d.toISOString());   // ISO 8601: 2025-04-07T23:12:03.812Z
```

Also consider `Intl.DateTimeFormat` for fine control:
```js
new Intl.DateTimeFormat('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
}).format(new Date()); // Intl DatFormat: "Monday, April 7, 2025"
```

🤖 **AI Prompt:** "How do I format a Date object into 'YYYY-MM-DD' using JS?"

✅ Check: What does `.toISOString()` return?

---

## Comparing Dates
Dates are compared using numeric operators:
```js
let d1 = new Date('2025-01-01');
let d2 = new Date('2025-12-25');
console.log(d1 < d2); // true
```

To sort an array of dates:
```js
dates.sort((a, b) => a - b);
```

✅ Check: What type is returned when you subtract two Date objects?

🤖 **AI Prompt:** "How do I sort a list of Date objects in JavaScript?"

---

## Arithmetic with Dates
You can subtract dates to find the time between them:
```js
let d1 = new Date('2025-01-01');
let d2 = new Date('2025-12-31');
let diff = d2 - d1;
let days = diff / (1000 * 60 * 60 * 24);
```

✅ Check: What happens if you try to subtract an invalid date?

🤖 **AI Prompt:** "How do I calculate the number of days between two dates in JavaScript?"

---

## Type Coercion in Dates
The `Date` object overrides the internal `toString()` and `valueOf()` methods (via `Symbol.toPrimitive`) to allow itself to be represented as different types depending on context.

In a nutshell, type coercion ocurrs when you provide a value in an unexpected type and the language needs to convert to the expected type. For example: `"Count: " + 2 // "Count: 2"`. Here the expected type is a string but you have provided a number, the JS interpreter converts the number to a string and then moves on. 

All objects provide methods to do type coercion. These are `.toString()` and `.valueOf()`, the first used when a string is expected, and the other when a number is expected. 

Consider the example below, keep in mind that a date object is not a number or a string! 

```js
let d = new Date();
console.log('Today is: ' + d);     // Uses d.toString()
console.log(d + 1);                // Uses d.valueOf(), returns timestamp
console.log(Number(d));            // Same as d.valueOf()
```

✅ Check: What method is used when you add a Date to a string? What about when you subtract a Date from a number? For example: `new Date() - 7`. 

🤖 **AI Prompt:** "Explain type coercion in general, and give specific examples in JS."

🤖 **AI Prompt:** "Explain how JavaScript decides which method to call when coercing a Date object."

🤖 **AI Prompt:** "What is `Symbol.toPrimitive` and where would I use it?"

---

## Date Lab

Get this repo: https://github.com/Tech-at-DU/JavaScript-Dates-lab

Solve the problems there and submit your solutions to Gradescope.

---

## 🧪 Optional Extension: Package a Date Library
Take two or more of the functions you wrote above and:
1. Add them to a `.ts` file
2. Add type annotations
3. Test them with Jest
4. Bundle and publish them like a real library

🤖 **AI Prompt:** "Convert this date function to TypeScript and test it with Jest."

---

## Final Notes
- The `Date` object can be tricky—watch out for months starting at 0 and timezone surprises.
- JavaScript dates automatically adapt to context using `.toString()` and `.valueOf()`.
- You’re now equipped to build reliable and reusable time utilities.
