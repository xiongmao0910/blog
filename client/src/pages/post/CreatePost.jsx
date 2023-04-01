// Import library
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Import components
import { useBlog } from "../../context/BlogContext";
import { toNonAccentVietnamese } from "../../utils";

const modules = {
    toolbar: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ["link", "video", "image"],
        ["clean"], // remove formatting button
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

const CreatePost = () => {
    const titleRef = useRef();
    const contentRef = useRef();

    const navigate = useNavigate();

    const { currentUser, createPost } = useBlog();

    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);

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

        const post = {
            title: titleRef.current.value,
            content: contentRef.current.value,
            username: currentUser.username,
            avatar: currentUser.photoURL,
            slug: toNonAccentVietnamese(slug),
        };

        if (tags.length > 0) {
            post.tags = tags;
        }

        const isCreated = await createPost(post);

        if (isCreated) {
            navigate(`/${currentUser.username}/${toNonAccentVietnamese(slug)}`);
        }
    };

    const handleTag = (e) => {
        if (e.keyCode === 32) {
            const prevValue = tag.trim();
            setTags((prev) => [...prev, prevValue]);
            setTag("");
        }
    };

    return (
        <section className="section">
            <div className="container">
                <div className="create-post">
                    <form className="form flow" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title" className="form-label">
                                Tiêu đề bài viết (*)
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
                            <div className="form-control">
                                <div
                                    className="tags d-flex"
                                    style={{ "--gap": "0.25rem" }}
                                >
                                    {tags.length > 0 &&
                                        tags.map((tag, index) => (
                                            <p
                                                className="tags-item"
                                                key={tag + index}
                                            >
                                                #{tag}
                                            </p>
                                        ))}
                                    <input
                                        style={{
                                            border: "none",
                                            flex: 1,
                                        }}
                                        type="text"
                                        placeholder="Thêm tags"
                                        value={tag}
                                        onChange={(e) => setTag(e.target.value)}
                                        onKeyUp={handleTag}
                                        name="tags"
                                        id="tags"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content" className="form-label">
                                nội dung (*)
                            </label>
                            <ReactQuill
                                theme="snow"
                                className="form-control"
                                ref={contentRef}
                                id="content"
                                modules={modules}
                                placeholder="viết nội dung bài viết của bạn ở đây"
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
