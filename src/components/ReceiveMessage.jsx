import moment from "moment/moment";
import React from "react";
var stringToColour = function (str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = "#";
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};
const ReceivedMessage = ({ message }) => {
  return (
    <div className="flex justify-start pr-10 w-full pt-2 ">
      <div className="flex flex-col justify-center text-gray-200 rounded-sm ml-1 p-2 bg-gray-800">
        <div
          className={`text-xs font-bold mb-1 text-[${stringToColour(
            message.socketIdSender
          )}]`}
        >
          {message.sender}
        </div>

        <span className="flex h-auto text-sm font-normal items-end">
          {message.data}
        </span>
        <span className="w-full text-xs text-right pl-1">
          {moment(message.date).format("hh:mm A")}
        </span>
      </div>
    </div>
  );
};

export default ReceivedMessage;
