import styles from "@posts/styles/images-preview.module.scss";
import { Box, CloseIcon } from "@posts/utils/sharedImports";

const ImagesPreview = ({ images, handleRemoveImage }) => {
  return (
    <Box className={styles.imagesPreviewContainer}>
      {images?.map((img, index) => (
        <Box key={index} className={styles.imagesPreview}>
          <img
            className={styles.img}
            src={img.preview}
            alt={`Preview ${index}`}
          />
          <CloseIcon
            className={styles.closeButton}
            onClick={() => handleRemoveImage(index)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ImagesPreview;
