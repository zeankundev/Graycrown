const {app, BrowserWindow, ipcMain} = require('electron');
const fs = require('fs');
const path = require('path');
const { URLSearchParams } = require('url');
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
            contextIsolation: false,
            webviewTag: true
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
        fs.writeFileSync(app.getPath('userData') + '/config.json', '{"config":{"language":"en","custom":"https://bobuxstation.github.io/Coal-Web/games.json","styleURL":"css/default.css", "startup": "default"}}', { encoding: 'utf8' });
    }
    if (!fs.existsSync(app.getPath('userData') + '/styles')) {
        fs.mkdirSync(app.getPath('userData') + '/styles');
    }
    if (!fs.existsSync(app.getPath('userData') + '/plugins')) {
        fs.mkdirSync(app.getPath('userData') + '/plugins');
    }
});
// define launch protocol
app.setAsDefaultProtocolClient('graycrown')
// return OAUTH URL
app.on('open-url', (e, url) => {
    const paramss = new URLSearchParams(window.location.href) 
    console.log(`OK: RECEIVE URL: ${url}`);
    const auth = paramss.get('code')
    const method = paramss.get('method')
    e.preventDefault();
    const win = BrowserWindow.getAllWindows()[0];
    win.webContents.send('auth-code', {auth,method})
})
// exit all windows onclose
app.on('window-all-closed', () => {
    app.quit();
});
// darwin: quit when all windows are closed
app.on('quit', () => {
    app.quit();
});