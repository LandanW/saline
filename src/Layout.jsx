import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Quill from './components/Quill.jsx';
import Templates from './components/Templates.jsx';
import { FileBrowser } from './components/FileBrowser.jsx';



export default function Layout() {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
    flexDirection: 'column',
    minHeight: '98.5vh',
    display: 'flex',
    margin: '5px',
  }));

  return (
    <Grid container spacing={1}>
    <Grid item xs>
      <Item><Templates /></Item>
    </Grid>
    <Grid item xs={6}>
      <Item><Quill /></Item>
    </Grid>
    <Grid item xs>
      <Item><FileBrowser /></Item>
    </Grid>
  </Grid>
  );
}