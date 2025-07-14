import { getMultiFactorResolver } from "firebase/auth";
import React from "react";
import OnlineImg from "../../assets/online.svg";
import OfflineImg from "../../assets/offline.svg";

const ChatBox = ({ user, onlineUsers, selectedUser, setSelectedUser }) => {
  const isOnline = onlineUsers[user._id] ? true : false;
  if (!user?.name) return null;

  const isSelected = selectedUser?._id === user._id;

  const profilePic = user?.profilePic?.trim()
    ? user.profilePic
    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  return (
    <div
      onClick={() => setSelectedUser(user)}
      className={`justify-between pr-5 ${
        isSelected ? "bg-green-50" : "bg-white"
      } cursor-pointer flex gap-5 p-2 items-center rounded-xl`}
    >
      <div className="flex items-center gap-5 ">
        <img
          width={50}
          className="rounded-full"
          src={profilePic}
          // crossOrigin="anonymous"
          onError={(e) => {
            e.target.src = "https://freesvg.org/img/abstract-user-flat-4.png";
          }}
          alt={user.name}
        />
        <div>
          <h3>{user.name}</h3>
        </div>
      </div>

      <div>
        <img src={isOnline ? OnlineImg : OfflineImg} width={10} />
      </div>
    </div>
  );
};

export default ChatBox;
