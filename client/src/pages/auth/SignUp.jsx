// Import library
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

// Import components
import { useBlog } from "../../context/BlogContext";

const SignUp = () => {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const repasswordRef = useRef();

    const { signup } = useBlog();

    const navigate = useNavigate();

    /**
     * Handle function
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        /**
         * TODO Validation form
         * * 1. Du truong du lieu?
         * * 2. Mat khau trung nhau?
         */
        if (
            !usernameRef.current.value ||
            !emailRef.current.value ||
            !passwordRef.current.value ||
            !repasswordRef.current.value
        ) {
            /**
             * Thong bao chua nhap du truong thong tin
             */
            console.log("chua nhap du truong thong tin");
            return;
        }

        if (passwordRef.current.value !== repasswordRef.current.value) {
            /**
             * Thong bao mat khau khong trung nhau
             */
            console.log("mat khau khong trung nhau");
            return;
        }

        const isSignup = await signup(
            usernameRef.current.value,
            emailRef.current.value,
            passwordRef.current.value
        );

        if (isSignup) {
            navigate("/login");
        }
    };

    return (
        <section className="section">
            <div className="container">
                <div className="auth">
                    <form className="form flow" onSubmit={handleSubmit}>
                        <div className="form-content">
                            <h4 className="form-heading text-center">
                                Welcome to BLOG Community
                            </h4>
                            <p className="form-desc text-center">
                                BLOG Community is a community of series
                            </p>
                        </div>
                        {/* With social account */}
                        {/* With email and password */}
                        <div className="form-type flow">
                            <div className="form-group">
                                <label
                                    htmlFor="username"
                                    className="form-label"
                                >
                                    username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    ref={usernameRef}
                                    name="username"
                                    id="username"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    email
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
                                    password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    ref={passwordRef}
                                    name="password"
                                    id="password"
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="repassword"
                                    className="form-label"
                                >
                                    repassword
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    ref={repasswordRef}
                                    name="repassword"
                                    id="repassword"
                                />
                            </div>
                            <button
                                className="button form-button"
                                button-variant="contained"
                                type="submit"
                            >
                                sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
