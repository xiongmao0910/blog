// Import library
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// Import components
import { convertImageToBase64 } from "../utils";
import { toastConfig } from "../constants";

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
                        `https://blog-server-07k0.onrender.com/user/${token}`
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
                "https://blog-server-07k0.onrender.com/user/register",
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
                toast.success(msg, toastConfig);

                return true;
            }

            // Thong bao dang nhap that bai
            toast.error(msg, toastConfig);

            return false;
        } catch (error) {
            toast.success("Lỗi đăng ký vui lòng thử lại", toastConfig);
            console.log(error);
            return false;
        }
    }

    async function login(email, password) {
        try {
            /**
             * Gui yeu cau len server
             */
            const response = await fetch(
                "https://blog-server-07k0.onrender.com/user/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            /**
             * Lay thong tin va luu token vao localStorage
             */
            const { token, data, success, msg } = await response.json();
            if (success) {
                localStorage.setItem("token", JSON.stringify(token));
                setCurrentUser(data);

                // Thong bao dang nhap thanh cong
                toast.success(msg, toastConfig);

                return true;
            }

            // Thong bao dang nhap that bai
            toast.error(msg, toastConfig);

            return false;
        } catch (error) {
            // Thong bao dang nhap that bai
            console.log(error);
            toast.error("Lỗi đăng nhập. Vui lòng thực hiện lại!", toastConfig);
            return false;
        }
    }

    function signout() {
        // Delete token in localStorage
        localStorage.removeItem("token");

        // Thong bao dang xuat thanh cong
        toast.success("Bạn đã đăng xuất thành công!", toastConfig);

        // Remove data user
        setCurrentUser(null);
    }

    async function update(dataForm) {
        try {
            /**
             * Gui yeu cau len server
             */
            const response = await fetch(
                "https://blog-server-07k0.onrender.com/user/update",
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...dataForm,
                    }),
                }
            );

            /**
             * Lay du lieu tra ve
             */
            const { data, success, msg } = await response.json();
            if (success) {
                setCurrentUser(data);
                // Thong bao chinh sua thanh cong
                toast.success(msg, toastConfig);

                return true;
            }

            // Thong bao chinh sua that bai
            toast.error(msg, toastConfig);

            return false;
        } catch (error) {
            // Thong bao chinh sua that bai
            toast.error(
                "Lỗi chỉnh sửa thông tin tài khoản. Vui lòng thực hiện lại",
                toastConfig
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
                `https://blog-server-07k0.onrender.com/user/get/${username}`
            );

            /**
             * Lay du lieu tra ve
             */
            const { data, success, msg } = await response.json();
            if (success) {
                return data;
            }

            // Thong bao loi nguoi dung khong ton tai
            toast.error(msg, toastConfig);
            return;
        } catch (error) {
            toast.error("Không thể lấy dữ liệu người dùng.", toastConfig);
            return;
        }
    }

    async function createPost(post) {
        try {
            /**
             * Gui yeu cau len server
             */
            const response = await fetch(
                "https://blog-server-07k0.onrender.com/post/create",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...post,
                    }),
                }
            );

            /**
             * Lay du lieu tra ve
             */
            const { success, msg } = await response.json();

            if (success) {
                // Thong bao tao bai viet thanh cong
                toast.success(msg, toastConfig);
                return true;
            }
            // Thong bao tao bai viet that bai
            toast.error(msg, toastConfig);
            return false;
        } catch (error) {
            // Thong bao tao bai viet that bai
            toast.error("Không thể tạo bài viết", toastConfig);
            console.log(error);
            return false;
        }
    }

    async function getAllPost() {
        try {
            /**
             * Gui yeu cau len server
             */
            const response = await fetch(
                "https://blog-server-07k0.onrender.com/post"
            );
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
            toast.error("Không thể lấy dữ liệu", toastConfig);
            console.log(error);
            return;
        }
    }

    async function getPost(username, slug) {
        try {
            /**
             * Gui yeu cau len server
             */
            const response = await fetch(
                `https://blog-server-07k0.onrender.com/post/${username}/${slug}`
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
            toast.error(msg, toastConfig);
            return { error: true };
        } catch (error) {
            toast.error("Không thể lấy dữ liệu", toastConfig);
            console.log(error);
            return;
        }
    }

    async function editPost(dataForm) {
        try {
            /**
             * Gui yeu cau len server
             */
            const response = await fetch(
                "https://blog-server-07k0.onrender.com/post/edit",
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...dataForm,
                    }),
                }
            );

            /**
             * Lay du lieu tra ve
             */
            const { success, msg } = await response.json();
            if (success) {
                // Thong bao chinh sua thanh cong
                toast.success(msg, toastConfig);
                return true;
            }

            // Thong bao chinh sua that bai
            toast.error(msg, toastConfig);

            return false;
        } catch (error) {
            // Thong bao chinh sua that bai
            toast.error("Không thể chỉnh sửa bài viết", toastConfig);
            console.log(error);
            return false;
        }
    }

    async function deletePost(username, slug) {
        try {
            /**
             * Gui yeu cau len server
             */
            const response = await fetch(
                "https://blog-server-07k0.onrender.com/post/delete",
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username,
                        slug: slug,
                    }),
                }
            );
            /**
             * Lay du lieu tra ve
             */
            const { success, msg } = await response.json();

            if (success) {
                // Thong bao xoa bai viet thanh cong
                toast.success(msg, toastConfig);
                return true;
            }

            // Thong bao loi
            toast.error(msg, toastConfig);
            return false;
        } catch (error) {
            toast.error("Không thể xóa bài viết", toastConfig);
            console.log(error);
            return;
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
        editPost,
        deletePost,
        convertImageFile,
    };

    return (
        <BlogContext.Provider value={value}>
            {!loading && children}
        </BlogContext.Provider>
    );
};
