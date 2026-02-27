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
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-[1700px] mx-auto px-6 h-20 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Center: Improved Unified Search Container */}
          <div className="hidden md:flex items-center gap-0 bg-slate-50 border border-slate-200 rounded-full h-12 p-1 max-w-2xl w-full transition-all">
            {/* Icon/Toggle inside the bar for better flow */}
            <button
              title={
                isSearchingByName
                  ? "Switch to tag search"
                  : "Switch to text search"
              }
              className="flex-shrink-0 size-10 rounded-full flex items-center justify-center bg-white text-slate-500 transition-all border border-slate-100 mr-1"
              onClick={() => setIsSearchingByName(!isSearchingByName)}
            >
              <Icon
                icon={
                  isSearchingByName
                    ? "icon-park-solid:search"
                    : "tabler:tag-filled"
                }
                className="size-5"
              />
            </button>

            <div className="relative flex-grow h-full">
              {isSearchingByName ? (
                <input
                  onChange={handleSearch}
                  className="w-full h-full bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400 pl-2 pr-4"
                  placeholder="Search recipes, ingredients..."
                />
              ) : (
                <Select
                  className="w-full h-full text-sm"
                  styles={{
                    ...customSelectStyles,
                    control: (base) => ({
                      ...base,
                      height: "100%",
                      minHeight: "40px",
                      borderRadius: "9999px",
                      backgroundColor: "transparent",
                      border: "none",
                      boxShadow: "none",
                      cursor: "pointer",
                    }),
                  }}
                  components={animatedComponents}
                  onChange={handleSelectedTags}
                  options={foodTags.map((tag) => ({ label: tag, value: tag }))}
                  isMulti
                  placeholder="Filter by tags..."
                />
              )}
            </div>
          </div>

          {/* Right: Logout */}
          <button
            className="flex items-center gap-2 text-slate-600 hover:text-sky-600 font-medium text-sm transition-colors"
            onClick={handleLogout}
          >
            <Icon icon="lucide:log-out" className="size-4" />
            Logout
          </button>
        </div>

        {/* Mobile View: Tighter integration */}
        <div className="md:hidden px-4 pb-4">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-1.5">
            <div className="flex-grow relative">
              {isSearchingByName ? (
                <input
                  onChange={handleSearch}
                  className="w-full h-10 bg-transparent outline-none px-3 text-sm text-slate-900"
                  placeholder="Search..."
                />
              ) : (
                <Select
                  className="w-full text-sm"
                  styles={{
                    ...customSelectStyles,
                    control: (base) => ({
                      ...base,
                      height: "40px",
                      minHeight: "40px",
                      borderRadius: "12px",
                      backgroundColor: "transparent",
                      border: "none",
                      boxShadow: "none",
                    }),
                  }}
                  components={animatedComponents}
                  onChange={handleSelectedTags}
                  options={foodTags.map((tag) => ({ label: tag, value: tag }))}
                  isMulti
                  placeholder="Tags..."
                />
              )}
            </div>
            <button
              className="flex-shrink-0 size-10 rounded-xl flex items-center justify-center bg-slate-900 text-white"
              onClick={() => setIsSearchingByName(!isSearchingByName)}
            >
              <Icon
                icon={
                  isSearchingByName
                    ? "tabler:tag-filled"
                    : "icon-park-solid:search"
                }
                className="size-5"
              />
            </button>
          </div>
        </div>
      </header>

      <div className="flex items-end justify-between mb-8 mt-4">
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
