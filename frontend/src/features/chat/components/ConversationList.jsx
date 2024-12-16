import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";

import { useUserConversations } from "../hooks/chat";

import useSocket from "@/hooks/useSocket";

const ConversationList = ({ setActiveConversation }) => {
  const { data: conversations, isLoading } = useUserConversations();

  const { onlineUsers } = useSocket();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <List>
      {conversations?.conversations?.map((conversation) =>
        conversation.conversation_members.map((member) => (
          <ListItem
            key={`${conversation.id}-${member.username}`}
            onClick={() => setActiveConversation(conversation.id)}
          >
            <ListItemAvatar>
              <Avatar
                src={`${import.meta.env.VITE_SERVER_URL}/${
                  member?.profile_pic
                }`}
                alt={member.username}
              />
            </ListItemAvatar>
            <ListItemText
              primary={member.username}
              secondary={
                onlineUsers.find((user) => user.userId === member.id)
                  ? "online"
                  : "offline"
              }
              secondaryTypographyProps={{
                sx: {
                  color: onlineUsers.find((user) => user.userId === member.id)
                    ? "success.main"
                    : "text.secondary",
                },
              }}
            />
          </ListItem>
        ))
      )}
    </List>
  );
};

export default ConversationList;
