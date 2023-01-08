class GameMenu {
    constructor(name, banner, desc, developer, feed, link) {
        this.name = name
        this.banner = banner
        this.desc = desc
        this.developer = developer
        this.feed = feed
        this.link = link
        document.getElementById('game-info').style.display = 'block'
        document.getElementById('title').innerHTML = this.name;
        document.getElementById('developer').innerHTML = this.developer;
        document.getElementById('game-info').style.backgroundImage = `url(${this.banner})`;
        document.getElementById('desc').innerHTML = this.desc;
        if (this.feed == "false") document.getElementById('feed').innerHTML = `No Feed!!!`
        else document.getElementById('feed').onclick = () => {
            window.open(
                'child.html?uri=' + this.feed,
                '_blank',
                'icon="../assets/logo_1024.png", nodeIntegration=true, nodeIntegrationInSubFrames=true, nodeIntegrationInWorker=true, contextIsolation=false, webviewTag=true, autoHideMenuBar=true, width=1066, height=600'
            )
        }
        document.getElementById('pl').addEventListener('click', () => {
            buttonClick.play();
            window.open(
                'child.html?uri=' + this.link,
                '_blank',
                'icon="../assets/logo_1024.png", nodeIntegration=true, nodeIntegrationInSubFrames=true, nodeIntegrationInWorker=true, contextIsolation=false, webviewTag=true, autoHideMenuBar=true, width=1066, height=600'
            )
        })
        document.getElementById('bk').onclick = () => {
            tabSwitch.play();
            document.getElementById('game-info').style.display = 'none'
        }
    }
}