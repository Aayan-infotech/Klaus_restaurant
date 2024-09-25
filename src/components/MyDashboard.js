import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import saladImage from "../../src/assets/dashboard/image-removebg-preview-photoaidcom-cropped.png";
import menu_1 from "../../src/assets/dashboard/menu1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyDashboard = () => {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState([
    { title: "Total Manager", value: 0 },
    { title: "Total Menu", value: 0 },
    { title: "Total Allergens", value: 0 },
  ]);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    fetchDashboardTotal();
  }, []);

  const fetchDashboardTotal = async () => {
    try {
      const response = await axios.get('https://viamenu.oa.r.appspot.com/viamenu/clients/client001/dashboard/totals');
      const { totalsManagers, totalMenus, totalAllergens } = response?.data?.data;
      setStatsData([
        { title: "Total Manager", value: totalsManagers },
        { title: "Total Menu", value: totalMenus },
        { title: "Total Allergens", value: totalAllergens }
      ]);
      setLoading(false); // Data fetched, set loading to false
    } catch (error) {
      console.log(error, 'something went wrong..!');
      setLoading(false); // Set loading to false even if there is an error
    }
  };

  const handleSeeClick = () => {
    navigate("/home/recent-menu-list");
  };

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <Box display="flex" alignItems="center" gap={2}>
          <CircularProgress sx={{ color: "#96FF7C" }} />
          <Typography variant="h6">Loading...</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={4}>
        {statsData.map((stat, index) => (
          <Grid item xs={4} key={index}>
            <Card sx={{ backgroundColor: "#1f1d2b", color: "white" }}>
              <CardContent>
                <Typography variant="h5" textAlign="center" fontWeight="bold">
                  {stat?.title}
                </Typography>
                <Typography
                  variant="h3"
                  textAlign="center"
                  color="green"
                  fontWeight="bold"
                >
                  {stat?.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4} sx={{ mt: 5 }}>
        <Grid item xs={4} container justifyContent="center" alignItems="center">
          <Card
            style={{
              maxWidth: 220,
              width: 220,
              height: 250,
              borderRadius: "20px",
              backgroundColor: "#567241",
              textAlign: "center",
              color: "white",
              position: "relative",
              overflow: "visible"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-15px",
                left: "15%",
                transform: "translateX(-50%)",
                width: "100px",
                height: "100px",
              }}
            >
              <img
                src={saladImage}
                alt="menu2"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
            <CardContent sx={{ mt: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  marginTop: "50px"
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Top Menus
                </Typography>
                <Typography variant="body1" sx={{ color: "#d3d3d3" }}>
                  With Special Sauce
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Box
            sx={{ backgroundColor: "#1f1d2b", color: "white", padding: "6px" }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Menu Listed
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
                paddingX: 1,
              }}
            >
              <Typography variant="body1" sx={{ flex: 1, fontWeight: "bold" }}>
                Image
              </Typography>
              <Typography variant="body1" sx={{ flex: 2, fontWeight: "bold" }}>
                Name
              </Typography>
              <Typography
                variant="body1"
                sx={{ flex: 1, textAlign: "right", fontWeight: "bold" }}
              >
                View
              </Typography>
            </Box>
          </Box>

          <Box sx={{ color: "white", padding: "6px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
                paddingX: 1,
              }}
            >
              <Typography variant="body1" sx={{ flex: 1, fontWeight: "bold" }}>
                <Avatar
                  src={menu_1}
                  variant="rounded"
                  sx={{ width: 40, height: 40 }}
                />
              </Typography>
              <Typography variant="body1" sx={{ flex: 2, fontWeight: "bold" }}>
                Menu 1
              </Typography>
              <Button
                variant="outlined"
                onClick={handleSeeClick}
                sx={{
                  color: "#567241",
                  textTransform: "none",
                  fontWeight: "bold",
                  borderColor: "#567241",
                }}
              >
                {" "}
                See{" "}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyDashboard;
