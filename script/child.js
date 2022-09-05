const remote = require('electron').remote;
const app = remote.app;
const params = new URLSearchParams(location.search)
const res = params.get('url')
const fs = require('fs');
const notifier = require('node-notifier');
const download = require('download');
const { url } = require('inspector');
const webView = document.getElementById('webview');
const { webViewTag } = require('electron').remote;
const title = document.getElementById('title');
const close = document.getElementById('close');
const minimize = document.getElementById('minimize');
const maximize = document.getElementById('maximize');
const downloads = document.getElementById('downloads');
const titleText = document.getElementById('title-text')
const imageToggle = document.getElementById('img-toggle');
const getWin = () => remote.BrowserWindow.getFocusedWindow();
var logic = 0;
window.onload = function() {
    webView.setAttribute('src', 'https://' + res)
    var url = webView.src;
    title.innerHTML = url
}
const closeWin = () => {
    getWin().close();
}
const minimizeWin = () => {
    getWin().minimize();
}
const maximizeWin = () => {
    const win = getWin();
    win.isMaximized() ? win.unmaximize() : win.maximize();
    win.isMaximized() ? imageToggle.setAttribute("src", "../assets/restore_down_1024.png") : imageToggle.setAttribute("src", "../assets/maximize_1024.png")
}
minimize.addEventListener('click', minimizeWin);
maximize.addEventListener('click', maximizeWin);
close.addEventListener('click', closeWin);
