import {
  TextField,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import Header from "../components/header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../api/axios";
import useUser from "../store/userStore";

interface UserDetails {
  identifier: string;
  password: string;
}

const Login: React.FC = () => {
  // const { setUser } = useUser();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const { isPending, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (userDetails: UserDetails) => {
      const response = await axiosInstance.post("/auth/login", userDetails);
      console.log(response.data);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        setFormError(message || "Login failed");
      } else {
        setFormError("Something went Wrong! Try again Later!");
      }
    },
    onSuccess: (data) => {
      setUser(data);
      navigate("/blogList");
    },
  });

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    // if (password != confirmPassword) {
    //   setFormError("The Password and Confirm password must match")
    //   return;
    // }
    mutate({ identifier, password });
  }

  return (
    <Stack bgcolor="#DDDFD9">
      <Header />
      <Paper sx={{ m: "auto", width: "75%", backgroundColor: "white", p: 3 }}>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          mt={8}
          m="3"
          justifyContent="center"
        >
          <Typography variant="h2" color="secondary" fontWeight={600}>
            Login Into Your Account
          </Typography>
          <form>
            {formError && <Alert severity="error">{formError}</Alert>}

            {/* <TextField
              sx={{ width: "60%" }}
              margin="normal"
              label="Name"
              variant="outlined"
              required
            /> */}
            <TextField
              sx={{ width: "60%" }}
              margin="normal"
              label="Email or Username"
              type="email"
              variant="outlined"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />

            <TextField
              sx={{ width: "60%" }}
              margin="normal"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rows={4}
              required
            />
            <Button
              type="submit"
              variant="contained"
              loading={isPending}
              onClick={handleLogin}
              sx={{
                m: "normal",
                mt: 3,
                backgroundColor: "Primary",
                width: "60%",
              }}
            >
              Login
            </Button>
          </form>
        </Box>
        <Typography justifyContent="center" m={4} ml="40%">
          You don't have an account?{" "}
          <Button
            sx={{ textTransform: "lowercase", fontSize: 18, color: "indigo" }}
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </Button>
        </Typography>
      </Paper>
    </Stack>
  );
};
export default Login;
