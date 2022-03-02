import React from "react";

const UserInfo = ({ user, tweet }) => {
  return (
    <div className="flex flex-col text-sm">
      <span className="font-semibold">
        {user ? user.name : tweet.author_id}
      </span>
      <span className="text-xs">{user ? `@${user.username}` : ""}</span>
    </div>
  );
};

export default UserInfo;
