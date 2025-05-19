// ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// This component checks if the user is logged in before rendering the children components.
// If the user is not logged in, it redirects them to the login page.

const ProtectedRoute = ({ children, isLoggedIn }) => {
  const [checked, setChecked] = useState(false);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
