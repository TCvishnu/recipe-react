import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#fcfaf7] text-slate-900 font-sans relative overflow-hidden">
      {/* Top Navigation (minimal version of Savor nav) */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/40">
        <div className="text-2xl font-bold tracking-tight flex items-center text-slate-800">
          <div className="bg-slate-900 text-white p-2 rounded-lg mr-2 text-sm">
            R
          </div>
          Recipyaa
        </div>

        <Link
          to="/login"
          className="bg-slate-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-black transition shadow-lg shadow-slate-900/10"
        >
          Login
        </Link>
      </nav>

      <div className="absolute -top-20 -right-20 w-72 h-72 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>

      <header className="container mx-auto px-8 py-16 md:py-28 flex flex-col md:flex-row items-center relative">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <span className="inline-block px-4 py-1 rounded-full bg-slate-900 text-slate-100 text-sm font-bold mb-6 uppercase tracking-wider">
            Health • Taste • Savour
          </span>

          <h1 className="text-5xl md:text-6xl font-serif font-medium leading-tight mb-6 text-slate-900">
            Cook with
            <br />
            <span className="italic text-slate-600 font-normal">clarity</span>,
            eat with purpose.
          </h1>

          <p className="text-lg text-slate-700/80 mb-10 max-w-lg leading-relaxed">
            A modern, distraction-free place to explore recipes crafted for real
            taste, real balance, and real life.
          </p>

          <Link
            to="/login"
            className="bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition duration-300 inline-block"
          >
            Start Cooking
          </Link>
        </div>

        {/* Right Side: THE ABSTRACT INGREDIENT STACK */}
        <div className="md:w-1/2 flex justify-center items-center relative p-6 h-[500px]">
          {/* The "Main Dish" Core - A large organic shape */}
          <div className="absolute w-64 h-64 bg-slate-100 rounded-[3rem] rotate-12 z-0 border border-slate-200/50 shadow-inner"></div>

          <div className="relative z-10 flex flex-col items-center space-y-[-20px]">
            {/* Ingredient Layer 1: The 'Garnish' (Floating Accent) */}
            <div className="w-16 h-16 bg-emerald-100 border border-emerald-200 rounded-full flex items-center justify-center shadow-lg -translate-x-12 animate-bounce duration-[3000ms]">
              <span className="text-2xl">🌿</span>
            </div>

            {/* Ingredient Layer 2: The 'Protein/Main' (Geometric Card) */}
            <div className="w-56 h-32 bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col p-4 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
              <div className="w-12 h-1 bg-slate-900 rounded mb-2"></div>
              <div className="w-24 h-1 bg-slate-200 rounded mb-4"></div>
              <div className="flex justify-between items-end mt-auto">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                  Protein Core
                </span>
              </div>
              {/* Abstract texture */}
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-slate-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            </div>

            {/* Ingredient Layer 3: The 'Veggies/Fiber' (The Wide Base) */}
            <div className="w-64 h-24 bg-slate-900 rounded-2xl shadow-2xl flex items-center px-6 justify-between relative z-20 overflow-hidden">
              <div className="flex flex-col">
                <span className="text-slate-400 text-[10px] font-bold uppercase">
                  Daily Intake
                </span>
                <span className="text-white font-serif text-lg italic">
                  Essential Greens
                </span>
              </div>
              <div className="h-12 w-12 border-2 border-slate-700 rounded-full flex items-center justify-center">
                <div className="h-6 w-6 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              {/* Decorative Grid on the dark card */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #fff 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                }}
              ></div>
            </div>

            {/* Ingredient Layer 4: The 'Base/Grains' (Shadowy Outline) */}
            <div className="w-48 h-12 border-2 border-dashed border-slate-300 rounded-full translate-y-4 opacity-50"></div>
          </div>

          {/* Floating "Nutrient" Bubbles */}
          <div className="absolute top-20 right-10 w-20 h-20 bg-orange-50 rounded-full border border-orange-100 flex items-center justify-center shadow-sm animate-pulse">
            <div className="text-center">
              <p className="text-[8px] font-bold text-orange-400 uppercase">
                Vit C
              </p>
              <p className="text-xs font-serif text-orange-600">80%</p>
            </div>
          </div>

          <div className="absolute bottom-20 left-10 w-16 h-16 bg-blue-50 rounded-full border border-blue-100 flex items-center justify-center shadow-sm animate-float">
            <span className="text-blue-400 text-sm font-bold">H2O</span>
          </div>
        </div>
      </header>

      <footer className="py-12 text-center text-slate-600/60 text-xs uppercase tracking-widest">
        © 2026 Recipyaa. All Rights Reserved.
      </footer>
    </div>
  );
}
