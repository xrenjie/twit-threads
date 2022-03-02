import React from "react";
import Tweet from "./Tweet";

const Thread = ({ tweets, rootTweet, users }) => {
  return (
    <div className="flex flex-col lg:mx-[20vw] mx-[4vw] mt-10 mb-10">
      <Tweet
        tweets={tweets}
        tweet={rootTweet}
        user={users[rootTweet.author_id]}
        users={users}
        prevColor={Number(0.0)}
      />
    </div>
  );
};

export default Thread;
