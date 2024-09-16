### Higher-Order Functions
In JavaScript, functions can return other functions. This is a key feature of **higher-order functions**. When a function returns another function, the returned function can "remember" and access the variables from the outer function’s scope. This is called **closure**.

### Example: A Greeting Function
Let’s look at an example where one function returns another, which then uses the argument from the outer function:

```javascript
function createGreeting(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = createGreeting('Hello');
console.log(sayHello('Alice'));  // Output: Hello, Alice!

const sayHi = createGreeting('Hi');
console.log(sayHi('Bob'));  // Output: Hi, Bob!
```

In this example, the `createGreeting` function returns a new function that takes a `name` and returns a greeting. The inner function has access to the `greeting` from the outer function, even after `createGreeting` has finished executing.

---

### Key Points:
- **Higher-order functions** can return other functions.
- The returned function forms a **closure**, allowing it to access variables from the outer function’s scope.
- This is useful for creating flexible functions that can be customized.

---

### Challenge Problems

#### Challenge 1: Create a Discount Function

**Task**: Write a function `createDiscount` that takes a discount rate (e.g., 0.1 for 10%) and returns a new function that calculates the price after applying the discount. The returned function should take the original price as an argument.

**Starter Code:**

```javascript
function createDiscount(rate) {
  // Return a function that takes a price and returns the discounted price
}

// Test the function
const tenPercentDiscount = createDiscount(0.1);
console.log(tenPercentDiscount(100));  // Expected: 90

const twentyPercentDiscount = createDiscount(0.2);
console.log(twentyPercentDiscount(50));  // Expected: 40
```

---

#### Challenge 2: Create a Multiplier Function

**Task**: Write a function `createMultiplier` that takes a number `x` and returns a new function. The returned function should take another number and return the product of that number and `x`.

**Starter Code:**

```javascript
function createMultiplier(x) {
  // Return a function that multiplies a number by x
}

// Test the function
const multiplyBy2 = createMultiplier(2);
console.log(multiplyBy2(5));  // Expected: 10

const multiplyBy5 = createMultiplier(5);
console.log(multiplyBy5(3));  // Expected: 15
```

---

#### Challenge 3: Create a Power Function

**Task**: Write a function `createPower` that takes an exponent `n` and returns a new function. The returned function should take a number and raise it to the power of `n`.

**Starter Code:**

```javascript
function createPower(n) {
  // Return a function that raises a number to the power of n
}

// Test the function
const square = createPower(2);
console.log(square(4));  // Expected: 16

const cube = createPower(3);
console.log(cube(3));  // Expected: 27
```

---

#### Challenge 4: Create a Logger Function

**Task**: Write a function `createLogger` that takes a log prefix (e.g., `"Info"`, `"Warning"`) and returns a new function that logs messages with the given prefix. The returned function should take a message as an argument and print it to the console with the prefix.

**Starter Code:**

```javascript
function createLogger(prefix) {
  // Return a function that logs a message with the prefix
}

// Test the function
const infoLogger = createLogger("Info");
infoLogger("System is running.");  // Expected: Info: System is running.

const warningLogger = createLogger("Warning");
warningLogger("Low disk space.");  // Expected: Warning: Low disk space.
```

---

### Conclusion
Higher order functions are created when a function returns another function. Higher order functions capture variables defined in the containing function where they are defined, this is called closure. 