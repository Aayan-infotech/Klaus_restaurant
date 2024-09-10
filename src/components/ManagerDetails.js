import React from 'react';
import { Grid, Typography, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import PersonIcon from "@mui/icons-material/Person";

export const ManagerDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const managerdetails = location.state?.manager;

    const handleBack = () => {
        navigate('/home/manager-management')
    }

    return (
        <Box>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                    <PersonIcon />
                </Grid>
            </Grid>
            <Box sx={{ flexGrow: 1, padding: 1, marginTop: 1, border: "1px solid #90BE6D", borderRadius: "15px" }}>
                <Box sx={{ padding: 2, borderRadius: 2, color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <Box>
                                <Typography sx={{ marginTop: 4, fontWeight: "bold" }}>Name</Typography>
                                <Typography sx={{ marginTop: 4, fontWeight: "bold" }}>Email</Typography>
                                <Typography sx={{ marginTop: 4, fontWeight: "bold" }}>Mobile</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Box>
                                <Typography sx={{ marginTop: 4, color: "#90BE6D", fontWeight: "bold" }}>{managerdetails.name || 'N/A'}</Typography>
                                <Typography sx={{ marginTop: 4, color: "#90BE6D", fontWeight: "bold" }}>{managerdetails.email || 'N/A'}</Typography>
                                <Typography sx={{ marginTop: 4, color: "#90BE6D", fontWeight: "bold" }}>{managerdetails.mobile || 'N/A'}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Button
                onClick={handleBack}
                sx={{
                    backgroundColor: "#90BE6D",
                    color: "white",
                    "&:hover": { backgroundColor: "#74a85e" },
                    borderRadius: "20px",
                    padding: "10px 20px",
                }}
            >
                Back
            </Button>
        </Box>
    );
};

export default ManagerDetails;
