const remote = require('electron').remote;
const app = remote.app;
const fs = require('fs');
const notifier = require('node-notifier');
const download = require('download');
const { url } = require('inspector');
const close = document.getElementById('close');
const minimize = document.getElementById('minimize');
const maximize = document.getElementById('maximize');
const downloads = document.getElementById('downloads');
const titleText = document.getElementById('title-text')
const imageToggle = document.getElementById('img-toggle');
const text = document.getElementById('text');
const notif = document.getElementById('notif')
const modal = document.getElementById('download-modal');
const closeModal = document.getElementById('close-modal');
// translation area
const welcomeBack = document.getElementById('welcome-back');
const library = document.getElementById('library');
const store = document.getElementById('store');
const easter = document.getElementById('secret');
const minesweeper = document.getElementById('minesweeper-tab')
const settings = document.getElementById('settings');
const wineSettings = document.getElementById('wine-settings');
const downloadsText = document.getElementById('downloads-text');
const noDownloads = document.getElementById('no-downloads');
// end of translation area
// fetch json of corresponding language
window.onload = function() {
    const lang = 'en';
    // new lang make it lowercase
    const langLower = lang.toLowerCase();
    const path = `../language/${langLower}.json`;
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) throw err;
        const json = JSON.parse(data);
        welcomeBack.innerHTML = json.translations.welcomeBack;
        library.innerHTML = json.translations.library;
        store.innerHTML = json.translations.store;
        settings.innerHTML = json.translations.settings;
        wineSettings.innerHTML = json.translations.wineSettings;
        downloadsText.innerHTML = json.translations.downloadsText;
        noDownloads.innerHTML = json.translations.noDownloads;
    }
    );
}
function notifDisplay(txt, title) {
    notif.style.display = 'block';
    text.innerHTML = txt;
    titleText.innerHTML = title
    setTimeout(function(){
        notif.style.display = 'none';
    }, 4000)
}
var count = 0
easter.onclick = function() {
    count = count + 1
    console.log('set count to: ' + count)
    if ((count > 2) && (count < 10)) {
        var more = 10 - count
        notifDisplay('You are ' + more + ' clicks closer to the secret!', 'Few clicks closer!')
    }
    if (count == 10) {
        minesweeper.style.display = "block";
        notifDisplay('A new game mode has been unlocked! Good luck!', 'Yay!')
    }
    ha = setTimeout(lol, 2000)
}
function lol() {
    count = 0
    console.log('reset count to ' + count)
}

const getWin = () => remote.BrowserWindow.getFocusedWindow();
var logic = 0;
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
downloads.onclick = function() {
    modal.style.display = "block";
}
closeModal.onclick = function() {
    modal.style.display = "none";
}
// if it clicks anywhere out of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

openMenu(event, 'home')
// check available games in the games.json file
    /* json schema:
    {
        "games": [
            {
                "name": "game name",
                "path": "path to game folder",
                "icon": "path to icon",
                "args": "arguments to pass to game",
            },
            ...
        ]
    }*/
    const exec = require('child_process').exec;
    /*function getGames() {
        fetch(app.getPath('userData') + '/games.json')
            .then(response => response.json())
            .then(data => {
                let gameList = document.getElementById("game-list");
                gameList.innerHTML = "";
                data.games.forEach(game => {
                    let gameDisplay = document.createElement("div");
                    gameDisplay.className = "game-display";
                    if (game.icon == "" || game.icon == undefined) {
                        game.icon = "../assets/logo_1024.png";
                    }
                    gameDisplay.innerHTML = `
                        <img style="width: 48px !important; height:48px !important; border-radius: 15px;" src="${game.icon}">
                        <div class="game-title">${game.name}</div>
                    `;
                    let gameButton = document.createElement("button");
                    gameButton.className = "play";
                    gameButton.innerHTML = "Play";
                    gameButton.onclick = function() {
                        // downgraded to electron v4, now we can require child_process.
                        const { spawn } = require('child_process');
                        const process = spawn(game.exec, game.args);
                        process.on('error', (err) => {
                            notifDisplay(err, 'Failed to launch');
                            notifier.notify({
                                title: 'Failed to launch',
                                message: err
                            })
                        });
                    }
                    gameDisplay.appendChild(gameButton);
                    gameList.appendChild(gameDisplay);
                });
            });
        }*/
            function getGames() {
                fetch(app.getPath('userData') + '/games.json')
                    .then(response => response.json())
                    .then(data => {
                        let gameList = document.getElementById("game-list-alt");
                        gameList.innerHTML = "";
                        data.games.forEach(game => {
                            let gameDisplay = document.createElement("div");
                            //if game.icon is empty, use default icon
                            if (game.icon == "" || game.icon == undefined) {
                                game.icon = "../assets/logo_1024.png";
                            }
                            gameDisplay.className = "game-display";
                            gameDisplay.innerHTML = `
                                <img style="width: 48px !important; height:48px !important; border-radius:15px;" src="${game.icon}">
                                <div class="game-title">${game.name}</div>
                            `;
                            let gameButton = document.createElement("button");
                            gameButton.className = "play";
                            gameButton.innerHTML = "Play";
                            gameButton.onclick = function() {
                                // downgraded to electron v4, now we can require child_process.
                                const { spawn } = require('child_process');
                                const process = spawn(game.exec, game.args);
                                process.on('error', (err) => {
                                    throw new Error(err)
                                    notifDisplay(err, 'Failed to launch!')
                                });
                            }
                            gameDisplay.appendChild(gameButton);
                            gameList.appendChild(gameDisplay);
                        });
                    });
    }
    getGames();
    // check any changes on app.getPath('userData' + /games.json)
    // if changes, getGames()
    fs.watch(app.getPath('userData') + '/games.json', (event, filename) => {
        getGames();
    });
    function openMenu(e, menu) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
            console.log("OK: tabcontent[i].style.display = \"none\"");
        }
        tablinks = document.getElementsByClassName("tab");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
            console.log("OK: tablinks[i].className = tablinks[i].className.replace(\" active\", \"\")");
        }
        document.getElementById(menu).style.display = "block";
        document.getElementsByClassName("container")[0].style.display = "block";
        document.getElementById(menu + '-tab').className = "tab active";
        console.log("OK: e.currentTarget.className += \" active\"");
    }
    function fetchStores() {
        fetch('../test/Store.json')
            .then(response => response.json())
            .then(data => {
                let storeList = document.getElementById("store-list");
                storeList.innerHTML = "";
                data.store.forEach(store => {
                    let storeDisplay = document.createElement("div");
                    storeDisplay.className = "store-display";
                    storeDisplay.innerHTML = `
                        <div class="store-title">${store.name}</div>
                        <div class="store-description">${store.summary}</div>
                    `;
                    let downButton = document.createElement("button");
                    downButton.className = "download";
                    downButton.innerHTML = "Download and install";
                    downButton.onclick = function() {
                        fetch(store.download)
                            .then(response => response.blob())
                            .then(console.log("OK: Download started"))
                            .then(blob => {
                                if (!fs.existsSync(app.getPath('userData') + '/downloads')) {
                                    fs.mkdirSync(app.getPath('userData') + '/downloads');
                                }
                                const filePath = app.getPath('userData') + '/downloads';
                                download(store.download, filePath)
                                .then(() => {
                                    console.log("OK: download complete");
                                })
                                // save blob to userData/downloads
                                // no /downloads folder yet, so create it
                                // remove https and url, leaving only filename
                                var filename = store.download.replace(/^.*[\\\/]/, '');
                                fs.writeFile(app.getPath('userData') + '/downloads/' + filename, blob, (err) => {
                                    if (err) throw err;
                                    console.log("OK: Download saved to downloads");
                                });
                            });
                    }
                    storeDisplay.appendChild(downButton);
                    storeList.appendChild(storeDisplay);
                });
            });
    }
function spawnWine(processType) {
    const spawn = require('child_process').spawn;
    spawn('wine' + processType);
    // console.log the child_process output
    spawn.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
}
