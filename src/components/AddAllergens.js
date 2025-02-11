import React, { useState, useEffect } from "react";
import {
  DialogContent,
  TextField,
  Button,
  Box,
  Switch,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

export const AddAllergens = ({ onSave, allergen, onClose, storedClientId }) => {
  const [allergenName, setAllergenName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (allergen) {
      setAllergenName(allergen?.allergenName || "");
      setAbbreviation(allergen?.abbreviation || "");
      setStatus(allergen?.status || "");
    }
  }, [allergen]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!allergenName || !abbreviation) {
      alert("Please fill out required fields: allergenName and abbreviation.");
      return;
    }
    const payload = {
      allergenName,
      abbreviation,
      status,
    };
    setLoading(true);
    try {
      let response;
      if (allergen) {
        response = await axios.put(
          `https://viamenu.oa.r.appspot.com/viamenu/clients/${storedClientId}/allergens/${allergen?.allergenId}`,
          payload
        );
      } else {
        response = await axios.post(
          `https://viamenu.oa.r.appspot.com/viamenu/clients/${storedClientId}/allergens`,
          payload
        );
      }
      onSave(response.data);
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
    <DialogContent>
      <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <label htmlFor="allergenName" style={{ flex: 1 }}>
            Allergen Name
          </label>
          <TextField
            id="allergenName"
            variant="outlined"
            value={allergenName}
            onChange={(e) => setAllergenName(e.target.value)}
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
          <label htmlFor="abbreviation" style={{ flex: 1 }}>
            Abbreviation
          </label>
          <TextField
            id="abbreviation"
            type="text"
            variant="outlined"
            size="small"
            value={abbreviation}
            onChange={(e) => setAbbreviation(e.target.value)}
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
          disabled={loading}
          sx={{
            backgroundColor: "#90BE6D",
            color: "white",
            "&:hover": { backgroundColor: "#74a85e" },
          }}
        >
          {loading ? (
            <>
              <CircularProgress
                size={20}
                color="inherit"
                sx={{ marginRight: 1 }}
              />
              {allergen ? "Updating..." : "Saving..."}
            </>
          ) : allergen ? (
            "Update"
          ) : (
            "Save"
          )}
        </Button>
        <Button
          onClick={handleClose}
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
