import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

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
          className=" w-full  h-10 rounded-full bg-gray-100 px-6 text-xs placeholder-gray-700 font-medium"
          placeholder="What are you looking for?"
        />
        <button className=" bg-pink-600 size-8 rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-2">
          <Icon
            icon="mynaui:search"
            width="24"
            height="24"
            className=" text-white"
          />
        </button>
      </div>
    </div>
  );
}
