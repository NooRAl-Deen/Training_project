import { axiosPrivate } from "@/api/Axios"
import { CONVERSATIONS_URL, CONVERSATION_MESSAGES_URL, SEND_MESSAGE_URL } from '../constants/constants'

export const getUserConversations = async () => {
    const { data } = await axiosPrivate.get(CONVERSATIONS_URL)
    return data
}

export const getConversationMessages = async (id) => {
    const url = CONVERSATION_MESSAGES_URL(id)
    const { data } = await axiosPrivate.get(url)
    return data
}

export const sendMessage = async (message) => {
    const { data } = await axiosPrivate.post(SEND_MESSAGE_URL, message)
    return data
}