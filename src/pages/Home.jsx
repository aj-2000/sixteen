import React, { useRef, useState } from "react";
import { SiGooglemeet } from "react-icons/si";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const urlRef = useRef();
  const navigate = useNavigate();
  const handleJoin = () => {
    if (urlRef.current.value !== "") {
      const url = urlRef.current.value.split("/");
      navigate(`/${url[url.length - 1]}`);
    } else {
      const url = Math.random().toString(36).substring(2, 7);
      navigate(`/${url}`);
    }
  };
  return (
    <>
      <div className="w-full h-full flex justify-center items-center bg-blue-900">
        <div className="flex flex-col bg-white gap-4 p-8 shadow items-center rounded">
          <div className="flex gap-4 justify-between items-center">
            <div>
              <input
                ref={urlRef}
                className="px-2 py-1 border-b border-black outline-none"
                type="text"
                placeholder="URL or Code"
              />
            </div>
            <button
              onClick={handleJoin}
              className="py-2 px-4 bg-blue-700 rounded text-white uppercase"
            >
              Join
            </button>
          </div>
          <div>
            <button
              onClick={handleJoin}
              className="flex gap-2 items-center py-2 px-4 bg-blue-700 rounded text-white uppercase"
            >
              <div>
                <SiGooglemeet size={20} />
              </div>
              <div>New Meeting</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
