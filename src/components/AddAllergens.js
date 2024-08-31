import React, { useState, useEffect } from "react";
import {
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  Box,
  Switch,
} from "@mui/material";

export const AddAllergens = ({ onSave, allergen }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (allergen) {
      setName(allergen.name);
      setDescription(allergen.description);
      setStatus(allergen.status);
    }
  }, [allergen]);

  const handleSave = () => {
    onSave({ id: allergen?.id, name, description, status });
  };

  return (
    <DialogContent>
      <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
          <label htmlFor="description" style={{ flex: 1 }}>
            Description
          </label>
          <TextField
            id="description"
            type="text"
            variant="outlined"
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            minRows={3}
            sx={{
              flex: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "white",
              },
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <label htmlFor="email" style={{ flex: 1 }}>
            Status
          </label>
          <Switch
            checked={status}
            onChange={() => setStatus(!status)}
            color="success"
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#90BE6D",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#90BE6D",
              },
              "& .MuiSwitch-track": {
                backgroundColor: "#FF7CA3",
              },
            }}
          />
        </div>
      </form>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button
          onClick={handleSave}
          sx={{
            backgroundColor: "#90BE6D",
            color: "white",
            "&:hover": { backgroundColor: "#74a85e" },
          }}
        >
          Save
        </Button>
        <Button
          onClick={() => setStatus(true)}
          sx={{
            backgroundColor: "#FF7CA3",
            color: "white",
            "&:hover": { backgroundColor: "#FF5A70" },
          }}
        >
          Cancel
        </Button>
      </Box>
    </DialogContent>
  );
};
