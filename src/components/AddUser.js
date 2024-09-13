import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress
} from "@mui/material";
import axios from "axios";

export const AddUser = ({ onAddUser, userToEdit, onClose }) => {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(userToEdit);
    if (userToEdit) {
      setUsername(userToEdit.login || "");
      setPassword(userToEdit.password || "");
      setName(userToEdit.firstName || "");
      setEmail(userToEdit.email || "");
      setMobile(userToEdit.phone || "");
      setGender(userToEdit.gender || "");
      setNotes(userToEdit.notes || "");
    }
  }, [userToEdit]);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const payload = {
      login: username,
      password,
      firstName: name,
      email,
      phone: mobile,
      gender,
      notes,
    };
    setLoading(true);
    try {
      let response;
      if (userToEdit) {
        response = await axios.put(
          `https://viamenu.oa.r.appspot.com/viamenu/clients/client001/managers/${userToEdit?.managerId}`,
          payload
        );
      } else {
        response = await axios.post(
          "https://viamenu.oa.r.appspot.com/viamenu/clients/client001/managers/",
          payload
        );
      }
      onAddUser(response.data);
      handleClose();
    } catch (error) {
      console.error("Error saving allergen", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        sx={{ fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}
      >
        {userToEdit ? "Edit Manager" : "Add Manager"}
      </DialogTitle>
      <DialogContent>
        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <label htmlFor="username" style={{ flex: 1 }}>
              Username
            </label>
            <TextField
              id="username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="small"
              sx={{
                flex: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  backgroundColor: "white",
                },
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <label htmlFor="password" style={{ flex: 1 }}>
              Password
            </label>
            <TextField
              id="password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
              sx={{
                flex: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  backgroundColor: "white",
                },
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <label htmlFor="name" style={{ flex: 1 }}>
              Name
            </label>
            <TextField
              id="name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="small"
              sx={{
                flex: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  backgroundColor: "white",
                },
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <label htmlFor="email" style={{ flex: 1 }}>
              Email
            </label>
            <TextField
              id="email"
              type="email"
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                flex: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  backgroundColor: "white",
                },
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <label htmlFor="mobile" style={{ flex: 1 }}>
              Mobile Number
            </label>
            <TextField
              id="mobile"
              variant="outlined"
              size="small"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              sx={{
                flex: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  backgroundColor: "white",
                },
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <label htmlFor="mobile" style={{ flex: 1 }}>
              Gender
            </label>
            <TextField
              id="gender"
              variant="outlined"
              size="small"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              sx={{
                flex: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  backgroundColor: "white",
                },
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <label htmlFor="mobile" style={{ flex: 1 }}>
              Notes
            </label>
            <TextField
              id="notes"
              variant="outlined"
              size="small"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              sx={{
                flex: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  backgroundColor: "white",
                },
              }}
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Button
          onClick={handleAddOrUpdate}
          disabled={loading}
          sx={{
            backgroundColor: "#FF7CA3",
            color: "white",
            "&:hover": { backgroundColor: "#FF5A70" },
            borderRadius: "20px",
            padding: "10px 20px",
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} color="inherit" sx={{ marginRight: 1 }} />
              {userToEdit ? "Updating..." : "Saving..."}
            </>
          ) : (
            userToEdit ? "Update User" : "Add User"
          )}
        </Button>
        <Button
          onClick={handleClose}
          sx={{
            backgroundColor: "#90BE6D",
            color: "white",
            "&:hover": { backgroundColor: "#74a85e" },
            borderRadius: "20px",
            padding: "10px 20px",
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
