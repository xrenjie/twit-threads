import React from "react";
import ThreadPage from "./ThreadPage";
import RecentThreads from "../Common/RecentThreads";

const DataPage = () => {
  return (
    <div className="dark:bg-slate-900 overflow-auto pt-20 h-full w-full lg:grid lg:grid-cols-12 flex flex-col">
      <div className="lg:col-span-9">
        <ThreadPage />
      </div>

      <div className="lg:col-span-3 ml-10 lg:ml-0">
        <RecentThreads />
      </div>
    </div>
  );
};

export default DataPage;
