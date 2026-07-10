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
      <div className="py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold pb-4">Our Recipe</h2>
        <GridForCard data={data} />
      </div>
    </section>
  );
}
