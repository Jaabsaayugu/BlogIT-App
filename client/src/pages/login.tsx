import { TextField, Box, Button, Paper, Stack, Typography } from "@mui/material";
import Header from "../components/header2";

const Login: React.FC = () => {
  return (
    <Stack bgcolor="#DDDFD9">
    <Header/>
    <Paper sx={{m:'auto', width: "75%", backgroundColor:"white", p:3}}>
    <Box display="flex" alignItems="center" gap={1} mt={8} m="3" justifyContent="center">
        <Typography variant="h2" color="secondary" fontWeight={600}>Login Into Your Account</Typography>
          <form >
            <TextField
              sx={{width: "60%"}}
              margin="normal"
              label="Name"
              variant="outlined"
              required
            />
            <TextField
              sx={{width: "60%"}}
              margin="normal"
              label="Email or Username"
              type="email"
              variant="outlined"
              required
            />
            
            <TextField
              sx={{width: "60%"}}
              margin="normal"
              label="Password"
              variant="outlined"
              rows={4}
              required
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ m:"normal",mt: 3, backgroundColor: "Primary", width: "60%" }}
            >
              Login
            </Button>
          </form>
        </Box>
          <Typography justifyContent="center" m={4} ml="40%">You don't have an account? <Button sx={{textTransform:"lowercase", fontSize:18, color:"indigo"}}onClick={() => window.location.href = "/register"}
>Register</Button ></Typography>
        </Paper>
    </Stack>
  );
};
export default Login