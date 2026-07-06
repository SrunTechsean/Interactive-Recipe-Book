import CategoryChips from "../components/CategoryChips";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import { useFilters } from "../contexts/FilterContext";
import { seedRecipes } from "../data/seedData";
import { storage } from "../lib/storage";

export default function RecipeLibrary() {
  const { searchQuery } = useFilters();
  storage.setRecipes(seedRecipes);

  const filteredData = seedRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section className="grid gap-3">
      <SearchBar />
      <CategoryChips />
      <div className="grid lg:grid-cols-4 gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {filteredData.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}
