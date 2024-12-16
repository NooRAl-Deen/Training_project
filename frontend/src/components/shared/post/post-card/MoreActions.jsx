import {
  Menu,
  MenuItem,
  POSTS_LOCALE_PATH,
  useTranslation,
  useState
} from "@posts/utils/sharedImports";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import usePosts from "@posts/hooks/usePosts";
import ConfirmDeleteModal from "@posts/components/ConfirmDeleteModal";


const MoreActions = ({ post, showActionsMenu, closeActionsMenu }) => {
  const { t } = useTranslation(POSTS_LOCALE_PATH);
  const {toggleEdit, setCurrentPost, openEditCard} = usePosts();
  const [open, setOpen] = useState(false)
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)
  return (
    <Menu
      anchorEl={showActionsMenu}
      open={Boolean(showActionsMenu)}
      onClose={closeActionsMenu}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem
        onClick={() => {
          setCurrentPost(post);
          toggleEdit(post)
          closeActionsMenu();
        }}
      >
        <ModeEditOutlineOutlinedIcon />
        {t("actions_menu.edit")}
      </MenuItem>
      <MenuItem
        onClick={() => {
          openModal()
        }}
      >
        <DeleteOutlineOutlinedIcon />
        {t("actions_menu.delete")}
      </MenuItem>
      <ConfirmDeleteModal post={post} open={open} onClose={closeModal} />
    </Menu>
  );
};

export default MoreActions;
