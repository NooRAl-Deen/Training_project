import { Skeleton, Card, Box } from "@mui/material";
import {
  cardStyle,
  boxHeaderStyle,
  avatarBoxStyle,
  employeeInfoStyle,
  detailBoxStyle,
  cardItemStyle,
  statsBoxStyle,
} from "@/pages/profile/styles/style";

const ProfileSkeletonLoader = () => {
  return (
    <Card sx={cardStyle}>
      <Box sx={boxHeaderStyle}>
        <Skeleton variant="text" width="60%" height={30} />
        <Skeleton variant="rectangular" width={100} height={36} />
      </Box>

      <Box sx={avatarBoxStyle}>
        <Skeleton variant="circular" width={80} height={80} />
        <Box sx={employeeInfoStyle}>
          <Skeleton variant="text" width="40%" height={30} />
          <Box sx={detailBoxStyle}>
            <Skeleton variant="text" width="20%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="20%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="20%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
          </Box>
        </Box>
      </Box>

      <Box sx={statsBoxStyle}>
        {[...Array(4)].map((_, index) => (
          <Card sx={cardItemStyle} key={index}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box>
              <Skeleton variant="text" width="20%" height={30} />
              <Skeleton variant="text" width="80%" height={20} />
            </Box>
          </Card>
        ))}
      </Box>
    </Card>
  );
};

export default ProfileSkeletonLoader;
