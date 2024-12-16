import React from "react";
import styles from "@styles/profile-activity/profile-activity.module.scss";
import { Box, Typography } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import MessageIcon from "@mui/icons-material/Message";
import ShareIcon from "@mui/icons-material/Share";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { useProfileActivity } from "./hooks/profile-activity";
const ProfileActivity = () => {
  const { data: activity, isLoading } = useProfileActivity();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Box className={styles.profileActivity}>
      <Box className={styles.profileActivityHeader}>
        <LocalActivityIcon className={styles.profileActivityHeaderIcon} />
        <Typography className={styles.title}>Profile Activity</Typography>
      </Box>

      <Box className={styles.activities}>
        <Box className={styles.activity}>
          <ThumbUpOffAltIcon className={styles.activityIcon} />
          <Typography className={styles.text}>
            {activity?.likes_count} liked your posts
          </Typography>
        </Box>
        <Box className={styles.activity}>
          <MessageIcon className={styles.activityIcon} />
          <Typography className={styles.text}>
            {activity?.comments_count} commented on your posts
          </Typography>
        </Box>
        <Box className={styles.activity}>
          <ShareIcon className={styles.activityIcon} />
          <Typography className={styles.text}>+10 shared your posts</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileActivity;
