import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment"; // ✅ Import moment.js for time formatting

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isSentByAuthUser = message?.senderId === authUser?._id;
  const messageClass = isSentByAuthUser ? "chat-end bg-blue-500 text-white" : "chat-start bg-gray-200 text-black";
  const senderProfile = isSentByAuthUser ? authUser?.profilePhoto : selectedUser?.profilePhoto;

  // ✅ Convert message timestamp to human-readable format
  const formattedTime = message?.createdAt
    ? moment(message.createdAt).format("hh:mm A") // Example: "02:30 PM"
    : "Sending...";

  return (
    <div ref={scroll} className={`chat ${isSentByAuthUser ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 h-10 rounded-full border border-gray-500 overflow-hidden">
          <img src={senderProfile} alt="User Avatar" className="object-cover w-full h-full" />
        </div>
      </div>

      <div className="chat-header text-xs text-gray-800 flex items-center gap-2">
        {isSentByAuthUser ? "You" : selectedUser?.username}
        <span className="opacity-75">{formattedTime}</span>
      </div>

      <div className={`chat-bubble ${messageClass} p-3 rounded-lg shadow-md`}>
        {message?.message}
      </div>
    </div>
  );
};

export default Message;
