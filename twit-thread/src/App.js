import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/HomePage/Home";
import DataPage from "./components/ThreadPage/DataPage";
import NotFound from "./components/Common/NotFound";
import ScrollUpButton from "./components/Common/ScrollUpButton";
import ReactGA from "react-ga";
import { ReactComponent as MoonIcon } from "./assets/moon.svg";

ReactGA.initialize(process.env.REACT_APP_G_TRACKING_ID);

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    if (localStorage.getItem("darkMode") === "false") {
      setDarkMode(false);
    }
  }, []);

  return (
    <div
      className={`${darkMode ? "dark" : ""} h-full w-full dark:bg-slate-900`}
    >
      <div className="absolute z-50 w-full justify-between flex flex-row gap-10 pl-[20vw] pr-[20vw] bg-black text-white text-2xl py-2 right-5">
        <a href="/" className="">
          TwitReader
        </a>
        <button>
          <MoonIcon
            className="w-8 h-8 fill-white hover:fill-gray-400"
            onClick={() => {
              setDarkMode((prev) => !prev);
              localStorage.setItem("darkMode", !darkMode);
            }}
          />
        </button>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thread/:id" element={<DataPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollUpButton />
    </div>
  );
}

export default App;
