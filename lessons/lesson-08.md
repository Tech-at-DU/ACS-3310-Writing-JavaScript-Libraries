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

Another use of CI is running tests and providing other feedback as each new addition is integrated into the codebase.

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

CI is a modern software development *best practice*. You should always be striving to follow best practices in your work and be familiar with what industry considers best practices if you plan to integrate yourself with the industry! 

<!-- > -->

Using CI will provides feedback on the quality of a codebase as each new change is pushed. Feedback is good, automated feedback is even better since it saves you time and energy!

<!-- > -->

## Learning Objectives

1. Use Linting to improve code quality and catch bugs
1. Use Continuous Integration to automate testing
1. Implement industry best practices

<!-- > -->

## GitHub Actions

<!-- > -->

You're probably using GitHub to track changes, collaborate and backup your projects. GitHub actions are built into GitHub allowing you to automate tasks. 

<!-- > -->

In the next few steps you will use GitHub Actions to run unit tests on one of your repoistories. 

<!-- > -->

Choose a repoistory that has unit tests already implemented. You'll be adding GitHub actions to this repo. 

<!-- > -->

I used the example project here for testing: 

https://github.com/Tech-at-DU/GitHub-Actions

I followed the guides here: 

- https://medium.com/swlh/jest-and-github-actions-eaf3eaf2427d
- https://docs.github.com/en/actions/quickstart

<!-- > -->

GitHub Actions are added through the Actions option in your repo at GitHub.com. 

- Click **Actions**
- Search for the Node.js Workflow

<!-- > -->

Notice that you're adding a new .yml file at .github/workflows/

This yml file contains instructions telling GitHub what to do when you push changes or accept a pull request.

This is what I used: 

```
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: Node.js CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x, 14.x, 16.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    # Install required deps for action
    - name: Install Dependencies
      run: npm install
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test
```

<!-- > -->

Push your code. Chekc the Actions tab. In your github page. You'll see the actions running there. 

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

## Travis CI 

<!-- > -->

[Travis CI](https://travis-ci.com) is a Continuous Integration platform. It automates building and testing your software projects. 

Follow the instructions here: 

https://docs.travis-ci.com/user/for-beginners/

https://docs.travis-ci.com/user/tutorial/#to-get-started-with-travis-ci

<!-- > -->

### Setup Travis-CI 

<!-- > -->

Travis-CI connects to your GitHub repos and automatically process files when it sees you push to a master or a branch. To make this magic work you'll need to authorize Travis through GitHub.

[Sign up for Travis](https://travis-ci.com) with GitHub.

Authorize Travis with your GitHub account.

<!-- > -->

#### Add .travis.yml

Travis uses a config file to describe how it should work with the files in your repos. 

Add a new file to the root directory of your String Lib project. Name this file:

`.travis.yml`

<!-- > -->

Add the following to this file: 

```yml
sudo: false
language: node_js
node_js:
- stable
branches:
  only:
  - master
cache:
  directories:
  - node_modules
before_install:
- npm update
install:
- npm install
script:
- npm test
- npm run coveralls
```

<!-- > -->

This config script uses the latest stable version of node, builds your project from the master branch, install node modules, and then runs your npm test script followed by the coveralls script. 

The `coverall` script you haven't added yet! Coveralls is another service that provides more information about your builds. You'll set this up this in the next step. 

https://docs.travis-ci.com/user/tutorial/

<!-- > -->

### Coveralls 

Coveralls is a service that helps you track code coverage. Code coverage answers the question: how much of my code is covered by the testing? Essentially it will give you a score telling you how much of your code is covered by the unit tests that exist. 

Go to [Coveralls.io](https://coveralls.io)

<!-- > -->

Create an account and login.

Click your account and link your GitHub.

Click Add Repo and add your String Lib Repo to Coveralls.

Click Repos then click the Name of string repo.

<!-- > -->

Add the Coveralls package to your project. 

`npm install coveralls --save-dev`

Add this line to your `package.json`:

```JSON
"scripts": {
  ...
  "coveralls": "jest --coverage --coverageReporters=text-lcov | coveralls",
  ...
},
```

<!-- > -->

Find the "Coverage" badge. Click the embed button to the upper right. Copy the Markdown text. You can paste this into the README.md in the GitHub Repo of your library. 

https://coveralls.io

https://medium.com/@ollelauribostr/start-measuring-coverage-with-jest-travis-ci-and-coveralls-1867928aca42

<!-- > -->

### Give yourself a badge! 

Give yourself a badge or two, you've earned them! Both Travis and Coveralls provide dynamic badges that show the state of a project in a repo. You should attach these badges to your repo. 

**Q:** Why add these badges? 

**A:** It will show the status of your software project at a glance. It increases the credibility of your repositories.

<!-- > -->

#### Travis badge 

Go to your repo on Travis. You should see a badge to the left of the GitHub repo name. 

Click this and choose "Markdown" from the menu.  

Copy the Markdown code from the text box and paste it into your README. 

<!-- > -->

#### Coveralls Badge

Go to Coveralls. Visit the page for the repo you were working on. 

It should display a coverage badge near the right side. Click the tiny embed button up and to the right of the badge. 

Copy the Markdown code in the text box. 

Paste the markdown code into your repo. 

<!-- > -->

## Stretch goals

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

Note! Code Climate is free for open source projects! 


### Homework

[Continuous Integration](./assignments/assignment-04.md)

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
