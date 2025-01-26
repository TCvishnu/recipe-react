import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { Link } from "react-router-dom";

export default function UserRecipes() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const [recentRecipes, setRecentRecipes] = useState([]);

  const fetchRecentRecipes = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${backendURL}/api/recent-recipes`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const receivedData = await response.json();
      setRecentRecipes(receivedData.recentRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecentRecipes();
  }, []);

  return (
    <div className="w-screen p-2 flex flex-col gap-3 items-center">
      <header className="w-full flex justify-between items-end">
        <h1 className=" font-righteous text-3xl self-end">Recipyaa.!</h1>
      </header>

      <h2 className=" w-full mt-4 font-bold text-sm">
        Recently Visited Recipes ({recentRecipes.length})
      </h2>
      <div className="overflow-x-auto w-full custom-scroll">
        <div className="flex gap-5 w-auto py-1">
          {recentRecipes.map((recentRecipe, index) => (
            <RecipeCard recipe={recentRecipe.recipe} key={index} />
          ))}
        </div>
      </div>

      <Link
        to="create"
        className="fixed bottom-2 text-white bg-[#030219] h-12 w-48 flex justify-center items-center rounded-md font-medium"
      >
        Create Recipes
      </Link>
    </div>
  );
}
