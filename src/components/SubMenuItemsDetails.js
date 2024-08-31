import React, { useRef } from "react";
import { Grid, Card, Typography, Box, CardContent, Item } from "@mui/material";
import "../../src/styles/dashboard.css";
import menu1 from "../../src/assets/menuitems/menu.jpeg";
import menu2 from "../../src/assets/menuitems/menu2.png";
import menu_1 from "../../src/assets/dashboard/menu1.png";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from "react-router-dom";

// const menuItems = [
//   { id: 1, title: "Creamy Tomato Soup", image: menu1 },
//   { id: 2, title: "Chicken Noodle Soup", image: menu1 },
//   { id: 3, title: "French Onion Soup", image: menu2 },
//   { id: 1, title: "Creamy Tomato Soup", image: menu1 },
//   { id: 2, title: "Chicken Noodle Soup", image: menu1 },
//   { id: 3, title: "French Onion Soup", image: menu2 },
// ];

const menuItems = [
  { id: 1, title: "Creamy Tomato Soup", image: menu1, name: "Menu 1", email: "Jhon@gmail.com", mobile: "666666987654", description: "Neque porro quisquam", price: "11$", category: "Cat 1", allergens: "02", varients: "Medium", extras: "Veggies" },
  {
    id: 2, title: "Creamy Tomato Soup", image: menu1, name: "Julia Thomas", email: "Julia@gmail.com", mobile: "666666987654", description: "Neque porro quisquam", price: "11$", category: "Cat 1", allergens: "02", varients: "Medium", extras: "Veggies",
  },
  { id: 3, title: "Creamy Tomato Soup", image: menu1, name: "Marry james", email: "Marryjames@gmail.com", mobile: "987654466666", description: "Neque porro quisquam", price: "11$", category: "Cat 1", allergens: "02", varients: "Medium", extras: "Veggies" },
  { id: 4, title: "Creamy Tomato Soup", image: menu1, name: "Mark", email: "Mark@gmail.com", mobile: "666666987654", description: "Neque porro quisquam", price: "11$", category: "Cat 1", allergens: "02", varients: "Medium", extras: "Veggies" },
];

export const SubMenuItemsDetails = () => {

  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200, 
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  };

  const handleCardClick = (recentList) => {
    navigate('/recent-menu-details', { state: { recentList } });
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
              src={menu_1}
              alt="j"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                backgroundColor: '#1F1D2B',
                padding: 2,
                borderRadius: 2,
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Menu Name</Typography>
                    <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Category</Typography>
                    <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Menu Items</Typography>
                    <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Description</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box >
                    <Typography sx={{ marginTop: 2, color: "#90BE6D", fontWeight: "bold" }}>Menu 1</Typography>
                    <Typography sx={{ marginTop: 2, color: "#90BE6D", fontWeight: "bold" }}>Soups</Typography>
                    <Typography sx={{ marginTop: 2, color: "#90BE6D", fontWeight: "bold" }}>06</Typography>
                    <Typography sx={{ marginTop: 2, color: "#90BE6D", fontWeight: "bold" }}>
                      Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
          Menu Items
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
          <ArrowForwardIosIcon sx={{ color: '#90BE6D', cursor: 'pointer' }} onClick={scrollLeft} />
          <ArrowBackIosNewIcon sx={{ color: '#90BE6D', cursor: 'pointer' }} onClick={scrollRight} />
        </Typography>
      </Box>

      <Box sx={{ overflowX: 'auto', display: 'flex', scrollBehavior: 'smooth', scrollbarWidth: 'none', marginTop: 1 }} ref={scrollRef} >
        <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'nowrap' }}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ flex: '0 0 auto' }}>
              <Card onClick={() => handleCardClick(item)} style={{ width: '160px', height: '160px', borderRadius: '20px', backgroundColor: '#1F1D2B', textAlign: 'center', color: 'white', position: 'relative', overflow: 'visible', marginTop: '20px', }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100px',
                    height: '100px',
                  }}
                  sx={{padding:1}}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <CardContent
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    padding: 0,
                  }}
                >
                  <Typography
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      marginTop: '60px',
                      fontSize:"17px"
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
    </Box>
  );
};
