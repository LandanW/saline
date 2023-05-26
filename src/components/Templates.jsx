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

import DragDropFile from './UploadFiles';
import SearchBar from './SearchBar';
import TemplateBox from './TemplateBox';
import Quill from './Quill';
import Breadcrumbs from './Breadcrumbs';

export default function Templates () {
  return (
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
  )
}