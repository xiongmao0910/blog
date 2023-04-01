// Import library
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

// Import components
import { useBlog } from "../../context/BlogContext";
import { shortDateFormat } from "../../utils";

const ManagePost = () => {
    const { username, slug } = useParams();

    const { getPost, deletePost } = useBlog();

    const [post, setPost] = useState();

    const navigate = useNavigate();

    /**
     * Handle event
     */
    const handleClick = async () => {
        const isDeleted = await deletePost(post.username, post.slug);

        if (isDeleted) {
            navigate("/dashboard");
        }
    };

    /**
     * Side effect
     */
    useEffect(() => {
        const getPostDetail = async () => {
            const data = await getPost(username, slug);

            if (data) return setPost(data);
        };

        getPostDetail();
    }, [username, slug, getPost]);

    if (!post) {
        return <h1>Loading..</h1>;
    }

    return (
        <section className="section">
            <div className="container">
                <div className="manage-post d-flex flex-column">
                    <Link
                        to={`/${post.username}/${post.slug}`}
                        className="fs-500 fw-medium"
                    >
                        {post.title}
                    </Link>
                    <small>Đăng từ {shortDateFormat(post.createdAt)}</small>
                    <div className="d-flex items-center">
                        <Link
                            to={`/${post.username}/${post.slug}/edit`}
                            className="button fs-200"
                            button-variant="contained"
                        >
                            chỉnh sửa
                        </Link>
                        <button
                            className="button fs-200"
                            button-variant="outlined"
                            onClick={handleClick}
                        >
                            xóa
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManagePost;
