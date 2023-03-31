// Import library
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RiCake2Fill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";

// Import components
import { useBlog } from "../../context/BlogContext";
import { shortDateFormat } from "../../utils";

const Profile = () => {
    const { currentUser, getUser } = useBlog();

    const { username } = useParams();

    const [user, setUser] = useState();

    useEffect(() => {
        const getDataUser = async () => {
            if (currentUser && currentUser.username === username) {
                setUser(currentUser);
                return;
            }

            const data = await getUser(username);

            if (data) {
                setUser(data);
            } else {
                // Hien thi trang 404
            }
        };

        getDataUser();
    }, [currentUser, username, getUser]);

    if (!user) {
        return <h1>Loading...</h1>;
    }

    return (
        <section className="section">
            <div className="container">
                <div className="profile">
                    <div className="profile-image">
                        {user.photoURL ? (
                            <img
                                className="img-fluid"
                                src={user.photoURL}
                                alt={user.username}
                            />
                        ) : (
                            <FaUserCircle className="img-fluid" />
                        )}
                    </div>
                    {JSON.stringify(currentUser) === JSON.stringify(user) && (
                        <div className="profile-button">
                            <Link
                                to={`/${user.username}/edit`}
                                className="button"
                                button-variant="contained"
                            >
                                Chỉnh sửa hồ sơ
                            </Link>
                        </div>
                    )}
                    <div className="profile-detail flow">
                        <h4 className="fw-extrabold">{user.username}</h4>
                        <p>{user.bio.length ? user.bio : "No bio to show"}</p>
                        <div className="profile-date d-flex items-center">
                            <span>
                                <RiCake2Fill />
                            </span>
                            <small>
                                Tham gia vào ngày{" "}
                                {shortDateFormat(user.createdAt)}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
