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

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      setUserRecipes((prev) =>
        prev.filter((recipe) => recipe.id !== deleteData.id)
      );

      setDeleteData({ id: "", name: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecentRecipes = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${backendURL}/api/recent-recipes`, {
        method: "GET",
        headers: {
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

  const fetchUserRecipes = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${backendURL}/api/recipes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const receivedData = await response.json();
      console.log(receivedData.recipes);
      setUserRecipes(receivedData.recipes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserRecipes();
    fetchRecentRecipes();
  }, []);

  return (
    <div className="w-screen p-2 flex flex-col gap-3 items-center">
      <header className="w-full flex justify-between items-end">
        <Logo />
      </header>

      <h2 className=" w-full mt-4 font-bold text-sm">Your Recipes</h2>
      <div className="overflow-x-auto w-full custom-scroll">
        <div className="flex gap-5 w-auto py-1">
          {userRecipes.map((recipe, index) => (
            <RecipeCard
              recipe={recipe}
              key={index}
              isOwner={true}
              openModal={(id, name) => handleOpenModal(id, name)}
            />
          ))}
        </div>
      </div>

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

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col items-center justify-start py-4 w-11/12 gap-2 rounded-xl modal-shadow">
          <Icon
            icon="material-symbols:delete"
            className="size-10 text-red-400"
          />
          <p className=" text-center font-medium text-gray-400">
            Are you sure you want to delete:
          </p>
          <span className="font-bold text-gray-600">{deleteData.name}</span>
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              className="border border-gray-300 py-1 px-3 rounded-lg font-semibold text-sm"
              onClick={handleCloseModal}
            >
              No, cancel
            </button>
            <button
              className="py-1 px-3 rounded-lg font-semibold text-sm bg-red-400 text-white"
              onClick={deleteRecipe}
            >
              Yes, delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
