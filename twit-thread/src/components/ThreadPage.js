import React, { useEffect, useState } from "react";
import { apiUrl, config } from "../config/api";
import axios from "axios";
import { TweetObject } from "../types/TweetObject";
import Thread from "./Thread";
import Loading from "./Loading";

//load main tweet and replies
//save next pointer for pagination
//save userids in set
//fetch usernames from set

//on load more, fetch next page of tweets and add user
//to newUserIds if user not in users.current

const ThreadPage = () => {
  const [loading, setLoading] = useState(true);
  const [rootTweet, setRootTweet] = useState({});
  const [users, setUsers] = useState({});
  const [newUserIds, setNewUserIds] = useState(new Set());
  const [thread, setThread] = useState({});

  //gets user info for each user id in newUserIds
  const fetchNewUsers = async () => {
    Object.keys(thread).forEach((tweetId) => {
      thread[tweetId].forEach((reply) => {
        setNewUserIds((prev) => prev.add(reply.author_id));
      });
    });

    function fetchUsers(userIds) {
      axios
        .get(`${apiUrl}/users/multi?ids=${[...userIds].join(",")}`)
        .then((result) => {
          result.data.data.forEach((user) => {
            setUsers((prev) => ({ ...prev, [user.id]: user }));
          });
        });
    }

    //chunk requests for twitter api limits
    if (newUserIds.size > 80) {
      const newUserIdsArray = [...newUserIds];
      const newUserIdsChunks = [];
      while (newUserIdsArray.length > 0) {
        newUserIdsChunks.push(newUserIdsArray.splice(0, 80));
      }
      newUserIdsChunks.forEach((userIds) => {
        fetchUsers(userIds);
      });
    } else {
      fetchUsers(newUserIds);
    }
  };

  //on initial render, fetch root tweet info and
  //all replies as a "tree" (dictionary where keys are tweet ids and values are lists of replies)
  useEffect(() => {
    setRootTweet("");
    async function fetchData() {
      //get root tweet
      const tweetId = window.location.pathname.split("/")[2];
      const params = {
        query: `conversation_id:${tweetId}`,
        "tweet.fields": `conversation_id,created_at,entities,id,source,text,author_id`,
      };
      const rootTweet = await axios.get(
        `${apiUrl}/tweets/${tweetId}`,
        params,
        config
      );

      let tweet = new TweetObject(
        rootTweet.data.id,
        rootTweet.data.conversation_id,
        rootTweet.data.text,
        rootTweet.data.created_at,
        rootTweet.data.author_id,
        true //main tweet
      );

      setRootTweet(tweet);

      //add root tweet user id to set of user ids
      setNewUserIds((prev) => prev.add(rootTweet.data.author_id));

      //get full thread as dict {tweetId: [replies]}
      const conversation = await axios.get(
        `${apiUrl}/tweets/replies/${rootTweet.data.id}`
      );

      Object.keys(conversation.data).forEach((tweetId) => {
        conversation.data[tweetId].sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
      });

      setThread(conversation.data);
      //load usernames for each user id
      // await fetchNewUsers();
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(users).length === 0 || newUserIds.size === 1) {
      setTimeout(() => {
        fetchNewUsers();
      }, 3000);
    }
  }, [thread]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Thread tweets={thread} rootTweet={rootTweet} users={users} />
      )}
    </div>
  );
};

export default ThreadPage;
