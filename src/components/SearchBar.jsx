import { Funnel, Search } from "lucide-react";
import { Button } from "./ui/button";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-3">
      <form className="relative flex-1">
        <label className="sr-only" htmlFor="search">
          Search Recipes...
        </label>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="text-gray-400" size={18} />
        </div>
        <input
          className="block w-full rounded-lg border border-gray-200 h-9 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 shadow-sm/5 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          id="search"
          placeholder="Search Recipes..."
          type="search"
        />
      </form>
      <Button
        className="searchbar__filter border-gray-200 shadow-sm/5 h-10 "
        variant="outline"
      >
        <Funnel />
        Filter
      </Button>
    </div>
  );
}
