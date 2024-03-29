import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, Grid, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TemplateEntryStatic from './TemplateEntryStatic';
import TemplateEntryDynamic from './TemplateEntryDynamic';
import TemplateEntryDate from './TemplateEntryDate';
import { useSelector, useDispatch } from 'react-redux';
import { showEditDialog, entries } from '../redux/actions';
import { useTheme } from '@mui/material/styles';



const EditTemplateDialog = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const templateName = props.templateName
  const setTemplateName = props.setTemplateName
  const entryDataRedux = useSelector(state => state.entries);
  const [entryData, setEntryData] = useState(entryDataRedux); //local state

  useEffect(() => {
    setEntryData(entryDataRedux);  // Keep local state in sync with Redux state
  }, [entryDataRedux]);

  const showDialog = useSelector(state => state.showEditDialog);
  const [menuValue, setMenuValue] = useState('static'); //local state
  
  const handleSelectChange = (event) => {
    setMenuValue(event.target.value);
  };

  //create a new entry in the template editor dialog box depending on the type of entry
  const newEntry = () => {
    console.log(`new entry: ${menuValue}`);
    const newEntryData = { menuValue, keyword: "", replacementText: "" };
    setEntryData([...entryData, newEntryData]);
    setMenuValue('static');
  }

  const updateEntry = (index, newData) => {
    const updatedEntries = [...entryData];  // Use local state
    updatedEntries[index] = { ...updatedEntries[index], ...newData };
    setEntryData(updatedEntries);  // Update local state
    dispatch(entries(updatedEntries));  // Update Redux state
  }

  const deleteEntry = (indexToDelete) => {
    // Before removing the entry from the entries state, add its ID to the deletedEntries state.
    const deletedEntryId = entryData[indexToDelete].id;
    props.setDeletedEntries(prevDeletedEntries => [...prevDeletedEntries, deletedEntryId]);
    //if it is a newTemplate is true then just remove the entry from the redux state
    if (props.newTemplate) {
      dispatch(entries(entryData.filter((_, i) => i !== indexToDelete)));
    }
    const updatedEntries = entryData.filter((_, i) => i !== indexToDelete);
    setEntryData(updatedEntries);
  }

  return (
    <>
      <Dialog 
        open={showDialog} 
        fullWidth
      >
        <TextField
          color='background'
          margin="dense"
          id="template-name"
          label="Template Name"
          variant="filled"
          defaultValue={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          sx={{ width: '98%', alignSelf: 'center' }}
        />
        <DialogContent
          sx={{
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
          }}
        >
          <Box>
            {entryData.map((entry, index) => (
              <div key={index}>
                <Typography variant="caption" display="block" sx={{fontWeight: 'light', color: '#595D85'}} >
                  {entry.menuValue.charAt(0).toUpperCase() + entry.menuValue.slice(1)}
                </Typography>
                {entry.menuValue === 'static'  && 
                  <TemplateEntryStatic 
                    index={index} 
                    updateEntry={updateEntry} 
                    keyword={entry.keyword} 
                    replacementText={entry.replacementText} 
                    deleteEntry={deleteEntry} 
                  />
                }
                {entry.menuValue === 'dynamic' && 
                  <TemplateEntryDynamic 
                    index={index} 
                    updateEntry={updateEntry} 
                    keyword={entry.keyword} 
                    deleteEntry={deleteEntry}
                  />
                } 
                {entry.menuValue === 'date' && 
                  <TemplateEntryDate 
                    index={index} 
                    updateEntry={updateEntry} 
                    keyword={entry.keyword} 
                    deleteEntry={deleteEntry}
                  />
                }
              </div>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
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
                    onChange={handleSelectChange}
                  >
                    <MenuItem value={"static"}>Static</MenuItem>
                    <MenuItem value={"dynamic"}>Dynamic</MenuItem>
                    <MenuItem value={"date"}>Date</MenuItem>
                  </Select>
                </FormControl>
                <Tooltip title="Add a new entry">
                  <Button variant="contained" color='secondary' sx={{ margin: '5px' }} onClick={newEntry}>Add</Button>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item>
              <Button color='secondary' sx={{ margin: '2px' }} onClick={() => dispatch(showEditDialog(false))}>Cancel</Button>
              <Button color='danger' variant="contained" sx={{ margin: '2px' }}onClick={props.deleteTemplate}>Delete</Button>
              <Button color='secondary' variant="contained" sx={{ margin: '2px' }} onClick={props.save}>Save</Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditTemplateDialog;