import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ element, restricted, ...rest }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && restricted ? <Navigate to="/" /> : element;
};

export default PublicRoute;
