const {app, BrowserWindow, ipcMain} = require('electron');
const remote = require('electron').remote;
const fs = require('fs');
const path = require('path');
const APP_ICON = path.join(__dirname, '/build/icons/512x512.png');

app.on('ready', () => {
    const window = new BrowserWindow({
        width: 1024,
        height: 600,
        title: 'Graycrown',
        frame: false,
        icon: APP_ICON,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    });
    try {
        require('electron-reloader')(module);
    } catch (e) {}
    window.loadFile('views/index.html');
    window.setMenuBarVisibility(false);
    // check if app.getPath('userData' + /games.json) exists
    // if not, create it
    if (!fs.existsSync(app.getPath('userData') + '/games.json')) {
        fs.writeFileSync(app.getPath('userData') + '/games.json', '{ "games": [] }');
    }
});
// exit all windows onclose
app.on('window-all-closed', () => {
    app.quit();
});
// darwin: quit when all windows are closed
app.on('quit', () => {
    app.quit();
});
