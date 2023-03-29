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
             * Luu thong tin tai khoan vao CSDL
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
             * Lay thong tin va luu token vao localStorage
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
             * Lay thong tin va luu token vao localStorage
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
        convertImageFile,
    };

    return (
        <BlogContext.Provider value={value}>
            {!loading && children}
        </BlogContext.Provider>
    );
};
