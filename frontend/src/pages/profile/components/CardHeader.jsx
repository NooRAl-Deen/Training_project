import { Typography, Box } from "@profile/utils/shared";

const CardHeader = ({ title, headerStyle, actionButton, cancelButton, buttonContainerStyle }) => {
  return (
    <Box sx={headerStyle}>
      <Typography variant="h6">{title}</Typography>
      <Box sx={buttonContainerStyle}>
      {actionButton && <Box>{actionButton}</Box>}
      {cancelButton && <Box>{cancelButton}</Box>}
      </Box>
    </Box>
  );
};

export default CardHeader;
