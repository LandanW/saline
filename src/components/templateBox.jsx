import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import DeleteIcon from '@mui/icons-material/Delete';



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
    props.setShowEditDialog(true);
    props.fetchTemplateEntries(props.template.id)
  }

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
            <Button variant="contained" color="secondary" sx={{ width: '10%', margin: '5px', height: '70%' }}>
              <ArrowForwardIosIcon />
            </Button>
          </Tooltip>
        </Box>
        </Box>
      </Paper>
    </Box>
  );
}