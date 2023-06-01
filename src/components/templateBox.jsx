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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <Button variant="outlined" color="secondary" onClick={handleClickOpen} sx={{ width: '10%', margin: '5px', height: '70%'}}>
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
      <Dialog open={open} onClose={handleClose} 
        BackdropProps={{ sx: { backgroundColor: 'transparent' } }}
        PaperProps={{ sx: { backgroundColor: 'primary.main',} }}
        
      >
        <TextField
          color='background'
          margin="dense"
          id="template-name"
          label="Template Name"
          fullWidth
          variant="filled"
          defaultValue={props.template.name}
        />
        <DialogContent>
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
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <FormControl 
              variant='outlined'
            >
              <Select
                id="entry-type"
                color='primary'
                defaultValue={"static"}
                size='small'
                displayEmpty
                sx={{ 
                  backgroundColor: 'primary.main',
                }}
                inputProps={{ 
                  'aria-label': 'Without label',
                  MenuProps: {
                    MenuListProps: {
                      sx: {backgroundColor: 'primary.main'} 
                    }
                  } 
                }}
              >
                <MenuItem value={"static"}>Static</MenuItem>
                <MenuItem value={"dynamic"}>Dynamic</MenuItem>
                <MenuItem value={"date"}>Date</MenuItem>
              </Select>
            </FormControl>
            <Tooltip title="Add a new entry">
            <Button variant="contained" color='success' sx={{ margin: '10px' }}>Add</Button>
            </Tooltip>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={handleClose}>Cancel</Button>
          <Button color='danger' variant="contained" onClick={handleClose}>Delete</Button>
          <Button color='secondary' variant="contained" onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}