import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const Spinner = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "rgba(0%, 0%, 0%, 85%)", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999, 
      }}
    >
      <CircularProgress size={150} /> 
    </Box>
  );
};

export default Spinner;
