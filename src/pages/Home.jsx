import Carousel from "../components/Carousel";
import GridForCard from "../components/GridForCard";
import { seedRecipes } from "../data/seedData";
import { storage } from "../lib/storage";

const popularIds = ["1", "3", "6", "7"];
const popularRecipes = seedRecipes.filter((recipe) =>
  popularIds.includes(recipe.id),
);

export default function Home() {
  const data = storage.getRecipes();
  return (
    <section>
      <Carousel recipes={popularRecipes} />
      <div className="px-8 py-4">
        <h2 className="text-lg font-semibold pb-4">Our Recipe</h2>
        <GridForCard data={data} />
      </div>
    </section>
  );
}
