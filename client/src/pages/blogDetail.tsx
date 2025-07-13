import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container, Typography, Divider } from "@mui/material";
import axios from "../api/axios";

interface Blog {
  title: string;
  content: string;
  user: { firstName: string; lastName: string };
}

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch(() => setBlog(null));
  }, [id]);

  if (!blog) return <Typography>Blog not found</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        {blog.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        by {blog.user.firstName} {blog.user.lastName}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <ReactMarkdown children={blog.content} remarkPlugins={[remarkGfm]} />
    </Container>
  );
}
