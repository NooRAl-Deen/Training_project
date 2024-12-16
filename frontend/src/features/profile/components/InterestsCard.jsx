import { Card, Box } from "@profile/utils/shared";

import {
  cardStyle,
  boxHeaderStyle,
  secondaryTextStyle,
  statsBoxStyle,
  cardItemStyle,
  smallAvatarStyle,
} from "@profile/styles/style";

import CodeIcon from "@mui/icons-material/Code";
import PublicIcon from "@mui/icons-material/Public";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CustomCard from "./CustomCard";
import CardHeader from "./CardHeader";

const InterestsCard = ({ t }) => {
  return (
    <Card sx={cardStyle}>
      <CardHeader
        title={t("interests.interests_title")}
        headerStyle={boxHeaderStyle}
      />
      <Box sx={statsBoxStyle}>
        <CustomCard
          cardStyle={cardItemStyle}
          icon={CameraAltIcon}
          textStyle={secondaryTextStyle}
          iconStyle={smallAvatarStyle}
          title={"Photography"}
          description={t("interests.interest_description")}
        />
        <CustomCard
          cardStyle={cardItemStyle}
          icon={PublicIcon}
          textStyle={secondaryTextStyle}
          iconStyle={smallAvatarStyle}
          title={"Traveling"}
          description={t("interests.interest_description")}
        />
        <CustomCard
          cardStyle={cardItemStyle}
          icon={AutoStoriesIcon}
          textStyle={secondaryTextStyle}
          iconStyle={smallAvatarStyle}
          title={"Reading"}
          description={t("interests.interest_description")}
        />
        <CustomCard
          cardStyle={cardItemStyle}
          icon={CodeIcon}
          textStyle={secondaryTextStyle}
          iconStyle={smallAvatarStyle}
          title={"Coding"}
          description={t("interests.interest_description")}
        />
      </Box>
    </Card>
  );
};

export default InterestsCard;
