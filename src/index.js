import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Get the app path from the main process
window.api.invoke('get-app-path').then((appPath) => {
  // Pass the app path as a prop to the App component
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App appPath={appPath} />
    </React.StrictMode>
  );
});


reportWebVitals();
