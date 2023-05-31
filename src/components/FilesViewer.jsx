import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Box, IconButton } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from './DeleteDialog';

export default function FilesViewer({ files, onBack, onOpen, onFileClick, currentDirectory, onFileDelete }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [deletedFile, setDeletedFile] = useState(null);

  useEffect(() => {
    if (deletedFile) {
      // Refresh the files in the parent component here
      // This will trigger a re-render of this component with the updated files
      setDeletedFile(null); // Reset the deleted file state
    }
  }, [deletedFile]);

  const openDeleteDialog = (file) => {
    setFileToDelete(file);
    setDeleteDialogOpen(true);
  };

  const handleFileDelete = () => {
    window.api.invoke('delete-file', currentDirectory, fileToDelete)
      .then(() => {
        console.log('File deleted successfully');
        setDeletedFile(fileToDelete); // Set the deleted file state to trigger a re-render
        onFileDelete(fileToDelete);
        setDeleteDialogOpen(false);
      })
      .catch(console.error);
  };

  return (
    <>
      <div>
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <Button variant="contained" color="primary" startIcon={<ArrowUpwardIcon />} onClick={onBack} disableElevation>
            ...
          </Button>
        </Box>
      </div>
      <div>
        <List>
          {files.map((file, index) => (
            <ListItem key={index} button onClick={() => file.isDirectory ? onOpen(file.name) : onFileClick(file.name)}>
              {file.isDirectory ? <FolderOpenIcon /> : <InsertDriveFileIcon />}
              <ListItemText primary={file.name} />
              {!file.isDirectory && (
                <IconButton edge="end" aria-label="delete" onClick={() => openDeleteDialog(file.name)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </ListItem>
          ))}
        </List>
      </div>
      <DeleteDialog open={deleteDialogOpen} handleClose={() => setDeleteDialogOpen(false)} handleConfirm={handleFileDelete} />
    </>
  );
}
