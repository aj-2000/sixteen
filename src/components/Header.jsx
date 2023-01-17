import React from "react";

const Header = () => {
  return (
    <div className="flex text-xl items-center justify-between px-4 py-2 shadow">
      <div className="font-mono font-extrabold text-blue-600">SIXTEEN</div>
      <div className="flex text-xs text-blue-500 font-medium items-center gap-x-6 md:gap-x-8">
        <span className="hidden md:inline-block">SCHEDULE</span>
        <span>JOIN</span>
        <span>HOST</span>
        <span className="hidden md:inline-block">WHITEBOARD</span>
        <span>
          <img
            className="w-8 h-8 rounded-lg"
            src="https://media.licdn.com/dms/image/D4D03AQHh5u0zW76BqQ/profile-displayphoto-shrink_800_800/0/1668944589962?e=1677715200&v=beta&t=RB-ZLzKyU_hqd0lYsawIv8vrbtsS24ofrBlsRc7RLjA"
          />
        </span>
      </div>
    </div>
  );
};

export default Header;
