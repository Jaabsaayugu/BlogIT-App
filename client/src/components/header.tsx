import {
  Grid,
  Typography,
  Box,
  Button,
  Divider,
  Stack,
  Avatar,
} from "@mui/material";
import React from "react";
import useUser from "../store/userStore";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const user = useUser((state) => state.user);

  const navLinks = [
    { label: "Blogs", path: "/blogList" },
    { label: "New Blog", path: "/createBlog" },
    { label: "Profile", path: "/profile" },
    { label: "Logout", path: "/login" },
  ];

  return (
    <header>
      <Grid
        container
        direction="row"
        bgcolor="#DDDFF0"
        alignItems="center"
        justifyContent="space-between"
        p={2}
      >
        <Typography variant="h4" fontWeight={900}>
          🖊️BlogIT
        </Typography>

        {user ? (
          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            component="nav"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label + link.path}
                to={link.path}
                style={{ textDecoration: "none" }}
              >
                <Typography variant="body1" fontWeight={600} color="secondary">
                  {link.label}
                </Typography>
              </Link>
            ))}

            <Typography variant="body1" fontWeight="600" color="secondary">
              Welcome {user.firstName}
            </Typography>
            <Avatar sx={{ bgcolor: "indigo" }}>
              {user.firstName[0].toUpperCase()}
              {user.lastName[0].toUpperCase()}
            </Avatar>
          </Stack>
        ) : (
          <Box>
            <Button
              variant="outlined"
              sx={{ mr: 2 }}
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => (window.location.href = "/register")}
            >
              Signup
            </Button>
          </Box>
        )}
      </Grid>

      <Divider sx={{ border: 1, borderRadius: 2, color: "secondary" }} />
    </header>
  );
};

export default Header;
