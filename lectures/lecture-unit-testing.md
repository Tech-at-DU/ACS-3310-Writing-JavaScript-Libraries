# ACS 3310 Lecture: Unit Testing

<small style="display:block;text-align:center">Unit Testing</small>

## 🧠 AI Prompts for Unit Testing
Use AI as your **pair programming partner** while writing tests.

Here are some useful prompts you can give AI:

- 🤖 **"Can you help me write unit tests for a function that [does X]?"**
- 🤖 **"Given this function, what are the edge cases I should test?"**
- 🤖 **"Explain this Jest error message: [paste error]"**
- 🤖 **"Generate tests that include invalid inputs for this function."**
- 🤖 **"What are some meaningful test cases for a fizzBuzz(n) function?"**

Try giving these prompts in your coding environment or using ChatGPT to enhance your testing workflow!

---

## ✅ What is a Unit Test?
A **unit test** is a small test that checks if a single function or behavior works as expected.

### ✅ A unit test passes if it does **not throw an error.**
That means as long as the code inside the test runs without a failure, the test will pass.

Here's a very simple Jest unit test:

```js
test('adds two numbers', () => {
  const result = 2 + 2;
  expect(result).toBe(4);
});
```

✅ If `2 + 2` equals `4`, no error is thrown — the test passes.  
❌ If you change the `expect` line to `expect(result).toBe(5)`, the test will fail because the result is not what you expected.

**Remember:**
> Unit tests help you catch mistakes automatically and give you confidence that your code is correct.

---

## Interview Question
Fizz Buzz is a game where you count from 1 to x. If a number is divisible by 3 you replace it with Fizz, and if a number is divisible by 5 you replace it with Buzz, and if a number is divisible by 3 and 5 you replace it with Fizz Buzz. 

For example:
- 1
- 2
- Fizz
- 4
- Buzz
- Fizz
- 7
- 8
- Fizz
- Buzz
- 11
- Fizz
- 13
- 14
- Fizz Buzz
- 16
- 17
- etc.

**Challenge** Write a function that takes a number as an argument and returns "Fizz" if that number is divisible by 3, "Buzz" if that number is divisible by 5, "Fizz Buzz" if the number is divisible by 3 and 5, or the number. 

Your function might look something like this: 

```JS
function fizzBuzz(n) {
  // ...
}

fizzBuzz(1) // 1
fizzBuzz(2) // 2
fizzBuzz(3) // "Fizz"
fizzBuzz(4) // 4
fizzBuzz(5) // "Buzz"
fizzBuzz(6) // "Fizz"
fizzBuzz(15) // "Fizz Buzz" 
```

📌 **AI Prompt for FizzBuzz:**
> "Write a series of unit tests for a `fizzBuzz(n)` function that handles expected cases, edge cases, and incorrect input."

---

## Unit Testing

**Quality code** 🏅 is test passing code. 

Unit testing is used to test **units of code**. 

We can look at units of code as functions! ⚙️

Code that passes tests is **deemed quality** and fit for publication. 💝

Unit testing is a part of the **Agile Methodology**. 🐇

---

### Why use unit tests? 🤔

**Improves code quality** by exposing edge cases and finding bugs. 🐞

**Spots bugs earlier.** Using tests will bring bugs to light before you publish your app.

🔎 🐞

**Professionals use unit tests.** If you are planning to get a job with a company that employs more than a single developer, you will probably be writing unit tests at some point.

👩‍💻 🧑‍💻

---

## Learning Objectives

By the end of this lesson you should be able to:


1. 🤔 Define unit testing
1. 🔎 Identify what to test
1. 🧪 Write Unit tests
1. 📐 Measure code coverage

<!-- > -->

## Unit Testing 🧪

<!-- > -->

- **Q:** What is a unit test?
- **A:** A unit test is a test of a software system, _usually a single function._ 

**Important!** A unit test is most often testing the expected output of a function is correct for a given input.

🍏 ➡️ 🥧

<!-- > -->

- **Q:** How do you unit test?
- **A:** Unit tests are run by software. 

In this class, we will use [Jest](https://jestjs.io).

🤡

<!-- > -->

- **Q:** What is Jest?
- **A:** [Jest](https://jestjs.io) is a JavaScript testing framework that was written at Facebook.

🤡 📚

<!-- > -->

- **Q:** Why Jest?
- **A:** It's straightforward to use and Jest works well with React. 

If you're building React apps Jest is a good choice.

🏆

<!-- > -->

- **Q:** How do you write a test?
- **A:** Before writing a test you'll want to think about what you are testing and what the test will consider passing.

<!-- > -->

For example, you wrote a function that uppercases the first letter of a string. 

Your unit test might expect the following:

<div><code>"widget" -> "Widget"</code></div>

<!-- > -->

## Testing example 🎬

<!-- > -->

Have you heard of **Fizz Buzz?** Everyone is writing this program but no one is writing tests! There are so many faulty FizzBuzz applications in the world we could have a major problem on our hands!

If you haven't heard of FizzBuzz take a quick read.

- https://en.wikipedia.org/wiki/Fizz_buzz
- https://www.tomdalling.com/blog/software-design/fizzbuzz-in-too-much-detail/
- https://wiki.c2.com/?FizzBuzzTest
- https://blog.codinghorror.com/why-cant-programmers-program/

<!-- > -->

Pair with someone **you haven't paired with before**.

The goal of this exercise is to write some tests with Jest that test the functions in the [Fizz Buzz sample code](https://github.com/Tech-at-DU/fizz-buzz-test).

**Download this repo now.** Download the repo as a zip file and unzip it.

<!-- > -->

### Getting Started Fizz Buzz 

- Navigate the terminal to the directory
- `npm init -y` 

<!-- > -->

### Writing tests with Jest 🤡

<!-- > -->

Jest is a framework that you will use as a *dev dependency*. 👨‍💻

<small>A dev dependency is used for development but _not used in your published code_.</small>

<!-- > -->

Add Jest:

`npm install --save-dev jest`

<small>`--save-dev` creates an entry under - `"devDependencies"` in your `package.json`. Look for this right now.</small>

<!-- > -->

Add a test command. Add this to `package.json`. Add/edit `package.json` to look like this:

```JSON
"scripts": {
  "test": "jest"
},
```

<!-- > -->

🧪 Run a test with:

`npm run test`

Try it now. You should see an error:

```
...
No tests found, exiting with code 1
...
```

You haven't written any tests yet so this makes sense.

<!-- > -->

Add a new directory 📁 named "tests".

`mkdir tests`

Add a new 📄 file `tests/test.js`. Your tests will be written here. 

`touch tests/test.js`

<!-- > -->

🔬 👩‍🔬 🧫

When you run Jest it will look for any files with `test.js` in the name and run any test code found there. 

Jest logs the results of all tests to the console.

<!-- > -->

📐 🧑‍🔬 📋

Write the following code to create a new test:

```JavaScript
test(desc, callback)
```

<small>You supply two parameters a *description string* and a *callback function*.</small>

<!-- > -->

Open `test.js` and write a test:

```JavaScript
test('Sanity check', () => {

})
```

<!-- > -->

Run your test.

`npm run test`

You should see some output in the console.

```
...
PASS tests/test.js
✓ Sanity check (1ms)

Test Suites: 1 passed, 1 total
Tests: 1 passed, 1 total
...
```

Looks like 1 test 🥇 passed out of a total of 1 test.

<!-- > -->

**What did you test?**

Nothing. 🤨

The test will register an error **only** if an error is thrown in the callback! Otherwise, the test is passing.

<!-- > -->

Add the following inside the callback.

```
test('Sanity check', () => {
  expect(2+2).toBe(5)
})
```

<small>2+2 is not equal to 5 so this test should fail!</small>

<!-- > -->

Run your test again. The test should *fail* this time.

```
...
Test Suites: 1 failed, 1 total
Tests: 1 failed, 1 total
...
```

<!-- > -->

### Assertions 

`expect().toBe()` is an assertion. 

An assertion states the question and the answer you expect to receive. 

*In the last test you expect `2+2` to be `5`*. 

Expecting `2+2` to `5` is insane so the assertion fails.

<!-- > -->

Fix the test by changing `5` to `4` and run it again. This time the test passes since no error was thrown.

https://jestjs.io/docs/en/getting-started

<!-- > -->

## Testing Fizz Buzz

Your goal is to examine the source code and write some tests. The [Fizz Buzz sample code](https://github.com/Make-School-Labs/fizz-buzz-test) contains these functions. Each function takes some input and returns the output. 

- `isFizzy()`
- `isBuzzy()`
- `fizzyBuzzy()`
- `fizzBuzz()`

<!-- > -->

When writing the tests for these functions ask yourself: 

> What output do I expect for a given input? 

<!-- > -->

Import the methods you are testing into your `test.js`. For example:

```js
const fb = require('../fizzbuzz')
```

All of the methods exported from `fizzbuzz.js` will be on the `fb` object. For example: 

```JS
fb.fizzBuzz(16)
```

<!-- > -->

The fizzbuzz package/module has 3 constants and 4 methods. You should test them all!

<!-- > -->

Constants: 

- `FIZZ`
- `BUZZ`
- `FIZZBUZZ`

<!-- > -->

Methods: 

- `isFizzy(n: Number)`
- `isBuzzy(n: Number)`
- `fizzBuzzy(n: Number)`
- `fizzBuzz(n: Number)`

<!-- > -->

For example, the `isFizzy()` function takes a number and returns true if that number is divisible by 3. The test for this might look like:

```JavaScript
test('Test isFizzy', () => {
  expect(tests.isFizzy(1)).toBe(false)
  expect(tests.isFizzy(3)).toBe(true)
  expect(tests.isFizzy(4)).toBe(false)
  expect(tests.isFizzy(6)).toBe(true)
})
```

<!-- > -->

Use `expect(x).toBe(y)` to compare the value of x and y.

`expect(99).toBe(99)` passes

`expect(99).toBe(100)` throws an error


```JS 
function getAnswer() {
  return 42
}
...
expect(getAnswer()).tobe(42) // passes
```

<!-- > -->

### Testing basics 

**[`expect()`](https://jestjs.io/docs/en/expect)**

Use `expect()` to look at a value. Call one of these methods to check that value: 

- [`.toBe(value)`](https://jestjs.io/docs/en/expect#tobevalue) to compare primitive values
- [`.toEqual(value)`](https://jestjs.io/docs/en/expect#toequalvalue) to check equality of objects. This does a recursive "deep" check for equality. 
- [`.not`](https://jestjs.io/docs/en/expect#not) to check something is not the value you were expecting. 

See the link to the docs above for more information. 

<!-- > -->

## Activity

**Before writing any code.** Discuss with a partner what you are going to test. 

Describe the test you are going to write. Your partner should think of any edge cases or problems areas. Switch roles for each test you write.

Write tests for FizzBuzz. Write a test for each function.

<!-- > -->

Refer to the [Jest docs](https://jestjs.io/docs/en/getting-started.html) while you work. 

<!-- > -->

## Checking Coverage

How much of your code is covered by the test you wrote? Pretty good question huh?

Jest will automate this for you. 

`npx jest --coverage`

<!-- > -->

This should provide output similar to: 

```
----------|----------|----------|----------|----------|-------------------|
File      | % Stmts  | % Branch | % Funcs  | % Lines  | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files | 96.88    | 100      | 80       | 96.55    |                   |
 index.js | 96.88    | 100      | 80       | 96.55    | 70                |
----------|----------|----------|----------|----------|-------------------|
```

<!-- > -->

This tells you what % of code statements were covered by the tests. What % of code branches were covered, these are if-else, switch cases, etc. What % of functions were tested. What % of lines of code were tested, and line numbers for lines of code that were not tested. 

Check coverage and identify what has not been tested. 

<!-- > -->

## Test Driven Development TDD
Test Driven Developement, or TDD, is a style of programming where you create unit tests for code that you have yet to write. You then write code to make those tests pass. 

The idea is that you speculate what the output should be and write unit tests. You'll then write the minimum code to make those tests pass. 

TDD can help you improve by inspiring confidence in the code you write, while encouraging you not to over thing problems. 

**Challege** start work on your current JS Library project. Stub some functions or features. Setup unit tests with Jest that test your functions for expected output. 

<!-- > -->

### Debriefing the tests

Discuss these questions

- What did you test?
- What was easy to test?
- What was difficult to test?
- How many things did a test have to look at?
- Are you confident that your tests will catch errors that might arise with any possible input?

<!-- > -->

## Testing the string functions

To use your library in your tests you'll need to import it. Tests are run in the Node environment use `require()` to import them as a module.

`const lib = require('../index.js')`

Modify the line above to suit your situation. The name of the var can be anything. The path and name to point to your string lib relative to `test.js`.

<!-- > -->

Note! If your functions are global or they are added to the prototype of a global object you can just use something like:

`require('../index.js')`

<!-- > -->

Use the coverage command with Jest to test the coverage of your tests. 

<!-- > -->

### Homework

Continue working on your first library. You need to include unit tests. Use the notes above to add Jest and set up some unit tests. Think about what needs to be tested. Think about the input and output of your functions and methods. What is the expected output for specific inputs? 

<!-- > -->

## Wrap Up

- Q: Why use unit tests? 
- Q: What makes a good test?
- Q: What is Jest?

<!-- > -->

## Additional Resources

1. [Fizz Buzz Unit Tests](https://github.com/Tech-at-DU/fizz-buzz-test)
1. https://jestjs.io
