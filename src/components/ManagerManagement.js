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
import PersonIcon from "@mui/icons-material/Person";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrash,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { AddUser } from "../../src/components/AddUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ManagerManagement = () => {
  const [managers, setManagers] = useState([]);
  const [allManagers, setAllManagers] = useState([]);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleClickOpen = (manager) => {
    navigate("/home/manager-details", { state: { manager } });
  };

  const handleTogglePassword = (managerId) => {
    console.log(managerId, 'managerId');
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [managerId]: !prevState[managerId],
    }));
  };

  const handleDelete = (manager_id) => {
    setManagers((prevManagers) =>
      prevManagers.filter((manager) => manager.id !== manager_id)
    );
  };

  const handleAddUser = (user) => {
    setOpenAddUserDialog(false);
    fetchAllManagers();
    setEditingUser(null);
  };

  const handleEdit = (manager) => {
    setEditingUser(manager);
    setOpenAddUserDialog(true);
  };

  useEffect(() => {
    fetchAllManagers();
  }, []);

  const fetchAllManagers = async () => {
    try {
      const response = await axios.get(
        "https://viamenu.oa.r.appspot.com/viamenu/clients/client001/managers/all"
      );
      setAllManagers(response?.data);
    } catch (error) {
      console.log(error, "Something went wrong");
    } finally {
      setLoading(false);
    }
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
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <CircularProgress sx={{ color: "#96FF7C" }} />
          <Typography variant="h6" sx={{ color: "white", marginLeft: 2 }}>
            Loading...
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
                <TableCell align="center" sx={{ color: "white" }}>
                  <PersonIcon />
                </TableCell>
                <TableCell sx={{ color: "white" }}>Username</TableCell>
                <TableCell sx={{ color: "white" }}>Password</TableCell>
                <TableCell sx={{ color: "white" }}>Name</TableCell>
                <TableCell sx={{ color: "white" }}>Email</TableCell>
                <TableCell sx={{ color: "white" }}>Mobile No</TableCell>
                <TableCell sx={{ color: "white" }}>Action</TableCell>
                <TableCell sx={{ color: "white" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: "#272437" }}>
              {allManagers.map((manager, index) => (
                <TableRow key={index}>
                  <TableCell align="center" sx={{ color: "white" }}>
                    {manager?.managerId}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {manager?.login}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {passwordVisibility[manager?.managerId]
                      ? manager?.password
                      : "••••••••"}
                    <Button
                      onClick={() => handleTogglePassword(manager?.managerId)}
                      sx={{
                        marginLeft: 1,
                        minWidth: "auto",
                        width: "40px",
                        height: "40px",
                        padding: 0,
                        borderRadius: "10px",
                        color: "#7CEFFF",
                        "&:hover": {
                          backgroundColor: "rgba(124, 239, 255, 0.1)",
                        },
                      }}
                    >
                      <FontAwesomeIcon
                        icon={passwordVisibility[manager?.managerId] ? faEye : faEyeSlash}
                      />
                    </Button>
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>{manager?.firstName}</TableCell>
                  <TableCell sx={{ color: "white" }}>{manager?.email}</TableCell>
                  <TableCell sx={{ color: "white" }}>{manager?.phone}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
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
                      onClick={() => handleDelete(manager?.managerId)}
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
                  <TableCell>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "#96FF7C",
                        color: "#96FF7C",
                        textTransform: "none",
                      }}
                    >
                      Send Email
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
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
