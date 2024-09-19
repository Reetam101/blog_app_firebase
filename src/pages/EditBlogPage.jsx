import { Box, Button, Snackbar, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { updateBlog } from "../features/blog/blogSlice";
import { db } from "../firebase"; // Ensure the path to your Firebase config is correct

const EditBlogPage = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cover, setCover] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogDoc = doc(db, "blogs", blogId);
        console.log(blogDoc);
        const docSnap = await getDoc(blogDoc);

        if (docSnap.exists()) {
          const blogData = docSnap.data();
          setTitle(blogData.title || "");
          setDesc(blogData.desc || "");
          setCover(blogData.coverImg || "");
        } else {
          setError("Blog not found.");
          setOpen(true);
        }
      } catch (err) {
        console.log(err);
        setError("Failed to fetch blog. Please try again.");
        setOpen(true);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBlog = {
        title,
        desc,
        coverImg: cover,
      };

      // Dispatch the update action
      await dispatch(updateBlog({ id: blogId, updatedBlog }));

      setMessage("Blog updated successfully!");
      setOpen(true);
      navigate("/"); // Navigate back to the blog list page
    } catch (err) {
      setError("Failed to update blog. Please try again.");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        />
      )}
      {message && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
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
        Update Blog
      </Button>
    </Box>
  );
};

export default EditBlogPage;
