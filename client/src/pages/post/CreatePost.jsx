// Import library
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

// Import components
import { useBlog } from "../../context/BlogContext";
import { toNonAccentVietnamese } from "../../utils";

const CreatePost = () => {
    const titleRef = useRef();
    const tagsRef = useRef();
    const contentRef = useRef();

    const navigate = useNavigate();

    const { currentUser, createPost } = useBlog();

    /**
     * Handle function
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        /**
         * TODO Validation form
         * * 1. Du truong du lieu?
         */
        if (!titleRef.current.value || !contentRef.current.value) {
            /**
             * Thong bao chua nhap du truong thong tin
             */
            console.log("chua nhap du truong thong tin");
            return;
        }

        const slug = titleRef.current.value.split(" ").join("-").toLowerCase();

        const isCreated = await createPost({
            title: titleRef.current.value,
            content: contentRef.current.value,
            username: currentUser.username,
            slug: toNonAccentVietnamese(slug),
        });

        if (isCreated) {
            navigate(`/${currentUser.username}/${toNonAccentVietnamese(slug)}`);
        }
    };

    return (
        <section className="section">
            <div className="container">
                <div className="create-post">
                    <form className="form flow" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title" className="form-label">
                                Tiêu đề bài viết
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tiêu đề bài viết"
                                ref={titleRef}
                                name="title"
                                id="title"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tags" className="form-label">
                                Thêm tags
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Thêm tags"
                                ref={tagsRef}
                                name="tags"
                                id="tags"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content" className="form-label">
                                nội dung
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="viết nội dung bài viết của bạn ở đây"
                                ref={contentRef}
                                name="content"
                                id="content"
                            />
                        </div>
                        <button
                            className="button form-button"
                            button-variant="contained"
                            type="submit"
                        >
                            xuất bản
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CreatePost;
