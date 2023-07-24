import React, { useState, useEffect } from 'react';
import pathModule from 'path';
import FilesViewer from './FilesViewer.jsx';
import { TextField, Divider, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { selectedFile } from '../redux/actions.js';

export const FileBrowser = () => {
  const dispatch = useDispatch();
  const [path, setPath] = useState(''); // path to the current directory
  const [files, setFiles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newDirectoryName, setNewDirectoryName] = useState('');
  const [openDirectoryDialog, setOpenDirectoryDialog] = useState(false);

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
        // Refresh the file list after creation
        window.api.invoke('read-dir', path).then((newFiles) => {
          setFiles([...newFiles]); // Create a new array
        });
      } else {
        console.error("Error creating file:", response.message);
      }
    });
  };

  const onFileDelete = (fileName) => {
    const filePath = pathModule.join(path, fileName);
    window.api.invoke('delete-file', filePath)
      .then((response) => {
        if (response.success) {
          window.api.invoke('read-dir', path).then(setFiles);
        } else {
          console.error("Error deleting file:", response.message);
        }
      });
  };  

  const onDirectoryDelete = (directoryName) => {
      window.api.invoke('delete-directory', path, directoryName).then((response) => {
        if (response.success) {
          window.api.invoke('read-dir', path).then(setFiles);
          if (directoryName === pathModule.basename(path)) {
            setPath(pathModule.dirname(path));  // Update the current directory only if deleted item was a directory and it was the current directory
          }
        } else {
          console.error("Error deleting directory:", response.message);
        }
      });
  };
  
  const onNewDirectory = () => {
    const newDirectoryPath = pathModule.join(path, newDirectoryName); 
    window.api.invoke('create-directory', newDirectoryPath).then((response) => {
      if (response.success) {
        setNewDirectoryName('');
        setOpenDirectoryDialog(false);
        window.api.invoke('read-dir', path).then((newFiles) => {
          setFiles([...newFiles]); // Refresh the file list after creation
        });
      } else {
        console.error("Error creating directory:", response.message);
      }
    });
  };
  
  const [searchString, setSearchString] = useState('');
  const filteredFiles = files.filter((s) => s.name.includes(searchString));

  return (
    <div>
      <TextField 
        placeholder="Search Files" 
        value={searchString} 
        onChange={(event) => setSearchString(event.target.value)} 
        sx={{ width: '95%', alignSelf: 'center', margin: '5px' }}
        />
      <Box 
        display="flex" 
        justifyContent="space-between" 
        sx={{ width: '95%', alignSelf: 'center', margin: '5px' }}
      >
        <Button 
          variant='contained'
          color='secondary'
          sx={{ width: '49%' }}
          onClick={() => setOpenDialog(true)}
        >
          New File
        </Button>
        <Button 
          variant='contained'
          color='secondary'
          sx={{ width: '49%' }}
          onClick={() => setOpenDirectoryDialog(true)}
        >
          New Directory
        </Button>
      </Box>
        <Divider sx={{ width: '95%', alignSelf: 'center', margin: '5px' }} />
      <FilesViewer 
        files={filteredFiles}
        currentDirectory={path}
        onBack={onBack} 
        onOpen={onOpen} 
        onFileClick={onFileClick}
        onFileDelete={onFileDelete}
        onDirectoryDelete={onDirectoryDelete}
        setFiles={setFiles}
      />
      <Dialog open={openDialog} fullWidth={'true'} maxWidth={'sm'} onClose={() => setOpenDialog(false)}>
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
      <Dialog open={openDirectoryDialog}  fullWidth={'true'} maxWidth={'sm'} onClose={() => setOpenDirectoryDialog(false)}>
        <DialogTitle>Create New Directory</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new directory name.
          </DialogContentText>
          <TextField
            autoFocus
            color='background'
            margin="dense"
            id="directoryname"
            label="Directory Name"
            type="text"
            fullWidth
            variant='filled'
            value={newDirectoryName}
            onChange={(e) => setNewDirectoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={() => setOpenDirectoryDialog(false)}>Cancel</Button>
          <Button color='secondary' variant='contained' onClick={onNewDirectory}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
