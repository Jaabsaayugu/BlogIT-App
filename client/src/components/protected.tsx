import React from "react";
import { Navigate } from "react-router-dom";
import useUser from "../store/userStore";

const Protected: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useUser((state) => state.user);

  if (!user) {
    return <Navigate to="login" replace />;
  }

  return <>{children}</>;
};

export default Protected;
