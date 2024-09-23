### Inheritance vs. Composition in Object-Oriented Programming

Both **inheritance** and **composition** are fundamental design principles in object-oriented programming (OOP). They allow you to build relationships between classes or objects to promote reusability, flexibility, and maintainability of code. However, they are often used in different situations and come with their own **pros** and **cons**.

---

### Inheritance

**Inheritance** establishes an "is-a" relationship between classes. In this paradigm, one class (child/subclass) inherits properties and behaviors (methods) from another class (parent/superclass). The child class can override or extend the parent's functionality.

#### Example of Inheritance:
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const dog = new Dog('Rover');
dog.speak();  // Output: "Rover barks."
```

#### Pros of Inheritance:
1. **Code Reusability**: Shared behavior (methods) and state (properties) can be reused across multiple classes, reducing redundancy.
2. **Easy to Understand**: For simple relationships, inheritance models the real-world hierarchy well. For example, a `Dog` is a type of `Animal`, which makes it intuitive.
3. **Overrides and Extensions**: Subclasses can extend or override methods from the parent class to provide specific behavior.

#### Cons of Inheritance:
1. **Tight Coupling**: Child classes are tightly coupled to parent classes, making it hard to change one without affecting the other. Changes in the parent class can unintentionally break the child class.
2. **Fragile Base Class Problem**: If the base class (parent) evolves, all subclasses that depend on it need to be checked and possibly modified.
3. **Limited Flexibility**: Inheritance only allows you to extend one class (no multiple inheritance in many languages like JavaScript). You may have to force a relationship where it doesn't belong.
4. **Deeper Hierarchies**: When used excessively, inheritance can lead to deep and complex class hierarchies, which are difficult to maintain.

---

### Composition

**Composition** establishes a "has-a" or "uses-a" relationship. Instead of inheriting properties and methods from another class, objects are composed of smaller objects, each responsible for a specific behavior. It focuses on combining objects to achieve more complex behavior.

#### Example of Composition:
```javascript
class Engine {
  start() {
    console.log('Engine starts.');
  }
}

class Car {
  constructor() {
    this.engine = new Engine();
  }

  start() {
    this.engine.start();
    console.log('Car is running.');
  }
}

const car = new Car();
car.start();  // Output: "Engine starts." "Car is running."
```

#### Pros of Composition:
1. **Looser Coupling**: Objects are not tightly bound. You can change one part of the system without affecting others. For example, you can swap out or modify the `Engine` without changing the `Car`.
2. **Flexibility and Reusability**: You can easily reuse smaller objects (components) in different systems. Composition allows for more modular design.
3. **Avoids Deep Hierarchies**: Since objects are composed instead of inherited, there is no risk of deep inheritance chains. It flattens the design.
4. **Combining Behaviors**: You can dynamically combine multiple behaviors without being restricted by class hierarchies.
5. **Delegation**: With composition, you delegate specific responsibilities to different components rather than relying on inherited behavior.

#### Cons of Composition:
1. **More Boilerplate Code**: You might need to write more code since you're manually creating relationships between objects, especially when combining multiple components.
2. **Less Intuitive for Beginners**: The "is-a" relationship of inheritance is often easier for beginners to grasp than "has-a" relationships in composition.
3. **Multiple Objects**: It can sometimes result in managing a lot of small, interacting objects, which might increase complexity in some cases.
4. **Manual Delegation**: You have to explicitly wire objects together, which can be verbose and harder to follow than inheritance, where behavior is automatically inherited.

---

### When to Use Inheritance:

- **When there's a clear "is-a" relationship**: Use inheritance when the child class **is a** specialized version of the parent class (e.g., a `Dog` is an `Animal`).
- **Shared behavior across similar types**: Inheritance is great when multiple objects share core functionality, and this functionality is unlikely to change much over time.
- **Simpler hierarchy**: If the relationships are simple and unlikely to change, inheritance can offer a straightforward solution.

### When to Use Composition:

- **When there's a "has-a" or "uses-a" relationship**: If an object "has" another object as a part of it, or "uses" another object to perform actions, composition is more appropriate (e.g., a `Car` has an `Engine`).
- **For flexibility and modularity**: If you anticipate needing to swap out components or behaviors (like using different engines for different cars), composition allows for greater flexibility.
- **Avoiding tight coupling**: If you want to avoid the rigid dependency that comes with inheritance and prefer a more flexible, modular system, composition is a better choice.

---

### Summary:

| Aspect              | Inheritance                                      | Composition                                  |
|---------------------|--------------------------------------------------|----------------------------------------------|
| Relationship        | "Is-a"                                           | "Has-a" or "Uses-a"                          |
| Coupling            | Tightly coupled                                  | Loosely coupled                              |
| Reusability         | Reuses properties/methods from parent classes    | Reuses small, modular objects                |
| Flexibility         | Less flexible, changes can break subclasses      | More flexible, easy to swap components       |
| Hierarchy           | Can lead to deep hierarchies                     | Avoids deep hierarchies                      |
| Complexity          | Easier to implement in simple cases              | Can lead to more boilerplate and complexity  |
| Example             | `Dog extends Animal`                             | `Car has Engine`                            |

In general, composition is often favored in modern software design because it promotes flexibility, reusability, and modularity. However, inheritance can still be useful in scenarios where a strong, natural "is-a" relationship exists and the hierarchy is simple.









