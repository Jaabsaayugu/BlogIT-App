import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Stack,
  Button,
  CardMedia,
  Divider,
} from "@mui/material";
import axios from "../api/axios";
import useUser from "../store/userStore";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { user, setUser, logoutUser } = useUser();
  const [blogs, setBlogs] = useState([]);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/blogs", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setBlogs(res.data));
  }, []);

  const handleUserUpdate = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:4000/api/user",
        { firstName, lastName, email, username },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      setUser(res.data);
      alert("Profile updated");
    } catch (err) {
      alert("Failed to update user info");
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      await axios.patch(
        "http://localhost:4000/api/user/password",
        { currentPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      alert("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      alert("Failed to update password");
    }
  };

  const handleDelete = async (blogId: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBlogs((prev) => prev.filter((blog: any) => blog.id !== blogId));
    } catch (err) {
      alert("Failed to delete blog");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        marginTop: "3.5rem",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            marginBottom: "0.5rem",
          }}
        >
          Your Profile
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h4" color="secondary">
          Your Blogs
        </Typography>
        {blogs.map((blog: any) => (
          <Stack display="flex" flexDirection="row">
            <Paper
              key={blog.id}
              elevation={6}
              component={Container}
              sx={{
                p: 2,
                m: 1,
                alignItems: "center",
                borderRadius: 5,
                bgcolor: "beige",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  border: 2,
                  color: "secondary",
                  borderRadius: 8,
                  p: 1,
                  m: 2,
                  width: { xs: "100%", md: 500, sm: 500 },
                  alignContent: "center",
                  alignItems: "center",
                }}
                height="180"
                image={blog.imageUrl}
                alt={blog.title}
              />
              <Typography variant="h6">{blog.title}</Typography>
              <Typography>{blog.synopsis}</Typography>
              <Stack direction="row" spacing={2} mt={1}>
                <Button
                  variant="contained"
                  sx={{ ml: 3 }}
                  onClick={() => navigate(`/blogs/${blog.id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  sx={{ ml: 4 }}
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </Button>
              </Stack>
            </Paper>
          </Stack>
        ))}

        <Divider
          sx={{
            marginTop: "1rem",
            backgroundColor: "#e2e8f0",
            height: "3px",
            width: "300px",
            margin: "1.5rem auto",
          }}
        />

        <Paper
          elevation={6}
          component={Container}
          sx={{ p: 2, m: 1, borderRadius: 5, bgcolor: "beige" }}
        >
          <Typography variant="h4" fontWeight={600} color="secondary">
            Update Details
          </Typography>
          <Box
            display="flex"
            p={3}
            justifyContent="space-around"
            alignItems="center"
            gap={4}
            mb={3}
          >
            <TextField
              label="First Name"
              size="small"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              size="small"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>

          <Box
            display="flex"
            p={3}
            justifyContent="space-around"
            gap={4}
            mb={3}
          >
            <TextField
              label="Username"
              size="small"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Button
            sx={{ m: "auto" }}
            size="small"
            onClick={handleUserUpdate}
            variant="contained"
          >
            Update Info
          </Button>
        </Paper>
        <Divider sx={{ my: 2, p: 4 }} />

        <Typography variant="h4" fontWeight={800} color="secondary" p={4}>
          Change Password
        </Typography>
        <Stack spacing={2} mb={3} alignItems="center">
          <TextField
            label="Current Password"
            type="password"
            size="small"
            sx={{ width: { xs: "100%", md: 500, sm: 500 } }}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            size="small"
            sx={{ width: { xs: "100%", md: 500, sm: 500 } }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            sx={{ m: "auto", p: 2, width: 0.25 }}
            size="small"
            onClick={handlePasswordUpdate}
            variant="contained"
          >
            Change Password
          </Button>
        </Stack>

        <Paper sx={{ m: 3, mr: 1 }}>
          <Button
            variant="contained"
            sx={{ m: 3, mr: 1 }}
            color="secondary"
            onClick={() => {
              logoutUser();
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;
