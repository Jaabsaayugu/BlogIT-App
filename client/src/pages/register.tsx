import {
  TextField,
  Box,
  Button,
  Typography,
  Stack,
  Paper,
  Alert,
} from "@mui/material";
import Header from "../components/header";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["signup-user"],
    mutationFn: async (newUser: User) => {
      const response = await axiosInstance.post("/auth/register", newUser);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        setFormError(message || "Signup failed");
      } else {
        setFormError("Something went Wrong! Try again Later!");
      }
    },
    onSuccess: () => {
      console.log("Registration Successful!");
      navigate("/login");
    },
  });

  function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    if (password != confirmPassword) {
      setFormError("The Password and Confirm password must match");
      return;
    }
    const newUser = { firstName, lastName, email, username, password };
    mutate(newUser);
  }

  return (
    <Stack bgcolor="#DDDFD9">
      <Header />
      <Paper sx={{ m: "auto", width: "75%", backgroundColor: "white", p: 3 }}>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          mt={1}
          m="2"
          justifyContent="center"
        >
          <Typography variant="h2" color="secondary" fontWeight={600}>
            Create Your Account Today
          </Typography>
          <form>
            {formError && <Alert severity="error">{formError}</Alert>}
            <TextField
              sx={{ width: "60%" }}
              size="small"
              margin="normal"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="outlined"
              required
            />
            <TextField
              sx={{ width: "60%" }}
              size="small"
              margin="normal"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant="outlined"
              required
            />
            <TextField
              sx={{ width: "60%" }}
              size="small"
              margin="normal"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              required
            />
            <TextField
              sx={{ width: "60%" }}
              size="small"
              margin="normal"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              variant="outlined"
              required
            />

            <TextField
              sx={{ width: "60%" }}
              size="small"
              margin="normal"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              rows={4}
              required
            />
            <TextField
              sx={{ width: "60%" }}
              size="small"
              margin="normal"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              required
            />
            <Button
              type="submit"
              onClick={handleSignUp}
              loading={isPending}
              variant="contained"
              sx={{
                m: "normal",
                mt: 2,
                backgroundColor: "Primary",
                width: "60%",
              }}
            >
              Signup
            </Button>
          </form>
        </Box>
        <Typography justifyContent="center" m={2} ml="30%">
          Do you already have an account?{" "}
          <Button
            sx={{ textTransform: "lowercase", fontSize: 18, color: "indigo" }}
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </Button>
        </Typography>
      </Paper>
    </Stack>
  );
};
export default Register;
