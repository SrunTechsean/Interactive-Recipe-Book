import CategoryChips from "../components/CategoryChips";
import GridForCard from "../components/GridForCard";
import SearchBar from "../components/SearchBar";
import { useFilters } from "../contexts/FilterContext";
import { storage } from "../lib/storage";

export default function RecipeLibrary() {
  const { searchQuery } = useFilters();

  const filteredData = storage
    .getRecipes()
    .filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <section className="grid gap-3 py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SearchBar />
      <CategoryChips />
      <GridForCard data={filteredData} />
    </section>
  );
}
