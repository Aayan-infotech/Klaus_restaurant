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
  CircularProgress,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Navbar } from "./Navbar";

export const MenuManagement = () => {
  const [allMenus, setAllMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const storedClientId = localStorage.getItem("clientId");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleViewDetails = (menu_id) => {
    navigate(`/home/all-categories/${menu_id}`);
  };

  const fetchAllMenus = async () => {
    try {
      const response = await axios.get(
        `https://viamenu.oa.r.appspot.com/viamenu/clients/${storedClientId}/menus/all`
      );
      if (response?.data?.data?.length > 0) {
        setAllMenus(response?.data?.data);
        setFilteredMenus(response?.data?.data);
      } else {
        setErrorMessage(response?.data?.message || "No managers available");
      }
    } catch (error) {
      setErrorMessage(error, "Failed to load menus.");
      console.log(error, "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMenus();
  }, []);

  // Step : Filter menu based on search query
  const handleSearch = (searchTerm) => {
    const filtered = allMenus.filter((menu) => {
      const menuName = menu?.menuName?.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      return menuName.includes(searchLower);
    });
    setFilteredMenus(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedAllergens = filteredMenus.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Navbar
        open={open}
        handleDrawerOpen={() => setOpen(true)}
        handleSearch={handleSearch}
        showSearch={true}
      />
      <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>
        Menu Management
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", 
          height: "100%",
        }}
      >
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
        ) : (
          <>
            <Box
              sx={{
                overflowY: "auto",
                maxHeight: "450px", 
                scrollbarWidth: "none",
              }}
            >
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
                      <TableCell sx={{ color: "white" }}>Description</TableCell>
                      <TableCell sx={{ color: "white" }}>View</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ backgroundColor: "#272437" }}>
                    {displayedAllergens?.length > 0 ? (
                      displayedAllergens?.map((menu, index) => (
                        <TableRow key={index}>
                          <TableCell
                            sx={{ textAlign: "start", color: "white" }}
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell sx={{ color: "white" }}>
                            {menu?.menuName || "N/A"}
                          </TableCell>
                          <TableCell sx={{ color: "white" }}>
                            {menu?.comment || "N/A"}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              onClick={() => handleViewDetails(menu?.menuId)}
                              sx={{
                                minWidth: "auto",
                                width: "40px",
                                height: "40px",
                                padding: 0,
                                borderRadius: "10px",
                                marginRight: 1,
                                borderColor: "#96FF7C",
                                color: "#96FF7C",
                                "&:hover": {
                                  borderColor: "#96FF7C",
                                  backgroundColor: "rgba(150, 255, 124, 0.1)",
                                },
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faEye}
                                style={{ color: "#96FF7C" }}
                              />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          sx={{ color: "white", textAlign: "center" }}
                        >
                          No menu found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Pagination Section Outside the Scrollable Area */}
            <TablePagination
              rowsPerPageOptions={[
                5, 10, 20, 30, 40, 50, 70, 100, 125, 150, 175, 200,
              ]}
              component="div"
              count={filteredMenus?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                backgroundColor: "#1f1d2b",
                color: "white",
                marginTop: "10px",
              }}
            />
          </>
        )}
      </Box>
    </Box>
  );
};
