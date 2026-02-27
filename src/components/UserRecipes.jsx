import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Icon } from "@iconify/react";
import Logo from "./Logo";

export default function UserRecipes() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const [recentRecipes, setRecentRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [deleteData, setDeleteData] = useState({ id: "", name: "" });
  const [loading, setLoading] = useState(true);

  const handleOpenModal = (id, name) => {
    setDeleteData({ id, name });
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  const deleteRecipe = async () => {
    handleCloseModal();
    const url = `${backendURL}/api/recipes/${deleteData.id}`;
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) throw new Error(response.statusText);

      setUserRecipes((prev) =>
        prev.filter((recipe) => recipe.id !== deleteData.id),
      );
      setDeleteData({ id: "", name: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const authToken = localStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${authToken}` };

    try {
      // Fetch both in parallel for better performance
      const [userRes, recentRes] = await Promise.all([
        fetch(`${backendURL}/api/recipes`, { headers }),
        fetch(`${backendURL}/api/recent-recipes`, { headers }),
      ]);

      if (userRes.ok) {
        const userData = await userRes.json();
        setUserRecipes(userData.recipes);
      }

      if (recentRes.ok) {
        const recentData = await recentRes.json();
        setRecentRecipes(recentData.recentRecipes);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Helper for empty states
  const EmptyState = ({ message }) => (
    <div className="text-center py-10 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl w-full">
      <Icon icon="mdi:recipe" className="mx-auto size-10 mb-2 text-gray-400" />
      <p>{message}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 w-full flex flex-col items-center">
      {/* Navbar/Header */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Logo />
          <Link
            to="create"
            className="flex items-center gap-2 text-sm text-white bg-[#030219] hover:bg-gray-800 py-2 px-4 rounded-full font-semibold transition-colors"
          >
            <Icon icon="material-symbols:add" className="size-5" />
            Create Recipe
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl px-4 py-6 flex flex-col gap-8">
        {/* Your Recipes Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-2xl text-gray-900">Your Recipes</h2>
            <span className="text-sm text-gray-500 font-medium bg-white px-3 py-1 rounded-full shadow-inner border">
              {userRecipes.length} Total
            </span>
          </div>

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : userRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {userRecipes.map((recipe) => (
                <RecipeCard
                  recipe={recipe}
                  key={recipe.id}
                  isOwner={true}
                  openModal={(id, name) => handleOpenModal(id, name)}
                />
              ))}
            </div>
          ) : (
            <EmptyState message="You haven't created any recipes yet." />
          )}
        </section>

        {/* Recently Visited Section */}
        <section>
          <h2 className="font-bold text-xl text-gray-800 mb-4">
            Recently Viewed
          </h2>

          {recentRecipes.length > 0 ? (
            <div className="flex gap-5 overflow-x-auto pb-4 custom-scroll">
              {recentRecipes.map((recentRecipe, index) => (
                <div className="flex-none w-72" key={index}>
                  <RecipeCard recipe={recentRecipe.recipe} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="Your recent history is empty." />
          )}
        </section>
      </main>

      {/* Improved Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
      >
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col items-center justify-start p-6 w-11/12 max-w-sm gap-3 rounded-2xl shadow-2xl border">
          <div className="p-3 bg-red-100 rounded-full">
            <Icon
              icon="material-symbols:delete-outline"
              className="size-8 text-red-600"
            />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Delete Recipe</h3>
          <p className="text-center text-gray-500 text-sm">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-700">
              "{deleteData.name}"
            </span>
            ? This action cannot be undone.
          </p>

          <div className="flex justify-center items-center gap-3 mt-5 w-full">
            <button
              className="flex-1 border border-gray-300 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="flex-1 py-2.5 rounded-lg font-semibold text-sm bg-red-600 text-white hover:bg-red-700 transition"
              onClick={deleteRecipe}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
