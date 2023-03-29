// Import library
import { Outlet, Navigate } from "react-router-dom";

// Import components
import { useBlog } from "../context/BlogContext";

const AuthRoute = () => {
    const { currentUser } = useBlog();

    return !currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default AuthRoute;
