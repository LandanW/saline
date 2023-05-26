import React, { useState, useEffect } from 'react';
import LeftDrawer from './components/PermanentDrawer';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { FilesViewer } from './components/FilesViewer';
import pathModule from 'path';
import Layout from './Layout';

export default function App() {
  const [path, setPath] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    window.api.invoke('get-app-path').then(setPath);
  }, []);

  useEffect(() => {
    if (path !== '') {
      window.api.invoke('read-dir', path).then(setFiles);
    }
  }, [path]);

  const onBack = () => setPath(pathModule.dirname(path));
  const onOpen = folder => setPath(pathModule.join(path, folder));

  const [searchString, setSearchString] = useState('');
  const filteredFiles = files.filter(s => s.name.includes(searchString));

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <div>
          <h4>{path}</h4>
          <input
            placeholder="Search Files"
            onChange={event => setSearchString(event.target.value)}
            value={searchString}
          />
        </div>
        <FilesViewer files={filteredFiles} onBack={onBack} onOpen={onOpen} />
        <LeftDrawer />
      </ThemeProvider>
    </React.Fragment>
  );
}