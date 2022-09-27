<!-- .slide: data-background="./Images/header.svg" data-background-repeat="none" data-background-size="40% 40%" data-background-position="center 10%" class="header" -->
# ACS 3310 - Bundling Libraries

<small style="display:block;text-align:center">Bundling Libraries for distribution</small>

<!-- > -->

This class session covers the concept of bundling. This is the process of combining files and processing them for use and distribution. 

<!-- Put a link to the slides so that students can find them -->

<!-- ➡️ [**Slides**](/Syllabus-Template/Slides/Lesson1.html ':ignore') -->

<!-- > -->

<!-- ## Review: Callbacks! -->

<!-- > -->

## Promises

Let's study Promise! try these Replits! The first three review Promise and the last provides a practical use case and challenge!

- https://replit.com/@MakeSchoolFEW/Promise-01#readme.md
- https://replit.com/@MakeSchoolFEW/Promise-11#readme.md
- https://replit.com/@MakeSchoolFEW/Promise-12#readme.md
- https://replit.com/@MakeSchoolFEW/Promise-02#readme.md
- https://replit.com/@MakeSchoolFEW/Promise-03#readme.md

Solve this problem with Primsies and Callbacks. The sample code shows hoe to use the browsers geolocation API. It uses two callbacks. Your goal is to make it work with a Promise! 

- https://replit.com/@MakeSchoolFEW/GeoLocation#script.js

<!-- > -->

## Why learn how to bundle files? 

<!-- > -->

Bundling is used in professional environments. Bundling code yourself will help you understand how these projects work. 

<!-- > -->

Bundling your files allows them to be distributed so they can be used anywhere without extra work. 

<!-- > -->

Your files need to be handled differently if they are used in the browser, or in NodeJS, or in a React project. Bundling files allows them to be used all these. 

<!-- > -->

## Learning Objectives 

1. Describe reasons for bundling files
1. Define UMD and ESM bundles 
1. Use Rollup to bundle your library for distribution

<!-- > -->


## Bundling with Webpack

<!-- > -->

Reference:

- https://webpack.js.org/guides/typescript/
- https://tobias-barth.net/blog/Bundling-your-library-with-Webpack

<!-- > -->

Install webpack:

```
npm install webpack webpack-cli --save-dev
```

<!-- > -->

Install TypeScript and TypeScript Loader:

```
npm install --save-dev typescript ts-loader
```

<!-- > -->

Add a tsconfig.json file. Make a new file: `tsconfig.json`

Add the following:

```JSON
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node"
  }
}
```

<!-- > -->

Add webpack.config.js. Create a new file: `webpack.config.js`

Add the following: 

```JS
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
		library: 'lib',
		libraryTarget: 'umd',
		globalObject: 'this',
  },
};
```

<!-- > -->

You may need to edit the values here: 

- `entry` points to your source file
- `filename` names the output file
- `path` sets the output directory
- `library` sets the name of the global variable created in a browser environment

<!-- > -->

## What is a bundle and why do we have them? 

<!-- > -->

In the old days you could write code and run it in a browser. 

That was it. There wwere not more options. 

<!-- > -->

Until recently code run in browser was global. That is any variables that were created were accessible from anywhere. 

<!-- > -->

What could go wrong? 

<!-- > -->

Imagine importing a couple libraries only to find out that they don't work because the code on one is redefining a variable used in the other. 

<!-- > -->

script-1.js
```JS
var counter = 0
```

script-2.js
```JS
function counter() {
  return ...something really important...
}
```

<!-- > -->

This is was really happening. There was not system of modules. 

To solve this problem CommonJS was created. 

- https://en.wikipedia.org/wiki/CommonJS

<!-- > -->

CommonJS is a JavaScript code that wraps your JS code. It allows you to create modules. 

<!-- > -->

What's a module? Don't we have these? 

A module is a block of code that contains all of it's variables. Usually a module is a file. 

<!-- > -->

script-1.js
```JS
let counter = 0
```

script-2.js
```JS
function counter() {
  return ...something really important...
}

export default counter
```

In script-1 counter is not exposed. Script-2 exports counter, it can be imported where it is needed. 

Using modules these identifiers do not clash! 

<!-- > -->

Wait! Can't we do this today? 

Yes! But only with the latest version of JS. Earlier versions don't support modules. Many older browsers don't support this! 

<!-- > -->

Ahh, this is so confusing! 

You're right, but it's how things work! You've been using this all along and havn't known about it! 

<!-- > -->

Then there's NodeJS. Node is a server environment that uses the JS language. 

It doesn't support the API used by the borwser. Ever notice `fetch()` is missing?

<!-- > -->

Ever notice that the browser doesn't support `require()`?

Require is another code wrapper that works with CommonJS. You can use it in the browser if you import it. 

- https://requirejs.org/docs/commonjs.html

<!-- > -->

Let's review:

- In JS land everything is global (variables and stuff)
- CommonJS was invented to create a module system
  - Modules allow variables with the same name to live in their own module
- RequireJS was invented to allow things to be shared between modules

<!-- > -->

Universal Module Definition UMD is a format combines CommonJS and RequireJS. It takes into account whether your code is running in a browser or in a node environment. 

<!-- > -->

What does UMD for me? 

Allows your libraries run in the browser or in Node.

<!-- > -->

Why is that important? 

<!-- > -->

If you are going to write code that runs in the browser you should understand all of the tooling that makes it work. 

<!-- > -->

If you are going to use modern libraries like React, they all use these ideas, you should understand what is happening behind the scenes. 

<!-- > -->

How can prove that all of this is doing what was described here? 

<!-- > -->

Make two files: 

1. `example-node.js`
2. `example-borwser.html`

Imagine these are two separate projects. One is a browser project the other is a NodeJS project. 

<!-- > -->

After building your code following steps above take note of the file name and location of your bundled code. This file named in ouput section of the webpack config. 

<!-- > -->

In `example-node.js` import your code by adding: 

```JS
const lib = require('./path/to/bundle.js')
// add some code here to test your lib
```

Run this in your terminal.

<!-- > -->
 
In `example-borwser.html` add a script tag:

```HTML
<script src="./path/to/bundle.js"></script>
<script>
  // Add some code here to test your lib
</script>
```

In this example the code will added the variable with the name used in: `library: 'lib'` the name here is lib. You can change it but will need to run webpack and bundle again!  

<!-- > -->

## Additional Resources

Set up Jest with babel to use ES6 import from with your tests

- https://jestjs.io/docs/en/22.x/getting-started.html#using-babel
- https://medium.com/@saplos123456/using-es6-import-and-export-statements-for-jest-testing-in-node-js-b20c8bd9041c

More info on bundling

- https://levelup.gitconnected.com/code-splitting-for-libraries-bundling-for-npm-with-rollup-1-0-2522c7437697



<!-- ## Minute-by-Minute [OPTIONAL]

| **Elapsed** | **Time**  | **Activity**              |
| ----------- | --------- | ------------------------- |
| 0:00        | 0:05      | Objectives                |
| 0:05        | 0:15      | Overview                  |
| 0:20        | 0:30      | Bundle files with RollUp  |
| 0:50        | 0:10      | BREAK                     |
| 1:00        | 0:45      | Code Coverage pair and test |
| 1:45        | 0:05      | Wrap up review objectives |
| TOTAL       | 1:50      | -                         | -->

