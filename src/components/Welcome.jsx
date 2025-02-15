import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const { authUser } = useSelector((store) => store.user);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen w-screen overflow-hidden ">
      <div className="w-11/12 max-w-sm sm:max-w-2xl p-6 sm:p-12 rounded-xl shadow-xl bg-white bg-opacity-20 backdrop-blur-md border border-gray-600 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-wide">
          Welcome, <span className="text-black">{authUser?.fullName || authUser?.username}</span> 👋
        </h1>
        <h2 className="text-lg sm:text-2xl text-black mt-3 italic">
          Let's start a conversation
        </h2>

        {/* Start Chat Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold text-white shadow-lg transition-all transform hover:scale-105"
        >
          🚀 Start Chat
        </button>
      </div>
    </div>
  );
};

export default Welcome;
