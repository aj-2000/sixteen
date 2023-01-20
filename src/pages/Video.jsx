import React, { useRef } from "react";
import { useSelector } from "react-redux";
import MeetingScreen from "../components/Meeting";

import SetUsername from "../components/SetUsername";
const Video = () => {
  const app = useSelector((state) => state.app);
  return <>{app.userName ? <MeetingScreen /> : <SetUsername />}</>;
};

export default Video;
