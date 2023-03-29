// Import library
import React from "react";
import { Link } from "react-router-dom";
import { RiCake2Fill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";

// Import components
import { useBlog } from "../../context/BlogContext";
import { dateFormat } from "../../utils";

const Profile = () => {
    const { currentUser } = useBlog();

    return (
        <section className="section">
            <div className="container">
                <div className="profile">
                    <div className="profile-image">
                        {currentUser?.photoURL ? (
                            <img
                                className="img-fluid"
                                src={currentUser.photoURL}
                                alt={currentUser.username}
                            />
                        ) : (
                            <FaUserCircle className="img-fluid" />
                        )}
                    </div>
                    <div className="text-right">
                        <Link
                            to={`/${currentUser.username}/edit`}
                            className="button"
                            button-variant="contained"
                        >
                            edit profile
                        </Link>
                    </div>
                    <div className="profile-detail flow">
                        <h4 className="fw-extrabold">{currentUser.username}</h4>
                        <p>
                            {currentUser.bio.length
                                ? currentUser.bio
                                : "No bio to show"}
                        </p>
                        <div className="profile-date d-flex items-center">
                            <span>
                                <RiCake2Fill />
                            </span>
                            <small>
                                Join on {dateFormat(currentUser.createdAt)}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
