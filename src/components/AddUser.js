import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";

export const AddUser = ({ onAddUser }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");

    const handleAddUser = () => {
        const newUser = { name, email, mobile };
        onAddUser(newUser);
        setName("");
        setEmail("");
        setMobile("");
    };

    return (
        <Dialog open={true} onClose={() => { }} sx={{ "& .MuiPaper-root": { backgroundColor: "#1f1d2b", color: "white", width: "600px" }, }}>
            <DialogTitle sx={{ fontWeight: "bold" }}>Add New User</DialogTitle>
            <DialogContent>
                <form>
                    <div class="mb-3">
                        <label htmlFor="name" class="form-label">Email address</label>
                        <input type="email" class="form-control rounded-pill" />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="name" class="form-label">Password</label>
                        <input type="password" class="form-control rounded-pill" />
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onAddUser(null)}>Cancel</Button>
                <Button onClick={handleAddUser}>Add User</Button>
            </DialogActions>
        </Dialog>
    );
};
