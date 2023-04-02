// Import library
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Import components
import { Header } from "../components";

import AuthRoute from "./AuthRoute";
import ClientRoute from "./ClientRoute";
import PostRoute from "./PostRoute";

import {
    Home,
    Profile,
    EditProfile,
    Post,
    Dashboard,
    CreatePost,
    EditPost,
    ManagePost,
    LogIn,
    SignUp,
} from "../pages";

const BlogRoutes = () => {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    {/* Routes for user */}
                    <Route path="/" element={<Home />} />
                    {/* Detail post */}
                    <Route path="/:username/:slug" element={<Post />} />
                    {/* Profile */}
                    <Route path="/:username" element={<Profile />} />
                    <Route element={<ClientRoute />}>
                        {/* Manage post */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/post/create" element={<CreatePost />} />
                        <Route
                            path="/:username/:slug/manage"
                            element={<ManagePost />}
                        />
                        <Route element={<PostRoute />}>
                            <Route
                                path="/:username/:slug/edit"
                                element={<EditPost />}
                            />
                            {/* Edit profile */}
                            <Route
                                path="/:username/edit"
                                element={<EditProfile />}
                            />
                        </Route>
                    </Route>
                    {/* Routes for Authentication */}
                    <Route element={<AuthRoute />}>
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Route>
                </Routes>
            </main>
            <ToastContainer />
        </Router>
    );
};

export default BlogRoutes;
