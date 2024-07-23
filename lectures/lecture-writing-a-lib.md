# ACS 3310 - Writing Libraries

You have used npm before. This class will explore what npm is, why we use it, and how to write an npm package. This term you will be responsible for writing three JS libraries. In the process you will use professional best practices like writing unit tests and TypeScript. 

If you have ever wondered what is in the node_modules folder, where all of that code comes from when you use commands like `npm i express`, and howyou migth write your own code that can be imported with npm, this class will answer those questions! 

Beyond furthering your understanding of npm this class will also give you chance practice writing JavaScript and solving code problems, and we all need more practice! 

## What is a library or framework? 

Mostly these are the same, and they are collections of code that someone has written to solve a generalized software problem. 

- Think about the code you write? Find an example of some code you have written. 
- Examining your code, identify code that is specific to this project. That means code that only works in this unique situation. This would things like id names that target elements in the DOM and code that is very specific to project itself. 
- In the example code, find code that is generalized could be used in other projects. You might recognize code that you find yourself writing often, in other projects.
- Sometimes these two are intertwined. 

Code that can be used in any project or code that you find yourself writing often is code that should be in a library! 

You have already been using library code, if your project uses npm. Anything you imported from npm is a library! 

When writing your library your goal is to write code that can be inserted into any situation. This means that the code in your library should not make any assumptions or have any requirements.

- Should not reference external or global variables 
- Should not refer to DOM elements by id or class names
- Should not use environment variables 

## What is an API? 
The term API stands for Application Programming Interface. It's popular to think of APIs as the interface of the web, but these are just web APIs. Any piece of software can have an API that allows it to interface with the world. 

When you write JavaScript that is used in a browser many of the functions that you use are part of the browser's API. These are things like: 

- console
- fetch
- addEventListener
- window
- document
- querySelector
- getElementByID
- and many more! 

These functions and properties are not part of the JavaScript language. Instead they exist in the browser to allow your JS to interface with the borwser. 

Take a look at the browser API (they call this the Web API, I'm using the term Browser because I think it describes this better.)

https://developer.mozilla.org/en-US/docs/Web/API

You may have used NodeJS before, this is a JS environment used to create servers written in JS. NodeJS has it's own API. Take a look and compare it to the Browser API. 

https://nodejs.org/docs/latest/api/

Notice, NodeJS has a filesystem API. This makes sense if you're writing a server, you have to trust your server to manage files. The Browser API has a filesystem API but it's total different! This makes sense because we need to trust our server handling local files but we can't trust web pages, that strangers have written, to handle our local files! 

### Your API
When writing your library you will also be designing it's API. The code you write needs have interface that other programmers will use to make use of the code you have written. 

The interface you create will mostly consist of functions/methods and their parameters and return values. 

The names you choose for these things are as important as the code that backs them! Rather than you using your own code, you are now writing code that will be used by others, who have not looked at the source. 

Think carefully about the API you create, imagine someone else using your code, can they infer the functionality? 

Creating an API involves more than just writing code; it requires careful planning and design to ensure the API is intuitive, efficient, and easy to use. Here’s some advice to help students create a robust API, with a focus on naming functions:

### Advice for Creating an API

#### 1. Plan Your API
- **Understand the Requirements**: Clearly define the purpose of your API and what it needs to achieve.
- **Design First**: Plan the structure of your API before you start coding. Outline the main functionalities and how they will interact.
- **Keep It Simple**: Aim for simplicity in design. An API should be easy to understand and use.

#### 2. Consistent Naming Conventions
- **Be Descriptive**: Use clear and descriptive names for functions. A function name should convey its purpose and action. For example, `getUserData` is more descriptive than `getData`.
- **Use Verbs for Actions**: Functions that perform actions should start with a verb. Examples include `fetchUser`, `updateProfile`, `deleteAccount`.
- **Use Nouns for Objects**: Functions that return specific objects or data should include the object’s name. For example, `getUser`, `getProductList`.
- **Consistency is Key**: Follow a consistent naming convention throughout your API. This includes the use of camelCase, PascalCase, or snake_case, but be consistent with your choice.

#### 3. Follow Established Patterns
- **CRUD Operations**: For APIs that manage data, use common CRUD (Create, Read, Update, Delete) operation names:
  - `createUser`
  - `getUser`
  - `updateUser`
  - `deleteUser`
- **HTTP Methods**: Align function names with the HTTP methods they will be used with (e.g., `GET`, `POST`, `PUT`, `DELETE`).

#### 4. Avoid Ambiguity
- **Be Specific**: Avoid generic names like `doSomething`. Instead, use specific names like `processPayment`.
- **Avoid Overloading**: Don’t overload function names with multiple meanings. Each function should have a single responsibility.

#### 5. Keep It Predictable
- **Predictable Results**: Ensure function names indicate the expected result. For example, `fetchUserData` should clearly return user data.
- **Standardize Parameters**: Use consistent parameter naming and order across similar functions.

#### 6. Provide Clear Documentation
- **Comment Your Code**: Write clear comments explaining what each function does, its parameters, and its return values.
- **API Documentation**: Create comprehensive documentation for your API. Include examples and use cases.

#### 7. Be consistent!
- **Be consistent**: Across your API use the same aming conventions and patterns. When you use a pattern use that same pattern everywhere! 

### Example of Good Naming Conventions

Here’s an example of a simple API for a user management system with well-named functions:

```javascript
class UserAPI {
  // Create a new user
  createUser(userData) {
    // logic to create user
  }

  // Retrieve user data by ID
  getUserById(userId) {
    // logic to get user by ID
    // suggests a parameter is required
  }

  // Update user information
  updateUser(userId, updatedData) {
    // logic to update user information
  }

  // Delete user by ID
  deleteUserById(userId) {
    // logic to delete user
    // suggests a parameter
  }

  // List all users
  listUsers() {
    // logic to list all users
  }

  // Get all posts
  getAllPosts() {
    // clearly we are getting all posts 
  }

  // get some posts
  getCommentsByUser(id) {
    // clearly we get some posts for a user id
  }
}
```

### Example of Poor Naming Conventions

For comparison, here’s an example with poorly named functions:

```javascript
class UserAPI {
  // Do something with a user
  doUserStuff(data) {
    // unclear logic
    // name does not suggest the parameter
  }

  // Get user information
  getInfo(id) {
    // name does not suggest that a parameter is required
    // what type of info does this return?
  }

  // Change user details
  changeData(id, data) {
    // what data does this return
    // does changing data update the store? 
  }

  // Remove a user
  remove(id) {
    // remove what? 
    // does this requrie a parameter? 
  }

  // Get users
  getAll() {
    // what does this get? 
  }

  // Get all posts
  posts() {
    // does this get soemthing is not clear 
  }

  // get some posts
  commentsByUser(id) {
    // unclear what this is doing
  }
}
```

### Summary

When creating an API, especially when naming functions, remember to:
- Be descriptive and clear.
- Use consistent naming conventions.
- Follow established patterns for common operations.
- Avoid ambiguous and overloaded names.
- Keep function names predictable and their purposes specific.
- Be consistent! Once you establish a pattern use it everywhere! 

By adhering to these guidelines, students will create APIs that are intuitive, easy to use, and maintainable, making their code more accessible and professional.

## Get started on your first library
Time to get started! Follow these steps. 

- Choose a project from the list of [projects here](../projects/projects.md). Imagine this a problem you have been tasked with as a freelancer or on the job. 
- Stop and think about the problem. Ask yourself some questions about the problem: 
  - What is required to solve the problem? 
  - Do I have enough information to solve this problem? If not ask the instructor some questions to clarify the problem. 
- Start maping out your API. 
  - Will your solution be one or more functions, or will your solution use a class? 
  - What will functions/methods will you need? 
    - What will these be named? 
    - What parameters will these take? What do these return? 
    - What are the types (string, number, bool, etc.) are these? 
  - Will you need a collaborating class? 
  - What properties or variables will you need? 

Consider the questions above. Start by writing some comments to map out your work. Don't worry about the details until you have a clear picture of the landscape! 

