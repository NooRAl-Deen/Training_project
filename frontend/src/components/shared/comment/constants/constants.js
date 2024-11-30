export const CREATE_COMMENT_KEY = ["comments", "create"]
export const CREATE_COMMENT_URL = (post_id) => `/posts/${post_id}/comments`;
export const GET_COMMENTS_KEY = ["comments", "get"]
export const GET_COMMENTS_URL = (post_id) => `/posts/${post_id}/comments`;
export const UPDATE_COMMENT_KEY = ["comments", "update"]
export const UPDATE_COMMENT_URL = (post_id, comment_id) => `/posts/${post_id}/comments/${comment_id}`;
export const DELETE_COMMENT_KEY = ["comments", "delete"]
export const DELETE_COMMENT_URL = (post_id, comment_id) => `/posts/${post_id}/comments/${comment_id}`;