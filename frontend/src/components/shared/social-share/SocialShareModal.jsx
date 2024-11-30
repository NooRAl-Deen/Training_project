import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookMessengerShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  FacebookMessengerIcon,
  WhatsappIcon,
} from "react-share";
import styles from "@styles/social-share/social-share.module.scss";  

const SocialShareModal = ({ postTitle, open, setOpen, postId }) => {
  const [shareCount, setShareCount] = useState(0);
  const postUrl = `http://127.0.0.1:5173/profile/posts/${postId}`;


  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const incrementShareCount = () => {
    setShareCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className={styles.modalContainer}>
          <Box className={styles.modalHeader}>
            <Typography variant="h6">Share this post</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box className={styles.shareIcons}>
            <Tooltip title="Share on Facebook">
              <FacebookShareButton
                url={postUrl}
                quote={postTitle}
                onClick={incrementShareCount}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </Tooltip>

            <Tooltip title="Share on Twitter">
              <TwitterShareButton
                url={postUrl}
                title={postTitle}
                onClick={incrementShareCount}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </Tooltip>

            <Tooltip title="Share on Messenger">
              <FacebookMessengerShareButton
                url={postUrl}
                onClick={incrementShareCount}
              >
                <FacebookMessengerIcon size={32} round />
              </FacebookMessengerShareButton>
            </Tooltip>

            <Tooltip title="Share on WhatsApp">
              <WhatsappShareButton
                url={postUrl}
                title={postTitle}
                separator=" - "
                onClick={incrementShareCount}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </Tooltip>

            <Tooltip title="Copy link">
              <IconButton onClick={handleCopyLink}>
                <LinkIcon color="primary" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SocialShareModal;
