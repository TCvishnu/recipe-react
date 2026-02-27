import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import Logo from "./Logo";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import foodTags from "../utils/FoodTags";

export default function Dashboard() {
  const animatedComponents = makeAnimated();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  // Refs to handle debounce correctly
  const debounceTimeoutRef = useRef(null);

  const [recipePage, setRecipePage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [isSearchingByName, setIsSearchingByName] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);

  // --- EXISTING FUNCTIONS (Kept as is) ---
  const handleLogout = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${backendURL}/api/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!response.ok) throw new Error(response.statusText);
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.trim();
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      if (!searchTerm) {
        fetchRecipes();
        return;
      }
      searchRecipes(searchTerm);
    }, 1000);
  };

  const handleSelectedTags = (selectedOptions) => {
    if (selectedOptions && selectedOptions.length > 0) {
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
        },
      );
      if (!response.ok) throw new Error(response.statusText);
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
      if (!response.ok) throw new Error(response.statusText);
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
        },
      );
      if (!response.ok) throw new Error(response.statusText);
      const receivedData = await response.json();
      setRecipes(receivedData.recipes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);
  // ----------------------------------------

  // --- NEW UI STYLING FOR REACT-SELECT ---
  const customSelectStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "1rem",
      backgroundColor: "#f1f5f9",
      border: "1px solid #e2e8f0",
      height: "48px",
      boxShadow: "none",
      "&:hover": { borderColor: "#cbd5e1" },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#0f172a",
      borderRadius: "6px",
    }),
    multiValueLabel: (base) => ({ ...base, color: "white" }),
  };

  return (
    <div className="min-h-screen w-full bg-[#fcfaf7] text-slate-900 font-sans p-6 pb-28">
      {/* Editorial Header */}
      <header className="flex justify-between items-center pb-8 border-b border-slate-200 mb-10">
        <Logo />

        {/* Unified Search Bar (Desktop) */}
        <div className="hidden sm:flex flex-1 max-w-2xl mx-8 relative items-center gap-2">
          {isSearchingByName ? (
            <div className="relative w-full">
              <Icon
                icon="lucide:search"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                onChange={handleSearch}
                className="w-full h-12 outline-none rounded-2xl bg-slate-100 border border-slate-200 px-12 text-sm placeholder-slate-400 font-medium"
                placeholder="Search recipes, ingredients..."
              />
            </div>
          ) : (
            <Select
              className="w-full"
              styles={customSelectStyles}
              components={animatedComponents}
              onChange={handleSelectedTags}
              options={foodTags.map((tag) => ({ label: tag, value: tag }))}
              isMulti
              placeholder="Select tags..."
            />
          )}

          <button
            title={isSearchingByName ? "Search by tags" : "Search by name"}
            className="flex-shrink-0 size-12 rounded-2xl flex items-center justify-center transition-all bg-slate-900 hover:bg-black"
            onClick={() => setIsSearchingByName(!isSearchingByName)}
          >
            <Icon
              icon={
                isSearchingByName
                  ? "tabler:tag-filled"
                  : "icon-park-solid:search"
              }
              className="text-white size-6"
            />
          </button>
        </div>

        <button
          className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider h-11 px-6 text-slate-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      {/* Unified Search Bar (Mobile) */}
      <div className="sm:hidden mb-8 relative flex items-center gap-2">
        {isSearchingByName ? (
          <input
            onChange={handleSearch}
            className="w-full h-11 outline-none rounded-2xl bg-slate-100 border border-slate-200 px-6 text-sm placeholder-slate-400 font-medium"
            placeholder="Search..."
          />
        ) : (
          <Select
            className="w-full"
            styles={{
              ...customSelectStyles,
              control: (base) => ({ ...base, height: "44px" }),
            }}
            components={animatedComponents}
            onChange={handleSelectedTags}
            options={foodTags.map((tag) => ({ label: tag, value: tag }))}
            isMulti
            placeholder="Tags..."
          />
        )}
        <button
          className="flex-shrink-0 size-11 rounded-2xl flex items-center justify-center transition-all bg-slate-900"
          onClick={() => setIsSearchingByName(!isSearchingByName)}
        >
          <Icon
            icon={
              isSearchingByName ? "tabler:tag-filled" : "icon-park-solid:search"
            }
            className="text-white size-5"
          />
        </button>
      </div>

      <div className="flex items-end justify-between mb-8">
        <h2 className="font-serif text-3xl font-medium text-slate-900 italic">
          Trending Plates
        </h2>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
          {recipes.length} Results
        </span>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="transform hover:-translate-y-2 transition-transform duration-300"
          >
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>

      {/* Floating Bottom Nav */}
      <Link
        to="user-recipes"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 text-white bg-slate-900 h-14 px-8 flex justify-center items-center rounded-full font-bold shadow-2xl shadow-slate-900/30 hover:bg-black hover:scale-105 transition-all gap-3"
      >
        <Icon icon="lucide:chef-hat" className="size-5" />
        Your Private Collection
      </Link>
    </div>
  );
}
