import React from "react";
import Tweet from "./Tweet";

const Thread = ({ tweets, rootTweet, users }) => {
  return (
    <div className="flex flex-col">
      <Tweet
        tweets={tweets}
        tweet={rootTweet}
        user={users[rootTweet.author_id]}
        users={users}
        rootTweet={rootTweet}
      />
    </div>
  );
};

export default Thread;
