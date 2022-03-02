import React from "react";
import SearchBar from "./SearchBar";

const Home = ({ setTweetId }) => {
  return (
    <div className="w-full flex items-center pt-40 flex-col">
      <h1 className="text-3xl text-center">
        Read Twitter threads in a better way.
      </h1>
      <SearchBar />
    </div>
  );
};

export default Home;
