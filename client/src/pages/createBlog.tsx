import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/api/blogs",
        { title, synopsis, content, imageUrl },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      navigate("/blogList");
    } catch (error) {
      alert("Failed to create blog");
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ bgcolor: "beige", p: 3 }}>
        {/* <Paper sx={{ p: 4, mt: 4 }}> */}
        <Typography
          variant="h4"
          fontWeight="bold"
          color="secondary"
          gutterBottom
        >
          Create New Blog
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Description"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              required
            />
            <TextField
              label="Upload an Image URL"
              value={imageUrl}
              multiline
              minRows={3}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            <TextField
              label="Content "
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              minRows={6}
              required
            />
            <Typography variant="h6">Preview:</Typography>
            <Paper sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
              <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
            </Paper>
            <Button type="submit" variant="contained" sx={{ width: 0.15 }}>
              Create Blog
            </Button>
          </Stack>
        </form>
        {/* </Paper> */}
      </Container>
    </>
  );
};

export default CreateBlog;
