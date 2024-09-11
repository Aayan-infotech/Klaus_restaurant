import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const MenuManagement = () => {
  const [allMenus, setAllMenus] = useState([]);
  const navigate = useNavigate();
  const handleViewDetails = (manager) => {
    navigate("/home/all-categories", { state: { manager } });
  };

  useEffect(() => {
    fetchAllMenus();
  }, []);

  const fetchAllMenus = async () => {
    try {
      const response = await axios.get(
        "https://viamenu.oa.r.appspot.com/viamenu/clients/client001/menus/all"
      );
      console.log(response.data, "response");
      setAllMenus(response?.data);
    } catch (error) {
      console.log(error, "Something went wrong");
    }
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>
        Menu Management
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "20px", backgroundColor: "#1f1d2b" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="start" sx={{ color: "white" }}>
                SI No
              </TableCell>
              <TableCell sx={{ color: "white" }}>Menu Name</TableCell>
              <TableCell sx={{ color: "white" }}>Abbreviation</TableCell>
              <TableCell sx={{ color: "white" }}>View</TableCell>
              <TableCell sx={{ color: "white" }}>Created At</TableCell>
              <TableCell sx={{ color: "white" }}>Created By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#272437" }}>
            {allMenus?.map((menu, index) => (
              <TableRow key={index}>
                <TableCell align="start" sx={{ color: "white" }}>
                  {menu?.menuId}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{menu?.menuName || 'N/A'}</TableCell>
                <TableCell sx={{ color: "white" }}>{menu?.comment || 'N/A'}</TableCell>
                <TableCell sx={{ color: "white" }}>{menu?.createdAt || 'N/A'}</TableCell>
                <TableCell sx={{ color: "white" }}>{menu?.createdBy || 'N/A'}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleViewDetails(menu)}
                    sx={{
                      borderColor: "#96FF7C",
                      color: "#96FF7C",
                      textTransform: "none",
                    }}
                  >
                    See
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
