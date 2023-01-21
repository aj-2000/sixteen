import React, { useRef } from "react";
import { useSelector } from "react-redux";
import MeetingScreen from "../components/Meeting";

import SetUsername from "../components/SetUsername";
const Video = () => {
  const app = useSelector((state) => state.app);
  // if username is not null or empty or undefined then only render Meeting Screen otherwise render SetUsername Screen
  return <>{app.userName ? <MeetingScreen /> : <SetUsername />}</>;
};

export default Video;
