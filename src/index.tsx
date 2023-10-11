//index.tsx
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./theme"; // Import your Material-UI theme
import { UserProvider } from "./context/UserContext";
import { MenuProvider } from "./context/MenuContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Router>
          <UserProvider>
            <MenuProvider>
              <App />
            </MenuProvider>
          </UserProvider>
        </Router>
      </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
