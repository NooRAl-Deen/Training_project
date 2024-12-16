import React from "react";
import { CssBaseline, Grid, Paper, Box, Typography } from "@mui/material";
import image from "@/assets/back.jpg";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

const AuthLayout = () => {
  return (
    <>
      <TopBar />
      <CssBaseline />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          md={6}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: 400,
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Welcome Back
            </Typography>
            <Outlet />
          </Box>
        </Grid>

        <Grid
          item
          xs={false}
          md={6}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      </Grid>
    </>
  );
};

export default AuthLayout;
