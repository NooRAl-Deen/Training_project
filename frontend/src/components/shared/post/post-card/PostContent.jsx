import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ImageModal from "@posts/components/images-gallery/ImageModal";
import { Box, Typography, useState } from "@posts/utils/sharedImports";
import styles from "@styles/post/post-card/post-content.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Carousel from "react-material-ui-carousel";

const PostContent = ({ post }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCarouselChange = (newIndex) => {
    setCurrentImageIndex(newIndex);
  };

  const next = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex + 1 < post.images.length ? prevIndex + 1 : 0
    );
  };

  const previous = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : post.images.length - 1
    );
  };
  return (
    <>
      <CardContent className={styles.content}>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardMedia component="div">
        {post.images.length > 0 ? (
          <Carousel
            autoPlay={false}
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
          >
            {post.images.map((img, index) => (
              <Box
                key={index}
                sx={{ position: "relative", width: "100%", height: "100%" }}
              >
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}/${img}`}
                  alt={`Post Image ${index + 1}`}
                  className={styles.carouselImage}
                />
              </Box>
            ))}
          </Carousel>
        ) : null}
      </CardMedia>
    </>
  );
};

export default PostContent;
