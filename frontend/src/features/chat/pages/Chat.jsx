import { useState } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";

import styles from "../styles/chat.module.scss";
import ConversationContent from "../components/ConversationContent";
import ConversationList from "../components/ConversationList";

const Chat = () => {
  const [activeConversation, setActiveConversation] = useState(null);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{ height: "85vh", overflow: "auto" }}>
            <ConversationList setActiveConversation={setActiveConversation} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={styles.styledPaper} elevation={3}>
            {activeConversation ? (
              <>
                <ConversationContent id={activeConversation} />
              </>
            ) : (
              <Box className={styles.notSlectedConversation}>
                <Typography>Select a conversation.</Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
