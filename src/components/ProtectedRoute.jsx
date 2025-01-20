import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

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

      setIsAuthenticated(true);
      const userData = await response.json();
      setUserEmail(userData.user.email);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return React.cloneElement(children, { userEmail });
}
