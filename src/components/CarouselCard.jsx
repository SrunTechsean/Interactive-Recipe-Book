import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useFavorites } from "../contexts/FavoritesContext";

const FALLBACK_BG = "/carousel-background.jpg";

const classes = {
  center: "scale-100 opacity-100 z-20",
  adjacent: "scale-90 opacity-70 z-10",
  far: "scale-75 opacity-30",
};

export default function CarouselCard({ recipe, state }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isCenter = state === "center";

  return (
    <div
      className={`relative w-full aspect-[3/2] transition-all duration-500 ease-out ${classes[state]}`}
    >
      <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
        <img
          alt={recipe.title}
          className="w-full h-full object-cover"
          draggable={false}
          src={recipe.imageId || FALLBACK_BG}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <Badge className="absolute right-3 top-3 bg-blue-600 text-white hover:bg-blue-700 text-xs">
          {recipe.category}
        </Badge>

        <Button
          className="absolute left-3 top-3 h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(recipe.id);
          }}
          size="icon"
          variant="ghost"
        >
          <Heart
            className={`h-4 w-4 sm:h-[18px] sm:w-[18px] ${
              isFavorite(recipe.id) ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>

        <Link className="block" to={`/recipes/${recipe.id}`}>
          <div className="absolute bottom-0 left-0 right-0 p-[clamp(0.8rem,-0.057rem+2.286vw,2rem)]">
            <h3
              className={`font-bold text-white drop-shadow-lg line-clamp-1 transition-all duration-500 ${
                isCenter
                  ? "text-xs sm:text-md md:text-xl"
                  : "text-xs sm:text-sm md:text-base"
              }`}
            >
              {recipe.title}
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
}
