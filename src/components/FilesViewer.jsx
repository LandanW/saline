import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';

export default function FilesViewer({ files, onBack, onOpen, onFileClick }) {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  const openDeleteDialog = (file) => {
    setFileToDelete(file);
    setOpenConfirmDialog(true);
  };

  const closeDeleteDialog = () => {
    setOpenConfirmDialog(false);
  };

  const confirmDelete = () => {
    // invoke your Electron API to delete the file here
    window.api.invoke('delete-file', fileToDelete);
    setOpenConfirmDialog(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="flex-start">
        <Button variant="contained" color="primary" startIcon={<ArrowUpwardIcon />} onClick={onBack} disableElevation>
          ...
        </Button>
      </Box>
      <List>
        {files.map((file, index) => (
          <ListItem key={index} button onClick={() => file.isDirectory ? onOpen(file.name) : onFileClick(file.name)}>
            {file.isDirectory ? <FolderOpenIcon /> : <InsertDriveFileIcon />}
            <ListItemText primary={file.name} />
            {!file.isDirectory && (
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => openDeleteDialog(file.name)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
      <Dialog
        open={openConfirmDialog}
        onClose={closeDeleteDialog}
      >
        <DialogTitle>Delete File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this file?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
