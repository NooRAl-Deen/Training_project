import LoadingButton from "@mui/lab/LoadingButton";

const CustomLoadingButton = ({ status, icon: Icon, onClick, text, styles }) => {
  return (
    <LoadingButton
      variant="contained"
      color="primary"
      loading={status}
      loadingPosition="start"
      startIcon={<Icon sx={{ mr: 0.5, fontSize: "20px" }} />}
      onClick={onClick}
      sx={styles}
    >
      {text}
    </LoadingButton>
  );
};

export default CustomLoadingButton;
