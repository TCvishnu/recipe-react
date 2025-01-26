import { useState } from "react";
import { Icon } from "@iconify/react";

export default function CreateRecipe() {
  const [isVeg, setIsVeg] = useState(true);
  const [steps, setSteps] = useState([""]);
  const [ingredients, setIngredients] = useState([
    {
      name: "",
      qty: "",
      unit: "",
    },
  ]);

  const units = [
    "units",
    "ml",
    "l",
    "tsp",
    "tbsp",
    "cup",
    "pt",
    "qt",
    "gal",
    "pcs",
    "slices",
    "leaves",
    "pinch",
    "bowl",
    "glass",
    "mug",
    "scoop",
    "ladle",
    "drop",
    "packet",
  ];

  const addStep = () => {
    setSteps((prev) => [...prev, ""]);
  };

  const addIngredient = () => {
    setIngredients((prev) => [...prev, { name: "", qty: "", unit: "" }]);
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
  };
  const updateIngredientQty = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].qty = value;
  };
  const updateIngredientUnit = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].unit = value;
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form className="w-full sm:w-[30rem] bg-white p-6 rounded-lg sm:shadow-md overflow-y-auto">
        <h1 className="text-3xl font-semibold text-center text-[#030219] my-3">
          Create a New Recipe
        </h1>
        <div className="my-4">
          <label className="block text-gray-700 font-medium mb-2">
            Recipe Name <span className=" text-[#33cccc]">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter recipe name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
            required
          />
        </div>
        <div className="my-4 flex items-center gap-2">
          <label className="block text-gray-700 font-medium">
            Preparation Time <span className=" text-[#33cccc]">*</span>
          </label>
          <input
            required
            className="size-12 px-1 text-center py-2 border border-gray-300 rounded-lg outline-none"
          />
          <span className="text-gray-600 font-semibold text-xs justify-self-end">
            (mins)
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-1/2 flex gap-4">
            <span className="text-gray-700 font-medium">
              Veg <span className=" text-[#33cccc]">*</span>
            </span>
            <button
              type="button"
              className={` size-8 border border-gray-300 rounded-md ${
                isVeg ? "bg-[#33cccc]" : ""
              }`}
              onClick={() => setIsVeg(true)}
            ></button>
          </div>
          <div className="w-1/2 flex justify-end gap-4">
            <span className="text-gray-700 font-medium">
              non-Veg <span className=" text-[#33cccc]">*</span>
            </span>
            <button
              className={` size-8 border border-gray-300 rounded-md ${
                isVeg ? "" : "bg-[#33cccc]"
              }`}
              type="button"
              onClick={() => setIsVeg(false)}
            ></button>
          </div>
        </div>

        <h2 className="my-4">
          Steps <span className=" text-[#33cccc]">*</span>
        </h2>
        <div className="flex flex-col gap-2 items-center">
          {steps.map((step, index) => (
            <div className="flex w-full items-center gap-2" key={index}>
              <span>{index + 1}.</span>
              <input
                className="w-full px-1 py-2 border-b border-gray-300 outline-none"
                value={step}
                onChange={(e) => updateStep(index, e.target.value)}
              />
              <div className="h-full flex flex-col items-center justify-center">
                {index !== 0 && (
                  <button type="button" onClick={() => moveStep(index, -1)}>
                    <Icon
                      icon="mingcute:up-fill"
                      className="size-6 text-[#030219]"
                    />
                  </button>
                )}
                {index !== steps.length - 1 && (
                  <button type="button" onClick={() => moveStep(index, +1)}>
                    <Icon
                      icon="mingcute:down-fill"
                      className="size-6 text-[#030219]"
                    />
                  </button>
                )}
              </div>
              <button type="button" onClick={() => deleteStep(index)}>
                <Icon
                  icon="material-symbols:delete"
                  className="size-6 text-[#33cccc]"
                />
              </button>
            </div>
          ))}
          <button onClick={addStep} type="button">
            <Icon icon="tdesign:plus" className="size-8 text-[#030219]" />
          </button>
        </div>

        <h2 className="my-4">
          Ingredients <span className=" text-[#33cccc]">*</span>
        </h2>
        <div className="w-full flex flex-col gap-2 items-center">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="w-full flex items-center gap-2 justify-between"
            >
              <span>{index + 1}.</span>
              <input
                className="w-32 px-1 py-2 border-b border-gray-300 outline-none"
                value={ingredient.name}
                onChange={(e) => updateIngredientName(index, e.target.value)}
              />
              <input
                value={ingredient.qty}
                onChange={(e) => updateIngredientQty(index, e.target.value)}
                required
                className="size-8 text-xs font-medium px-1 text-center py-2 border border-gray-300 rounded-lg outline-none"
              />
              <select
                className="px-2 w-20 py-1 border border-gray-300 bg-transparent rounded-md outline-none"
                onChange={(e) => updateIngredientUnit(index, e.target.value)}
                value={ingredient.unit}
              >
                {units.map((unit, idx) => (
                  <option key={idx} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => deleteIngredient(index)}>
                <Icon
                  icon="material-symbols:delete"
                  className="size-6 text-[#33cccc]"
                />
              </button>
            </div>
          ))}
          <button type="button" onClick={addIngredient}>
            <Icon icon="tdesign:plus" className="size-8 text-[#030219]" />
          </button>
        </div>

        <button
          type="submit"
          className="w-full h-12 mt-6 bg-[#030219] text-white py-2 px-4 rounded-lg font-medium shadow-sm"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
}
