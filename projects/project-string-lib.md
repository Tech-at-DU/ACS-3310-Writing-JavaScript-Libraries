# **ACS 3310 - Assignment 1: String Utility Library**

## **📌 Objective**
You will **design, implement, and publish** a JavaScript string utility library using a **class-based approach**. The goal is to organize **string manipulation functions as static methods within a class** to make the library modular, reusable, and easy to maintain.

This assignment will help you:
✅ Learn **API design** for reusable JavaScript libraries.  
✅ Work with **npm, TypeScript, and unit testing**.  
✅ Publish and document a package on **npm**.  

---

## **🚀 Getting Started**
1️⃣ **Set Up Your Project**  
- Create a folder for this project.  
- Inside, create a `src` directory for your source code.  
- Add `src/index.js` (your main library file).  
- Initialize npm:  
  ```sh
  npm init -y
  ```  
- Create a `README.md` for documentation.  
- Initialize a GitHub repo, commit, and push your work.  

2️⃣ **Write Your Library Code**  
- Implement **all required functions** as **static methods of a class** in `src/index.js`.  

3️⃣ **Test & Document Your Code**  
- Write **unit tests** using Jest or Vitest.  
- Document your API in `README.md`.  
- Publish your library on **npm**.  

---

## **🛠 Challenges: Implement These String Functions**
Each function should be a **static method** in a class called `StringUtils`.

### **Class-Based Structure**
```js
class StringUtils {
  /**
   * Returns true if the string is empty or contains only whitespace.
   * @param {string} str
   * @returns {boolean}
   */
  static isEmpty(str) {
    return str.trim().length === 0;
  }

  /**
   * Capitalizes the first letter of the string.
   * @param {string} str
   * @returns {string}
   */
  static capitalize(str) {
    if (this.isEmpty(str)) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Converts a string to kebab-case.
   * @param {string} str
   * @returns {string}
   */
  static kebabCase(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, "-");
  }
}

export default StringUtils;
```

### **Regular Expressions: When to Use Them?**
Regular expressions (**regex**) are powerful tools for **pattern matching and replacement**, but they are not always the best solution. Here’s a guide on when to use them:

✔ **Use regex for:**
- Replacing multiple spaces, symbols, or formatting text (`/\s+/g`).
- Extracting specific patterns (e.g., words, numbers, special characters).
- Validating input (e.g., checking for emails, phone numbers, etc.).

❌ **Avoid regex for:**
- Simple string transformations (e.g., `.toLowerCase()`, `.trim()`, `.slice()`).
- Operations that are clearer with loops or `.map()`.

Example:
```js
// Good use of regex (finding words)
static extractWords(str) {
  return str.match(/\b\w+\b/g) || [];
}

// Simple alternative to regex (trimming spaces)
static removeExtraSpaces(str) {
  return str.split(" ").filter(word => word !== "").join(" ");
}
```

---

### **Required Methods**
Each function should handle edge cases such as empty strings, unexpected characters, or invalid input types. Below are examples to clarify expected behavior.
📌 **Implement these functions as static methods in `StringUtils`**  
✅ `capitalize(str)` → Capitalizes **first character**  
📌 **Example:** `capitalize("hello world")` → "Hello world"  
📌 **Edge case:** Empty string returns ""  
✅ `allCaps(str)` → Capitalizes **all characters**  
📌 **Example:** `allCaps("foo bar")` → "FOO BAR"  
📌 **Edge case:** Non-alphabetic characters remain unchanged  
✅ `capitalizeWords(str)` → Capitalizes **first letter of each word**  
📌 **Example:** `capitalizeWords("do all the things")` → "Do All The Things"  
📌 **Edge case:** Multiple spaces between words are reduced to a single space  
✅ `removeExtraSpaces(str)` → Removes **leading, trailing, and excess spaces**  
📌 **Example:** `removeExtraSpaces("   Hello    world!   ")` → "Hello world!"  
📌 **Edge case:** Handles strings with only spaces correctly  
✅ `kebabCase(str)` → Converts string to **kebab-case**  
📌 **Example:** `kebabCase("Hello world")` → "hello-world"  
📌 **Edge case:** Removes special characters except hyphens  
✅ `snakeCase(str)` → Converts string to **snake_case**  
📌 **Example:** `snakeCase("Hello world")` → "hello_world"  
📌 **Edge case:** Handles multiple spaces and special characters correctly  
✅ `camelCase(str)` → Converts string to **camelCase**  
📌 **Example:** `camelCase("Camel Case")` → "camelCase"  
📌 **Edge case:** Handles strings with mixed capitalization  
✅ `truncate(str, maxLength)` → Truncates a string & adds "..." if too long  
📌 **Example:** `truncate("This is a long sentence", 10)` → "This is a..."  
📌 **Edge case:** If `maxLength` is greater than the string length, return original string  
✅ `maskEmail(email)` → Masks part of an email address  
📌 **Example:** `maskEmail("user@example.com")` → "u***@example.com"  
📌 **Edge case:** Ensure valid email format before applying masking  
✅ `isEmail(str)` → Checks if a string is a valid email  
📌 **Example:** `isEmail("test@example.com")` → `true`  
📌 **Edge case:** Rejects malformed emails like "test@@example"  
✅ `isPalindrome(str)` → Checks if a string is a palindrome  
📌 **Example:** `isPalindrome("racecar")` → `true`  
📌 **Edge case:** Ignores case and spaces, e.g., "A Santa at NASA"  
✅ `countWords(str)` → Counts the number of words in a string  
📌 **Example:** `countWords("Hello world!")` → `2`  
📌 **Edge case:** Handles extra spaces and punctuation correctly  

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
- **Build a reusable JavaScript string utility library**.  
- **Use AI for API design feedback and test generation**.  
- **Publish on npm, document, and showcase in a test app**.  
- **Improve debugging and best practices with AI assistance**.  

Would you like to add any final refinements? 🚀

