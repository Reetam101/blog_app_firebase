import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import BlogList from "../components/blog/BlogList";
import CreateBlogForm from "../components/forms/CreateBlogForm";

const LandingPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Box
      sx={{
        mt: "20px",
      }}
    >
      <Typography variant="h5">Welcome: {userInfo.email}</Typography>
      <CreateBlogForm />
      <BlogList />
    </Box>
  );
};

export default LandingPage;
