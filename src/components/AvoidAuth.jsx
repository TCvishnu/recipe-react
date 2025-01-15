import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function AvoidAuth({ children }) {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuth = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await fetch(`${backendURL}/api/verify-token`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.text);
      }

      const receivedData = await response.json();
      console.log(receivedData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
