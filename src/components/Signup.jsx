import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://chat-app-backend-one-zeta.vercel.app/api/v1/user/register", user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(res);
      toast.success("Signup successful!");

      setUser({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed.");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 ">
      <div className="w-full max-w-lg p-8 rounded-lg shadow-lg  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 ">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
        
        <form onSubmit={onSubmitHandler}>
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-semibold">Full Name</label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Username */}
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold">Username</label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Choose a username"
              required
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold">Confirm Password</label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Gender Selection */}
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold">Gender</label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={user.gender === "male"}
                  onChange={() => handleCheckbox("male")}
                  className="cursor-pointer"
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={user.gender === "female"}
                  onChange={() => handleCheckbox("female")}
                  className="cursor-pointer"
                />
                Female
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account? */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
