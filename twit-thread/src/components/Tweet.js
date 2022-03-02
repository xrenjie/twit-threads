import React, { useMemo } from "react";
import UserInfo from "./UserInfo";
import TweetBody from "./TweetBody";

const Tweet = ({ tweets, tweet, user, users }) => {
  const thisTweet = useMemo(() => {
    return tweet;
  }, [tweet]);

  const memoTweets = useMemo(() => tweets, [tweets]);

  const memoUser = useMemo(() => user, [user]);
  const memoUsers = useMemo(() => users, [users]);

  return (
    <div
      className={`px-2 pt-2 mt-2 rounded ml-2 border-l-2 border-t-2 ${
        thisTweet.root ? "border-l-[3] border-gray-400" : ""
      }`}
    >
      <UserInfo user={memoUser} tweet={thisTweet} />
      <TweetBody tweet={thisTweet} />
      <div className="text-xs">
        {memoUser ? (
          <a
            href={`https://www.twitter.com/${memoUser.username}/status/${thisTweet.id}`}
            target="_blank"
            rel="noreferrer"
            title="View tweet on Twitter"
          >
            {new Date(thisTweet.created_at).toLocaleString() + " "}
          </a>
        ) : null}
      </div>
      {memoTweets[thisTweet.id]
        ? memoTweets[thisTweet.id].map((reply) => {
            return (
              <Tweet
                tweets={memoTweets}
                tweet={reply}
                user={memoUsers[reply.author_id]}
                users={memoUsers}
                key={reply.id}
              />
            );
          })
        : null}
    </div>
  );
};

export default React.memo(Tweet);
