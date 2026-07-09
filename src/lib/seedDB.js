import { seedRecipes } from "../data/seedData";
import { saveImage } from "./imageDB";
import { storage } from "./storage";

export async function seedDatabase() {
	if (storage.getRecipes()) return;

	await Promise.all(
		seedRecipes.map(async (recipe) => {
			if (!recipe.imageSrc) return;
			const response = await fetch(recipe.imageSrc);
			const blob = await response.blob();
			await saveImage(recipe.imageId, blob);
		}),
	);

	const cleanedRecipes = seedRecipes.map(({ imageSrc, ...rest }) => rest);
	storage.setRecipes(cleanedRecipes);
}
