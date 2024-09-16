
## JS Classes 
A class is the defintion of a data structure that encapsulates variables and functions. Creating an instance of a class creates a new copy of this structure with its unique variables and functions. 

Variables that belong to a class instance are called properties, and functions that belong to a class instance are called methods. 

Define a class like this: 

```JS
class Cauldron{
	constructor(size) {
		this.size = size
	}

	brewPotion() {
		console.log('boil, boil, toil, and trouble')
	}
}
```

### JS Class challenge problems
In JavaScript, classes provide a way to create objects and define their structure, including properties (data) and methods (functions). Classes are a blueprint for creating multiple objects with similar structure.

**Syntax:**

```javascript
class ClassName {
  constructor(property1, property2) {
    this.property1 = property1;
    this.property2 = property2;
  }

  method1() {
    console.log(this.property1);
  }

  method2() {
    return this.property2 * 2;
  }
}
```

- The `constructor` method is used to initialize the object’s properties.
- Inside methods, the `this` keyword refers to the current object.
- Methods can access properties and perform operations using `this.propertyName`.

### Example 1: Creating a Class

Let's define a `Person` class with a constructor to set a person's name and age, and a method to display their info.

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  displayInfo() {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}

const person1 = new Person("Alice", 25);
person1.displayInfo();  // Output: Name: Alice, Age: 25
```

### Example 2: Adding More Methods

We can add more methods to our `Person` class. Let's add a method to check if the person is an adult.

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  displayInfo() {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }

  isAdult() {
    return this.age >= 18;
  }
}

const person2 = new Person("Bob", 17);
console.log(person2.isAdult());  // Output: false
```

---

### Challenge Problems

#### Challenge 1: Create a `Car` Class
1. Create a `Car` class that has properties for `make`, `model`, and `year`.
2. Add a method `displayCar()` that prints the car's information.
3. Add another method `isNew()` that returns `true` if the car's year is 2023 or newer.

```javascript
class Car {
  constructor(make, model, year) {
    // Your code here
  }

  displayCar() {
    // Your code here
  }

  isNew() {
    // Your code here
  }
}

const car1 = new Car("Toyota", "Corolla", 2023);
// Test your methods by creating an instance and calling the methods
```

#### Challenge 2: Create a `Book` Class
1. Create a `Book` class that has properties for `title`, `author`, and `pages`.
2. Add a method `readPage()` that increments the number of pages read.
3. Add another method `hasFinished()` that returns `true` if all pages are read.

```javascript
class Book {
  constructor(title, author, pages) {
    // Your code here
  }

  readPage() {
    // Your code here
  }

  hasFinished() {
    // Your code here
  }
}

const book1 = new Book("1984", "George Orwell", 328);
// Test your methods by creating an instance and calling the methods
```

### Conclusion
Classes defintions, you can think of them as blueprints, for objects that can be created from the definition/blueprint. Cl;Classes encapsulate properties/variables, and methods/functions. A classes uses the keyword `this` to refer to the properties and methods it owns. 







### Getters and Setters in JavaScript
Getters and setters are special methods. These methods act like properties when viewed from outside of a class. 

A getter can take no arguments and define no parameters, and must return a value. 

A setter must take a single argument and define a single parameter to accept this, and can not return a value. 

Find these ideas in the example below. 

### Example: `Person` Class with Getters and Setters

Let’s look at a simple example of a `Person` class where we use getters and setters to control access to the `age` property.

```javascript
class Person {
  constructor(name, age) {
    this._name = name;
    this._age = age;
  }

  // Getter for name
  get name() {
    return this._name;
  }

  // Setter for name
  set name(newName) {
    if (newName.length > 0) {
      this._name = newName;
    } else {
      console.log("Name cannot be empty");
    }
  }

  // Getter for age
  get age() {
    return this._age;
  }

  // Setter for age with validation
  set age(newAge) {
    if (newAge > 0) {
      this._age = newAge;
    } else {
      console.log("Age must be a positive number");
    }
  }
}

const person1 = new Person("Alice", 30);

// Accessing name using getter
console.log(person1.name);  // Output: Alice

// Updating name using setter
person1.name = "Bob";
console.log(person1.name);  // Output: Bob

// Trying to set an invalid name
person1.name = "";  // Output: Name cannot be empty

// Accessing age using getter
console.log(person1.age);  // Output: 30

// Updating age using setter
person1.age = 25;
console.log(person1.age);  // Output: 25

// Trying to set an invalid age
person1.age = -5;  // Output: Age must be a positive number
```

### Key Points:
- **Getters** are used to get the value of a property.
- **Setters** are used to update or modify the value of a property, often with validation.

---

### Challenge Problems

#### Challenge 1: `Circle` Class with Getters and Setters

**Task**: Create a `Circle` class that represents a circle with a `radius`. You need to:
1. Implement a getter `area` that returns the area of the circle (`area = π * radius²`).
2. Implement a setter `radius` that updates the radius, but ensures that the new radius is positive. If a non-positive value is provided, display an error message.

**Starter Code:**

```javascript
class Circle {
  constructor(radius) {
    this._radius = radius;
  }

  // Implement the getter for the area

  // Implement the setter for the radius
}

const circle1 = new Circle(5);
console.log(circle1.area);  // Expected: area based on radius 5
circle1.radius = 10;        // Update the radius
console.log(circle1.area);  // Expected: area based on radius 10
circle1.radius = -3;        // Invalid radius, should display an error message
```

---

#### Challenge 2: `Rectangle` Class with Getters and Setters

**Task**: Create a `Rectangle` class that has properties for `width` and `height`. You need to:
1. Implement a getter `perimeter` that returns the perimeter of the rectangle (`perimeter = 2 * (width + height)`).
2. Implement setters for `width` and `height`, which should ensure both values are positive. Display an error message if an invalid value is provided.

**Starter Code:**

```javascript
class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  // Implement the getter for the perimeter

  // Implement the setter for width

  // Implement the setter for height
}

const rect1 = new Rectangle(4, 7);
console.log(rect1.perimeter);  // Expected: perimeter based on width 4 and height 7
rect1.width = 10;              // Update width
rect1.height = 5;              // Update height
console.log(rect1.perimeter);  // Expected: updated perimeter
rect1.width = -2;              // Invalid width, should display an error message
```

---

#### Challenge 3: `BankAccount` Class with Getters and Setters

**Task**: Create a `BankAccount` class that tracks the balance of a bank account. You need to:
1. Implement a getter `balance` that returns the current balance.
2. Implement a setter `deposit` that adds money to the balance, but only if the amount is positive.
3. Implement a setter `withdraw` that subtracts money from the balance, but only if the amount is positive and does not exceed the current balance. Display an error message if the amount is invalid.

**Starter Code:**

```javascript
class BankAccount {
  constructor(initialBalance) {
    this._balance = initialBalance;
  }

  // Implement the getter for balance

  // Implement the setter for deposit

  // Implement the setter for withdraw
}

const account = new BankAccount(100);
console.log(account.balance);  // Expected: 100
account.deposit = 50;          // Deposit 50
console.log(account.balance);  // Expected: 150
account.withdraw = 30;         // Withdraw 30
console.log(account.balance);  // Expected: 120
account.withdraw = 200;        // Invalid withdrawal, should display an error message
```

---

#### Challenge 4: `Temperature` Class with Getters and Setters

**Task**: Create a `Temperature` class that stores a temperature in Celsius. You need to:
1. Implement a getter `fahrenheit` that returns the temperature in Fahrenheit (`F = C * 1.8 + 32`).
2. Implement a setter `fahrenheit` that allows you to set the temperature in Fahrenheit, but it should convert the Fahrenheit temperature to Celsius.

**Starter Code:**

```javascript
class Temperature {
  constructor(celsius) {
    this._celsius = celsius;
  }

  // Implement the getter for Fahrenheit

  // Implement the setter for Fahrenheit
}

const temp = new Temperature(25);  // Celsius
console.log(temp.fahrenheit);      // Expected: 77 (Fahrenheit)
temp.fahrenheit = 100;             // Set to 100 Fahrenheit
console.log(temp.fahrenheit);      // Expected: 100 (updated value)
console.log(temp._celsius);        // Expected: 37.78 (Celsius)
```

### Conclusion
Classes can define getters and setters using the keywords `get` and `set`. Getters and setters look like properties from outside of a class, but look like functions from inside the inside the class. With this in mind, it makes sense that a getter can not accept any arguments and should return a value, and a setter must receive a single argument and not return a value. 

### Static Properties and Methods in JavaScript
In JavaScript, **static properties** and **static methods** belong to the class itself rather than to instances of the class. This means you can access them directly on the class, without needing to create an object (or instance) of that class.

- **Static properties**: Variables that belong to the class itself.
- **Static methods**: Functions that can be called on the class without creating an instance.

You declare static properties and methods using the `static` keyword.

### Example: `MathUtils` Class with Static Methods

Let’s look at an example of a `MathUtils` class that contains static methods for mathematical calculations.

```javascript
class MathUtils {
  // Static method to calculate square of a number
  static square(number) {
    return number * number;
  }

  // Static method to calculate cube of a number
  static cube(number) {
    return number * number * number;
  }
}

// Accessing static methods directly from the class
console.log(MathUtils.square(5));  // Output: 25
console.log(MathUtils.cube(3));    // Output: 27
```

In this example, we can call `MathUtils.square(5)` and `MathUtils.cube(3)` directly on the class without creating an instance of `MathUtils`.

---

### Key Points:
- **Static methods** are called on the class itself, not on instances.
- You cannot access static methods from an instance of the class; they are strictly tied to the class.

---

### Challenge Problems

#### Challenge 1: `Calculator` Class with Static Methods

**Task**: Create a `Calculator` class with the following static methods:
1. `add(a, b)` - Returns the sum of `a` and `b`.
2. `subtract(a, b)` - Returns the difference between `a` and `b`.
3. `multiply(a, b)` - Returns the product of `a` and `b`.
4. `divide(a, b)` - Returns the quotient of `a` and `b`. Ensure that `b` is not zero; if `b` is zero, return an error message.

**Starter Code:**

```javascript
class Calculator {
  // Implement the static add method

  // Implement the static subtract method

  // Implement the static multiply method

  // Implement the static divide method
}

// Test the static methods
console.log(Calculator.add(5, 3));       // Expected: 8
console.log(Calculator.subtract(10, 6)); // Expected: 4
console.log(Calculator.multiply(7, 4));  // Expected: 28
console.log(Calculator.divide(12, 4));   // Expected: 3
console.log(Calculator.divide(12, 0));   // Expected: Error message
```

---

#### Challenge 2: `TemperatureConverter` Class with Static Methods

**Task**: Create a `TemperatureConverter` class with the following static methods:
1. `celsiusToFahrenheit(celsius)` - Converts Celsius to Fahrenheit (`F = C * 1.8 + 32`).
2. `fahrenheitToCelsius(fahrenheit)` - Converts Fahrenheit to Celsius (`C = (F - 32) / 1.8`).

**Starter Code:**

```javascript
class TemperatureConverter {
  // Implement the static method to convert Celsius to Fahrenheit

  // Implement the static method to convert Fahrenheit to Celsius
}

// Test the static methods
console.log(TemperatureConverter.celsiusToFahrenheit(0));   // Expected: 32
console.log(TemperatureConverter.fahrenheitToCelsius(100)); // Expected: 37.78
```

---

#### Challenge 3: `Geometry` Class with Static Methods

**Task**: Create a `Geometry` class with the following static methods:
1. `areaOfCircle(radius)` - Returns the area of a circle (`area = π * radius²`).
2. `circumferenceOfCircle(radius)` - Returns the circumference of a circle (`circumference = 2 * π * radius`).
3. `areaOfRectangle(width, height)` - Returns the area of a rectangle (`area = width * height`).

**Starter Code:**

```javascript
class Geometry {
  // Implement the static method for area of a circle

  // Implement the static method for circumference of a circle

  // Implement the static method for area of a rectangle
}

// Test the static methods
console.log(Geometry.areaOfCircle(5));          // Expected: Area of circle with radius 5
console.log(Geometry.circumferenceOfCircle(7)); // Expected: Circumference of circle with radius 7
console.log(Geometry.areaOfRectangle(4, 6));    // Expected: Area of rectangle with width 4 and height 6
```

### Conclusion
Static methods belong to the class that defines them, this different from instance methods, which belong to each instance. Notcie in the examples, no instances were created instead, each method is called from the class where it is defined. 

### Static Properties in JavaScript

In JavaScript, **static properties** belong to the class itself, not to instances of the class. They are useful when you need to store class-wide values that are shared by all instances, like constants or counters.

To define a static property, you use the `static` keyword, just like with static methods.

---

### Example: `Counter` Class with Static Properties

Let’s look at an example where a `Counter` class has a static property that tracks how many `Counter` objects have been created.

```javascript
class Counter {
  // Static property to track the number of instances
  static count = 0;

  constructor() {
    Counter.count++;  // Increment the static count when a new instance is created
  }
}

// Create some Counter instances
const counter1 = new Counter();
const counter2 = new Counter();
const counter3 = new Counter();

// Access the static property
console.log(Counter.count);  // Output: 3
```

In this example, every time a new `Counter` instance is created, the static `count` property is incremented. The total number of instances is shared by all instances and can be accessed via `Counter.count`.

---

### Key Points:
- **Static properties** are declared with the `static` keyword and belong to the class, not instances.
- You can access static properties using the class name, e.g., `ClassName.property`.

---

### Challenge Problems

#### Challenge 1: `BankAccount` Class with Static Properties

**Task**: Create a `BankAccount` class that tracks the number of accounts created. You need to:
1. Implement a static property `totalAccounts` to count how many `BankAccount` objects have been created.
2. Increment the `totalAccounts` property every time a new `BankAccount` is instantiated.

**Starter Code:**

```javascript
class BankAccount {
  // Declare the static property to track the total number of accounts

  constructor(initialBalance) {
    this.balance = initialBalance;
    // Increment the static totalAccounts property when a new account is created
  }
}

// Test the static property
const account1 = new BankAccount(100);
const account2 = new BankAccount(200);
const account3 = new BankAccount(300);
console.log(BankAccount.totalAccounts);  // Expected: 3
```

---

#### Challenge 2: `Product` Class with Static Properties

**Task**: Create a `Product` class that keeps track of the `taxRate` for all products. You need to:
1. Implement a static property `taxRate` that stores the tax rate (e.g., `0.1` for 10% tax).
2. Add a method `calculatePriceWithTax()` to calculate the price of a product including tax.
3. Ensure that you can change the tax rate for all products by updating the static `taxRate` property.

**Starter Code:**

```javascript
class Product {
  // Declare the static property for the tax rate

  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  // Method to calculate the price with tax
  calculatePriceWithTax() {
    return this.price * (1 + Product.taxRate);
  }
}

// Set the initial tax rate
Product.taxRate = 0.1;

// Test the static property and method
const product1 = new Product('Laptop', 1000);
const product2 = new Product('Phone', 500);
console.log(product1.calculatePriceWithTax());  // Expected: 1100 (including 10% tax)
console.log(product2.calculatePriceWithTax());  // Expected: 550 (including 10% tax)

// Change the tax rate for all products
Product.taxRate = 0.2;
console.log(product1.calculatePriceWithTax());  // Expected: 1200 (including 20% tax)
console.log(product2.calculatePriceWithTax());  // Expected: 600 (including 20% tax)
```

---

#### Challenge 3: `Car` Class with Static Properties

**Task**: Create a `Car` class that tracks how many cars have been sold. You need to:
1. Implement a static property `totalCarsSold` to count how many cars have been sold.
2. Implement a method `sell()` that increases the `totalCarsSold` count whenever a car is sold.

**Starter Code:**

```javascript
class Car {
  // Declare the static property to track the total number of cars sold

  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  // Method to sell the car and increase the totalCarsSold count
  sell() {
    Car.totalCarsSold++;
    console.log(`${this.make} ${this.model} sold!`);
  }
}

// Test the static property and method
const car1 = new Car('Toyota', 'Corolla');
const car2 = new Car('Honda', 'Civic');
car1.sell();  // Expected: Toyota Corolla sold!
car2.sell();  // Expected: Honda Civic sold!
console.log(Car.totalCarsSold);  // Expected: 2
```

### Conclusion
Like static methods, static properties belong to the class rather than the instance. 