import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
// import { Search } from "./Search";

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "navOpen",
})(({ theme, navOpen }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(navOpen && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const formatBreadcrumb = (segment) => {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const Navbar = ({ navOpen, handleDrawerOpen, handleSearch, showSearch }) => {

  const location = useLocation();
  const currentPath = location.pathname;

  const pathSegments = currentPath.split("/").filter(Boolean);
  const breadcrumb = pathSegments.map(formatBreadcrumb).join(" > ");

  return (
    <AppBar
      position="fixed"
      navOpen={navOpen}
      elevation={0}
      sx={{
        backgroundColor: "#272437",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              marginRight: 5,
            },
            navOpen && { display: "none" },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          color="#90BE6D"
          fontWeight="bold"
          sx={{ flexGrow: 1 }}
        >
          {breadcrumb}
        </Typography>
        {/* <Box
          sx={{
            backgroundColor: "#373642",
            borderRadius: 1,
            padding: "5px 10px",
            display:"flex", alignItems:"center"
          }}
        >
          <SearchIcon sx={{marginRight:"5px"}}/>
          <TextField
            placeholder="Search for food, coffee, etc..."
            variant="standard"
            InputProps={{
              disableUnderline: true,
              style: { color: "white" },
            }}
          />
        </Box> */}
        {/* {showSearch && <Search handleSearch={handleSearch} />} */}
      </Toolbar>
    </AppBar>
  );
};
