import React from "react";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleMeetingDetailsBox } from "../app/features/appSlice";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import { showToast } from "../App";

const MeetingDetails = () => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center m-2 text-white">
        <span className="text-3xl">Meeting Details</span>
        <button
          onClick={() => {
            dispatch(toggleMeetingDetailsBox());
          }}
          className="text-3xl"
        >
          <MdCancel />
        </button>
      </div>

      <div className="flex flex-col gap-2 m-2 text-white">
        <div className="text-base">Joining Info</div>
        <div className="text-sm text-gray-400">{window.location.href}</div>
        <CopyToClipboard
          text={window.location.href}
          onCopy={() => {
            showToast("Copied Meeting Link");
          }}
        >
          <button className="rounded text-base flex items-center gap-2 px-4 py-2 text-sky-500 hover:bg-sky-100 hover:bg-opacity-10">
            <FiCopy size={20} />
            <span>Copy joining info</span>
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default MeetingDetails;
