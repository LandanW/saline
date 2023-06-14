import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import { Button } from '@mui/material';
import 'react-quill/dist/quill.snow.css';


export default function Editor({ quillRef, file }) {

  useEffect(() => {
    if (file) {
      window.api.invoke('read-txt', file)
        .then(text => {
          const quill = quillRef.current.getEditor();
          quill.setText(text);
        })
        .catch(console.error);
    }
  }, [file]);

  const handleSave = () => {
    const quill = quillRef.current.getEditor();
    const text = quill.getText();
    window.api.invoke('write-txt', file, text)
      .then(() => {
        console.log('File saved successfully');
      })
      .catch(console.error);
  };

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <ReactQuill theme="snow" ref={quillRef} style={{ height: 'calc(100% - 48px)' }}/>
      <Button variant="contained" color="primary" onClick={handleSave} style={{ position: 'absolute', right: '10px', bottom: '10px' }}>
        Save File
      </Button>
    </div>
  );
}
