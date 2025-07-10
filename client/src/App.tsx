import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
// import Profile from './pages/profile';
// import BlogDetail from './pages/blogDetail';
// import CreateBlog from './pages/createBlog';
// import EditBlog from './pages/editBlog';

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route element={<ProtectedRoute />}> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/blogs/new" element={<CreateBlog />} /> */}
        {/* <Route path="/blogs/:id/edit" element={<EditBlog />} /> */}
        {/* </Route> */}

        {/* //   <Route path="/blogs/:id" element={<BlogDetail />} /> */}
        {/* //   <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
