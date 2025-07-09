import React from "react";

const ChatBubble = ({ message, isSender }) => {
  return (
    <div
      className={`flex  ${isSender ? "justify-end" : "justify-start"} mb-2`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-white shadow
        ${isSender ? "bg-blue-500 rounded-br-none" : "bg-gray-400 rounded-bl-none"}`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatBubble;
