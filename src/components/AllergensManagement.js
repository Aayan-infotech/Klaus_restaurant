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
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AddAllergens } from "./AddAllergens";
import axios from "axios";
import { Navbar } from "./Navbar";

export const AllergensManagement = () => {
  const [allAllergens, setAllAllergens] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedAllergen, setSelectedAllergen] = useState(null);
  const [openAddAllergensDialog, setOpenAddAllergensDialog] = useState(false);
  const [editingAllergen, setEditingAllergen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [filteredAllergens, setFilteredAllergens] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const storedClientId = localStorage.getItem("clientId");

  const handleClickOpen = (allergen) => {
    setSelectedAllergen(allergen);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAllergen(null);
  };

  const handleAddAllergen = (allergen) => {
    setOpenAddAllergensDialog(false);
    fetchAllAllergens();
    setEditingAllergen(null);
  };

  useEffect(() => {
    fetchAllAllergens();
  }, []);

  const fetchAllAllergens = async () => {
    try {
      const response = await axios.get(
        `https://viamenu.oa.r.appspot.com/viamenu/clients/${storedClientId}/allergens/all`
      );
      if (response?.data?.data?.length > 0) {
        setAllAllergens(response?.data?.data);
        setFilteredAllergens(response?.data?.data);
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

  // Step : Filter menu based on search query
  const handleSearch = (searchTerm) => {
    const filtered = allAllergens.filter((allergens) => {
      const allergenName = allergens?.allergenName?.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      return allergenName.includes(searchLower);
    });
    setFilteredAllergens(filtered);
  };

  const handleDeleteAllergen = async () => {
    if (!selectedAllergen) return;
    setDeleteLoading(true);
    try {
      await axios.delete(
        `https://viamenu.oa.r.appspot.com/viamenu/clients/${storedClientId}/allergens/${selectedAllergen.allergenId}`
      );
      setAllAllergens(
        allAllergens.filter((a) => a.allergenId !== selectedAllergen.allergenId)
      );
      handleClose();
    } catch (error) {
      console.error("Failed to delete allergen:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedAllergens = filteredAllergens.slice(
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>
          Allergens Management
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            setEditingAllergen(null);
            setOpenAddAllergensDialog(true);
          }}
          sx={{
            color: "#567241",
            fontWeight: "bold",
            borderColor: "#567241",
            textTransform: "none",
          }}
        >
          Add Allergens
        </Button>
      </Box>

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
          <>
            {/* Scrollable Table Section */}
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
                      <TableCell align="center" sx={{ color: "white" }}>
                        SI No
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        Allergen Name
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        Abbreviation
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>Status</TableCell>
                      <TableCell sx={{ color: "white" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ backgroundColor: "#272437" }}>
                    {displayedAllergens.length > 0 ? (
                      displayedAllergens?.map((allergen, index) => (
                        <TableRow key={index}>
                          <TableCell align="center" sx={{ color: "white" }}>
                            {index + 1}
                          </TableCell>
                          <TableCell sx={{ color: "white" }}>
                            {allergen?.allergenName || "N/A"}
                          </TableCell>
                          <TableCell sx={{ color: "white" }}>
                            {allergen?.abbreviation
                              ? allergen.abbreviation.length > 10
                                ? `${allergen.abbreviation.slice(0, 50)}...`
                                : allergen.abbreviation
                              : "N/A"}
                          </TableCell>
                          <TableCell sx={{ color: "white" }}>
                            <Switch
                              checked={allergen?.status || false}
                              sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": {
                                  color: "#90BE6D",
                                },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                  {
                                    backgroundColor: "#90BE6D",
                                  },
                              }}
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              variant="outlined"
                              sx={{
                                minWidth: "auto",
                                width: "40px",
                                height: "40px",
                                padding: 0,
                                borderRadius: "10px",
                                marginRight: 1,
                                borderColor: "#7CEFFF",
                                color: "#7CEFFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover": {
                                  borderColor: "#7CEFFF",
                                  backgroundColor: "rgba(150, 255, 124, 0.1)",
                                },
                              }}
                              onClick={() => {
                                setEditingAllergen(allergen);
                                setOpenAddAllergensDialog(true);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                style={{ color: "#7CEFFF" }}
                              />
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => handleClickOpen(allergen)}
                              sx={{
                                minWidth: "auto",
                                width: "40px",
                                height: "40px",
                                padding: 0,
                                borderRadius: "10px",
                                borderColor: "#FF7CA3",
                                color: "#FF7CA3",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover": {
                                  borderColor: "#FF7CA3",
                                  backgroundColor: "rgba(150, 255, 124, 0.1)",
                                },
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{ color: "#FF7CA3" }}
                              />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          sx={{ textAlign: "center", color: "white" }}
                        >
                          No allergens found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Pagination Section */}
            <TablePagination
              rowsPerPageOptions={[
                5, 10, 20, 30, 40, 50, 70, 100, 125, 150, 175, 200,
              ]}
              component="div"
              count={filteredAllergens.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ backgroundColor: "#1f1d2b", color: "white" }}
            />
          </>
        )}
      </Box>

      {/* //delete */}
      <Dialog
        onClose={handleClose}
        open={open}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#1f1d2b",
            width: "300px",
            height: "300px",
            padding: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #90BE6D",
            borderRadius: "20px",
          },
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DialogTitle
            variant="h4"
            sx={{
              color: "white",
              textAlign: "center",
              padding: "0",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Delete?
          </DialogTitle>
          <DialogContentText
            sx={{
              color: "white",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            Are you sure?
          </DialogContentText>
          <DialogActions
            sx={{
              justifyContent: "center",
              width: "100%",
              padding: "0",
            }}
          >
            <Button
              onClick={handleDeleteAllergen}
              sx={{
                backgroundColor: "#FF7CA3",
                color: "white",
                "&:hover": { backgroundColor: "#FF5A70" },
                marginRight: "8px",
              }}
            >
              Yes
            </Button>
            <Button
              onClick={handleClose}
              sx={{
                backgroundColor: "#90BE6D",
                color: "white",
                "&:hover": { backgroundColor: "#74a85e" },
              }}
            >
              No
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* Add Allergen Dialog */}
      <Dialog
        onClose={() => setOpenAddAllergensDialog(false)}
        open={openAddAllergensDialog}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#1f1d2b",
            color: "white",
            width: "800px",
            padding: "20px",
            border: "2px solid #90BE6D",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "16px",
          }}
        >
          {editingAllergen ? "Edit Allergen" : "Add Allergen"}
        </DialogTitle>
        <AddAllergens
          allergen={editingAllergen}
          onSave={handleAddAllergen}
          storedClientId={storedClientId}
          onCancel={() => setOpenAddAllergensDialog(false)}
          onClose={() => setOpenAddAllergensDialog(false)}
        />
      </Dialog>
    </Box>
  );
};
