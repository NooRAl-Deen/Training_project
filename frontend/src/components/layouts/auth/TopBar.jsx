import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import useThemeCustom from "@/hooks/useTheme";

function TopBar() {
  const { setMode } = useThemeCustom();
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            color: theme.palette.text.primary,
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Logo
          </Link>
        </Typography>

        {!isMobile && (
          <Box sx={{ display: "flex", gap: 2, marginRight: "auto" }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ color: theme.palette.text.primary }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/about"
              sx={{ color: theme.palette.text.primary }}
            >
              About
            </Button>
          </Box>
        )}

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            Login
          </Button>

          <Button
            variant="outlined"
            component={Link}
            to="/register"
            sx={{
              ml: 1,
              color: theme.palette.secondary.main,
              borderColor: theme.palette.secondary.main,
              "&:hover": {
                borderColor: theme.palette.secondary.dark,
                color: theme.palette.secondary.dark,
              },
            }}
          >
            Signup
          </Button>

          <IconButton
            color="inherit"
            onClick={() => {
              const newMode = theme.palette.mode === "light" ? "dark" : "light";
              localStorage.setItem("currentMode", newMode);
              setMode(newMode);
            }}
            sx={{ ml: 1 }}
          >
            {theme.palette.mode === "light" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>

          {isMobile && (
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
