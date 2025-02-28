import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa"; // Emoji button icon
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { BASE_URL } from "..";
import EmojiPicker from "emoji-picker-react";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const token = localStorage.getItem("token"); // Always get the latest token

    if (!token) {
      console.error("No token found. Redirecting to login...");
      window.location.href = "/login";
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setMessages([...messages, res?.data?.newMessage]));
      setMessage("");
    } catch (error) {
      if (error.response?.status === 401) {
        console.error("Session expired. Redirecting to login...");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        console.error("Error sending message:", error.response?.data || error.message);
      }
    }
  };

  // Function to add selected emoji to input field
  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <form onSubmit={onSubmitHandler} className="p-3 border-t border-gray-700 bg-gray-800 relative">
      <div className="relative flex items-center">
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-12 left-0 bg-gray-900 rounded-lg shadow-lg">
            <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
          </div>
        )}

        {/* Emoji Button */}
        <button 
          type="button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="p-2 text-gray-400 hover:text-white transition-all"
        >
          <FaRegSmile size={22} />
        </button>

        {/* Input Field */}
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="w-full rounded-full p-3 pl-5 pr-12 text-white bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Send Button */}
        <button 
          type="submit"
          className="absolute right-3 p-2 text-blue-400 hover:text-blue-500 active:scale-95 transition-all"
        >
          <IoSend size={22} />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
