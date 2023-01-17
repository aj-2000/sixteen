import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { generateUsername } from "unique-username-generator";
import { setHavePermissions } from "../../app/features/appSlice";
const SetUsername = () => {
  const userNameRef = useRef(null);
  const localVideoRef = useRef(null);
  const handleConnect = () => {};
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        let video = localVideoRef.current;
        video.srcObject = stream;
        video.play();
        dispatch(setHavePermissions(true));
      })
      .catch((err) => {
        dispatch(setHavePermissions(false));
        console.log(err);
      });
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
                  value={generateUsername()}
                  placeholder="URL or Code"
                />
              </div>
              <button
                onClick={handleConnect}
                className="py-2 px-4 bg-blue-700 rounded text-white uppercase"
              >
                Connect
              </button>
            </div>
          </div>
          <video className="rounded shadow" ref={localVideoRef} />
        </div>
      </div>
    </>
  );
};

export default SetUsername;
