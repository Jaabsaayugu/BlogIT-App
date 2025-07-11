import { Box, Stack, Typography } from "@mui/material";
import Header from "../components/header";
import { blue } from "@mui/material/colors";

const NewBlog: React.FC = () => {
  return (
    <>
    <Header/>
    <Stack component="animateMotion" border={4} m={3}>
        <Box m={6} bgcolor="blue">
      <Typography variant="h1">Create a Blog Post</Typography>
      </Box>
    </Stack>
    </>
  );
};
export default NewBlog;
