// Import library
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Import components
import { useBlog } from "../context/BlogContext";
import { shortDateFormat } from "../utils";

const Home = () => {
    // Use value of ShopProvider
    const { getAllPost } = useBlog();

    const [posts, setPosts] = useState();

    /**
     * Side effect
     */
    useEffect(() => {
        const getData = async () => {
            const data = await getAllPost();

            if (data) return setPosts(data);
        };

        getData();
    }, [getAllPost]);

    return (
        <section className="section">
            <div className="container">
                <div className="home flow">
                    {posts &&
                        posts.map((post) => (
                            <div className="card" key={post._id}>
                                <div className="card-detail d-flex items-center">
                                    <Link
                                        to={`/${post.username}`}
                                        className="card-img"
                                    >
                                        <img
                                            className="img-fluid"
                                            src={post.avatar}
                                            alt={post.username}
                                        />
                                    </Link>
                                    <div className="card-info">
                                        <Link
                                            to={`/${post.username}`}
                                            className="card-subtitle"
                                        >
                                            {post.username}
                                        </Link>
                                        <div className="card-caption">
                                            Đăng từ{" "}
                                            {shortDateFormat(
                                                post.createdAt
                                            ).slice(0, -5)}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <h2 className="card-heading">
                                        <Link
                                            to={`/${post.username}/${post.slug}`}
                                        >
                                            {post.title}
                                        </Link>
                                    </h2>
                                    {post.tags.length > 0 && (
                                        <div className="d-flex flex-wrap">
                                            {post.tags.map((tag, index) => (
                                                <p key={tag + index}>#{tag}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default Home;
