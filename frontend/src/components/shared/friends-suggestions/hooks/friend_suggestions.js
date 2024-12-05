import { useQuery } from "@tanstack/react-query"
import { FRIEND_SUGGESTIONS_KEY } from "../constants/constants"
import { getFriendSuggestions } from "../services/friend_suggestions"

export const useFriendSuggestions = () => {
    return useQuery({
        queryKey: FRIEND_SUGGESTIONS_KEY,
        queryFn: () => getFriendSuggestions()
    })
}