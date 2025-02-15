import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user, isSelected }) => {
  const dispatch = useDispatch();
  const { onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers?.includes(user._id);

  return (
    <>
      <div
        onClick={() => dispatch(setSelectedUser(user))}
        className={`flex gap-2 items-center p-2 cursor-pointer rounded 
          ${isSelected ? "bg-blue-600 text-white" : "hover:bg-gray-700 text-gray-300"}`}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={user?.profilePhoto} alt="user-profile" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p>{user?.username || user?.fullName}</p>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default OtherUser;
