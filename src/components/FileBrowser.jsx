import React, { useState, useEffect } from 'react';
import pathModule from 'path';
import FilesViewer from './FilesViewer.jsx';
import { TextField, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export const FileBrowser = ({ setSelectedFile, path, setPath }) => {
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
  const onOpen = (folder) => setPath(pathModule.join(path, folder));
  const onFileClick = (file) => {
    const extension = pathModule.extname(file);
    if (extension === '.txt') {
      setSelectedFile(pathModule.join(path, file));
    }
  };

  const onNewFile = () => {
    const newFilePath = pathModule.join(path, newFileName + '.txt'); // assuming that you want to create a txt file
    window.api.invoke('create-file', newFilePath).then((response) => {
      if (response.success) {
        // Maybe add a logic to refresh the file list
        setNewFileName('');
        setOpenDialog(false);
      } else {
        console.error("Error creating file:", response.message);
      }
    });
  };

  const [searchString, setSearchString] = useState('');
  const filteredFiles = files.filter((s) => s.name.includes(searchString));

  return (
    <div>
      <Typography variant="h6">{path}</Typography>
      <TextField placeholder="Search Files" onChange={(event) => setSearchString(event.target.value)} value={searchString} />
      <Button onClick={() => setOpenDialog(true)} variant="contained">Create New File</Button>
      <FilesViewer files={filteredFiles} onBack={onBack} onOpen={onOpen} onFileClick={onFileClick} />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new filename.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="filename"
            label="Filename"
            type="text"
            fullWidth
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={onNewFile}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
