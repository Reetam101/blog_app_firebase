import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Icon,
  List,
  ListItem,
} from "@mui/material";
import { Delete, Edit, EditCalendar, ViewAgenda } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../../features/blog/blogSlice";

function SimpleDialog(props) {
  const { onClose, open, blogId, blogAuthor } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [openConfirm, setOpenConfirm] = React.useState(false); // State for delete confirmation dialog

  const handleEditClick = () => {
    navigate(`/edit/${blogId}`);
  };

  const handleDeleteClick = () => {
    setOpenConfirm(true); // Open the confirmation dialog
  };

  const handleConfirmClose = () => {
    setOpenConfirm(false); // Close the confirmation dialog
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteBlog(blogId)); // Dispatch the delete action with blog ID
      handleConfirmClose(); // Close the confirmation dialog after delete
      onClose(); // Close the main dialog after deletion
    } catch (error) {
      console.error("Failed to delete the blog:", error);
    }
  };

  return (
    <>
      <Dialog onClose={onClose} open={open}>
        <List>
          <ListItem>
            <Button
              onClick={() => navigate(`/view/${blogId}`)}
              startIcon={<ViewAgenda />}
            >
              View
            </Button>
          </ListItem>
          {userInfo.email === blogAuthor && (
            <ListItem>
              <Button onClick={handleEditClick} startIcon={<Edit />}>
                Edit
              </Button>
            </ListItem>
          )}
          {userInfo.email === blogAuthor && (
            <ListItem>
              <Button
                onClick={handleDeleteClick}
                startIcon={<Delete />}
                color="error"
              >
                Delete
              </Button>
            </ListItem>
          )}
        </List>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirm}
        onClose={handleConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this blog?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function BlogCard({ blog }) {
  //   console.log(blog);
  const [showDialog, setShowDialog] = React.useState(false);
  const handleOpen = () => {
    setShowDialog(true);
  };
  const handleClose = () => {
    setShowDialog(false);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {blog?.author[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleOpen}>
            <MoreVertIcon />
          </IconButton>
        }
        title={blog?.author}
      />
      <CardMedia
        component="img"
        height="194"
        image={blog?.coverImg}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h6" sx={{ color: "text.primary" }}>
          {blog?.title}
        </Typography>
        <Box
          sx={{ color: "text.secondary", mt: 1 }}
          dangerouslySetInnerHTML={{ __html: blog?.desc }}
        />
      </CardContent>
      <SimpleDialog
        open={showDialog}
        onClose={handleClose}
        blogId={blog?.id}
        blogAuthor={blog?.author}
      />
    </Card>
  );
}
