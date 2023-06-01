import * as React from 'react';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
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
import TemplateEntryStatic from './TemplateEntryStatic';
import TemplateEntryDynamic from './TemplateEntryDynamic';
import TemplateEntryDate from './TemplateEntryDate';

const EditTemplateDialog = (props) => {

  const menuValue = props.menuValue
  const setMenuValue = props.setMenuValue
  const entries = props.entries
  const setEntries = props.setEntries
  const templateName = props.templateName
  const setTemplateName = props.setTemplateName

  const handleSelectChange = (event) => {
    setMenuValue(event.target.value);
  };

  //create a new entry in the template editor dialog box depending on the type of entry
  const newEntry = () => {
    console.log(`new entry: ${menuValue}`);
    const newEntryData = { menuValue, keyword: "", replacementText: "" };
    setEntries([...entries, newEntryData]);
    setMenuValue('static');
  }

  const updateEntry = (index, newData) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = { ...updatedEntries[index], ...newData };
    setEntries(updatedEntries);
  }

  const deleteEntry = (indexToDelete) => {
    setEntries(entries.filter((_, index) => index !== indexToDelete));
  }

  return (
    <>
      <Dialog onClose={props.close} open={props.show} fullWidth
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
          defaultValue={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
        <DialogContent>
          <Box>
            {entries.map((entry, index) => (
              <div key={index}>
                {entry.menuValue === 'static'  && <TemplateEntryStatic index={index} updateEntry={updateEntry} keyword={entry.keyword} replacementText={entry.replacementText} />}
                {entry.menuValue === 'dynamic' && <TemplateEntryDynamic />} 
                {entry.menuValue === 'date' && <TemplateEntryDate />}
                <Button onClick={() => deleteEntry(index)}>Delete</Button>
              </div>
            ))}
          </Box>
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
            <Button variant="contained" color='secondary' sx={{ margin: '10px' }} onClick={newEntry}>Add</Button>
            </Tooltip>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={props.close}>Cancel</Button>
          <Button color='danger' variant="contained" onClick={props.close}>Delete</Button>
          <Button color='secondary' variant="contained" onClick={props.save}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditTemplateDialog;