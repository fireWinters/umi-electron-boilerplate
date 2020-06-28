import { app, BrowserWindow } from 'electron';

let mainWindow: Electron.BrowserWindow | null;

async function createWindow(): Promise<void> {
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1280,
    titleBarStyle: 'hidden',
    webPreferences: {
      webSecurity: false,
      devTools: true,
    },
  });
  mainWindow.loadURL('http://localhost:8888');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', async () => {
  if (!process.env.NO_WINDOW) {
    await createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
