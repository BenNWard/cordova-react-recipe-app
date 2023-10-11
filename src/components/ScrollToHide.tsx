// src/components/ScrollToHide.tsx

import React, { useState } from "react";
import { Slide } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";

interface ScrollToHideProps {
  threshold?: number;
  children: React.ReactElement;
}

const useScrollToHide = (threshold = 100, windowFn?: () => Window) => {
  const [hideContent, setHideContent] = useState(false);
  const lastScrollY = React.useRef<number>(0);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: threshold,
  });

  // Check if the user is scrolling up
  const onScroll = () => {
    const currentPosition = window.scrollY;
    const scrollingUp = currentPosition < lastScrollY.current;

    if (scrollingUp && !hideContent) {
      setHideContent(true);
    } else if (!scrollingUp && hideContent) {
      setHideContent(false);
    }

    lastScrollY.current = currentPosition;
  };

  // Add a scroll event listener to toggle content visibility
  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hideContent]);

  return { trigger, hideContent };
};

const ScrollToHide: React.FC<ScrollToHideProps> = ({ threshold, children }) => {
  const { trigger, hideContent } = useScrollToHide(threshold);

  return (
    <Slide appear={false} direction="down" in={!trigger || hideContent}>
      {children}
    </Slide>
  );
};

export default ScrollToHide;
