import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { getImageURL } from "../utils/image";

// --- UPDATED PROP LIST ---
export default function RecipeCard({ recipe, heightClass = "h-72" }) {
  return (
    <div
      className={`group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ease-out transform bg-white ${heightClass} flex flex-col justify-end`}
    >
      <img
        src={recipe.image ? `${getImageURL(recipe.image)}` : "/foodDp.png"}
        alt={recipe.name}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>

      <Link
        to={`/recipe/${recipe.id}`}
        // 1. Reduced padding on mobile (p-4), restored on desktop (md:p-5)
        className="relative z-20 p-4 md:p-5 flex flex-col gap-1.5 md:gap-2"
      >
        {/* 2. Responsive font size: text-lg on mobile, text-xl on desktop */}
        <h3 className="font-bold text-white text-sm md:text-lg leading-snug line-clamp-2 drop-shadow-md">
          {recipe.name}
        </h3>

        {/* 3. Reduced font size and padding for the info pill on mobile */}
        <div className="flex items-center gap-2 md:gap-3 text-[7px] md:text-xs bg-white/10 backdrop-blur-sm rounded-full py-1 px-2.5 md:py-1.5 md:px-3 w-fit text-white/90">
          <div className="flex items-center gap-1">
            <Icon
              icon="solar:clock-circle-outline"
              className="size-3.5 md:size-4"
            />
            <span>{recipe.preparation_time} min</span>
          </div>
          <span className="text-white/30">|</span>
          <div className="flex items-center gap-1">
            <Icon
              icon="solar:list-check-outline"
              className="size-3.5 md:size-4"
            />
            <span>{recipe.steps_count} steps</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span
            className={`px-3 py-1 rounded-full text-[8px] md:text-[10px] font-bold flex items-center gap-1.5 ${
              recipe.is_veg
                ? "bg-green-500/80 text-white"
                : "bg-red-500/80 text-white"
            }`}
          >
            <span className="size-1.5 md:size-2 rounded-full bg-white"></span>
            {recipe.is_veg ? "Vegetarian" : "Non-Veg"}
          </span>

          {/* 4. Smaller rating badge on mobile */}
          <div className="flex gap-1 items-center bg-black/40 backdrop-blur-sm px-2 py-0.5 md:py-1 rounded-full">
            <Icon
              icon="solar:star-bold"
              className="text-[#F5BA20] size-3.5 md:size-4"
            />
            <span className="text-white font-bold text-[10px] md:text-sm">
              {recipe.rating}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
