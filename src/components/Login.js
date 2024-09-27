import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import homeImage from "../assets/Home/Pixabay-1050813.png";
import "../../src/styles/dashboard.css";
import axios from "axios";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        "https://viamenu.oa.r.appspot.com/viamenu/login/clients",
        {
          headers: {
            Username: username,
            Password: password,
          },
        }
      );
      localStorage.setItem("clientId", response.data.data.clientId);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: "100vh", padding: 0 }}
    >
      <Grid container sx={{ height: "100%" }}>
        {/* Image Section */}
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            position: "relative",
            height: "100%",
            display: { xs: "none", md: "block" },
          }}
        >
          <img
            src={homeImage}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="Background"
          />
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              left: "20%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingLeft: { xs: 2, sm: 4, md: 8 },
              color: "white",
              textAlign: "left",
            }}
          >
            <Typography
              variant="h1"
              color="success.main"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
              }}
            >
              Klaus
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginTop: 2,
                maxWidth: "70%",
                lineHeight: 1.5,
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </Typography>
          </Box>
        </Grid>

        {/* Form Section */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#272437",
            padding: { xs: 2, sm: 3, md: 0 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              maxWidth: { xs: "100%", sm: 400 },
              padding: { xs: 2, sm: 3 },
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: 1,
                color: "white",
                fontSize: { xs: "1.5rem", sm: "2rem" },
              }}
            >
              SIGN IN
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: 2, color: "white" }}
            >
              Sign in to your account
            </Typography>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label
                  htmlFor="username"
                  className="text-white fw-bold form-label"
                >
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Please Enter Your Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="text-white fw-bold form-label"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Please Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                sx={{ backgroundColor: "#90BE6D", position: "relative" }}
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
                    Logging...
                  </>
                ) : (
                  "SUBMIT"
                )}
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
