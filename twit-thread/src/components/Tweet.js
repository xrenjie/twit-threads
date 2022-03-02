import React from "react";
import UserInfo from "./UserInfo";
import TweetBody from "./TweetBody";

const Tweet = ({ tweets, tweet, user, users, prevColor }) => {
  return (
    <div
      className={`p-2 pb-0 ml-3 border-l-2 border-t-2 ${
        tweet.root ? "border-l-4 border-gray-400" : ""
      }`}
    >
      <UserInfo user={user} tweet={tweet} />
      <TweetBody tweet={tweet} />
      <div className="text-xs">
        {new Date(tweet.created_at).toLocaleString() + " "}
      </div>
      {tweets[tweet.id]
        ? tweets[tweet.id].map((reply) => {
            return (
              <Tweet
                tweets={tweets}
                tweet={reply}
                user={users[reply.author_id]}
                users={users}
                key={reply.id}
                prevColor={prevColor + 0.2}
              />
            );
          })
        : null}
    </div>
  );
};

export default Tweet;
