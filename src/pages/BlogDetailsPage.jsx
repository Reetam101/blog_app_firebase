import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Paper } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { fetchBlogs } from "../features/blog/blogSlice";

const BlogDetailsPage = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();

  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs.length]);

  const blog = blogs.find((b) => b.id === blogId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ p: 3 }}>
      {blog ? (
        <Paper sx={{ p: 3 }} elevation={1}>
          <Typography variant="h4" gutterBottom>
            {blog.title}
          </Typography>
          <Box
            component="img"
            src={blog.coverImg}
            alt={blog.title}
            sx={{ width: "40%", height: "auto", mb: 2 }}
          />
          <ReactQuill value={blog.desc} readOnly theme="snow" />
          <Typography mt={5} variant="subtitle1">
            By: {blog.author}
          </Typography>
        </Paper>
      ) : (
        <div>Blog not found.</div>
      )}
    </Box>
  );
};

export default BlogDetailsPage;
