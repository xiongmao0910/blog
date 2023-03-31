// Import library
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Import components
import { useBlog } from "../../context/BlogContext";

const EditProfile = () => {
    const usernameRef = useRef();
    const emailRef = useRef();
    const bioRef = useRef();
    const fileRef = useRef();

    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [isChanged, setIsChanged] = useState(false);

    const { currentUser, update, convertImageFile } = useBlog();

    /**
     * Handle function
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        /**
         * TODO Validation form
         * * 1. Du truong du lieu?
         */
        if (!usernameRef.current.value) {
            /**
             * Thong bao: Ban can nhap ten nguoi dung
             */
            console.log("chua nhap ten nguoi dung");
            return;
        }

        if (!emailRef.current.value) {
            /**
             * Thong bao: Ban can nhap email
             */
            console.log("chua nhap email");
            return;
        }

        const data = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            bio: bioRef.current.value,
        };

        if (file) {
            const base64 = await convertImageFile(file);

            data.photoURL = base64;
        }

        const isUpdate = await update(data);

        if (isUpdate) {
            navigate(`/${currentUser.username}`);
        }
    };

    const handleChange = () => {
        if (file && !isChanged) {
            return setIsChanged(true);
        }

        if (file && isChanged) {
            return;
        }

        const dataControl = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            bio: bioRef.current.value,
        };

        const dataUser = {
            username: currentUser.username,
            email: currentUser.email,
            bio: currentUser.bio,
        };

        if (JSON.stringify(dataControl) === JSON.stringify(dataUser)) {
            return setIsChanged(false);
        } else {
            return setIsChanged(true);
        }
    };

    const handleFileChange = (e) => {
        const getFile = e.target.files[0];
        setFile(getFile);
        setIsChanged(true);
    };

    useEffect(() => {
        usernameRef.current.value = currentUser.username;
        emailRef.current.value = currentUser.email;
        bioRef.current.value = currentUser.bio;
    }, [currentUser]);

    return (
        <section className="section">
            <div className="container">
                <div className="profile">
                    <form className="form flow" onSubmit={handleSubmit}>
                        <div className="form-type flow">
                            <div className="form-group">
                                <label
                                    htmlFor="username"
                                    className="form-label"
                                >
                                    Tên người dùng
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    ref={usernameRef}
                                    onChange={handleChange}
                                    name="username"
                                    id="username"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    ref={emailRef}
                                    onChange={handleChange}
                                    name="email"
                                    id="email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio" className="form-label">
                                    Giới thiệu
                                </label>
                                <textarea
                                    className="form-control"
                                    ref={bioRef}
                                    onChange={handleChange}
                                    name="bio"
                                    id="bio"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="file" className="form-label">
                                    Ảnh đại diện
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    ref={fileRef}
                                    onChange={handleFileChange}
                                    name="file"
                                    id="file"
                                    accept=".jpeg, .png, .jpg"
                                />
                            </div>
                            <button
                                className="button form-button"
                                button-variant="contained"
                                type="submit"
                                data-visible={isChanged}
                            >
                                lưu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default EditProfile;
