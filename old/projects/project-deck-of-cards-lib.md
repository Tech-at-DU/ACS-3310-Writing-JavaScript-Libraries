# **ACS 3310 - Assignment 4: Deck of Cards Library**

## **📌 Objective**
You will **design, implement, and publish** a **JavaScript library** for simulating a deck of playing cards. Your library should allow users to **create, shuffle, draw, and manage cards**, as well as provide additional functionality for card-based applications.

This assignment will help you:
✅ Work with **object-oriented programming** in JavaScript.  
✅ Learn **modular design** for reusable libraries.  
✅ Implement **shuffling algorithms and card operations**.  
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
deck-of-cards-lib/
│── src/
│   │── index.js        # Main entry file
│   │── classes/
│   │   │── Card.js     # Defines individual card behavior
│   │   │── Deck.js     # Defines deck operations
│   │   │── Hand.js     # Manages a hand of cards (Optional)
│   │── utils/
│   │   │── shuffle.js  # Implements shuffling algorithms
│   │   │── scoring.js  # Helper functions for game logic (Optional)
│── tests/
│   │── card.test.js
│   │── deck.test.js
│   │── hand.test.js
│── package.json
│── README.md
│── .gitignore
│── jest.config.js      # Jest configuration for testing
```

### **3️⃣ Implement the `Card` and `Deck` Classes**

#### **Card Class**
Your `Card` class should include:
- `suit`: The suit of the card (Hearts, Diamonds, Clubs, Spades).
- `value`: The value of the card (Ace, 2-10, Jack, Queen, King).
- `color`: Determine if the card is Red or Black.
- `toString()`: Returns a string representation (e.g., "Ace of Spades").
- `toEmoji()`: Returns a representation using Unicode suit symbols.

#### **Deck Class**
Your `Deck` class should:
- **Generate a full deck** (52 cards, plus optional Jokers).
- **Shuffle** the deck using the **Fisher-Yates algorithm**.
- **Draw cards** from the deck.
- **Discard cards** and track a discard pile.
- **Reset the deck** to its original state.
- **Sort cards** by suit or value.

### **4️⃣ Implement Shuffling and Sorting Algorithms**
- **Shuffle the deck** using Fisher-Yates shuffle.
- **Sort by suit** (`sortBySuit()`) and **sort by value** (`sortByValue()`).

### **5️⃣ Additional Challenges**
Enhance your library with additional features:
| Feature | Description |
|---------|------------|
| **Hand Class** | Add a `Hand` class to track cards held by a player. |
| **Multi-Deck Support** | Allow users to create decks with multiple sets of 52 cards. |
| **Custom Deck Sizes** | Create decks of different sizes (20, 36, 52, etc.). |
| **Game Logic Helper** | Implement functions to deal hands and evaluate winning conditions. |
| **Joker & Wildcard Rules** | Allow customization for Joker rules. |
| **Advanced Shuffling** | Implement different shuffle algorithms like **Overhand Shuffle**. |
| **Deck Presets** | Allow creation of custom decks (e.g., Tarot cards, Uno, or Pinochle). |

---

## **🧪 AI-Powered Enhancements**
### **🤖 AI Code Review**
Before finalizing your API, ask AI to **review your class structure and function names**.

📌 **AI Prompt:**  
> "I am designing a JavaScript deck of cards library. Please review my class structure and method names. Do they follow best practices? Any improvements?"

### **🧪 AI for Unit Testing**
Use AI to **generate Jest unit tests** for your library.

📌 **AI Prompt:**  
> "Generate Jest test cases for my `Deck` and `Card` classes. Include tests for:
> - Creating a deck
> - Drawing cards
> - Shuffling and verifying randomness
> - Ensuring discard pile works"

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
- **Build a reusable JavaScript library for a deck of playing cards.**  
- **Use AI for API design feedback and test generation.**  
- **Publish on npm, document, and showcase in a test app.**  
- **Improve debugging and best practices with AI assistance.**  
