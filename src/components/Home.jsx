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

        {/* Right Side: REPLACED IMAGE SECTION (Option 2) */}
        <div className="md:w-1/2 flex justify-center items-center relative p-6 h-[400px] md:h-auto">
          {/* Main overlapping shape */}
          <div className="w-64 h-64 border-8 border-slate-950 rounded-[2rem] z-20 relative shadow-2xl"></div>

          {/* Dotted pattern element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-80 h-80 grid grid-cols-10 gap-2 opacity-10">
              {[...Array(100)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-slate-900"
                ></div>
              ))}
            </div>
          </div>

          {/* Off-kilter outline boxes */}
          <div className="absolute w-60 h-60 border-2 border-slate-300 rounded-[2rem] top-10 right-20 z-0"></div>
          <div className="absolute w-72 h-40 border border-slate-200 rounded-xl bottom-10 left-10 z-30 bg-white/20 backdrop-blur-sm"></div>

          {/* Floating abstract accent */}
          <div className="absolute w-12 h-12 bg-slate-600 rounded-full bottom-32 right-12 z-40 flex items-center justify-center shadow-xl">
            <span className="text-white text-xl">✨</span>
          </div>
        </div>
      </header>

      <footer className="py-12 text-center text-slate-600/60 text-xs uppercase tracking-widest">
        © 2026 Recipyaa. All Rights Reserved.
      </footer>
    </div>
  );
}
