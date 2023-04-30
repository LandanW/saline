const { app, BrowserWindow } = require('electron')

require('@electron/remote/main').initialize()

// modify your existing createWindow() function
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1500,
    height: 900,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  })

  win.loadURL('http://localhost:3000')
}

app.on('ready', createWindow)

//quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  //on macOS, re-create a window when dock icon is clicked and no other windows open
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})