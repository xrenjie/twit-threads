import React from "react";

const NotFound = () => {
  return (
    <div className="dark:bg-slate-900 h-full w-full pt-20 text-center">
      <h1 className="text-xl dark:text-slate-100">Page not found</h1>
      <a
        href="/"
        className="text-4xl text-blue-600 underline hover:text-blue-800 dark:text-blue-100"
      >
        Go home
      </a>
    </div>
  );
};

export default NotFound;
