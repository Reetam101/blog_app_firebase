import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element, ...rest }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
