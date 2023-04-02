// Import library
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { toast } from "react-toastify";

// Import components
import { useBlog } from "../../context/BlogContext";
import { toastConfig } from "../../constants";

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

const EditPost = () => {
    const titleRef = useRef();
    const contentRef = useRef();

    const { username, slug } = useParams();

    const { getPost, editPost } = useBlog();

    const [post, setPost] = useState();
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);

    const navigate = useNavigate();

    /**
     * Handle event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        /**
         * TODO Validation form
         * * 1. Du truong du lieu?
         * * 2. Du lieu thay doi?
         * * 3. Cap nhat du lieu len server.
         */
        if (!titleRef.current.value) {
            /**
             * Thong bao: Ban can nhap tieu de bai viet
             */
            toast.error("Bạn chưa nhập tiêu đề bài viết", toastConfig);
            return;
        }

        if (!contentRef.current.value) {
            /**
             * Thong bao: Ban can nhap noi dung bai viet
             */
            toast.error("Bạn chưa nhập nội dung bài viết", toastConfig);
            return;
        }

        const dataControl = {
            title: titleRef.current.value,
            tags,
            content: contentRef.current.value,
        };

        const dataPost = {
            title: post.title,
            tags: post.tags,
            content: post.content,
        };

        if (JSON.stringify(dataControl) === JSON.stringify(dataPost)) {
            /**
             * Thong bao: Noi dung chua thay doi
             */
            toast.error("Nội dung chưa thay đổi", toastConfig);
            return;
        }

        const isEdited = await editPost({
            username: post.username,
            slug: post.slug,
            ...dataControl,
        });

        if (isEdited) {
            navigate(`/${post.username}/${post.slug}`);
        }
    };

    const handleTag = (e) => {
        if (e.keyCode === 32) {
            const prevValue = tag.trim();
            setTags((prev) => [...prev, prevValue]);
            setTag("");
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

    useEffect(() => {
        if (post) {
            titleRef.current.value = post.title;
            setTags(post.tags);
            contentRef.current.value = post.content;
        }
    }, [post]);

    if (!post) {
        return (
            <>
                <h1>Loading..</h1>
            </>
        );
    }

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
                                Tags
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
                            chỉnh sửa
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default EditPost;
