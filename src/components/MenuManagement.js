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
  Paper, CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const MenuManagement = () => {
  const [allMenus, setAllMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // const handleViewDetails = (menu_id) => {
  //   navigate("/home/all-categories", { state: { menu_id } });
  // };
  const handleViewDetails = (menu_id) => {
    navigate(`/home/all-categories/${menu_id}`);
  };


  useEffect(() => {
    fetchAllMenus();
  }, []);

  const fetchAllMenus = async () => {
    try {
      const response = await axios.get(
        "https://viamenu.oa.r.appspot.com/viamenu/clients/client001/menus/all"
      );
      if (response?.data?.data?.length > 0) {
        setAllMenus(response?.data?.data);
      } else {
        setErrorMessage(response?.data?.message || 'No managers available');
      }
    } catch (error) {
      setErrorMessage(error, "Failed to load menus.");
      console.log(error, "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>
        Menu Management
      </Typography>
      <Box sx={{
        overflowY: 'auto',
        maxHeight: '450px',
        scrollbarWidth: 'none',
      }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              minHeight: "300px",
            }}
          >
            <CircularProgress sx={{ color: "#96FF7C" }} />
            <Typography variant="h6" sx={{ color: "white", marginLeft: 2 }}>
              Loading...
            </Typography>
          </Box>
        ) : errorMessage ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              minHeight: "300px",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }}>
              {errorMessage}
            </Typography>
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ marginTop: "20px", backgroundColor: "#1f1d2b" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: "start", color: "white" }}>
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
                    <TableCell sx={{ textAlign: "start", color: "white" }}>
                      {menu?.menuId}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>{menu?.menuName || 'N/A'}</TableCell>
                    <TableCell sx={{ color: "white" }}>{menu?.comment || 'N/A'}</TableCell>
                    <TableCell sx={{ color: "white" }}>{menu?.createdAt || 'N/A'}</TableCell>
                    <TableCell sx={{ color: "white" }}>{menu?.createdBy || 'N/A'}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleViewDetails(menu?.menuId)}
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
        )}
      </Box>
    </Box>
  );
};
