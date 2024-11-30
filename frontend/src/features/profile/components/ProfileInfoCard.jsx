import LocationCityIcon from "@mui/icons-material/LocationCity";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import CakeIcon from "@mui/icons-material/Cake";
import EditIcon from "@mui/icons-material/Edit";
import TodayIcon from "@mui/icons-material/Today";
import dayjs from "dayjs";
import { Card, Typography, Box, Avatar, Button } from "@profile/utils/shared";
import {
  cardStyle,
  boxHeaderStyle,
  avatarBoxStyle,
  employeeInfoStyle,
  avatarStyle,
  detailBoxStyle,
  secondaryTextStyle,
  statsBoxStyle,
  cardItemStyle,
  smallAvatarStyle,
} from "@profile/styles/style";
import CustomCard from "./CustomCard";
import CardHeader from "./CardHeader";
const ProfileInfoCard = ({ t, data, handleEditClick }) => {
  return (
    <>
      <Card sx={cardStyle}>
        <CardHeader
          title={t("profile.card_title")}
          headerStyle={boxHeaderStyle}
          actionButton={
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
            >
              <EditIcon sx={{ mr: 0.5, fontSize: "20px" }} />
              edit
            </Button>
          }
        />
        <Box sx={avatarBoxStyle}>
          <Box>
            <Avatar
              src={`${import.meta.env.VITE_SERVER_URL}/${
                data?.user?.profilePic
              }`}
              sx={avatarStyle}
            ></Avatar>
          </Box>
          <Box sx={employeeInfoStyle}>
            <Box>
              <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                {data?.user?.username}
              </Typography>
            </Box>

            <Box sx={detailBoxStyle}>
              <Box>
                <Typography variant="span" sx={secondaryTextStyle}>
                  {t("profile.role")}
                </Typography>
                <Typography>{data?.user?.roles[0].name}</Typography>
              </Box>
              <Box>
                <Typography variant="span" sx={secondaryTextStyle}>
                  {t("profile.phone_number")}
                </Typography>
                <Typography>{data?.user?.phoneNumber}</Typography>
              </Box>
              <Box>
                <Typography variant="span" sx={secondaryTextStyle}>
                  {t("profile.email")}
                </Typography>
                <Typography>{data?.user?.email}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={statsBoxStyle}>
          <CustomCard
            cardStyle={cardItemStyle}
            icon={LocationCityIcon}
            textStyle={secondaryTextStyle}
            iconStyle={smallAvatarStyle}
            title={t("profile.city")}
            description={data?.user?.city}
          />

          <CustomCard
            cardStyle={cardItemStyle}
            icon={CakeIcon}
            textStyle={secondaryTextStyle}
            iconStyle={smallAvatarStyle}
            title={t("profile.date_of_birth")}
            description={data?.user?.dob}
          />

          <CustomCard
            cardStyle={cardItemStyle}
            icon={data?.user?.gender == "female" ? FemaleIcon : MaleIcon}
            textStyle={secondaryTextStyle}
            iconStyle={smallAvatarStyle}
            title={t("profile.gender")}
            description={data?.user?.gender}
          />
          <CustomCard
            cardStyle={cardItemStyle}
            icon={TodayIcon}
            textStyle={secondaryTextStyle}
            iconStyle={smallAvatarStyle}
            title={t("profile.join_date")}
            description={dayjs(data?.user?.createdAt).format("YYYY-MM-DD")}
          />
        </Box>
      </Card>
    </>
  );
};

export default ProfileInfoCard;
