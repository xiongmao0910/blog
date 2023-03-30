// Import library
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Import components
import { useBlog } from "../../context/BlogContext";

const Post = () => {
    const { username, slug } = useParams();

    const { getPost } = useBlog();

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
                {post && <h1>{post.title}</h1>}
                {!post && <h1>Bài viết không tồn tại</h1>}
            </div>
        </section>
    );
};

export default Post;
