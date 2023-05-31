const { app, BrowserWindow } = require('electron')
const fs = require('fs');
const path = require('path');
const rtfToHTML = require('@iarna/rtf-to-html');


require('@electron/remote/main').initialize()

// modify your existing createWindow() function
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1500,
    height: 900,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: true,
      contextIsolation: true,
      preload: __dirname + '/preload.js'
    }
  })

  win.loadURL('http://localhost:3000')
}

app.on('ready', createWindow)

const { contextBridge, ipcMain } = require('electron')

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

ipcMain.handle('get-app-path', (event) => {
  return app.getAppPath();
});

ipcMain.handle('read-dir', (event, dirPath) => {
  const files = fs.readdirSync(dirPath)
    .map((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size : stats.isFile() ? stats.size : null,
        isDirectory: stats.isDirectory(),
      };
    })
    .sort ((a, b) => {
      if (a.isDirectory === b.isDirectory) {
        return a.name.localeCompare(b.name);
      }
      return a.isDirectory ? -1 : 1;
    });
  return files;
});

ipcMain.handle('read-rtf', async (event, filePath) => {
  return new Promise((resolve, reject) => {
    rtfToHTML.fromStream(fs.createReadStream(filePath), (err, html) => {
      if (err) {
        console.error("main - error reading file:", err);
        reject(err);
      } else {
        console.log("main - read file content:", html);
        resolve(html);
      }
    });
  });
});

ipcMain.handle('read-txt', async (event, filePath) => {
  return fs.promises.readFile(filePath, 'utf-8');
});

ipcMain.handle('write-txt', async (event, filePath, text) => {
  return fs.promises.writeFile(filePath, text);
});

ipcMain.handle('create-file', async (event, filePath) => {
  return fs.promises.writeFile(filePath, '', 'utf-8')
    .then(() => {
      return { success: true, message: "File created successfully" };
    })
    .catch((error) => {
      console.error("main - error creating file:", error);
      return { success: false, message: error.message };
    });
});

ipcMain.handle('delete-file', async (event, currentDirectory, fileToDelete) => {
  const filePath = path.join(currentDirectory, fileToDelete);
  return fs.promises.unlink(filePath);
});

