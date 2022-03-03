import React, { useMemo } from "react";
import UserInfo from "./UserInfo";
import TweetBody from "./TweetBody";
import TweetMetrics from "./TweetMetrics";

const Tweet = ({ tweets, tweet, user, users, rootTweet }) => {
  const memoUser = useMemo(() => user, [user]);
  const memoUsers = useMemo(() => users, [users]);

  return (
    <div
      className={`px-2 pt-2 rounded ml-1 mb-2 pb-2 border-l-2 border-t-2 w-full bg-gray-500 bg-opacity-5 border-opacity-5 border-gray-500 dark:text-gray-100 ${
        tweet.id === rootTweet.id ? "border-2 dark:text-gray-100" : ""
      }`}
    >
      <UserInfo user={memoUser} tweet={tweet} />
      <TweetBody tweet={tweet} />

      <div className="text-xs w-fit">
        {memoUser ? (
          <a
            href={`https://www.twitter.com/${memoUser.username}/status/${tweet.id}`}
            target="_blank"
            rel="noreferrer"
            title="View tweet on Twitter"
          >
            {new Date(tweet.created_at).toLocaleString() + " "}
            <TweetMetrics metrics={tweet.public_metrics} />
          </a>
        ) : null}
      </div>

      {tweets[tweet.id]
        ? tweets[tweet.id].map((reply) => {
            return (
              <Tweet
                tweets={tweets}
                tweet={reply}
                user={memoUsers[reply.author_id]}
                users={memoUsers}
                key={reply.id}
                rootTweet={rootTweet}
              />
            );
          })
        : null}
    </div>
  );
};

export default Tweet;
