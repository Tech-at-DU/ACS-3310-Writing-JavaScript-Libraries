<!-- .slide: data-background="./Images/header.svg" data-background-repeat="none" data-background-size="40% 40%" data-background-position="center 10%" class="header" -->
# ACS 3310 - Continuous Integration

<small style="display:block;text-align:center">Continuous Integration</small>

<!-- Put a link to the slides so that students can find them -->

<!-- ➡️ [**Slides**](/Syllabus-Template/Slides/Lesson1.html ':ignore') -->

<!-- > -->

Continuous Integration (CI) is the term for automated processes that continuously integrate changes into a software project.

<!-- > -->

Continuous Integration emphasizes merging small changes frequently over merging large changes at the end of the development cycle. 

<!-- > -->

A big piece of CI is automatically running tests and providing feedback on the current state of a code base. 

<!-- > -->

In this lesson, you will apply some of these ideas to your code base. 

<!-- > -->

### Quick Discussion

Read this: https://codeship.com/continuous-integration-essentials

Pair up and answer these questions: 

**Q:** Do you see any advantages of using CI?

**Q:** Do you see any downsides to CI?

<!-- > -->

## Why learn about Continuous Integration?

<!-- > -->

CI is a modern software development *best practice*. You should become familiar with industry best practices if you plan to integrate yourself with industry! 

<!-- > -->

CI provides feedback on the quality of a codebase as each new change is pushed. 

Feedback is good, automated feedback is even better since it saves you time and energy!

<!-- > -->

## Learning Objectives

1. Use Continuous Integration to automate testing
1. Implement industry best practices

<!-- > -->

## GitHub Actions

<!-- > -->

You're probably using GitHub to track changes, collaborate and backup your projects. GitHub actions are built into GitHub allowing you to automate tasks. 

<!-- > -->

In the next few steps you will use GitHub Actions to run unit tests on one of your repoistories. 

<!-- > -->

Choose a repoistory that has unit tests. You'll be adding GitHub actions to this repo. 

<!-- > -->

I used the example project here for testing: 

https://github.com/Tech-at-DU/GitHub-Actions

Watch at least the first video here for a detailed overview of using GitHub actions to create an automated workflow.  

- https://www.youtube.com/watch?v=UEOtZvTCmDo
- https://www.youtube.com/watch?v=R8_veQiYBjI&t=954s
- https://docs.github.com/en/actions/quickstart
- Follow this guide to create an action that runs when a branch is updated
  - https://duncanlew.medium.com/unit-testing-typescript-with-jest-part-two-ci-cd-pipeline-setup-with-github-actions-750193931405

<!-- > -->

## Homework!

You will implement at automated testing on your final project repo. I encourage you to try implementing this on an existing repo to test it now and see how it works. 

The steps below describe how to implement automated testing using GitHub actions. This might be part of a larger suite of actions as part of continuous integration. 

- Click **Actions**
- Search for the Node.js Workflow

<!-- > -->

Notice that you're adding a new .yml file at .github/workflows/

This yml file contains instructions telling GitHub what to do when you push changes or accept a pull request.

This is what I used: 

```
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: Node.js CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x, 18.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test
```

## Adding TypeScript 

Follow the guide here to add TypeScript Support to your project: 

https://learn.microsoft.com/en-us/visualstudio/javascript/compile-typescript-code-npm?view=vs-2022

<!-- > -->

Commit this new file. 

Push your code. Check the Actions tab. In your github page. You'll see the actions running there. 

<!-- > -->

Add a status badge to your repo by following the instructions here: 

https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge

```
![example workflow](https://github.com/<OWNER>/<REPOSITORY>/actions/workflows/<WORKFLOW_FILE>/badge.svg)
```

- Change <OWNER> to your GitHub user name
- Change <REPOSITORY> to your repo name
- Change <WORKFLOW_FILE> to the name of your actions .yml for example node.js.yml

<!-- > -->

Follow this article for more information on setting up badges for GitHub Actions: 

https://nklya.medium.com/useful-status-badges-for-github-actions-16e658d52ba2

<!-- > -->

## Compiling TypeScript as part of the build process

Take a look at the `GitHub-Action/.github/workflows/node.js.yml`. 

This file has the instructions GitHub will execute when the action is triggered. 

<!-- > -->

At the top it lists the action trigger: 

```
on:
  push:
    branches: [ "master" ]
  pull_request:
    branches: [ "master" ]

...
```

On a push or pull_request ont he master branch. 

<!-- > -->

At the bottom are listed the steps: 

```
steps:
    - uses: actions/checkout@v3
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test
```

The second to the last line says: 

```
npm run build --if-present
```

<!-- > -->

In your package,json file add a build script:

```
"build": "tsc"
```

The command above is run from the terminal with: 

```
npm run build
```

<!-- > -->

You can expand this `tsc` command to fit your needs and include a TypeScript config file if needed. 

Check out the guides here: 

- https://www.educative.io/answers/how-to-execute-the-typescript-file-using-the-command-line
- https://www.thisdot.co/blog/creating-your-own-github-action-with-typescript

<!-- > -->

## Check your code coverage

code coverage measures how much of your codebase is covered by units tests. 

Jest has a coverage reporter built in. 

<!-- > -->

Use the following in your test script to get a coverage report with your test results. 

```
jest --coverage
```

This should output something like: 

```JSON
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |    92.5 |       60 |      70 |    92.5 |                   
 index.js |    92.5 |       60 |      70 |    92.5 | 80,88,98          
----------|---------|----------|---------|---------|-------------------
```

<!-- > -->

Stretch Challenge: Add code covereage to your GitHub Actions. Follow the guide here: https://about.codecov.io/blog/javascript-code-coverage-using-github-actions-and-codecov/

<!-- > -->

## Install ESLint and lint your work!

Linting is not a CI but is related as a part of industry best practices and code quality. We've covered this in other classes but it's important so we will review it again here. 

<!-- > -->

### Q: Why lint? 

Linting is an automated process that looks at your code and evaluates it for consistent style and quality. This has two effects on your work.

- When working in a team it ensures that everyone on the team is coding with a **consistent style**. 
- **Catches errors** and questionable coding structures before they get merged into a larger code base. 

<!-- > -->

As a professional **you should always be using the linter.** Think of every suggestion the linter makes as mentorship from a senior software engineer.

<!-- > -->

ESLint needs to be installed in two places: 

- _in the project_ through npm 
- _in your editor_.

<!-- > -->

**Q:** Do you consider your self an advanced coder who follows professional best practices?

<!-- > -->

**A:** You have already install installed ESLint, and you do it for every project!

<!-- > -->

### Install ESLint in Editor

<!-- > -->

You'll also need to add the ESLint plugin in your editor. The process for this is different for each editor but generally follows these steps: 

1. Go to Settings Extensions/Plugins
1. Add a new Extension/Plugin
1. Search ESLint
1. Install 

<!-- > -->

You may need to close and reopen your project in your editor before the Linter starts registering errors. 

**Do this now!** If you haven't already.  

<!-- > -->

### Install in npm project

Follow the instruction here: 

https://eslint.org/docs/user-guide/getting-started

tl;dr

```
npm install eslint --save-dev`
eslint --init
```

<!-- > -->

Choose: 

- To check syntax, find problems, and enforce code style
- CommonJS (require/exports)
- Use React Vue.js?: None of these
- Does your project use TypeScript? › No
- Where does your code run? Node
- Use Popular Style Guide
  - Airbnb: https://github.com/airbnb/javascript
- What format do you want your config file to be in? JavaScript
- Would you like to install now? Yes

<!-- > -->

## Pair up and solve linting errors

<!-- > -->

Pair with a person _you haven't paired with_ before. 

Using a **single computer** spend 10 mins solving linter errors person A's project. Switch computers after 10 mins and continue solving linter errors on person B's project. 

<!-- > -->

### Discuss the linter suggestions

- **Q:** What suggestions did the linter make that were obviously useful? 
- **Q:** Did the linter suggest anything that seemed strange or not obvious? 
- **Q:** Do you think your code is of better quality after?

<!-- > -->

<!-- ## Stretch goals

**Stretch Goal** - 

Version 2 of your library should add some new features. Your goal is to identify new string functions and utilities you can add to your library.

- Invent your own utility functions. 
- Research existing libraries on npm to identify useful functions you can implement. Research these: 
  - https://www.npmjs.com/package/string
  - https://www.npmjs.com/package/query-string
  - https://www.npmjs.com/package/chalk
  - https://www.npmjs.com/package/validator
  - https://www.npmjs.com/package/camelcase
  - https://www.npmjs.com/package/crypto-random-string
  - https://www.npmjs.com/package/url-parse
  - https://www.npmjs.com/package/magic-string

**Stretch Goal** - 

Use CodeClimate to analyze and give your code a report card: https://codeclimate.com/dashboard 

Note! Code Climate is free for open source projects!  -->


### Homework

Add continuous integration to your projects with GitHub actions. 

<!-- > -->

## Additional Resources

- 

<!-- > -->

<!-- 
## Minute-by-Minute [OPTIONAL]

| **Elapsed** | **Time**  | **Activity** |
| ----------- | --------- | -------------- |
| 0:00        | 0:05      | Introducntion  |
| 0:05        | 0:05      | Objectives     |
| 0:10        | 0:30      | Linting        |
| 0:40        | 0:10      | BREAK          |
| 0:50        | 0:15      | Travis CI      |
| 1:05        | 0:15      | Coveralls      |
| 1:20        | 0:25      | ** ??? **      |
| 1:45        | 0:05      | Wrap up review objectives |
| TOTAL       | 1:50      | -              | -->
