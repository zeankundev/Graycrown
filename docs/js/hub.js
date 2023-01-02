const params = new URLSearchParams(location.search)
const query = params.get('style');
let res;
let hubRes
fetch('https://zeankundev.github.io/graycrown/host/stylehub.json')
.then(res => res.json())
.then(data => {
    console.log(data);
    res = data.hubs;
    hubRes = res.find(hub => hub.name === query)
    document.getElementById('name-pub').innerHTML = `${hubRes.name} by ${hubRes.publisher}`
    document.getElementById('desc').innerHTML = hubRes.description;
    document.getElementById('preview').src = `https://zeankundev.github.io/graycrown/assets/stylehub/preview.html?style=${hubRes.link}`
    document.getElementById('down').onclick = () => {
        var link = document.createElement("a");
        // If you don't know the name or want to use
        // the webserver default set name = ''
        link.setAttribute('download', hubRes.link);
        link.href = hubRes.link;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
})
.catch(e => {
     console.log("normal: " + e);
})
