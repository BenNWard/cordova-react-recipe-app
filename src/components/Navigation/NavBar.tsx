// src/components/Navigation/NavBar.tsx

import React from "react";
import { NavLink } from 'react-router-dom';

import { Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';

import ScrollToHide from "../ScrollToHide";
import { useMenu } from '../../context/MenuContext';
import { useAuth } from '../../context/UserContext';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'hide',
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    ...(!open && {
      marginLeft: 0,
      width: `100%`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const Navbar = () => {
  const { isMenuOpen, toggleMenu } = useMenu();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
      <AppBar position="fixed" open={isMenuOpen}>
        <Toolbar>
          <div style={{ visibility: isMenuOpen ? 'hidden' : 'visible' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Typography variant="h6" noWrap>
            Recipe Sharing App
          </Typography>
          <Box flexGrow={1} />
          {!user ? (
            <>
              <Button color="inherit" component={NavLink} to="/login" className="login-link">
                Login
              </Button>
              <Button color="inherit" component={NavLink} to="/register">
                Register
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;