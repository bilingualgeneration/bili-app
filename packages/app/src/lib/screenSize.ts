import { useEffect, useState } from "react";

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
};

export const useScreenSize = () => {
  // current width
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  // update on resize
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    // clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getScreenType = () => {
    if (screenSize <= BREAKPOINTS.mobile) {
      return "mobile";
    } else if (screenSize <= BREAKPOINTS.tablet) {
      return "tablet";
    } else {
      return "desktop";
    }
  };

  return {
    screenSize,
    screenType: getScreenType(),
  };
};
