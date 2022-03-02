import React from "react";
import UserInfo from "./UserInfo";
import TweetBody from "./TweetBody";

const Tweet = ({ tweets, tweet, user, users, prevColor }) => {
  return (
    <div
      className={`px-2 pt-2 mt-2 rounded ml-2 border-l-2 border-t-2 ${
        tweet.root ? "border-l-[3] border-gray-400" : ""
      }`}
    >
      <UserInfo user={user} tweet={tweet} />
      <TweetBody tweet={tweet} />
      <div className="text-xs">
        {user ? (
          <a
            href={`https://www.twitter.com/${user.username}/status/${tweet.id}`}
            target="_blank"
            rel="noreferrer"
          >
            {new Date(tweet.created_at).toLocaleString() + " "}
          </a>
        ) : null}
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
