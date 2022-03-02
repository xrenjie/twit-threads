import React, { useState } from "react";
import { ReactComponent as ArrowUp } from "../assets/arrow-circle-up.svg";

const ScrollUpButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <button className="fixed bottom-10 right-10 ">
      <ArrowUp
        onClick={scrollToTop}
        className={`${visible ? "" : "hidden"} w-16 h-16  `}
      />
    </button>
  );
};

export default ScrollUpButton;
