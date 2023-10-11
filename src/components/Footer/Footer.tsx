import React from "react";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();

  const footerStyle: React.CSSProperties = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
    textAlign: "center" as "center",
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: 1200, // Increase the z-index value
  };

  return (
    <footer style={footerStyle}>
      &copy; {new Date().getFullYear()} Your App Name. All rights reserved.
    </footer>
  );
};

export default Footer;
