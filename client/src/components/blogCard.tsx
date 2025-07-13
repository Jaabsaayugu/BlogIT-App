import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Stack,
  Button,
} from "@mui/material";

interface BlogCardProps {
  title: string;
  synopsis: string;
  imageUrl: string;
  user: string;
  initials: string;
  id: string;
}

const BlogCard = ({
  title,
  synopsis,
  imageUrl,
  user,
  initials,
  id,
}: BlogCardProps) => {
  return (
    <Card sx={{ maxWidth: 400, m: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt="blog image"
      />
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {synopsis}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} mt={2}>
          <Avatar>{initials}</Avatar>
          <Typography>{user}</Typography>
        </Stack>
        <Button variant="outlined" href={`/blogs/${id}`} sx={{ mt: 1 }}>
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
