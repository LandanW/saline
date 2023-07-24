import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Box, IconButton } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from './DeleteDialog';



export default function FilesViewer({ files, onBack, onOpen, onFileClick, currentDirectory, onFileDelete, onDirectoryDelete, appPath}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [deletedFile, setDeletedFile] = useState(null);
  const [isDirectoryToDelete, setIsDirectoryToDelete] = useState(false);


  useEffect(() => {
    if (deletedFile) {
      // Refresh the files in the parent component here
      // This will trigger a re-render of this component with the updated files
      setDeletedFile(null); // Reset the deleted file state
      setDeleteDialogOpen(false); // Close the delete dialog
    }
  }, [deletedFile]);

  const openDeleteDialog = (event, file) => {
    event.stopPropagation();  // Prevents the click event from bubbling up to the ListItem
    setIsDirectoryToDelete(file.isDirectory);
    setFileToDelete(file.name);
    setDeleteDialogOpen(true);
  };
  

  const handleFileDelete = () => {
    window.api.invoke('delete-file', currentDirectory, fileToDelete)
      .then(() => {
        console.log('File deleted successfully');
        setDeleteDialogOpen(false);  // Close the delete dialog
        onFileDelete(fileToDelete);
      })
      .catch(console.error);
  };

  const handleDirectoryDelete = () => {
    window.api.invoke('delete-directory', currentDirectory, fileToDelete)
      .then(() => {
        console.log('Directory deleted successfully');
        setDeleteDialogOpen(false);  // Close the delete dialog
        onDirectoryDelete(fileToDelete);
      })
      .catch(console.error);
  };
  
  return (
    <>
      <div>
        {currentDirectory !== appPath && (
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <Button variant="contained" color="primary" startIcon={<ArrowUpwardIcon />} onClick={onBack} disableElevation>
              ...
            </Button>
          </Box>
        )}
      </div>
      <div>
        <List>
          {files.map((file, index) => (
            <ListItem key={index} button onClick={() => file.isDirectory ? onOpen(file.name) : onFileClick(file.name)}>
              {file.isDirectory ? <FolderOpenIcon /> : <InsertDriveFileIcon />}
              <ListItemText primary={file.name} />
              <IconButton edge="end" aria-label="delete" onClick={(event) => openDeleteDialog(event, file)}>
                <DeleteIcon />
              </IconButton>

            </ListItem>
          ))}
        </List>
      </div>
      <DeleteDialog 
        open={deleteDialogOpen} 
        handleClose={() => setDeleteDialogOpen(false)} 
        handleConfirm={isDirectoryToDelete ? handleDirectoryDelete : handleFileDelete} 
      />
    </>
  );
}
