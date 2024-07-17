# Project: Random Library
Your goal is to make a library of functions that generate random numbers in various forms that can be used by programmers for projects that they create that need random numbers. 

## Background 
The random function in JS is limited in features. This library is attempting to cover all of the things that programmers need to do with random numbers. 

## Functions

- `random()` - returns a random number between 0 and 1
- `random(n)` - returns a random number between 0 and `n`
- `random(n, o)` - returns a random number between `n` and `o`
- `die(x)` - returns function that generates numbers between 1 and `x`
- `shuffle(arr)` - returns a randomized copy of array `arr` 
- `flip(t = 0.5)` - returns a radom bool. Weights results of true by `t`
- `dieRoll(desc)` - This function takes a description string and returns a random number based on that description. The description string should follow this form: d# generates a random number between 1 and # (inclusive). For example: d6 generates a number between 1 and 6, or d20 generates a number between 1 and 20. This function should be able to "roll" multiple dice, for example: 3d6 generates three random numbers between 1 and 6 and returns the total. This function should be able to any number of dice rolls. For example: 2d6+1d4 would generate two random numbers from 1 to 6, and a random number between 1 and 4, and return the total of all rolls. Last, you support a static value. For example 1d8+2 generates a random number from 1 to 8 and adds 2 to that number. 

## Test app
Your submitted homework should inlcude a test app that shows your code in action. The test should import your code to a react Project with npm. Your test app does not have to be complex, the goal is to show your library functioning in context, not creating complex comercial project. 

## Evaluation
| Category | Points |
|:---------|:-------|
| Code & function | 10 |
| Uses Typescript |  5 |
| Has Unit Tests  |  5 |
| Test App        |  5 |
| Uses Bundling   |  5 |
| Uses CI         |  5 |
| Total           | 35 |