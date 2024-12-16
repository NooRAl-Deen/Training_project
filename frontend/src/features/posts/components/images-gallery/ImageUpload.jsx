import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import styles from "@posts/styles/image-upload.module.scss";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  CloseIcon,
  useTranslation,
  POSTS_LOCALE_PATH,
  useState,
} from "@posts/utils/sharedImports";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const ImageUpload = ({ setImages, setValue, onClose }) => {
  const { t } = useTranslation(POSTS_LOCALE_PATH);
  const [errorMessage, setErrorMessage] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const imageFiles = acceptedFiles.filter((file) => isValidImage(file));

    if (imageFiles?.length) {
      const newImages = imageFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prev) => {
        const updatedImages = [...prev, ...newImages];
        setValue("images", updatedImages);
        return updatedImages;
      });
      setErrorMessage("");
    } else {
      setErrorMessage("not accepted");
    }
  }, []);

  const isValidImage = (file) => {
    return (
      file &&
      ALLOWED_IMAGE_TYPES.includes(file.type) &&
      file.size <= MAX_IMAGE_SIZE
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ALLOWED_IMAGE_TYPES.reduce((obj, type) => {
      obj[type] = [];
      return obj;
    }, {}),
  });

  return (
    <Box className={styles.imageUploadBox}>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <CloseIcon onClick={onClose} className={styles.close} />
      <Box className={styles.imageUploadContainer} {...getRootProps()}>
        <AddAPhotoIcon className={styles.uploadIcon} />
        <Typography className={styles.uploadText}>
          {isDragActive
            ? t("image_upload.drag_active_msg")
            : t("image_upload.drag_inactive_msg")}
        </Typography>
        <input
          className={styles.uploadInput}
          type="file"
          multiple
          accept=".png, .jpg, .jpeg"
          {...getInputProps()}
        />
      </Box>
    </Box>
  );
};

export default ImageUpload;
