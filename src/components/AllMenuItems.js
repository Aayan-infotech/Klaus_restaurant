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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const categories = [
  {
    success: true,
    status: 200,
    message: "Category list retrieved successfully.",
    data: [
      {
        clientId: "client_1",
        menuId: "menu_2",
        categoryId: "category_2",
        categoryName: "pizza",
        parentCategroryId: "category_1",
        hasImage: true,
        imageUrl:
          "https://storage.googleapis.com/firsttest-8a340.appspot.com/viamenu/viamenu/client_1/menu_2/category_2/category_2?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=firebase-adminsdk-9916z%40firsttest-8a340.iam.gserviceaccount.com%2F20240926%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240926T094203Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=73c97384e152d26bc97492dc917b2097acb53c7b30fd60c77ba053e1d56a5b0780df5a20c4a95529647e6748d28f64aa7cbf22873767e55465e8087303b791f31d5b8cc81d234b8bd00d0c66bdd40669f605057a341ca19090c1fc25876e56cf7d1d886c41d004fddc02a8030df169602aa058323882bfb11885fb0fc9d4ff6ebde53b403e6c43c0984078c5d7da79dd28b099dff1593bff3cfce3d3f1ddcafc6a5a6178302a14935e7e358e20a39edf6f6c38aa93f69018ba3e23b7544085f5a1b0ddae1dd789c59d312ced9a41cb9ab6a0ab07ddc4c66c66df85ca939f8019b87a12eb3c6d431a0a5fa64ec545472a36e778a4f6e15e1f7d46abfa69457802",
        createdAt: 1727090727366,
        lastUpdateAt: 1727090727366,
      },
    ],
  },
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
    navigate("/home/recent-submenu", { state: { topRecentItems: category } });
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
            {/* {categories[0]?.data?.map((item, index) => ( topRecentCategory */}
            {topRecentCategory?.map((item, index) => (
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
                    {item?.imageUrl ? (
                      <img
                        src={item?.imageUrl || menu1}
                        alt={item?.menuId}
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
                          // className={`fa-solid fa-${item?.icon}`}
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
                      {item?.categoryName || "Penuts"}
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
