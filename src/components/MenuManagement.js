import React from "react";
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
} from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const managers = [
  { id: 1, name: "Menu 1", email: "Jhon@gmail.com", mobile: "666666987654", description: "Neque porro quisquam", price: "11$", category: "Cat 1", allergens: "02", varients: "Medium", extras: "Veggies" },
  {
    id: 2, name: "Julia Thomas", email: "Julia@gmail.com", mobile: "666666987654", description: "Neque porro quisquam", price: "11$", category: "Cat 1", allergens: "02", varients: "Medium", extras: "Veggies",
  },
  { id: 3, name: "Marry james", email: "Marryjames@gmail.com", mobile: "987654466666", description: "Neque porro quisquam", price: "11$", category: "Cat 1", allergens: "02", varients: "Medium", extras: "Veggies" },
  { id: 4, name: "Mark", email: "Mark@gmail.com", mobile: "666666987654", description: "Neque porro quisquam", price: "11$", category: "Cat 1", allergens: "02", varients: "Medium", extras: "Veggies" },
];

export const MenuManagement = () => {
  const navigate = useNavigate();
  const handleViewDetails = (manager) => {
    navigate("/menu-details", { state: { manager } });
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>
        Menu Management
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "20px", backgroundColor: "#1f1d2b" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="start" sx={{ color: "white" }}>SI No</TableCell>
              <TableCell sx={{ color: "white" }}>Menu Name</TableCell>
              <TableCell sx={{ color: "white" }}>Description</TableCell>
              <TableCell sx={{ color: "white" }}>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#272437" }}>
            {managers.map((manager) => (
              <TableRow key={manager.id}>
                <TableCell align="start" sx={{ color: "white" }}>
                  {manager.id}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{manager.name}</TableCell>
                <TableCell sx={{ color: "white" }}>{manager.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleViewDetails(manager)}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
