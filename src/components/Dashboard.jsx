import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import foodTags from "../utils/FoodTags";

export default function Dashboard() {
  let debounceTimeout;

  const animatedComponents = makeAnimated();

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const [recipePage, setRecipePage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [isSearchingByName, setIsSearchingByName] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();

  const setSearchByName = () => {
    setIsSearchingByName(true);
  };

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
    const searchTerm = e.target.value.trim();

    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      if (!searchTerm) {
        fetchRecipes();
        return;
      }
      searchRecipes(searchTerm);
    }, 1000);
  };

  const handleSelectedTags = (selectedOptions) => {
    if (selectedOptions.length > 0) {
      searchByTags(selectedOptions);
    } else {
      fetchRecipes();
    }
  };

  const searchByTags = async (selectedOptions) => {
    const authToken = localStorage.getItem("authToken");

    const urlParams = new URLSearchParams();
    selectedOptions
      .map((selectedTag) => selectedTag.value)
      .forEach((tag) => urlParams.append("tag[]", tag));

    try {
      const response = await fetch(
        `${backendURL}/api/recipes?${urlParams.toString()}`,
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
    } catch (error) {
      console.error(error);
    }
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className=" w-screen h-auto p-2 flex flex-col gap-3 items-center bg-white">
      <header className="w-full flex justify-between items-center">
        <Logo />
        <div className="hidden sm:flex sm:w-7/12 md:w-8/12 lg:w-7/12 relative h-12">
          {isSearchingByName && (
            <input
              onChange={handleSearch}
              className="h-12 outline-none rounded-full bg-gray-100 px-6 text-xs w-full placeholder-gray-700 font-medium"
              placeholder="What are you looking for?"
            />
          )}

          {isSearchingByName && (
            <button
              title="search by tags"
              className=" bg-[#33cccc] size-9 rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-3"
              onClick={() => setIsSearchingByName(false)}
            >
              <Icon icon="tabler:tag-filled" className=" text-white size-6" />
            </button>
          )}

          {!isSearchingByName && (
            <Select
              className="h-12 w-10/12"
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: "12px",
                  minWidth: "200px",
                  height: "48px",
                }),
              }}
              components={animatedComponents}
              onChange={handleSelectedTags}
              options={foodTags.map((tag) => ({ label: tag, value: tag }))}
              isMulti
            />
          )}
          {!isSearchingByName && (
            <button
              className=" bg-[#33cccc] size-9 rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-3"
              onClick={setSearchByName}
            >
              <Icon
                icon="icon-park-solid:search"
                className=" text-white size-6"
              />
            </button>
          )}
        </div>
        <button
          className="bg-[#030219] rounded-xl text-xs font-medium h-8 w-20 text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      {/* mobile */}
      <div
        className={` w-full flex ${
          isSearchingByName ? "justify-center" : "justify-start"
        } sm:hidden relative mt-2`}
      >
        {isSearchingByName && (
          <input
            onChange={handleSearch}
            className=" outline-none w-full h-10 rounded-full bg-gray-100 px-6 text-xs placeholder-gray-700 font-medium"
            placeholder="What are you looking for?"
          />
        )}
        {isSearchingByName && (
          <button
            className=" bg-[#33cccc] size-8 rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-2"
            onClick={() => setIsSearchingByName(false)}
          >
            <Icon icon="tabler:tag-filled" className=" text-white size-6" />
          </button>
        )}
        {!isSearchingByName && (
          <Select
            className=" w-10/12"
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "12px",
                minWidth: "200px",
                height: "40px",
              }),
            }}
            components={animatedComponents}
            onChange={handleSelectedTags}
            options={foodTags.map((tag) => ({ label: tag, value: tag }))}
            isMulti
          />
        )}
        {!isSearchingByName && (
          <button
            className=" bg-[#33cccc] size-9 rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-0"
            onClick={setSearchByName}
          >
            <Icon
              icon="icon-park-solid:search"
              className=" text-white size-6"
            />
          </button>
        )}
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
