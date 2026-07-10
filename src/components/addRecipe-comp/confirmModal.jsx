export default function SaveConfirmModal({ onAddAnother, onGoToRecipes }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm space-y-4 shadow-lg">
        <h2 className="text-lg font-semibold">Recipe saved!</h2>
        <p className="text-sm text-muted-foreground">
          Would you like to add another recipe, or view your recipes?
        </p>
        <div className="flex justify-end gap-2 pt-2">
          <button
            className="px-4 py-2 rounded border text-sm font-medium hover:bg-gray-50"
            onClick={onAddAnother}
            type="button"
          >
            Add Another
          </button>
          <button
            className="px-4 py-2 rounded bg-primary-500 text-white text-sm font-medium hover:opacity-90"
            onClick={onGoToRecipes}
            type="button"
          >
            View Recipes
          </button>
        </div>
      </div>
    </div>
  );
}
