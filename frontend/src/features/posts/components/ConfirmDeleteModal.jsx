import styles from "@posts/styles/confirm-delete-modal.module.scss";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import {
  CloseIcon,
  Box,
  Modal,
  IconButton,
  Typography,
  useTranslation,
  POSTS_LOCALE_PATH,
  LoadingButton,
} from "@posts/utils/sharedImports";
import usePosts from "@posts/hooks/usePosts";

const ConfirmDeleteModal = ({ post, open, onClose }) => {
  const { deleteUserPost, waitDeletePost } = usePosts();
  const { t } = useTranslation(POSTS_LOCALE_PATH);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.confirmContainer}>
        <Box className={styles.boxDialog}>
          <Box className={styles.boxDialogHeader}>
            <Typography className={styles.title}>
              {t("confirm_delete_modal.modal_title")}
            </Typography>
            <CloseIcon className={styles.close} onClick={onClose} />
          </Box>
          <Box className={styles.boxDialogContent}>
            <DeleteOutlineIcon className={styles.boxDialogContentIcon} />
            <Box className={styles.boxDialogContentText}>
              <Typography className={styles.titleText}>
                {t("confirm_delete_modal.title_text")}
              </Typography>
              <Typography className={styles.bodyText}>
                {t("confirm_delete_modal.message")}
              </Typography>
            </Box>
          </Box>
          <Box className={styles.boxDialogActions}>
            <IconButton
              onClick={onClose}
              className={`${styles.boxDialogActionsIcon} ${styles.cancel}`}
            >
              <CloseIcon /> {t("confirm_delete_modal.cancel_btn")}
            </IconButton>
            <LoadingButton
              loadingPosition="start"
              className={`${styles.boxDialogActionsIcon} ${styles.confirm}`}
              startIcon={<DeleteOutlineIcon />}
              loading={waitDeletePost}
              onClick={() => {
                deleteUserPost(post);
              }}
            >
              {t("confirm_delete_modal.confirm_btn")}
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;
