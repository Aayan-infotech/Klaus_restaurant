import React, { useEffect, useRef, useState } from "react";
import { Grid, Card, Typography, Box, CardContent, Item } from "@mui/material";
import "../../src/styles/dashboard.css";
import menu1 from "../../src/assets/menuitems/menu.jpeg";
import menu2 from "../../src/assets/menuitems/menu2.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const AllMenuCategories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [menuImages, setMenuImages] = useState([]);
  const { id } = useParams();
  const menuId = id;

  const navigate = useNavigate();
  const scrollRef = useRef(null);

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

  const handleCardClick = (menuId, categoryId) => {
    navigate(`/home/sub-category/${menuId}/${categoryId}`);
  };

  useEffect(() => {
    fetchMenuCategory();
    fetchAllMenusImages();
  }, []);

  const fetchMenuCategory = async () => {
    try {
      const response = await axios.get(
        `https://viamenu.oa.r.appspot.com/viamenu/clients/client001/menus/${menuId}/categories/all`
      );
      setAllCategories(response?.data);
    } catch (error) {
      console.log(error, "Something went wrong");
    }
  };

  const fetchAllMenusImages = async () => {
    try {
      const response = await axios.get(
        `https://viamenu.oa.r.appspot.com/viamenu/clients/client001/menus/${menuId}/images/all`
      );
      const images = response.data;
      setMenuImages(images);
    } catch (error) {
      console.log(error, "Something went wrong");
    }
  };

  return (
    <Box>
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
          All Categories
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
                onClick={() => handleCardClick(item?.menuId, item?.categoryId)}
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
                    src={item.image}
                    alt={item.category}
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
    </Box>
  );
};
