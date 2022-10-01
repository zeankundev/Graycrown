const remote = require('@electron/remote/main');
const electron = require('electron')
const params = new URLSearchParams(location.search)
const res = params.get('url')
const fs = require('fs');
const notifier = require('node-notifier');
const download = require('download');
const { url } = require('inspector');
const { webContents } = require('electron');
const webView = document.getElementById('webview');
const title = document.getElementById('title');
const close = document.getElementById('close');
const minimize = document.getElementById('min');
const maximize = document.getElementById('maximize');
const back = document.getElementById('back');
const forward = document.getElementById('forward');
const refresh = document.getElementById('refresh');
const downloads = document.getElementById('downloads');
const titleText = document.getElementById('title-text')
const imageToggle = document.getElementById('img-toggle');
const getWin = () => remote.BrowserWindow.getFocusedWindow();
var logic = 0;
require('@electron/remote/main').enable()
window.onload = function() {
    webView.setAttribute('src', res)
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
back.addEventListener('click', function(e) {
    e.preventDefault();
    webView.goBack();
});
forward.addEventListener('click', function(e) {
    e.preventDefault();
    webView.goForward();
});
refresh.addEventListener('click', function(e) {
    e.preventDefault();
    webView.src = webView.src
})