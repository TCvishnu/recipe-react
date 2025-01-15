import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col gap-8 items-center justify-center"
      style={{ backgroundImage: `url('/mainbg.png')` }}
    >
      <h1 className=" font-righteous text-5xl text-[#2eb800]">Recipyaa.!</h1>
      <span className=" font-medium text-gray-700 text-center">
        Healthy Cooking recipes & the right nutrition you need
      </span>

      <Link
        to="/login"
        className="fixed bottom-5 sm:static e w-40 h-10 bg-[#2eb800] text-white uppercase text-xs font-medium rounded-tl-md rounded-br-md flex items-center justify-center"
      >
        Join Now
      </Link>
    </div>
  );
}
