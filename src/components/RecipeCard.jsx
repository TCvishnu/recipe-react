import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { getImageURL } from "../utils/image";

export default function RecipeCard({ recipe, isOwner, openModal }) {
  const [recipeOwner, setRecipeOwner] = useState(!!isOwner);

  const handleDeleteClick = () => {
    openModal(recipe.id, recipe.name);
  };

  return (
    <div className="min-w-40 sm:min-w-48 recipe-shadow bg-white h-auto pb-2 rounded-t-md flex flex-col gap-2 relative">
      {recipeOwner && (
        <button className="absolute szie-6" onClick={handleDeleteClick}>
          <Icon
            icon="material-symbols:delete"
            className="size-6 text-red-500"
          />
        </button>
      )}
      <img
        src={recipe.image ? `${getImageURL(recipe.image)}` : "/foodDp.png"}
        alt="Food"
        className="w-full h-24 sm:h-28 rounded-t-lg"
      />
      <Link className="flex flex-col gap-2" to={`/recipe/${recipe.id}`}>
        <p className="font-bold text-center text-xs line-clamp-1">
          {recipe.name}
        </p>
        <p className=" text-center text-xxs font-medium text-[#6F6F6F]">
          {recipe.steps_count}
          steps | {recipe.preparation_time} mins
        </p>
        <div className="w-full flex justify-between px-2">
          <p
            className={`text-xxxs font-black ${
              recipe.is_veg ? " text-[#2eb800]" : "text-[#FD7B8B]"
            }`}
          >
            {recipe.is_veg ? "Veg" : "Non-veg"}
          </p>
          <div className="flex gap-1 items-center">
            <span className=" text-xxxs font-semibold">{recipe.rating}</span>
            <Icon
              icon="solar:star-bold-duotone"
              width="10"
              height="10"
              className="text-[#F5BA20]"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
