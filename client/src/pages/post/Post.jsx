// Import library
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// Import components
import { useBlog } from "../../context/BlogContext";
import { shortDateFormat } from "../../utils";

const Post = () => {
    const { username, slug } = useParams();

    const { currentUser, getPost } = useBlog();

    const [post, setPost] = useState();

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

    return (
        <section className="section">
            <div className="container">
                {post && (
                    <article className="post">
                        <div className="d-flex items-start justify-between">
                            <div className="post-author d-flex items-center">
                                <img src={post.avatar} alt={post.username} />
                                <div>
                                    <Link
                                        className="post-username"
                                        to={`/${post.username}`}
                                    >
                                        {post.username}
                                    </Link>
                                    <p className="post-date">
                                        Đăng vào ngày{" "}
                                        {shortDateFormat(post.createdAt)}
                                    </p>
                                </div>
                            </div>
                            {currentUser?.username === username && (
                                <Link
                                    to={`/post/${post.slug}/manage`}
                                    className="button fs-200"
                                    button-variant="contained"
                                >
                                    quản lý
                                </Link>
                            )}
                        </div>
                        <div className="post-detail flow">
                            <h1 className="post-title fs-600">{post.title}</h1>
                            {post.tags.length > 0 && (
                                <div className="post-tags d-flex flex-wrap">
                                    {post.tags.map((tag, index) => (
                                        <p key={tag + index}>#{tag}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div
                            className="post-content flow"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        ></div>
                    </article>
                )}
                {!post && <h1>Bài viết không tồn tại</h1>}
            </div>
        </section>
    );
};

export default Post;
