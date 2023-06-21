import React, { useState, useEffect } from 'react';
import pathModule from 'path';
import FilesViewer from './FilesViewer.jsx';
import { TextField, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { selectedFile } from '../redux/actions.js';

export const FileBrowser = () => {
  const dispatch = useDispatch();
  const [path, setPath] = useState(''); // path to the current directory
  const [files, setFiles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  useEffect(() => {
    window.api.invoke('get-app-path').then((appPath) => {
      if (!path && appPath) {
        setPath(appPath);
        console.log('appPath', appPath);
      }
    });
  }, [path, setPath]);

  useEffect(() => {
    if (path !== '') {
      window.api.invoke('read-dir', path).then(setFiles);
    }
  }, [path]);

  const onBack = () => setPath(pathModule.dirname(path));
  const onOpen = (folder) => {
    const newPath = pathModule.join(path, folder);
    console.log("New path: ", newPath);
    setPath(newPath);
  };
  
  const onFileClick = (file) => {
    const extension = pathModule.extname(file);
    if (extension === '.txt') {
      //setSelectedFile(pathModule.join(path, file));
      dispatch(selectedFile(pathModule.join(path, file)));
    }
  };

  const onNewFile = () => {
    const newFilePath = pathModule.join(path, newFileName + '.txt'); // assuming that you want to create a txt file
    window.api.invoke('create-file', newFilePath).then((response) => {
      if (response.success) {
        setNewFileName('');
        setOpenDialog(false);
      } else {
        console.error("Error creating file:", response.message);
      }
    });
  };

  const onFileDelete = (file) => {
    const filePath = pathModule.join(path, file.name);
    window.api.invoke('delete-file', filePath).then((response) => {
      if (response.success) {
        // Refresh the file list after deletion
        window.api.invoke('read-dir', path).then((newFiles) => {
          setFiles([...newFiles]); // Create a new array
        });
      } else {
        console.error("Error deleting file:", response.message);
      }
    });
  };
  
  const [searchString, setSearchString] = useState('');
  const filteredFiles = files.filter((s) => s.name.includes(searchString));

  return (
    <div>
      <TextField placeholder="Search Files" onChange={(event) => setSearchString(event.target.value)} value={searchString} />
      <Button variant='contained' color='secondary'onClick={() => setOpenDialog(true)} >Create New File</Button>
      <FilesViewer 
        files={filteredFiles}
        currentDirectory={path}
        onBack={onBack} 
        onOpen={onOpen} 
        onFileClick={onFileClick}
        onFileDelete={onFileDelete} />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new filename.
          </DialogContentText>
          <TextField
            autoFocus
            color='background'
            margin="dense"
            id="filename"
            label="Filename"
            type="text"
            fullWidth
            variant='filled'
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button color='secondary' variant='contained'onClick={onNewFile}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
