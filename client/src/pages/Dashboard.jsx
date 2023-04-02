// Import library
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Import components
import { useBlog } from "../context/BlogContext";
import { shortDateFormat } from "../utils";
import postImg from "../img/Creative-writing-amico.svg";

const Dashboard = () => {
    const { currentUser, getPosts } = useBlog();

    const [posts, setPosts] = useState();

    /**
     * Side effect
     */
    useEffect(() => {
        const getData = async () => {
            const data = await getPosts(currentUser.username);

            setPosts(data);
        };

        getData();
    }, [currentUser, getPosts]);

    if (!posts) {
        return <h1>Loading...</h1>;
    }

    return (
        <section className="section">
            <div className="container">
                <div className="dashboard">
                    <div className="dashboard-title fs-500">
                        Tất cả bài viết
                    </div>
                    {posts.length > 0 ? (
                        <div className="dashboard-list d-grid">
                            {posts.map((post) => (
                                <div
                                    key={post.title}
                                    className="dashboard-item d-grid"
                                >
                                    <div className="dashboard-item-info">
                                        <div className="dashboard-item-username fs-400 fw-bold">
                                            <Link
                                                to={`/${post.username}/${post.slug}`}
                                            >
                                                {post.title}
                                            </Link>
                                        </div>
                                        <p>
                                            <span className="fw-semibold">
                                                Xuất bản:
                                            </span>{" "}
                                            {shortDateFormat(post.createdAt)}
                                        </p>
                                    </div>
                                    <div className="dashboard-item-action d-flex items-center">
                                        <Link
                                            to={`/${post.username}/${post.slug}/manage`}
                                        >
                                            quản lý
                                        </Link>
                                        <Link
                                            to={`/${post.username}/${post.slug}/edit`}
                                        >
                                            chỉnh sửa
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="dashboard-content flow">
                            <img src={postImg} alt={currentUser.username} />
                            <p>
                                Đây là nơi bạn có thể quản lý bài viết của mình,
                                nhưng bạn chưa viết bất cứ điều gì.
                            </p>
                            <Link
                                to="/post/create"
                                className="button"
                                button-variant="contained"
                            >
                                Viết bài đầu tiên
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
