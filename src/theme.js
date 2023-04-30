import {createTheme } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    background: {
      default: "#f4f1de"
    },
    primary: {
      main: "#3d405b"
    }, 
    secondary: {
      main: "#0a9396"
    },
    tertiary: {
      main: "#493d5b"
    },
    text: {
      primary: "#f4f1de",
      secondary: "#f4f1de"
    },
    danger: {
      main: "#E07A5F"
    }
  }
});

export default theme;