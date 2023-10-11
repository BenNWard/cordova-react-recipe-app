import React, { useState } from "react";
import { Zoom, useScrollTrigger, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const style: React.CSSProperties = {
  position: "fixed",
  bottom: "25px",
  right: "10px", // Adjust the right position as needed
  zIndex: 1990,
};

const ScrollToTop: React.FC = () => {
  const [isVisible] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 64, // Adjust the threshold as needed
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

    return (
      <Zoom in={trigger || isVisible}>
        <div onClick={handleClick} role="presentation" style={style}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </div>
      </Zoom>
    );
};

export default ScrollToTop;
