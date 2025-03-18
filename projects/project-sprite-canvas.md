# **ACS 3310 - Assignment 2: Sprite Canvas Library**  

## **📌 Objective**
You will **design, implement, and publish** a **JavaScript library for working with the HTML5 Canvas API**, allowing users to create and manage **sprite-based objects** with a structured API.

This assignment will help you:
✅ Work with **object-oriented programming** in JavaScript.  
✅ Learn **canvas rendering and animation**.  
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
- Implement the **Sprite** and **SpriteManager** classes in `src/index.js`.  

### **3️⃣ Test & Document Your Code**  
- Write **unit tests** using Jest or Vitest.  
- Document your API in `README.md`.  
- Publish your library on **npm**.  

---

## **🛠 Challenges: Implement the Sprite and SpriteManager Classes**
### **🎨 The `Sprite` Class**
The `Sprite` class represents a **drawable object** in the canvas. It should support **both shapes and images**.

#### **Properties:**
Each sprite should have the following properties:
- `x` → **Horizontal position** on the canvas.  
- `y` → **Vertical position** on the canvas.  
- `width` → **Sprite width** in pixels.  
- `height` → **Sprite height** in pixels.  
- `rotation` → **Rotation angle** in degrees.  
- `color` → **Fill color** (leave `undefined` to not fill).  
- `stroke` → **Stroke width** (set to `0` for no stroke).  
- `strokeColor` → **Stroke color**.  
- `image` → **Path to an image file** (if provided, the sprite draws the image instead of a shape).  

**📌 Example: Creating a Sprite**
```js
const player = new Sprite({
  x: 50,
  y: 50,
  width: 40,
  height: 40,
  color: "blue",
  stroke: 2,
  strokeColor: "black"
});
```

#### **Methods:**
- `render(ctx)` → **Draws the sprite on the canvas** using a given **canvas rendering context (`ctx`)**.  

**📌 Example: Rendering a Sprite**
```js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

player.render(ctx);
```

---

### **🎮 The `SpriteManager` Class**
This class **manages multiple sprites** and renders them efficiently.

#### **Constructor:**
- **Takes the `id` of a `<canvas>` element** and initializes the rendering context.

#### **Methods:**
- `addSprite(sprite)` → Adds a **sprite** to the manager.  
- `update()` → **Draws all sprites** in the list.  
- `start()` → **Begins an animation loop** using `requestAnimationFrame()`.  

**📌 Example: Using `SpriteManager`**
```js
const manager = new SpriteManager("gameCanvas");

const enemy = new Sprite({
  x: 100,
  y: 75,
  width: 50,
  height: 50,
  color: "red"
});

manager.addSprite(player);
manager.addSprite(enemy);
manager.start(); // Continuously renders all sprites
```

---

## **🎯 Bonus Features (Optional)**
🌟 **Add physics-like movement** → Implement `velocityX` and `velocityY` for **smooth movement**.  
🌟 **Collision detection** → Add a method to **detect sprite collisions**.  
🌟 **Event listeners** → Allow sprites to react to **mouse clicks or keyboard events**.  
🌟 **Sprite animation** → Support **frame-based sprite animations**.  

---

## **🧪 AI-Powered Enhancements**
### **🤖 AI Code Review**
Before finalizing your API, ask AI to **review your class structure and function design**.

📌 **AI Prompt:**  
> "I am building a JavaScript sprite library for canvas. Please review my class structure and function names for clarity and usability. Here is my code:  
> ```js
> class Sprite { /* implementation */ }  
> class SpriteManager { /* implementation */ }
> ```
> Are my method names intuitive? What improvements would you suggest?"

---

### **🧪 AI for Unit Testing**
Before writing tests yourself, ask AI to **generate test cases** for your library.

📌 **AI Prompt:**  
> "Generate Jest test cases for my `Sprite` and `SpriteManager` classes.  
> Include tests for:  
> - Creating a sprite  
> - Rendering a sprite  
> - Managing multiple sprites  
> - Handling animation loops."

📌 **🛠 Activity:**  
1. Generate test cases using AI.  
2. Review & modify for **edge cases**.  

---

## **📝 Test App Requirement**
Your submitted homework **must include a test app** that **demonstrates your library in action**.

✔ **Must include:**  
- Importing your library into a **React project** with npm.  
- A simple canvas-based **interactive demo**.  

📌 **Example:** A test app where **clicking the canvas adds a new sprite**.

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
- **Build a JavaScript library for managing sprites in the canvas.**  
- **Use AI for API design feedback and test generation.**  
- **Publish on npm, document, and showcase in a test app.**  
- **Improve debugging and best practices with AI assistance.**  
