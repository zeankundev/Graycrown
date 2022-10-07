const remote = require('@electron/remote');
const app = remote.app;
const fs = require('fs');
const Downloader = require('nodejs-file-downloader');
const notifier = require('node-notifier');
const download = require('download');
const { url } = require('inspector');
const path = require('path');
const { config } = require('process');
const close = document.getElementById('close');
const minimize = document.getElementById('minimize');
const maximize = document.getElementById('maximize');
const downloads = document.getElementById('downloads');
const titleText = document.getElementById('title-text')
const imageToggle = document.getElementById('img-toggle');
const text = document.getElementById('text');
const notif = document.getElementById('notif')
const modal = document.getElementById('download-modal');
const downList = document.getElementById('download-list');
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
let lang;
let play;
let downAndI;
let language;
fetch(app.getPath('userData') + '/config.json')
.then(response => response.json())
.then(data => {
    console.log(data.config.language)
    document.getElementById('lang').value = data.config.language;
    fetch(`../language/${data.config.language}.json`)
    .then((res) => res.json())
    .then(data => {
        document.getElementById('welcome-back').innerHTML = data.translations.welcomeBack
        document.getElementById('library-text').innerHTML = data.translations.library
        document.getElementById('store-text').innerHTML = data.translations.store
        document.getElementById('settings-text').innerHTML = data.translations.settings
        document.getElementById('wine-settings').innerHTML = data.translations.wineSettings
        document.getElementById('wine-cfg').innerHTML = data.translations.wineConfig
        document.getElementById('downloads-text').innerHTML = data.translations.downloads
        document.getElementById('no-downloads').innerHTML = data.translations.noDownloads
        document.getElementById('refresh-store').innerHTML = data.translations.refreshStore
        document.getElementById('to-library').innerHTML = data.translations.toLibrary
        document.getElementById('ref-internet').innerHTML = data.translations.refInternet
        document.getElementById('rec-for-u').innerHTML = data.translations.recForU
        play = data.translations.play
        downAndI = data.translations.downloadAndInstall
        recommendGames();
        fetchStores();
        getGames();
    })
    .catch(e => {
        console.log(e);
    })
});
const configuration = require(app.getPath('userData') + '/config.json')
document.getElementById('lang').onchange = () => {
    configuration.config.language = document.getElementById('lang').value;
    fs.writeFile(app.getPath('userData') + '/config.json', JSON.stringify(configuration), function writeJSON(e) {
        if (e) return console.log(e);
        console.log(JSON.stringify(configuration));
        console.log('Writing config file of lang to:' + app.getPath('userData') + '/config.json')
        notifDisplay('In order for effects to take place, restart Graycrown', 'Restart required.')
    })
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
document.getElementById('add').onclick = function() {
    document.getElementById('add-form').style.display = "block";
}
document.getElementById('close-modal-add').onclick = function() {
    document.getElementById('add-form').style.display = "none";
}
// if it clicks anywhere out of the modal, close it
window.onclick = function(event) {
    if (event.target == document.getElementById('add-form')) {
        document.getElementById('add-form').style.display = "none";
    }
}
document.getElementById('submit').onclick = () => {
        const configDir = app.getPath('userData');
        let jsonData = require(configDir + '/games.json');
        var obj = (jsonData);
        if (document.getElementById("id").value == "") {
            let id = "false";
            obj['games'].push({
                "name": document.getElementById('name').value,
                "icon": document.getElementById('icon').value,
                "exec": document.getElementById('exec').value
              });
        } else {
              let id = document.getElementById("id").value;
              obj['games'].push({
                "id": document.getElementById('id').value,
                "name": document.getElementById('name').value,
                "icon": document.getElementById('icon').value,
                "exec": document.getElementById('exec').value
              });
        }
            jsonStr = JSON.stringify(obj);
            console.log(jsonStr);
            fs.writeFile(configDir + '/games.json', jsonStr, (err) => { 
                if (err) { 
                 console.log(err); 
                }
            });
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
                            gameButton.innerHTML = `<b>${play}</b>`;
                            gameButton.onclick = function() {
                                // downgraded to electron v4, now we can require child_process.
                                const { spawn } = require('child_process');
                                const process = spawn(game.exec, game.args);
                                process.on('error', (err) => {
                                    console.log(err)
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
    function recommendGames() {
        fetch('https://gray-crown.web.app/host/Game.json')
            .then(res => res.json())
            .then(data => {
                let rec = document.getElementById('recommend-list');
                rec.innerHTML = '';
                data.items.forEach(items => {
                    let recommendDisplay = document.createElement('div');
                    recommendDisplay.className = 'recommend-display';
                    recommendDisplay.setAttribute('style', `background: url('${items.banner}') no-repeat; background-size: cover;`)
                    recommendDisplay.title = items.info;
                    recommendDisplay.innerHTML = `
                        <img style="width: 48px !important; height:48px !important; border-radius:15px;" src="${items.banner}">
                        <div class="store-title">${items.name}</div>
                    `;
                    let startBtn = document.createElement("button");
                    startBtn.className = "download";
                    startBtn.innerHTML = `<b>${play}</b>`;
                    startBtn.onclick = function() {
                        if (items.link !== '') window.open(`../views/child.html?url=${items.link}`, '_blank', `nodeIntegration=true,title=${items.name} - Graycrown`);
                        else notifDisplay('Error 407: Missing link argument in JSON file', 'Failed to launch!') 
                    }
                    recommendDisplay.appendChild(startBtn)
                    rec.appendChild(recommendDisplay)
                })
            }).catch(function(e){
                console.log(e);
                document.getElementById('e').style.display = 'block';
            })
    }
    recommendGames()
    function fetchStores() {
        fetch('https://gray-crown.web.app/host/Store.json')
            .then(response => response.json())
            .then(data => {
                let storeList = document.getElementById("store-list");
                storeList.innerHTML = '';
                data.store.forEach(store => {
                    let storeDisplay = document.createElement("div");
                    storeDisplay.className = "store-display";
                    storeDisplay.innerHTML = `
                        <div class="store-title">${store.name}</div>
                        <div class="store-description">${store.summary}</div>
                    `;
                    let downButton = document.createElement("button");
                    downButton.className = "download";
                    downButton.innerHTML = `<b>${downAndI}</b>`;
                    if (!fs.existsSync(app.getPath('userData') + '/downloads')) {
                        fs.mkdirSync(app.getPath('userData') + '/downloads');
                    }
                    downButton.onclick = function() {
                        downList.innerHTML = "";
                        let downStatus = document.createElement('div')
                        downStatus.innerHTML = `
                            <hr>
                            <h2>${store.name}</h2>
                        `;
                        let downProgress = document.createElement('p');
                        downProgress.innerHTML = "Waiting for download to start...";
                        fetch(store.download)
                            .then(async () => {
                                const down = new Downloader({
                                    url: store.download,
                                    directory: path.join(app.getPath('userData'), '/downloads'),
                                    onProgress: function (percent, chunk, remain) {
                                        downProgress.innerHTML = `<b>Now downloading ${store.name}.</b>&nbsp;${percent}% | Bytes left: ${remain}`;
                                    }
                                });
                                try {
                                    await down.download();
                                    notifDisplay(`Finished downloading ${store.name}`, 'Success');
                                } catch (e) {
                                    notifDisplay(e, 'Error. Cannot download');
                                }
                            });
                            downStatus.appendChild(downProgress);
                            downList.appendChild(downStatus);
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
