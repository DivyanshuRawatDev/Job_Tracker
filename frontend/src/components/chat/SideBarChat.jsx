import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import { useSelector } from "react-redux";
import API from "../../utils/axios";
import { joinRoom, socket } from "../../utils/socket";

import  TypingGif from "../../assets/typing.gif"

const SideBarChat = ({ selectedUser }) => {
  const { user } = useSelector((store) => store.user);
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      API.post("/conversation", {
        senderID: user._id,
        receiverID: selectedUser._id,
      })
        .then((response) => {
          console.log("API response:", response.data);
          setConversation(response.data);
          joinRoom(response.data?.conversation?._id);
          scrollToBottom();
        })
        .catch((err) => console.error("Error fetching conversation", err));
    }
  }, [selectedUser, user._id]);

  useEffect(() => {
    socket.on("message", (msg) => {
      console.log("New message via socket:", msg);

      // Update conversation state
      setConversation((prev) => ({
        ...prev,
        messages: [...(prev?.messages || []), msg],
      }));
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSendMessage = async () => {
    try {
      const newMessage = {
        senderID: user._id,
        receiverID: selectedUser._id,
        message: message,
        roomID: conversation.conversation._id,
      };

      await API.post("message", newMessage);

      setMessage("");
      scrollToBottom();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  //typing function
  let timer;
  const debounceStopTyping = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      socket.emit("stopTyping", {
        roomID: conversation.conversation._id,
        senderID: user._id,
      });
    }, 1500);
  };

  const handleTyping = () => {
    socket.emit("typing", {
      roomID: conversation.conversation._id,
      senderID: user._id,
    });
    debounceStopTyping();
  };

  useEffect(() => {
    socket.on("typing", ({ senderID }) => {
      if (senderID === selectedUser._id) {
        setIsTyping(true);
      }
    });

    socket.on("stopTyping", ({ senderID }) => {
      if (senderID === selectedUser._id) {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [selectedUser._id]);

  return (
    <div className="flex flex-col p-1 bg-blue-100  h-full">
      <div className="bg-green-400 h-[10%] flex items-center gap-5 p-1">
        <img
          width={40}
          className="rounded-full  "
          src={
            selectedUser.profilePic ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          onError={(e) => {
            e.target.src = "https://freesvg.org/img/abstract-user-flat-4.png";
          }}
        />
        <p>{selectedUser.name}</p>
      </div>
      {/* chat bubble */}

      <div
        className="bg-green-50 relative h-[77%] p-3 overflow-x-auto "
        ref={chatContainerRef}
      >
        {!selectedUser && (
          <div className="flex  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            No Chat Selected !!!
          </div>
        )}
        {conversation?.messages?.length > 0 &&
          conversation?.messages?.map((item) => {
            return (
              <ChatBubble
                message={item.message}
                key={item._id}
                isSender={item.senderID === user._id}
              />
            );
          })}
        {isTyping && (
          <img src={TypingGif} width={60} alt="typing..."/>
        )}
      </div>
      {/* chat input */}
      <div className="bg-green-400 h-[13%] p-2 flex flex-col justify-center w-full">
        <div className="bg-white flex items-center rounded-full shadow px-2 py-1">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 outline-none px-2 text-gray-700"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBarChat;
