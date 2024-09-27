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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ManagerManagement = () => {
  const [open, setOpen] = useState(false);
  const [managers, setManagers] = useState([]);
  const [allManagers, setAllManagers] = useState([]);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const storedClientId = localStorage.getItem("clientId");

  const handleClickOpen = (manager) => {
    navigate("/home/manager-details", { state: { manager } });
  };

  const handleTogglePassword = (managerId) => {
    console.log(managerId, "managerId");
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [managerId]: !prevState[managerId],
    }));
  };

  const handleDelete = (manager_id) => {
    setManagers(manager_id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setManagers(null);
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
        `https://viamenu.oa.r.appspot.com/viamenu/clients/${storedClientId}/managers/all`
      );
      if (response?.data?.data?.length > 0) {
        setAllManagers(response?.data?.data);
      } else {
        setErrorMessage(response?.data?.message || "No managers available");
      }
    } catch (error) {
      setErrorMessage(error, "Failed to load menus.");
    } finally {
      setLoading(false);
    }
  };

  const deleteManager = async () => {
    try {
      setDeleting(true);
      const response = await axios.delete(
        `https://viamenu.oa.r.appspot.com/viamenu/clients/${storedClientId}/managers/${managers}`
      );
      fetchAllManagers();
      handleClose();
    } catch (error) {
      console.error("Failed to delete manager:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleSendEmail = async (manager) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://viamenu.oa.r.appspot.com/viamenu/sendEmail",
        {
          // managerId: manager?.managerId,
          emailAddress: manager?.email,
          subject: "Test",
          message: "hello abinash",
        }
      );
      if (response.data.success) {
        toast.success(response.data.message, {
          autoClose: 3000,
        });
      } else {
        toast.error(response.data.message, {
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(error.data.message, {
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <ToastContainer />
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
              {allManagers?.map((manager, index) => (
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
                        icon={
                          passwordVisibility[manager?.managerId]
                            ? faEye
                            : faEyeSlash
                        }
                      />
                    </Button>
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {manager?.firstName}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {manager?.email}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {manager?.phone}
                  </TableCell>
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
                        position: "relative",
                      }}
                      onClick={() => handleSendEmail(manager)}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <CircularProgress
                            size={24}
                            color="inherit"
                            sx={{
                              position: "absolute",
                              left: "50%",
                              top: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          />
                          Sending...
                        </>
                      ) : (
                        "Send Email"
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* ----------delete------------- */}
      <Dialog
        // onClose={handleClose}
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
              onClick={() => {
                deleteManager();
              }}
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
      {openAddUserDialog && (
        <AddUser
          onAddUser={handleAddUser}
          userToEdit={editingUser}
          storedClientId={storedClientId}
          onClose={() => {
            setOpenAddUserDialog(false);
            setEditingUser(null);
          }}
        />
      )}
    </Box>
  );
};
