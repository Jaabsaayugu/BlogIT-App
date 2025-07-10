import { Grid, Typography, Box, Button, Divider } from "@mui/material";
import type React from "react";
const Header: React.FC = () => {
  return (
    <header>
      <Grid
        container
        direction="row"
        bgcolor="#DDDFF0"
        alignItems="center"
        gap={8}
        justifyContent="space-between"
      >
        <Typography variant="h4" p={3} ml={2} fontWeight={900}>
          🖊️BlogIT
        </Typography>
        <Box component={Divider} flexDirection="row" marginRight={2}>
          <Button
            variant="outlined"
            sx={{ m: 2 }}
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
      </Grid>
      <Divider
        sx={{ border: 1, borderRadius: 2, color: "secondary" }}
      ></Divider>
    </header>
  );
};
export default Header;
