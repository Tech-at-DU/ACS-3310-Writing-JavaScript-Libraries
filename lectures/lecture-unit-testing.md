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

### Video Lessons

- https://youtu.be/xXm_8DYjW6w
- https://youtu.be/04y5jPykoIY

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
1. 🤖 Use AI to generate, review, and improve your tests

---

## 🤖 AI Prompts & Checks for Understanding

Use these prompts while working with the Fizz Buzz sample code or writing your own tests:

### 💬 AI Prompts
- "Write Jest unit tests for a function that returns Fizz, Buzz, or Fizz Buzz."
- "What are edge cases I should test in a FizzBuzz function?"
- "How do I test if a function throws an error in Jest?"
- "Can you explain the difference between `.toBe()` and `.toEqual()` in Jest?"

### ✅ Checks for Understanding
- Can you explain what causes a Jest test to pass or fail?
- What is the purpose of the `expect()` function in a test?
- What would a test look like for invalid input (e.g., passing a string instead of a number)?
- How can you check if your tests cover all your code?

Reflect on your answers or discuss with a classmate. Use AI to clarify or validate your responses.

---

## 🔗 Sample Code Repository
To practice writing unit tests, use the following sample Fizz Buzz code:

👉 [Fizz Buzz Sample Code on GitHub](https://github.com/Tech-at-DU/fizz-buzz-test)

Clone or download this repo and write unit tests for the functions included.
