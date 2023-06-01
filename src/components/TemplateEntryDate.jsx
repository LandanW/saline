import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';

const TemplateEntryDate = (props) => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '500px', alignItems: 'center' }}>
        <TextField
          color='background'
          margin="dense"
          id="keyword"
          label="Keyword"
          variant="filled"
          sx={{ width: '100%' }}
        />
        <Tooltip title="Delete entry">
          <Button variant="cstandard" color="danger" sx={{margin: '3px'}}>
            <DeleteIcon color='danger'/>
          </Button>
        </Tooltip>
      </Box>
      <TextField
        color='background'
        margin="dense"
        id="keyword"
        label="Replace with"
        fullWidth
        variant="filled"
        multiline
      />
      <Divider sx={{ margin: '10px' }} />
    </>
  )
}

export default TemplateEntryDate