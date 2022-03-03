import React from "react";

const TweetBody = ({ tweet }) => {
  return <span className="break-words">{tweet.text}</span>;
};

export default React.memo(TweetBody);
