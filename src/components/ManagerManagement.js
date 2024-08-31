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
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { AddUser } from "../../src/components/AddUser";
import { useNavigate } from "react-router-dom";

export const ManagerManagement = () => {
  const [managers, setManagers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const navigate = useNavigate();

  const handleClickOpen = (manager) => {
    // setSelectedManager(manager);
    // setOpen(true);
    navigate('/manager-details', { state: { manager } });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedManager(null);
  };

  const handleDelete = () => {
    if (selectedManager) {
      setManagers((prevManagers) =>
        prevManagers.filter((manager) => manager.id !== selectedManager.id)
      );
      handleClose();
    } else {
      console.error("No manager selected for deletion.");
    }
  };

  const handleAddUser = (user) => {
    if (user) {
      if (user.id) {
        setManagers((prevManagers) =>
          prevManagers.map((manager) =>
            manager.id === user.id ? { ...user } : manager
          )
        );
      } else {
        setManagers((prevManagers) => [
          ...prevManagers,
          { ...user, id: prevManagers.length + 1 },
        ]);
      }
    }
    setOpenAddUserDialog(false);
    setEditingUser(null);
  };

  const handleEdit = (manager) => {
    setEditingUser(manager);
    setOpenAddUserDialog(true);
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
          Manager Management
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setOpenAddUserDialog(true)}
          sx={{
            color: "#567241",
            fontWeight: "bold",
            borderColor: "#567241",
            textTransform: "none",
          }}
        >
          Add User
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
                <PersonIcon />
              </TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Mobile No</TableCell>
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
                <TableCell sx={{ color: "white" }}>{manager.mobile}</TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleClickOpen(manager)}
                    sx={{
                      minWidth: "auto",
                      width: "40px",
                      height: "40px",
                      padding: 0,
                      borderRadius: "10px",
                      marginRight: 1,
                      borderColor: "#96FF7C",
                      color: "#96FF7C",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
                  <Button
                    variant="outlined"
                    onClick={() => handleEdit(manager)}
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
                    onClick={() => handleDelete(manager)}
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

      {openAddUserDialog && (
        <AddUser
          onAddUser={handleAddUser}
          userToEdit={editingUser}
          onClose={() => {
            setOpenAddUserDialog(false);
            setEditingUser(null);
          }}
        />
      )}
    </Box>
  );
};
