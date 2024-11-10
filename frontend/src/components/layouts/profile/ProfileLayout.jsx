import { Outlet } from "react-router-dom";
import { useState } from "react";
import { CssBaseline, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import useTheme  from "@/hooks/useTheme";



const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const ProfileLayout = () => {
  const { setMode } = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
      
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopBar
          setMode={setMode}
          open={open}
          handleDrawerOpen={handleDrawerOpen}
        />
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
  );
};

export default ProfileLayout;
