import React from 'react';
import LeftDrawer from './components/permanentDrawer';
import { ThemeProvider} from "@mui/material/styles";
import theme from './theme';

const fs = window.require('fs');
const pathModule = window.require('path');

const { app } = window.require('@electron/remote');

export default function App() {
  const [path, setPath] = React.useState(app.getAppPath());

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <LeftDrawer />
      </ThemeProvider>
    </React.Fragment>
  );
}

