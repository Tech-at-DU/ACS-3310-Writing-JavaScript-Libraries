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

1. **[JSONPlaceholder](https://jsonplaceholder.typicode.com/guide/)** – Fake online REST API for testing and prototyping.
   - Example: `https://jsonplaceholder.typicode.com/posts`

2. **[OpenWeatherMap](https://openweathermap.org/api)** – Provides weather data, including current conditions and forecasts.
   - Example: `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY`

3. **[REST Countries](https://restcountries.com/)** – Retrieves country details such as names, capitals, and populations.
   - Example: `https://restcountries.com/v3.1/all`

4. **[Cat Facts](https://catfact.ninja/)** – Fetches random cat facts.
   - Example: `https://catfact.ninja/fact`

5. **[Dog CEO's Dog API](https://dog.ceo/dog-api/)** – Returns random dog images.
   - Example: `https://dog.ceo/api/breeds/image/random`

6. **[CoinDesk](https://www.coindesk.com/coindesk-api)** – Provides real-time Bitcoin Price Index (BPI) data.
   - Example: `https://api.coindesk.com/v1/bpi/currentprice.json`

7. **[BoredAPI](https://www.boredapi.com/)** – Suggests random activities to overcome boredom.
   - Example: `https://www.boredapi.com/api/activity`

8. **[Agify.io](https://agify.io/)** – Predicts the age of a person based on their name.
   - Example: `https://api.agify.io?name=michael`

9. **[Genderize.io](https://genderize.io/)** – Predicts the gender of a person based on their name.
   - Example: `https://api.genderize.io?name=emily`

10. **[Nationalize.io](https://nationalize.io/)** – Predicts the nationality of a person based on their name.
    - Example: `https://api.nationalize.io?name=alex`

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
