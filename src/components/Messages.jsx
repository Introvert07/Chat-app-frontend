import React, { useEffect } from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";

const Messages = () => {
  useGetMessages(); // ✅ Fetch messages on component mount
  useGetRealTimeMessage(); // ✅ Listen for real-time messages

  const { messages } = useSelector((store) => store.message);
  const { selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    console.log("Selected user changed, messages should update:", selectedUser);
  }, [selectedUser]); // ✅ Debugging log when user changes

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages && messages.length > 0 ? (
        messages.map((message) => <Message key={message._id} message={message} />)
      ) : (
        <p className="text-center text-gray-500">No messages yet</p>
      )}
    </div>
  );
};

export default Messages;
