// Import library
import { Outlet, useParams } from "react-router-dom";

// Import components
import { useBlog } from "../context/BlogContext";

const PostRoute = () => {
    const { currentUser } = useBlog();

    const { username } = useParams();

    return !!(currentUser.username === username) ? (
        <Outlet />
    ) : (
        <>
            <h1>404 pages</h1>
        </>
    );
};

export default PostRoute;
