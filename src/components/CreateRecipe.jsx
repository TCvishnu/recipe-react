import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import foodTags from "../utils/FoodTags";
import units from "../utils/RecipeUnits";
import { useNavigate } from "react-router-dom";

export default function CreateRecipe() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const inputFieldRef = useRef(null);
  const animatedComponents = makeAnimated();

  const [recipeName, setRecipeName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [preparationTime, setPreparationTime] = useState("");
  const [isVeg, setIsVeg] = useState(true);
  const [steps, setSteps] = useState([""]);
  const [image, setImage] = useState("");
  const [sendImage, setSendImage] = useState(null);
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: units[0] },
  ]);
  const navigate = useNavigate();

  const focusFileInput = () => {
    inputFieldRef.current.click();
  };

  const handleSelectedTags = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };
  const handleRecipeNameChange = (e) => {
    setRecipeName(e.target.value);
  };
  const handlePreparationTimeChange = (e) => {
    setPreparationTime(e.target.value);
  };

  const addStep = () => {
    setSteps((prev) => [...prev, ""]);
  };

  const addIngredient = () => {
    setIngredients((prev) => [...prev, { name: "", quantity: "", unit: "" }]);
  };

  const deleteStep = (index) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteIngredient = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const moveStep = (index, direction) => {
    const newSteps = [...steps];
    const targetIndex = index + direction;
    if (targetIndex >= 0 && targetIndex < steps.length) {
      [newSteps[index], newSteps[targetIndex]] = [
        newSteps[targetIndex],
        newSteps[index],
      ];
      setSteps(newSteps);
    }
  };

  const updateStep = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const updateIngredientName = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].name = value;
    setIngredients(newIngredients);
  };
  const updateIngredientQty = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].quantity = value;
    setIngredients(newIngredients);
  };
  const updateIngredientUnit = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].unit = value;
    setIngredients(newIngredients);
  };

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    const url = `${backendURL}/api/recipes`;
    const authToken = localStorage.getItem("authToken");

    const tags = selectedTags.map((selectedTag) => selectedTag.value);

    const formData = new FormData();
    let sendData;
    let headers = {
      Authorization: `Bearer ${authToken}`,
    };
    if (sendImage) {
      formData.append("image", sendImage);
      formData.append("name", recipeName);
      formData.append("ingredients", JSON.stringify(ingredients));
      formData.append("steps", JSON.stringify(steps));
      formData.append("is_veg", isVeg);
      formData.append("tags", JSON.stringify(tags));
      formData.append("preperation_time", preparationTime);
      sendData = formData;
    } else {
      sendData = {
        recipe: {
          name: recipeName,
          ingredients,
          steps,
          is_veg: isVeg,
          tags,
          preperation_time: preparationTime,
        },
      };
      sendData = JSON.stringify(sendData);
      headers["Content-Type"] = "application/json";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: sendData,
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error(response.statusText);
      }

      setRecipeName("");
      setIngredients([
        {
          name: "",
          quantity: "",
          unit: "",
        },
      ]);
      setIsVeg(true);
      setSteps([""]);
      setSelectedTags([]);
      navigate("/dashboard/user-recipes");
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSendImage(file);
      setImage(URL.createObjectURL(file));
    }
  };

  // Styled React-Select
  const customSelectStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "0.75rem",
      borderColor: "#e5e7eb",
      padding: "2px",
      boxShadow: "none",
      "&:hover": { borderColor: "#33cccc" },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#e0f2f2",
      borderRadius: "0.5rem",
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8">
      <form
        onSubmit={handleCreateRecipe}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column - Image & Meta */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Recipe Cover</h2>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={inputFieldRef}
              onChange={handleImageChange}
            />
            <div
              onClick={focusFileInput}
              className={`relative group cursor-pointer border-4 border-dashed rounded-3xl h-72 flex flex-col items-center justify-center gap-4 transition-all ${
                image
                  ? "border-transparent"
                  : "border-gray-200 hover:border-[#33cccc]"
              }`}
            >
              {image ? (
                <>
                  <img
                    src={image}
                    alt="recipe"
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon
                      icon="mdi:camera-plus"
                      className="text-white size-12"
                    />
                  </div>
                </>
              ) : (
                <>
                  <Icon
                    icon="hugeicons:image-upload"
                    className="text-gray-400 size-16 group-hover:text-[#33cccc]"
                  />
                  <p className="text-gray-500 font-medium">Upload photo</p>
                </>
              )}
            </div>
          </div>

          {/* Basic Info Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Recipe Name <span className="text-[#33cccc]">*</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Grandma's Pasta"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#33cccc]/30"
                required
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Time (mins)
                </label>
                <input
                  type="number"
                  placeholder="30"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  value={preparationTime}
                  onChange={(e) => setPreparationTime(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Dietary
                </label>
                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    className={`flex-1 py-3 text-sm font-semibold ${
                      isVeg ? "bg-[#33cccc] text-white" : "bg-white"
                    }`}
                    onClick={() => setIsVeg(true)}
                  >
                    Veg
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-3 text-sm font-semibold ${
                      !isVeg ? "bg-red-400 text-white" : "bg-white"
                    }`}
                    onClick={() => setIsVeg(false)}
                  >
                    Non-Veg
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Tags
              </label>
              <Select
                value={selectedTags}
                components={animatedComponents}
                onChange={setSelectedTags}
                options={foodTags.map((tag) => ({ label: tag, value: tag }))}
                isMulti
                styles={customSelectStyles}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Ingredients & Steps */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Ingredients */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold">Ingredients</h2>
              <button
                type="button"
                onClick={() =>
                  setIngredients((prev) => [
                    ...prev,
                    { name: "", quantity: "", unit: units[0] },
                  ])
                }
                className="flex items-center gap-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold"
              >
                <Icon icon="tdesign:plus" /> Add Ingredient
              </button>
            </div>

            <div className="space-y-3">
              {ingredients.map((ing, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-3 items-center bg-gray-50 p-3 rounded-xl border border-gray-100"
                >
                  <span className="col-span-1 text-sm font-bold text-gray-400 text-center">
                    #{index + 1}
                  </span>
                  <input
                    placeholder="Ingredient name (e.g. Flour)"
                    className="col-span-5 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    value={ing.name}
                    onChange={(e) => {
                      const newIngs = [...ingredients];
                      newIngs[index].name = e.target.value;
                      setIngredients(newIngs);
                    }}
                  />
                  <input
                    placeholder="Qty"
                    type="number"
                    className="col-span-2 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    value={ing.quantity}
                    onChange={(e) => {
                      const newIngs = [...ingredients];
                      newIngs[index].quantity = e.target.value;
                      setIngredients(newIngs);
                    }}
                  />
                  <select
                    className="col-span-3 px-2 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                    value={ing.unit}
                    onChange={(e) => {
                      const newIngs = [...ingredients];
                      newIngs[index].unit = e.target.value;
                      setIngredients(newIngs);
                    }}
                  >
                    {units.map((u) => (
                      <option key={u}>{u}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() =>
                      setIngredients((prev) =>
                        prev.filter((_, i) => i !== index),
                      )
                    }
                    className="col-span-1 text-red-400 hover:text-red-600"
                  >
                    <Icon
                      icon="material-symbols:delete-outline"
                      className="size-5"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold">Preparation Steps</h2>
              <button
                type="button"
                onClick={() => setSteps((prev) => [...prev, ""])}
                className="flex items-center gap-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold"
              >
                <Icon icon="tdesign:plus" /> Add Step
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-start bg-gray-50 p-4 rounded-xl border border-gray-100"
                >
                  <span className="font-bold text-[#33cccc] bg-[#33cccc]/10 size-8 flex items-center justify-center rounded-full shrink-0">
                    {index + 1}
                  </span>
                  <textarea
                    rows={2}
                    className="flex-grow p-2 border border-gray-200 rounded-lg text-sm resize-none"
                    value={step}
                    placeholder="Describe this step..."
                    onChange={(e) => {
                      const newSteps = [...steps];
                      newSteps[index] = e.target.value;
                      setSteps(newSteps);
                    }}
                  />
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        const newSteps = [...steps];
                        [newSteps[index], newSteps[index - 1]] = [
                          newSteps[index - 1],
                          newSteps[index],
                        ];
                        setSteps(newSteps);
                      }}
                      className="text-gray-400 hover:text-gray-700"
                      disabled={index === 0}
                    >
                      <Icon icon="mingcute:up-fill" className="size-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const newSteps = [...steps];
                        [newSteps[index], newSteps[index + 1]] = [
                          newSteps[index + 1],
                          newSteps[index],
                        ];
                        setSteps(newSteps);
                      }}
                      className="text-gray-400 hover:text-gray-700"
                      disabled={index === steps.length - 1}
                    >
                      <Icon icon="mingcute:down-fill" className="size-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSteps((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="text-red-400 hover:text-red-600 mt-2"
                    >
                      <Icon
                        icon="material-symbols:delete-outline"
                        className="size-5"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-14 bg-[#030219] hover:bg-black text-white rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:chef-hat" className="size-6" />
            Publish Recipe
          </button>
        </div>
      </form>
    </div>
  );
}
