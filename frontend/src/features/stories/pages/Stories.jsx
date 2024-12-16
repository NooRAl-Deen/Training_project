import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../styles/stories.module.scss";
import Carousel from "react-material-ui-carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Avatar, Box, Typography } from "@mui/material";


const Stories = () => {
  const stories = [
    { id: 1, username: "test1", avatar: "https://mighty.tools/mockmind-api/content/human/76.jpg" },
    { id: 2, username: "test2", avatar: "https://mighty.tools/mockmind-api/content/human/61.jpg" },
    { id: 3, username: "test3", avatar: "https://mighty.tools/mockmind-api/content/human/72.jpg" },
    { id: 4, username: "test4", avatar: "https://mighty.tools/mockmind-api/content/human/75.jpg" },
    { id: 5, username: "test5", avatar: "https://mighty.tools/mockmind-api/content/human/49.jpg" },
    { id: 6, username: "test6", avatar: "https://mighty.tools/mockmind-api/content/human/43.jpg" },
    { id: 7, username: "test7", avatar: "https://mighty.tools/mockmind-api/content/human/8.jpg" },
    { id: 8, username: "test8", avatar: "https://mighty.tools/mockmind-api/content/human/62.jpg" },
    { id: 9, username: "test9", avatar: "https://mighty.tools/mockmind-api/content/human/60.jpg" },
    { id: 10, username: "test10", avatar: "https://mighty.tools/mockmind-api/content/human/7.jpg" },
    { id: 11, username: "test11", avatar: "https://mighty.tools/mockmind-api/content/human/68.jpg" },
    { id: 12, username: "test12", avatar: "https://mighty.tools/mockmind-api/content/human/5.jpg" },
  ];

  const containerRef = useRef(null);
  const [storyGroups, setStoryGroups] = useState([]);

  const calculateStoryGroups = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const storyWidth = 80; 
      const itemsPerGroup = Math.floor(containerWidth / storyWidth);

      const newStoryGroups = [];
      for (let i = 0; i < stories.length; i += itemsPerGroup) {
        newStoryGroups.push(stories.slice(i, i + itemsPerGroup));
      }
      setStoryGroups(newStoryGroups);
    }
  }, [stories]);

  useEffect(()=>{
    calculateStoryGroups()
  }, [])



  return (
    <Box className={styles.storiesSection} ref={containerRef}>
    <Carousel
      autoPlay={false}
      indicators={false}
      cycleNavigation={true}
      navButtonsAlwaysInvisible={true}
      navButtonsWrapperProps={{
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginInline: -30,
          zIndex: 99,
        },
      }}
      className={styles.carousel}
      NavButton={({ onClick, className, next }) => (
        <IconButton
          onClick={onClick}
          className={`${className} ${styles.navButton} ${
            next ? styles.nextButton : styles.prevButton
          }`}
        >
          {next ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
        </IconButton>
      )}
    >
      {storyGroups.map((group, index) => (
        <Box key={index} className={styles.storyGroup}>
          {group.map((story) => (
            <Box key={story.id} className={styles.story}>
              <Box className={styles.imageWrapper}>
                <Avatar className={styles.userImage} src={story.avatar} />
              </Box>
              <Typography className={styles.username}>
                {story.username}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Carousel>
    </Box>
  );
};

export default Stories;
