import React, { useEffect, useCallback, useRef, useState } from 'react';
import path from 'path';
import ReactQuill from 'react-quill';
import { useSelector, useDispatch } from 'react-redux';
import { quillDelta } from '../redux/actions';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import 'react-quill/dist/quill.snow.css';

export default function Editor() {
  const quillRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState('');

  const dispatch = useDispatch();
  const file = useSelector(state => state.selectedFile);
  const quillDeltaData = useSelector(state => state.quillDelta);
  const originalQuillDeltaData = useSelector(state => state.originalQuillDelta);

  // Check if the data is defined and is a valid JSON string
  const isJSON = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  // Parse the JSON strings
  const parsedQuillDeltaData = isJSON(quillDeltaData) ? JSON.parse(quillDeltaData) : null;
  const parsedOriginalQuillDeltaData = isJSON(originalQuillDeltaData) ? JSON.parse(originalQuillDeltaData) : null;

  // Check if the quillDeltaData has changed
  const hasQuillDeltaChanged = parsedQuillDeltaData && parsedQuillDeltaData.ops && parsedOriginalQuillDeltaData && parsedOriginalQuillDeltaData.ops 
  ? JSON.stringify(parsedQuillDeltaData.ops) !== JSON.stringify(parsedOriginalQuillDeltaData.ops)
  : false;


  useEffect(() => {
    const quill = quillRef.current.getEditor();
    quill.setContents(parsedQuillDeltaData);
  }, [quillDeltaData]);

  //sets the quill file to the selected file from the redux store
  useEffect(() => {
    if (file) {
      window.api.invoke('read-txt', file)
        .then(text => {
          const quill = quillRef.current.getEditor();
          quill.setText(text);
          dispatch(quillDelta(JSON.stringify(quill.getContents())));
      })
      .catch(console.error);
    };
  }, [file]);
  
  
  const handleSave = (fileName) => {
    console.log('handleSave called');
    const quill = quillRef.current.getEditor();
    const text = quill.getText();
  
    // Get the directory of the current file
    const directoryPath = path.dirname(file);
  
    // Join the directory path with the new filename to get the full file path
    const fullPath = path.join(directoryPath, fileName);
  
    window.api.invoke('write-txt', fullPath, text)
      .then(() => {
        console.log('File saved');
        dispatch(quillDelta(JSON.stringify(quill.getContents())));
      })
      .catch(console.error);
  }

  const handleCancel = () => {
    dispatch(quillDelta(originalQuillDeltaData));
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveAs = () => {
    handleSave(fileName);
    setOpen(false);
  }

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ReactQuill theme="snow" ref={quillRef} style={{ flexGrow: 1 }}/>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', padding: '10px' }}>
        {hasQuillDeltaChanged && 
          <Button variant="contained" color="primary" onClick={handleCancel}>
            Undo
          </Button>
        }
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Save As
        </Button>
      </div>
      <Dialog open={open} fullWidth={'true'} maxWidth={'sm'} onClose={handleClose}>
        <DialogTitle>Save As</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a filename for the new file:
          </DialogContentText>
          <TextField
            autoFocus
            color='background'
            margin="dense"
            id="name"
            label="Filename"
            type="text"
            variant='filled'
            fullWidth
            onChange={handleFileNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleSaveAs} color='secondary' variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
