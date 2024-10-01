import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, Card, CardContent, CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import menu2 from "../../src/assets/menuitems/menu2.png";
import axios from "axios";

export const SubMenuCategory = () => {
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const location = useLocation();
  const { allCategery } = location.state || {};
  const storedClientId = localStorage.getItem("clientId");

  useEffect(() => {
    fetchCategoryItem();
  }, []);

  const fetchCategoryItem = async () => {
    try {
      const response = await axios.get(`https://viamenu.oa.r.appspot.com/viamenu/clients/${storedClientId}/menus/${allCategery?.menuId}/categories/${allCategery?.categoryId}/items/all`);
      setAllSubCategories(response?.data?.data);
    } catch (error) {
      console.log(error, "something went wrong");
    } finally {
      setLoading(false); 
    }
  };

  const handleCardClick = (categoryDetails) => {
    navigate("/home/recent-menu-details", { state: { categoryDetails } });
  };

  return (
    <Box>
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "white", fontWeight: "bold" }}
        >
          Dishes
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
            {allSubCategories?.map((item, index) => (
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
                      src={menu2}
                      alt={item?.title}
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
                        wordWrap: "break-word",
                        fontSize: { xs: "14px", sm: "16px", md: "17px" },
                        padding: "10px",
                      }}
                    >
                      {item?.mainItemText}
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

export default SubMenuCategory;
