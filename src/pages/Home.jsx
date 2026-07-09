import Carousel from "../components/Carousel";
import { seedRecipes } from "../data/seedData";

const popularIds = ["1", "3", "6", "7"];
const popularRecipes = seedRecipes.filter((recipe) =>
  popularIds.includes(recipe.id),
);

export default function Home() {
  return (
    <section>
      <Carousel recipes={popularRecipes} />
    </section>
  );
}
