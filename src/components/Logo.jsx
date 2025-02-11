import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/dashboard">
      <h1 className=" font-righteous text-3xl self-end text-[#33cccc]">
        Recipyaa..!
      </h1>
    </Link>
  );
}
