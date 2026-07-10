import CategoryChips from "../components/CategoryChips";
import GridForCard from "../components/GridForCard";
import SearchBar from "../components/SearchBar";
import { useFilters } from "../contexts/FilterContext";
import { seedRecipes } from "../data/seedData";
import { useRecipes } from "../contexts/RecipeContext";


export default function RecipeLibrary() {
  const { searchQuery } = useFilters();
  const { recipes } = useRecipes();

  const filteredData = seedRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section className="grid gap-3">
      <SearchBar />
      <CategoryChips />
      <GridForCard data={filteredData} />
    </section>
  );
}
