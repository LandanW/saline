import React, { useEffect, useCallback, useRef } from 'react';
import ReactQuill from 'react-quill';
import { useSelector, useDispatch } from 'react-redux';
import { quillData } from '../redux/actions';
import { Button } from '@mui/material';
import 'react-quill/dist/quill.snow.css';

export default function Editor() {
  const quillRef = useRef(null);
  const templateApplied = false

  const dispatch = useDispatch();
  const file = useSelector(state => state.selectedFile);

  //if quill data is changed update the editor text
  
  //sets the quill file to the selected file from the redux store
  useEffect(() => {
    if (file) {
      window.api.invoke('read-txt', file)
        .then(text => {
          const quill = quillRef.current.getEditor();
          quill.setText(text);
          dispatch(quillData(text));
      })
      .catch(console.error);
    };
  }, [file]);
  
  const handleSave = () => {
    console.log('handleSave called');
    const quill = quillRef.current.getEditor();
    const text = quill.getText();
    window.api.invoke('write-txt', file, text)
      .then(() => {
        console.log('File saved');
        dispatch(quillData(text));
      })
      .catch(console.error);
  }

  const handleCancel = () => {
    console.log('handleCancel called');
  }
  
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <ReactQuill theme="snow" ref={quillRef} style={{ height: 'calc(100% - 48px)' }}/>
      <Button variant="contained" color="primary" onClick={handleSave} style={{ position: 'absolute', right: '10px', bottom: '10px' }}>
        Save File
      </Button>
      {templateApplied && 
        <Button variant="contained" color="primary" onClick={handleCancel} style={{ position: 'absolute', right: '80px', bottom: '10px' }}>
          Cancel
        </Button>
      }
    </div>
  );
}
