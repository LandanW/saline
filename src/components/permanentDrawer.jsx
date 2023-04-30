import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/material';

import DragDropFile from './uploadFiles';
import SearchBar from './searchBar';
import TemplateBox from './templateBox';
import Quill from './quill';
import Breadcrumbs from './breadcrumbs';

const drawerWidth = 350;

export default function LeftDrawer() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Breadcrumbs />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        PaperProps={{
          sx: {
            backgroundColor: 'primary.main',
          },
        }}
      >
      <Toolbar />
        
        <Box sx={{ overflow: 'auto' }}>
          <SearchBar />
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: '90%',alignSelf: 'center', margin: '10px' }}
          >
          NEW TEMPLATE
          </Button>
          <Divider />
          <TemplateBox />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
          <Quill />
      </Box>
    </Box>
  );
}