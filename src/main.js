const { app, BrowserWindow } = require('electron')
const fs = require('fs');
const path = require('path');
const rtfToHTML = require('@iarna/rtf-to-html');
const sqlite3 = require('sqlite3');


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

//EDITOR
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

//DATABASE
//connect to database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error("main - error opening database:", err);
  } else {
    console.log("main - opened database");
  }
});

// Create the templates table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS templates (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)`, function(err) {
  if (err) {
    console.error("main - error creating templates table:", err);
  } else {
    console.log("main - created or confirmed existence of templates table");
  }
});

// Create the entries table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  template_id INTEGER,
  menuValue TEXT NOT NULL,
  keyword TEXT NOT NULL,
  replacementText TEXT NOT NULL,
  FOREIGN KEY(template_id) REFERENCES templates(id)
)`, function(err) {
  if (err) {
    console.error("main - error creating entries table:", err);
  } else {
    console.log("main - created or confirmed existence of entries table");
  }
});


ipcMain.handle('create-template', async (event, templateName) => {
  return new Promise((resolve, reject) => {
    let stmt = db.prepare("INSERT INTO templates (name) VALUES (?)");
    stmt.run([templateName], function(err) {
      if (err) {
        console.error("main - error inserting template:", err);
        reject(err);
      } else {
        console.log("main - inserted template:", this.lastID);
        resolve(this.lastID);
      }
    });
  });
});

ipcMain.handle('create-entry', async (event, templateId, menuValue, keyword, replacementText) => {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO entries (template_id, menuValue, keyword, replacementText) VALUES (?, ?, ?, ?)`,
      [templateId, menuValue, keyword, replacementText],
      function(err) {
        if (err) {
          console.error("main - error creating entry:", err);
          reject(err);
        } else {
          console.log("main - created entry for template:", templateId);
          resolve(this.lastID);
        }
      }
    );
  });
});


ipcMain.handle('read-template-names', async (event) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT id, name FROM templates`, function(err, rows) {
      if (err) {
        console.error("main - error reading template names:", err);
        reject(err);
      } else {
        console.log("main - read template names");
        resolve(rows.map(row => ({ id: row.id, name: row.name })));
      }
    });
  });
});

ipcMain.handle('read-template-entries', async (event, templateId) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM entries WHERE template_id = ?`, [templateId], function(err, rows) {
      if (err) {
        console.error("main - error reading entries:", err);
        reject(err);
      } else {
        console.log("main - read entries for template id:", templateId);
        resolve(rows);
      }
    });
  });
});




