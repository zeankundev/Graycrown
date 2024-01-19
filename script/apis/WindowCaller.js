class GCWindowInitializer {
    constructor(url, width, height) {
        this.link = url
        if (width != null || width == '') this.width = width;
        else return 1066;
        if (height != null || height == '') this.height = height;
        else return 600;
    }
    OpenWindow() {
        window.open(
            'child.html?uri=' + this.link,
            '_blank',
            `icon="../../assets/logo_1024.png", nodeIntegration=true, nodeIntegrationInSubFrames=true, nodeIntegrationInWorker=true, contextIsolation=false, webviewTag=true, autoHideMenuBar=true, width=${this.width}, height=${this.height}`
        )
    }
}