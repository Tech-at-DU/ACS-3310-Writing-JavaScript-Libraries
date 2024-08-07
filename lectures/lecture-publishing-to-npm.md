<!-- .slide: data-background="./Images/header.svg" data-background-repeat="none" data-background-size="40% 40%" data-background-position="center 10%" class="header" -->
# ACS 3310 Lecture: Publishing to npm

<small style="display:block;text-align:center">Publishing to npm</small>

<!-- > -->

## Learning Objectives

1. 🤓 Describe, define, and use SEMVer (Semantic Versioning)
1. 🛠 Create NPM Packages
1. 🎬 Publish your npm package
1. 🥇 Use ESLint to apply best practices to coding.

<!-- > -->

## Why? 🤔

Get a deeper understanding of npm and it's ecosystem. Contribute to open source.

Professional best practices.

<!-- > -->

## What is npm? 🤔

<div>Node Package Manager</div>

<div>So what's a Package?</div>

<!-- > -->

npm organizes code into *packages* (sometimes called *modules*). 📦

<!-- > -->

> **A package is a directory with one or more files**. And, a file named `package.json` which contains metadata about the package.

<!-- > -->

A **_dependency_** is a package that your project (or another package) *depends* on. 🤝

<!-- > -->

In this way, you can use these shared packages like **building blocks** to build large complex projects. 👷‍♀️

<!-- > -->

Packages can be written to work with **Node.js**, run on the **command line**, or used in a **web applications**.

Packages can be shared publicly or used privately. 🌏

<!-- > -->

## How does NPM work?

<div>npm is three things: a <strong>website</strong>, <strong>registry</strong>, and <strong>client</strong>.</div>

👩‍💻 📚 💻

<!-- > -->

### The Website 👩‍💻

<div style="">https://www.npmjs.com</div> 

<div>is the web portal for all things npm.</div>

<!-- > -->

### The registry 📚

<div>is a database of all packages that have been published via npm.</div>

<!-- > -->

### The client 💻

<div>is a command line tool used to publish and manage your npm packages.</div>

<!-- > -->

The published packages each get a page on npm.com with notes and documentation.

https://docs.npmjs.com/about-npm/

<!-- > -->

## Publish packages to npm 

✍️

<!-- > -->

Follow these instructions to create an account, install npm CLI, and publish a package to the npm registry.

You should publish your String Library to npm following the steps below. 

<!-- > -->

### Sign up 🆗

Create an account: https://www.npmjs.com/signup

<!-- > -->

### Install 🛠

You will need to install Node.js and npm. Follow the instructions here if you haven't already done this.

https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

<!-- > -->

### Package.json

When you run `npm init` in a directory, npm creates a new file called package.json. 

The data describes:

- name
- version
- entry point
- dependencies
- and more...

<!-- > -->

package.json is also a manifest listing all of the dependencies a package may require. 

One package may depend on another which in turn has its own dependencies. (It's a little like those Russian dolls.)

🪆 🪆 🪆

<!-- > -->

### Make your package 🔨

<!-- > -->

Using Terminal, navigate to the directory containing your String lib. Run the command:

```
npm init
```

<small>This should create a new `package.json` in the current directory.</small> 

<!-- > -->

Answer all the questions to the best of your ability. You can edit these later. 

Everything you enter here is metadata that describes the package that will eventually be hosted on npm.com. This includes:

- name
- description
- version

<small>(You can use the default values, shown in (...), by hitting the Enter key when it appears.)</small>

<!-- > -->

The `package.json` might look like this: 

```JSON
{
  "name": "string-lib",
  "version": "1.0.0",
  "description": "String utility functions",
  "directories": {
    "test": "tests"
  },
  "scripts": {
    "test": "jest"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "jest": "^29.7.0"
  }
}
```

<!-- > -->

Add an entry point. This is important because it tells the world where your code begins. The entry point is where to start running the code you have created. 

Add the entry to the root of your `package.json`:

```JSON
"main": "src/index.js"
```

Adjust `"src/index.hjs"` so this path points to the file that begins your program. 

<!-- > --> 

### Login into npm 👩‍💻

<!-- > -->

We are using the npm CLI you need to log in in the command line.

```
npm login
```

You'll need to enter your:

- npm username
- npm password
- email address used with npm

<!-- > -->

### Publishing your package 📰

<!-- > -->

📣 To publish your package use:

```
npm publish --access=public
```

<small>The first time you publish, you will need to add `--access=public` to avoid an error. After that, future publications will default to public access.</small>

<!-- > -->

#### Resolving errors 😱

<!-- > -->

All packages on npm are public and share the same _namespace_. The most common error will be a _name collision_. It might look like:

```
npm ERR! 403 Forbidden - PUT https://registry.npmjs.org/test-error - You do not have permission to publish "test-error". Are you logged in as the correct user?
```

<small>Here I tried to publish a package with the name `test-error`. This package already exists. Hint: **Search for a name on npm** before publishing.</small>

<!-- > -->

Another option is to publish to a scope. This puts the package under the scope of your username.

```
@soggybag/really-cool-package
```

To publish under a scope prefix your package name with `@` and your npm user name. For example: 

<!-- > -->

### Publishing in scope 🪐

<!-- > -->

To publish to a scope:

Change the name to `@username/package-name` manually in package.json

or

Run `npm init --scope=username` instead of `npm init`

<!-- > -->

**Publish your your String lib to npm following the instructions above.** 🛠️

<!-- > -->

### View your package npm 📡

<!-- > -->

Visit https://www.npmjs.com

Log in and click the profile icon in the upper right. Choose "Packages" from the menu. This should show the list of packages you have published.

Your package should appear on the list, **pat yourself on the back!**

<!-- > -->

Click the name of your package on the list and view it on npm. Notice a few things.

<!-- > -->

The npm page for a package shows the **text from the README.md** file. Your readme should look good and document what your library. 

This will encourage other developers to use your library.

<!-- > -->

The version number, last update date, weekly downloads, GitHub repo and more are shown here.

<!-- > -->

## Connect your GitHub to npm

🤝

<!-- > -->

🤓

Connecting your npm package to the GitHub source code is a good idea.

https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry

<!-- > -->

## Version numbers and SemVer

🔟.5️⃣.3️⃣

<!-- > -->

All packages on npm are using semver. What's semver? Semver stands for semantic version. It's those version numbers you see on everything software:

`1.0.0` or `1.0.16` or `2.1.18`

<!-- > -->

<div style="font-size:2em">
  <strong>16</strong>.10.2
</div>

The first digit is the **MAJOR** version. You'll update this when you make changes that make a new version **incompatible** with an older version.

<div style="font-size: 2em; text-align: center"><strong>MAJOR</strong>.<small>MINOR.PATCH</small></div>

<!-- > -->

<div style="font-size:2em">
  16.<strong>10</strong>.2
</div>


The second digit is the **MINOR** version. You'll change this when you add **more functionality** but are **still backward compatible**.

<div style="font-size: 2em; text-align: center">
<small>MAJOR.</small><strong>MINOR</strong><small>.PATCH</small></div>

<!-- > -->

<div style="font-size:2em">
  16.10.<strong>2</strong>
</div>

The last digit is a **PATCH**. You'll change this when you make **bug fixes and improvements** that are backward compatible but do not add new features.

<div style="font-size: 2em; text-align: center"><small>MAJOR.MINOR.</small><strong>PATCH</strong></div>

<!-- > -->

<div style="font-size:2em">
  16.10.2
</div>

<div style="font-size: 3em; text-align: center">MAJOR.MINOR.PATCH</div>

<!-- > -->

### Version Numbers

<!-- > -->

Read the questions below and figure out the new version numbers

- You just **edited** the readme on version 3.1.0
- You just fixed a problem with the `twizzle()` function, a public API, it now **requires** a number: `twizzle(count)`, previous version: 12.11.10
- You just updated `twizzle(count)` again but added a default parameter: `twizzle(count = 1)`

https://semver.org

<!-- > -->

## Updating your package

<!-- > -->

When you make changes to your library run:

```
npm publish
```

Do it now.

You'll probably see an error:

```
npm ERR! 403 Forbidden 
- PUT https://registry.npmjs.org/@soggybag%2fjustincase 
- You cannot publish over the previously published 
versions: 1.0.2.
```

<!-- > -->

Here I tried to publish but the currently published version is: 1.0.2 and the version I'm publishing is: 1.0.2. These are the same.

**To publish a new version you need to update the version number in package.json.**

<small>Change the version number and you should be able to publish: 1.1.0</small>

<!-- > -->

## Install ESLint 🧼

<!-- > -->

Follow the instructions here to install ESLint: https://eslint.org/docs/latest/use/getting-started

<!-- > -->

**Be sure to add a `.gitignore`!** Before distributing your code you want to remove things that are not needed! 

🫧

<!-- > -->

A linter finds errors and enforces coding style. 

Using a linter is professional best practice!

🏆

<!-- > -->

Install and use ESLint. Use the Airbnb style guide. 

Lint your code and publish and update to your npm package. 

<small>Linting your code is probably equivallent to a bug fix or a patch.</small>

<!-- > -->

### Make a patch, update, and publish

<!-- > -->

Try that for yourself. Edit the README.md to improve the description.

Call it a PATCH. 

<small>This change is just an improvement, you didn't change any of the method names or parameters, so the API has stayed the same. You also didn't add any new features.</small>

In `package.json` add 1 to the last digit in the version.

If the version was: 1.0.0 change this to 1.0.1

<!-- > -->

**Now run:**

```
npm publish
```

Check your package on [npm](https://www.npmjs.com ).

Look for the changes to the read and check the version number.

<Small>
Making changes only to the GitHub repo will not show on npm. You'll need to publish a new version.
</small>

<!-- > -->

## Testing your lib with RunKit

<!-- > -->

Visit your library on [npm](https://www.npmjs.com ). Find the "Test with RunKit" button.

Clicking this opens RunKit. You'll see a code editor on the left and the ReadMe documenting your library on the right.

Good thing you wrote that documentation!

Write some code and test your package.

<!-- > -->

## Give yourself a badge!

<!-- > -->

Great work, you deserve a badge!

You've probably seen those nifty badges on display on GitHub repos. Take a look at:

https://github.com/badges/shields

![IXVf2.png](images/IXVf2.png)

<!-- > -->

The badges make your repos look legit. That's short for *legitimate*, which means:  

> conforming to recognized principles or accepted rules and standards

Code libraries that conform to rules and standards are more likely to get adopters!

<!-- > -->

These badges show all sorts of information about the repo, the code in the repo and more. Your repo is just getting started so you can't make use of all of these yet.

<!-- > -->

Let's start with a couple of easy badges. Size and version.

Go to:

https://shields.io

Click: Size

Click the link to the right of npm bundle size. It looks like:

`/bundlephobia/:format/:packageName.svg`

<!-- > -->

Now select the format: min, and type your package name into the field. If you have scoped your package include your @username like this: `@username/packagename`.

Choose "Copy Markdown" from the menu at the bottom.

Paste this into your README.md.

Commit and push this to GitHub.

Check out your GitHub page and you should see your new badge!

<!-- > -->

Repeat this again for the version. Try this on your own. 

Get the npm version number.

<!-- > -->

### Update your npm package page

<!-- > -->

After you're happy with your GitHub README, update your work on npm.

Update the version number of your package. Is this a MAJOR? MINOR? or PATCH?

```
npm publish
```

Visit npm and check out your package.

<!-- > -->

