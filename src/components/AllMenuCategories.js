import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Typography,
  Box,
  CardContent,
  CircularProgress,
} from "@mui/material";
import "../../src/styles/dashboard.css";
import menu2 from "../../src/assets/menuitems/menu2.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const AllMenuCategories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const menuId = id;

  const navigate = useNavigate();
  const storedClientId = localStorage.getItem("clientId");

  const handleCardClick = (item) => {
    navigate("/home/sub-category", { state: { allCategery: item } });
  };

  useEffect(() => {
    if (menuId) {
      fetchMenuCategory();
      // fetchAllMenusImages();
    } else {
      setLoading(false);
    }
  }, [menuId]);

  const fetchMenuCategory = async () => {
    try {
      const response = await axios.get(
        `https://viamenu.oa.r.appspot.com/viamenu/clients/${storedClientId}/menus/${menuId}/categories/all`
      );
      const categories = response?.data?.data;
      if (Array.isArray(categories)) {
        setAllCategories(categories);
      } else {
        console.error("Categories data is not an array:", categories);
        setAllCategories([]);
      }
    } catch (error) {
      console.log(error, "Something went wrong");
      setAllCategories([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "white", fontWeight: "bold" }}
        >
          All Categories
        </Typography>
      </Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
          }}
        >
          <CircularProgress sx={{ color: "white" }} />
          <Typography variant="h6" sx={{ color: "white", marginTop: "16px" }}>
            Loading...
          </Typography>
        </Box>
      ) : allCategories.length === 0 ? (
        <Typography
          variant="h6"
          sx={{ color: "white", textAlign: "center", marginTop: "20px" }}
        >
          No categories available
        </Typography>
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
            {allCategories?.map((item, index) => (
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
                    <img
                      src={item?.imageUrl || menu2}
                      alt={item?.category}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
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
                        marginTop: "60px",
                        fontSize: { xs: "14px", sm: "16px", md: "17px" },
                      }}
                    >
                      {item?.categoryName}
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
