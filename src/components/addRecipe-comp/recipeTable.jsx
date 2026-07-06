import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const DIETARY_TAGS = [
	"Vegan",
	"Gluten-Free",
	"Dairy-free",
	"Low Carb",
	"High Protein",
	"Nut-Free",
];

export default function RecipeTable({
	dietaryTags,
	onToggleTag,
	ingredients,
	onAddIngredient,
	onUpdateIngredient,
	onRemoveIngredient,
}) {
	return (
		<div>
			<div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
				{DIETARY_TAGS.map((tag) => (
					<Button
						key={tag}
						type="button"
						variant="outline"
						onClick={() => onToggleTag(tag)}
						className={`category__chip ${dietaryTags.includes(tag) ? "isActive" : ""}`}
					>
						{tag}
					</Button>
				))}
			</div>
			<div className="mx-0 p-0">
				<label for="ingredients" className="text-sm font-semibold">
					Ingredients
				</label>
				<div
					id="ingredients"
					className="border border-gray-200 rounded-lg overflow-hidden bg-white"
				>
					<table className="w-full rounded-lg border-collapse text-center text-sm text-gray-700">
						<thead>
							<tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-medium">
								<th className="px-4 py-2.5 w-20 text-center">Qty</th>
								<th className="px-4 py-2.5 w-36">Unit</th>
								<th className="px-4 py-2.5 text-left">Ingredient</th>
								<th className="w-12"></th>
							</tr>
						</thead>
						<tbody>
							{ingredients.map((ing, index) => (
								<tr key={index}>
									<td className="p-2">
										<input
											type="text"
											value={ing.qty}
											onChange={(e) =>
												onUpdateIngredient(index, "qty", e.target.value)
											}
											placeholder="2"
											className="w-full rounded-md border border-gray-200 px-3 py-2 text-center"
										/>
									</td>
									<td className="p-2">
										<input
											type="text"
											value={ing.unit}
											onChange={(e) =>
												onUpdateIngredient(index, "unit", e.target.value)
											}
											placeholder="cloves"
											className="w-full rounded-md border border-gray-200 px-3 py-2 text-center"
										/>
									</td>
									<td className="p-2">
										<input
											type="text"
											value={ing.name}
											onChange={(e) =>
												onUpdateIngredient(index, "name", e.target.value)
											}
											placeholder="garlic"
											className="w-full rounded-md border border-gray-200 px-3 py-2"
										/>
									</td>
									<td className="p-2 text-center border-l border-gray-100">
										<Button
											type="button"
											onClick={() => onRemoveIngredient(index)}
											className="inline-flex items-center justify-center p-2 rounded-md text-red-500 hover:ring-red-500 hover:ring-3"
										>
											<Trash2 className="h-5 w-5" />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<button
					type="button"
					onClick={onAddIngredient}
					className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-blue-400 bg-white px-4 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50/50 transition-colors"
				>
					<span className="text-lg font-light">+</span> Add Ingredient
				</button>
			</div>
		</div>
	);
}
