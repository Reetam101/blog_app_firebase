import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import BlogCard from "./BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../features/blog/blogSlice";

const BlogList = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  console.log(blogs);
  return (
    <Grid container sx={{ mt: "50px" }} rowGap={5}>
      {blogs.map((blog) => (
        <Grid
          item
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          xs={12}
          md={6}
        >
          <BlogCard blog={blog} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogList;
