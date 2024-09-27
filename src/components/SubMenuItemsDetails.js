import React, { useEffect, useRef, useState } from "react";
import { Grid, Card, Typography, Box, CardContent } from "@mui/material";
import "../../src/styles/dashboard.css";
import menu1 from "../../src/assets/menuitems/menu.jpeg";
import menu_1 from "../../src/assets/dashboard/menu1.png";
import menu2 from "../../src/assets/menuitems/menu2.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const menuItems = [
  {
    id: 1,
    category: "Spicy Biryani",
    image: menu1,
    name: "Birayani",
    email: "Jhon@gmail.com",
    mobile: "666666987654",
    description: "Neque porro quisquam",
    price: "11$",
    allergens: "02",
    varients: "Medium",
    extras: "Veggies",
    subCategories: [
      {
        id: 1,
        cat_name: "Chicken Biryani",
        image: menu1,
        description: "Spicy chicken biryani",
        price: "12$",
        dish: "Abc",
        category: "Spicy Biryani",
        menu_item: "Menu 1",
        varients: "Medium",
        allergens: "02",
        extra: "Veggies",
      },
      {
        id: 2,
        cat_name: "Veg Biryani",
        image: menu2,
        description: "Delicious veg biryani",
        price: "10$",
        dish: "Abc",
        category: "Spicy Biryani",
        menu_item: "Menu 1",
        varients: "Small",
        allergens: "02",
        extra: "Veggies 1",
      },
    ],
  },
  {
    id: 2,
    category: "Biryani",
    image: menu1,
    name: "Prathe",
    email: "Julia@gmail.com",
    mobile: "666666987654",
    description: "Neque porro quisquam",
    price: "11$",
    allergens: "02",
    varients: "Medium",
    extras: "Veggies",
    subCategories: [
      {
        id: 1,
        cat_name: "Mutton Biryani",
        image: menu2,
        description: "Rich mutton biryani",
        price: "14$",
        dish: "Abc",
        category: "Spicy Biryani",
        menu_item: "Menu 1",
        allergens: "02",
        varients: "Medium",
        extra: "Veggies",
      },
      {
        id: 2,
        cat_name: "Egg Biryani",
        image: menu2,
        description: "Egg biryani with spices",
        price: "9$",
        dish: "Abc",
        category: "Spicy Biryani",
        menu_item: "Menu 1",
        allergens: "02",
        varients: "Medium",
        extra: "Veggies",
      },
    ],
  },
  {
    id: 3,
    category: "Chicken",
    image: menu2,
    name: "Marry James",
    email: "Marryjames@gmail.com",
    mobile: "987654466666",
    description: "Neque porro quisquam",
    price: "11$",
    allergens: "02",
    varients: "Medium",
    extras: "Veggies",
    subCategories: [
      {
        id: 1,
        cat_name: "Grilled Chicken",
        image: menu2,
        description: "Grilled to perfection",
        price: "13$",
        dish: "Abc",
        category: "Spicy Biryani",
        menu_item: "Menu 1",
        allergens: "02",
        varients: "Medium",
        extra: "Veggies",
      },
      {
        id: 2,
        cat_name: "Fried Chicken",
        image: menu2,
        description: "Crispy fried chicken",
        price: "11$",
        dish: "Abc",
        category: "Spicy Biryani",
        menu_item: "Menu 1",
        allergens: "02",
        varients: "Medium",
        extra: "Veggies",
      },
    ],
  },
  {
    id: 4,
    category: "Paneer",
    image: menu1,
    name: "Mark",
    email: "Mark@gmail.com",
    mobile: "666666987654",
    description: "Neque porro quisquam",
    price: "11$",
    allergens: "02",
    varients: "Medium",
    extras: "Veggies",
    subCategories: [
      {
        id: 1,
        cat_name: "Paneer Butter Masala",
        image: menu2,
        description: "Creamy paneer masala",
        price: "12$",
        dish: "Abc",
        category: "Spicy Biryani",
        menu_item: "Menu 1",
        allergens: "02",
        varients: "Medium",
        extra: "Veggies",
      },
      {
        id: 2,
        cat_name: "Paneer Tikka",
        image: menu2,
        description: "Grilled paneer tikka",
        price: "13$",
        dish: "Abc",
        category: "Spicy Biryani",
        menu_item: "Menu 1",
        allergens: "02",
        varients: "Medium",
        extra: "Veggies",
      },
    ],
  },
  {
    id: 5,
    category: "Roll",
    image: menu1,
    name: "Birayani",
    email: "Jhon@gmail.com",
    mobile: "666666987654",
    description: "Neque porro quisquam",
    price: "11$",
    allergens: "02",
    varients: "Medium",
    extras: "Veggies",
    subCategories: [
      {
        id: 1,
        cat_name: "Chicken Roll",
        image: menu2,
        description: "Tasty chicken roll",
        price: "8$",
        dish: "Abc",
        category: "Spicy Biryani",
        menu_item: "Menu 1",
        allergens: "02",
        varients: "Medium",
        extra: "Veggies",
      },
      {
        id: 2,
        cat_name: "Paneer Roll",
        image: menu2,
        description: "Delicious paneer roll",
        price: "7$",
        dish: "Abc",
        category: "Spicy Biryani",
        menu_item: "Menu 1",
        allergens: "02",
        varients: "Medium",
        extra: "Veggies",
      },
    ],
  },
];

export const SubMenuItemsDetails = () => {
  const [recentMenuItems, setRecentMenuItems] = useState([]);
  const location = useLocation();
  const topRecentItems = location.state.topRecentItems;
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

  useEffect(()=>{
    fetchTopRecentCategoryItems();
  }, []);

  const fetchTopRecentCategoryItems = async () => {
    try {
      const response = await axios.get(
        `https://viamenu.oa.r.appspot.com/viamenu/clients/${storedClientId}/menus/${menuId}/categories/${categoryId}/items/topRecent`);
      console.log(response?.data?.data);
      setRecentMenuItems(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }

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
              src={topRecentItems?.image || menu_1}
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
                      {topRecentItems?.menuName || 'N/A'}
                    </Typography>
                    <Typography
                      sx={{
                        marginTop: 2,
                        color: "#90BE6D",
                        fontWeight: "bold",
                      }}
                    >
                      {topRecentItems?.categoryName || 'N/A'}
                    </Typography>
                    <Typography
                      sx={{
                        marginTop: 2,
                        color: "#90BE6D",
                        fontWeight: "bold",
                      }}
                    >
                      06
                    </Typography>
                    <Typography
                      sx={{
                        marginTop: 2,
                        color: "#90BE6D",
                        fontWeight: "bold",
                      }}
                    >
                      Neque porro quisquam est qui dolorem ipsum quia dolor sit
                      amet, consectetur, adipisci velit
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
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexWrap: "nowrap" }}
        >
          {menuItems.map((item, index) => (
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
                    src={item.image}
                    alt={item.title}
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
                    {item.category}
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
