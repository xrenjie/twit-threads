import React from "react";

const TweetBody = ({ tweet }) => {
  return <div className="break-words py-1">{tweet.text}</div>;
};

export default React.memo(TweetBody);
