import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  let debounceTimeout;

  const backendURL = process.env.REACT_APP_BACKEND_URL;

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

  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      if (!searchTerm) {
        fetchRecipes();
        return;
      }
      searchRecipes(searchTerm);
    }, 1000);
  };

  const searchRecipes = async (search) => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${backendURL}/api/recipes?q=${search}`, {
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
      setRecipes(receivedData.recipes);
      setRecipesPerRow(Math.ceil(receivedData.recipes.length / 2));
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
    <div className=" w-screen h-auto p-2 flex flex-col gap-3 items-center bg-white">
      <header className="w-full flex justify-between items-end">
        <h1 className=" font-righteous text-3xl self-end text-[#33cccc]">
          Recipyaa.!
        </h1>
        <div className="hidden sm:flex sm:w-7/12 md:w-8/12 lg:w-7/12 relative h-12">
          <input
            className="h-12 outline-none rounded-full bg-gray-100 px-6 text-xs w-full placeholder-gray-700 font-medium"
            placeholder="What are you looking for?"
          />
          <button className=" bg-[#33cccc] size-9 rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-3">
            <Icon
              icon="mynaui:search"
              width="24"
              height="24"
              className=" text-white"
            />
          </button>
        </div>
        <button
          className="bg-[#030219] rounded-xl text-xs font-medium h-8 w-20 text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
      <div className=" w-full flex justify-center sm:hidden relative mt-2">
        <input
          onChange={handleSearch}
          className=" outline-none w-full h-10 rounded-full bg-gray-100 px-6 text-xs placeholder-gray-700 font-medium"
          placeholder="What are you looking for?"
        />
        <button className=" bg-[#33cccc] size-8 rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-2">
          <Icon
            icon="mynaui:search"
            width="24"
            height="24"
            className=" text-white"
          />
        </button>
      </div>

      <h2 className=" w-full mt-4 font-bold text-sm">What's popular?</h2>

      <div className="w-full overflow-y-auto h-auto flex flex-wrap justify-evenly gap-4 py-4">
        {recipes.map((recipe, index) => (
          <RecipeCard recipe={recipe} key={index} />
        ))}
      </div>

      <Link
        to="user-recipes"
        className="fixed bottom-2 text-white bg-[#030219] h-12 w-48 flex justify-center items-center rounded-md font-medium"
      >
        Your Recipes
      </Link>
    </div>
  );
}
