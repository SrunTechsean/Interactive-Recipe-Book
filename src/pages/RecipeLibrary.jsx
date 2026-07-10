import { Trash2 } from "lucide-react";
import { useMemo } from "react";
import CategoryChips from "../components/CategoryChips";
import GridForCard from "../components/GridForCard";
import SearchBar from "../components/SearchBar";
import { Button } from "../components/ui/button";
import { useFilters } from "../contexts/FilterContext";
import { storage } from "../lib/storage";

export default function RecipeLibrary() {
  const { searchQuery, selectedCategory, clearFilters } = useFilters();

  const recipes = storage.getRecipes() ?? [];

  const filteredData = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        !searchQuery ||
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesCategory = true;

      if (selectedCategory !== "All") {
        if (selectedCategory === "vegetarian") {
          matchesCategory = recipe.dietaryTags?.some(
            (tag) => tag.toLowerCase() === "vegetarian",
          );
        } else if (selectedCategory === "quick") {
          matchesCategory = recipe.prepTime + recipe.cookTime < 30;
        } else {
          matchesCategory = recipe.category === selectedCategory;
        }
      }

      return matchesSearch && matchesCategory;
    });
  }, [recipes, searchQuery, selectedCategory]);

  const hasActiveFilters = searchQuery || selectedCategory !== "All";

  return (
    <section className="grid gap-3 py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SearchBar />
      <CategoryChips />

      {/* Results Bar */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-sm text-gray-600">
          {filteredData.length} recipe{filteredData.length !== 1 ? "s" : ""}{" "}
          found
        </p>

        {hasActiveFilters && (
          <Button
            className="gap-1.5 text-primary-500 hover:text-primary-600 hover:bg-primary-50 text-sm font-medium h-8"
            onClick={clearFilters}
            size="sm"
            variant="ghost"
          >
            Clear all
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Grid or Empty State */}
      {filteredData.length > 0 ? (
        <GridForCard data={filteredData} />
      ) : (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <p className="text-base font-medium text-gray-500">
            No recipes found
          </p>
          <p className="text-sm text-gray-400">
            Try adjusting your search or filters
          </p>
          <Button
            className="py-2 recipe-edit-btn bg-primary-500 text-brand-surface hover:bg-brand-surface hover:text-primary-500 hover:border-primary-500 border-2 transition-colors duration-300 ease-in-out"
            onClick={clearFilters}
            size="sm"
            variant="outline"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </section>
  );
}
