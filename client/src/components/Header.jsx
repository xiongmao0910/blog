// Import library
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

// Import components
import { useBlog } from "../context/BlogContext";

const Header = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Use value of ShopProvider
    const { currentUser, signout } = useBlog();

    const navigate = useNavigate();

    /**
     * Handle function
     */
    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleLogout = () => {
        handleClick();
        signout();
        navigate("/");
    };

    return (
        <header className="header">
            <div className="container header-container">
                <div className="d-flex justify-between items-center">
                    <Link to="/" className="header-logo">
                        Blog
                    </Link>
                    <div className="d-flex items-center">
                        <Link to="/search" className="header-icon">
                            <AiOutlineSearch />
                        </Link>
                        <div className="dropdown">
                            {currentUser?.photoURL.length ? (
                                <img
                                    src={currentUser?.photoURL}
                                    className="header-img"
                                    alt={currentUser?.username}
                                    onClick={handleClick}
                                />
                            ) : (
                                <div className="header-icon">
                                    <FaUserCircle
                                        aria-expanded={isExpanded}
                                        onClick={handleClick}
                                    />
                                </div>
                            )}

                            <ul
                                className="dropdown-menu"
                                data-visible={isExpanded}
                            >
                                {currentUser && (
                                    <>
                                        <li
                                            className="dropdown-item"
                                            onClick={handleClick}
                                        >
                                            <Link
                                                className="dropdown-link"
                                                to={`/${currentUser.username}`}
                                            >
                                                <div>Hồ sơ người dùng</div>
                                                <small>
                                                    @{currentUser.username}
                                                </small>
                                            </Link>
                                        </li>
                                        <li className="dropdown-divider"></li>
                                        <li
                                            className="dropdown-item"
                                            onClick={handleClick}
                                        >
                                            <Link
                                                className="dropdown-link"
                                                to="/dashboard"
                                            >
                                                dashboard
                                            </Link>
                                        </li>
                                        <li
                                            className="dropdown-item"
                                            onClick={handleClick}
                                        >
                                            <Link
                                                className="dropdown-link"
                                                to="/post/create"
                                            >
                                                tạo bài viết
                                            </Link>
                                        </li>
                                        <li className="dropdown-divider"></li>
                                        <li
                                            className="dropdown-item"
                                            onClick={handleLogout}
                                        >
                                            <div className="dropdown-link">
                                                đăng xuất
                                            </div>
                                        </li>
                                    </>
                                )}

                                {!currentUser && (
                                    <>
                                        <li
                                            className="dropdown-item"
                                            onClick={handleClick}
                                        >
                                            <Link
                                                className="dropdown-link"
                                                to="/login"
                                            >
                                                đăng nhập
                                            </Link>
                                        </li>
                                        <li
                                            className="dropdown-item"
                                            onClick={handleClick}
                                        >
                                            <Link
                                                className="dropdown-link"
                                                to="/signup"
                                            >
                                                đăng ký
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
