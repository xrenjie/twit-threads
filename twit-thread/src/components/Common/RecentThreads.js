import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../config/api";
import RecentTweet from "./RecentTweet";

const RecentThreads = ({ numTweetsToShow }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    async function fetch() {
      const tweets = await axios.get(`${apiUrl}/tweets/latest`);
      setTweets(tweets.data);
      console.log(tweets);
    }
    fetch();
  }, []);

  return (
    <div className="dark:text-white text-left flex flex-col gap-10 mb-20">
      <h1 className="text-xl"> Recent Conversations</h1>

      <div className="flex gap-10 flex-wrap">
        {tweets.length > 0
          ? tweets.map((tweet) => {
              return (
                <RecentTweet
                  tweet={tweet.root_tweet}
                  user={tweet.root_user}
                  key={tweet.root_tweet.id}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default RecentThreads;
