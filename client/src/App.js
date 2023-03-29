// Import components
import { BlogProvider } from "./context/BlogContext";
import BlogRoutes from "./routes";

// Import scss
import "./sass/styles.scss";

function App() {
    return (
        <BlogProvider>
            <BlogRoutes />
        </BlogProvider>
    );
}

export default App;
