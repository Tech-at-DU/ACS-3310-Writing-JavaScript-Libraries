# **ACS 3310 - Assignment 3: Random Number Library**

## **📌 Objective**
You will **design, implement, and publish** a **JavaScript library for generating random numbers** in various formats, covering **features beyond the built-in `Math.random()`**.

This assignment will help you:
✅ Work with **advanced JavaScript functions**.  
✅ Learn **probability and randomness** in programming.  
✅ Build a **modular, reusable JavaScript library**.  
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

### **2️⃣ Write Your Library Code**
- Implement the library using **modular JavaScript files**.
- Organize functions into separate modules for **better scalability**.
- Provide a central API entry point using `src/index.js`.

### **Project Folder Structure**
```plaintext
random-utils/
│── src/
│   │── index.js          # Main entry file
│   │── utils/
│   │   │── core.js       # Core random functions (random, shuffle, flip, etc.)
│   │   │── distributions.js  # Specialized functions (gaussian, weighted selection)
│   │   │── format.js     # Formatting utilities (UUIDs, hex colors, dates)
│   │   │── dice.js       # Dice-rolling functions
│── tests/
│   │── core.test.js
│   │── distributions.test.js
│   │── format.test.js
│   │── dice.test.js
│── examples/            # Example implementations & test app
│── package.json
│── README.md
│── .gitignore
│── jest.config.js        # Jest configuration for testing
```  
- Implement the **RandomUtils** class in `src/index.js`.  

### **3️⃣ Test & Document Your Code**  
- Write **unit tests** using Jest or Vitest.  
- Document your API in `README.md`.  
- Publish your library on **npm**.  

---

## **🛠 Challenges: Implement the RandomUtils Class**
The `RandomUtils` class will provide **functions for generating random numbers**, covering **weighted randomness, dice rolls, and shuffling**.

### **🎲 Implementing the Library with Modules**

### **🔹 `src/utils/core.js` (Basic Random Functions)**
```js
export class CoreRandom {
  static random(n = 1, o = null) {
    return o === null ? Math.random() * n : Math.random() * (o - n) + n;
  }

  static flip(t = 0.5) {
    return Math.random() < t;
  }

  static shuffle(arr) {
    return arr.slice().sort(() => Math.random() - 0.5);
  }
}
```

### **🔹 `src/utils/distributions.js` (Advanced Random Functions)**
```js
export class RandomDistributions {
  static gaussian(mean = 0, stdDev = 1) {
    let u = 1 - Math.random(); // Avoid 0
    let v = Math.random();
    let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return mean + z * stdDev;
  }
}
```

### **🔹 `src/utils/format.js` (Random String & UUID)**
```js
export class RandomFormat {
  static uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
```

### **🔹 `src/utils/dice.js` (Dice Rolls & Dice Notation)**
```js
export class DiceRoller {
  static die(sides) {
    return Math.floor(Math.random() * sides) + 1;
  }

  static dieRoll(desc) {
    return desc.split("+").reduce((total, part) => {
      if (part.includes("d")) {
        let [count, sides] = part.split("d").map(Number);
        return total + Array.from({ length: count }, () => this.die(sides)).reduce((a, b) => a + b, 0);
      }
      return total + Number(part);
    }, 0);
  }
}
```

### **🔹 `src/index.js` (Main API)**
```js
import * as core from "./utils/core.js";
import * as distributions from "./utils/distributions.js";
import * as format from "./utils/format.js";
import * as dice from "./utils/dice.js";

export const RandomUtils = {
  ...core,
  ...distributions,
  ...format,
  ...dice,
};
```

Now, users can import the entire toolkit:
```js
import { RandomUtils } from "random-utils";
console.log(RandomUtils.random(10, 20));
```
Or import only what they need:
```js
import { random } from "random-utils/utils/core.js";
console.log(random(10, 20));
```
This class will include **static methods** for random number generation.

#### **Core Methods:**
✅ `random()` → **Returns a random number between 0 and 1**  
✅ `random(n)` → **Returns a random number between 0 and `n`**  
✅ `random(n, o)` → **Returns a random number between `n` and `o`**  
✅ `die(x)` → **Returns a function that generates numbers between 1 and `x`**  
✅ `shuffle(arr)` → **Returns a randomized copy of array `arr`**  
✅ `flip(t = 0.5)` → **Returns a random boolean (`true` or `false`), weighted by `t`**  
✅ `dieRoll(desc)` → **Parses a dice notation string and returns a roll total**  

---

## **🔹 Additional Problems for RandomUtils**

### **1️⃣ Random UUID Generator**
✅ `uuid()` → Generates a **random Universally Unique Identifier (UUID v4)**  
📌 **Example:** `uuid(); // "3f6e5a4d-2f93-4821-bb6f-758bce43f74a"`  

### **2️⃣ Random Hex Color Generator**
✅ `randomColor()` → Generates a **random hex color code**  
📌 **Example:** `randomColor(); // "#a3b5c7"`  

### **3️⃣ Random Date Generator**
✅ `randomDate(start, end)` → Generates a **random date** between two given dates  
📌 **Example:** `randomDate(new Date(2000, 0, 1), new Date(2025, 0, 1)); // "2013-07-15T10:23:59.123Z"`  

### **4️⃣ Gaussian (Normal) Distribution**
✅ `gaussian(mean, stdDev)` → Generates a **random number based on a normal distribution**  
📌 **Example:** `gaussian(100, 15); // Returns a number around 100 with standard deviation of 15`  

### **5️⃣ Random Weighted Selection**
✅ `weightedRandom(choices, weights)` → Returns a random element from `choices`, based on the given probability `weights`  
📌 **Example:** `weightedRandom(["apple", "banana", "cherry"], [0.1, 0.3, 0.6]); // Returns "cherry" most often`  

### **6️⃣ Random Alphanumeric String**
✅ `randomString(length, charset)` → Generates a **random string** of a given length from the provided character set  
📌 **Example:** `randomString(10, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"); // "X4gY92bLwZ"`  

### **7️⃣ Random Password Generator**
✅ `generatePassword(length, options)` → Generates a **secure random password** with options like **uppercase, numbers, special characters**  
📌 **Example:** `generatePassword(12, { uppercase: true, numbers: true, special: true }); // "A8@bD#2pQrT9"`  

### **8️⃣ Dice Pool with Best/Worst Selection**
✅ `bestOfRolls(n, diceType, bestN)` → Rolls `n` dice of `diceType`, returning the **best `bestN` rolls**  
📌 **Example:** `bestOfRolls(4, "d6", 3); // Rolls 4d6 and returns the highest 3 values`  

### **9️⃣ Generate a Random Username**
✅ `randomUsername()` → Generates a **random username** by combining an adjective, noun, and number  
📌 **Example:** `randomUsername(); // "BraveTiger42"`  

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
- **Build a JavaScript library for generating random numbers**.  
- **Use AI for API design feedback and test generation.**  
- **Publish on npm, document, and showcase in a test app.**  
- **Improve debugging and best practices with AI assistance.**  
