<!-- .slide: data-background="./Images/header.svg" data-background-repeat="none" data-background-size="40% 40%" data-background-position="center 10%" class="header" -->
# ACS 3310 - JS Libraries

<small style="display:block;text-align:center">Introduction to JS Libraries</small>

<!-- Put a link to the slides so that students can find them -->
<!-- 
➡️ [**Slides**](https://docs.google.com/presentation/d/1z827q9AWQoOGm2-4msKoOtrVdp93GAjkx-lHKWp8NBw/edit?usp=sharing) -->

Video Lecture: https://youtu.be/TwaUOUPmeMM

<!-- > -->

## Learning Objectives

1. Describe a software library
1. Build a library of string functions/utilities
1. Use JavaScript String methods

<!-- > -->

## JavaScript Libraries 📚

Read this: 

https://codeinstitute.net/global/blog/what-is-a-javascript-library/

<!-- > -->

### Q: What are libraries? 📚

<!-- > -->

- 📚 A library is a collection of code. 
- 👩‍💻 Written to be used in any application. 
- ☝️ Best when they handle a single task.

<!-- > -->

### Why make JavaScript libraries? 🤔

<!-- > -->

- You've been using npm, now it's time to take a closer look
- Practice your programming skills!
- Apply industry best practices 

<!-- > -->

**When to write a library?** 🤔

<!-- > -->

- Code that has a _specific use case_ - **probably not** 👎
- Code that _has general uses_ - **probably!** 👍
- Code you _share_ with others - **write a library** 👍

<!-- > -->

### Q: Why make a library? 🤔

Read this: 

https://hackernoon.com/cool-javascript-libraries-to-consider-using-in-2023

<!-- > -->

By putting code in a library you are making it **portable** 
and packaging 📦 it in a form that is **easily shared**. 🤝

<!-- > -->

You're also **taking DRY to the next level!** 

<small>(DRY = Don't Repeat yourself)</small>

<!-- > -->

The code in a library can be **shared across multiple projects**, changes and bug fixes can all be made in a single location.

📦 ➡ 👩‍💻 🧑‍💻 👩‍💻

<!-- > -->

### Q: When to make a library? 🤔

Read this: 

https://dev.to/101arrowz/creating-a-modern-js-library-writing-good-code-170a

<!-- > -->

Any time you find you are writing the same code in more than one project. 

💾 ➡ 🤖 👾

<!-- > -->

When you have code that you want to share .

📦 ➡ 👩‍💻 🧑‍💻 👩‍💻

<small>(Think about open source projects)</small>

<!-- > -->

### Q: What will I make in this class? 🤔 

https://bugfender.com/blog/how-to-create-a-javascript-library/

<!-- > -->

You will write several libraries. 

The libraries you write will be smaller and focus on utility functions at first. 

<!-- > -->

Think of the code in each of the libraries written in this class as a practice interview question. 📋

<!-- > -->

Much of the code we write here has already been written. Normally we wouldn't want to reinvent the wheel, but the goal of this class is to learn how to write code and how to turn it into libraries. From that perspective, recreating code that already exists is a great learning experience. 💪

<!-- > -->

### Q: What kinds of libraries are people making in 2019? 🤔

<!-- > -->

Here is a list of libraries that you may have used before. Pair up and take a look at the list at the link below and discuss what's there.

https://kinsta.com/blog/javascript-libraries/

<!-- > -->

**Discussion:** What did you find on that list?

<!-- > -->

### Q: What kinds of libraries have you used in past projects?

<div>Pair and <strong>Discuss</strong></div> 

<!-- > -->

### Q: What about utility libraries?

https://blog.bitsrc.io/11-javascript-utility-libraries-you-should-know-in-2018-3646fb31ade

**Discussion:** What do you see there? What are these libraries good for?

<!-- > -->

### Q: What kind of code do you see?

Take a look at a couple of libraries below and look at the code. With your pair discuss the general features of the code.

Just skim the repos and look at a couple of files. Usually, the code will be in `index.js` or in `src` folder.

Imagine its your first day on the job and you have been pointed to these directories and need to use these libraries...

<!-- > -->

Answer these questions as you explore the repos below.

- How much code is there?
- How is it organized?
- What language?

**Repos**

- [has-values](https://github.com/jonschlinkert/has-values)
- [fill-range](https://github.com/jonschlinkert/fill-range/tree/master)
- [Lodash](https://github.com/lodash/lodash) (the most popular package on npm)

<!-- > -->

<!-- .slide: data-background="#087CB8" -->
## [**10m**] BREAK

<!-- > -->

## Writing your first library 🧐

<!-- > -->

The goal of the first homework assignment is to write a simple library that works with strings. 

<!-- > -->

Why write a library at all? 

Putting useful code in one place will benefit your software development process! 🐿

<!-- > -->

### String functions 🧶

Strings are one of, if not the most common data type you might work with. 

JavaScript provides many string functions such as:

- [`String.toUpperCase()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)
- [`String.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
- [`String.split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [And many more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

<!-- > -->

## Challenge 1

Uppercase the first letter of a string. For example: 

> "hello" -> "Hello"

<!-- > -->

**Uppercase the first letter with split**

1. Split the string into an array of characters with [`String.split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
1. Uppercase the first element with [`String.toUpperCase()`]()
1. Join the elements in the array into a string with [`Array.join()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
1. Return the result

<!-- > -->

**Uppercase first letter with bracket notation**

1. Get the first letter: `sourceStr[0]`
1. Convert to uppercase with: [`String.toUpperCase()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)
1. Get all the characters after the first [`sourceString.slice(1)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
1. Combine the two and return the result

<!-- > -->

Create a function that takes a string as a parameter and returns the string with the uppercase first letter: 

```JS
function upperFirst(str) {
 // ...
}

upperFirst("hello") // "Hello"
```

<!-- > -->

## Challenge 2

Uppercase the first letter of each word in a string. For example: 

> "hello world" -> "Hello World"

<!-- > -->

- What's your strategy? 
- Which methods will you use? 
- Pseudo Code...

<!-- > -->

- Split the string on the space to get an array of words
- Use the previous function to uppercase the first letter of each word

<!-- > -->

## Homework

- [String Lib](../assignments/assignment-01-string-lib.md)

<!-- > -->

## Wrap Up

- What is a library? 
- Why write a library?
- Name three JS String methods?

<!-- > -->

## After Class 

 - [String Lib](../assignments/assignment-01-string-lib.md)

<!-- > -->

## Additional Resources

- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Useful_string_methods
- https://www.sitepoint.com/15-javascript-string-functions/
- [JS String Method references](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- JS Libraries
 - https://tutorialzine.com/2019/04/10-interesting-javascript-and-css-libraries-for-april-2019
 - https://blog.bitsrc.io/11-javascript-utility-libraries-you-should-know-in-2018-3646fb31ade
 - https://github.com/jonschlinkert/has-values
 - https://github.com/jonschlinkert/fill-range/blob/master/index.js
- https://github.com/lodash/lodash

