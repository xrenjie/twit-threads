import React from "react";

const TweetBody = ({ tweet }) => {
  return (
    <div>
      <span>{tweet.text}</span>
    </div>
  );
};

export default TweetBody;
