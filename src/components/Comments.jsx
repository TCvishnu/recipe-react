import React from "react";
import { Icon } from "@iconify/react";

export default function Comments({ onClose }) {
  return (
    <div className=" w-full h-[35rem] fixed z-10 bottom-0 bg-white rounded-t-lg flex flex-col py-3 items-center gap-2">
      <h2 className="font-righteous text-lg">Comments</h2>
      <div className="w-11/12 h-1 border-t-2 border-[#e0e0e0]"></div>
      <div className="w-11/12 h-20 relative">
        <textarea
          className="w-full bg-[#eaeaea] h-20 rounded-md p-2 outline-none text-xs font-medium"
          placeholder="Add comment.."
        />
        <button className="absolute bottom-2 right-2">
          <Icon icon="majesticons:send" className="size-6 text-[#F5BA20]" />
        </button>
      </div>

      <div className="w-11/12 h-1 border-b-2 border-[#e0e0e0] mt-2"></div>
      <button className="absolute right-2" onClick={onClose}>
        <Icon icon="mdi:close-thick" className="size-6 text-[#FD7B8B]" />
      </button>
    </div>
  );
}
