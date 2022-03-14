import React from "react";
import TweetBody from "./TweetBody";
import TweetMetrics from "./TweetMetrics";
import UserInfo from "./UserInfo";

const RecentTweet = ({ tweet, user }) => {
  return (
    <a
      href={`/thread/${tweet.id}`}
      className="border w-64 flex flex-col h-full content-between gap-2 px-2 pt-2 rounded dark:bg-slate-900 bg-white hover:dark:bg-slate-800 hover:bg-slate-200 border-black dark:border-white"
    >
      <UserInfo user={user} />
      <TweetBody tweet={tweet} />
      <div className="text-xs">
        <TweetMetrics metrics={tweet.public_metrics} />
      </div>
    </a>
  );
};

export default RecentTweet;
