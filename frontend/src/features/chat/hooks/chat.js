import { useQuery, useMutation } from "@tanstack/react-query";
import { CONVERSATIONS_KEY, CONVERSATION_MESSAGES_KEY, SEND_MESSAGE_KEY } from "../constants/constants";
import { getUserConversations, getConversationMessages, sendMessage } from "../services/chat";

export const useUserConversations = () => {
  return useQuery({
    queryKey: CONVERSATIONS_KEY,
    queryFn: () => getUserConversations()
  });
};


export const useConversationMessages = (id) => {
  return useQuery({
    queryKey: CONVERSATION_MESSAGES_KEY(id),
    queryFn: () => getConversationMessages(id)
  })
}


export const useSendMessage = () => {
  return useMutation({
    mutationKey: SEND_MESSAGE_KEY,
    mutationFn: (message) => sendMessage(message)
  })
}
