const tabCont = document.getElementById('api-menu');
const apiCont = document.getElementById('api-tabs')
class Tab {
    constructor(imageAlt, image, divId, title) {
        this.imageAlt = imageAlt
        this.image = image
        this.divId = divId
        this.title = title
        let tab = document.createElement('button');
        tab.title = title;
        tab.className = 'tab';
        tab.id = `${this.divId}-tab`;
        tab.setAttribute("onclick", `openMenu(event, '${this.divId}')`);
        let img = document.createElement('img');
        img.src = image;
        img.alt = imageAlt;
        tab.appendChild(img)
        tabCont.appendChild(tab)
    }
    buildDiv(inner) {
        let container = document.createElement('div');
        container.id = this.divId;
        container.className = 'tabcontent';
        container.appendChild(inner);
        apiCont.appendChild(container)
    }
}
