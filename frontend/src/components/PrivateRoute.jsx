import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    API.get("/auth/verify", { withCredentials: true })
      .then(() => setIsVerified(true))
      .catch(() => setIsVerified(false));
  }, []);

  if (isVerified === null) return <div>Loading...</div>;
  return isVerified ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
