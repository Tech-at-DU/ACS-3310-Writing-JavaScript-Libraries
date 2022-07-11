# ACS 3310 Final Assessment

This assessment is a tool you can use to measure what you have learned this term. 

Solve the problems below to the best of your ability and check your work agains the rubric. 

## Challenge 1 

The main problem here is to write a function that adds the ordinal suffix to the end of a date or number. The ordinal siffix is the two letters: st, nd, rd, and th. You need to write a function that takes a number and returns a string with the correct suffix: 

```JS
ordinalSuffix(1)    // 'st' -> 1st
ordinalSuffix(2)    // 'nd' -> 2nd
ordinalSuffix(3)    // 'rd' -> 3rd
ordinalSuffix(4)    // 'th' -> 4th
ordinalSuffix(11)   // 'th' -> 11th
ordinalSuffix(502)  // 'nd' -> 502nd
ordinalSuffix(1001) // 'st' -> 1001st
ordinalSuffix(433)  // 'rd' -> 433rd
```

The [rules](https://en.wikipedia.org/wiki/Ordinal_indicator#English) are as follows:

- st is used with numbers ending in 1 (e.g. 1st, pronounced first)
- nd is used with numbers ending in 2 (e.g. 92nd, pronounced ninety-second)
- rd is used with numbers ending in 3 (e.g. 33rd, pronounced thirty-third)
- As an exception to the above rules, all the "teen" numbers ending with 11, 12 or 13 use -th (e.g. 11th, pronounced eleventh, 112th, pronounced one hundred [and] twelfth)
- th is used for all other numbers (e.g. 9th, pronounced ninth).

Write your solution with TypeScript. 

Compile your code from TypeScript to JavaScript. 

## Challenge 2 

Write unit tests for the function above. Incldue the unit test with your project. 

Run your unit tests to make sure they are working. 

## Challenge 3 

Publish your code to npm.	

## Challenge 4 

Create a test app that uses your library by downloading the package from npm. 

You can use Node JS for this test app. Your test app should use npm and load your package from npm.

The test app should print the numbers 1 to 100 using the ordinal suffix. 

