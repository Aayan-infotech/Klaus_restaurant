// src/components/Logout.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export const Logout = ({ open, handleClose }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const handleCloses = () => {
        handleClose();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
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
                    variant='h4'
                    sx={{
                        color: "white",
                        textAlign: "center",
                        padding: "0",
                        marginBottom: "8px",
                        fontWeight: "bold"
                    }}
                >
                    Log Out
                </DialogTitle>
                <DialogContentText
                    sx={{
                        color: "white",
                        textAlign: "center",
                        marginBottom: "16px",
                    }}
                >
                    Are you sure you want to log out?
                </DialogContentText>
                <DialogActions
                    sx={{
                        justifyContent: "center",
                        width: "100%",
                        padding: "0",
                    }}
                >
                    <Button
                        onClick={handleLogout}
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
                        onClick={handleCloses}
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
    );
};
