import {
  CakeSlice,
  LayoutGrid,
  Leaf,
  Moon,
  Sunrise,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { useFilters } from "../contexts/FilterContext";

const CHIPS = [
  { label: "All", value: "All", icon: LayoutGrid },
  { label: "Breakfast", value: "Breakfast", icon: Sunrise },
  { label: "Lunch", value: "Lunch", icon: UtensilsCrossed },
  { label: "Dinner", value: "Dinner", icon: Moon },
  { label: "Dessert", value: "Dessert", icon: CakeSlice },
  { label: "Vegetarian", value: "vegetarian", icon: Leaf },
  { label: "Quick < 30m", value: "quick", icon: Zap },
];

export default function CategoryChips() {
  const { selectedCategory, setSelectedCategory } = useFilters();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {CHIPS.map((chip) => {
        const Icon = chip.icon;
        const isActive = selectedCategory === chip.value;

        return (
          <button
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3 h-9 text-xs font-medium transition-all border ${
              isActive
                ? "bg-primary-500 text-white border-primary-500 shadow-sm"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            }`}
            key={chip.value}
            onClick={() => setSelectedCategory(chip.value)}
            type="button"
          >
            <Icon className="h-3.5 w-3.5" />
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
