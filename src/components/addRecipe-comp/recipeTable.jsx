import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export default function RecipeTable() {
	return (
		<div>
			<div className="flex gap-2">
				<Button type="button" variant="outline" className="category__chip">
					Vegan
				</Button>
				<Button type="button" variant="outline" className="category__chip">
					Gluten-Free
				</Button>
				<Button type="button" variant="outline" className="category__chip">
					Diary-free
				</Button>
				<Button type="button" variant="outline" className="category__chip">
					Low Carb
				</Button>
				<Button type="button" variant="outline" className="category__chip">
					High Protein
				</Button>
				<Button type="button" variant="outline" className="category__chip">
					Nut-Free
				</Button>
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
						<tbody className="divide-y divide-grey-100">
							<tr>
								<td className="p-2">
									<input
										type="text"
										placeholder="2"
										className="w-full rounded-md border border-gray-200 px-3 py-2 text-center"
									/>
								</td>
								<td className="p-2">
									<input
										type="text"
										placeholder="cloves"
										className="w-full rounded-md border border-gray-200 px-3 py-2 text-center"
									/>
								</td>
								<td className="p-2">
									<input
										type="text"
										placeholder="garlic"
										className="w-full rounded-md border border-gray-200 px-3 py-2"
									/>
								</td>
								<td className="p-2 text-center border-l border-gray-100">
									<Button
										type="button"
										className="inline-flex items-center justify-center p-2 rounded-md text-red-500"
									>
										<Trash2 className="h-5 w-5" />
									</Button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<button
					type="button"
					className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-blue-400 bg-white px-4 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50/50 transition-colors"
				>
					<span className="text-lg font-light">+</span> Add Ingredient
				</button>
			</div>
		</div>
	);
}
