import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import replaceTextInQuill from '../utils/findAndReplace';



const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  overflow: 'hidden',
  height: '50px',
  display: 'flex',
  lineHeight: '1.5',
  flexGrow: 1,
}));

export default function TemplateBox(props) {
  const handleEditOpen = () => {
    console.log('edit open');
    props.setTemplateName(props.template.name);
    props.fetchTemplateEntries(props.template.id)
    props.setTemplateId(props.template.id)
    props.setShowEditDialog(true);
  }

  const applyTemplate = async () => {
    const entries = await window.api.invoke('read-template-entries', props.template.id);
    console.log(`applied template ${props.template.name}`);
    const quill = props.quillRef.current.getEditor();
    entries.forEach(entry => {
      replaceTextInQuill(quill, entry.keyword, entry.replacementText);
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Paper 
        elevation={4}
        sx={{ width: '90%',alignSelf: 'center', margin: '10px', backgroundColor: 'primary.main' }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
        <Div>{props.template.name}</Div>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Tooltip title="Edit">
            <Button variant="outlined" color="secondary" onClick={handleEditOpen} sx={{ width: '10%', margin: '5px', height: '70%'}}>
              <EditIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Appy Template">
            <Button variant="contained" color="secondary" onClick={applyTemplate} sx={{ width: '10%', margin: '5px', height: '70%' }}>
              <ArrowForwardIosIcon />
            </Button>
          </Tooltip>
        </Box>
        </Box>
      </Paper>
    </Box>
  );
}