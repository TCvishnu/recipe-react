import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [recipePage, setRecipePage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [recipesPerRow, setRecipesPerRow] = useState(0);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${backendURL}/api/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecipes = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${backendURL}/api/recipes?page=${recipePage}&size=20`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const receivedData = await response.json();
      console.log(receivedData.recipes);
      setRecipes(receivedData.recipes);
      setRecipesPerRow(Math.ceil(receivedData.recipes.length / 2));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className=" w-screen h-screen p-2 flex flex-col gap-3 items-center">
      <header className="w-full flex justify-between items-end">
        <h1 className=" font-righteous text-3xl self-end">Recipyaa.!</h1>
        <div className="hidden sm:flex sm:w-7/12 md:w-8/12 lg:w-7/12 relative h-12">
          <input
            className="h-12 rounded-full bg-gray-100 px-6 text-xs w-full placeholder-gray-700 font-medium"
            placeholder="What are you looking for?"
          />
          <button className=" bg-[#2eb800] size-9 rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-3">
            <Icon
              icon="mynaui:search"
              width="24"
              height="24"
              className=" text-white"
            />
          </button>
        </div>
        <button
          className="bg-black rounded-xl text-xs font-medium h-8 w-20 text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
      <div className=" w-full flex justify-center sm:hidden relative mt-2">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className=" w-full  h-10 rounded-full bg-gray-100 px-6 text-xs placeholder-gray-700 font-medium"
          placeholder="What are you looking for?"
        />
        <button className=" bg-[#2eb800] size-8 rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-2">
          <Icon
            icon="mynaui:search"
            width="24"
            height="24"
            className=" text-white"
          />
        </button>
      </div>

      <h2 className=" w-full mt-4 font-bold text-sm">What's popular?</h2>

      <div className="overflow-x-auto w-full custom-scroll">
        <div className="flex gap-5 w-auto py-1">
          {recipes.slice(0, recipesPerRow).map((recipe, index) => (
            <div
              key={index}
              className="min-w-36 recipe-shadow bg-white h-auto pb-2 rounded-t-md flex flex-col gap-2"
            >
              <img
                src="/foodDp.png"
                alt="Food"
                className="w-full h-24 rounded-t-lg"
              />
              <h2 className="font-bold text-center text-xs line-clamp-1">
                {recipe.name}
              </h2>
              <p className=" text-center text-xxs font-medium text-[#6F6F6F]">
                {recipe.ingredients.length}
                steps | {recipe.preperation_time} mins
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
                  <span className=" text-xxxs font-semibold">
                    {recipe.rating}
                  </span>
                  <Icon
                    icon="solar:star-bold-duotone"
                    width="10"
                    height="10"
                    className="text-[#F5BA20]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto w-full custom-scroll">
        <div className="flex gap-5 w-auto py-1">
          {recipes.slice(recipesPerRow).map((recipe, index) => (
            <div
              key={index}
              className="min-w-36 recipe-shadow bg-white h-auto pb-2 rounded-t-md flex flex-col gap-2"
            >
              <img
                src="/foodDp.png"
                alt="Food"
                className="w-full h-24 rounded-t-lg"
              />
              <h2 className="font-bold text-center text-xs line-clamp-1">
                {recipe.name}
              </h2>
              <p className=" text-center text-xxs font-medium text-[#6F6F6F]">
                {recipe.ingredients.length}
                steps | {recipe.preperation_time} mins
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
                  <span className=" text-xxxs font-semibold">
                    {recipe.rating}
                  </span>
                  <Icon
                    icon="solar:star-bold-duotone"
                    width="10"
                    height="10"
                    className="text-[#F5BA20]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
