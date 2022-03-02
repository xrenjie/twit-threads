/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { ReactComponent as VerifiedBadge } from "../assets/twitter-verified-badge.svg";

const UserInfo = ({ user, tweet }) => {
  return (
    <div className="flex flex-row">
      {user ? (
        user.profile_image_url ? (
          <a
            href={`https://www.twitter.com/${user.username}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={user.profile_image_url}
              className="w-10 h-10 rounded-full mr-2"
              alt="user profile image"
            />
          </a>
        ) : null
      ) : null}
      <div className="flex flex-col text-sm">
        <span className="font-semibold flex-row flex">
          {user ? (
            <a
              href={`https://www.twitter.com/${user.username}`}
              target="_blank"
              rel="noreferrer"
            >
              <span>{user.name}</span>
            </a>
          ) : (
            tweet.author_id
          )}
          {user ? (
            user.verified ? (
              <VerifiedBadge className="w-5 l-5" />
            ) : null
          ) : null}
        </span>
        <span className="text-xs">{user ? `@${user.username}` : ""}</span>
      </div>
    </div>
  );
};

export default React.memo(UserInfo);
