import React from "react";
import { ReactComponent as Circle } from "../assets/circle.svg";

const Loading = () => {
  return (
    <div className="absolute top-1/2 left-1/2">
      <Circle className="w-10 h-10 absolute  fill-gray-500" />
      <Circle className="w-10 h-10 absolute  animate-ping" />
    </div>
  );
};

export default Loading;
