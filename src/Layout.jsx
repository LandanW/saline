import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Editor from './components/Editor.jsx';
import Templates from './components/Templates.jsx';
import { FileBrowser } from './components/FileBrowser.jsx';
import { useState } from 'react';


export default function Layout() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [path, setPath] = useState(''); 

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
    flexDirection: 'column',
    minHeight: '95vh',
    maxHeight: '95vh', // add this to prevent the Item from growing in height
    maxWidth: '100%', // add this to prevent the Item from growing in width
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
    <Grid container className='grid'>
      <Grid item xs>
        <Item><Templates /></Item>
      </Grid>
      <Grid item xs={6} className='grid'>
        <Item><Editor file={selectedFile} /></Item>
      </Grid>
      <Grid item xs className='grid'>
      <Item><FileBrowser setSelectedFile={setSelectedFile} path={path} setPath={setPath} /></Item>
      </Grid>
    </Grid>
  );
}