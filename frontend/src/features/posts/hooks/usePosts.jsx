import { useContext } from "react"
import { PostsContext } from "../contexts/PostsContext"


const usePosts = () => {
  return useContext(PostsContext);
}

export default usePosts
