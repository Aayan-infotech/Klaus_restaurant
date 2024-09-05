import React, { useState } from "react";
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
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AddAllergens } from "./AddAllergens";

export const AllergensManagement = () => {
  const [allergens, setAllergens] = useState([
    { id: 1, name: "Peanuts", description: "Peanut allergy", status: true },
    { id: 2, name: "Shellfish", description: "Shellfish allergy", status: false },
    { id: 3, name: "Milk", description: "Dairy allergy", status: true },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedAllergen, setSelectedAllergen] = useState(null);
  const [openAddAllergensDialog, setOpenAddAllergensDialog] = useState(false);
  const [editingAllergen, setEditingAllergen] = useState(null);

  const handleStatusChange = (id) => {
    setAllergens(
      allergens.map((allergen) =>
        allergen?.id === id
          ? { ...allergen, status: !allergen?.status }
          : allergen
      )
    );
  };

  const handleClickOpen = (allergen) => {
    setSelectedAllergen(allergen);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAllergen(null);
  };

  const handleDelete = () => {
    if (selectedAllergen) {
      setAllergens(allergens.filter((allergen) => allergen?.id !== selectedAllergen?.id));
      handleClose();
    } else {
      console.error("No allergen selected for deletion.");
    }
  };

  const handleAddAllergen = (allergen) => {
    if (allergen.id) {
      // Update existing allergen
      setAllergens(
        allergens.map((existingAllergen) =>
          existingAllergen?.id === allergen?.id ? { ...allergen } : existingAllergen
        )
      );
    } else {
      // Add new allergen
      const newId = Math.max(...allergens.map(a => a?.id)) + 1;
      setAllergens([...allergens, { ...allergen, id: newId }]);
    }
    setOpenAddAllergensDialog(false);
    setEditingAllergen(null);
  };

  return (
    <Box>
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
          onClick={() => setOpenAddAllergensDialog(true)}
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
              <TableCell sx={{ color: "white" }}>Allergen Name</TableCell>
              <TableCell sx={{ color: "white" }}>Description</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#272437" }}>
            {allergens.map((allergen, index) => (
              <TableRow key={allergen.id}>
                <TableCell align="center" sx={{ color: "white" }}>
                  {index + 1}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{allergen.name}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {allergen.description}
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  <Switch
                    checked={allergen.status}
                    onChange={() => handleStatusChange(allergen.id)}
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
                    justifyContent: "center",
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
              onClick={handleDelete}
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
        <DialogTitle sx={{ color: "white", textAlign: "center", fontWeight: "bold", marginBottom: "16px" }} >
          {editingAllergen ? "Edit Allergen" : "Add Allergen"}
        </DialogTitle>
        <AddAllergens
          allergen={editingAllergen}
          onSave={handleAddAllergen}
          onCancel={() => setOpenAddAllergensDialog(false)}
        />
      </Dialog>
    </Box>
  );
};