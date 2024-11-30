import styles from "@posts/styles/image-modal.module.scss";
import Modal from "@mui/material/Modal";
import {
  Box,
  CloseIcon,
  ChevronRightIcon,
  Typography,
  ChevronLeftIcon,
} from "@posts/utils/sharedImports";

const ImageModal = ({
  open,
  handleClose,
  images,
  current,
  onNext,
  onPrevious,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modalStyles}>
        <CloseIcon className={styles.close} onClick={handleClose} />
        <img
          className={styles.modalImg}
          src={`${import.meta.env.VITE_SERVER_URL}/${images[current]}`}
          alt=""
        />
        {images?.length > 1 ? (
          <>
            <Box className={styles.modalNavigation}>
              <ChevronLeftIcon
                className={styles.navigationIcon}
                onClick={onPrevious}
              />
              <ChevronRightIcon
                className={styles.navigationIcon}
                onClick={onNext}
              />
            </Box>
            <Box className={styles.caption}>
              <Typography>
                {current + 1} / {images?.length}
              </Typography>
            </Box>
          </>
        ) : (
          ""
        )}
      </Box>
    </Modal>
  );
};

export default ImageModal;
