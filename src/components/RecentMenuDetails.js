import React from 'react';
import { Grid, Typography, Box } from "@mui/material";
import { useLocation } from 'react-router-dom';

export const RecentMenuDetails = () => {
  const location = useLocation();
  const recentList = location.state?.categoryDetails;
  console.log(recentList, 'recentList')

  return (
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            component="div"
            color="white"
            fontWeight="bold"
            sx={{ flexGrow: 1 }}
          >
            {recentList?.dish || recentList?.category}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          container
          justifyContent="flex-end"
          alignItems="center"
        >
          <img
            src={recentList?.image || 'default-image-path'}
            alt={recentList?.title || 'Dish Image'}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1, padding: 1, marginTop: 1, border: "1px solid #90BE6D", borderRadius: "15px" }}>
        <Box sx={{ backgroundColor: '#1F1D2B', padding: 2, borderRadius: 2, color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Box>
                <Typography sx={{ fontWeight: "bold" }}>Dish</Typography>
                <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Price</Typography>
                <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Category</Typography>
                <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Menu Items</Typography>
                <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Allergens</Typography>
                <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Varients</Typography>
                <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Extras</Typography>
                <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Description</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box>
                <Typography sx={{ color: "#90BE6D", fontWeight: "bold" }}> {recentList?.dish || recentList?.category || 'N/A'}</Typography>
                <Typography sx={{ marginTop: 2, color: "#90BE6D", fontWeight: "bold" }}>{recentList?.price || 'N/A'}</Typography>
                <Typography sx={{ marginTop: 2, color: "#90BE6D", fontWeight: "bold" }}>{recentList?.category || 'N/A'}</Typography>
                <Typography sx={{ marginTop: 2, color: "#90BE6D", fontWeight: "bold" }}>{recentList?.menu_item || 'N/A'}</Typography>
                <Typography sx={{ marginTop: 2, color: "#90BE6D", fontWeight: "bold" }}>{recentList?.allergens || 'N/A'}</Typography>
                <Typography sx={{ marginTop: 2, color: "#90BE6D", fontWeight: "bold" }}>{recentList?.varients || 'N/A'}</Typography>
                <Typography sx={{ marginTop: 2, color: "#90BE6D", fontWeight: "bold" }}>{recentList?.extra || 'N/A'}</Typography>
                <Typography sx={{ marginTop: 2, color: "#90BE6D", fontWeight: "bold" }}>
                  {recentList?.description || 'N/A'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default RecentMenuDetails;
