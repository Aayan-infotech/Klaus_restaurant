import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
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
  { title: "Soups", image: menu1 },
  { title: "Appetizers", image: "", icon: "utensils" },
  { title: "Salads", image: menu2 },
  { title: "Main Courses", image: "", icon: "utensils" },
  { title: "Pasta", image: menu1 },
  { title: "Sandwiches", image: menu2 },
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
    navigate(`/home/recent-submenu/${category.id}`, { state: { category } });
  };

  return (
    // <Box>
    //   <Typography
    //     variant="h4"
    //     align="center"
    //     gutterBottom
    //     sx={{
    //       color: "white",
    //       fontSize: { xs: "24px", sm: "32px", md: "36px" }, 
    //     }}
    //   >
    //     Menu 1
    //   </Typography>

    //   <Box
    //     sx={{
    //       flexGrow: 1,
    //       overflowY: "auto",
    //       maxHeight: "450px",
    //       display: "flex",
    //       flexDirection: "column",
    //       scrollbarWidth: "none",
    //     }}
    //   >
    //     <Grid container spacing={4} justifyContent="center">
    //       {categories.map((category, index) => (
    //         <Grid
    //           item
    //           xs={6}
    //           sm={4}
    //           md={3}
    //           key={index}
    //           sx={{
    //             display: "flex",
    //             justifyContent: "center",
    //             position: "relative",
    //             "@media (max-width: 600px)": {
    //               xs: 12,
    //             },
    //           }}
    //         >
    //           <Card
    //             onClick={() => handleCardClick(category)}
    //             sx={{
    //               width: { xs: "150px", sm: "180px" }, 
    //               height: { xs: "140px", sm: "160px" },
    //               borderRadius: "20px",
    //               backgroundColor: "#1F1D2B",
    //               textAlign: "center",
    //               color: "white",
    //               position: "relative",
    //               overflow: "visible",
    //             }}
    //           >
    //             <Box
    //               sx={{
    //                 position: "absolute",
    //                 top: "-25px",
    //                 left: "50%",
    //                 transform: "translateX(-50%)",
    //                 width: { xs: "80px", sm: "100px" }, 
    //                 height: { xs: "80px", sm: "100px" },
    //               }}
    //             >
    //               {category.image ? (
    //                 <img
    //                   src={category.image}
    //                   alt={category.title}
    //                   style={{
    //                     width: "100%",
    //                     height: "100%",
    //                     borderRadius: "50%",
    //                     objectFit: "cover",
    //                   }}
    //                 />
    //               ) : (
    //                 <Box
    //                   sx={{
    //                     width: "100%",
    //                     height: "100%",
    //                     borderRadius: "50%",
    //                     backgroundColor: "#FFB74D",
    //                     display: "flex",
    //                     alignItems: "center",
    //                     justifyContent: "center",
    //                   }}
    //                 >
    //                   <i
    //                     className={`fa-solid fa-${category.icon}`}
    //                     style={{
    //                       fontSize: "40px",
    //                       color: "#27213C",
    //                     }}
    //                   ></i>
    //                 </Box>
    //               )}
    //             </Box>
    //             <CardContent
    //               sx={{
    //                 display: "flex",
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //                 height: "100%",
    //                 padding: 0,
    //               }}
    //             >
    //               <Typography
    //                 variant="h6"
    //                 sx={{
    //                   display: "flex",
    //                   justifyContent: "center",
    //                   alignItems: "center",
    //                   height: "100%",
    //                   marginTop: { xs: "40px", sm: "50px" },
    //                   fontSize: { xs: "14px", sm: "16px" }, 
    //                 }}
    //               >
    //                 {category.title}
    //               </Typography>
    //             </CardContent>
    //           </Card>
    //         </Grid>
    //       ))}
    //     </Grid>
    //   </Box>
    // </Box>
    <Box>
      <Box sx={{ marginTop: 1 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }} >   Menu 1
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
          {categories.map((item, index) => (
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
                  {/* <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  /> */}
                  {item.image ? (
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
                        className={`fa-solid fa-${item.icon}`}
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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    padding: 0,
                  }}
                >
                  <Typography
                    style={{
                      marginTop: '50px',
                      fontSize: { xs: '14px', sm: '16px', md: '17px' },
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
