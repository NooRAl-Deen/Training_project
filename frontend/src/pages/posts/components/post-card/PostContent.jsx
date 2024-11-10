import { Box, Typography, useState } from "@posts/utils/sharedImports";
import styles from "@posts/styles/post-card/post-content.module.scss";
import Carousel from "react-material-ui-carousel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ImageModal from "@posts/components/images-gallery/ImageModal";

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
    <Box className={styles.postContent}>
      <Typography className={styles.bodyContentText}>
        {post?.description}
      </Typography>

      {post.images?.length ? (
        <Carousel
          autoPlay={false}
          indicators={true}
          navButtonsAlwaysVisible={true}
          cycleNavigation={true}
          stopAutoPlayOnHover={false}
          onChange={handleCarouselChange}
          navButtonsProps={{
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "50%",
            },
          }}
        >
          {post.images.map((img, index) => (
            <div key={index} className={styles.carouselItem}>
              <LazyLoadImage
                src={`${import.meta.env.VITE_SERVER_URL}/${img}`}
                alt={`Image ${index + 1}`}
                onClick={openModal}
                className={styles.bodyContentImage}
              
              />
            </div>
          ))}
        </Carousel>
      ) : null}

      <ImageModal
        open={isModalOpen}
        handleClose={closeModal}
        images={post.images}
        current={currentImageIndex}
        onNext={next}
        onPrevious={previous}
      />
    </Box>
  );
};

export default PostContent;
