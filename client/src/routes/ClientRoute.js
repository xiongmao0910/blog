// Import library
import { Outlet, Navigate } from "react-router-dom";

// Import components
import { useBlog } from "../context/BlogContext";

const ClientRoute = () => {
    const { currentUser } = useBlog();

    return !!currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ClientRoute;
