import { Route } from "react-router-dom";
import { lazy } from "react";
import Chat from '../features/chat/pages/Chat'


const ChatRoutes = () => {
  return (
    <>
      <Route path="/chat" element={<Chat />} />
    </>
  );
};

export default ChatRoutes;