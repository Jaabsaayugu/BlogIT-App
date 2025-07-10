import React from "react";
import Header from "../components/header2";
import {
  Stack,
  Box,
  Typography,
  Button,
  Grid,
  Divider,
  Table,
  Paper,
} from "@mui/material";
import { blue, red } from "@mui/material/colors";
const Home: React.FC = () => {
  return (
    <Stack sx={{ backgroundColor: "#DDDFF0" }}>
      <Header />
      <Box
        p={4}
        m={2}
        display="flex"
        flexDirection="row"
        gap={10}
        borderRadius={5}
      >
        <Box
          component="img"
          src="/Table.jpg"
          alt="BlogIt Logo"
          sx={{ width: "auto", height: 500, borderRadius: 4 }}
        />
        <Box>
          <Paper sx={{ backgroundColor: "White", borderRadius: 3 }}>
            <Typography
              variant="h1"
              p={7}
              justifyContent="center"
              fontWeight={900}
              fontSize={50}
            >
              {" "}
              📒Welcome to BlogIT where we help you post your Blogs and keep
              their track 🗓️{" "}
            </Typography>
          </Paper>
          <Typography variant="body1" p={4} color="grey">
            ⭐Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae neque alias, porro ipsam ut asperiores adipisci sequi
            eligendi quo nam rem quam illo dolorem quisquam doloribus,
            consectetur et tenetur odio!
          </Typography>
          <Box p={2}>
            <Button variant="contained" sx={{ m: "auto" }}>
              Upload a Blog
            </Button>
            <Button variant="outlined" sx={{ ml: 2 }}>
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default Home;
