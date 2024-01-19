    function spw(name, banner, desc, developer, feed, link) {
        document.getElementById('game-info').style.display = 'block'
        document.getElementById('title').innerHTML = name;
        document.getElementById('developer').innerHTML = developer;
        document.getElementById('game-info').style.backgroundImage = `url(${banner})`;
        document.getElementById('desc').innerText = desc;
        document.getElementById('pl').innerText = play;
        if (feed == '' || feed == "false" || feed == false) document.getElementById('feed').innerHTML = `No Feed!!!`
        else document.getElementById('feed').onclick = () => {
            if (feed == "false" || feed == false || feed == '') {
                console.log('ignoring')
            } else {
                const windowObject = new GCWindowInitializer(feed)
                windowObject.OpenWindow()
            }
        }
        document.getElementById('pl').addEventListener('click', () => {
            buttonClick.play();
            if (link == '') console.log('ignoring to open...');
            else { 
                const windowObject = new GCWindowInitializer(link)
                windowObject.OpenWindow()
                console.log('opening ' + link)
            }
        })
        document.getElementById('bk').onclick = () => {
            tabSwitch.play();
            document.getElementById('game-info').style.display = 'none'
            link = ''
            feed = ''
        }   
    }