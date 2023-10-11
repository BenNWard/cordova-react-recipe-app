// App.tsx
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Toolbar, Container, Paper, useTheme } from "@mui/material";

import AppRouter from "./routes/AppRouter";
import NavigationMenu from "./components/Navigation/NavigationMenu";
import NavBar from "./components/Navigation/NavBar";
import { useAuth } from "./context/UserContext";

import "./App.css";
import ScrollToTop from "./components/Navigation/ScrollToTop";
import Footer from "./components/Footer/Footer"; // Import the Footer component
import ScrollToHide from "./components/ScrollToHide";


function App() {
  const { user } = useAuth();
  const theme = useTheme(); // Access the theme

  return (
    <React.Fragment>
      <div className="App">
        <CssBaseline />
        <Toolbar id="back-to-top-anchor" />
        <ScrollToHide threshold={64}>
          <div>
            <NavBar />
          </div>
        </ScrollToHide>
        <div style={{ display: "flex", flex: 1, height: '100%', overflowY: 'auto' }}>
          <NavigationMenu isAuthenticated={user !== null} />
          <Container style={{ height: '100%' }} sx={{ marginTop: 16, marginBottom: 32 }} >
            <Paper elevation={3} style={{ padding: theme.spacing(3), height: '100%'}}>
              <AppRouter />
              <ScrollToTop />
            </Paper>
          </Container>
        <Footer />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
