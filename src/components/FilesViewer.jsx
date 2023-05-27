import React from 'react';
import { List, ListItem, ListItemText, Button, Box } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function FilesViewer({ files, onBack, onOpen, onFileClick }) {
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
          </ListItem>
        ))}
      </List>
    </div>
    </>
  );
}

