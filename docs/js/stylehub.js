fetch('https://zeankundev.github.io/graycrown/host/stylehub.json')
.then(res => res.json())
.then(data => {
    let styleLib = document.getElementById('style-lib')
    styleLib.innerHTML = '';
    data.hubs.forEach(hub => {
        let display = document.createElement('div')
        display.className = 'display';
        display.setAttribute('style', `background: url('${hub.img}') no-repeat; background-size: cover;`)
        display.title = hub.description;
        display.innerHTML = `<h2>${hub.name}</h2>&nbsp;by ${hub.publisher}&nbsp;<br>`
        let redirButton = document.createElement('button')
        redirButton.className = 'redir';
        redirButton.innerHTML = 'Go to CSS info';
        redirButton.onclick = () => {
            window.location.href = `details.html?style=${hub.name}`
        }
        display.appendChild(redirButton)
        styleLib.appendChild(display)
    })
})
