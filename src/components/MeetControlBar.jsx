import { useState, useEffect } from "react";
import { BiMicrophone, BiMicrophoneOff, BiInfoCircle } from "react-icons/bi";
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";
import {
  MdCallEnd,
  MdOutlinePeopleAlt,
  MdOutlineScreenShare,
  MdOutlineStopScreenShare,
} from "react-icons/md";

import { BsFillChatLeftTextFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  resetNewMessages,
  toggleChatBox,
  toggleMeetingDetailsBox,
  toggleParticipantDetailsBox,
} from "../app/features/appSlice";
import { useParams } from "react-router-dom";
import moment from "moment/moment";
const MeetControlBar = ({
  handleEndCall,
  handleVideo,
  handleAudio,
  handleScreen,
  isAudioOn,
  isVideoOn,
  isScreenOn,
}) => {
  const dispatch = useDispatch();
  const { url } = useParams();
  const [time, setTime] = useState(moment().format("HH:mm:ss A"));
  const app = useSelector((state) => state.app);
  useEffect(() => {
    const interval = setInterval(
      () => setTime(moment().format("HH:mm:ss A")),
      1000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="bg-black flex flex-col md:flex-row text-white text-base justify-between items-center px-4 py-1">
      <div className="hidden md:inline-block">{`${time} | ${url}`}</div>
      <div className="flex">
        {app.isAudioAvailable ? (
          <button
            onClick={handleAudio}
            className={`text-lg rounded-full ${
              isAudioOn ? "bg-gray-700" : "bg-red-500"
            } p-2 my-2 mx-1`}
          >
            {isAudioOn ? <BiMicrophone /> : <BiMicrophoneOff />}
          </button>
        ) : null}

        {app.isVideoAvailable ? (
          <button
            onClick={handleVideo}
            className={`text-lg rounded-full ${
              isVideoOn ? "bg-gray-700" : "bg-red-500"
            } p-2 my-2 mx-1`}
          >
            {isVideoOn ? <BsCameraVideo /> : <BsCameraVideoOff />}
          </button>
        ) : null}

        {app.isScreenAvailable ? (
          <button
            onClick={handleScreen}
            className={`text-lg rounded-full ${
              isScreenOn ? "bg-gray-700" : "bg-red-500"
            } p-2 my-2 mx-1`}
          >
            {isScreenOn ? (
              <MdOutlineScreenShare />
            ) : (
              <MdOutlineStopScreenShare />
            )}
          </button>
        ) : null}
        <button
          onClick={handleEndCall}
          className="text-lg rounded-full  bg-red-500 px-4 py-2 my-2 mx-1"
        >
          <MdCallEnd />
        </button>
      </div>
      <div className="flex">
        <button
          onClick={() => {
            dispatch(toggleMeetingDetailsBox());
          }}
          className="text-2xl rounded-full px-4 py-2 my-2 mx-1"
        >
          <BiInfoCircle />
        </button>
        <button
          onClick={() => {
            dispatch(toggleParticipantDetailsBox());
          }}
          className="relative text-2xl rounded-full px-4 py-2 my-2 mx-1"
        >
          <MdOutlinePeopleAlt />
          {app.participants.length > 0 ? (
            <span class="absolute right-2 top-1 rounded-full bg-white w-4 h-4 top right p-0 m-0 text-black font-mono text-sm  leading-tight text-center">
              {app.participants.length}
            </span>
          ) : null}
        </button>
        <button
          onClick={() => {
            dispatch(resetNewMessages());
            dispatch(toggleChatBox());
          }}
          className="relative text-xl rounded-full px-4 py-2 my-2 mx-1"
        >
          <BsFillChatLeftTextFill />
          {app.newMessages > 0 ? (
            <span class="absolute right-2 top-1 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
              {app.newMessages}
            </span>
          ) : null}
        </button>
      </div>
    </div>
  );
};

export default MeetControlBar;
