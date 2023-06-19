import React, { useEffect, useCallback, useRef } from 'react';
import ReactQuill from 'react-quill';
import { useSelector, useDispatch } from 'react-redux';
import { quillDelta, originalQuillDelta } from '../redux/actions';
import { Button } from '@mui/material';
import 'react-quill/dist/quill.snow.css';

export default function Editor() {
  const quillRef = useRef(null);

  const dispatch = useDispatch();
  const file = useSelector(state => state.selectedFile);
  const quillDeltaData = useSelector(state => state.quillDelta);
  const originalQuillDeltaData = useSelector(state => state.originalQuillDelta);

  // Parse the JSON strings
  const parsedQuillDeltaData = JSON.parse(quillDeltaData);
  const parsedOriginalQuillDeltaData = JSON.parse(originalQuillDeltaData);

  // Check if the quillDeltaData has changed
  const hasQuillDeltaChanged = JSON.stringify(parsedQuillDeltaData.ops) !== JSON.stringify(parsedOriginalQuillDeltaData.ops);

  useEffect(() => {
    const quill = quillRef.current.getEditor();
    quill.setContents(parsedQuillDeltaData);
    console.log(` quillDeltaData: ${quillDeltaData}`);
  }, [quillDeltaData]);

  //sets the quill file to the selected file from the redux store
  useEffect(() => {
    if (file) {
      window.api.invoke('read-txt', file)
        .then(text => {
          const quill = quillRef.current.getEditor();
          quill.setText(text);
          dispatch(quillDelta(JSON.stringify(quill.getContents())));
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
        dispatch(quillDelta(JSON.stringify(quill.getContents())));
      })
      .catch(console.error);
  }

  const handleCancel = () => {
    console.log('handleCancel called');

    dispatch(quillDelta(JSON.stringify(originalQuillDeltaData)));
  }
  
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <ReactQuill theme="snow" ref={quillRef} style={{ height: 'calc(100% - 48px)' }}/>
      <Button variant="contained" color="primary" onClick={handleSave} style={{ position: 'absolute', right: '10px', bottom: '10px' }}>
        Save File
      </Button>
      {hasQuillDeltaChanged && 
        <Button variant="contained" color="primary" onClick={handleCancel} style={{ position: 'absolute', right: '80px', bottom: '10px' }}>
          Cancel
        </Button>
      }
    </div>
  );
}

