const {app, BrowserWindow, ipcMain} = require('electron');
const fs = require('fs');
const path = require('path');
const APP_ICON = path.join(__dirname, '/build/icons/512x512.png');

app.on('ready', () => {
    const window = new BrowserWindow({
        width: 1036,
        height: 609,
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
    require('@electron/remote/main').initialize()
    require('@electron/remote/main').enable(window.webContents)
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
    if (!fs.existsSync(app.getPath('userData') + '/config.json')) {
        fs.writeFileSync(app.getPath('userData') + '/config.json', '{ "config": { "language": "en", "custom": "https://gray-crown.web.app/host/Game.json" } }');
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
