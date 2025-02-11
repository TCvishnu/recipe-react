import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Icon } from "@iconify/react";
import { Rating, Modal } from "@mui/material";

import Comments from "./Comments";

export default function Recipe({ userEmail }) {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const { recipeID } = useParams();

  const [recipe, setRecipe] = useState({});
  const [displaySteps, setDisplaySteps] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [rating, setRating] = useState(0);
  const [openRater, setOpenRater] = useState(false);

  const handleOpenComments = () => setShowComments(true);
  const handleCloseComments = () => setShowComments(false);

  const handleOpenRater = () => setOpenRater(true);
  const handleCloseRater = () => setOpenRater(false);

  const fetchRecipe = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${backendURL}/api/recipes/${recipeID}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const receivedData = await response.json();
      setRecipe(receivedData.recipe);
    } catch (error) {
      console.error(error);
    }
  };

  const hasUserRatedTheRecipe = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${backendURL}/api/recipes/${recipeID}/ratings/has-rated`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const receivedData = await response.json();
      setHasRated(receivedData.has_rated);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRating = async () => {
    if (!rating) {
      return;
    }
    handleCloseRater();
    try {
      const authToken = localStorage.getItem("authToken");
      const sendData = {
        rating,
      };
      const response = await fetch(
        `${backendURL}/api/recipes/${recipeID}/ratings`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(sendData),
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const receivedData = await response.json();
      console.log(receivedData);
      setRecipe((prev) => ({ ...prev, rating: receivedData.new_rating }));
      setRating(0);
      setHasRated(true);
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

  const addToRecentRecipes = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${backendURL}/api/recent-recipes?recipe_id=${recipeID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    addToRecentRecipes();
    fetchRecipe();
    hasUserRatedTheRecipe();
  }, []);
  return (
    <div className="w-full flex flex-col">
      <div
        className="w-full h-80 bg-cover bg-center flex flex-col justify-end"
        style={{ backgroundImage: 'url("/foodDp.png")' }}
      >
        <div className="flex h-auto bg-gradient-to-t from-white via-gray-100 via-50% to-gray-50/50 px-2 py-2 flex-col gap-3 rounded-t-lg">
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

            <button
              className="flex gap-1 items-center"
              disabled={hasRated === true}
              onClick={handleOpenRater}
            >
              <Icon
                icon="solar:star-bold-duotone"
                className=" text-[#F5BA20] size-6"
              />
              <span className=" text-sm font-semibold ">{recipe.rating}</span>
            </button>

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

            <button className=" flex items-center" onClick={handleOpenComments}>
              <Icon
                icon="material-symbols:comment-outline-rounded"
                className=" text-[#F5BA20] size-6"
              />
            </button>
          </div>
          {recipe.tags && (
            <div className="flex gap-2 mt-2">
              {recipe.tags.map((tag, index) => (
                <span
                  key={index}
                  className=" text-xs font-semibold border border-gray-500 p-1 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 font-righteous flex justify-evenly items-center">
        <button
          onClick={showIngredients}
          className={`w-40 h-10 rounded-md ${
            displaySteps ? "" : " bg-[#2eb800] text-white"
          }`}
        >
          Ingredients{" "}
        </button>
        <button
          onClick={showSteps}
          className={`w-40 h-10 rounded-md ${
            displaySteps ? "bg-[#2eb800] text-white" : " "
          }`}
        >
          Steps{" "}
        </button>
      </div>

      {recipe.ingredients && !displaySteps && (
        <ul className="w-full px-4 flex flex-col gap-4 my-4 text-gray-700 ">
          {recipe.ingredients.map((ingredient, index) => (
            <li
              key={index}
              className="font-semibold text-sm border-b border-gray-200"
            >
              <div className=" w-full flex justify-between">
                <span>{ingredient.name}</span>
                <span>
                  {ingredient.quantity} {ingredient.unit}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {recipe.ingredients && displaySteps && (
        <ul className="w-full px-6 flex flex-col gap-3 my-4 list-square">
          {recipe.steps.map((step, index) => (
            <li key={index} className="font-semibold text-sm text-gray-600">
              {step}
            </li>
          ))}
        </ul>
      )}

      {showComments && (
        <Comments onClose={handleCloseComments} email={userEmail} />
      )}

      <Modal
        open={openRater}
        onClose={handleCloseRater}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col items-center py-4 w-8/12 gap-2 rounded-sm">
          <h2 className=" text-gray-600 font-bold text-xl">Give Feedback</h2>
          <p className=" text-gray-400 font-medium">
            How did you like our recipe?
          </p>
          <Rating
            max={5}
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
          />
          <div className="w-full flex gap-4 justify-center items-center mt-4">
            <button className="border border-gray-300 py-1 px-3 rounded-lg font-semibold text-sm">
              Cancel
            </button>
            <button
              className="py-1 px-3 rounded-lg font-semibold text-sm bg-[#F5BA20] text-white"
              onClick={handleRating}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
