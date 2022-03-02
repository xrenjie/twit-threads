import React from "react";

const SortMenu = ({ sortReplies }) => {
  return (
    <div className="ml-2">
      Sort by
      <select
        defaultValue={"Total"}
        onChange={(e) => {
          sortReplies(e.target.value);
        }}
        className="ml-2 outline-none active:outline-none"
      >
        <option value="total">Likes and Replies</option>
        <option value="replies">Replies</option>
        <option value="likes">Likes</option>
        <option value="earliest">Earliest first</option>
        <option value="latest">Latest first</option>
      </select>
    </div>
  );
};

export default SortMenu;
