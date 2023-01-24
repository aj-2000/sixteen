import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateUsername } from "unique-username-generator";
import {
  setHavePermissions,
  setIsAudioAvailable,
  setIsScreenAvailable,
  setIsVideoAvailable,
  setUsername,
} from "../app/features/appSlice";
const SetUsername = () => {
  const userNameRef = useRef(null);
  const localVideoRef = useRef(null);
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);
  const handleConnect = () => {
    if (app.havePermissions) {
      dispatch(setUsername(userNameRef.current.value));
    }
  };
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        window.localStream = stream;
        let video = localVideoRef.current;
        video.srcObject = stream;
        dispatch(setHavePermissions(true));
        dispatch(setIsAudioAvailable(true));
        dispatch(setIsVideoAvailable(true));
      })
      .catch((err) => {
        dispatch(setHavePermissions(false));
        console.log(err);
      });
    if (navigator.mediaDevices.getDisplayMedia) {
      dispatch(setIsScreenAvailable(true));
    } else {
      dispatch(setIsScreenAvailable(false));
    }
  }, []);
  return (
    <>
      <div className="w-full h-full flex justify-center items-center bg-blue-900 px-2">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col bg-white gap-4 px-4 py-2 shadow items-center rounded">
            <div className="uppercase text-lg font-bold text-blue-700">
              Set your username
            </div>
            <div className="flex gap-4 justify-between items-center">
              <div>
                <input
                  ref={userNameRef}
                  className="px-2 py-1 border-b border-black outline-none"
                  type="text"
                  defaultValue={generateUsername()}
                  placeholder="URL or Code"
                />
              </div>
              <button
                onClick={handleConnect}
                className={`py-2 px-4 bg-blue-700 rounded text-white uppercase ${
                  !app.havePermissions && "cursor-not-allowed bg-opacity-25"
                }`}
              >
                Connect
              </button>
            </div>
          </div>
          <div className="onevideo">
            <video
              className="rounded shadow"
              autoPlay
              muted
              ref={localVideoRef}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SetUsername;
