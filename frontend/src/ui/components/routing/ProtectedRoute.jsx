// // src/auth/ProtectedRoute.jsx
// import {Navigate} from "react-router-dom";
// import {useAuth} from "../../../contexts/AuthContext.jsx";
//
// const ProtectedRoute = ({children}) => {
//     const {user} = useAuth();
//     return user ? children : <Navigate to="/login"/>;
// };
//
// export default ProtectedRoute;
// src/auth/ProtectedRoute.jsx

import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../../../contexts/AuthContext.jsx';

const ProtectedRoute = ({role}) => {
    const {isLoading, user} = useAuth();

    if (isLoading) return null;

    if (!user) return <Navigate to="/login" replace/>;

    if (role && !(user.roles || []).includes(role)) {
        return <Navigate to="/login" replace/>;
    }

    return <Outlet/>;
};

export default ProtectedRoute;
