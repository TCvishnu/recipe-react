import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/dashboard">
      <div className="text-2xl font-bold tracking-tight flex items-center text-slate-800">
        <div className="bg-slate-900 text-white p-2 rounded-lg mr-2 text-sm">
          R
        </div>
        Recipyaa
      </div>
    </Link>
  );
}
