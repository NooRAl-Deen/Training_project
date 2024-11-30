import { Card, Box } from "@profile/utils/shared";
import {
  cardStyle,
  boxHeaderStyle,
  secondaryTextStyle,
  statsBoxStyle,
  cardItemStyle,
  smallAvatarStyle,
} from "@profile/styles/style";

import PostAddIcon from "@mui/icons-material/PostAdd";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import CustomCard from "./CustomCard";
import CardHeader from "./CardHeader";

const UserStatisticsCard = ({ t, postCount, registrationDays, age }) => {
  return (
    <Card sx={cardStyle}>
      <CardHeader title={t("statics.title")} headerStyle={boxHeaderStyle} />
      <Box sx={statsBoxStyle}>
        <CustomCard
          cardStyle={cardItemStyle}
          icon={PersonIcon}
          textStyle={secondaryTextStyle}
          iconStyle={smallAvatarStyle}
          title={t("statics.age")}
          description={age.toString() + t("statics.years")}
        />
        <CustomCard
          cardStyle={cardItemStyle}
          icon={PostAddIcon}
          textStyle={secondaryTextStyle}
          iconStyle={smallAvatarStyle}
          title={t("statics.number_of_posts")}
          description={postCount.toString() + t("statics.posts")}
        />
        <CustomCard
          cardStyle={cardItemStyle}
          icon={CalendarTodayIcon}
          textStyle={secondaryTextStyle}
          iconStyle={smallAvatarStyle}
          title={t("statics.days_from_registration_date")}
          description={registrationDays.toString() + t("statics.days")}
        />
      </Box>
    </Card>
  );
};

export default UserStatisticsCard;
