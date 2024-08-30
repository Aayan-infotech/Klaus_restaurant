import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
export const Navbar = ({ drawerOpen, setDrawerOpen }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "#272437",
          transition: "margin-left 0.3s ease",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: `calc(100% - ${drawerOpen ? 300 : 0}px)`,
          ml: drawerOpen ? "300px" : "0px",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerOpen(!drawerOpen)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" color="#90BE6D" fontWeight="bold" sx={{ flexGrow: 1 }}>
            Pages/Dashboard
          </Typography>
          <SearchIcon />
          <TextField
            placeholder="Search for food, coffee, etc..."
            variant="standard"
            InputProps={{
              disableUnderline: true,
              style: { color: "white" },
            }}
            sx={{
              backgroundColor: "#2d2c3c",
              borderRadius: 1,
              padding: "0 8px",
            }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
