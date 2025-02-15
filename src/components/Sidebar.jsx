import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi"; // ✅ Search Icon
import { AiOutlineDelete } from "react-icons/ai"; // ✅ Delete Icon
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setOtherUsers, setSelectedUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import OtherUser from "./OtherUser";

const BASE_URL = "https://chat-app-backend-one-zeta.vercel.app";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { otherUsers, authUser, selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No authentication token found. Please log in.");
          return;
        }
        const res = await axios.get(`${BASE_URL}/api/v1/user/all-users`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setOtherUsers(res.data.users || res.data));
        setUsersLoaded(true);
      } catch (error) {
        toast.error("Failed to fetch users. Check console for details.");
      }
    };

    if (authUser) fetchUsers();
  }, [authUser, dispatch]);

  // ✅ Handle Selecting a User for Chat
  const handleSelectUser = (user) => {
    dispatch(setSelectedUser(user));
  
  };

  // ✅ Handle Account Deletion
  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/user/delete/${authUser?._id}`, {
        withCredentials: true,
      });
      toast.success("Account deleted successfully");
      navigate("/signup"); // Redirect to sign-up page
    } catch (error) {
      toast.error("Failed to delete account. Try again.");
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="sidebar bg-gray-900 text-white w-80 h-screen flex flex-col shadow-lg">
      {/* 🔹 Fixed Header with Search Bar */}
      <div className="p-4 m-2 border-b border-gray-700 flex items-center gap-2 bg-gray-800 flex-shrink-0 rounded-badge">
        <BiSearchAlt2 className="text-xl text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-white outline-none w-full px-2 py-1"
        />
      </div>

      {/* 🔹 Scrollable User List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 pr-2">
        {!usersLoaded ? (
          <p className="text-center text-gray-500 mt-4">Loading users...</p>
        ) : otherUsers.length > 0 ? (
          otherUsers
            .filter((user) => user.username.toLowerCase().includes(search.toLowerCase()))
            .map((user) => (
              <div key={user._id} onClick={() => handleSelectUser(user)}>
                <OtherUser user={user} isSelected={selectedUser?._id === user._id} />
              </div>
            ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No users found.</p>
        )}
      </div>

      {/* 🔹 Logged-in User Profile & Delete Option */}
      <div className="p-4 border-t border-gray-700 flex flex-col items-center bg-gray-800 relative">
        <img 
          src={authUser?.profilePhoto} 
          alt="Your Profile" 
          className="w-14 h-14 rounded-full border-2 border-gray-300 shadow-lg"
        />
        <p className="mt-2 text-lg font-semibold">{authUser?.fullName || authUser?.username}</p>

        {/* 🔹 Delete Account Button */}
        <button 
          onClick={() => setShowDeletePopup(true)} 
          className="mt-3 text-red-400 hover:text-red-500 flex items-center gap-1 text-sm"
        >
          <AiOutlineDelete size={18} /> Delete Account
        </button>
      </div>

      {/* 🔹 Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold">Delete My Account?</h2>
            <p className="text-gray-400 mt-2">This action cannot be undone.</p>
            <div className="mt-4 flex justify-center gap-4">
              <button 
                onClick={handleDeleteAccount} 
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button 
                onClick={() => setShowDeletePopup(false)} 
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
