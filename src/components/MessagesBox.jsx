import React from "react";
import { useSelector } from "react-redux";
import ReceivedMessage from "./ReceiveMessage";
import SentMessage from "./SentMessage";

const MessagesBox = () => {
  const app = useSelector((state) => state.app);
  return (
    <div className="w-full h-full items-end flex flex-col p-2 overflow-scroll rounded-t-md bg-slate-900">
      {app.messages.map((message) => {
        if (message.socketIdSender === app.socketId) {
          return <SentMessage message={message} />;
        } else {
          return <ReceivedMessage message={message} />;
        }
      })}
    </div>
  );
};

export default MessagesBox;
