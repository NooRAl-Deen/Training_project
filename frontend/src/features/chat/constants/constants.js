export const CONVERSATIONS_URL = '/conversation'
export const CONVERSATIONS_KEY = ['get', 'conversations']
export const CONVERSATION_MESSAGES_URL = (id) => `/conversation/${id}`
export const CONVERSATION_MESSAGES_KEY = (id) => ['get', 'messages', id]
export const SEND_MESSAGE_URL = '/message'
export const SEND_MESSAGE_KEY = ['post', 'message']
