import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Icon } from "@iconify/react";

export default function Recipe() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const { id } = useParams();

  const [recipe, setRecipe] = useState([]);
  const [displaySteps, setDisplaySteps] = useState(false);

  const fetchRecipe = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${backendURL}/api/recipes/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const receivedData = await response.json();
      console.log(receivedData);
      setRecipe(receivedData.recipe);
    } catch (error) {
      console.error(error);
    }
  };

  const showSteps = () => {
    setDisplaySteps(true);
  };

  const showIngredients = () => {
    setDisplaySteps(false);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);
  return (
    <div className="w-full flex flex-col">
      <div
        className="w-full h-80 bg-cover bg-center flex flex-col justify-end"
        style={{ backgroundImage: 'url("/foodDp.png")' }}
      >
        <div className="flex h-auto bg-gradient-to-t from-white via-gray-100 via-50% to-gray-50/50 px-2 py-2 flex-col gap-3">
          <h1 className=" text-xl font-righteous">{recipe.name}</h1>
          <div className="flex text-gray-700 gap-6">
            <div className="flex gap-1 items-center">
              <Icon
                icon="lets-icons:clock-fill"
                className="text-[#2eb800] size-6"
              />
              <span className=" text-sm font-semibold ">
                {recipe.preperation_time} mins
              </span>
            </div>

            <div className="flex gap-1 items-center">
              <Icon
                icon="solar:star-bold-duotone"
                className=" text-[#F5BA20] size-6"
              />
              <span className=" text-sm font-semibold ">{recipe.rating}</span>
            </div>

            <div className="flex gap-1 items-center">
              {recipe.is_veg ? (
                <Icon
                  icon="game-icons:cabbage"
                  className="text-[#2eb800] size-6"
                />
              ) : (
                <Icon
                  icon="tdesign:chicken"
                  className="size-6 text-[#FD7B8B]"
                />
              )}
              <span className=" text-sm font-semibold ">
                {recipe.is_veg ? "Veggie" : "Non-veggie"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 font-righteous flex justify-evenly items-center">
        <button
          onClick={showIngredients}
          className={`w-40 h-10 rounded-sm ${
            displaySteps ? "" : " bg-[#2eb800] text-white"
          }`}
        >
          Ingredients{" "}
        </button>
        <button
          onClick={showSteps}
          className={`w-40 h-10 rounded-sm ${
            displaySteps ? "bg-[#2eb800] text-white" : " "
          }`}
        >
          Steps{" "}
        </button>
      </div>

      {recipe.ingredients && !displaySteps && (
        <ul className="w-full px-2 flex flex-col gap-1 mt-4">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className=" font-semibold">
              {ingredient}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
