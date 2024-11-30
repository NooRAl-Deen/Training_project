import styles from "../styles/edit-comment.module.scss";
import useAuth from "@/hooks/useAuth";
import { Avatar, Box, InputBase } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import { useUpdateComment } from "../hooks/comment";


const EditComment = ({ comment, setEditComment }) => {

  const { user } = useAuth();
  const { mutate } = useUpdateComment(() => setEditComment())

  const { register, handleSubmit } = useForm({
    defaultValues: {
      text: comment?.text,
    },
  });

  const onEditComment = (commentData) => {
    const postId = comment.post_id
    const commentId = comment.id;
    mutate({ postId, commentId, commentData });
    // setEditComment(false)
  };

  const handleEnterEditComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onEditComment)();
    }
  };

  return (
    <Box className={styles.comment}>
      <Box className={styles.left}>
        <Avatar
          src={`${import.meta.env.VITE_SERVER_URL}/${user?.profilePic}`}
          className={styles.avatar}
        ></Avatar>
        <Box className={styles.searchForm}>
          <InputBase
            className={styles.inputBase}
            placeholder="Write your comment"
            inputProps={{ "aria-label": "Write your comment" }}
            defaultValue={comment?.text || ""}
            {...register("text")}
            onKeyDown={handleEnterEditComment}
            autoComplete="off"
          />
        </Box>
      </Box>
      <Box className={styles.right}>
        <IconButton className={styles.button}>
          <AttachFileIcon className={styles.attach} />
        </IconButton>
        <IconButton className={styles.button}>
          <EmojiEmotionsIcon className={styles.emoji} />
        </IconButton>
        <IconButton
          className={styles.button}
          onClick={handleSubmit(onEditComment)}
        >
          <SendIcon className={styles.send} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default EditComment;
