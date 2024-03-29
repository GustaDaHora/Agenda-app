const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

require('update-electron-app')()

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets', 'icon.ico'),
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
const menuTemplate = [
  {
    label: 'Creditos',
    submenu: [
      {
        label: 'Github',
        click() {
          shell.openExternal('https://github.com/GustaDaHora');
        }
      },
      {
        label: 'Repositório',
        click() {
          shell.openExternal('https://github.com/GustaDaHora/Agenda-app');
        }
      },
      {
        label: 'Linkedin',
        click() {
          shell.openExternal('https://www.linkedin.com/in/gustavo-dahora');
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'delete' },
      { type: 'separator' },
      { role: 'selectAll' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  }
];

const mainMenu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(mainMenu);

if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'Dev',
    submenu: [
      {
        label: 'Debug',
        accelerator: process.platform === 'win32' ? "Ctrl+Shift+I" : 'Cmd+Alt+I',
        click(item, focusedwindow) {
          focusedwindow.toggleDevTools();
        }
      },
      {
        label: 'Fullscreen',
        accelerator: 'F11',
        click(item, focusedwindow) {
          focusedwindow.setFullScreen(!focusedwindow.isFullScreen());
        }
      },
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedwindow) {
          if (focusedwindow) focusedwindow.reload();
        }
      },
      {
        label: 'Force Reload',
        accelerator: 'CmdOrCtrl+Shift+R',
        click(item, focusedwindow) {
          if (focusedwindow) focusedwindow.webContents.reloadIgnoringCache();
        }
      }
    ]
  });
}
