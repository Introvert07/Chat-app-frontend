import React, { useEffect, useRef } from "react";
import { BiLogOut, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import axios from "axios";
import { BASE_URL } from "../index.js";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesContainerRef = useRef(null);
  const isOnline = onlineUsers?.includes(selectedUser?._id);

  // ✅ Fetch messages only for the selected user
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser?._id) {
        console.error("No user selected. Cannot fetch messages.");
        return;
      }
    
      const token = localStorage.getItem("token");
    
      if (!token) {
        console.error("No token found. Redirecting to login...");
        window.location.href = "/login";
        return;
      }
    
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/message/${selectedUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(setMessages(res.data || []));
      } catch (error) {
        if (error.response?.status === 401) {
          console.error("Session expired. Redirecting to login...");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else if (error.response?.status === 404) {
          console.error("No messages found for this user.");
        } else {
          console.error("Failed to fetch messages:", error.response?.data || error.message);
        }
      }
    };
    

    fetchMessages();
  }, [selectedUser, dispatch]);

  // ✅ Scroll messages to bottom when they update
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [selectedUser]);

  // ✅ Delete Chat Function (Fixed Authorization Issue)
  const handleDeleteChat = async () => {
    if (!selectedUser?._id) {
      console.error("No user selected. Cannot delete messages.");
      return;
    }

    const token = localStorage.getItem("token"); // 🔹 Get latest token

    if (!token) {
      console.error("No token found. Redirecting to login...");
      window.location.href = "/login";
      return;
    }

    try {
      await axios.delete(`${BASE_URL}/api/v1/message/${selectedUser._id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Fixed: Added Authorization
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      dispatch(setMessages([]));
    } catch (error) {
      console.error(
        "Failed to delete chat:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      {selectedUser !== null ? (
        <div className="md:min-w-[850px] flex flex-col h-screen text-white">
          {/* 🔹 Chat Header (Fixed at Top) */}
          <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700 shadow-md flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full">
                  <img src={selectedUser?.profilePhoto} alt="user-profile" />
                </div>
              </div>
              <p className="text-lg font-semibold">{selectedUser?.fullName}</p>
            </div>

            {/* 🔹 Logout & Delete Chat Icons */}
            <div className="flex items-center gap-4">
              <BiTrash
                onClick={handleDeleteChat}
                className="text-2xl text-gray-400 hover:text-red-500 cursor-pointer transition-all"
              />
              <BiLogOut
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                className="text-2xl text-red-500 hover:text-red-400 cursor-pointer transition-all"
              />
            </div>
          </div>

          {/* 🔹 Messages (Only This Scrolls) */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto px-4 py-2"
          >
            <Messages />
          </div>

          {/* 🔹 Send Input (Fixed & Full Width) */}
          <div className="w-full flex-shrink-0">
            <SendInput />
          </div>
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center h-screen">
          <h1 className="text-4xl font-bold">
            Hi, {authUser?.fullName || authUser?.username} 👋
          </h1>
          <h2 className="text-2xl text-gray-400">Let's start a conversation</h2>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
