import { Book, Heart, Home, Menu, Plus, Search, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useFilters } from "../contexts/FilterContext";

const navLinks = [
  { title: "Home", path: "/", icon: Home },
  { title: "Recipes", path: "/recipes", icon: Book },
  { title: "Favorites", path: "/favorites", icon: Heart },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useFilters();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/recipes");
      setSearchOpen(false);
      setMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-primary-500 shadow-lg shadow-primary-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <NavLink className="flex items-center gap-2.5 shrink-0 group" to="/">
            <span className="text-xl font-bold text-white tracking-tight hidden sm:block">
              Recipe Book
            </span>
          </NavLink>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white/20 text-white shadow-sm"
                        : "text-white hover:text-white hover:bg-white/10"
                    }`
                  }
                  end={link.path === "/"}
                  key={link.path}
                  to={link.path}
                >
                  <Icon className="h-4 w-4" />
                  {link.title}
                </NavLink>
              );
            })}
          </div>

          {/* Desktop Search + Add Recipe */}
          <div className="hidden md:flex items-center gap-3">
            <form className="relative" onSubmit={handleSearch}>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-text-muted" />
              <Input
                className="h-10 w-44 pl-9 text-sm bg-white/95 border-0 text-brand-text placeholder:text-brand-text-muted rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0 transition-all hover:bg-white"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                type="text"
                value={searchQuery}
              />
            </form>

            <Button
              asChild
              className="h-10 px-5 bg-white text-primary-600 hover:bg-primary-600 hover:text-brand-surface transition-colors duration-300 ease-in-out  font-semibold rounded-xl shadow-md shadow-black/10 gap-2 text-sm"
            >
              <NavLink to="/add">
                <Plus className="h-4 w-4" />
                Add Recipe
              </NavLink>
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              className="p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
              type="button"
            >
              {searchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </button>

            <button
              className="p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden pb-3 border-t border-white/10 pt-3">
            <form className="relative" onSubmit={handleSearch}>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-500/60" />
              <Input
                autoFocus
                className="w-full h-10 pl-9 bg-white/95 border-0 text-primary-600 placeholder:text-primary-500/50 rounded-xl focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes..."
                type="text"
                value={searchQuery}
              />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 pt-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`
                  }
                  end={link.path === "/"}
                  key={link.path}
                  onClick={() => setMenuOpen(false)}
                  to={link.path}
                >
                  <Icon className="h-4 w-4" />
                  {link.title}
                </NavLink>
              );
            })}

            <div className="pt-2 px-3">
              <Button
                asChild
                className="w-full h-11 bg-white text-primary-600 hover:bg-primary-600 hover:text-brand-surface transition-colors duration-300 ease-in-out font-semibold rounded-xl gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <NavLink to="add">
                  <Plus className="h-4 w-4" />
                  Add Recipe
                </NavLink>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
