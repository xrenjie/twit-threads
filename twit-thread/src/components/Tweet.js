import React, { useMemo } from "react";
import UserInfo from "./UserInfo";
import TweetBody from "./TweetBody";
import TweetMetrics from "./TweetMetrics";

const Tweet = ({ tweets, tweet, user, users, rootTweet, bgBool }) => {
  const memoUser = useMemo(() => user, [user]);
  const memoUsers = useMemo(() => users, [users]);

  return (
    <div
      className={`px-2 pt-2 rounded ml-1  border-l-2 border-t-2 w-full border-opacity-5 border-gray-500 dark:text-gray-100 ${
        tweet.id === rootTweet.id ? "border-2 " : ""
      } ${
        bgBool
          ? "bg-gray-200 dark:bg-slate-800"
          : "bg-gray-100 dark:bg-slate-900"
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
                bgBool={!bgBool}
              />
            );
          })
        : null}
    </div>
  );
};

export default Tweet;
