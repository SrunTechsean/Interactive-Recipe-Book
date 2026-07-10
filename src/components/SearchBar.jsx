import { Search, X } from "lucide-react";
import { useFilters } from "../contexts/FilterContext";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useFilters();

  return (
    <div className="flex items-center gap-2">
      <form className="relative flex-1" onSubmit={(e) => e.preventDefault()}>
        <label className="sr-only" htmlFor="search">
          Search Recipes...
        </label>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="text-gray-400" size={18} />
        </div>
        <input
          className="block w-full rounded-lg border border-gray-200 h-9 bg-white py-2 pl-9 pr-8 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
          id="search"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search recipes..."
          type="search"
          value={searchQuery}
        />
        {searchQuery && (
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            onClick={() => setSearchQuery("")}
            type="button"
          >
            <X size={16} />
          </button>
        )}
      </form>
    </div>
  );
}
