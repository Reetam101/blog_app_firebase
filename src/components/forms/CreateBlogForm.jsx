import { Box, Button, IconButton, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../../features/blog/blogSlice";
import CloseIcon from "@mui/icons-material/Close";

const CreateBlogForm = () => {
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.blogs);
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !cover) {
      setMessage("Please fill all the fields");
      handleClick();
      return;
    }
    try {
      const res = await dispatch(addBlog({ title, desc, coverImg: cover }));
      console.log(res);
      if (res) {
        setSuccess(true);
        handleClick();
      }
    } catch (error) {
      handleClick();
      console.log(error);
    } finally {
      setTitle("");
      setDesc("");
      setCover("");
      setSuccess(false);
    }
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      maxWidth={"500px"}
      noValidate
      sx={{ mt: 1 }}
    >
      {error && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={error}
          action={action}
        />
      )}
      {message && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          action={action}
        />
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill theme="snow" value={desc} onChange={setDesc} />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Cover Image URL"
        value={cover}
        onChange={(e) => setCover(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Create
      </Button>
    </Box>
  );
};

export default CreateBlogForm;
