import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';

import SearchBar from './SearchBar';
import TemplateBox from './TemplateBox';

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