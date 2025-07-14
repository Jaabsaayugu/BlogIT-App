import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/home";
import Header from "./components/header";
import Login from "./pages/login";
import Register from "./pages/register";
import BlogList from "./pages/blogList";
import Profile from "./pages/profile";
import BlogDetail from "./pages/blogDetail";
import CreateBlog from "./pages/createBlog";
import EditBlog from "./pages/editBlog";
import Protected from "./components/protected";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/blogList"
          element={
            <Protected>
              <BlogList />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/blogs/:id/edit"
          element={
            <Protected>
              <EditBlog />
            </Protected>
          }
        />
        <Route
          path="/createBlog"
          element={
            <Protected>
              <CreateBlog />
            </Protected>
          }
        />

        <Route path="/blogs/:id" element={<BlogDetail />} />
        {/* //   <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
