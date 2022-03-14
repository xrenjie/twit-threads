import React from "react";
import SearchBar from "./SearchBar";
import RecentThreads from "../Common/RecentThreads";

const Home = () => {
  return (
    <div className=" w-full h-full overflow-auto dark:bg-slate-900 pb-40">
      <div className="relative flex flex-col w-full h-full top-40 items-center pb-20">
        <h1 className="text-3xl text-center dark:text-gray-100">
          Read Twitter threads in a better way.
        </h1>
        <SearchBar />
        <div className="mt-40 w-full px-[10vw]">
          <RecentThreads numTweetsToShow={10} />
        </div>
      </div>
    </div>
  );
};

export default Home;
