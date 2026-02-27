import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-[#e8ffe8] to-[#d1f7d1] flex items-center justify-center px-6">
      {/* Background Image (soft, blurred) */}
      <img
        src="/mainbg.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
        {/* Logo text */}
        <h1 className="text-6xl sm:text-7xl font-righteous text-white drop-shadow-lg tracking-wide">
          Recipyaa<span className="text-[#2eb800]">!</span>
        </h1>

        <p className="mt-4 text-white/90 text-sm sm:text-base font-medium leading-relaxed drop-shadow-md">
          Fresh, healthy recipes with the right nutrition to fuel your day.
        </p>

        {/* Call to Action */}
        <Link
          to="/login"
          className="
            mt-10 px-10 py-3
            bg-[#2eb800] hover:bg-[#26a300] 
            text-white font-semibold uppercase tracking-wide text-sm
            rounded-xl shadow-lg
            transition-all duration-300
          "
        >
          Start Cooking
        </Link>

        {/* Secondary CTA */}
        <p className="text-white/80 text-xs mt-3 backdrop-blur-sm px-3 py-1 rounded-full">
          No signup required — explore recipes instantly
        </p>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1440 320" className="w-full opacity-40 fill-white">
          <path d="M0,64L48,90.7C96,117,192,171,288,186.7C384,203,480,181,576,181.3C672,181,768,203,864,197.3C960,192,1056,160,1152,128C1248,96,1344,64,1392,48L1440,32L1440,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
}
