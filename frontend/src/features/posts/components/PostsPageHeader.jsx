import React from "react";
import styles from "../styles/posts-page-header.module.scss";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const PostsPageHeader = () => (
  <>
    <Paper component="form" className={styles.searchForm}>
      <InputBase
        className={styles.inputBase}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton
        type="button"
        className={styles.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      className={styles.addButton}
    >
      <span className={styles.buttonText}>Add New Post</span>
    </Button>
  </>
);

export default PostsPageHeader;
