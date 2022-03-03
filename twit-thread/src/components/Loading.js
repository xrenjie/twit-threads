import React from "react";
import { ReactComponent as Circle } from "../assets/circle.svg";

const Loading = () => {
  return (
    <div className="h-full w-full dark:bg-slate-900">
      <div className="absolute top-1/2 left-1/2 dark:bg-slate-900">
        <Circle className="w-10 h-10 top-[-20px] left-[-20px] absolute fill-gray-500 dark:fill-gray-100" />
        <Circle className="w-10 h-10 left-[-20px] top-[-20px] absolute animate-ping dark:fill-gray-100" />
      </div>
    </div>
  );
};

export default Loading;
