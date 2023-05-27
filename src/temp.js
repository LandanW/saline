import React, { useState, useEffect } from 'react';
import pathModule from 'path';
import FilesViewer from './FilesViewer.jsx';
import { TextField, Typography } from '@mui/material';
import Editor from './Editor.jsx';

export const FileBrowser = () => {
  const [path, setPath] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    window.api.invoke('get-app-path').then(setPath);
  }, []);

  useEffect(() => {
    if (path !== '') {
      window.api.invoke('read-dir', path).then(setFiles);
    }
  }, [path]);

  const onBack = () => setPath(pathModule.dirname(path));
  const onOpen = file => {
    if (file.isDirectory) {
      setPath(pathModule.join(path, file));
    } else if ( file.extension === '.rtf') {
      setSelectedFile(file);
    }
  };

  const [searchString, setSearchString] = useState('');
  const filteredFiles = files.filter(s => s.name.includes(searchString));

  return (
    <div>
      <Typography variant="h6">{path}</Typography>
      <TextField
        placeholder="Search Files"
        onChange={event => setSearchString(event.target.value)}
        value={searchString}
      />
      <FilesViewer files={filteredFiles} onBack={onBack} onOpen={onOpen} />
      {selectedFile && <Editor file={selectedFile} />}
    </div>
  );
}
