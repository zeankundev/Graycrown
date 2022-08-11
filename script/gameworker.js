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
    function getGames() {
        fetch("../test/games.json")
            .then(response => response.json())
            .then(data => {
                let gameList = document.getElementById("game-list");
                gameList.innerHTML = "";
                data.games.forEach(game => {
                    let gameDisplay = document.createElement("div");
                    gameDisplay.className = "game-display";
                    gameDisplay.innerHTML = `
                        <img width="48" height="48" src="${game.icon}">
                        <div class="game-title">${game.name}</div>
                    `;
                    let gameButton = document.createElement("button");
                    gameButton.className = "play";
                    gameButton.innerHTML = "Play";
                    gameButton.onclick = function() {
                        // downgraded to electron v4, now we can require child_process.
                        const { spawn } = require('child_process');
                        const process = spawn(game.exec, game.args.split(" "));
                        process.on('error', (err) => {
                            console.log(err);
                        });
                    }
                    gameDisplay.appendChild(gameButton);
                    gameList.appendChild(gameDisplay);
                });
            });
    }
    getGames();
    // handle addGames()
    function addGames() {
        document.getElementById('add-game').style.display = "block";
        document.getElementById('close').onclick = function() {
            document.getElementById('add-game').style.display = "none";
        }
        document.getElementById('add-game-button').onclick = function() {
            const fs = require('fs');
            let gameID = document.getElementById('game-id').value;
            let gameName = document.getElementById('game-name').value;
            let binaryLocation = document.getElementById('binary-location').value;
            let gameArgs = document.getElementById('game-args').value;
            let gameIcon = document.getElementById('game-image').value;
            let game = {
                "id": gameID,
                "name": gameName,
                "exec": binaryLocation,
                "args": gameArgs,
                "icon": gameIcon
            }
            if (gameArgs == "" || gameArgs == null) {
                game.args = "";
            }
            let games = JSON.parse(fs.readFileSync("../test/games.json"));
            games.games.push(game);
            fs.writeFileSync("../test/games.json", JSON.stringify(games));
            getGames();
            document.getElementById('add-game').style.display = "none";
        }
    }