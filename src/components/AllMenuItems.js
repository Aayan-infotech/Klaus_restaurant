import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import menu1 from "../../src/assets/menuitems/menu.jpeg";
import menu2 from "../../src/assets/menuitems/menu2.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const categories = [
  { title: "Soups", image: menu1 },
  { title: "Appetizers", image: "", icon: "utensils" },
  { title: "Salads", image: menu2 },
  { title: "Main Courses", image: "", icon: "utensils" },
  { title: "Pasta", image: menu1 },
  { title: "Sandwiches", image: menu2 },
  { title: "Soups", image: menu1 },
  { title: "Appetizers", image: "", icon: "utensils" },
  { title: "Salads", image: menu2 },
  { title: "Main Courses", image: "", icon: "utensils" },
  { title: "Pasta", image: menu1 },
  { title: "Sandwiches", image: menu2 },
  { title: "Soups", image: menu1 },
  { title: "Appetizers", image: "", icon: "utensils" },
  { title: "Salads", image: menu2 },
  { title: "Main Courses", image: "", icon: "utensils" },
  { title: "Pasta", image: menu1 },
  { title: "Sandwiches", image: menu2 },
];

export const AllMenuItems = () => {
  const [topRecentCategory, setTopRecentCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const storedClientId = localStorage.getItem("clientId");

  useEffect(() => {
    fetchRecentListCategories();
  }, []);

  const fetchRecentListCategories = async () => {
    try {
      const response = await axios.get(
        `https://viamenu.oa.r.appspot.com/viamenu/clients/${storedClientId}/menus/${id}/categories/topRecent`
      );
      if (response?.data?.data?.length > 0) {
        setTopRecentCategory(response?.data?.data);
      } else {
        setErrorMessage(
          response?.data?.message || "No recent categories available..!"
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (category) => {
    navigate(`/home/recent-submenu/${category.id}`, { state: { category } });
  };

  return (
    <Box>
      <Box sx={{ marginTop: 1 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "white", fontWeight: "bold" }}
        >
          {" "}
          Menu 1
        </Typography>
      </Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            minHeight: "300px",
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
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            maxHeight: "450px",
            display: "flex",
            flexDirection: "column",
            scrollbarWidth: "none",
          }}
        >
          <Grid container spacing={2}>
            {categories.map((item, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
                sx={{
                  flex: "0 0 auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  onClick={() => handleCardClick(item)}
                  sx={{
                    width: { xs: "120px", sm: "140px", md: "160px" },
                    height: { xs: "120px", sm: "140px", md: "160px" },
                    borderRadius: "20px",
                    backgroundColor: "#1F1D2B",
                    textAlign: "center",
                    color: "white",
                    position: "relative",
                    overflow: "visible",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "80px",
                      height: "80px",
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          backgroundColor: "#FFB74D",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i
                          className={`fa-solid fa-${item.icon}`}
                          style={{
                            fontSize: "40px",
                            color: "#27213C",
                          }}
                        ></i>
                      </Box>
                    )}
                  </div>
                  <CardContent
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      padding: 0,
                    }}
                  >
                    <Typography
                      style={{
                        marginTop: "50px",
                        fontSize: { xs: "14px", sm: "16px", md: "17px" },
                      }}
                    >
                      {item.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
