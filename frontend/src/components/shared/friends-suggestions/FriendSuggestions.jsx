import React from "react";
import styles from "@styles/friends-suggestions/friend-suggestions.module.scss";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import image from "@/assets/back.jpg";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";

const FriendSuggestions = () => (
  <Box className={styles.friendSuggestions}>
    <Box className={styles.friendSuggestionsHeader}>
      <GroupAddOutlinedIcon className={styles.friendSuggestionsHeaderIcon} />
      <Typography className={styles.title}>Friend Suggestions</Typography>
    </Box>
    <Box>
      {[
      { name: "Julia Smith", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
      { name: "Vermillion D. Gray", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
      { name: "Mai Senpai", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
      { name: "Azunyan U. Wu", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
      { name: "Oarack Babama", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    ].map((friend, index) => (
        <Box key={index}>
          <Divider className={styles.divider} />
          <Box className={styles.suggestion}>
            <Box className={styles.person}>
              <Avatar src={friend.avatar} alt="" />
              <Typography>{friend.name}</Typography>
            </Box>
            <Button className={styles.addButton}>follow</Button>
          </Box>
        </Box>
      ))}
      <Divider className={styles.divider} />
    </Box>
  </Box>
);

export default FriendSuggestions;
