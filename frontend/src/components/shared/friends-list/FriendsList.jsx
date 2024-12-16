import React from "react";
import styles from "@styles/friends-list/friends-list.module.scss";
import { Box, Avatar, Typography } from "@mui/material";
import image from "@/assets/back.jpg";
import { List } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
const FriendsList = () => {
  const friends = [
    { name: "John Doe", avatar: "https://mighty.tools/mockmind-api/content/human/25.jpg" },
    { name: "Jane Smith", avatar: "https://mighty.tools/mockmind-api/content/human/54.jpg" },
    { name: "Alice Johnson", avatar: "https://mighty.tools/mockmind-api/content/human/1.jpg" },
    { name: "Bob Brown", avatar: "https://mighty.tools/mockmind-api/content/human/28.jpg" },
    { name: "Charlie Davis", avatar: "https://mighty.tools/mockmind-api/content/human/23.jpg" },
    { name: "David Wilson", avatar: "https://mighty.tools/mockmind-api/content/human/71.jpg" },
    { name: "Emily Clark", avatar: "https://mighty.tools/mockmind-api/content/cartoon/27.jpg" },
    { name: "Frank Miller", avatar: "https://mighty.tools/mockmind-api/content/cartoon/5.jpg" },
    { name: "Grace Lee", avatar: "https://mighty.tools/mockmind-api/content/human/4.jpg" },
    { name: "Hannah Martinez", avatar: "https://mighty.tools/mockmind-api/content/human/2.jpg" },
    { name: "Hannah Martinez", avatar: "https://mighty.tools/mockmind-api/content/human/59.jpg" },
    { name: "Hannah Martinez", avatar: "https://mighty.tools/mockmind-api/content/human/42.jpg" },
    { name: "Hannah Martinez", avatar: "https://mighty.tools/mockmind-api/content/human/67.jpg" },
    { name: "Hannah Martinez", avatar: "https://mighty.tools/mockmind-api/content/human/55.jpg" },
    { name: "Hannah Martinez", avatar: "https://mighty.tools/mockmind-api/content/human/52.jpg" },
    { name: "Hannah Martinez", avatar: "https://mighty.tools/mockmind-api/content/human/44.jpg" },
    { name: "Hannah Martinez", avatar: "https://mighty.tools/mockmind-api/content/human/17.jpg" },
  ];
  return (
    <Box className={styles.friendsListContainer}>
      <Box className={styles.friendListHeader}>
      <PeopleIcon className={styles.friendListHeaderIcon} />
      <Typography className={styles.title}>
        Friends
      </Typography>
      </Box>
      <Box className={styles.friendsList}>
        {friends.map((friend, index) => (
          <Box key={index} className={styles.friendItem}>
            <Avatar
              src={friend.avatar}
              alt={friend.name}
              className={styles.avatar}
            />
            <Typography variant="body1" className={styles.name}>
              {friend.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FriendsList;
