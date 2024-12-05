import React from "react";
import styles from "@styles/friends-suggestions/friend-suggestions.module.scss";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import { useFriendSuggestions } from "../hooks/friend_suggestions";

const FriendSuggestions = () => {
  const { data, isLoading, isFetched } = useFriendSuggestions();
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isFetched) {
    console.log(data);
  }
  return (
    <Box className={styles.friendSuggestions}>
      <Box className={styles.friendSuggestionsHeader}>
        <GroupAddOutlinedIcon className={styles.friendSuggestionsHeaderIcon} />
        <Typography className={styles.title}>Friend Suggestions</Typography>
      </Box>
      <Box>
        {data.suggested_users.map((friend) => (
          <Box key={friend.id}>
            <Divider className={styles.divider} />
            <Box className={styles.suggestion}>
              <Box className={styles.person}>
                <Avatar
                  src={`${import.meta.env.VITE_SERVER_URL}/${
                    friend?.profilePic
                  }`}
                  alt={friend.username}
                />
                <Typography>{friend.username}</Typography>
              </Box>
              <Button className={styles.addButton}>follow</Button>
            </Box>
          </Box>
        ))}
        <Divider className={styles.divider} />
      </Box>
    </Box>
  );
};

export default FriendSuggestions;
