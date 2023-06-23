import React, { useRef, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import theme from './theme';
import Editor from './components/Editor.jsx';
import Templates from './components/Templates.jsx';
import { FileBrowser } from './components/FileBrowser.jsx';
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
    flexDirection: 'column',
    minHeight: '95vh',
    maxHeight: '95vh', 
    maxWidth: '100%', 
    display: 'flex',
    margin: '5px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '10px',
      height: '40px',
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.primary.main,
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.secondary.main,
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: theme.palette.secondary.main,
    },
  }));

  return (
    <div className="app">
      <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Grid container className='grid'>
          <Grid item xs={3}>
            <Item>
              <Templates/>
            </Item>
          </Grid>
          <Grid item xs={6} className='grid'>
            <Item>
              <Editor/>
            </Item>
          </Grid>
          <Grid item xs={3} className='grid'>
            <Item><FileBrowser/></Item>
          </Grid>
        </Grid>
      </ThemeProvider>
      </Provider>
    </div>
  );
}
