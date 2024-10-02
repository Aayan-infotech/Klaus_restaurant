import React from "react";
import { Box } from "@mui/material";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [navOpen, setNavOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    // setOpen(true);
    setNavOpen(true)
  };

  const handleDrawerClose = () => {
    // setOpen(false);
    setNavOpen(false)
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar navOpen={navOpen} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar navOpen={navOpen} handleDrawerClose={handleDrawerClose} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#272437",
          height: "100vh",
          color: "white",
        }}
      >
        <div style={{ marginTop: 50 }}></div>
        <Outlet />
      </Box>
    </Box>
  );
};
