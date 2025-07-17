import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Container,
  Typography,
  Divider,
  Box,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import axios from "../api/axios";

interface Blog {
  title: string;
  content: string;
  imageUrl: string;
  user: { firstName: string; lastName: string };
}

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await axios.get(`/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  if (!blog) return <Typography textAlign="center">Blog not found</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        {blog.title}
      </Typography>

      <Typography variant="subtitle1" gutterBottom color="text.secondary">
        {blog.user
          ? `by ${blog.user.firstName} ${blog.user.lastName}`
          : "by Unknown Author"}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <CardMedia
        component="img"
        sx={{
          borderRadius: 5,
          p: 1,
          m: 2,
          width: { xs: "70%", md: "100%", sm: "100%" },
          height: "500",
          alignContent: "center",
          alignItems: "center",
        }}
        height="180"
        image={blog.imageUrl}
        alt={blog.title}
      />

      <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
    </Container>
  );
}
