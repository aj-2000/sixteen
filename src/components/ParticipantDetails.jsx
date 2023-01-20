import React from "react";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleParticipantDetailsBox } from "../app/features/appSlice";

const ParticipantDetails = () => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center m-2 text-white">
        <span className="text-3xl">Participants</span>
        <button
          onClick={() => {
            dispatch(toggleParticipantDetailsBox());
          }}
          className="text-3xl"
        >
          <MdCancel />
        </button>
      </div>

      <div className="flex flex-col gap-6 m-2 text-white">
        <span className="text-sm text-white">In call</span>
        <div className="flex flex-col gap-4 justify-between px-2">
          {app.participants.map((socketId) => {
            return (
              <div key={socketId} className="flex gap-3 items-center">
                <div className="uppercase rounded-full flex justify-center items-center font-extrabold font-mono w-6 h-6 bg-white text-black">
                  {app.users[socketId][0]}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-sm">{`${app.users[socketId]}${
                    socketId === app.socketId && " (You)"
                  }`}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ParticipantDetails;
