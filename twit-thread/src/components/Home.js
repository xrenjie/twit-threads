import React from "react";
import SearchBar from "./SearchBar";
const Home = ({ setTweetId }) => {
  return (
    <div className="w-full h-full flex items-center flex-col dark:bg-slate-900 pt-40">
      <h1 className="text-3xl text-center dark:text-gray-100">
        Read Twitter threads in a better way.
      </h1>
      <SearchBar />
    </div>
  );
};

export default Home;
