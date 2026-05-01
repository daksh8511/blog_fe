import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserInfo from "../store";

const ProtectedRoute = ({ children, type = "private" }) => {
  const { userInfo } = UserInfo();
  const location = useLocation();

  if (type === "private" && !userInfo) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (type === "auth" && userInfo) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;