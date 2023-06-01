import {createTheme } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    background: {
      default: "#3d405b"
      
    },
    primary: {
      main: "#f4f1de",
      grey: "#3d405b",
      greyDark: "#262738",
      greyLight: "#595D85",
      white: "#f4f1de",
      green: "#0a9396",
    }, 
    secondary: {
      main: "#3d405b"
    },
    tertiary: {
      main: "#493d5b"
    },
    text: {
      primary: "#3d405b",
      secondary: "#3d405b"
    },
    danger: {
      main: "#E07A5F"
    },
    success: {
      main: "#81B29A"
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#f4f1de',
          borderRadius: 10,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#3d405b',
              borderWidth: 3,
            },
            '&:hover fieldset': {
              borderColor: "#0a9396",
            },
            '&.Mui-focused fieldset': {
              borderColor: '#595D85',
              borderWidth: 3,
            },
            '& .MuiInputBase-input': {
              height: 10,
              width: 300,
            },
            '& .MuiFormLabel-root': {
              color: '#3d405b', //needs checked should be placeholder text color
            },
          },
        },
      },
    },
  },
});

export default theme;