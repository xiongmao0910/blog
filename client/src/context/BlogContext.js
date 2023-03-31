// Import library
import React, { useContext, useEffect, useState } from "react";

// Import components
import { convertImageToBase64 } from "../utils";

// Create context
const BlogContext = React.createContext();

export function useBlog() {
    return useContext(BlogContext);
}

// Create provider
export const BlogProvider = ({ children }) => {
    // Children are mounted?
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    // UseEffect
    useEffect(() => {
        const subcribe = async () => {
            const token = JSON.parse(localStorage.getItem("token"));

            if (token) {
                try {
                    const response = await fetch(
                        `http://localhost:5000/user/${token}`
                    );
                    const { data } = await response.json();
                    setCurrentUser(data);
                } catch (error) {
                    console.log("Loi server. Vui long thuc hien lai sau!");
                    console.log(error);
                }
            }

            setLoading(false);
        };

        subcribe();
    }, []);

    // Method
    async function signup(username, email, password) {
        try {
            /**
             * Gui yeu cau len server
             */
            const response = await fetch(
                "http://localhost:5000/user/register",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                    }),
                }
            );

            /**
             * Lay du lieu tra ve
             */
            const { success, msg } = await response.json();
            if (success) {
                // Thong bao dang ky thanh cong
                console.log(msg);

                return true;
            }

            // Thong bao dang nhap that bai
            console.log(msg);

            return false;
        } catch (error) {
            console.log("Lỗi đăng ký vui lòng thử lại");
            console.log(error);
            return false;
        }
    }

    async function login(email, password) {
        try {
            /**
             * Gui yeu cau len server
             */
            const response = await fetch("http://localhost:5000/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            /**
             * Lay thong tin va luu token vao localStorage
             */
            const { token, data, success, msg } = await response.json();
            if (success) {
                localStorage.setItem("token", JSON.stringify(token));
                setCurrentUser(data);

                // Thong bao dang nhap thanh cong
                console.log(msg);

                return true;
            }

            // Thong bao dang nhap that bai
            console.log(msg);

            return false;
        } catch (error) {
            // Thong bao dang nhap that bai
            console.log(error);
            console.log("Lỗi đăng nhập. Vui lòng thực hiện lại!");
            return false;
        }
    }

    function signout() {
        // Delete token in localStorage
        localStorage.removeItem("token");

        // Remove data user
        setCurrentUser(null);
    }

    async function update(dataForm) {
        try {
            /**
             * Gui yeu cau len server
             */
            const response = await fetch("http://localhost:5000/user/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...dataForm,
                }),
            });

            /**
             * Lay du lieu tra ve
             */
            const { data, success, msg } = await response.json();
            if (success) {
                setCurrentUser(data);
                // Thong bao chinh sua thanh cong
                console.log(msg);
                return true;
            }

            // Thong bao chinh sua that bai
            console.log(msg);

            return false;
        } catch (error) {
            // Thong bao chinh sua that bai
            console.log(
                "Lỗi chỉnh sửa thông tin tài khoản. Vui lòng thực hiện lại"
            );
            console.log(error);
            return false;
        }
    }

    async function getUser(username) {
        try {
            /**
             * Gui yeu cau len server
             */
            const response = await fetch(
                `http://localhost:5000/user/get/${username}`
            );

            /**
             * Lay du lieu tra ve
             */
            const { data, success, msg } = await response.json();
            if (success) {
                return data;
            }

            // Thong bao loi nguoi dung khong ton tai
            console.log(msg);
            return;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async function createPost(post) {
        try {
            /**
             * Gui yeu cau len server
             */
            const response = await fetch("http://localhost:5000/post/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...post,
                }),
            });

            /**
             * Lay du lieu tra ve
             */
            const { success, msg } = await response.json();

            if (success) {
                // Thong bao tao bai viet thanh cong
                console.log(msg);
                return true;
            }
            // Thong bao tao bai viet that bai
            console.log(msg);
            return false;
        } catch (error) {
            // Thong bao tao bai viet that bai
            console.log("Lỗi tạo bài viết. Vui lòng thực hiện lại");
            console.log(error);
            return false;
        }
    }

    async function getAllPost() {
        try {
            /**
             * Gui yeu cau len server
             */
            const response = await fetch("http://localhost:5000/post");
            /**
             * Lay du lieu tra ve
             */
            const { success, data } = await response.json();
            if (success) {
                // Tra ve du lieu cac bai viet
                return data;
            }

            return;
        } catch (error) {
            console.log("Loi server. Vui long thuc hien lai sau!");
            console.log(error);
        }
    }

    async function getPost(username, slug) {
        try {
            /**
             * Gui yeu cau len server
             */
            const response = await fetch(
                `http://localhost:5000/post/${username}/${slug}`
            );
            /**
             * Lay du lieu tra ve
             */
            const { success, data, msg } = await response.json();
            if (success) {
                // Tra ve du lieu bai viet
                return data;
            }

            // Thong bao loi
            console.log(msg);
            return;
        } catch (error) {
            console.log("Loi server. Vui long thuc hien lai sau!");
            console.log(error);
        }
    }

    async function convertImageFile(file) {
        const base64 = await convertImageToBase64(file);

        return base64;
    }

    // Props
    const value = {
        currentUser,
        signup,
        login,
        signout,
        update,
        getUser,
        createPost,
        getAllPost,
        getPost,
        convertImageFile,
    };

    return (
        <BlogContext.Provider value={value}>
            {!loading && children}
        </BlogContext.Provider>
    );
};
