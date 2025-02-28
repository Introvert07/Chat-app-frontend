import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { BASE_URL } from "..";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.token && res.data.user) {
        localStorage.setItem("token", res.data.token);
        dispatch(setAuthUser(res.data.user));
        toast.success("Login successful!");
        navigate("/welcome");
      } else {
        toast.error("Invalid login response. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
        <form onSubmit={onSubmitHandler} className="mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Username</label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter your username"
            />
          </div>
          <div className="mt-4 relative">
            <label className="block text-sm font-medium text-gray-900">Password</label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <span
              className="absolute right-3 top-10 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </span>
          </div>
          <p className="text-center text-sm text-gray-900 my-3">
            Don't have an account? <Link to="/signup" className="text-blue-400">Signup</Link>
          </p>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
