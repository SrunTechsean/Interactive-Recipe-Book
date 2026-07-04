export default function RecipeDes() {
	return (
		<div>
			<div className="space-y-2">
				<label for="recipeTitle" className="text-sm font-semibold">
					Recipe Title
				</label>
				<input
					type="text"
					placeholder="e.g. Creamy Tomato Pasta"
					className="w-full rounded border input p-2"
				/>
			</div>
			<div>
				<label for="description" className="text-sm font-semibold">
					Description
				</label>
				<textarea
					id="description"
					rows="3"
					placeholder="Briefly describe your recipe..."
					className="w-full rounded-lg border input resize-none p-2"
				/>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div className="grid space-y-2">
					<label for="category" className="text-sm m-0 font-semibold">
						Category
					</label>
					<select
						id="category"
						name="category"
						className="w-full rounded border p-2"
					>
						<option disabled selected>
							Select category
						</option>
					</select>
				</div>
				<div>
					<label for="servings" className="grid text-sm font-semibold">
						Servings
					</label>
					<input
						id="servings"
						type="number"
						placeholder="e.g. 4 or 5"
						className="w-full rounded border p-2"
					/>
				</div>
				<div>
					<label for="prepTime" className="grid text-sm font-semibold">
						Prep Time (min)
					</label>
					<input
						id="prepTime"
						type="text"
						placeholder="e.g. 15"
						className="w-full rounded border p-2"
					/>
				</div>
				<div>
					<label for="cookTime" className="grid text-sm font-semibold">
						Cook Time (min)
					</label>
					<input
						id="cookTime"
						type="text"
						placeholder="e.g. 60"
						className="w-full rounded border p-2"
					/>
				</div>
			</div>
		</div>
	);
}
