import Carousel from "../components/Carousel";
import { seedRecipes } from "../data/SeedData";


const popularIds = ["1", "3", "6", "7"];
const popularRecipes = seedRecipes.filter((recipe) =>
  popularIds.includes(recipe.id)
);

export default function Home() {
  return (
    <section>
      <div className="popular-recipes">
        <header>
          <h1><b>Popular Recipes</b></h1>
        </header>
        <Carousel recipes={popularRecipes} />
      </div>
    </section>
  );
}