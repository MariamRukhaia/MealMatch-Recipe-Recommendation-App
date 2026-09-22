# 🍽️ MealMatch — Recipe Recommendation & Grocery Assistant

## 🎥 Demo

[▶️ **Watch the MealMatch Demo**](https://drive.google.com/file/d/1KN7MlYq5TE_YzN5DR83bqiILuI3g4P55/view?usp=sharing)

---

## About

MealMatch is a full-stack recipe discovery application that recommends meals based on a user's **dietary preferences, cuisine choices, allergies, and ingredients they already have**.

The application combines recipe filtering with ingredient matching to identify suitable recipes, shows users which ingredients they already have versus which they are missing, and helps them find grocery products for the missing ingredients.

Built for **HackNYU**.

---

## ✨ Features

### 🔐 User Accounts & Preferences

- User registration and login
- BCrypt password hashing
- Dietary preference onboarding
- Allergy and dietary restriction tracking
- User profile management

### 🍜 Personalized Recipe Discovery

Users select their preferred cuisines and the ingredients they already have. MealMatch combines this information with their saved dietary preferences and allergies to generate personalized recipe recommendations.

### 🧠 Recipe Matching

MealMatch combines two recipe searches:

1. Recipes matching the user's cuisine and dietary preferences
2. Recipes matching ingredients the user already has

The application finds recipes appearing in both result sets and retrieves detailed information for each match.

```text
Cuisine + Diet + Allergies
           │
           ▼
   Filtered Recipes
           │
           ├──────────┐
           │          │
           ▼          ▼
     Recipe IDs   Ingredient-Based
                      Recipes
           │          │
           └────┬─────┘
                ▼
          Common Recipes
                │
                ▼
      Personalized Results
```

### ❤️ Interactive Recipe Discovery

Recipes are presented individually with:

- Recipe image and description
- Nutrition information
- Ingredients already available
- Missing ingredients
- Step-by-step cooking instructions

Users can ❤️ save a recipe to their favorites or ✕ skip to the next recommendation.

### 🛒 Missing Ingredient & Grocery Assistant

When a user selects a saved recipe, MealMatch identifies the ingredients they are missing and searches for corresponding grocery products.

The interface displays:

- Product name and image
- Product category
- Estimated price
- Quantity controls
- Shopping cart

Users can select the products they need and continue to an order summary.

> **Note:** Grocery prices in the hackathon prototype are simulated and do not represent live retailer pricing.

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- React Router
- Axios
- Tailwind CSS
- React Icons

### Backend

- Python
- Flask
- Flask-SQLAlchemy
- SQLAlchemy
- MySQL
- PyMySQL
- BCrypt
- Flask-CORS

### APIs & Data

- Spoonacular Recipe API
- BeautifulSoup
- Requests
- Web-based grocery product search

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │    React Frontend   │
                    │                     │
                    │ Cuisine Selection   │
                    │ Ingredient Selection│
                    │ Recipe Discovery    │
                    │ Favorites & Cart    │
                    └──────────┬──────────┘
                               │
                         HTTP / REST API
                               │
                    ┌──────────▼──────────┐
                    │    Flask Backend    │
                    │                     │
                    │ Authentication      │
                    │ User Preferences    │
                    │ Product Search      │
                    └──────┬────────┬─────┘
                           │        │
                    ┌──────▼───┐    │
                    │  MySQL   │    │
                    │ Database │    │
                    └──────────┘    │
                                    │
                           ┌────────▼────────┐
                           │ External Recipe │
                           │ & Grocery Data  │
                           └─────────────────┘
```

---

## 🔄 Application Flow

```text
Register / Login
       ↓
Dietary Preference Onboarding
       ↓
Choose Cuisine
       ↓
Select Ingredients You Already Have
       ↓
Personalized Recipe Matching
       ↓
❤️ Save Recipe  /  ✕ Skip Recipe
       ↓
Favorite Recipes
       ↓
Identify Missing Ingredients
       ↓
Find Grocery Products
       ↓
Shopping Cart
       ↓
Order Summary
```

---

## 🚀 Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/MealMatch-Recipe-Recommendation-App.git
cd MealMatch-Recipe-Recommendation-App
```

### 2. Set Up the Frontend

```bash
cd meal-match-react
npm install
npm start
```

The React application will typically run at:

```text
http://localhost:3000
```

### 3. Set Up the Backend

From the repository root:

```bash
cd meal-match-backend
pip install -r ../requirements.txt
python app.py
```

The Flask API will typically run at:

```text
http://127.0.0.1:5000
```

### 4. Configure External Services

The application requires database configuration and external recipe API credentials.

API keys, database passwords, and other credentials should be stored in environment variables and **must not be committed to the repository**.

---

## 💡 What We Built

MealMatch was developed as a **HackNYU hackathon prototype** exploring how recipe discovery can account for both personal dietary needs and ingredients already available at home.

Rather than recommending recipes using only a cuisine or keyword, MealMatch combines multiple criteria to narrow results and bridges recipe discovery with grocery planning by identifying the ingredients the user still needs.

The project demonstrates experience with:

- Full-stack application development
- React component architecture
- REST API integration
- External API integration
- Relational database integration
- Authentication and password hashing
- Multi-criteria recipe filtering
- Client-side state management
- Web scraping and data extraction
- Responsive UI development

---

## 📌 Project Status

MealMatch was developed as a **HackNYU hackathon prototype**.

The repository preserves the original prototype while cleaning configuration and sensitive credentials for public portfolio use. Some external integrations may require API credentials or updates to third-party endpoints to run locally today.
