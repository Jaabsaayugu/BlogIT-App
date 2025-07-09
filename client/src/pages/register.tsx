import { TextField, Box, Button, Typography, Stack, Paper } from "@mui/material";
import Header from "../components/header2";

const Register: React.FC = () => {
  return (
    <Stack bgcolor="#DDDFD9">
    <Header/>
    <Paper sx={{m:'auto', width: "75%", backgroundColor:"white", p:3}}>
    <Box display="flex" alignItems="center" gap={1} mt={1} m="2" justifyContent="center">
        <Typography variant="h2" color="secondary" fontWeight={600}>Create Your Account Today</Typography>
          <form>
            <TextField
              sx={{width: "60%"}}
              size="small"
              margin="normal"
              label="First Name"
              variant="outlined"
              required
            />
             <TextField
              sx={{width: "60%"}}
              size="small"
              margin="normal"
              label="Last Name"
              variant="outlined"
              required
            />
             <TextField
              sx={{width: "60%"}}
              size="small"
              margin="normal"
              label="Username"
              variant="outlined"
              required
            />
            <TextField
              sx={{width: "60%"}}
              size="small"
              margin="normal"
              label="Email Address"
              type="email"
              variant="outlined"
              required
            />
            
            <TextField
              sx={{width: "60%"}}
              size="small"
              margin="normal"
              label="Password"
              variant="outlined"
              rows={4}
              required
            />
             <TextField
              sx={{ width: "60%" }}
              size="small"
              margin="normal"
              label="Confirm Password"
              variant="outlined"
              required
            />
            <Button
              type="submit"
              
              variant="contained"
              sx={{ m: "normal",mt:2, backgroundColor: "Primary", width: "60%" }}
            >
              Signup
            </Button>
          </form>
        </Box>
          <Typography justifyContent="center" m={2} ml="30%">Do you already have an account? <Button sx={{textTransform:"lowercase", fontSize:18, color:"indigo"}}onClick={() => window.location.href = "/login"}
>Login</Button ></Typography>
        </Paper>
    </Stack>
  );
};
export default Register