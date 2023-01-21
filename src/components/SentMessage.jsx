import moment from "moment";
import React from "react";
const SentMessage = ({ message }) => {
  return (
    <div className="flex justify-end pt-2 pl-10">
      <div className="flex flex-col justify-center text-gray-200 rounded-sm ml-1  p-2 bg-green-900">
        <div className={`text-xs font-bold mb-1`}>{message.sender}</div>

        <span className="flex h-auto text-sm font-normal  items-end">
          {message.data}
        </span>
        <span className="w-full text-xs text-right pl-1">
          {moment(message.date).format("hh:mm A")}
        </span>
      </div>
    </div>
  );
};

export default SentMessage;
