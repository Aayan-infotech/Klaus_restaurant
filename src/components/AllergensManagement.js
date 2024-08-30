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

// Dummy data for allergens
const initialManagers = [
  {
    id: 1,
    name: "Allergens 1",
    email: "Lorem ipsum dolor sit amet",
    status: true,
  },
  {
    id: 2,
    name: "Allergens 2",
    email: "Lorem ipsum dolor sit amet",
    status: false,
  },
  {
    id: 3,
    name: "Allergens 3",
    email: "Lorem ipsum dolor sit amet",
    status: true,
  },
  {
    id: 4,
    name: "Allergens 4",
    email: "Lorem ipsum dolor sit amet",
    status: false,
  },
];

export const AllergensManagement = () => {
  const [managers, setManagers] = useState(initialManagers);
  const [open, setOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

  // Handle status toggle change
  const handleStatusChange = (id) => {
    setManagers((prevManagers) =>
      prevManagers.map((manager) =>
        manager.id === id ? { ...manager, status: !manager.status } : manager
      )
    );
  };

  // Handle dialog open
  const handleClickOpen = (manager) => {
    setSelectedManager(manager);
    setOpen(true);
  };

  // Handle dialog close
  const handleClose = () => {
    setOpen(false);
    setSelectedManager(null);
  };

  // Handle delete action
  const handleDelete = () => {
    setManagers((prevManagers) =>
      prevManagers.filter((manager) => manager.id !== selectedManager.id)
    );
    handleClose();
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
              <TableCell sx={{ color: "white" }}>Allergens Name</TableCell>
              <TableCell sx={{ color: "white" }}>Description</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#272437" }}>
            {managers.map((manager) => (
              <TableRow key={manager.id}>
                <TableCell align="center" sx={{ color: "white" }}>
                  {manager.id}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{manager.name}</TableCell>
                <TableCell sx={{ color: "white" }}>{manager.email}</TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  <Switch
                    checked={manager.status}
                    onChange={() => handleStatusChange(manager.id)}
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
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: "#7CEFFF" }}
                    />
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleClickOpen(manager)}
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
          },
        }}
      >
        <DialogContent
          sx={{
            border: "1px solid #90BE6D",
            borderRadius: "20px",
            width: "250px",
            height: "250px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DialogTitle
            sx={{
              color: "white",
              textAlign: "center",
              padding: "0",
              marginBottom: "8px",
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
            Are You Sure?
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
    </Box>
  );
};
