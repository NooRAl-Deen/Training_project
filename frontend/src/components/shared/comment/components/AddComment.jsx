import { Avatar, Box, InputBase } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import styles from "../styles/add-comment.module.scss";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { useCreateComment } from "../hooks/comment";

const AddComment = ({ post }) => {
  const { user } = useAuth();
  const { mutate } = useCreateComment(post.id, () => reset());
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      text: "",
    },
  });

  const onAddComment = (comment) => {
    mutate(comment);
  };

  const handleEnterComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onAddComment)();
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
            {...register("text")}
            onKeyDown={handleEnterComment}
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
          onClick={handleSubmit(onAddComment)}
        >
          <SendIcon className={styles.send} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AddComment;
