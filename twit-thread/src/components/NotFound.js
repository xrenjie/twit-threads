import React from "react";

const NotFound = () => {
  return (
    <>
      <div className="text-xl">Page not found</div>
      <a
        href="/"
        className="text-4xl text-blue-600 underline hover:text-blue-800"
      >
        Go back home
      </a>
    </>
  );
};

export default NotFound;
