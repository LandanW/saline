import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';

const TemplateEntryStatic = (props) => {
  const [keyword, setKeyword] = useState(props.keyword);
  const [replacementText, setReplacementText] = useState(props.replacementText);

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    props.updateEntry(props.index, { keyword: e.target.value });
  }

  const handleReplacementTextChange = (e) => {
    setReplacementText(e.target.value);
    props.updateEntry(props.index, { replacementText: e.target.value });
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          color='background'
          margin="dense"
          id="keyword"
          label="Keyword"
          variant="filled"
          sx={{ width: '100%',  margin: '0px' }}
          defaultValue={keyword}
          value={keyword}
          onChange={handleKeywordChange}
        />
        <Tooltip title="Delete entry">
          <Button variant="cstandard" color="danger" sx={{height: '55px', margin:'5px' }} onClick={() => props.deleteEntry(props.index)}>
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
        defaultValue={replacementText}
        value={replacementText}
        onChange={handleReplacementTextChange}
      />
      <Divider sx={{margin: '3px'}}/>
    </>
  )
}

export default TemplateEntryStatic