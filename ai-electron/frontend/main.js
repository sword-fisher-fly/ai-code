const { app, BrowserWindow, ipcMain } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;
let goServer;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    icon: path.join(__dirname, 'icon.png')
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

async function startGoServer() {
  return new Promise((resolve, reject) => {
    const goExe = process.platform === 'win32' ? 'merge2048.exe' : 'merge2048';
    const goPath = path.join(__dirname, '..', '..', 'build', goExe);

    goServer = spawn(goPath, [], {
      cwd: path.join(__dirname, '..', '..')
    });

    goServer.stdout.on('data', (data) => {
      console.log(`Go server: ${data}`);
      if (data.toString().includes('8080')) {
        resolve();
      }
    });

    goServer.stderr.on('data', (data) => {
      console.error(`Go server error: ${data}`);
    });

    goServer.on('error', (error) => {
      console.error('Failed to start Go server:', error);
      reject(error);
    });

    setTimeout(() => resolve(), 2000);
  });
}

async function setupApp() {
  await app.whenReady();
  await startGoServer();
  createWindow();
}

app.whenReady().then(setupApp);

app.on('window-all-closed', () => {
  if (goServer) {
    goServer.kill();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('before-quit', () => {
  if (goServer) {
    goServer.kill();
  }
});

ipcMain.handle('start-new-game', async () => {
  try {
    const response = await fetch('http://localhost:8080/api/new', {
      method: 'POST'
    });
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('make-move', async (event, direction) => {
  try {
    const response = await fetch(`http://localhost:8080/api/move?direction=${direction}`, {
      method: 'POST'
    });
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('get-game-state', async () => {
  try {
    const response = await fetch('http://localhost:8080/api/game');
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
});
