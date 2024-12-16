import styles from "@posts/styles/add-post.module.scss";
import {
  TextField,
  Box,
  Container,
  Avatar,
  Typography,
  Divider,
  LoadingButton,
  useState,
  useForm,
  zodResolver,
  useTranslation,
  POSTS_LOCALE_PATH,
  CloseIcon
} from "@posts/utils/sharedImports";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageUpload from "@posts/components/images-gallery/ImageUpload";
import { useUpdatePost } from "@posts/hooks/hooks";
import ImagesPreview from "@posts/components/images-gallery/ImagesPreview";
import EmojiPicker from "emoji-picker-react";
import postSchema from "@posts/utils/post-schema";
import { IconButton } from "@mui/material";
import usePosts from "@posts/hooks/usePosts";
import convertToFiles from "@posts/utils/convertImages";
import { useEffect } from "react";

const EditPost = ({ user, post }) => {
  const [images, setImages] = useState([]);
  const {closeEdit} = usePosts();
  const [openUpload, setOpenUpload] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { t } = useTranslation(POSTS_LOCALE_PATH);
  const { mutate, isLoading, isPending, errors: api } = useUpdatePost(post.id, () => {
    reset();
    setImages([]);
    if(openUpload) {
      handleToggleUpload();
    }
    closeEdit()
  });

  useEffect(() => {
    console.log("post.images:", post.images);
    const convert = async () => {
      const filesArray = await convertToFiles(post.images);
      setImages(filesArray);
    }
    convert()
    console.log(images)
  }, [])

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(postSchema),
    defaultValues: {
      description: post.description || "",
      images: [],
    },
  });

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setValue("images", updatedImages);
  };

  const onEmojiClick = (emoji) => {
    const str = getValues("description") + emoji.emoji;
    setValue("description", str);
  };

  const handleToggleUpload = () => {
    setOpenUpload(!openUpload);
    if (showEmojiPicker) setShowEmojiPicker(false);
  };

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
    if (openUpload) setOpenUpload(false);
  };

  const onUpdate = (updated) => {
    const postData = new FormData();
    postData.append("description", updated.description);
    console.log(images)
    images.forEach((img) => postData.append(`files[]`, img.file));
    console.log("Form data:", post);
    mutate(postData);
  };

  return (
    <Container>
      <span>{errors?.description?.message}</span>
      <span>{errors?.images?.message}</span>
      <Box className={styles.addPostContainer}>
        <Box className={styles.addPostHeader}>
          <Box className={styles.addPostHeader}>
          <Avatar
            src={`${import.meta.env.VITE_SERVER_URL}/${user?.profilePic}`}
            className={styles.userImage}
          ></Avatar>
          <Box className={styles.userDetails}>
            <Typography className={styles.userName}>
              {user?.username}
            </Typography>
            {/* <Typography className={styles.role}>{user.roles[0]}</Typography> */}
          </Box>
          </Box>
          <IconButton onClick={closeEdit}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider className={styles.divider}></Divider>
        <Box className={styles.postContainer}>
          <TextField
            className={styles.postDescription}
            placeholder={`${t("edit_post.placeholder")} ${user?.username} ?`}
            multiline
            rows={5}
            {...register("description")}
            slotProps={{
              input: {
                sx: {
                  border: "none",
                  outline: "none",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&:focus .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
              },
            }}
          ></TextField>
        </Box>
        <Box className={styles.postActions}>
          <Box className={styles.leftActions}>
            <InsertPhotoIcon
              className={styles.leftActionsIcon}
              onClick={handleToggleUpload}
            />
            <EmojiEmotionsIcon
              onClick={handleToggleEmojiPicker}
              className={styles.leftActionsIcon}
            />
          </Box>
          <Box className={styles.rightActions}>
            <LoadingButton
              loadingPosition="start"
              loading={isPending}
              startIcon={<AddOutlinedIcon sx={{ mr: 0.5, fontSize: "20px" }} />}
              onClick={handleSubmit(onUpdate)}
              className={styles.postButton}
            >
              {t("edit_post.update_btn")}
            </LoadingButton>
          </Box>
        </Box>
        {showEmojiPicker ? (
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            className={styles.emojiPicker}
            width="100%"
          />
        ) : (
          ""
        )}

        {openUpload ? (
          <>
            <ImageUpload
              setImages={setImages}
              setValue={setValue}
              onClose={handleToggleUpload}
            />
            <ImagesPreview
              images={images}
              handleRemoveImage={handleRemoveImage}
            />
          </>
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
};

export default EditPost;
