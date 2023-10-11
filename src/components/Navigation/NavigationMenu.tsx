// src/components/NavigationMenu.tsx
import React from "react";
import {
  List,
  ListItemButton,
  IconButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RecipeBookIcon from "@mui/icons-material/MenuBook";
import CreateIcon from "@mui/icons-material/Create";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./NavigationMenu.css";
import { useMenu } from "../../context/MenuContext";

interface NavigationMenuProps {
  isAuthenticated: boolean;
}

// Define an array of navigation items
const navigationItems = [
  { 
    to: "/",
     text: "Home",
     icon: <HomeIcon />,
     requiresAuth: false,
  },
  { 
    to: "/dashboard",
    text: "Dashboard",
    icon: <DashboardIcon />,
    requiresAuth: true,
  },
  { 
    to: "/recipes",
    text: "Recipes",
    icon: <RecipeBookIcon />,
    requiresAuth: true,
  },
  {
    to: "/create-recipe",
    text: "Create Recipe",
    icon: <CreateIcon />,
    requiresAuth: true,
  },
  {
    to: "/profile",
    text: "Profile",
    icon: <AccountCircleIcon />,
    requiresAuth: true,
  },
  // Add more items as needed
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(1, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing()} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(28)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isAuthenticated }) => {
  const { isMenuOpen, toggleMenu } = useMenu();
  const { user, logout } = useAuth();
  const theme = useTheme();

  const handleLogout = () => {
    logout();
  };

  const generateNavigationItems = (
    onClick: () => void,
    isAuthenticated: boolean
  ) => {
    return navigationItems.map((item) => {
      if (item.requiresAuth && !isAuthenticated) {
        // Skip rendering items that require authentication for unauthenticated users
        return null;
      }
  
      return (
        <ListItemButton
          key={item.to}
          component={NavLink}
          to={item.to}
          focusVisibleClassName="active"
          sx={{
            "&.active": {
              background: theme.palette.action.hover, // Customize active item background
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      );
    });
  };

  return (
    <Drawer variant="permanent" open={isMenuOpen} onClose={toggleMenu}>
      <DrawerHeader>
        <IconButton onClick={toggleMenu}>
          {isMenuOpen ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <List>
        {generateNavigationItems(toggleMenu, isAuthenticated)}
        {!isAuthenticated ? (
          <ListItemButton
            component={NavLink}
            to="/login"
            focusVisibleClassName="active"
            sx={{
              "&.active": {
                background: theme.palette.action.hover, // Customize active item background
              },
            }}
          >
            <ListItemIcon>
              <Login style={{ color: theme.palette.success.main }} />{" "}
              {/* Customize the icon color */}
            </ListItemIcon>
            <ListItemText
              primary="Login"
              style={{ color: theme.palette.success.main }}
            />{" "}
            {/* Customize the text color */}
          </ListItemButton>
        ) : (
          <ListItemButton
            component={NavLink}
            to={"/login"}
            onClick={handleLogout}
            sx={{
              "&.active": {
                background: theme.palette.action.hover, // Customize active item background
              },
            }}
          >
            <ListItemIcon>
              <Logout style={{ color: theme.palette.error.main }} />{" "}
              {/* Customize the icon color */}
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              style={{ color: theme.palette.error.main }}
            />{" "}
            {/* Customize the text color */}
          </ListItemButton>
        )}
      </List>
    </Drawer>
  );
};

export default NavigationMenu;