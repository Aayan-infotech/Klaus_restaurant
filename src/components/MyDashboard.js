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
  const [statsData, setStatsData] = useState([
    { title: "Total Manager", value: 0 },
    { title: "Total Menu", value: 0 },
    { title: "Total Allergens", value: 0 },
  ]);
  const [loading, setLoading] = useState(true);
  const [topRecentList, setTopRecentList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const storedClientId = localStorage.getItem("clientId");

  useEffect(() => {
    fetchDashboardTotal();
    fetchAllRecentData();
  }, []);

  const fetchDashboardTotal = async () => {
    try {
      const response = await axios.get(
        `https://viamenu.oa.r.appspot.com/viamenu/clients/${storedClientId}/dashboard/totals`
      );
      const { totalsManagers, totalMenus, totalAllergens } =
        response?.data?.data;
      setStatsData([
        { title: "Total Manager", value: totalsManagers },
        { title: "Total Menu", value: totalMenus },
        { title: "Total Allergens", value: totalAllergens },
      ]);
      setLoading(false);
    } catch (error) {
      console.log(error, "something went wrong..!");
      setLoading(false);
    }
  };

  const handleSeeClick = (menuId) => {
    navigate(`/home/recent-menu-list/${menuId}`);
  };

  const fetchAllRecentData = async () => {
    try {
      const response = await axios.get(
        `https://viamenu.oa.r.appspot.com/viamenu/clients/${storedClientId}/menus/topRecent`
      );
      setTopRecentList(response?.data?.data);
    } catch (error) {
      console.log(error, "Something went wrong..!");
    }
  };

  return (
    <Box>
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
        <>
          <Grid container spacing={4}>
            {statsData.map((stat, index) => (
              <Grid item xs={4} key={index}>
                <Card sx={{ backgroundColor: "#1f1d2b", color: "white" }}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      textAlign="center"
                      fontWeight="bold"
                    >
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
            <Grid
              item
              xs={4}
              container
              justifyContent="center"
              alignItems="center"
            >
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
                  overflow: "visible",
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
                      marginTop: "50px",
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
                sx={{
                  backgroundColor: "#1f1d2b",
                  color: "white",
                  padding: "6px",
                }}
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
                  <Typography
                    variant="body1"
                    sx={{ flex: 1, fontWeight: "bold" }}
                  >
                    Image
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ flex: 2, fontWeight: "bold" }}
                  >
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

              <Box
                sx={{
                  color: "white",
                  padding: "6px",
                  overflowY: "auto",
                  maxHeight: "200px",
                  scrollbarWidth: "none",
                }}
              >
                {topRecentList?.length > 0 ? (
                  topRecentList.map((menu, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                        paddingX: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ flex: 1, fontWeight: "bold", maxWidth:180 }}
                      >
                        <Avatar
                          src={menu.hasImage ? menu.imageUrl : menu_1}
                          variant="rounded"
                          sx={{ width: 40, height: 40 }}
                        />
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ flex: 2, fontWeight: "bold" }}
                      >
                        {menu.menuName}
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() => handleSeeClick(menu.menuId)}
                        sx={{
                          color: "#567241",
                          textTransform: "none",
                          fontWeight: "bold",
                          borderColor: "#567241",
                        }}
                      >
                        See
                      </Button>
                    </Box>
                  ))
                ) : (
                  <Typography
                    variant="body1"
                    sx={{ color: "#d3d3d3", textAlign: "center" }}
                  >
                    No recent menus available.
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default MyDashboard;
