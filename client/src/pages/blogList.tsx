import {
  Grid,
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Button,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

interface Blog {
  id: string;
  title: string;
  synopsis: string;
  imageUrl: string;
  createdAt: string;
  user: { firstName: string; lastName: string };
}

const getReadingTime = (text: string): string => {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
};

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await axios.get("api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    }

    fetchBlogs();
  }, []);

  // const uploadImage = (files: FileList) => {
  //   console.log(files[0]);
  // };

  return (
    <Container sx={{ mt: 6 }}>
      {/* <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            uploadImage(e.target.files);
          }
        }}
      /> */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Recent Blog Posts
      </Typography>
      <Grid container spacing={4}>
        {blogs.map((blog) => {
          const initials =
            blog.user.firstName[0].toUpperCase() +
            blog.user.lastName[0].toUpperCase();

          return (
            <Box
              key={blog.id}
              sx={{
                width: { xs: "100%", sm: "48%", md: "30%" },
                mb: 4,
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={blog.imageUrl}
                  alt={blog.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog.synopsis.length > 100
                      ? blog.synopsis.substring(0, 100) + "..."
                      : blog.synopsis}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center" mt={2}>
                    <Avatar sx={{ bgcolor: "indigo" }}>{initials}</Avatar>
                    <Typography variant="body2">
                      {blog.user.firstName} {blog.user.lastName}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    mt={1}
                    color="gray"
                  >
                    <Typography
                      variant="body2"
                      color="secondary"
                      fontWeight={800}
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Typography>📆</Typography>
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="secondary"
                      fontWeight={800}
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Typography>⏰</Typography>
                      {getReadingTime(blog.synopsis)}
                    </Typography>
                  </Stack>
                  <Button
                    variant="text"
                    sx={{ mt: 2 }}
                    component={Link}
                    to={`/blogs/${blog.id}`}
                  >
                    Read More ↗️
                  </Button>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Grid>
    </Container>
  );
}
