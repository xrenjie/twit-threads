import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [tweetUrl, setTweetUrl] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    let segments = tweetUrl.split("/");
    let idx = segments.indexOf("status");
    navigate(`/thread/${segments[idx + 1]}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mt-20 flex md:w-[40vw] w-10/12 gap-6 md:flex-row flex-col "
    >
      <input
        type="text"
        placeholder="Tweet URL"
        onChange={(e) => {
          setTweetUrl(e.target.value);
        }}
        className="w-full p-2 border-2 border-gray-400 rounded bg-gray-100 dark:outline-none dark:border-none dark:bg-slate-700 dark:cursor-white dark:placeholder-slate-100 dark:caret-slate-100 dark:text-slate-100"
      />
      <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 px-6 dark:border">
        Go
      </button>
    </form>
  );
};

export default SearchBar;
