import React, { useRef } from "react";
import { Grid, Card, Typography, Box, CardContent, Item } from "@mui/material";
import "../../src/styles/dashboard.css";
import menu1 from "../../src/assets/menuitems/menu.jpeg";
import menu2 from "../../src/assets/menuitems/menu2.png";
import menu_1 from "../../src/assets/dashboard/menu1.png";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLocation, useNavigate } from "react-router-dom";

const allcategoriesMenu = [
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
            { id: 1, cat_name: "Chicken Biryani", image: menu1, description: "Spicy chicken biryani", price: "12$", dish: "Abc", category: "Spicy Biryani", menu_item: "Menu 1", varients: "Medium", allergens: "02", extra: "Veggies" },
            { id: 2, cat_name: "Veg Biryani", image: menu2, description: "Delicious veg biryani", price: "10$", dish: "Abc", category: "Spicy Biryani", menu_item: "Menu 1", varients: "Small", allergens: "02", extra: "Veggies 1" }
        ]
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
            { id: 1, cat_name: "Mutton Biryani", image: menu2, description: "Rich mutton biryani", price: "14$", dish: "Abc", category: "Spicy Biryani", menu_item: "Menu 1", allergens: "02", varients: "Medium", extra: "Veggies" },
            { id: 2, cat_name: "Egg Biryani", image: menu2, description: "Egg biryani with spices", price: "9$", dish: "Abc", category: "Spicy Biryani", menu_item: "Menu 1", allergens: "02", varients: "Medium", extra: "Veggies" }
        ]
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
            { id: 1, cat_name: "Grilled Chicken", image: menu2, description: "Grilled to perfection", price: "13$", dish: "Abc", category: "Spicy Biryani", menu_item: "Menu 1", allergens: "02", varients: "Medium", extra: "Veggies" },
            { id: 2, cat_name: "Fried Chicken", image: menu2, description: "Crispy fried chicken", price: "11$", dish: "Abc", category: "Spicy Biryani", menu_item: "Menu 1", allergens: "02", varients: "Medium", extra: "Veggies" }
        ]
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
            { id: 1, cat_name: "Paneer Butter Masala", image: menu2, description: "Creamy paneer masala", price: "12$", dish: "Abc", category: "Spicy Biryani", menu_item: "Menu 1", allergens: "02", varients: "Medium", extra: "Veggies" },
            { id: 2, cat_name: "Paneer Tikka", image: menu2, description: "Grilled paneer tikka", price: "13$", dish: "Abc", category: "Spicy Biryani", menu_item: "Menu 1", allergens: "02", varients: "Medium", extra: "Veggies" }
        ]
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
            { id: 1, cat_name: "Chicken Roll", image: menu2, description: "Tasty chicken roll", price: "8$", dish: "Abc", category: "Spicy Biryani", menu_item: "Menu 1", allergens: "02", varients: "Medium", extra: "Veggies" },
            { id: 2, cat_name: "Paneer Roll", image: menu2, description: "Delicious paneer roll", price: "7$", dish: "Abc", category: "Spicy Biryani", menu_item: "Menu 1", allergens: "02", varients: "Medium", extra: "Veggies" }
        ]
    }
];

export const AllMenuCategories = () => {
    const navigate = useNavigate();

    const scrollRef = useRef(null);

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

    const handleCardClick = (category_types) => {
        console.log(category_types, 'category_types')
        navigate('/home/sub-category', { state: { category_types } });
    };

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 1,
                }}
            >
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: 'white', fontWeight: 'bold' }}
                >
                    All Categories
                </Typography>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: 'white', fontWeight: 'bold' }}
                >
                    <ArrowForwardIosIcon
                        sx={{ color: '#90BE6D', cursor: 'pointer' }}
                        onClick={scrollLeft}
                    />
                    <ArrowBackIosNewIcon
                        sx={{ color: '#90BE6D', cursor: 'pointer' }}
                        onClick={scrollRight}
                    />
                </Typography>
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    maxHeight: '450px',
                    display: 'flex',
                    flexDirection: 'column',
                    scrollbarWidth: 'none',
                }}
            >
                <Grid container spacing={2}>
                    {allcategoriesMenu.map((item, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            key={index}
                            sx={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}
                        >
                            <Card
                                onClick={() => handleCardClick(item)}
                                sx={{
                                    width: { xs: '120px', sm: '140px', md: '160px' },
                                    height: { xs: '120px', sm: '140px', md: '160px' },
                                    borderRadius: '20px',
                                    backgroundColor: '#1F1D2B',
                                    textAlign: 'center',
                                    color: 'white',
                                    position: 'relative',
                                    overflow: 'visible',
                                    marginTop: '20px',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '-20px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '80px',
                                        height: '80px',
                                    }}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.category}
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
                                            marginTop: '60px',
                                            fontSize: { xs: '14px', sm: '16px', md: '17px' },
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
