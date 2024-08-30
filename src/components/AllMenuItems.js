import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import menu1 from "../../src/assets/menuitems/menu.jpeg";
import menu2 from "../../src/assets/menuitems/menu2.png";
import { useNavigate } from "react-router-dom";

const categories = [
  { title: "Soups", image: menu1 },
  { title: "Appetizers", image: "", icon: "utensils" },
  { title: "Salads", image: menu2 },
  { title: "Main Courses", image: "", icon: "utensils" },
  { title: "Pasta", image: menu1 },
  { title: "Sandwiches", image: menu2 },
];

export const AllMenuItems = () => {
  const navigate = useNavigate();

  const handleCardClick = (category) => {
    navigate(`/submenu-items/${category.id}`, { state: { category } });
  };

  return (
    <div>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ color: "white" }}
      >
        Menu 1
      </Typography>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ marginTop: "30px" }}
      >
        {categories.map((category, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Card
              onClick={() => handleCardClick(category)}
              style={{
                width: "180px",
                height: "190px",
                borderRadius: "20px",
                backgroundColor: "#1F1D2B",
                textAlign: "center",
                color: "white",
                position: "relative",
                overflow: "visible",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-50px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "100px",
                  height: "100px",
                }}
              >
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
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
                      className={`fa-solid fa-${category.icon}`}
                      style={{
                        fontSize: "40px",
                        color: "#27213C",
                      }}
                    ></i>
                  </div>
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
                  variant="h6"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  {category.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
