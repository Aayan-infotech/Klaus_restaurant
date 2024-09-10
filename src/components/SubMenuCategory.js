import React, { useRef } from "react";
import { Grid, Card, Typography, Box, CardContent } from "@mui/material";
import "../../src/styles/dashboard.css";
import { useLocation, useNavigate } from "react-router-dom";

export const SubMenuCategory = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const allsubcat = location.state?.category_types;
    const allsubcategories = allsubcat?.subCategories

    const handleCardClick = (categoryDetails) => {
        navigate('/home/recent-menu-details', { state: { categoryDetails } });
    };

    return (
        <Box>
            <Box>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: 'white', fontWeight: 'bold' }}
                >
                    Sub Categories
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
                    {allsubcategories.map((item, index) => (
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
                                            marginTop: '60px',
                                            fontSize: { xs: '14px', sm: '16px', md: '17px' },
                                        }}
                                    >
                                        {item.cat_name}
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
