import React, { useEffect, useState } from "react";
import { apiUrl } from "../config/api";
import axios from "axios";
import Thread from "./Thread";
import Loading from "./Loading";
import SortMenu from "./SortMenu";
import ReactGA from "react-ga";

const ThreadPage = () => {
  const [loading, setLoading] = useState(true);
  const [rootTweet, setRootTweet] = useState({});
  const [users, setUsers] = useState({});
  const [newUserIds, setNewUserIds] = useState(new Set());
  const [thread, setThread] = useState({});
  const [firstLoad, setFirstLoad] = useState(true);
  const [forceRender, setForceRender] = useState(false);

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
    ReactGA.pageview(window.location.pathname);

    setRootTweet("");
    async function fetchData() {
      //get root tweet
      const tweetId = window.location.pathname.split("/")[2];

      const rootTweet = await axios.get(`${apiUrl}/tweets/${tweetId}`);

      setRootTweet(rootTweet.data);

      //add root tweet user id to set of user ids
      setNewUserIds((prev) => prev.add(rootTweet.data.author_id));

      //get full thread as dict {tweetId: [replies]}
      const conversation = await axios.get(
        `${apiUrl}/tweets/replies/${rootTweet.data.id}`
      );

      //sort replies by interaction count
      Object.keys(conversation.data).forEach((tweetId) => {
        conversation.data[tweetId].sort((a, b) => {
          let aVal =
            a.public_metrics.reply_count +
            a.public_metrics.retweet_count +
            a.public_metrics.quote_count +
            a.public_metrics.like_count;
          let bVal =
            b.public_metrics.reply_count +
            b.public_metrics.retweet_count +
            b.public_metrics.quote_count +
            b.public_metrics.like_count;
          return bVal - aVal;
        });
      });

      setThread(conversation.data);
      setFirstLoad(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (newUserIds.size === 1) {
      async function fetch() {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        fetchNewUsers();
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLoading(false);
      }
      fetch();
    }
  }, [firstLoad]);

  function sortReplies(sortBy) {
    let toSort = thread;
    switch (sortBy) {
      case "total":
        Object.keys(toSort).forEach((tweetId) => {
          toSort[tweetId].sort((a, b) => {
            let aVal =
              a.public_metrics.reply_count +
              a.public_metrics.retweet_count +
              a.public_metrics.quote_count +
              a.public_metrics.like_count;
            let bVal =
              b.public_metrics.reply_count +
              b.public_metrics.retweet_count +
              b.public_metrics.quote_count +
              b.public_metrics.like_count;
            return bVal - aVal;
          });
        });
        break;
      case "replies":
        Object.keys(toSort).forEach((tweetId) => {
          toSort[tweetId].sort((a, b) => {
            let aVal = a.public_metrics.reply_count;
            let bVal = b.public_metrics.reply_count;
            return bVal - aVal;
          });
        });
        break;
      case "likes":
        Object.keys(toSort).forEach((tweetId) => {
          toSort[tweetId].sort((a, b) => {
            let aVal = a.public_metrics.like_count;
            let bVal = b.public_metrics.like_count;
            return bVal - aVal;
          });
        });
        break;
      case "latest":
        Object.keys(toSort).forEach((tweetId) => {
          toSort[tweetId].sort((a, b) => {
            let aVal = new Date(a.created_at);
            let bVal = new Date(b.created_at);
            return bVal - aVal;
          });
        });
        break;
      case "earliest":
        Object.keys(toSort).forEach((tweetId) => {
          toSort[tweetId].sort((a, b) => {
            let aVal = new Date(a.created_at);
            let bVal = new Date(b.created_at);
            return aVal - bVal;
          });
        });
        break;
      default:
        Object.keys(toSort).forEach((tweetId) => {
          toSort[tweetId].sort((a, b) => {
            let aVal =
              a.public_metrics.reply_count +
              a.public_metrics.retweet_count +
              a.public_metrics.quote_count +
              a.public_metrics.like_count;
            let bVal =
              b.public_metrics.reply_count +
              b.public_metrics.retweet_count +
              b.public_metrics.quote_count +
              b.public_metrics.like_count;
            return bVal - aVal;
          });
        });
    }
    setThread(toSort);

    setForceRender((prev) => !prev);
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col lg:mx-[20vw] mx-[4vw] mt-10 mb-10">
          <SortMenu sortReplies={sortReplies} />
          <Thread tweets={thread} rootTweet={rootTweet} users={users} />
        </div>
      )}
    </div>
  );
};

export default ThreadPage;
