import React from "react";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toggleMeetingDetailsBox } from "../app/features/appSlice";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// function to show toast with given message
export const showToast = (message) =>
  toast(message, {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
const MeetingDetails = () => {
  const dispatch = useDispatch();

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
      {/* display "Meeting link copied" message */}
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={<div></div>}
        theme="dark"
      />
    </div>
  );
};

export default MeetingDetails;
