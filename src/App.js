import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Layout from './Layout';

export default function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </React.Fragment>
  );
}