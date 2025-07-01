import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const storedUser = localStorage.getItem('auth_user');
    let user = null;

    try {
    user = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
    console.error('Invalid auth_user in localStorage:', error);
    user = null;
    }

    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
