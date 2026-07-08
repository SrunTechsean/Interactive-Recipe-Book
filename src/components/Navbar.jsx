import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Book, Plus, Heart, Search, User, ChevronDown, Menu, X } from "lucide-react";

const linkClass = ({ isActive }) =>
  `flex items-center gap-2 font-medium pb-1 border-b-2 whitespace-nowrap ${
    isActive
      ? "text-red-600 border-red-600"
      : "text-gray-600 border-transparent hover:text-red-600"
  }`;

// This is for minimize the screen
const navItems = [
  { title: "Home", path: "/" },
  { title: "Recipes", path: "/recipes" },
  { title: "Add Recipe", path: "/add" },
  { title: "Favorites", path: "/favorites" },
  { title: "Search", path: "/search" },
  { title: "Sign In", path: "/signin" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="flex flex-col items-center gap-3 border-b bg-background px-6 py-3 sm:flex-row sm:justify-between sm:overflow-x-auto">
      <div className="flex items-center gap-2 shrink-0">
        <img src="/recipe-book-icon.svg" className="w-6 h-6" alt="RecipeBook logo" />
        <span className="text-xl font-semibold text-gray-900 whitespace-nowrap">Recipe Book</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:flex-nowrap sm:gap-6 sm:shrink-0">
        <NavLink to="/" end className={linkClass}>
          <Home className="w-4 h-4" /> 
          Home
        </NavLink>

        <NavLink to="/recipes" className={linkClass}>
          <Book className="w-4 h-4" /> 
          Recipes
        </NavLink>

        <NavLink
          to="/add"
          className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> 
          Add Recipe
        </NavLink>

        <NavLink to="/favorites" className={linkClass}>
          <Heart className="w-4 h-4" />
          Favorites
        </NavLink>

        <Search className="w-5 h-5 text-gray-500 hover:text-gray-900 cursor-pointer" />
        <div className="flex items-center gap-1 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </nav>
  );
}