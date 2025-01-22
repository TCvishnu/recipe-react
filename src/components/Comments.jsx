import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Icon } from "@iconify/react";

export default function Comments({ onClose, email }) {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const { recipeID } = useParams();
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(null);

  const fetchComments = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${backendURL}/api/recipes/${recipeID}/comments`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const receivedData = await response.json();
      setCommentsCount(countTheNumberOfComments(receivedData.comments));
      setComments(receivedData.comments);
    } catch (error) {
      console.error(error);
    }
  };

  const countTheNumberOfComments = (comments) => {
    const numOfComments = comments.reduce(
      (accumulator, comment) => accumulator + comment.replies.length + 1,
      0
    );

    return numOfComments;
  };

  const timeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
      return `${seconds} ${seconds === 1 ? "sedond" : "seconds"} ago`;
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className=" w-full h-[35rem] fixed z-10 bottom-0 bg-white rounded-t-lg flex flex-col py-3 items-center gap-2">
      <div className="w-full flex items-center justify-center gap-2">
        <h2 className="font-righteous text-lg text-center">Comments</h2>
        <span className="px-1 text-white text-sm rounded-md bg-[#FD7B8B] text-center">
          {commentsCount}
        </span>
      </div>
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

      <div className="w-full flex flex-col gap-5 overflow-x-auto">
        {comments.map((comment, index) => (
          <div key={index} className=" px-6 w-full flex flex-col gap-5">
            <div className="flex flex-col">
              <div className=" flex gap-3 items-center">
                <span
                  className={`font-righteous ${
                    comment.user.email === email ? "text-[#2eb800]" : ""
                  }`}
                >
                  {comment.user.email.split("@")[0]}
                  {comment.user.email === email ? " (you)" : ""}
                </span>
                <span className=" text-xs text-gray-400 font-medium">
                  {timeAgo(comment.updated_at)}
                </span>
              </div>
              <span className="font-medium text-sm px-1 text-gray-600">
                {comment.text}
              </span>
              <div className="w-full border-b h-1"></div>
            </div>

            {comment.replies.map((reply, index) => (
              <div key={index} className="px-3 w-full flex flex-col">
                <div className=" flex gap-3 items-center">
                  <span
                    className={`font-righteous ${
                      reply.reply.user.email === email ? "text-[#2eb800]" : ""
                    }`}
                  >
                    {reply.reply.user.email.split("@")[0]}
                    {reply.reply.user.email === email ? " (you)" : ""}
                  </span>
                  <span className=" text-xs text-gray-400 font-medium">
                    {timeAgo(reply.reply.updated_at)}
                  </span>
                </div>

                <span className="font-medium text-sm px-1 text-gray-600">
                  {reply.reply.text}
                </span>
                <div className="w-full border-b h-1"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="absolute right-2" onClick={onClose}>
        <Icon icon="mdi:close-thick" className="size-6 text-[#FD7B8B]" />
      </button>
    </div>
  );
}
