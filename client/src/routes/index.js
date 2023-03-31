// Import library
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import { Header } from "../components";
import AuthRoute from "./AuthRoute";
import ClientRoute from "./ClientRoute";
import {
    Home,
    Search,
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
                    <Route path="/search" element={<Search />} />
                    {/* Detail post */}
                    <Route path="/:username/:slug" element={<Post />} />
                    {/* Profile */}
                    <Route path="/:username" element={<Profile />} />
                    <Route element={<ClientRoute />}>
                        <Route
                            path="/:username/edit"
                            element={<EditProfile />}
                        />
                        {/* Manage post */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/post/create" element={<CreatePost />} />
                        <Route
                            path="/post/:slug/manage"
                            element={<ManagePost />}
                        />
                        <Route path="/post/:slug/edit" element={<EditPost />} />
                    </Route>
                    {/* Routes for Authentication */}
                    <Route element={<AuthRoute />}>
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Route>
                </Routes>
            </main>
        </Router>
    );
};

export default BlogRoutes;
