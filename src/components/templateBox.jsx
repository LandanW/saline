import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { showEditDialog, quillDelta, originalQuillDelta} from '../redux/actions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';



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
  const dispatch = useDispatch();
  const quillDeltaData = useSelector(state => state.quillDelta);
  const parsedQuillDelta = JSON.parse(quillDeltaData);

  const [open, setOpen] = React.useState(false);
  const [dynamicReplacementText, setDynamicReplacementText] = React.useState({});
  const [localEntries, setLocalEntries] = React.useState(null);
  const [dynamicReplacements, setDynamicReplacements] = React.useState({});
  const [dynamicEntries, setDynamicEntries] = React.useState([]);
  const [currentDynamicEntry, setCurrentDynamicEntry] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setDynamicReplacements(prevReplacements => {
      const newReplacements = {
        ...prevReplacements,
        ...dynamicReplacementText,
      };
      handleApplyTemplateWithDynamicValue(localEntries, newReplacements);
      return newReplacements;
    });
    setDynamicReplacementText({});
  };

  const handleCancel = () => {
    dispatch(originalQuillDelta(quillDeltaData));
    setOpen(false);
  };

  const handleEditOpen = () => {
    console.log('edit open');
    props.setTemplateName(props.template.name);
    props.fetchTemplateEntries(props.template.id)
    props.setTemplateId(props.template.id)
    dispatch(showEditDialog(true));
  }

  const handleApplyTemplateWithDynamicValue = (entries, replacements) => {
    if (parsedQuillDelta && parsedQuillDelta.ops) {
      parsedQuillDelta.ops.forEach(op => {
        if (typeof op.insert === 'string') {
          entries.forEach(entry => {
            if (entry.menuValue === 'date') {
              const currentDate = new Date();
              const dateString = currentDate.toISOString().split('T')[0]; // format: 'yyyy-mm-dd'
              op.insert = op.insert.replace(entry.keyword, dateString);
            } else {
              const replacementText = entry.menuValue === 'dynamic' ? replacements[entry.id] : entry.replacementText;
              op.insert = op.insert.replace(entry.keyword, replacementText);
            }
          });
        }
      });
    }
    dispatch(quillDelta(JSON.stringify(parsedQuillDelta)));
  };

  const handleApplyTemplateWithStaticValue = (entries) => {
    if (parsedQuillDelta && parsedQuillDelta.ops) {
      parsedQuillDelta.ops.forEach(op => {
        if (typeof op.insert === 'string') {
          entries.forEach(entry => {
            if (entry.menuValue === 'date') {
              const currentDate = new Date();
              const dateString = currentDate.toISOString().split('T')[0]; // format: 'yyyy-mm-dd'
              op.insert = op.insert.replace(entry.keyword, dateString);
            } else if (entry.menuValue !== 'dynamic') {
              op.insert = op.insert.replace(entry.keyword, entry.replacementText);
            }
          });
        }
      });
    }
    dispatch(quillDelta(JSON.stringify(parsedQuillDelta)));
  };
  
  const applyTemplate = async () => {
    // Save the current state of the editor before applying the template
    dispatch(originalQuillDelta(quillDeltaData));
  
    const entries = await window.api.invoke('read-template-entries', props.template.id);
    const dynamicEntries = entries.filter(entry => entry.menuValue === 'dynamic');
  
    console.log(`applied template ${props.template.name}`);
  
    if (dynamicEntries.length > 0) {
      setLocalEntries(entries);
      setDynamicEntries(dynamicEntries);
      setCurrentDynamicEntry(dynamicEntries[0]);
      handleClickOpen();
    } else {
      handleApplyTemplateWithStaticValue(entries);
    }
  }
  
    
    return (
    <>
      <Box sx={{ display: 'flex', width:'100%' }}>
        <Paper 
          elevation={4}
          sx={{ 
            width: '99%',
            margin: '2px', 
            backgroundColor: 'primary.main' 
          }}
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Input Replacement Text"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the replacement text for dynamic entries.
          </DialogContentText>
          {dynamicEntries.map((entry) => (
            <TextField
              key={entry.id}
              autoFocus
              color='background'
              margin="dense"
              id={entry.id}
              label={entry.keyword}
              type="text"
              fullWidth
              variant='filled'
              onChange={(event) => setDynamicReplacementText({
                ...dynamicReplacementText,
                [entry.id]: event.target.value,
              })}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="secondary" variant='contained'>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}