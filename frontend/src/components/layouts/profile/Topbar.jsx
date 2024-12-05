import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import useAuth from "@/hooks/useAuth";
import { useLogout } from "@profile/hooks/hooks";
import { replace, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const settings = ["Logout"];

const TopBar = ({ open, handleDrawerOpen, setMode }) => {
  const { logout } = useAuth();
  const navigate = useNavigate()
  const { mutate } = useLogout(() => {
    logout();
    navigate('/login', { replace: true });
  });
  
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting) => {
    switch (setting) {
      case "Logout":
        mutate(); 
        break;
      default:
        break;
    }
    setAnchorElUser(null); 
  };
  
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              marginRight: 5,
            },
            open && { display: "none" },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}></Box>
        <Box sx={{ flexGrow: 0 }}>
          <Stack direction="row">
            <IconButton
              color="inherit"
              onClick={() => {
                const newMode =
                  theme.palette.mode === "light" ? "dark" : "light";
                localStorage.setItem("currentMode", newMode);
                setMode(newMode);
              }}
            >
              {theme.palette.mode === "light" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>

            <IconButton color="inherit">
              <NotificationsOutlinedIcon />
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton color="inherit" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <ExpandCircleDownIcon fontSize="large"/>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
