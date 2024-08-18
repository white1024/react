import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    return storedLoginStatus ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;