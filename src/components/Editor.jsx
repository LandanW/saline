import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';


export default function Editor({ file }) {
  const quillRef = useRef(null); // Add this line

  useEffect(() => {
    if (file) {
      window.api.invoke('read-txt', file)
        .then(text => {
          const quill = quillRef.current.getEditor(); // Get the Quill instance
          quill.setText(text); // Set the text
        })
        .catch(console.error);
    }
  }, [file]);

  // Add the ref to the ReactQuill component
  return <ReactQuill theme="snow" ref={quillRef} />;
}
