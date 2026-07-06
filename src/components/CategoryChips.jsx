import { Button } from "./ui/button";
import "./CategoryChips.css";
export default function CategoryChips() {
  return (
    <div className="hidden category-container md:flex gap-2 pb-2 flex-wrap">
      <Button className="category__chip isActive" variant="outline">
        All
      </Button>
      <Button className="category__chip" variant="outline">
        Breakfast
      </Button>
      <Button className="category__chip" variant="outline">
        Lunch
      </Button>
      <Button className="category__chip" variant="outline">
        Dinner
      </Button>
      <Button className="category__chip" variant="outline">
        Desert
      </Button>
      <Button className="category__chip" variant="outline">
        Vegetarian
      </Button>
      <Button className="category__chip" variant="outline">
        Quick &lt; 30m{" "}
      </Button>
    </div>
  );
}
