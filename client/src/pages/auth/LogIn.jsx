// Import library
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

// Import components
import { useBlog } from "../../context/BlogContext";

const LogIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const { login } = useBlog();

    const navigate = useNavigate();

    /**
     * Handle function
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        /**
         * TODO Validation form
         * * 1. Du truong du lieu?
         */
        if (!emailRef.current.value || !passwordRef.current.value) {
            /**
             * Thong bao chua nhap du truong thong tin
             */
            console.log("chua nhap du truong thong tin");
            return;
        }

        const isLogin = await login(
            emailRef.current.value,
            passwordRef.current.value
        );

        if (isLogin) {
            navigate("/");
        }
    };

    return (
        <section className="section">
            <div className="container">
                <div className="auth">
                    <form className="form flow" onSubmit={handleSubmit}>
                        <div className="form-content">
                            <h4 className="form-heading text-center">
                                Chào mừng bạn đến với cộng đồng BLOG
                            </h4>
                            <p className="form-desc text-center">
                                Cộng đồng BLOG là một cộng đồng chia sẻ những
                                kiến thức bổ ích
                            </p>
                        </div>
                        {/* With social account */}
                        {/* With email and password */}
                        <div className="form-type flow">
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Nhập email
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    ref={emailRef}
                                    name="email"
                                    id="email"
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >
                                    Nhập mật khẩu
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    ref={passwordRef}
                                    name="password"
                                    id="password"
                                />
                            </div>
                            <button
                                className="button form-button"
                                button-variant="contained"
                                type="submit"
                            >
                                đăng nhập
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LogIn;
