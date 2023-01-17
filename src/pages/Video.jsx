import React, { useRef } from "react";
import { useSelector } from "react-redux";

import SetUsername from "../components/SetUsername";
const Video = () => {
  const app = useSelector((state) => state.app);
  return <>{app.userName ? null : <SetUsername />}</>;
};

export default Video;
