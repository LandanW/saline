
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { ipcRenderer } from 'electron';

import 'react-quill/dist/quill.snow.css';

export default function Editor({ file }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (file) {
      ipcRenderer.send('read-rtf', file);
    }
  }, [file]);

  useEffect(() => {
    ipcRenderer.on('rtf-content', (event, html) => {
      setValue(html);
    });

    // Clean up the listener when the component unmounts
    return () => {
      ipcRenderer.removeAllListeners('rtf-content');
    };
  }, []);

  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}
