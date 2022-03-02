import React from "react";
import { ReactComponent as LikeIcon } from "../assets/heart.svg";

const TweetMetrics = ({ metrics }) => {
  return (
    <div className="flex flex-row gap-4 items-center content-center mt-1">
      <span className="flex flex-row gap-2">
        <LikeIcon className="w-4 h-4 relative" />
        {metrics.like_count}
      </span>
      <span>
        {" "}
        {metrics.reply_count > 1 ? `${metrics.reply_count} replies` : null}
      </span>
    </div>
  );
};

export default TweetMetrics;
