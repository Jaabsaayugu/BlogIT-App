import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Stack,
  Button,
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
          elevation={4}
          sx={{ p: 4, mt: 4, boxShadow: 16, borderRadius: 8 }}
        >
          <Typography variant="h6" fontWeight={600} color="secondary">
            Update Details
          </Typography>
          <Stack spacing={2} mb={3}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <Button onClick={handleUserUpdate} variant="contained">
              Update Info
            </Button>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">Change Password</Typography>
          <Stack spacing={2} mb={3}>
            <TextField
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              fullWidth
            />
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
            />
            <Button onClick={handlePasswordUpdate} variant="outlined">
              Change Password
            </Button>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">Your Blogs</Typography>
          {blogs.map((blog: any) => (
            <Paper key={blog.id} sx={{ p: 2, my: 2 }}>
              <Typography variant="h6">{blog.title}</Typography>
              <Typography>{blog.synopsis}</Typography>
              <Stack direction="row" spacing={2} mt={1}>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/blogs/${blog.id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </Button>
              </Stack>
            </Paper>
          ))}

          <Button
            variant="text"
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
