# **ACS 3310 - Writing JavaScript Libraries**

## **What You’ll Learn**
In this course, you’ll build three JavaScript libraries, publish them on npm, and apply industry best practices like unit testing and TypeScript.

If you've ever wondered **what's inside `node_modules`**, where packages come from when you run `npm i express`, or how to **create your own npm package**, this course will answer those questions!

---

## **What is a Library?**
A **library** is a reusable collection of code that solves a general problem. You’ve already used libraries—every package installed via npm is one!

### **📝 Activity: Identify Library-Worthy Code**
1. Find a piece of JavaScript code you’ve written.
2. Identify **specific** code tied to that project (e.g., DOM selectors, hardcoded values).
3. Identify **general** code that could be reused across different projects.
4. Discuss: What parts of your code **could** be turned into a library?

A good library:
- **Doesn’t assume an environment** (e.g., doesn’t rely on `document` or `window`).
- **Doesn’t use global variables**.
- **Is modular and reusable**.

---

## **What is an API? (More Than Just Web APIs!)**
An **API (Application Programming Interface)** is **any** set of functions, methods, or objects that define how code interacts with other code. 

### **🔍 Common Misconception:** 
Many students think APIs are only for **web requests** (e.g., REST APIs). But an API is **any structured way for code to communicate with other code**.

### **Examples of APIs You Already Use**
- **JavaScript’s Built-in API** → Methods like `Math.random()`, `Array.map()`
- **Browser API (Web API)** → `fetch()`, `document.querySelector()`
- **Node.js API** → `fs.readFile()`, `process.env`
- **Custom APIs** → Any reusable function, class, or module **you write** is an API!

### **🛠 Activity: Recognizing APIs**
1. Look at the following code snippets and decide: **Is this an API? Why or why not?**
   
   ```js
   // Example 1: Is this an API?
   function calculateTax(price, taxRate) {
     return price * taxRate;
   }
   ```

   ```js
   // Example 2: Is this an API?
   const TaxCalculator = {
     calculate(price, rate) {
       return price * rate;
     }
   };
   ```

   ```js
   // Example 3: Is this an API?
   class TaxCalculator {
     constructor(rate) {
       this.rate = rate;
     }
     calculate(price) {
       return price * this.rate;
     }
   }
   ```

2. **Discussion**: What makes an API different from just a function? (Hint: APIs are meant for **reuse and interaction**.)

### **AI Prompt to answer the question above**
> I have three JavaScript code snippets. I want to determine whether each one qualifies as an API and why. An API (Application Programming Interface) is a structured way for code to interact with other code, often consisting of multiple functions, objects, or classes.  
>  
> Here are the three snippets:  
>  
> **Snippet 1:**  
> ```js
> function calculateTax(price, taxRate) {
>   return price * taxRate;
> }
> ```  
>  
> **Snippet 2:**  
> ```js
> const TaxCalculator = {
>   calculate(price, rate) {
>     return price * rate;
>   }
> };
> ```  
>  
> **Snippet 3:**  
> ```js
> class TaxCalculator {
>   constructor(rate) {
>     this.rate = rate;
>   }
>   calculate(price) {
>     return price * this.rate;
>   }
> }
> ```  
>  
> Please answer the following for each snippet:  
> 1. **Is this an API?** (Yes or No)  
> 2. **Why or why not?**  
> 3. **How could this be improved to be a better API?**  

---

## **Best Practices for API Design**
1. **Plan First** → Outline functions before coding.
2. **Use Clear, Consistent Naming**  
  - ✅ `getUserById(id)` 
  - ❌ `getInfo(id)`
  - ✅ `fetchPosts()` 
  - ❌ `doStuff()`
3. **Follow Common Patterns**  
   - CRUD: `createUser()`, `getUser()`, `updateUser()`, `deleteUser()`
4. **Avoid Ambiguity** → Function names should describe what they return.
5. **Keep It Predictable** → Users should understand the API without reading the source code.

---

## **🛠 Activity: Stub Your Own API (AI-Powered API Design)**
To practice designing APIs, you will **stub out an API** (define its structure without implementing functionality) and use **AI to evaluate your work**.

### **Step 1: Choose a Project Idea**
Pick one of the following or come up with your own:
1. **Task Manager API** → A library for managing to-do lists.
2. **Weather Data API** → A module for fetching and formatting weather data.
3. **Game Leaderboard API** → A library to track player scores in a game.
4. **AI Chatbot Framework** → A simple interface for interacting with an AI chatbot.
5. **Unit Converter API** → A library for converting between metric and imperial units.

---

### **Step 2: Stub Your API**
Write the **skeleton code** for your API. **Do not implement the logic**—focus only on defining the structure.

📌 **Example Stub for a Game Leaderboard API**:
```js
class Leaderboard {
  constructor(gameName) {
    this.gameName = gameName;
    this.scores = [];
  }

  /**
   * Add a new score to the leaderboard.
   * @param {string} playerName
   * @param {number} score
   */
  addScore(playerName, score) {
    // To be implemented
  }

  /**
   * Get the top N scores.
   * @param {number} count
   * @returns {Array<{player: string, score: number}>}
   */
  getTopScores(count) {
    // To be implemented
  }

  /**
   * Reset the leaderboard.
   */
  resetLeaderboard() {
    // To be implemented
  }
}
```

---

### **Step 3: AI-Powered API Evaluation**
Once you've written your stub, **use an AI tool (e.g., ChatGPT, Copilot)** to review your design.

#### **📌 AI Prompt for Evaluation**
> I designed an API for a JavaScript library, but I haven't implemented it yet. Please review my API structure and provide feedback.  
> - Are my function and method names clear?  
> - Do my parameters and return types make sense?  
> - Is my API intuitive and easy to use?  
> - How can I improve the structure?  
>  
> Here is my API stub:  
> ```js
> (Insert your API stub here)
> ```

---

### **Step 4: Improve Your API**
- Based on AI feedback, **refine your API**.
- Consider **adding missing functionality** or **renaming unclear methods**.
- Discuss in small groups: **Did the AI provide useful insights? What did you change?**

---

### **Key Takeaway:**
**An API is not just a web API**—it’s any structured interface that allows code to interact with other code. By the end of this course, you’ll not only understand APIs but also **design and build your own.** 🚀
