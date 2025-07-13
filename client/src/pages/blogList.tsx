import {
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Button,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { MdDateRange, MdAccessTime } from "react-icons/md";

interface Blog {
  id: string;
  title: string;
  synopsis: string;
  imageUrl: string;
  createdAt: string;
  user: { firstName: string; lastName: string };
}

const getReadingTime = (text: string): string => {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
};

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Failed to fetch blogs:", err));
  }, []);

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Recent Blog Posts
      </Typography>
      <Grid container spacing={4}>
        {blogs.map((blog) => {
          const initials =
            blog.user.firstName[0].toUpperCase() +
            blog.user.lastName[0].toUpperCase();

          return (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={blog.imageUrl}
                  alt={blog.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog.synopsis.length > 100
                      ? blog.synopsis.substring(0, 100) + "..."
                      : blog.synopsis}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center" mt={2}>
                    <Avatar>{initials}</Avatar>
                    <Typography variant="body2">
                      {blog.user.firstName} {blog.user.lastName}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    mt={1}
                    color="gray"
                  >
                    <Typography
                      variant="caption"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <MdDateRange size={14} />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <MdAccessTime size={14} />
                      {getReadingTime(blog.synopsis)}
                    </Typography>
                  </Stack>
                  <Button
                    variant="outlined"
                    sx={{ mt: 2 }}
                    fullWidth
                    component={Link}
                    to={`/blogs/${blog.id}`}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

// import {
//   Grid,
//   Typography,
//   Avatar,
//   Card,
//   CardContent,
//   CardMedia,
//   Stack,
//   Button,
//   Box,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import { Link } from "react-router-dom";

// interface Blog {
//   id: string;
//   title: string;
//   synopsis: string;
//   imageUrl: string;
//   user: { firstName: string; lastName: string };
// }

//  function BlogList() {
//   const [blogs, setBlogs] = useState<Blog[]>([]);

//   useEffect(() => {
//     axios.get("http://localhost:4000/api/blogs").then((res) => setBlogs(res.data));
//   }, []);

//   return (
//     <>
//     <Typography variant="h5" p={3}  fontWeight="bold" color="secondary">Recent Blog Posts</Typography>
//     <Grid container spacing={3} justifyContent="center" padding={4}>
//       {blogs.map((blog) => {
//         const initials =
//           blog.user.firstName[0].toUpperCase() +
//           blog.user.lastName[0].toUpperCase();
//         return (
//           <Box  key={blog.id}>
//             <Card sx={{ maxWidth: 345 }}>
//               <CardMedia
//                 component="img"
//                 height="180"
//                 image={blog.imageUrl}
//                 alt={blog.title}
//               />
//               <CardContent>
//                 <Typography variant="h5">{blog.title}</Typography>
//                 <Typography color="text.secondary">{blog.synopsis}</Typography>
//                 <Stack direction="row" alignItems="center" spacing={1} mt={2}>
//                   <Avatar>{initials}</Avatar>
//                   <Typography>
//                     {blog.user.firstName} {blog.user.lastName}
//                   </Typography>
//                 </Stack>
//                 <Button
//                   variant="outlined"
//                   sx={{ mt: 1 }}
//                   component={Link}
//                   to={`/blogs/${blog.id}`}
//                 >
//                   Read More
//                 </Button>
//               </CardContent>
//             </Card>
//           </Box>
//         );
//       })}
//     </Grid>
//     </>
//   );
// }
// export default BlogList
