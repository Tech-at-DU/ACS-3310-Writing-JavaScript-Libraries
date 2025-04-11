# **ACS 3310 - Assignment 5: Date Utility Library**

## **📌 Objective**
You will **design, implement, and publish** a **JavaScript date utility library** that enhances the built-in `Date` object. Your library will provide **intuitive and readable** methods for working with dates, improving upon the default `Date` API.

This assignment will help you:
✅ Work with **object-oriented programming** in JavaScript.  
✅ Learn **date manipulation and formatting**.  
✅ Implement **modular, reusable JavaScript code**.  
✅ Publish and document a package on **npm**.  

---

## **🚀 Getting Started**
### **1️⃣ Set Up Your Project**  
- Create a folder for this project.  
- Inside, create a `src` directory for your source code.  
- Add `src/index.js` (your main library file).  
- Initialize npm:  
  ```sh
  npm init -y
  ```  
- Create a `README.md` for documentation.  
- Initialize a **GitHub repo**, commit, and push your work.  

### **2️⃣ Organize Your Library**
To make your library modular and scalable, organize your code into **separate modules**:
```plaintext
date-utils/
│── src/
│   │── index.js       # Main entry file
│   │── classes/
│   │   │── DateUtil.js  # Main date utility class
│   │── utils/
│   │   │── format.js   # Date formatting helper
│   │   │── when.js     # Relative time calculations
│── tests/
│   │── date.test.js
│   │── format.test.js
│   │── when.test.js
│── package.json
│── README.md
│── .gitignore
│── jest.config.js    # Jest configuration for testing
```

### **3️⃣ Implement the `DateUtil` Class**
Your `DateUtil` class should:
- **Wrap a native `Date` object** and provide an improved API.
- **Allow multiple instantiation formats**, mirroring JavaScript's `Date` constructor.
- **Provide human-readable properties** (e.g., `year`, `month`, `day`).
- **Include a `format()` method** for custom date formatting.
- **Implement `when()`** to express relative time differences.

#### **Instantiation**
Your class should allow different ways to create a date instance:
```js
const a = new DateUtil();               // Current date
const b = new DateUtil("January 1, 2000");  // From string
const c = new DateUtil(2023, 6, 15);    // From year, month, day
const d = new DateUtil(new Date());     // From existing Date
```

To do this you can use `args`. Read more about it here: https://javascript.info/rest-parameters-spread

Here is some sample code: 

```js
class D {
  constructor(...args) {
    // Here we are initializing and storing a date object
    this._date = new Date(...args); 
  }
}
```

TypeScript doesn't like this since the parameter types are variable. Here is one way to handle this with TypeScript.

```TS
class D {
  _date: Date
  // Constructor
  constructor(...args: any[]) {
    // this._date = new Date(...args)
    this._date = new Date(...(args as [number, number, number, number?, number?, number?, number?]));

  }
}
```

#### **Human-Readable Properties**
Replace clunky `Date` methods with more intuitive property names:
```js
const d = new DateUtil(2023, 6, 15);
console.log(d.year);   // 2023
console.log(d.yr);     // 23
console.log(d.month);  // July
console.log(d.mon);    // Jul
console.log(d.day);    // Saturday
console.log(d.dy);     // Sat
console.log(d.date);   // 15
```

The properties above need to derive values they return. To do that you can define these "getters". Read about "getter" methods here: https://javascript.info/property-accessors

Here is some sample code to get you started: 

```js
class D {
  constructor(...args) {
    // Here we are initializing and storing a date object
    this._date = new Date(...args); 
  }

  get year() {
    return this._date.getFullYear()
  }

  // ...
}
```

---

## **4️⃣ Additional Methods**
Enhance your library with the following **utility methods**:

### **📌 Simple Date formatting function (`format(formatString)`)**
✅ `format(formatString)` → Returns a **formtted date string** determined by the `formatString`. This is similar to formatting functions used in other langauges. Your function should replace any character on the list below with the associated date value. 

| Format Character | Description | Example |
|:-----------------|:------------|:--------|
| Y | 4-digit year | 2025 |
| y | 2-digit year | 25 |
| m | Month as a number (01-12) | 04 |
| B | Full month name | April |
| b | Abbreviated month name | Apr |
| d | Day of the month (01-31) | 10 |
| A | Full weekday name | Thursday | 
| a | Abbreviated weekday name | Thu |
| H | Hour (00-23) | 19 |
| I | Hour (01-12) | 07 |
| M | Minute (00-59) | 36 |
| S | Second (00-59) | 00 |
| p | AM or PM | PM |


📌 **Example:**

### **📌 Human-Readable Relative Date (`when()`)**
✅ `when()` → Returns a **human-readable string** describing the time difference between the date instance and now.
📌 **Example:**
```js
const past = new DateUtil(2020, 1, 1);
console.log(past.when());  // "3 years ago"

const future = new DateUtil(2025, 1, 1);
console.log(future.when());  // "2 years from now"
```

### **📌 Check If a Year is a Leap Year**
✅ `isLeapYear()` → Returns `true` if the year is a leap year, otherwise `false`.  
📌 **Example:**
```js
const d = new DateUtil(2024, 1, 1);
console.log(d.isLeapYear()); // true
```

### **📌 Get Number of Days in the Current Month**
✅ `daysInMonth()` → Returns the number of days in the current month.  
📌 **Example:**
```js
const d = new DateUtil(2023, 1, 1);
console.log(d.daysInMonth()); // 28 (for February 2023)
```

### **📌 Find the Next Occurrence of a Weekday**
✅ `nextWeekday(day)` → Finds the next occurrence of a given weekday.  
📌 **Example:**
```js
const d = new DateUtil();
console.log(d.nextWeekday("Monday")); // "Next Monday: 2023-07-24"
```

### **📌 Get Difference in Days Between Two Dates**
✅ `diffInDays(date)` → Returns the difference in days between two dates.  
📌 **Example:**
```js
const d1 = new DateUtil(2023, 6, 1);
const d2 = new DateUtil(2023, 6, 15);
console.log(d1.diffInDays(d2)); // 14
```

### **📌 Convert Date to Unix Timestamp**
✅ `toUnix()` → Returns the date as a Unix timestamp.  
📌 **Example:**
```js
const d = new DateUtil();
console.log(d.toUnix()); // 1672531199
```

---

## **🧪 AI-Powered Enhancements**
### **🤖 AI Code Review**
Before finalizing your API, ask AI to **review your class structure and function names**.

📌 **AI Prompt:**  
> "I am building a JavaScript date utility library. Please review my class structure and method names for clarity. What improvements would you suggest?"

### **🧪 AI for Unit Testing**
Use AI to **generate Jest unit tests** for your library.

📌 **AI Prompt:**  
> "Generate Jest test cases for my `DateUtil` class. Include tests for:
> - Creating a date
> - Formatting a date
> - Checking relative time calculations"

📌 **🛠 Activity:**  
1. Generate test cases using AI.  
2. Review & refine for **edge cases**.  

---

## **📊 Evaluation Rubric**
| **Category** | **Points** |
|------------|---------|
| Core functions implemented | 10 |
| Test app (demonstration) | 10 |
| Uses TypeScript | 5 |
| Has unit tests | 5 |
| Uses bundling (e.g., Webpack, Rollup) | 3 |
| Implements CI (GitHub Actions) | 2 |
| **Total** | **35** |

---

## **🚀 Summary**
- **Build a reusable JavaScript library for working with dates.**  
- **Use AI for API design feedback and test generation.**  
- **Publish on npm, document, and showcase in a test app.**  
- **Improve debugging and best practices with AI assistance.**
