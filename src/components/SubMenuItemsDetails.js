import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Card,
  Typography,
  Box,
  CardContent,
  CircularProgress,
} from "@mui/material";
import "../../src/styles/dashboard.css";
import menu_1 from "../../src/assets/dashboard/menu1.png";
import itemsmenu2 from "../../src/assets/dashboard/image-removebg-preview.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const SubMenuItemsDetails = () => {
  const [recentMenuItems, setRecentMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { topRecentItems } = location.state || {};
  const menuId = topRecentItems?.menuId;
  const categoryId = topRecentItems?.categoryId;

  const storedClientId = localStorage.getItem("clientId");

  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    fetchTopRecentCategoryItems();
  }, []);

  const fetchTopRecentCategoryItems = async () => {
    try {
      const response = await axios.get(
        `https://viamenu.oa.r.appspot.com//viamenu/clients/${storedClientId}/menus/${menuId}/categories/${categoryId}/categoryWithItems`
      );
      console.log(response?.data?.data?.items, "items menu");
      setRecentMenuItems(response?.data?.data?.items);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardClick = (categoryDetails) => {
    navigate("/home/recent-menu-details", { state: { categoryDetails } });
  };

  return (
    <Box>
      <Box
        sx={{
          flexGrow: 1,
          padding: 1,
          border: "1px solid #90BE6D",
          borderRadius: "15px",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <img
              src={topRecentItems?.imageUrl || menu_1}
              alt="j"
              style={{
                width: "100%",
                maxHeight: "200px",
                objectFit: "contain",
              }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                backgroundColor: "#1F1D2B",
                padding: 2,
                borderRadius: 2,
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                // height: '100%',
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>
                      Menu Name
                    </Typography>
                    <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>
                      Category
                    </Typography>
                    <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>
                      Menu Items
                    </Typography>
                    <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>
                      Description
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box>
                    <Typography
                      sx={{
                        marginTop: 2,
                        color: "#90BE6D",
                        fontWeight: "bold",
                      }}
                    >
                      {topRecentItems?.categoryName || "N/A"}
                    </Typography>
                    <Typography
                      sx={{
                        marginTop: 2,
                        color: "#90BE6D",
                        fontWeight: "bold",
                      }}
                    >
                      {topRecentItems?.categoryName || "N/A"}
                    </Typography>
                    <Typography
                      sx={{
                        marginTop: 2,
                        color: "#90BE6D",
                        fontWeight: "bold",
                      }}
                    >
                      {topRecentItems?.sortedIndex || 0}
                    </Typography>
                    <Typography
                      sx={{
                        marginTop: 2,
                        color: "#90BE6D",
                        fontWeight: "bold",
                      }}
                    >
                      {topRecentItems?.description || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 1,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "white", fontWeight: "bold" }}
        >
          Menu Items
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "white", fontWeight: "bold" }}
        >
          <ArrowForwardIosIcon
            sx={{ color: "#90BE6D", cursor: "pointer" }}
            onClick={scrollLeft}
          />
          <ArrowBackIosNewIcon
            sx={{ color: "#90BE6D", cursor: "pointer" }}
            onClick={scrollRight}
          />
        </Typography>
      </Box>

      <Box
        sx={{
          overflowX: "auto",
          display: "flex",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          marginTop: 1,
        }}
        ref={scrollRef}
      >
        {recentMenuItems?.length > 0 ? (
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", flexWrap: "nowrap" }}
          >
            {recentMenuItems.map((item, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
                sx={{ flex: "0 0 auto" }}
              >
                <Card
                  onClick={() => handleCardClick(item)}
                  style={{
                    width: "160px",
                    height: "160px",
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
                      width: "100px",
                      height: "100px",
                    }}
                    sx={{ padding: 1 }}
                  >
                    <img
                      src={item?.imageUrl || itemsmenu2}
                      alt={item?.itemId}
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
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        marginTop: "60px",
                        fontSize: "17px",
                      }}
                    >
                      {item?.mainItemText}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            sx={{
              textAlign: "center",
              color: "white",
              marginTop: 2,
              fontSize: "18px",
              fontWeight:"bold",
              textAlign:"center"
            }}
          >
            No available menu items
          </Typography>
        )}
      </Box>
    </Box>
  );
};
