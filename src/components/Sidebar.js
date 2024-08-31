// src/components/Sidebar.js
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link, useLocation } from "react-router-dom";
import { Typography, ListItemIcon, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AllergenIcon from "@mui/icons-material/Warning";
import LogoutIcon from "@mui/icons-material/Logout";
import { Logout } from "./Logout";

const drawerWidth = 300;

export const Sidebar = ({ drawerOpen, setDrawerOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutClose = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <>
      <Drawer
        variant="persistent"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1f1d2b",
            color: "white",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "start", padding: "20px" }}>
          <Link to="/" style={{ textDecoration: 'none', color: "white" }}>
            <Typography variant="h4" fontWeight='bold' component="div" color="#90BE6D">
              Klaus
            </Typography>
          </Link>
        </Box>
        <List>
          {[
            {
              text: "Dashboard",
              path: "/my-Dashboard",
              icon: <DashboardIcon sx={{ color: "#90BE6D" }} />,
            },
            {
              text: "Manager Management",
              path: "/manager-management",
              icon: <PeopleIcon sx={{ color: "#90BE6D" }} />,
            },
            {
              text: "Menu Management",
              path: "/menu-management",
              icon: <RestaurantMenuIcon sx={{ color: "#90BE6D" }} />,
            },
            {
              text: "Allergens Management",
              path: "/allergens-management",
              icon: <AllergenIcon sx={{ color: "#90BE6D" }} />,
            },
            {
              text: "Logout",
              icon: <LogoutIcon sx={{ color: "#90BE6D" }} />,
              action: handleLogoutClick,
            },
          ].map((item, index) => (
            <ListItem
              button
              key={item.text}
              component={item.path ? Link : 'div'}
              to={item.path}
              onClick={item.action}
              sx={{
                backgroundColor: currentPath === item.path ? 'rgba(144, 190, 109, 0.26)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(144, 190, 109, 0.26)',
                },
              }}
            >
              <ListItemIcon sx={{ color: "#90BE6D" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  sx: {
                    color: currentPath === item.path ? "#90BE6D" : "white",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Logout open={logoutDialogOpen} handleClose={handleLogoutClose} />
    </>
  );
};
