#  ACS 3310 - Final Assignment!

## Description 

Your goal for this assignment is create your own library from scratch. Your library must have unit tests, use Typescript, be bundled, published to npm, and include continuous integration. 

The subject for this project can be anything you like. If you're not sure what to do consider making a library that works with an existing web API, see the notes below. 

This assignment is due the last day of class. 

Your goal with this assignment is to write a JavaScript library. Think of a programming problem you can solve. Think of code that you might write often and how you can provide an alternative to writing this code. 

### Why this assignment?

This is a great practice writing JavaScript code. You might use the code you write here. Someone else might use the code you write! 

## Project requirements

You will write a library of code that solves a problem. 

- Write library that works with an API to make that API easier to use. See the ideas below. 
- If you're not sure what to write you can [solve the OpenWeatherApi problems](https://github.com/Tech-at-DU/weather-api). 
- You can also choose to create a library for one of the existing JS Browser APIs. 

Here is a list of APIs that you could build a library around: 

- [Yoda Speak](https://rapidapi.com/ismaelc/api/yoda-speak)
- [AccuWeather](https://rapidapi.com/stefan.skliarov/api/AccuWeather)
- [Hearthstone](https://rapidapi.com/omgvamp/api/hearthstone)
- [Breaking News](https://rapidapi.com/MyAllies/api/breaking-news)
- [Natural Language Nutritional Analysis](https://rapidapi.com/edamam/api/edamam-nutrition-analysis)
- [Measure the Happiness of large populations](https://rapidapi.com/andyreagan/api/hedonometer)
- [Sentiment Analysis](https://rapidapi.com/peckjon/api/algorithmia-nlp-sentimentanalysis)

Explore these sites to find other APIs

- https://dev.to/biplov/15-fun-apis-for-your-next-project-5053
- https://rapidapi.com/blog/most-popular-api/
- https://apilist.fun
- https://rapidapi.com/
- https://www.programmableweb.com/

Your goal is to simplify using your chosen API. This can be done in a few ways. Use any or all of the ideas below, or come up with your own ideas.

The Browser has many built in APIs. You have probably use a few these already. You can write a library for one of these if you like: https://developer.mozilla.org/en-US/docs/Web/API

### Follow these steps

Following these steps will make your easiest while also illustrating why you would want to make a library of code. 

- **Make a simple project** that uses your chosen API. This should be a simple project, it can just be an HTML file with some JS. 
- **Decouple the API code.** Find the things that connect your project code with the API code. The code that handles the API should be able to take in any information that that it needs as parameters. 
- **Move the API code into it's own file.** 

Follow the tutorial here: https://www.youtube.com/playlist?list=PLoN_ejT35AEjGBv8nfv4GDszPvltjwmgL

### Stretch Challenges 

- Make an object that holds the configuration data for the API. Give the object methods that handle standard requests and or organize parameters that are passed to the API.
- Organize and improve on the return data from your API. A JSON repsonse from an API might long and complex. Your code can read the response and return a more organized response.
- Create a system built around the API. This could handle calling the API repeatedly over a time period for example. 
- Your code can handle errors more gracefully.

### Deliverable

A GitHub link to your API project source code. 

Your code should be built and published to npm. 

### Due Date 

Last day of class. 

## Assessing the assignment

| Expectations | Does not meet              | Meets                 | Exceeds                          |
|:-------------|:---------------------------|:----------------------|:---------------------------------|
| Completion   | Your Lib is not complete, doesn't function, is not published | Your  project is complete, published to npm and functional | Your project goes beyond the homework description, you have explored all possible edge cases |
| Quality      | The code poorly written, lacks conssitent formatting, lacks documentation | The code functions well, is formatted well (linted), and includes documentation | Your code includes unit tests |
| Comprehension | Can't explain the code you have written | Can explain your source code | Could easily reproduce this type of work in another project |
