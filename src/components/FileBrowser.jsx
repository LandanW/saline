import React, { useState, useEffect } from 'react';
import pathModule from 'path';
import FilesViewer from './FilesViewer.jsx';
import { TextField, Typography } from '@mui/material';

export const FileBrowser = ({ setSelectedFile, path, setPath }) => {
  const [files, setFiles] = useState([]);

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

  const [searchString, setSearchString] = useState('');
  const filteredFiles = files.filter((s) => s.name.includes(searchString));

  return (
    <div>
      <Typography variant="h6">{path}</Typography>
      <TextField placeholder="Search Files" onChange={(event) => setSearchString(event.target.value)} value={searchString} />
      <FilesViewer files={filteredFiles} onBack={onBack} onOpen={onOpen} onFileClick={onFileClick} />
    </div>
  );
};
