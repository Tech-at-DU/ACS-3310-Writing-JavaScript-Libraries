# **ACS 3310 - Assignment 6: API Utility Library**

## **📌 Objective**
You will **design, implement, and publish** a **JavaScript API utility library** that simplifies interactions with a chosen web API. Your library should provide **a clean and reusable interface** for handling API requests, responses, and errors efficiently.

This assignment will help you:
✅ Work with **fetch requests and asynchronous programming**.  
✅ Learn **how to abstract API interactions into a reusable library**.  
✅ Implement **error handling, caching, and authentication**.  
✅ Publish and document a package on **npm**.  

---

## **🌐 Suggested APIs to Work With**
Below are free public APIs that you can use to test and develop your API library:

1. **[NASA Open API](https://api.nasa.gov)** – Access a wealth of space-related data, including imagery, planetary information, and astrophysics data.
   - Example: `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY​`

2. **[OpenWeatherMap](https://openweathermap.org/api)** – Provides weather data, including current conditions and forecasts.
   - Example: `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY`

3. **[REST Countries](https://restcountries.com/)** – Retrieves country details such as names, capitals, and populations.
   - Example: `https://restcountries.com/v3.1/all`

4. **[PokéAPI](https://pokeapi.co/docs/v2)** – Provides information on Pokémon, including their abilities, stats, and evolutions.​
   - Example: `https://pokeapi.co/api/v2/pokemon/ditto`

5. **[Open Library API](https://openlibrary.org/developers/api)** – Offers access to a vast collection of book data, including titles, authors, and subjects.​
   - Example: `https://openlibrary.org/api/books?bibkeys=ISBN:0451526538&format=json`

6. **[CoinDesk](https://www.coindesk.com/coindesk-api)** – Provides real-time Bitcoin Price Index (BPI) data.
   - Example: `https://api.coindesk.com/v1/bpi/currentprice.json`

7. **[Pexels API](https://www.pexels.com/api/)** – Access high-quality and royalty-free images and videos for various search queries.​
   - Example: `https://api.pexels.com/v1/search?query=nature`

8. **[Deck of Cards API](https://deckofcardsapi.com)** – Simulate a deck of cards, draw cards, reshuffle, and more. Build a wrapper that plays a game.
   - Example: `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`

Choose an API from the list above or find another public API that interests you.

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
api-utils/
│── src/
│   │── index.js       # Main entry file
│   │── classes/
│   │   │── ApiClient.js  # Core API request handling class
│   │── utils/
│   │   │── fetchHelper.js   # Fetch API helper functions
│   │   │── errorHandler.js  # Error handling utilities
│   │   │── cache.js         # Caching logic
│── tests/
│   │── api.test.js
│   │── fetchHelper.test.js
│── package.json
│── README.md
│── .gitignore
│── jest.config.js    # Jest configuration for testing
```

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
- **Build a reusable JavaScript library for interacting with APIs.**  
- **Use AI for API design feedback and test generation.**  
- **Publish on npm, document, and showcase in a test app.**  
- **Improve debugging and best practices with AI assistance.**
