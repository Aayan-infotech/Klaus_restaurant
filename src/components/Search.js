import { Box, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export const Search = ({ handleSearch }) => { 
  const handleInputChange = (event) => {
    handleSearch(event.target.value); 
  };

  return (
    <Box
      sx={{
        backgroundColor: "#373642",
        borderRadius: 1,
        padding: "2px 10px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <SearchIcon sx={{ marginRight: "5px" }} />
      <TextField
        placeholder="Search"
        variant="standard"
        InputProps={{
          disableUnderline: true,
          style: { color: "white" },
        }}
        onChange={handleInputChange} 
      />
    </Box>
  );
};
