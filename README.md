# Project - Interactive Recipe Book
## Course INF-651 (Frontend Web Development)
## Instructor: Singhtararaksmey (Joe) Chea

## Introduction
**An interactive web application that lets users maintain and arrange their recipes in addition to looking through their collection.**

## Features
- Popular Recipes section on the Home page
- Browse recipes by category ( Breakfast, Lunch, Dinner, Desser, Vegetarian, Quick < 30m,etc.)
- Search recipes
- Add/Remove favorite recipes with dedicated Favorite page
- Recipe detail page with full ingredients & instructions
- Share recipe links (copy to clipboard)
- Add new recipes
- Edit recipes
- Fully client-side persistence

## Tech Stack
- **UI and building tooling** - React + Vite
- **client-side routing** - React Router
- **styling** - Tailwind CSS + tranditional css
- **icons** - lucide-react
- **base UI components** - shadcn/ui
- **localStorage** - persists recipes, favorites, and filters
- **IndexedDB** - persists uploaded recipe images (`imageDB.js`)

## Project Structure
```
Interactive-Recipe-Book/
├── public/
│   ├── carousel-background.jpg
│   └── recipe-book-icon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── addRecipe-comp/       # Sub-components used by the Add Recipe form
│   │   ├── ui/                    # shadcn/ui primitives (badge, button, card)
│   │   ├── Card.jsx / Card.css
│   │   ├── Carousel.jsx           # Home page recipe carousel
│   │   ├── CarouselCard.jsx
│   │   ├── CategoryChips.jsx / CategoryChips.css
│   │   ├── GridForCard.jsx        # Renders a grid of RecipeCards
│   │   ├── Navbar.jsx
│   │   ├── RecipeCard.jsx
│   │   ├── RecipeImage.jsx        # Loads images from IndexedDB
│   │   └── SearchBar.jsx
│   ├── contexts/
│   │   ├── AddRecipeContext.jsx
│   │   ├── FavoritesContext.jsx
│   │   ├── FilterContext.jsx
│   │   └── RecipeContext.jsx
│   ├── data/
│   │   └── seedData.js            
│   ├── lib/
│   │   ├── imageDB.js             # IndexedDB helpers (recipe images)
│   │   ├── seedDB.js
│   │   ├── storage.js             # localStorage helpers (recipes, favorites, filters)
│   │   └── utils.ts
│   ├── pages/
│   │   ├── AddRecipe.jsx / AddRecipe.css
│   │   ├── Favorites.jsx
│   │   ├── Home.jsx
│   │   ├── RecipeDetail.jsx / RecipeDetail.css
│   │   └── RecipeLibrary.jsx
│   ├── styles/
│   │   ├── index.css
│   │   └── tokens.css             # Design tokens (colors, etc.)
│   ├── App.jsx                    # Route definitions + context providers
│   └── main.jsx                   # App entry point
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```
## Getting Started:
```
# Install dependencies
npm install

# Start the dev server
npm run dev
```
