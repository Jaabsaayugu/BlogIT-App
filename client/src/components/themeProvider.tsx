import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#01579b",
    },
    secondary: {
      main: "#ff5722",
    },
    background: {
      default: "#DDDff0",
    },
    text: {
      primary: "#333",
    },
  },
});
export default ThemeProvider;
