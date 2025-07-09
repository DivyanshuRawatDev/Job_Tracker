import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DashboardImage from "../assets/dashboard.svg";
import ChatBox from "../components/chat/ChatBox";
import SideBarChat from "../components/chat/SideBarChat";
import { fetchAllUsersWithoutCurrentUser } from "../redux/slices/conversationSlice";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const conversation = useSelector((store) => store.conversation);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsersWithoutCurrentUser());
  }, []);
  console.log(selectedUser);
  return (
    <div className="bg-amber-100">
      <div className="bg-[#06923E] flex justify-between items-center p-5">
        <h1 className="font-extrabold  text-3xl">JOB TRACKER</h1>
        <div className="flex items-center gap-5">
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <img src={DashboardImage} width={35} alt="chat" />
          </div>
        </div>
      </div>
      <div className="bg-green-50 h-[calc(100vh-78px)]  flex">
        <div className="bg-blue-100 w-2/6 flex flex-col  gap-5 p-2">
          {conversation.allUsersWithoutCurrentUser?.length > 0 &&
            conversation.allUsersWithoutCurrentUser?.map((item) => {
              return (
                <ChatBox
                  setSelectedUser={setSelectedUser}
                  selectedUser={selectedUser}
                  key={item._id}
                  user={item}
                />
              );
            })}
        </div>
        <div className="bg-orange-300  w-4/6">
          <SideBarChat selectedUser={selectedUser} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
