import { Card, Typography, Box } from "@profile/utils/shared";

const CustomCard = ({
  icon: Icon,
  title,
  description,
  cardStyle,
  iconStyle,
  textStyle,
}) => {
  return (
    <Card sx={cardStyle}>
      <Icon sx={iconStyle} />
      <Box>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="span" sx={textStyle}>
          {description}
        </Typography>
      </Box>
    </Card>
  );
};

export default CustomCard;
