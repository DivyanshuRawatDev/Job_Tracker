import React from "react";

const ChatBox = ({ user, selectedUser, setSelectedUser }) => {
  if (!user?.name) return null; // Avoid undefined user

  const isSelected = selectedUser?._id === user._id;


  const profilePic =
    user?.profilePic?.trim()
      ? user.profilePic
      : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  return (
    <div
      onClick={() => setSelectedUser(user)}
      className={`${
        isSelected ? "bg-green-50" : "bg-white"
      } cursor-pointer flex gap-5 p-2 items-center rounded-xl`}
    >
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
  );
};

export default ChatBox;
