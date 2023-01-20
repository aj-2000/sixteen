import React, { useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
const ComposeMessageBox = ({ sendMessage }) => {
  const messageRef = useRef();
  return (
    <div className="flex justify-around items-center bg-gray-500 p-2 rounded-b-md">
      <div>
        <input
          ref={messageRef}
          type="text"
          className="rounded-full pl-6 pr-12 py-2 focus:outline-none h-auto placeholder-gray-100 bg-gray-900 text-white "
          placeholder="Type a message..."
          id="typemsg"
        />
      </div>
      <button
        onClick={() => {
          if (messageRef.current.value !== "") {
            sendMessage(messageRef.current.value);
            messageRef.current.value = "";
          }
        }}
      >
        <AiOutlineSend className="text-3xl" />
      </button>
    </div>
  );
};

export default ComposeMessageBox;
