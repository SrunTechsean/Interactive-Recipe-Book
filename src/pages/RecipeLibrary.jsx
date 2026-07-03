import CategoryChips from "../components/CategoryChips";
import SearchBar from "../components/SearchBar";

export default function RecipeLibrary() {
  return (
    <section className="grid gap-3">
      <SearchBar />
      <CategoryChips />
      <h1>Recipe Library</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, quisquam.
      </p>
    </section>
  );
}
