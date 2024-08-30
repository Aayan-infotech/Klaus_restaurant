import React from "react";
import { Grid, Card, Typography, Box, CardContent, Item } from "@mui/material";
import "../../src/styles/dashboard.css";
import menu1 from "../../src/assets/menuitems/menu.jpeg";
import menu2 from "../../src/assets/menuitems/menu2.png";
import menu_1 from "../../src/assets/dashboard/menu1.png";

const menuDetails = {
  menuName: "Menu 1",
  category: "Soups",
  menuItems: 6,
  description:
    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
  image: "menu_1",
};

const menuItems = [
  { id: 1, title: "Creamy Tomato Soup", image: menu1 },
  { id: 2, title: "Chicken Noodle Soup", image: menu1 },
  { id: 3, title: "French Onion Soup", image: menu2 },
];

export const SubMenuItemsDetails = () => {
  return (
    <Box>
      <Box
        sx={{
          flexGrow: 1,
          padding: 2,
          border: "1px solid #90BE6D",
          borderRadius: "15px",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <img
              src={menu_1}
              alt="j"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Grid>

          {/* Second Column */}
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                backgroundColor: "#1F1D2B",
                padding: 2,
                borderRadius: 2,
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Menu Name</Typography>
              <Typography variant="body1">Soups</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Menu Items Section */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ marginTop: 2, color: "white", fontWeight: "bold" }}
      >
        Menu Items
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            style={{
              width: "180px",
              height: "170px",
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
                top: "-25px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100px",
                height: "100px",
              }}
            >
              <img
                src={menu2}
                alt="menu2"
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
                variant="h6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  marginTop:"50px"
                }}
              >
                Menu 1
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* ))} */}
      </Grid>
    </Box>
  );
};
