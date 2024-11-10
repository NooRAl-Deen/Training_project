import React from "react";
import TopBar from "../auth/TopBar";
import { Outlet } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
const AppLayout = () => {
  return (
    <>
      <Box >
        <CssBaseline />
        <TopBar
        />
        <Box component="main">
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default AppLayout;
