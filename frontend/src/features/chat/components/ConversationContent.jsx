import { useEffect, useRef, useState } from "react";
import { useConversationMessages, useSendMessage } from "../hooks/chat";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useAuth from "@/hooks/useAuth";
import formatDate from "@/utils/formatDate";
import styles from "../styles/conversation-content.module.scss";
import useSocket from "@/hooks/useSocket";

const ConversationContent = ({ id }) => {
  const [newMessage, setNewMessage] = useState("");
  const { mutate } = useSendMessage();
  const { sendMessage, onMessage } = useSocket();
  const messageEndRef = useRef();
  const { data: messages, isFetched, isLoading } = useConversationMessages(id);
  const { user } = useAuth();
  const [chatMessages, setChatMessages] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState(null);

  useEffect(() => {
    onMessage((data) => {
      console.log("Incoming message:", data);
      setArrivalMessages({
        sender_id: data.senderId,
        text: data.text,
        send_at: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (arrivalMessages) {
      if (
        chatMessages.some((msg) => msg.sender_id === arrivalMessages.sender_id)
      ) {
        console.log("object");
        setChatMessages((prev) => [...prev, arrivalMessages]);
      }
    }
  }, [arrivalMessages]);

  useEffect(() => {
    if (isFetched) {
      setChatMessages(messages?.messages || []);
      console.log(chatMessages);
    }
  }, [isFetched, messages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        text: newMessage,
        conversation_id: id,
      };
      const reciverId = messages?.conversations?.conversation_members?.find(
        (member) => member !== user.id
      );

      sendMessage({
        senderId: user.id,
        reciverId: reciverId.id,
        text: newMessage,
      });

      mutate(message);
      setChatMessages((prev) => [
        ...prev,
        { ...message, sender_id: user.id, send_at: Date.now() },
      ]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box className={styles.messageContainer}>
        {chatMessages.map((message, index) => {
          const isOwnMessage = message.sender_id === user?.id;
          const member = messages?.conversations?.conversation_members.find(
            (m) => m.id === message.sender_id
          );

          return (
            <div
              key={index}
              className={`${styles.message} ${
                isOwnMessage ? styles.own : styles.other
              }`}
            >
              {!isOwnMessage && (
                <Avatar
                  src={`${import.meta.env.VITE_SERVER_URL}/${
                    member?.profile_pic
                  }`}
                  alt={member?.username}
                  sx={{ mr: 1 }}
                />
              )}
              <Paper
                className={`${styles.messageContent} ${
                  isOwnMessage ? styles.own : ""
                }`}
              >
                <Typography variant="subtitle2" color="textSecondary">
                  {isOwnMessage ? user?.username : member?.username}
                </Typography>
                <Typography variant="body1">{message.text}</Typography>
                <Typography className={styles.messageTimestamp}>
                  {formatDate(message.send_at)}
                </Typography>
              </Paper>
              {isOwnMessage && (
                <Avatar
                  src={`${import.meta.env.VITE_SERVER_URL}/${user?.profilePic}`}
                  alt={user?.username}
                  sx={{ ml: 1 }}
                />
              )}
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </Box>
      <Box sx={{ p: 2, backgroundColor: "background.paper" }}>
        <Grid container spacing={2}>
          <Grid item xs>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              size="small"
              autoComplete="off"
            />
          </Grid>
          <Grid item>
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ConversationContent;
