import React from "react";
import { ReactComponent as Circle } from "../assets/circle.svg";

const Loading = () => {
  return (
    <div className="">
      <Circle className="w-10 h-10 absolute top-1/2 left-1/2 fill-gray-500" />
      <Circle className="w-10 h-10 absolute top-1/2 left-1/2 animate-ping" />
    </div>
  );
};

export default Loading;
