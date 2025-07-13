// src/pages/EditBlog.tsx
import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const EditBlog: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:4000/api/blogs/${id}`).then((res) => {
      const blog = res.data;
      setTitle(blog.title);
      setSynopsis(blog.synopsis);
      setImageUrl(blog.imageUrl);
      setContent(blog.content);
    });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:4000/api/blogs/${id}`,
        { title, synopsis, content, imageUrl },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      navigate("/profile");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Blog
        </Typography>
        <form onSubmit={handleUpdate}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Synopsis"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              fullWidth
            />
            <TextField
              label="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              fullWidth
            />
            <TextField
              label="Content (Markdown)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              fullWidth
              minRows={6}
            />
            <Typography variant="h6">Preview:</Typography>
            <Paper sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
              <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
            </Paper>
            <Button type="submit" variant="contained">
              Update Blog
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default EditBlog;
